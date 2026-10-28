// Footer halaman Login.
export default function LoginFooter() {
  return (
    <footer className="flex w-full flex-col items-center gap-2 pt-6 pb-2">
      <div className="flex items-center gap-4">
        <a
          href="#terms"
          className="py-1 text-[10px] font-bold text-on-surface-soft transition-colors hover:text-primary"
        >
          Syarat Penggunaan
        </a>

        <span className="h-1 w-1 rounded-full bg-surface-dim" />

        <a
          href="#privacy"
          className="py-1 text-[10px] font-bold text-on-surface-soft transition-colors hover:text-primary"
        >
          Kebijakan Privasi
        </a>
      </div>

      <p className="text-[9px] leading-4 text-on-surface-soft">
        © 2026 DeckSnap Studio. Hak Cipta Dilindungi.
      </p>
    </footer>
  );
}