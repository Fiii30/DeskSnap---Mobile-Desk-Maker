// Props ringkasan akses.
type AccessSummaryProps = {
  onTopUp: () => void;
};

// Ringkasan token dan hak akses.
export default function AccessSummary({ onTopUp }: AccessSummaryProps) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Saldo & Hak Akses
        </h3>

        <span className="text-xs font-bold text-ink-muted">Terpisah & Mandiri</span>
      </div>

      {/* Token */}
      <div className="flex items-center justify-between rounded-xl bg-surface-card p-4 shadow-card">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-lg text-primary">
            ◎
          </div>

          <div>
            <div className="text-base font-bold text-ink">12 Token Gratis</div>
            <div className="text-xs leading-5 text-ink-soft">
              Cukup untuk 2 cetakan kartu fisik
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onTopUp}
          className="rounded-lg bg-surface-muted px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-hover"
        >
          Isi Ulang
        </button>
      </div>

      {/* Status akses */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col justify-between rounded-xl bg-surface-card p-2 shadow-card">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-lg text-primary">▦</span>

              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-bold text-primary">
                Aktif
              </span>
            </div>

            <div className="text-sm font-semibold text-ink">Template Premium</div>
            <p className="mt-1 text-xs leading-5 text-ink-soft">Preset studio vintage</p>
          </div>

          <div className="mt-2 border-t border-surface-muted pt-1">
            <span className="text-xs font-bold text-ink-muted">Permanen</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl bg-surface-card p-2 shadow-card">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-lg text-secondary">✦</span>

              <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs font-bold text-ink-soft">
                Tidak Aktif
              </span>
            </div>

            <div className="text-sm font-semibold text-ink">AI Style</div>
            <p className="mt-1 text-xs leading-5 text-ink-soft">Render artistik foto</p>
          </div>

          <div className="mt-2 border-t border-surface-muted pt-1">
            <span className="text-xs font-semibold text-secondary">Buka Terpisah</span>
          </div>
        </div>
      </div>

      {/* Catatan */}
      <div className="flex items-start gap-1.5 px-1">
        <span className="mt-0.5 text-sm text-ink-muted">ⓘ</span>

        <p className="text-xs leading-5 text-ink-soft">
          Akses Template Premium & AI Style dibeli terpisah. Membuka salah satu fitur tidak
          otomatis mencakup yang lain.
        </p>
      </div>
    </section>
  );
}