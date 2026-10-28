// Tipe produk dan status.
import type { PaymentProduct, PaymentStatus } from "../data/payment-types";

// Props modal status pembayaran.
type PaymentStatusModalProps = {
  status: PaymentStatus;
  product: PaymentProduct;
  onClose: () => void;
  onChangeStatus: (status: PaymentStatus) => void;
};

// Modal simulasi status pembayaran.
export default function PaymentStatusModal({
  status,
  product,
  onClose,
  onChangeStatus,
}: PaymentStatusModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="relative max-h-screen w-full max-w-md overflow-y-auto rounded-t-3xl bg-surface-card p-5 shadow-card-strong sm:rounded-2xl">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-surface-muted sm:hidden" />

        {/* STATUS PENDING */}
        {status === "pending" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-secondary" />
                <h3 className="text-base font-bold text-ink">
                  Menunggu Pembayaran
                </h3>
              </div>

              <button
                type="button"
                aria-label="Tutup modal"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-ink-soft"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-surface-soft p-3.5">
              <div>
                <span className="text-xs font-bold text-ink-soft">
                  Kode Pesanan
                </span>
                <p className="text-sm font-semibold tracking-wider text-ink">
                  #DS-88291
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-ink-soft">
                  Sisa Waktu
                </span>
                <p className="flex items-center justify-end gap-1 text-sm font-semibold text-danger">
                  ⏱ 14:59
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-xl bg-surface-card p-4 text-center shadow-button">
              <div className="mb-2 flex h-36 w-36 items-center justify-center rounded-lg bg-surface-soft shadow-inner">
                <span className="text-6xl text-ink-muted">▦</span>
              </div>

              <span className="text-xs font-semibold text-ink">
                Scan QRIS melalui aplikasi pilihanmu
              </span>

              <p className="mt-1 text-xs leading-5 text-ink-soft">
                BCA Mobile, Livin&apos;, GoPay, Dana, atau OVO
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => onChangeStatus("success")}
                className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-button transition-all active:scale-[0.99]"
              >
                ✓ Simulasi Bayar Berhasil
              </button>

              <button
                type="button"
                onClick={() => onChangeStatus("failed")}
                className="w-full rounded-lg bg-surface-muted py-2.5 text-xs font-semibold text-ink transition-all hover:bg-surface-hover"
              >
                Simulasi Pembayaran Gagal
              </button>
            </div>
          </div>
        )}

        {/* STATUS SUCCESS */}
        {status === "success" && (
          <div className="space-y-4 pb-1 pt-2 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-hover shadow-inner">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-button">
                ✓
              </div>
            </div>

            <div>
              <h3 className="mb-1 text-xl font-bold leading-7 text-ink">
                Pembayaran Berhasil!
              </h3>

              <p className="mx-auto max-w-xs text-sm leading-6 text-ink-soft">
                {product.successMessage}
              </p>
            </div>

            <div className="space-y-2 rounded-xl bg-surface-soft p-3.5 text-left">
              <div className="flex items-start gap-2">
                <span className="text-primary">🔖</span>

                <div>
                  <p className="text-xs font-semibold text-ink">
                    Draft Kartu Tersimpan Aman
                  </p>

                  <p className="text-xs leading-5 text-ink-soft">
                    Pilihan kartu yang telah kamu atur tetap tersimpan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <span className="text-ink-muted">ⓘ</span>

                <p className="text-xs leading-5 text-ink-soft">
                  Tidak otomatis memulai generasi AI. Akses aktif seketika di
                  editor.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg bg-primary py-3 text-base font-bold text-white shadow-button transition-all"
            >
              Lanjutkan ke Editor
            </button>
          </div>
        )}

        {/* STATUS FAILED */}
        {status === "failed" && (
          <div className="space-y-4 pb-1 pt-2 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
              <span className="text-3xl text-danger">✕</span>
            </div>

            <div>
              <h3 className="mb-1 text-xl font-bold leading-7 text-ink">
                Pembayaran Belum Berhasil
              </h3>

              <p className="mx-auto max-w-xs text-sm leading-6 text-ink-soft">
                Waktu pembayaran habis atau transaksi dibatalkan. Jangan
                khawatir, draft kartumu tidak terhapus.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => onChangeStatus("pending")}
                className="w-full rounded-lg bg-primary py-3 text-base font-bold text-white shadow-button"
              >
                Coba Bayar Lagi
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-lg bg-surface-muted py-2.5 text-xs font-semibold text-ink transition-all hover:bg-surface-hover"
              >
                Kembali ke Editor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
