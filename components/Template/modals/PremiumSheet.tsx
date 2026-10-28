// Props bottom sheet premium.
type PremiumSheetProps = {
  onClose: () => void;
  onContinuePayment: () => void;
};

// Bottom sheet penawaran Template Premium.
export default function PremiumSheet({
  onClose,
  onContinuePayment,
}: PremiumSheetProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-ink/40 backdrop-blur-sm">
      <div className="w-full rounded-t-3xl bg-surface-card p-5 pb-[env(safe-area-inset-bottom)] shadow-card-strong">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-surface-muted" />

        <div className="mb-3 flex items-start justify-between">
          <div className="flex flex-col">
            <span className="mb-1.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-bold text-primary-deep">
              👑 PAKET KARTU LENGKAP
            </span>

            <h2 className="text-lg font-bold text-ink">
              Buka Akses Template Premium
            </h2>
          </div>

          <button
            type="button"
            aria-label="Tutup penawaran premium"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-ink-soft transition-colors hover:text-ink"
          >
            ✕
          </button>
        </div>

        <p className="mb-4 text-sm leading-6 text-ink-soft">
          Buka akses permanen untuk template JQKA dan Trivia Kuis tanpa batas cetak.
        </p>

        {/* Isi paket */}
        <div className="mb-4 flex flex-col gap-2.5 rounded-xl bg-surface-soft p-3.5">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-lg text-primary">▦</span>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-ink">
                Template Kartu Remi JQKA
              </span>

              <span className="text-xs leading-5 text-ink-soft">
                Desain lengkap 54 kartu siap kustomisasi foto.
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-surface-muted" />

          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-lg text-primary">❓</span>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-ink">Template Trivia Kuis</span>

              <span className="text-xs leading-5 text-ink-soft">
                Format Q&A interaktif dua sisi siap cetak massal.
              </span>
            </div>
          </div>
        </div>

        {/* Harga */}
        <div className="mb-4 flex items-center justify-between rounded-lg bg-surface-muted p-3">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-ink-soft">
              Bayar Sekali, Miliki Selamanya
            </span>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold leading-7 text-ink">Rp49.000</span>

              <span className="text-xs font-bold text-ink-muted line-through">
                Rp89.000
              </span>
            </div>
          </div>

          <span className="rounded bg-danger/10 px-2 py-0.5 text-xs font-bold text-danger">
            Hemat 45%
          </span>
        </div>

        {/* Aksi */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onContinuePayment}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-white shadow-button transition-transform active:scale-[0.98]"
          >
            Lanjut ke Pembayaran
            <span aria-hidden="true">💳</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-full items-center justify-center rounded-lg text-xs font-semibold text-ink"
          >
            Nanti Saja
          </button>
        </div>

        <p className="mt-2 text-center text-xs font-bold text-ink-muted">
          Pembelian Template Premium terpisah dari AI Style dan berlaku selamanya.
        </p>
      </div>
    </div>
  );
}