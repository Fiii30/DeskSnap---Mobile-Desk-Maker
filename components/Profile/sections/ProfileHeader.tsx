// Props header Profil.
type ProfileHeaderProps = {
  onBack: () => void;
};

// Header tetap halaman Profil.
export default function ProfileHeader({ onBack }: ProfileHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/90 pt-[env(safe-area-inset-top)] shadow-button backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Kembali ke Dashboard"
            onClick={onBack}
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-card text-ink shadow-button transition-colors hover:text-primary"
          >
            <svg
              width="20"
              height="20"
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

          <h1 className="text-lg font-bold tracking-tight text-ink">Profil</h1>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          RP
        </div>
      </div>
    </header>
  );
}
