"use client";

// State untuk status tombol login dan timer.
import { useEffect, useRef, useState } from "react";

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

  // Menyimpan timer agar bisa dibersihkan.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Membersihkan timer saat halaman ditutup.
  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // Simulasi login Google.
  function handleGoogleLogin() {
    if (status !== "idle") return;

    setStatus("loading");

    const loadingTimer = setTimeout(() => {
      setStatus("success");

      const resetTimer = setTimeout(() => {
        setStatus("idle");
      }, 2400);

      timers.current.push(resetTimer);
    }, 1200);

    timers.current.push(loadingTimer);
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

          <p className="mt-1.5 text-center text-[10px] leading-4 text-on-surface-soft">
            Prototype · Login Google belum diaktifkan.
          </p>
        </section>

        <LoginFooter />

        {/* Toast simulasi */}
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-14 left-1/2 z-50 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2 rounded-full bg-surface-soft px-4 py-2.5 text-center text-[12px] font-semibold text-inverse-text shadow-lg transition-all duration-300 ${
            status === "success"
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <span className="text-primary-soft">✓</span>
          Simulasi berhasil. Google belum terhubung.
        </div>
      </div>
    </main>
  );
}
