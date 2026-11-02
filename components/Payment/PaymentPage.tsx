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

import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// Halaman Pembayaran.
export default function PaymentPage() {
  const router = useRouter();

  // Produk aktif; default AI Style sesuai Stitch.
  const [activeProduct, setActiveProduct] = useState<ProductKey>("ai");

  // Modal dan status pembayaran.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("pending");

  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    getUser();
  }, []);

  // Fungsi bayar.
  async function handlePay() {
    const snap = (
      window as unknown as {
        snap?: {
          pay: (
            token: string,
            options?: {
              onSuccess?: () => void;
              onPending?: () => void;
              onError?: () => void;
              onClose?: () => void;
            },
          ) => void;
        };
      }
    ).snap;

    if (!snap) {
      alert("Pembayaran belum siap. Coba lagi sebentar.");
      return;
    }

    try {
      const supabase = createClient();

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        router.replace("/login");
        return;
      }

      const res = await fetch("/api/midtrans/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          productKey: "templates",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Gagal membuat transaksi.");
      }

      if (typeof data.token !== "string") {
        throw new Error("Token pembayaran tidak tersedia.");
      }

      snap.pay(data.token, {
        onSuccess: () => {
          // Bukan mengaktifkan Premium dari browser.
          // Profile akan membaca hasil aktivasi dari database.
          router.push("/profile");
        },
        onPending: () => {
          alert("Pembayaran masih menunggu penyelesaian.");
        },
        onError: () => {
          alert("Pembayaran gagal. Silakan coba kembali.");
        },
        onClose: () => {
          // Menutup popup tidak selalu berarti transaksi gagal.
        },
      });
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Gagal membuka pembayaran.",
      );
    }
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
      <PaymentHeader onBack={() => router.push("/")} />

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
