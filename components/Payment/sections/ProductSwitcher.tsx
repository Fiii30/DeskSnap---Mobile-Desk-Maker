// Tipe produk.
import type { PaymentProduct, ProductKey } from "../data/payment-types";

// Props pemilih produk.
type ProductSwitcherProps = {
  products: PaymentProduct[];
  activeProduct: ProductKey;
  onSelectProduct: (key: ProductKey) => void;
};

// Tab untuk memilih Template Premium atau AI Style.
export default function ProductSwitcher({
  products,
  activeProduct,
  onSelectProduct,
}: ProductSwitcherProps) {
  return (
    <section className="mb-3 mt-4">
      <div className="flex items-center justify-between rounded-xl bg-surface-soft p-1.5 shadow-button">
        {products.map((product) => (
          <button
            key={product.key}
            type="button"
            onClick={() => onSelectProduct(product.key)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
              activeProduct === product.key
                ? "bg-surface-card text-ink shadow-button"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            <span className="text-base text-primary">{product.icon}</span>
            {product.title}
          </button>
        ))}
      </div>
    </section>
  );
}
