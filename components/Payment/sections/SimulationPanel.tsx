// Tipe status pembayaran.
import type { PaymentStatus, ProductKey } from "../data/payment-types";

// Props panel simulasi.
type SimulationPanelProps = {
  activeProduct: ProductKey;
  onOpenStatus: (status: PaymentStatus) => void;
  onChangeProduct: (key: ProductKey) => void;
};

// Panel demo untuk membuka status pembayaran.
export default function SimulationPanel({
  activeProduct,
  onOpenStatus,
  onChangeProduct,
}: SimulationPanelProps) {
  return (
    <section className="mt-6 rounded-xl bg-surface-soft p-3 shadow-inner">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-ink-soft">
          ⚙ Panel Simulasi Prototype
        </span>

        <span className="rounded bg-surface-muted px-1.5 py-0.5 text-xs font-bold text-ink-muted">
          Hanya Demo
        </span>
      </div>

      <div className="mb-2 grid grid-cols-3 gap-1.5">
        <button
          type="button"
          onClick={() => onOpenStatus("pending")}
          className="rounded bg-surface-card px-2 py-1.5 text-xs font-bold shadow-button transition-colors hover:bg-surface-muted"
        >
          Pending
        </button>

        <button
          type="button"
          onClick={() => onOpenStatus("success")}
          className="rounded bg-surface-card px-2 py-1.5 text-xs font-bold shadow-button transition-colors hover:bg-surface-muted"
        >
          Berhasil
        </button>

        <button
          type="button"
          onClick={() => onOpenStatus("failed")}
          className="rounded bg-surface-card px-2 py-1.5 text-xs font-bold shadow-button transition-colors hover:bg-surface-muted"
        >
          Gagal
        </button>
      </div>

      <div className="flex items-center justify-between pt-1 text-xs font-bold text-ink-soft">
        <span>Ganti Produk:</span>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChangeProduct("template")}
            className="underline hover:text-ink"
          >
            Template (Rp49rb)
          </button>

          <span>•</span>

          <button
            type="button"
            onClick={() => onChangeProduct("ai")}
            className="underline hover:text-ink"
          >
            AI Style (Rp29rb)
          </button>
        </div>
      </div>

      {/* Info produk aktif */}
      <p className="mt-2 text-center text-xs text-ink-muted">
        Produk aktif:{" "}
        {activeProduct === "template" ? "Template Premium" : "AI Style"}
      </p>
    </section>
  );
}
