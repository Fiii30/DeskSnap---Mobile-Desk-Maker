// Komponen header Login.
export default function LoginHeader() {
  return (
    <header className="flex flex-col items-center pt-2 pb-5">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect
              x="8"
              y="4"
              width="12"
              height="16"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M5 6 3 17a2 2 0 0 0 1.6 2.3l2.4.4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="m11 12 2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="flex items-center text-2xl font-extrabold tracking-tight text-on-surface">
          DeckSnap
          <span className="ml-1 h-2 w-2 self-center rounded-full bg-primary" />
        </span>
      </div>

      <p className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-on-surface-muted">
        <span className="text-[10px] text-primary">✦</span>
        Ubah Momen Jadi Kartu Koleksi
        <span className="text-[10px] text-primary">✦</span>
      </p>
    </header>
  );
}