"use client";

// State untuk template terpilih dan sheet premium.
import { useState } from "react";

// Router App Router untuk navigasi.
import { useRouter } from "next/navigation";

// Komponen Pilih Template.
import TemplateHeader from "./sections/TemplateHeader";
import TemplateGrid from "./sections/TemplateGrid";
import QualityBanner from "./sections/QualityBanner";
import PremiumSheet from "./modals/PremiumSheet";

// Tipe dan data template.
import type { Template } from "./data/template-types";
import { TEMPLATES } from "./data/template-types";

// Halaman Pilih Template.
export default function TemplatePage() {
  // Router untuk navigasi antarhalaman.
  const router = useRouter();

  // Template yang sedang dipilih.
  const [selectedTemplate, setSelectedTemplate] =
    useState<Template["key"]>("tcg");

  // Bottom sheet premium.
  const [isPremiumSheetOpen, setIsPremiumSheetOpen] = useState(false);

  // Memilih template tanpa langsung pindah halaman.
  function handleSelectTemplate(template: Template) {
    // Menandai template sebagai aktif.
    setSelectedTemplate(template.key);

    // Template premium langsung membuka sheet pembelian.
    if (template.isPremium) {
      setIsPremiumSheetOpen(true);
    }
  }

  // Menggunakan template yang sedang dipilih.
  function handleUseTemplate() {
    // Mencari template aktif.
    const template = TEMPLATES.find((item) => item.key === selectedTemplate);

    // Berhenti bila template tidak ditemukan.
    if (!template) return;

    // Template premium membuka sheet.
    if (template.isPremium) {
      setIsPremiumSheetOpen(true);
      return;
    }

    // Template gratis masuk Editor dengan jenis template.
    router.push(`/editor?template=${template.key}`);
  }

  return (
    // Wrapper halaman Pilih Template.
    <main className="relative min-h-dvh bg-surface pb-36 pt-20 text-ink">
      {/* Header */}
      <TemplateHeader onBack={() => router.push("/")} />

      <div className="mx-auto w-full max-w-md px-4 pb-4 pt-4">
        {/* Grid template */}
        <TemplateGrid
          templates={TEMPLATES}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
        />

        {/* Banner kualitas */}
        <QualityBanner />
      </div>

      {/* Sheet premium */}
      {isPremiumSheetOpen && (
        <PremiumSheet
          onClose={() => setIsPremiumSheetOpen(false)}
          onContinuePayment={() => {
            // Menutup sheet.
            setIsPremiumSheetOpen(false);

            // Menuju Pembayaran.
            router.push("/payment");
          }}
        />
      )}

      {/* Tombol bawah */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-surface/90 px-4 pb-[env(safe-area-inset-bottom)] pt-3 shadow-card-strong backdrop-blur-xl">
        <div className="mx-auto max-w-md pb-3">
          {/* Tombol gunakan template */}
          <button
            type="button"
            onClick={handleUseTemplate}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-white shadow-button transition-transform active:scale-[0.98]"
          >
            Gunakan Template
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </main>
  );
}
