// Props modal ubah nama deck.
type RenameDeckModalProps = {
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
};

// Modal ubah nama deck.
export default function RenameDeckModal({
  value,
  onChange,
  onCancel,
  onSave,
}: RenameDeckModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-surface-card p-5 shadow-card-strong">
        <h3 className="mb-1 text-lg font-bold text-ink">Ubah Nama Deck</h3>

        <p className="mb-4 text-xs leading-5 text-ink-soft">
          Masukkan judul baru untuk deck kartu ini.
        </p>

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mb-5 w-full rounded-lg border border-surface-muted bg-surface-soft px-3 py-2.5 text-sm text-ink focus:border-primary focus:bg-surface-card focus:outline-none"
        />

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl bg-surface-muted py-2.5 text-sm font-semibold text-ink"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-xl bg-primary py-2.5 text-sm font-bold text-white"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
