import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

// Sesuaikan dengan harga paket template milikmu.
const TEMPLATE_PRODUCT = {
  key: "templates",
  name: "DeckSnap - Semua Template",
  price: 29000,
};

export async function POST(req: Request) {
  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      throw new Error("MIDTRANS_SERVER_KEY belum diatur.");
    }

    const authorization = req.headers.get("authorization");

    const accessToken = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : null;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Silakan login terlebih dahulu." },
        { status: 401 },
      );
    }

    const admin = createAdminClient();

    // Validasi token ke Supabase, bukan percaya user_id dari browser.
    const {
      data: { user },
      error: authError,
    } = await admin.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Sesi tidak valid. Silakan login kembali." },
        { status: 401 },
      );
    }

    const body = await req.json();

    if (body.productKey !== TEMPLATE_PRODUCT.key) {
      return NextResponse.json(
        { error: "Saat ini hanya paket template yang tersedia." },
        { status: 400 },
      );
    }

    const { data: entitlement, error: entitlementError } = await admin
      .from("user_entitlements")
      .select("templates_unlocked")
      .eq("user_id", user.id)
      .maybeSingle();

    if (entitlementError) throw entitlementError;

    if (entitlement?.templates_unlocked) {
      return NextResponse.json(
        { error: "Semua template sudah terbuka untuk akun ini." },
        { status: 409 },
      );
    }

    // Menangani akun lama yang belum mempunyai profiles.
    // Tidak menimpa data profile yang sudah ada.
    const { error: profileError } = await admin.from("profiles").upsert(
      {
        id: user.id,
        full_name:
          user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
        avatar_url: user.user_metadata?.avatar_url ?? null,
      },
      {
        onConflict: "id",
        ignoreDuplicates: true,
      },
    );

    if (profileError) throw profileError;

    const orderId = `DS-${randomUUID()}`;

    // Simpan sebelum menghubungi Midtrans.
    const { error: insertError } = await admin.from("payments").insert({
      user_id: user.id,
      order_id: orderId,
      product_key: TEMPLATE_PRODUCT.key,
      gross_amount: TEMPLATE_PRODUCT.price,
      status: "pending",
    });

    if (insertError) throw insertError;

    const midtransResponse = await fetch(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString(
            "base64",
          )}`,
        },
        body: JSON.stringify({
          transaction_details: {
            order_id: orderId,
            gross_amount: TEMPLATE_PRODUCT.price,
          },
          item_details: [
            {
              id: TEMPLATE_PRODUCT.key,
              name: TEMPLATE_PRODUCT.name,
              price: TEMPLATE_PRODUCT.price,
              quantity: 1,
            },
          ],
          customer_details: {
            first_name:
              user.user_metadata?.full_name ??
              user.user_metadata?.name ??
              "Pengguna DeckSnap",
            email: user.email,
          },
        }),
        cache: "no-store",
      },
    );

    const transaction = await midtransResponse.json();

    if (!midtransResponse.ok || typeof transaction.token !== "string") {
      const { error: updateError } = await admin
        .from("payments")
        .update({
          status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("order_id", orderId);

      if (updateError) throw updateError;

      console.error("Midtrans create transaction:", transaction);

      return NextResponse.json(
        { error: "Gagal membuat transaksi Midtrans." },
        { status: 502 },
      );
    }

    const { error: tokenError } = await admin
      .from("payments")
      .update({
        snap_token: transaction.token,
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", orderId);

    if (tokenError) throw tokenError;

    return NextResponse.json({
      token: transaction.token,
      orderId,
    });
  } catch (error) {
    console.error("Create payment error:", error);

    return NextResponse.json(
      { error: "Gagal memproses pembayaran. Coba lagi nanti." },
      { status: 500 },
    );
  }
}
