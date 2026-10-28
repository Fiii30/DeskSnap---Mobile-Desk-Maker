// Tipe produk.
import type { PaymentProduct } from "../data/payment-types";

// Props kartu produk.
type ProductCardProps = {
  product: PaymentProduct;
};

// Kartu detail produk yang dipilih.
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <section className="mb-5">
      <div className="relative overflow-hidden rounded-xl bg-surface-card p-4 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-muted text-2xl text-primary shadow-inner">
              {product.icon}
            </div>

            <div>
              <div className="mb-0.5 flex items-center gap-2">
                <h2 className="text-base font-bold leading-6 text-ink">
                  {product.title}
                </h2>

                <span className="shrink-0 rounded-full bg-surface-hover px-1.5 py-0.5 text-xs font-bold uppercase tracking-wider text-ink">
                  Berlangganan
                </span>
              </div>

              <p className="text-xs leading-5 text-ink-soft">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Penjelasan akses terpisah */}
        <div className="mt-3.5 flex items-center gap-2 rounded-lg bg-surface-soft p-2.5 pt-3 text-ink-soft">
          <span className="text-base">ⓘ</span>

          <span className="text-xs font-semibold">{product.clarification}</span>
        </div>

        <div className="mt-4 flex items-baseline justify-between border-t border-surface-soft pt-3">
          <div className="flex items-center gap-1 text-ink-soft">
            <span className="text-primary">✓</span>
            <span className="text-xs font-bold">Per Bulan</span>
          </div>

          <span className="text-xl font-extrabold leading-7 text-ink">
            {product.price}
          </span>
        </div>
      </div>
    </section>
  );
}
