// Props header Editor.
type EditorHeaderProps = {
  deckTitle: string;
  onBack: () => void;
  onOpenMenu: () => void;
};

// Header Editor & Preview.
export default function EditorHeader({
  deckTitle,
  onBack,
  onOpenMenu,
}: EditorHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-surface-muted bg-surface/90 pt-4 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Kembali ke Dashboard"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform hover:bg-surface-muted active:scale-95"
          >
            <svg
              width="22"
              height="22"
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

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight text-ink">
              {deckTitle}
            </span>

            <span className="inline-flex items-center gap-1 rounded-full border border-primary-soft bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary-deep">
              ✓ Tersimpan
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label="Opsi Deck"
          onClick={onOpenMenu}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform hover:bg-surface-muted active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="5" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
          </svg>
        </button>
      </div>
    </header>
  );
}
