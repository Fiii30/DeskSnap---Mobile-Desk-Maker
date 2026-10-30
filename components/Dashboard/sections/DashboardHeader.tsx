// Props header Dashboard.
type DashboardHeaderProps = {
  deckCount: number;
  onOpenProfile: () => void;
};

export default function DashboardHeader({
  deckCount,
  onOpenProfile,
}: DashboardHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/90 pt-[env(safe-area-inset-top)] shadow-button backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-7 -rotate-3 items-center justify-center rounded-lg bg-primary-soft">
            <svg
              width="20"
              height="20"
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

          <span className="text-lg font-bold tracking-tight text-ink">
            Deck<span className="text-primary">Snap</span>
          </span>
        </div>
        {/* Avatar menuju Profil */}
        <button
          type="button"
          aria-label="Buka profil pengguna"
          onClick={onOpenProfile}
          className="flex items-center gap-2 rounded-full bg-surface-muted p-1 pl-2.5 transition-transform active:scale-95"
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            ◎ 12
          </span>

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            RP
          </span>
        </button>

      </div>

      {/* Jumlah deck ditampilkan sebagai teks kecil agar berguna, bukan hanya dekorasi. */}
      <p className="px-4 pb-2 text-xs font-semibold text-ink-muted">
        {deckCount} deck tersimpan
      </p>
    </header>
  );
}
