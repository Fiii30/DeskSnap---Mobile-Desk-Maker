// Server Key dari env (backend only).
import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

export async function POST(req: Request) {
  try {
    const { orderId, grossAmount, customerName, customerEmail } =
      await req.json();

    // Validasi input dasar.
    if (!orderId || !grossAmount) {
      return NextResponse.json(
        { error: "orderId dan grossAmount wajib" },
        { status: 400 },
      );
    }

    // Instance Snap.
    const snap = new midtransClient.Snap({
      isProduction: false, // Sandbox
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.MIDTRANS_CLIENT_KEY!,
    });

    // Parameter transaksi.
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: customerName ?? "Pengguna DeckSnap",
        email: customerEmail ?? "",
      },
    };

    // Buat token Snap.
    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      token: transaction.token,
      redirectUrl: transaction.redirect_url,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal membuat transaksi";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
