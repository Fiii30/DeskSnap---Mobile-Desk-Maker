// Middleware untuk menjaga sesi login tetap segar.
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Buat response yang bisa dimodifikasi.
  let response = NextResponse.next({ request });

  // Buat client Supabase server-side.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Cek user yang sedang login.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Halaman yang wajib login.
  const protectedRoutes = ["/editor", "/profile"];

  // Bila belum login dan membuka halaman terproteksi.
  if (!user && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

// Terapkan middleware ke semua route kecuali static files.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};