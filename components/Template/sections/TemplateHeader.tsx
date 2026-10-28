// Props header Pilih Template.
type TemplateHeaderProps = {
  onBack: () => void;
};

// Header tetap halaman Pilih Template.
export default function TemplateHeader({ onBack }: TemplateHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/90 pt-[env(safe-area-inset-top)] shadow-button backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Kembali ke Dashboard"
            onClick={onBack}
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-card text-ink shadow-button transition-colors hover:text-primary"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M19 12H5m6-6-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-ink">
              Pilih Template
            </h1>

            <p className="mt-0.5 text-xs font-bold leading-none text-ink-soft">
              Mau bikin kartu apa?
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}