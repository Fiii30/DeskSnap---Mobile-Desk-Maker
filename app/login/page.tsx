"use client";

// Hook navigasi.
import { useRouter } from "next/navigation";

// State untuk loading & error.
import { useState } from "react";

// Client Supabase browser.
import { createClient } from "@/lib/supabase/client";

// Halaman Login dengan Google SSO.
export default function LoginPage() {
  // Router untuk navigasi.
  const router = useRouter();

  // State loading & error.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mulai login dengan Google.
  async function handleGoogleLogin() {
    setIsLoading(true);
    setError(null);

    // Client Supabase.
    const supabase = createClient();

    // Arahkan user ke Google untuk pilih akun.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Setelah Google selesai, kembali ke route callback kita.
        redirectTo: `${window.location.origin}/auth/callback`,
        // Paksa Google selalu menampilkan pilihan akun.
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    // Bila gagal memulai OAuth.
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm rounded-2xl bg-surface-card p-6 shadow-card">
        <h1 className="mb-1 text-xl font-bold text-ink">Masuk ke DeckSnap</h1>
        <p className="mb-6 text-sm text-ink-soft">
          Buat kartu dari foto kamu. Masuk dengan akun Google—tanpa password.
        </p>

        {/* Tombol Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-surface-muted bg-white py-3 text-sm font-bold text-ink transition-all hover:bg-surface-soft active:scale-[0.99] disabled:opacity-50"
        >
          {/* Logo Google */}
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C36.9 42.2 44 37 44 24c0-1.3-.1-2.7-.4-3.9z"
            />
          </svg>

          {isLoading ? "Mengalihkan..." : "Masuk dengan Google"}
        </button>

        {/* Error */}
        {error && (
          <p className="mt-4 rounded-lg bg-danger/10 px-3 py-2 text-xs font-semibold text-danger">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
