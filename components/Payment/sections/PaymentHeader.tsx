// Props header Pembayaran.
type PaymentHeaderProps = {
  onBack: () => void;
};

// Header tetap halaman Pembayaran.
export default function PaymentHeader({ onBack }: PaymentHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/90 pt-4 shadow-button backdrop-blur-xl">
      <div className="relative flex h-16 items-center justify-between px-4">
        <button
          type="button"
          aria-label="Kembali"
          onClick={onBack}
          className="z-10 flex h-11 w-11 items-center justify-center rounded-lg transition-transform hover:bg-surface-muted active:scale-95"
        >
          <svg
            width="24"
            height="24"
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

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-14">
          <h1 className="truncate text-center text-lg font-bold tracking-tight text-ink">
            Pembayaran
          </h1>
        </div>

        <div className="z-10 flex h-11 w-11 items-center justify-end">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            RP
          </div>
        </div>
      </div>
    </header>
  );
}
