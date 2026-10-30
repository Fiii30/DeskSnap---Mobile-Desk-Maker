// Props modal keluar.
type LogoutModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

// Modal konfirmasi keluar akun.
export default function LogoutModal({ onCancel, onConfirm }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-surface-card p-4 shadow-card-strong">
        <div className="mb-1 flex h-12 w-12 items-center justify-center self-center rounded-full bg-surface-muted text-xl">
          ↪
        </div>

        <div className="space-y-1 text-center">
          <h3 className="text-lg font-bold text-ink">Keluar dari Akun?</h3>

          <p className="text-xs leading-5 text-ink-soft">
            Kamu harus masuk kembali menggunakan akun Google untuk mengakses
            deck kartu kamu.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg bg-surface-muted py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-surface-hover"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-primary py-2.5 text-xs font-semibold text-white shadow-button transition-opacity hover:opacity-90"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
