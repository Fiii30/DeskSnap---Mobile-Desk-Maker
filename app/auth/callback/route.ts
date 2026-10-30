// Route callback setelah user memilih akun Google.
import { NextResponse } from "next/server";

// Client Supabase server.
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  // Ambil parameter dari URL.
  const { searchParams, origin } = new URL(request.url);

  // Kode otorisasi dari Google.
  const code = searchParams.get("code");

  // Tujuan setelah login (default dashboard).
  const next = searchParams.get("next") ?? "/";

  // Bila ada kode, tukar dengan sesi login.
  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // Bila sukses, masuk ke Dashboard.
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    // Bila gagal tukar kode, log untuk debugging.
    console.error("Gagal tukar kode sesi:", error);
  }

  // Bila gagal, kembali ke login.
  return NextResponse.redirect(`${origin}/login`);
}
