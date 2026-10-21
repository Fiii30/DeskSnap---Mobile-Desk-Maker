"use client";

// useState untuk accordion, nama, dan modal.
import { useState } from "react";

// useRouter dari App Router untuk kembali ke halaman sebelumnya.
import { useRouter } from "next/navigation";

// Halaman Profil.
export default function ProfileScreen() {
  // Router untuk tombol kembali.
  const router = useRouter();

  // Nama tampilan, masih data contoh.
  const [displayName, setDisplayName] = useState("Wafi");

  // Nilai input saat mengubah nama.
  const [nameInput, setNameInput] = useState("Wafi");

  // Accordion pengaturan akun terbuka atau tertutup.
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Form ubah nama terbuka atau tertutup.
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);

  // Modal keluar akun.
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // Modal hapus akun.
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Menyimpan nama baru ke state lokal.
  function handleSaveName() {
    const newName = nameInput.trim();

    if (newName) {
      setDisplayName(newName);
    }

    setIsEditNameOpen(false);
  }

  return (
    <main className="relative min-h-dvh bg-[#f9f9fb] pb-[env(safe-area-inset-bottom)] pt-16 text-[#1a1c1e]">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#f9f9fb]/80 pt-[env(safe-area-inset-top)] shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Kembali ke Dashboard"
              onClick={() => router.back()}
              className="-ml-1 flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-[#e2e2e5]"
            >
              <svg
                width="24"
                height="24"
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

            <h1 className="text-[20px] font-semibold">Profil</h1>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#004ac6] text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="8"
                r="4"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-5 py-4 pb-10">
        {/* IDENTITAS PENGGUNA */}
        <section className="relative flex flex-col items-center overflow-hidden rounded-xl bg-white p-4 text-center shadow-sm">
          <div className="relative mb-2">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#e8e8ea] shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzlxH8wjLISssDYUnByvAUZ2K8_B7yG3bherZwO5iglEXQXYhLdwtNm1U-_Dx8pVMgjAMZJi1w1KSQI9ukXce2CAHyPBY91pMUbEYFJzA6klmL5QEH-wPRGfrlH_7u2ypsqio2uv_AR5Iz352k0AmGnyhMEu_oUSFFh2I5drPzAbUGDfI2PHw5ZgyYsrBizDO-5shhjDcw8EVufTiMCA9-FL_hGDOppFAmkG6MkClbrgyz5LYeVPov"
                alt="Foto profil Wafi"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#004ac6] text-white shadow-md">
              <span className="text-[12px]" aria-hidden="true">
                ✦
              </span>
            </div>
          </div>

          <h2 className="text-[24px] font-bold leading-8 tracking-tight">
            {displayName}
          </h2>

          <p className="mb-1 text-[13px] leading-5 text-[#434655]">
            w***@gmail.com
          </p>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#edeef0] px-3 py-1 text-[11px] font-bold text-[#434655]">
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
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
            Masuk dengan Google
          </div>
        </section>

        {/* SALDO & HAK AKSES */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[#434655]">
              Saldo & Hak Akses
            </h3>

            <span className="text-[11px] font-bold text-[#56554f]">
              Terpisah & Mandiri
            </span>
          </div>

          {/* Kartu token */}
          <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edeef0]">
                <span className="text-[22px] text-[#004ac6]" aria-hidden="true">
                  ◎
                </span>
              </div>

              <div>
                <div className="text-[20px] font-semibold leading-7">
                  12 Token Gratis
                </div>
                <div className="text-[13px] leading-5 text-[#434655]">
                  Cukup untuk 2 cetakan kartu fisik
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                alert("Prototype: fitur isi ulang token belum tersedia.")
              }
              className="rounded-lg bg-[#edeef0] px-3 py-1.5 text-[11px] font-bold text-[#004ac6] transition-colors hover:bg-[#e8e8ea]"
            >
              Isi Ulang
            </button>
          </div>

          {/* Status akses */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col justify-between rounded-xl bg-white p-2 shadow-sm">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className="text-[20px] text-[#004ac6]"
                    aria-hidden="true"
                  >
                    ▦
                  </span>

                  <span className="rounded-full bg-[#edeef0] px-2 py-0.5 text-[11px] font-bold text-[#004ac6]">
                    Aktif
                  </span>
                </div>

                <div className="text-[15px] font-semibold">
                  Template Premium
                </div>
                <p className="mt-1 text-[13px] leading-5 text-[#434655]">
                  Preset studio vintage
                </p>
              </div>

              <div className="mt-2 border-t border-[#edeef0] pt-1">
                <span className="text-[11px] font-bold text-[#56554f]">
                  Permanen
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl bg-white p-2 shadow-sm">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className="text-[20px] text-[#0060ac]"
                    aria-hidden="true"
                  >
                    ✨
                  </span>

                  <span className="rounded-full bg-[#e8e8ea] px-2 py-0.5 text-[11px] font-bold text-[#434655]">
                    Tidak Aktif
                  </span>
                </div>

                <div className="text-[15px] font-semibold">AI Style</div>
                <p className="mt-1 text-[13px] leading-5 text-[#434655]">
                  Render artistik foto
                </p>
              </div>

              <div className="mt-2 border-t border-[#edeef0] pt-1">
                <span className="text-[11px] font-semibold text-[#0060ac]">
                  Buka Terpisah
                </span>
              </div>
            </div>
          </div>

          {/* Catatan akses terpisah */}
          <div className="flex items-start gap-1.5 px-1">
            <span
              className="mt-0.5 text-[16px] text-[#56554f]"
              aria-hidden="true"
            >
              ⓘ
            </span>

            <p className="text-[13px] leading-5 text-[#434655]">
              Akses Template Premium & AI Style dibeli terpisah. Membuka salah
              satu fitur tidak otomatis mencakup yang lain.
            </p>
          </div>
        </section>

        {/* AKTIVITAS & PENGATURAN */}
        <section className="space-y-1">
          <div className="px-1">
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[#434655]">
              Aktivitas & Pengaturan
            </h3>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            {/* Pembelian */}
            <button
              type="button"
              onClick={() =>
                alert("Prototype: halaman Pembelian Saya belum tersedia.")
              }
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#f3f3f6]"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edeef0]">
                  🧾
                </span>
                <span className="text-[15px] font-semibold">
                  Pembelian Saya
                </span>
              </span>

              <span className="flex items-center gap-1 text-[#434655]">
                <span className="text-[13px] leading-5">3 Transaksi</span>
                <span aria-hidden="true">›</span>
              </span>
            </button>

            <div className="mx-4 h-px bg-[#edeef0]" />

            {/* Bantuan */}
            <button
              type="button"
              onClick={() =>
                alert("Prototype: halaman Bantuan & Panduan belum tersedia.")
              }
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#f3f3f6]"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edeef0]">
                  ❓
                </span>
                <span className="text-[15px] font-semibold">
                  Bantuan & Panduan
                </span>
              </span>

              <span className="text-[#434655]" aria-hidden="true">
                ›
              </span>
            </button>

            <div className="mx-4 h-px bg-[#edeef0]" />

            {/* Kebijakan */}
            <button
              type="button"
              onClick={() =>
                alert("Prototype: halaman Kebijakan Privasi belum tersedia.")
              }
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#f3f3f6]"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edeef0]">
                  🛡
                </span>
                <span className="text-[15px] font-semibold">
                  Kebijakan Privasi
                </span>
              </span>

              <span className="text-[#434655]" aria-hidden="true">
                ›
              </span>
            </button>

            <div className="mx-4 h-px bg-[#edeef0]" />

            {/* ACCORDION PENGATURAN */}
            <button
              type="button"
              onClick={() => setIsSettingsOpen((current) => !current)}
              aria-expanded={isSettingsOpen}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#f3f3f6]"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edeef0]">
                  ⚙
                </span>
                <span className="text-[15px] font-semibold">
                  Pengaturan Akun
                </span>
              </span>

              <span
                className={`text-[20px] text-[#434655] transition-transform duration-200 ${
                  isSettingsOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            {isSettingsOpen && (
              <div className="space-y-2 bg-[#f3f3f6] px-4 py-2">
                {/* Ubah nama */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[13px] font-semibold">
                      Ubah Nama Tampilan
                    </div>
                    <div className="text-[13px] leading-5 text-[#434655]">
                      {displayName}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setNameInput(displayName);
                      setIsEditNameOpen((current) => !current);
                    }}
                    className="rounded-lg bg-[#e2e2e5] px-3 py-1 text-[11px] font-bold transition-colors hover:bg-[#e2e2e5]"
                  >
                    Ubah
                  </button>
                </div>

                {isEditNameOpen && (
                  <div className="pb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(event) => setNameInput(event.target.value)}
                        placeholder="Ketik nama baru..."
                        className="w-full rounded-md bg-white px-3 py-2 text-[13px] outline-none"
                      />

                      <button
                        type="button"
                        onClick={handleSaveName}
                        className="rounded-md bg-[#004ac6] px-3 py-2 text-[11px] font-bold text-white shadow-sm"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                )}

                <div className="h-px bg-[#edeef0]" />

                {/* Hapus akun */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[13px] font-semibold text-[#ba1a1a]">
                      Hapus Akun
                    </div>
                    <div className="text-[13px] leading-5 text-[#434655]">
                      Hapus profil dan semua deck permanen
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Hapus akun"
                    onClick={() => setIsDeleteOpen(true)}
                    className="rounded-lg bg-[#ffdad6] p-1.5 text-[#93000a] transition-opacity hover:opacity-90"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* KELUAR */}
        <section className="pt-1">
          <button
            type="button"
            onClick={() => setIsLogoutOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e8e8ea] px-4 py-3.5 text-[15px] font-semibold shadow-sm transition-colors hover:bg-[#e2e2e5]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 12H4m4-4-4 4 4 4m5-12h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Keluar
          </button>
        </section>
      </div>

      {/* MODAL KELUAR */}
      {isLogoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f3133]/40 p-5 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl bg-white p-4 shadow-xl">
            <div className="mb-1 flex h-12 w-12 items-center justify-center self-center rounded-full bg-[#edeef0]">
              <span className="text-[26px]" aria-hidden="true">
                ↪
              </span>
            </div>

            <div className="space-y-1 text-center">
              <h3 className="text-[20px] font-semibold">Keluar dari Akun?</h3>

              <p className="text-[13px] leading-5 text-[#434655]">
                Kamu harus masuk kembali menggunakan akun Google untuk mengakses
                deck kartu kamu.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsLogoutOpen(false)}
                className="flex-1 rounded-lg bg-[#edeef0] py-2.5 text-[13px] font-semibold transition-colors hover:bg-[#e8e8ea]"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLogoutOpen(false);
                  // Prototype: logout Google belum diaktifkan.
                  router.back();
                }}
                className="flex-1 rounded-lg bg-[#004ac6] py-2.5 text-[13px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HAPUS AKUN */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f3133]/40 p-5 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl bg-white p-4 shadow-xl">
            <div className="mb-1 flex h-12 w-12 items-center justify-center self-center rounded-full bg-[#ffdad6] text-[#93000a]">
              <span className="text-[26px]" aria-hidden="true">
                !
              </span>
            </div>

            <div className="space-y-1 text-center">
              <h3 className="text-[20px] font-semibold">
                Hapus Akun Permanen?
              </h3>

              <p className="text-[13px] leading-5 text-[#434655]">
                Tindakan ini tidak dapat dibatalkan. Seluruh deck kartu yang
                pernah kamu buat dan sisa token akan terhapus.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 rounded-lg bg-[#edeef0] py-2.5 text-[13px] font-semibold transition-colors hover:bg-[#e8e8ea]"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDeleteOpen(false);
                  alert("Prototype: penghapusan akun belum diaktifkan.");
                }}
                className="flex-1 rounded-lg bg-[#ba1a1a] py-2.5 text-[13px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Hapus Akun
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
