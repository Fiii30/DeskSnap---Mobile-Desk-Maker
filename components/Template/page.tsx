"use client";

// useState untuk template terpilih, toast, dan sheet premium.
import { useEffect, useRef, useState } from "react";

// Kunci template.
type TemplateKey = "tcg" | "fotocard" | "jqka" | "trivia";

// Data template.
const TEMPLATES: {
  key: TemplateKey;
  title: string;
  description: string;
  isPremium: boolean;
  image: string;
}[] = [
  {
    key: "tcg",
    title: "TCG",
    description: "Kartu pertarungan.",
    isPremium: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArrPAhwHGDwOPIdLQpU7MnYCUw3Bnk6r3gUcx3sRD7SOpWJ5HcFoRcR3HL1xjoo3iRshsxVuCaLbZDyJJu3x1YC-QzUlZCmkfyn-u9py0Ds7Dpc9EVmnx2fzk6gU42VZ6G-Z1-FAlmfvXvRuVM2Jma0niXo2GGnlswrdwxJeXGBKFPH_XZ7LLU8w8qAb-DTN7bTw0WnpGfbBVc4491AQp6AbrHej1YUaZQU_C9cKe-qNqd2xFa-HeF",
  },
  {
    key: "fotocard",
    title: "Fotocard",
    description: "Koleksi momen favorit.",
    isPremium: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8FFZTB589CBfc6A55isHTlQaNB_DcIeZYy10ytOMx7micPPDocAaiywDMnFmL9omfiySITImD4-YTTjFk3fvUSbQNxvy1L_zi5rPXT-dbpNfzNGU5zkfvG-vXnZk8ogTap6ARxsLzZP34i6-sJ9Yb0A6LaaAEukdijzZoDmzjNUuK2N_lUHFJqTwwIKNZopA227yc2jtKD5bPNVa5nkXDjLvK0vq-zTwOJ2VLXn66T7EN2eb4wz1t",
  },
  {
    key: "jqka",
    title: "JQKA",
    description: "Kartu remi versimu.",
    isPremium: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzt9srUT1tCs0R--YSlHUE5MUwaYOz5D8rC8uJP6qAWz1PGSR7gtaoLgoHvg9b9HoNzeyj-U6YpVK7QEPilUOJIlL4erxxhKoT-XDWgp7IiUnWrx4kzm9lha_cY1Pi8dKO5VI0hZOym5h9i5DwIT9i54Quk-7p1F8Vwcot_ArUcER5PecbJes3MPZ8a0Wg35vi0kEcjPshNYrN6GTAy--CpEOQdxB8HMrTGXYETCDFugQt1JzTY_45",
  },
  {
    key: "trivia",
    title: "Trivia Kuis",
    description: "Kuis untuk main bersama.",
    isPremium: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ0jthB-Tb8j8B6dnumN768dNG8oivlGq8FNKpSehxU17kRX1qCj_vnpiMz9z3_qkOfqLxvMJfmsF95d7ZTO9A9O7x0xKxSrwINPyxove4QfaAFIOjj3Wz4HQbD4tQNhrZb4m5nmizfXDm1vmdWFM1yAtv8UHMRO0E15wiL_lhj5u_kO3fjRDMKnEe8AfDtUA0gx_pqbGllOucWf48Bfy9RW6Dk7L7lMDw1EUYKbj-NIeoPZjRUvb7",
  },
];

// Halaman Pilih Template.
export default function TemplateSelectScreen() {
  // Template yang dipilih; default TCG.
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>("tcg");

  // Sheet premium terbuka atau tidak.
  const [isPremiumSheetOpen, setIsPremiumSheetOpen] = useState(false);

  // Pesan toast.
  const [toast, setToast] = useState<string | null>(null);

  // Timer toast.
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Membersihkan timer saat komponen dilepas.
  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // Menampilkan toast selama 2,4 detik.
  function showToast(message: string) {
    setToast(message);

    if (toastTimer.current) clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2400);
  }

  // Memilih template.
  function selectTemplate(templateKey: TemplateKey) {
    const template = TEMPLATES.find((item) => item.key === templateKey);

    if (!template) return;

    setSelectedTemplate(templateKey);

    // Template premium langsung membuka penawaran.
    if (template.isPremium) {
      setIsPremiumSheetOpen(true);
    }
  }

  // Aksi tombol bawah.
  function handleContinue() {
    const template = TEMPLATES.find((item) => item.key === selectedTemplate);

    if (!template) return;

    if (template.isPremium) {
      setIsPremiumSheetOpen(true);
      return;
    }

    showToast(
      `Membuka editor untuk template ${template.title.toUpperCase()}... (prototype)`,
    );
  }

  return (
    <main className="relative min-h-dvh bg-[#f9f9fb] pb-36 pt-20 text-[#1a1c1e]">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#f9f9fb]/80 pt-[env(safe-area-inset-top)] shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="flex h-20 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Kembali ke Dashboard"
              onClick={() => history.back()}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#1a1c1e] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-colors hover:text-[#004ac6]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M19 12H5m6-6-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex flex-col">
              <h1 className="text-[20px] font-semibold leading-tight tracking-tight">
                Pilih Template
              </h1>
              <p className="mt-0.5 text-[11px] font-bold leading-none text-[#434655]">
                Mau bikin kartu apa?
              </p>
            </div>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#004ac6] text-[12px] font-bold text-white">
            RP
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-md px-5 pb-4 pt-4">
        {/* KONTEKS */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-semibold tracking-tight">
              Kategori Kartu
            </h2>

            <span className="rounded-full bg-[#e8e8ea] px-2 py-0.5 text-[11px] font-bold text-[#434655]">
              4 Pilihan
            </span>
          </div>
        </div>

        <p className="mb-5 text-[13px] leading-5 text-[#434655]">
          Pilih format cetak kartu fisik favoritmu. Setiap template disesuaikan
          dengan standar cetak Art Carton presisi tinggi.
        </p>

        {/* GRID TEMPLATE */}
        <div className="grid w-full grid-cols-2 gap-3.5">
          {TEMPLATES.map((template) => {
            const isActive = selectedTemplate === template.key;

            return (
              <button
                key={template.key}
                type="button"
                onClick={() => selectTemplate(template.key)}
                className={`relative flex flex-col rounded-xl bg-white p-2.5 text-left shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-200 ${
                  isActive ? "ring-2 ring-[#004ac6]" : ""
                }`}
              >
                {/* CHECK BADGE */}
                <span
                  className={`absolute right-4 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-sm ${
                    isActive
                      ? "bg-[#004ac6] text-white"
                      : "bg-[#edeef0] text-[#434655] opacity-0"
                  }`}
                >
                  ✓
                </span>

                {/* MINIATURE */}
                <div
                  className={`relative flex aspect-[2.5/3.5] w-full flex-col justify-between overflow-hidden rounded-lg p-1.5 shadow-inner ${
                    template.key === "fotocard"
                      ? "bg-[#dfd6c5] p-2"
                      : "bg-[#edeef0]"
                  }`}
                >
                  <div className="relative flex h-full w-full flex-col overflow-hidden rounded bg-white p-1.5">
                    {/* TCG miniature */}
                    {template.key === "tcg" && (
                      <>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#004ac6]">
                            KOCHENG OYEN
                          </span>
                          <span className="text-[9px] font-extrabold text-[#ba1a1a]">
                            HP 950
                          </span>
                        </div>

                        <div className="relative flex-1 overflow-hidden rounded bg-[#f3f3f6]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={template.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />

                          <span className="absolute bottom-1 right-1 flex items-center gap-0.5 rounded bg-[#1a1c1e]/70 px-1 text-[8px] font-bold text-white backdrop-blur-sm">
                            🔥 Lv.4
                          </span>
                        </div>

                        <div className="mt-1 flex items-center justify-between text-[8px] font-semibold text-[#434655]">
                          <span>Cakar Barbarian</span>
                          <span className="font-bold text-[#004ac6]">
                            ATK 120
                          </span>
                        </div>
                      </>
                    )}

                    {/* FOTOCARD miniature */}
                    {template.key === "fotocard" && (
                      <>
                        <div className="relative h-[76%] overflow-hidden rounded-sm bg-white shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={template.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />

                          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm">
                            <span className="text-[10px] text-[#004ac6]">
                              ♥
                            </span>
                          </span>
                        </div>

                        <div className="flex h-[20%] flex-col justify-center px-1">
                          <span className="truncate text-[8px] font-medium italic text-[#434655]">
                            Golden Hour Memories ✨
                          </span>
                          <span className="text-[7px] text-[#737686]">
                            18.06.2024 • Jakarta
                          </span>
                        </div>
                      </>
                    )}

                    {/* JQKA miniature */}
                    {template.key === "jqka" && (
                      <>
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col items-center">
                            <span className="text-[12px] font-black leading-none">
                              A
                            </span>
                            <span className="mt-0.5 text-[11px]">♠</span>
                          </div>

                          <span className="rounded bg-[#d4e3ff] px-1.5 py-0.5 text-[8px] font-bold text-[#004883]">
                            POKER
                          </span>
                        </div>

                        <div className="relative my-1 flex flex-1 items-center justify-center overflow-hidden rounded bg-[#f3f3f6]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={template.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex rotate-180 items-end justify-between">
                          <div className="flex flex-col items-center">
                            <span className="text-[12px] font-black leading-none">
                              A
                            </span>
                            <span className="mt-0.5 text-[11px]">♠</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* TRIVIA miniature */}
                    {template.key === "trivia" && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-[#edeef0] px-1 text-[8px] font-bold">
                            #01 / 50
                          </span>
                          <span className="text-[14px] text-[#004ac6]">🧠</span>
                        </div>

                        <div className="relative my-1 flex flex-1 items-center justify-center overflow-hidden rounded bg-[#f3f3f6] p-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={template.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="rounded bg-[#f3f3f6] p-1">
                          <div className="mb-1 h-1.5 w-12 rounded-full bg-[#c3c6d7]" />
                          <div className="h-1.5 w-8 rounded-full bg-[#c3c6d7]" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* LOCK OVERLAY */}
                  {template.isPremium && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-[#1a1c1e]/35 p-2 text-center backdrop-blur-[1.5px]">
                      <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[18px] text-[#004ac6] shadow-md">
                        🔒
                      </span>

                      <span className="text-[10px] font-bold text-white drop-shadow">
                        Akses Terkunci
                      </span>
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="mt-3 flex min-w-0 flex-col">
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <span className="truncate text-[15px] font-bold">
                      {template.title}
                    </span>

                    {template.isPremium ? (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-[#b4c5ff] px-1.5 py-0.5 text-[10px] font-bold text-[#003ea8]">
                        🔒 Premium
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-[#edeef0] px-1.5 py-0.5 text-[10px] font-bold text-[#434655]">
                        Gratis
                      </span>
                    )}
                  </div>

                  <p className="line-clamp-1 text-[12px] leading-snug text-[#434655]">
                    {template.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* BANNER KUALITAS */}
        <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#f3f3f6] p-3.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[20px] text-[#004ac6] shadow-sm">
            🖨
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="text-[13px] font-bold">
              Kualitas Cetak Premium
            </span>
            <p className="text-[12px] leading-relaxed text-[#434655]">
              Art Carton 310gsm dengan laminasi doff halus, tahan cipratan air
              dan rounded edge ramah genggaman tangan.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-[#f9f9fb]/90 px-5 pb-[env(safe-area-inset-bottom)] pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-md flex-col gap-2 pb-3">
          <button
            type="button"
            onClick={handleContinue}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#004ac6] text-[15px] font-bold text-white shadow-[0_2px_8px_rgba(0,74,198,0.25)] transition-transform active:scale-[0.98]"
          >
            {TEMPLATES.find((item) => item.key === selectedTemplate)?.isPremium
              ? "Buka Template (Rp49.000)"
              : "Gunakan Template"}

            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* SHEET PREMIUM */}
      {isPremiumSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#1a1c1e]/40 backdrop-blur-sm">
          <div className="w-full rounded-t-[28px] bg-white p-5 pb-[max(env(safe-area-inset-bottom),16px)] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#e2e2e5]" />

            <div className="mb-3 flex items-start justify-between">
              <div className="flex flex-col">
                <span className="mb-1.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#d4e3ff] px-2.5 py-0.5 text-[11px] font-bold text-[#004883]">
                  👑 PAKET KARTU LENGKAP
                </span>

                <h2 className="text-[20px] font-semibold">
                  Buka Akses Template Premium
                </h2>
              </div>

              <button
                type="button"
                aria-label="Tutup penawaran premium"
                onClick={() => setIsPremiumSheetOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edeef0] text-[#434655] hover:text-[#1a1c1e]"
              >
                ✕
              </button>
            </div>

            <p className="mb-4 text-[15px] leading-6 text-[#434655]">
              Buka akses permanen untuk template JQKA dan Trivia Kuis tanpa
              batas cetak.
            </p>

            <div className="mb-4 flex flex-col gap-2.5 rounded-xl bg-[#f3f3f6] p-3.5">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-[20px] text-[#004ac6]">
                  ▦
                </span>

                <div className="flex flex-col">
                  <span className="text-[13px] font-bold">
                    Template Kartu Remi JQKA
                  </span>
                  <span className="text-[12px] leading-5 text-[#434655]">
                    Desain lengkap 54 kartu siap kustomisasi foto.
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-[#e2e2e5]/50" />

              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-[20px] text-[#004ac6]">
                  ❓
                </span>

                <div className="flex flex-col">
                  <span className="text-[13px] font-bold">
                    Template Trivia Kuis
                  </span>
                  <span className="text-[12px] leading-5 text-[#434655]">
                    Format Q&A interaktif dua sisi siap cetak massal.
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between rounded-lg bg-[#edeef0] p-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#434655]">
                  Bayar Sekali, Miliki Selamanya
                </span>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-[24px] font-extrabold leading-8 tracking-tight">
                    Rp49.000
                  </span>
                  <span className="text-[12px] font-bold text-[#737686] line-through">
                    Rp89.000
                  </span>
                </div>
              </div>

              <span className="rounded bg-[#ffdad6] px-2 py-0.5 text-[11px] font-bold text-[#93000a]">
                Hemat 45%
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsPremiumSheetOpen(false);
                  showToast(
                    "Menghubungkan ke gateway pembayaran... (prototype)",
                  );
                }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#004ac6] text-[15px] font-bold text-white shadow-[0_2px_8px_rgba(0,74,198,0.25)] transition-transform active:scale-[0.98]"
              >
                Lanjut ke Pembayaran
                <span aria-hidden="true">💳</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPremiumSheetOpen(false)}
                className="flex h-10 w-full items-center justify-center rounded-lg text-[13px] font-semibold"
              >
                Nanti Saja
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] font-bold text-[#737686]">
              Pembelian Template Premium terpisah dari AI Style dan berlaku
              selamanya.
            </p>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 top-24 z-50 flex max-w-[90%] -translate-x-1/2 items-center gap-2 rounded-full bg-[#2f3133] px-4 py-2.5 text-[13px] font-semibold text-[#f0f0f3] shadow-lg"
        >
          <span className="text-[18px] text-[#d4e3ff]" aria-hidden="true">
            ✦
          </span>
          <span className="truncate">{toast}</span>
        </div>
      )}
    </main>
  );
}
