"use client";

// Hook navigasi Next.js App Router.
import { useRouter } from "next/navigation";

// Helper draft.
import { deleteDraft, getDrafts, type DeckDraft } from "@/lib/draftStorage";

// State untuk deck, menu, dan toast.
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Komponen Dashboard.
import DashboardHeader from "./sections/DashboardHeader";
import CreateDeckButton from "./sections/CreateDeckButton";
import DeckCard from "./sections/DeckCard";
import DeckEmptyState from "./sections/DeckEmptyState";

// Tipe data deck.
import type { Deck } from "./data/dashboard-types";
import { INITIAL_DECKS } from "./data/dashboard-types";

// Mendengarkan perubahan localStorage.
const subscribeDecksUsed = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

// Membaca jumlah deck yang sudah selesai diunduh.
const getDecksUsedSnapshot = () => {
  const saved = localStorage.getItem("decksnap-decks-used");
  return saved ? Number(saved) : 0;
};

// Nilai yang dipakai server saat hydration; harus selalu sama.
const EMPTY_NUMBER = 0;

const getDecksUsedServerSnapshot = () => EMPTY_NUMBER;

// Halaman Dashboard.
export default function DashboardPage() {
  // Router untuk navigasi antarhalaman.
  const router = useRouter();

  // Daftar deck.
  const [decks, setDecks] = useState<Deck[]>(INITIAL_DECKS);

  // Deck yang dipilih dari menu titik tiga.
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  // Pesan toast.
  const [toast, setToast] = useState<string | null>(null);

  // Timer toast.
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Jumlah deck gratis yang sudah selesai diunduh.
  const decksUsed = useSyncExternalStore(
    subscribeDecksUsed,
    getDecksUsedSnapshot,
    getDecksUsedServerSnapshot,
  );

  // Menandai bahwa halaman sudah dibuka di browser.
  const [isMounted, setIsMounted] = useState(false);

  // Daftar draft yang tersimpan.
  const [drafts, setDrafts] = useState<DeckDraft[]>([]);

  useEffect(() => {
    // Menandai bahwa komponen sudah terpasang di browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    // Membaca draft dari localStorage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrafts(getDrafts());
  }, []);

  // Membuka halaman Profil.
  function handleOpenProfile() {
    router.push("/profile");
  }

  // Memulai pembuatan deck baru.
  function handleStartCreate() {
    // Paket gratis hanya untuk 2 deck yang sudah selesai diunduh.
    if (decksUsed >= 2) {
      // Kuota habis, arahkan ke Pembayaran.
      router.push("/payment");
      return;
    }

    // Kuota masih tersedia, menuju Pilih Template.
    router.push("/template");
  }

  // Menampilkan toast prototype.
  function showToast(message: string) {
    setToast(message);

    if (toastTimer.current) clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2800);
  }

  // Membuka draft di Editor.
  function handleOpenDraft(draft: DeckDraft) {
    router.push(`/editor?deckId=${draft.id}&template=${draft.templateKey}`);
  }

  // Menghapus draft berdasarkan ID.
  function handleDeleteDraft(draftId: string) {
    // Menghapus draft dari localStorage.
    deleteDraft(draftId);

    // Membaca ulang daftar draft agar Dashboard diperbarui.
    setDrafts(getDrafts());

    // Menampilkan pesan berhasil.
    showToast("Draft deck berhasil dihapus");
  }

  // Menghapus deck dari state.
  function handleDeleteDeck() {
    if (!selectedDeck) return;

    setDecks((currentDecks) =>
      currentDecks.filter((deck) => deck.id !== selectedDeck.id),
    );

    showToast(`Deck "${selectedDeck.title}" berhasil dihapus`);
    setSelectedDeck(null);
  }

  return (
    <main className="relative min-h-dvh bg-surface pb-10 pt-24 text-ink">
      {/* Header Dashboard */}
      <DashboardHeader
        deckCount={decks.length}
        onOpenProfile={handleOpenProfile}
      />

      <div className="mx-auto w-full max-w-md px-4">
        {/* Subheader */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight">Studio Kartu</h1>

            <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">
              Koleksi Pribadi
            </span>
          </div>

          {/* Informasi kuota deck gratis */}
          <p className="text-card-title font-semibold text-ink-soft">
            {decksUsed >= 2
              ? "Kuota Gratis Habis"
              : `Buat ${2 - decksUsed} deck gratis`}
          </p>
        </div>

        {/* Tombol buat deck */}
        <div className="mb-4">
          <CreateDeckButton onClick={handleStartCreate} />
        </div>

        {/* Judul daftar deck */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">Deck Kamu</h2>

            <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-bold text-ink-soft">
              {decks.length} deck
            </span>
          </div>
        </div>

        {/* Draft tersimpan */}
        {isMounted && drafts.length > 0 && (
          <section className="mb-4">
            <h2 className="mb-2 text-sm font-bold text-ink">Draft Tersimpan</h2>

            <div className="grid grid-cols-2 gap-3.5">
              {drafts.map((draft) => {
                // Ambil kartu pertama sebagai gambar sampul.
                const firstCard = draft.cards[0];

                return (
                  <DeckCard
                    key={draft.id}
                    deck={{
                      id: draft.id,
                      title: draft.title,
                      image: firstCard?.image ?? "",
                      cardCount: draft.cards.length,
                      status: "Draft",
                      timeLabel: new Date(draft.updatedAt).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "short",
                        },
                      ),
                    }}
                    onOpenDeck={() => handleOpenDraft(draft)}
                    onOpenMenu={() => handleDeleteDraft(draft.id)}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Daftar deck atau empty state */}
        {decks.length > 0 || drafts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5">
            {decks.map((deck) => (
              <DeckCard
                key={deck.id}
                deck={deck}
                onOpenDeck={() => router.push("/editor")}
                onOpenMenu={setSelectedDeck}
              />
            ))}
          </div>
        ) : (
          <DeckEmptyState onCreateDeck={handleStartCreate} />
        )}
      </div>

      {/* Menu deck */}
      {selectedDeck && (
        <>
          <button
            type="button"
            aria-label="Tutup menu deck"
            onClick={() => setSelectedDeck(null)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="fixed inset-x-4 bottom-6 z-50 mx-auto w-full max-w-44 rounded-xl bg-surface-card py-1.5 text-left shadow-card-strong">
            <button
              type="button"
              onClick={() => {
                setSelectedDeck(null);
                showToast("Prototype: Ubah Nama Deck belum tersedia.");
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:bg-surface-muted"
            >
              ✎ Ubah Nama
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedDeck(null);
                showToast("Prototype: Duplikasi Deck belum tersedia.");
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:bg-surface-muted"
            >
              ⧉ Duplikasi
            </button>

            <div className="my-1 h-px bg-surface-muted" />

            <button
              type="button"
              onClick={handleDeleteDeck}
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-danger transition-colors hover:bg-danger/10"
            >
              🗑 Hapus Deck
            </button>
          </div>
        </>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2.5 rounded-full bg-dark px-4 py-2.5 text-xs font-semibold text-dark-text shadow-card-strong"
        >
          <span className="text-primary-soft">✓</span>
          {toast}
        </div>
      )}
    </main>
  );
}
