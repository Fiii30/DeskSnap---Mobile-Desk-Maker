"use client";

// State untuk produk aktif, modal, dan status pembayaran.
import { useEffect, useRef, useState } from "react";

// Router App Router.
import { useRouter } from "next/navigation";

// Komponen Pembayaran.
import PaymentHeader from "./sections/PaymentHeader";
import ProductSwitcher from "./sections/ProductSwitcher";
import ProductCard from "./sections/ProductCard";
import PaymentSummary from "./sections/PaymentSummary";
import PaymentAction from "./sections/PaymentAction";
import SimulationPanel from "./sections/SimulationPanel";
import PaymentStatusModal from "./modals/PaymentStatusModal";

// Tipe dan data produk.
import type { PaymentStatus, ProductKey } from "./data/payment-types";
import { PAYMENT_PRODUCTS } from "./data/payment-types";

// Halaman Pembayaran.
export default function PaymentPage() {
  const router = useRouter();

  // Produk aktif; default AI Style sesuai Stitch.
  const [activeProduct, setActiveProduct] = useState<ProductKey>("ai");

  // Modal dan status pembayaran.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("pending");

  // Toast prototype.
  const [toast, setToast] = useState<string | null>(null);

  // Timer toast.
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Bersihkan timer.
  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // Menampilkan toast.
  function showToast(message: string) {
    setToast(message);

    if (toastTimer.current) clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2400);
  }

  // Membuka modal pada status tertentu.
  function openPaymentStatus(status: PaymentStatus) {
    setPaymentStatus(status);
    setIsModalOpen(true);
  }

  // Produk aktif.
  const product = PAYMENT_PRODUCTS[activeProduct];

  return (
    <main className="relative min-h-dvh bg-surface pb-12 pt-20 text-ink">
      <PaymentHeader onBack={() => router.back()} />

      <div className="mx-auto w-full max-w-md px-4">
        <ProductSwitcher
          products={Object.values(PAYMENT_PRODUCTS)}
          activeProduct={activeProduct}
          onSelectProduct={setActiveProduct}
        />

        <ProductCard product={product} />

        <PaymentSummary product={product} />

        <PaymentAction
          product={product}
          onContinue={() => openPaymentStatus("pending")}
        />

        <SimulationPanel
          activeProduct={activeProduct}
          onOpenStatus={openPaymentStatus}
          onChangeProduct={setActiveProduct}
        />
      </div>

      {/* Modal status */}
      {isModalOpen && (
        <PaymentStatusModal
          status={paymentStatus}
          product={product}
          onClose={() => setIsModalOpen(false)}
          onChangeStatus={setPaymentStatus}
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 top-24 z-50 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2 rounded-full bg-dark px-4 py-2.5 text-xs font-semibold text-dark-text shadow-card-strong"
        >
          <span className="text-primary-soft">✦</span>
          <span className="truncate">{toast}</span>
        </div>
      )}
    </main>
  );
}
