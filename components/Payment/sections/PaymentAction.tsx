// Tipe produk.
import type { PaymentProduct } from "../data/payment-types";

// Props tombol pembayaran.
type PaymentActionProps = {
  product: PaymentProduct;
  onContinue: () => void;
};

// Tombol lanjut bayar dan badge metode pembayaran.
export default function PaymentAction({
  product,
  onContinue,
}: PaymentActionProps) {
  const methods = [
    "QRIS",
    "GoPay",
    "ShopeePay",
    "BCA VA",
    "Mandiri",
    "BRI / BNI",
  ];

  return (
    <section className="mb-6 space-y-4">
      <button
        type="button"
        onClick={onContinue}
        className="flex w-full items-center justify-between rounded-xl bg-primary px-4 py-3.5 text-white shadow-button transition-all hover:bg-primary-deep active:scale-[0.99]"
      >
        <span className="flex items-center gap-2">
          <span>🔒</span>
          <span className="text-base font-bold">Lanjut Bayar</span>
        </span>

        <span className="flex items-center gap-1.5">
          <span className="text-sm font-semibold opacity-90">
            {product.price}
          </span>
          <span>→</span>
        </span>
      </button>

      <div className="rounded-xl bg-surface-soft p-3.5 text-center shadow-button">
        <div className="mb-2 flex items-center justify-center gap-1.5">
          <span className="text-primary">🛡</span>
          <span className="text-xs font-semibold text-ink">
            Pembayaran Aman via Midtrans
          </span>
        </div>

        <div className="mb-2 flex flex-wrap items-center justify-center gap-1.5 py-1">
          {methods.map((method) => (
            <span
              key={method}
              className="rounded bg-surface-card px-2 py-1 text-xs font-bold text-ink shadow-button"
            >
              {method}
            </span>
          ))}
        </div>

        <p className="mx-auto max-w-xs text-xs leading-5 text-ink-soft">
          Metode pembayaran dipilih langsung di halaman Midtrans yang
          terenkripsi. Tidak perlu memasukkan nomor rekening atau data sensitif
          di sini.
        </p>
      </div>
    </section>
  );
}
