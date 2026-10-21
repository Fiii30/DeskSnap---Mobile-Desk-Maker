"use client";

// useState mengelola produk aktif, modal, dan status pembayaran simulasi.
import { useState } from "react";

// Tipe produk yang bisa dipilih.
type ProductKey = "template" | "ai";

// Tipe status modal pembayaran.
type PaymentState = "pending" | "success" | "failed";

// Data produk sesuai export Stitch.
const PRODUCTS = {
  template: {
    title: "Template Premium",
    description: "Buka varian kartu eksklusif JQKA dan Trivia Kuis.",
    price: "Rp49.000",
    receiptTitle: "Template Premium (Lisensi Akun)",
    clarification:
      "Fitur AI Style dijual terpisah, tidak termasuk dalam paket ini.",
    successMessage: "Akses Template Premium kini aktif permanen di akunmu.",
    icon: "▦",
    iconColor: "text-[#004ac6]",
  },
  ai: {
    title: "AI Style",
    description: "Ubah gaya foto untuk seluruh kartu-kartumu secara otomatis.",
    price: "Rp29.000",
    receiptTitle: "AI Style (Lisensi Akun)",
    clarification: "Tidak termasuk paket Template Premium JQKA/Trivia.",
    successMessage: "Akses AI Style kini aktif permanen di akunmu.",
    icon: "✦",
    iconColor: "text-[#0060ac]",
  },
} as const;

// Halaman Pembayaran.
export default function PaymentScreen() {
  // Produk yang sedang dilihat.
  const [activeProduct, setActiveProduct] = useState<ProductKey>("ai");

  // Modal terbuka atau tidak.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status tampilan dalam modal.
  const [paymentState, setPaymentState] = useState<PaymentState>("pending");

  // Mengambil data produk aktif.
  const product = PRODUCTS[activeProduct];

  // Membuka modal pada status tertentu.
  function openModal(state: PaymentState) {
    setPaymentState(state);
    setIsModalOpen(true);
  }

  // Menutup modal.
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <main className="relative min-h-dvh bg-[#f9f9fb] pb-[env(safe-area-inset-bottom)] pt-16 text-[#1a1c1e]">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#f9f9fb]/80 pt-[env(safe-area-inset-top)] shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="relative flex h-16 items-center justify-between px-4">
          <button
            type="button"
            aria-label="Kembali"
            onClick={() => history.back()}
            className="z-10 flex h-11 w-11 items-center justify-center rounded-lg transition-transform hover:bg-[#edeef0] active:scale-95"
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

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-14">
            <h1 className="truncate text-center text-[20px] font-semibold tracking-tight">
              Pembayaran
            </h1>
          </div>

          <div className="z-10 flex h-11 w-11 items-center justify-end">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#004ac6] text-[12px] font-bold text-white">
              RP
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-md px-4 pb-12">
        {/* PEMILIH PRODUK */}
        <section className="mb-3 mt-4">
          <div className="flex items-center justify-between rounded-xl bg-[#f3f3f6] p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveProduct("template")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition-all ${
                activeProduct === "template"
                  ? "bg-white text-[#1a1c1e] shadow-sm"
                  : "text-[#434655] hover:text-[#1a1c1e]"
              }`}
            >
              <span className="text-[18px] text-[#004ac6]" aria-hidden="true">
                ▦
              </span>
              Template Premium
            </button>

            <button
              type="button"
              onClick={() => setActiveProduct("ai")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition-all ${
                activeProduct === "ai"
                  ? "bg-white text-[#1a1c1e] shadow-sm"
                  : "text-[#434655] hover:text-[#1a1c1e]"
              }`}
            >
              <span className="text-[18px] text-[#0060ac]" aria-hidden="true">
                ✦
              </span>
              AI Style
            </button>
          </div>
        </section>

        {/* KARTU PRODUK */}
        <section className="mb-5">
          <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg bg-[#edeef0] shadow-inner ${product.iconColor}`}
                >
                  <span className="text-[28px]" aria-hidden="true">
                    {product.icon}
                  </span>
                </div>

                <div>
                  <div className="mb-0.5 flex items-center gap-2">
                    <h2 className="text-[20px] font-semibold leading-7">
                      {product.title}
                    </h2>

                    <span className="shrink-0 rounded-full bg-[#e8e8ea] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      Berlangganan
                    </span>
                  </div>

                  <p className="text-[13px] leading-5 text-[#434655]">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

            {/* PENJELASAN AKSES TERPISAH */}
            <div className="mt-3.5 flex items-center gap-2 rounded-lg bg-[#f3f3f6] p-2.5 pt-3 text-[#434655]">
              <span className="text-[18px] text-[#737686]" aria-hidden="true">
                ⓘ
              </span>
              <span className="text-[13px] font-semibold">
                {product.clarification}
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-t border-[#f3f3f6] pt-3">
              <div className="flex items-center gap-1 text-[#434655]">
                <span className="text-[16px] text-[#004ac6]" aria-hidden="true">
                  ✓
                </span>
                <span className="text-[11px] font-bold">Per Bulan</span>
              </div>

              <span className="text-[24px] font-bold leading-8 tracking-tight">
                {product.price}
              </span>
            </div>
          </div>
        </section>

        {/* RINCIAN PEMBAYARAN */}
        <section className="mb-5">
          <div className="relative rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[18px] text-[#737686]" aria-hidden="true">
                  🧾
                </span>
                <h3 className="text-[20px] font-semibold">
                  Rincian Pembayaran
                </h3>
              </div>

              <span className="rounded bg-[#edeef0] px-2 py-0.5 text-[11px] font-bold text-[#434655]">
                Digital Order
              </span>
            </div>

            <div className="space-y-2 py-2">
              <div className="flex items-center justify-between text-[15px] leading-6">
                <span>{product.receiptTitle}</span>
                <span className="text-[15px] font-semibold">
                  {product.price}
                </span>
              </div>

              <div className="flex items-center justify-between text-[13px] leading-5 text-[#434655]">
                <span>Pajak & Biaya Layanan</span>
                <span className="text-[13px] font-semibold text-[#004ac6]">
                  Rp0 (Gratis)
                </span>
              </div>
            </div>

            <div className="my-3 flex items-center gap-2 rounded-lg bg-[#f3f3f6] p-2.5">
              <span className="text-[16px] text-[#56554f]" aria-hidden="true">
                📦
              </span>
              <span className="text-[11px] font-bold text-[#434655]">
                Produk Digital • Tanpa Pengiriman Fisik
              </span>
            </div>

            <div className="flex items-baseline justify-between border-t border-[#f3f3f6] pt-2">
              <div>
                <span className="text-[15px] font-semibold">
                  Total Pembayaran
                </span>
                <p className="text-[11px] font-bold text-[#737686]">
                  Harga contoh prototype
                </p>
              </div>

              <span className="text-[34px] font-extrabold leading-[42px] tracking-tight text-[#2563eb]">
                {product.price}
              </span>
            </div>
          </div>
        </section>

        {/* TOMBOL BAYAR */}
        <section className="mb-6 space-y-4">
          <button
            type="button"
            onClick={() => openModal("pending")}
            className="flex w-full items-center justify-between rounded-xl bg-[#C2410C] px-4 py-3.5 text-white shadow-md transition-all hover:bg-[#9A3412] active:scale-[0.99]"
          >
            <span className="flex items-center gap-2">
              <span className="text-[20px]" aria-hidden="true">
                🔒
              </span>
              <span className="text-[20px] font-semibold leading-7">
                Lanjut Bayar
              </span>
            </span>

            <span className="flex items-center gap-1.5">
              <span className="text-[15px] font-semibold opacity-90">
                {product.price}
              </span>
              <span aria-hidden="true">→</span>
            </span>
          </button>

          <div className="rounded-xl bg-[#f3f3f6] p-3.5 text-center shadow-sm">
            <div className="mb-2 flex items-center justify-center gap-1.5">
              <span className="text-[18px] text-[#004ac6]" aria-hidden="true">
                🛡
              </span>
              <span className="text-[13px] font-semibold">
                Pembayaran Aman via Midtrans
              </span>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-center gap-1.5 py-1">
              {[
                "QRIS",
                "GoPay",
                "ShopeePay",
                "BCA VA",
                "Mandiri",
                "BRI / BNI",
              ].map((method) => (
                <span
                  key={method}
                  className="rounded bg-white px-2 py-1 text-[11px] font-bold shadow-sm"
                >
                  {method}
                </span>
              ))}
            </div>

            <p className="mx-auto max-w-xs text-[13px] leading-5 text-[#434655]">
              Metode pembayaran dipilih langsung di halaman Midtrans yang
              terenkripsi. Tidak perlu memasukkan nomor rekening atau data
              sensitif di sini.
            </p>
          </div>
        </section>

        {/* PANEL SIMULASI */}
        <section className="mt-6 rounded-xl bg-[#f3f3f6] p-3 pt-3 shadow-inner">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#434655]">
              <span aria-hidden="true">⚙</span>
              Panel Simulasi Prototype
            </span>

            <span className="rounded bg-[#edeef0] px-1.5 py-0.5 text-[11px] font-bold text-[#737686]">
              Hanya Demo
            </span>
          </div>

          <div className="mb-2 grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => openModal("pending")}
              className="rounded bg-white px-2 py-1.5 text-[11px] font-bold shadow-sm transition-colors hover:bg-[#edeef0]"
            >
              Pending
            </button>

            <button
              type="button"
              onClick={() => openModal("success")}
              className="rounded bg-white px-2 py-1.5 text-[11px] font-bold shadow-sm transition-colors hover:bg-[#edeef0]"
            >
              Berhasil
            </button>

            <button
              type="button"
              onClick={() => openModal("failed")}
              className="rounded bg-white px-2 py-1.5 text-[11px] font-bold shadow-sm transition-colors hover:bg-[#edeef0]"
            >
              Gagal
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] font-bold text-[#434655]">
            <span>Ganti Produk:</span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveProduct("template")}
                className="underline hover:text-[#1a1c1e]"
              >
                Template (Rp49rb)
              </button>

              <span aria-hidden="true">•</span>

              <button
                type="button"
                onClick={() => setActiveProduct("ai")}
                className="underline hover:text-[#1a1c1e]"
              >
                AI Style (Rp29rb)
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* MODAL SIMULASI PEMBAYARAN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1C1917]/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#edeef0] sm:hidden" />

            {/* STATUS MENUNGGU */}
            {paymentState === "pending" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#0060ac]" />
                    <h3 className="text-[20px] font-semibold">
                      Menunggu Pembayaran
                    </h3>
                  </div>

                  <button
                    type="button"
                    aria-label="Tutup modal"
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edeef0] text-[#434655] hover:text-[#1a1c1e]"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#f3f3f6] p-3.5">
                  <div>
                    <span className="text-[11px] font-bold text-[#434655]">
                      Kode Pesanan
                    </span>
                    <p className="text-[15px] font-semibold tracking-wider">
                      #DS-88291
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-[#434655]">
                      Sisa Waktu
                    </span>
                    <p className="flex items-center justify-end gap-1 text-[15px] font-semibold text-[#ba1a1a]">
                      <span aria-hidden="true">⏱</span>
                      14:59
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl bg-white p-4 text-center shadow-sm">
                  <div className="mb-2 flex h-36 w-36 items-center justify-center rounded-lg bg-[#edeef0] shadow-inner">
                    <span
                      className="text-[64px] text-[#56554f]"
                      aria-hidden="true"
                    >
                      ▦
                    </span>
                  </div>

                  <span className="text-[13px] font-semibold">
                    Scan QRIS melalui aplikasi pilihanmu
                  </span>

                  <p className="mt-1 text-[13px] leading-5 text-[#434655]">
                    BCA Mobile, Livin&apos;, GoPay, Dana, atau OVO
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setPaymentState("success")}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#004ac6] py-3 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#0053db] active:scale-[0.99]"
                  >
                    <span aria-hidden="true">✓</span>
                    Simulasi Bayar Berhasil
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentState("failed")}
                    className="w-full rounded-lg bg-[#edeef0] py-2.5 text-[13px] font-semibold transition-all hover:bg-[#e8e8ea]"
                  >
                    Simulasi Pembayaran Gagal
                  </button>
                </div>
              </div>
            )}

            {/* STATUS BERHASIL */}
            {paymentState === "success" && (
              <div className="space-y-4 pb-1 pt-2 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8e8ea] shadow-inner">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#004ac6] text-white shadow-sm">
                    <span className="text-[28px]" aria-hidden="true">
                      ✓
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-[26px] font-bold leading-[34px] tracking-tight">
                    Pembayaran Berhasil!
                  </h3>

                  <p className="mx-auto max-w-xs text-[15px] leading-6 text-[#434655]">
                    {product.successMessage}
                  </p>
                </div>

                <div className="space-y-2 rounded-xl bg-[#f3f3f6] p-3.5 text-left">
                  <div className="flex items-start gap-2">
                    <span
                      className="text-[18px] text-[#004ac6]"
                      aria-hidden="true"
                    >
                      🔖
                    </span>

                    <div>
                      <p className="text-[13px] font-semibold">
                        Draft Kartu Tersimpan Aman
                      </p>
                      <p className="text-[13px] leading-5 text-[#434655]">
                        Pilihan kartu yang telah kamu atur tetap tersimpan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <span
                      className="text-[18px] text-[#737686]"
                      aria-hidden="true"
                    >
                      ⓘ
                    </span>

                    <p className="text-[13px] leading-5 text-[#434655]">
                      Tidak otomatis memulai generasi AI. Akses aktif seketika
                      di editor.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full rounded-lg bg-[#C2410C] py-3 text-[20px] font-semibold text-white shadow-md transition-all hover:bg-[#9A3412]"
                >
                  Lanjutkan ke Editor
                </button>
              </div>
            )}

            {/* STATUS GAGAL */}
            {paymentState === "failed" && (
              <div className="space-y-4 pb-1 pt-2 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffdad6]">
                  <span
                    className="text-[32px] text-[#ba1a1a]"
                    aria-hidden="true"
                  >
                    ✕
                  </span>
                </div>

                <div>
                  <h3 className="mb-1 text-[26px] font-bold leading-[34px] tracking-tight">
                    Pembayaran Belum Berhasil
                  </h3>

                  <p className="mx-auto max-w-xs text-[15px] leading-6 text-[#434655]">
                    Waktu pembayaran habis atau transaksi dibatalkan. Jangan
                    khawatir, draft kartumu tidak terhapus.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setPaymentState("pending")}
                    className="w-full rounded-lg bg-[#004ac6] py-3 text-[20px] font-semibold text-white shadow-sm transition-all"
                  >
                    Coba Bayar Lagi
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full rounded-lg bg-[#edeef0] py-2.5 text-[13px] font-semibold transition-all hover:bg-[#e8e8ea]"
                  >
                    Kembali ke Editor
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
