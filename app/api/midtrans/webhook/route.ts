import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (typeof body.order_id !== "string") {
      return NextResponse.json(
        { error: "order_id tidak valid." },
        { status: 400 },
      );
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      throw new Error("MIDTRANS_SERVER_KEY belum diatur.");
    }

    const admin = createAdminClient();

    const { data: payment, error: paymentError } = await admin
      .from("payments")
      .select("order_id, gross_amount, status, product_key")
      .eq("order_id", body.order_id)
      .maybeSingle();

    if (paymentError) throw paymentError;

    if (!payment) {
      return NextResponse.json(
        { error: "Transaksi tidak ditemukan." },
        { status: 404 },
      );
    }

    // Jangan percaya status dari body webhook.
    // Ambil status langsung dari Midtrans menggunakan Server Key.
    const statusResponse = await fetch(
      `https://api.sandbox.midtrans.com/v2/${encodeURIComponent(
        payment.order_id,
      )}/status`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString(
            "base64",
          )}`,
        },
        cache: "no-store",
      },
    );

    const transaction = await statusResponse.json();

    if (!statusResponse.ok) {
      throw new Error("Gagal memverifikasi status ke Midtrans.");
    }

    if (
      transaction.order_id !== payment.order_id ||
      Number(transaction.gross_amount) !== payment.gross_amount
    ) {
      return NextResponse.json(
        { error: "Data transaksi tidak cocok." },
        { status: 400 },
      );
    }

    // Jangan turunkan status paid karena notifikasi lama/berulang.
    if (payment.status === "paid") {
      return NextResponse.json({ received: true });
    }

    const transactionStatus = transaction.transaction_status;
    const fraudStatus = transaction.fraud_status;

    const fraudAccepted =
      fraudStatus === undefined ||
      fraudStatus === null ||
      fraudStatus === "accept";

    const successful =
      transaction.status_code === "200" &&
      fraudAccepted &&
      (transactionStatus === "settlement" || transactionStatus === "capture");

    let status: "pending" | "paid" | "expired" | "failed";

    if (successful) {
      status = "paid";
    } else if (transactionStatus === "expire") {
      status = "expired";
    } else if (
      transactionStatus === "deny" ||
      transactionStatus === "cancel" ||
      transactionStatus === "failure"
    ) {
      status = "failed";
    } else {
      // Termasuk pembayaran yang masih membutuhkan peninjauan.
      status = "pending";
    }

    const { error: updateError } = await admin
      .from("payments")
      .update({
        status,
        paid_at: status === "paid" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", payment.order_id)
      .neq("status", "paid");

    if (updateError) throw updateError;

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Midtrans webhook error:", error);

    return NextResponse.json(
      { error: "Gagal memproses notifikasi." },
      { status: 500 },
    );
  }
}
