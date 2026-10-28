// Props empty state.
type DeckEmptyStateProps = {
  onCreateDeck: () => void;
};

// Tampilan ketika belum ada deck.
export default function DeckEmptyState({ onCreateDeck }: DeckEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-surface-card px-4 py-12 text-center shadow-card">
      <div className="relative mb-4 flex h-24 w-20 items-center justify-center rounded-xl bg-surface-muted">
        <div className="flex h-18 w-14 items-center justify-center rounded-lg bg-surface-card shadow-sm">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="8"
              y="4"
              width="12"
              height="16"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.7"
              className="text-primary"
            />
            <path
              d="M5 6 3 17a2 2 0 0 0 1.6 2.3l2.4.4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              className="text-primary"
            />
          </svg>
        </div>

        <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
          +
        </span>
      </div>

      <h3 className="mb-1 text-lg font-bold text-ink">Belum ada deck.</h3>

      <p className="mb-6 max-w-xs text-sm leading-6 text-ink-soft">
        Mulai dari foto favoritmu dan cetak jadi kartu fisik berkualitas
        boutique.
      </p>

      <button
        type="button"
        onClick={onCreateDeck}
        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-button transition-all hover:bg-primary-deep active:scale-95"
      >
        + Buat Deck Sekarang
      </button>
    </div>
  );
}
