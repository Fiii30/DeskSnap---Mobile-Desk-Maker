// Props tombol buat deck.
type CreateDeckButtonProps = {
  onClick: () => void;
};

// Tombol utama untuk membuat deck baru.
export default function CreateDeckButton({ onClick }: CreateDeckButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-xl bg-primary px-4 py-3.5 text-white shadow-button transition-all hover:bg-primary-deep active:scale-[0.99]"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <span className="text-left">
          <span className="block text-sm font-bold">Buat Deck Baru</span>
          <span className="block text-xs leading-5 text-white/80">
            Ubah memori & kreasi jadi kartu fisik
          </span>
        </span>
      </span>

      <span className="text-lg transition-transform group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}
