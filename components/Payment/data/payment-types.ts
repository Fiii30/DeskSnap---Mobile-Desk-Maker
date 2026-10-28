// Kunci produk pembayaran.
export type ProductKey = "template" | "ai";

// Status modal pembayaran.
export type PaymentStatus = "pending" | "success" | "failed";

// Tipe data produk.
export type PaymentProduct = {
  key: ProductKey;
  title: string;
  description: string;
  price: string;
  receiptTitle: string;
  clarification: string;
  successMessage: string;
  icon: string;
};

// Data produk.
export const PAYMENT_PRODUCTS: Record<ProductKey, PaymentProduct> = {
  template: {
    key: "template",
    title: "Template Premium",
    description: "Buat lebih banyak deck dan buka varian kartu eksklusif.",
    price: "Rp49.000",
    receiptTitle: "Template Premium (Lisensi Akun)",
    clarification:
      "Fitur AI Style dijual terpisah, tidak termasuk dalam paket ini.",
    successMessage:
      "Kuota deck tanpa batas dan akses Template Premium kini aktif.",
    icon: "▦",
  },
  ai: {
    key: "ai",
    title: "AI Style",
    description: "Ubah gaya foto untuk seluruh kartu-kartumu secara otomatis.",
    price: "Rp29.000",
    receiptTitle: "AI Style (Lisensi Akun)",
    clarification: "Tidak termasuk paket Template Premium JQKA/Trivia.",
    successMessage: "Akses AI Style kini aktif permanen di akunmu.",
    icon: "✦",
  },
};
