"use client";

// State untuk produk aktif, modal, dan status pembayaran.
import { useEffect, useState } from "react";

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

  // Load snap.js Midtrans.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    );
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fungsi bayar.
  async function handlePay() {
    const res = await fetch("/api/midtrans/create-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: `DECKSNAP-${Date.now()}`,
        grossAmount: 25000,
        customerName: "Nama User",
        customerEmail: "user@email.com",
      }),
    });

    const { token, error } = await res.json();

    if (error) {
      alert(error);
      return;
    }

    (
      window as unknown as { snap?: { pay: (token: string) => void } }
    ).snap?.pay(token);
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

        <PaymentAction product={product} onContinue={handlePay} />

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
    </main>
  );
}
