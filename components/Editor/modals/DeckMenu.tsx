// Props menu deck.
type DeckMenuProps = {
  onClose: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

// Menu opsi deck.
export default function DeckMenu({
  onClose,
  onRename,
  onDuplicate,
  onDelete,
}: DeckMenuProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Tutup menu deck"
        onClick={onClose}
        className="fixed inset-0 z-40 cursor-default"
      />

      <div className="fixed inset-x-4 bottom-6 z-50 mx-auto w-full max-w-xs rounded-xl bg-surface-card py-1.5 text-left shadow-card-strong">
        <button
          type="button"
          onClick={onRename}
          className="flex w-full items-center gap-2.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-ink hover:bg-surface-soft"
        >
          ✎ Ubah Nama Deck
        </button>

        <button
          type="button"
          onClick={() => {
            onClose();
            alert("Prototype: Pengaturan Cetak belum tersedia.");
          }}
          className="flex w-full items-center gap-2.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-ink hover:bg-surface-soft"
        >
          ⚙ Pengaturan Cetak
        </button>

        <button
          type="button"
          onClick={onDuplicate}
          className="flex w-full items-center gap-2.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-ink hover:bg-surface-soft"
        >
          ⧉ Duplikasi Deck
        </button>

        <div className="my-1 border-t border-surface-muted" />

        <button
          type="button"
          onClick={onDelete}
          className="flex w-full items-center gap-2.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-danger hover:bg-danger/10"
        >
          🗑 Hapus Deck
        </button>
      </div>
    </>
  );
}
