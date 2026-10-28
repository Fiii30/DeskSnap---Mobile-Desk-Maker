// Tipe Deck diimpor agar komponen tahu bentuk datanya.
import type { Deck } from "../data/dashboard-types";

// Props kartu deck.
type DeckCardProps = {
  deck: Deck;
  onOpenDeck: (deck: Deck) => void;
  onOpenMenu: (deck: Deck) => void;
};

// Kartu satu deck pada grid Dashboard.
export default function DeckCard({
  deck,
  onOpenDeck,
  onOpenMenu,
}: DeckCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-surface-card shadow-card transition-all duration-200 hover:shadow-card-strong">
      {/* Cover deck */}
      <button
        type="button"
        onClick={() => onOpenDeck(deck)}
        className="relative block h-60 w-full overflow-hidden bg-surface-soft"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={deck.image}
          alt={`Cover deck ${deck.title}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute inset-0 bg-linier-to-t from-dark/60 via-transparent to-transparent opacity-60" />

        <span
          className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-xs font-bold backdrop-blur-sm ${
            deck.status === "Siap Cetak"
              ? "bg-primary-soft text-primary-deep"
              : "bg-white/90 text-ink-soft"
          }`}
        >
          {deck.status}
        </span>
      </button>

      {/* Informasi deck */}
      <div className="flex grow flex-col justify-between p-3">
        <div className="flex items-start justify-between gap-1">
          <button
            type="button"
            onClick={() => onOpenDeck(deck)}
            className="min-w-0 text-left"
          >
            <h3 className="truncate text-sm font-bold text-ink">
              {deck.title}
            </h3>
            <p className="text-xs leading-5 text-ink-soft">
              {deck.cardCount} Kartu
            </p>
          </button>

          <button
            type="button"
            aria-label={`Opsi deck ${deck.title}`}
            onClick={() => onOpenMenu(deck)}
            className="-mr-1 rounded-full p-1 text-ink-soft transition-colors hover:bg-surface-muted"
          >
            <svg
              width="18"
              height="18"
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

        <div className="mt-2 flex items-center justify-between border-t border-surface-muted pt-2 text-ink-muted">
          <span className="flex items-center gap-1 text-xs font-bold">
            <span aria-hidden="true">
              {deck.status === "Siap Cetak" ? "✓" : "🗓"}
            </span>
            {deck.timeLabel}
          </span>

          <span className="text-primary">
            {deck.status === "Siap Cetak" ? "✓" : "✎"}
          </span>
        </div>
      </div>
    </article>
  );
}
