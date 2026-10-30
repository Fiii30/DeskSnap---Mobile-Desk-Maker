// Client Supabase untuk dipakai di Server Component / Route Handler.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Membuat client Supabase di sisi server.
export async function createClient() {
  // Mengambil cookie store dari Next.js.
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // Membaca semua cookie.
        getAll() {
          return cookieStore.getAll();
        },
        // Menulis cookie sesi.
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Dipanggil dari Server Component; middleware akan refresh token.
          }
        },
      },
    },
  );
}