"use client";

// State untuk status tombol; effect untuk membersihkan timer.
import { useEffect, useRef, useState } from "react";

// Status tombol: idle, loading, atau sukses simulasi.
type LoginStatus = "idle" | "loading" | "success";

// Gambar berasal dari export Stitch.
// Nanti sebaiknya disimpan di folder public dan diganti path lokal.
const MOMENT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDyPWJy8GOpc8ml_3L06vR5ez13ADYCJQ-EYZyVzDnGae6_1zb8RVJWFouvTBf7-_9ctPPTGeEGBh-H5jcgMfRLa7Pz0f_8DfRxd6P6wP_i3ea98k_2RFCRYCdDsTccgBqsBuNHzBxsbjgGSSiEG_Qid4Ty_F_KAux7NB2LOVnC5oqjazzsrm6JXR_OdMR5SOJ7bPcUu1J9NFd3ZdNkRGtcgfd-ioCniXpa_2s_pEymcnMDlWV0z5Ad";

const CAT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDaweNp2s4H63-Udihd1flkpeD7FGeSHYAYZatEMsLGouH3x4EtQ2KPQqng77WWc04jiboCrl-h7XnrFe-LZwQ_D87JhfrQ-iKmcTHcdw1xOcuAX_diLB_iyN9Uzn91b7hDqgnM1bp7TFmI6LP5IHDGGq5lyZRgD_VN5Jnh1Fdk_7WRLD_ZwbcZP2pTmpB3SLz0MOFHbVxurzR1fFPnk9t-5qErDAkcBojnC3URehdlxSx855P9n0ZS";

// Ikon kartu sederhana tanpa library tambahan.
function CardsIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="4"
        width="12"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 6 3 17a2 2 0 0 0 1.6 2.3l2.4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m11 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ikon Google dari export Stitch.
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Ikon gembok.
function LockIcon() {
  return (
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
  );
}

// Halaman Login.
export default function LoginScreen() {
  // Status awal tombol.
  const [status, setStatus] = useState<LoginStatus>("idle");

  // Menyimpan timer agar bisa dibersihkan.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Membersihkan timer saat komponen dilepas.
  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // Simulasi proses login Google.
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

  // Teks tombol sesuai status.
  const buttonText =
    status === "loading"
      ? "Menghubungkan Akun..."
      : status === "success"
        ? "Simulasi Berhasil!"
        : "Masuk dengan Google";

  return (
    <main className="min-h-dvh bg-[#f9f9fb] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] text-[#1a1c1e]">
      <div className="mx-auto flex w-full max-w-md flex-col items-center px-5 py-4">
        {/* HEADER BRAND */}
        <header className="flex flex-col items-center pt-2 pb-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0051d5] text-white shadow-sm">
              <CardsIcon />
            </div>

            <span className="flex items-center text-2xl font-extrabold tracking-tight">
              DeckSnap
              <span className="ml-1 h-2 w-2 self-center rounded-full bg-[#0051d5]" />
            </span>
          </div>

          <p className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#58423c]">
            <span className="text-[10px] text-[#0051d5]">✦</span>
            Ubah Momen Jadi Kartu Koleksi
            <span className="text-[10px] text-[#0051d5]">✦</span>
          </p>
        </header>

        {/* CONTOH HASIL KARTU */}
        <div className="relative my-2 flex h-[310px] w-full max-w-[310px] items-center justify-center">
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_30%_65%,rgba(219,225,255,0.55),transparent_65%),radial-gradient(circle_at_70%_35%,rgba(212,227,255,0.4),transparent_65%)] blur-2xl"
            aria-hidden="true"
          />

          {/* Kartu belakang: Fotocard Moment */}
          <article className="group absolute z-10 h-[265px] w-[200px] translate-x-7 -translate-y-2.5 rotate-[8deg] rounded-2xl bg-white p-2.5 shadow-md transition-transform duration-300 hover:rotate-[12deg]">
            <div className="flex h-full flex-col justify-between rounded-xl bg-[#f3f3f6] p-2">
              <div className="relative h-[155px] w-full overflow-hidden rounded-lg bg-[#d9dadc]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MOMENT_IMAGE}
                  alt="Momen liburan bersama teman saat matahari terbenam."
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold text-[#1a1c1e] backdrop-blur-sm">
                  310 gsm • Matte
                </span>
              </div>

              <div className="px-0.5 pt-1.5">
                <div className="flex items-center justify-between">
                  <h2 className="truncate text-[12px] font-extrabold leading-[18px]">
                    Senja di Bali &apos;24
                  </h2>

                  <span
                    className="text-[17px] leading-none text-[#0051d5]"
                    aria-hidden="true"
                  >
                    ♥
                  </span>
                </div>

                <p className="mt-0.5 text-[8px] font-semibold leading-[13px] text-[#58423c]">
                  Koleksi Momen Liburan #04
                </p>
              </div>
            </div>
          </article>

          {/* Kartu depan: contoh TCG */}
          <article className="group absolute z-20 h-[285px] w-[215px] -translate-x-5 translate-y-1.5 -rotate-4 rounded-2xl bg-white p-2.5 shadow-xl transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-[#f3f3f6] p-2">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[linear-gradient(135deg,rgba(212,227,255,0.6),rgba(219,225,255,0.4),transparent)] blur-md"
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-center justify-between gap-1.5 pt-0.5">
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0051d5]" />

                  <span className="truncate text-[10px] font-extrabold uppercase tracking-wide">
                    Kocheng Oyen
                  </span>
                </div>

                <span className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2 py-0.5">
                  <span className="text-[8px] font-extrabold text-[#0051d5]">
                    HP
                  </span>
                  <strong className="text-[10px] font-extrabold leading-none">
                    950
                  </strong>
                </span>
              </div>

              <div className="relative my-1 h-[150px] w-full shrink-0 overflow-hidden rounded-lg bg-[#d9dadc]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CAT_IMAGE}
                  alt="Kucing oren memakai syal kecil bergaya petualang."
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 rounded bg-[#0060ac] px-1.5 py-0.5 text-[8px] font-bold leading-[12px] text-white">
                  <span aria-hidden="true">✦</span>
                  Edisi Langka
                </span>
              </div>

              <div className="relative z-10 rounded-lg bg-white p-1.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="flex min-w-0 items-center gap-1 text-[10px] font-extrabold">
                    <span
                      className="text-[20px] leading-[14px] text-[#0051d5]"
                      aria-hidden="true"
                    >
                      ϟ
                    </span>
                    <span className="truncate">Cakar Bar-bar</span>
                  </span>

                  <span className="shrink-0 text-[9px] font-bold text-[#58423c]">
                    120 DMG
                  </span>
                </div>

                <p className="mt-0.5 truncate text-[8px] leading-[11px] text-[#58423c]">
                  Menyebabkan musuh luluh seketika akibat keimutan luar biasa.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between gap-1.5 px-1 pt-0.5 text-[7px] font-bold leading-[12px] text-[#5d5c56]">
                <span>DECK-TCG-001</span>
                <strong className="text-[#0051d5]">★ FOIL HOLO</strong>
              </div>
            </div>
          </article>
        </div>

        {/* MANFAAT APLIKASI */}
        <section className="mt-3 mb-5 px-4 text-center">
          <h1 className="text-[26px] font-extrabold leading-[34px] tracking-tight">
            Dari foto favorit,
            <br />
            <span className="text-[#2563eb] underline decoration-[#0051d5]/25 decoration-wavy underline-offset-4">
              Jadi koleksi istimewa.
            </span>
          </h1>

          <p className="mx-auto mt-2 max-w-[270px] text-[15px] leading-6 text-[#58423c]">
            Ciptakan deck kartu dengan sentuhan kreatifmu, siap dibagikan atau
            dicetak.
          </p>
        </section>

        {/* LOGIN GOOGLE SIMULASI */}
        <section
          className="flex w-full max-w-sm flex-col items-center px-2"
          aria-label="Masuk ke DeckSnap"
        >
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={status !== "idle"}
            aria-busy={status === "loading"}
            className={`flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-3.5 text-[15px] font-bold shadow-md transition-all active:scale-[0.98] disabled:cursor-wait ${
              status === "success"
                ? "bg-[#dbe1ff] text-[#00174b]"
                : "bg-white text-[#1a1c1e] hover:shadow-lg"
            }`}
          >
            {status === "loading" ? (
              <span
                className="h-5 w-5 animate-spin rounded-full border-2 border-[#dbe1ff] border-t-[#0051d5]"
                aria-hidden="true"
              />
            ) : (
              <GoogleIcon />
            )}

            <span>{buttonText}</span>
          </button>

          <p className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#58423c]">
            <LockIcon />
            Aman & langsung siap bikin deck
          </p>

          <p className="mt-1.5 text-center text-[10px] leading-4 text-[#76746e]">
            Prototype · Login Google belum diaktifkan.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="flex w-full flex-col items-center gap-2 pt-6 pb-2">
          <div className="flex items-center gap-4">
            <a
              href="#terms"
              className="py-1 text-[10px] font-bold text-[#5d5c56] hover:text-[#0051d5]"
            >
              Syarat Penggunaan
            </a>

            <span
              className="h-1 w-1 rounded-full bg-[#d9dadc]"
              aria-hidden="true"
            />

            <a
              href="#privacy"
              className="py-1 text-[10px] font-bold text-[#5d5c56] hover:text-[#0051d5]"
            >
              Kebijakan Privasi
            </a>
          </div>

          <p className="text-[9px] leading-4 text-[#5d5c56]">
            © 2026 DeckSnap Studio. Hak Cipta Dilindungi.
          </p>
        </footer>

        {/* TOAST SIMULASI */}
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-14 left-1/2 z-50 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2 rounded-full bg-[#2f3133] px-4 py-2.5 text-center text-[12px] font-semibold text-[#f0f0f3] shadow-lg transition-all duration-300 ${
            status === "success"
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <span className="text-[#b4c5ff]" aria-hidden="true">
            ✓
          </span>
          Simulasi berhasil. Google belum terhubung.
        </div>
      </div>
    </main>
  );
}
