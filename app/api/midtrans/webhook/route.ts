import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  // Verifikasi signature (wajib, biar tidak bisa dipalsukan).
  const serverKey = process.env.MIDTRANS_SERVER_KEY!;
  const expectedSignature = crypto
    .createHash("sha512")
    .update(
      `${body.order_id}${body.status_code}${body.gross_amount}${serverKey}`,
    )
    .digest("hex");

  if (body.signature_key !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  // Update status di Supabase berdasarkan transaction_status.
  const status =
    body.transaction_status === "settlement" ||
    body.transaction_status === "capture"
      ? "paid"
      : body.transaction_status === "pending"
        ? "pending"
        : "failed";

  // TODO: update tabel payments di Supabase di sini
  // (butuh supabase service role key / server client).

  return NextResponse.json({ received: true });
}
