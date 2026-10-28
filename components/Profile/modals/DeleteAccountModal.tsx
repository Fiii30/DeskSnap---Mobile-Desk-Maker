// Props modal hapus akun.
type DeleteAccountModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

// Modal konfirmasi hapus akun.
export default function DeleteAccountModal({
  onCancel,
  onConfirm,
}: DeleteAccountModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-surface-card p-4 shadow-card-strong">
        <div className="mb-1 flex h-12 w-12 items-center justify-center self-center rounded-full bg-danger/10 text-xl text-danger">
          !
        </div>

        <div className="space-y-1 text-center">
          <h3 className="text-lg font-bold text-ink">Hapus Akun Permanen?</h3>

          <p className="text-xs leading-5 text-ink-soft">
            Tindakan ini tidak dapat dibatalkan. Seluruh deck kartu yang pernah
            kamu buat dan sisa token akan terhapus.
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
            className="flex-1 rounded-lg bg-danger py-2.5 text-xs font-semibold text-white shadow-button transition-opacity hover:opacity-90"
          >
            Hapus Akun
          </button>
        </div>
      </div>
    </div>
  );
}
