// Banner informasi kualitas cetak.
export default function QualityBanner() {
  return (
    <div className="mt-5 flex items-start gap-3 rounded-xl bg-surface-soft p-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-card text-lg text-primary shadow-button">
        🖨
      </div>

      <div className="flex min-w-0 flex-col">
        <span className="text-xs font-bold text-ink">Kualitas Cetak Premium</span>

        <p className="text-xs leading-relaxed text-ink-soft">
          Art Carton 310gsm dengan laminasi doff halus, tahan cipratan air dan rounded edge
          ramah genggaman tangan.
        </p>
      </div>
    </div>
  );
}