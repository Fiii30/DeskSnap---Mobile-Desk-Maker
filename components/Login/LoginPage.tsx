"use client";

// State untuk status tombol login.
import { useState } from "react";

// Client Supabase browser.
import { createClient } from "@/lib/supabase/client";

// Komponen-komponen kecil halaman Login.
import LoginHeader from "./sections/LoginHeader";
import LoginCardShowcase from "./sections/LoginCardShowcase";
import GoogleLoginButton from "./sections/GoogleLoginButton";
import LoginFooter from "./sections/LoginFooter";

// Status tombol login.
type LoginStatus = "idle" | "loading" | "success";

// Halaman Login.
export default function LoginPage() {
  // Status awal tombol.
  const [status, setStatus] = useState<LoginStatus>("idle");

  // Pesan error bila OAuth gagal dimulai.
  const [error, setError] = useState<string | null>(null);

  // Login Google asli via Supabase.
  async function handleGoogleLogin() {
    if (status !== "idle") return;

    setStatus("loading");
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
      setStatus("idle");
    }
  }

  return (
    <main className="min-h-dvh bg-surface pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] font-jakarta text-on-surface">
      <div className="mx-auto flex w-full max-w-md flex-col items-center px-5 py-4">
        <LoginHeader />

        <LoginCardShowcase />

        <section className="mt-3 mb-5 px-4 text-center">
          <h1 className="text-2xl font-extrabold leading-8 tracking-tight">
            Dari foto favorit,
            <br />
            <span className="text-blue-600">Jadi koleksi istimewa.</span>
          </h1>

          <p className="mx-auto mt-2 max-w-67.5 text-[15px] leading-6 text-on-surface-muted">
            Ciptakan deck kartu dengan sentuhan kreatifmu, siap dibagikan atau
            dicetak.
          </p>
        </section>

        <section className="flex w-full max-w-sm flex-col items-center px-2">
          <GoogleLoginButton status={status} onClick={handleGoogleLogin} />

          <p className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-on-surface-muted">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M8 10V7a4 4 0 0 1 8 0v3"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
            Aman & langsung siap bikin deck
          </p>

          {/* Pesan error bila OAuth gagal dimulai */}
          {error && (
            <p className="mt-3 w-full rounded-lg bg-danger/10 px-4 py-2.5 text-center text-[11px] font-semibold text-danger">
              {error}
            </p>
          )}
        </section>

        <LoginFooter />
      </div>
    </main>
  );
}
