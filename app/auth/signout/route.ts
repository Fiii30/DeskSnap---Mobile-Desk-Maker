// Route handler untuk logout.
import { NextResponse, type NextRequest } from "next/server";

// Client Supabase server.
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  // Buat client server.
  const supabase = await createClient();

  // Cek user login dulu.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Bila ada user, logout.
  if (user) {
    await supabase.auth.signOut();
  }

  // Redirect ke login.
  return NextResponse.redirect(new URL("/login", request.url), {
    status: 302,
  });
}
