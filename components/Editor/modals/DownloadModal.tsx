// Props modal unduh.
type DownloadModalProps = {
  phase: "confirm" | "ready";
  deckCount: number;
  onClose: () => void;
  onConfirm: () => void;
  onBackRoute: () => void;
  onExportPdf: () => void | Promise<void>;
  onExportZip: () => void | Promise<void>;
};

// Modal siapkan dan unduh deck.
export default function DownloadModal({
  phase,
  deckCount,
  onClose,
  onConfirm,
  onBackRoute,
  onExportPdf,
  onExportZip,
}: DownloadModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-md rounded-t-3xl border border-surface-muted bg-surface p-5 shadow-card-strong sm:rounded-2xl">
        {phase === "confirm" ? (
          <>
            <div className="flex items-center justify-between border-b border-surface-muted pb-2">
              <h3 className="text-base font-bold text-ink">
                Siapkan Berkas Cetak
              </h3>

              <button
                type="button"
                aria-label="Tutup"
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-muted text-ink-soft"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-2 rounded-xl border border-surface-muted bg-surface-card p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-soft">Kelengkapan Deck:</span>
                <span className="font-bold text-primary">
                  ✓ {deckCount} dari {deckCount} Kartu Lengkap
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-soft">Format:</span>
                <span className="font-bold text-ink">
                  A4 Lembar Standar (300 DPI)
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-surface-muted pt-2 text-xs">
                <span className="text-ink-soft">Biaya Cetak & Unduh:</span>
                <span className="font-bold text-primary">✓ Gratis</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={onConfirm}
                className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-button transition-all hover:bg-primary-deep active:scale-[0.99]"
              >
                Konfirmasi Cetak & Unduh ⬇
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl py-2.5 text-xs font-semibold text-ink-soft"
              >
                Batal
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-surface-muted pb-2">
              <h3 className="text-base font-bold text-ink">
                Deck Siap Diunduh!
              </h3>

              <button
                type="button"
                aria-label="Tutup"
                onClick={onBackRoute}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-muted text-ink-soft"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-2">
              <button
                type="button"
                onClick={onExportPdf}
                className="flex w-full items-center justify-between rounded-xl border border-surface-muted bg-surface-card p-3.5 text-left shadow-button transition-all hover:border-primary"
              >
                <span>
                  <span className="block text-xs font-bold text-ink">
                    PDF Siap Cetak (A4 300 DPI)
                  </span>

                  <span className="text-xs text-ink-soft">
                    6 kartu per lembar + garis potong halus
                  </span>
                </span>

                <span className="text-ink-muted">⬇</span>
              </button>

              <button
                type="button"
                onClick={onExportZip}
                className="flex w-full items-center justify-between rounded-xl border border-surface-muted bg-surface-card p-3.5 text-left shadow-button transition-all hover:border-primary"
              >
                <span>
                  <span className="block text-xs font-bold text-ink">
                    Gambar Kartu (ZIP HD)
                  </span>

                  <span className="text-xs text-ink-soft">
                    Berkas PNG individual kualitas tinggi
                  </span>
                </span>

                <span className="text-ink-muted">⬇</span>
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  alert("Prototype: fitur bagikan belum tersedia.")
                }
                className="flex-1 rounded-xl bg-surface-muted py-3 text-xs font-bold text-ink"
              >
                ↗ Bagikan
              </button>

              <button
                type="button"
                onClick={onBackRoute}
                className="flex-1 rounded-xl bg-ink py-3 text-xs font-bold text-white"
              >
                Kembali
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
