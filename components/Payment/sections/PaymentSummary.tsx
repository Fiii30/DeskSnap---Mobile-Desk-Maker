// Tipe produk.
import type { PaymentProduct } from "../data/payment-types";

// Props rincian pembayaran.
type PaymentSummaryProps = {
  product: PaymentProduct;
};

// Rincian pesanan dan total pembayaran.
export default function PaymentSummary({ product }: PaymentSummaryProps) {
  return (
    <section className="mb-5">
      <div className="relative rounded-xl bg-surface-card p-4 shadow-card">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <span className="text-ink-muted">🧾</span>

            <h3 className="text-base font-bold text-ink">Rincian Pembayaran</h3>
          </div>

          <span className="rounded bg-surface-muted px-2 py-0.5 text-xs font-bold text-ink-soft">
            Digital Order
          </span>
        </div>

        <div className="space-y-2 py-2">
          <div className="flex items-center justify-between text-sm leading-6 text-ink">
            <span>{product.receiptTitle}</span>
            <span className="text-sm font-semibold">{product.price}</span>
          </div>

          <div className="flex items-center justify-between text-xs leading-5 text-ink-soft">
            <span>Pajak & Biaya Layanan</span>
            <span className="font-semibold text-primary">Rp0 (Gratis)</span>
          </div>
        </div>

        <div className="my-3 flex items-center gap-2 rounded-lg bg-surface-soft p-2.5">
          <span className="text-ink-muted">📦</span>

          <span className="text-xs font-bold text-ink-soft">
            Produk Digital • Tanpa Pengiriman Fisik
          </span>
        </div>

        <div className="flex items-baseline justify-between border-t border-surface-soft pt-2">
          <div>
            <span className="text-sm font-semibold text-ink">
              Total Pembayaran
            </span>
            <p className="text-xs font-bold text-ink-muted">
              Harga contoh prototype
            </p>
          </div>

          <span className="text-2xl font-extrabold leading-8 text-primary">
            {product.price}
          </span>
        </div>
      </div>
    </section>
  );
}
