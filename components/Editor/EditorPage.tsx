"use client";

// State untuk deck, kartu aktif, sheet, modal, dan AI.
import { useRef, useState } from "react";

// Router dan hook query URL dari App Router.
import { useRouter, useSearchParams } from "next/navigation";

// Helper export PDF & ZIP.
import { exportDeckToPdf, exportDeckToZip } from "@/lib/exportDeck";

// Helper draft.
import {
  getDraftById,
  saveDraft,
  type DeckDraft,
  type DraftEditState,
} from "@/lib/draftStorage";

// Komponen Editor.
import EditorHeader from "./sections/EditorHeader";
import CardPreview from "./sections/CardPreview";
import CardThumbnails from "./sections/CardThumbnails";
import PhotoStyleSheet from "./sections/PhotoStyleSheet";
import CardEditSheet from "./sections/CardEditSheet";
import DeckMenu from "./modals/DeckMenu";
import RenameDeckModal from "./modals/RenameDeckModal";
import DownloadModal from "./modals/DownloadModal";

// Tipe dan data awal.
import type { Card } from "./data/editor-types";
import { INITIAL_DECK, MAX_CARDS } from "./data/editor-types";
import type { Template } from "../Template/data/template-types";

// Tipe pengaturan visual kartu.
type EditState = {
  filter: string;
  brightness: number;
  contrast: number;
  saturation: number;
};

// State edit awal.
const initialEditState: EditState = {
  filter: "none",
  brightness: 100,
  contrast: 100,
  saturation: 100,
};

// Membaca hasil edit kartu dari localStorage.
function loadEditState(cardId: string): EditState {
  // localStorage hanya tersedia di browser.
  if (typeof window === "undefined") {
    return initialEditState;
  }

  // Mengambil data draft berdasarkan ID kartu.
  const saved = localStorage.getItem(`decksnap-edit-${cardId}`);

  // Mengembalikan state awal bila belum pernah disimpan.
  if (!saved) {
    return initialEditState;
  }

  // Mengubah JSON menjadi objek EditState.
  return JSON.parse(saved) as EditState;
}

// Halaman Editor & Preview.
export default function EditorPage() {
  // Router untuk navigasi antarhalaman.
  const router = useRouter();

  // Deck dan kartu aktif.
  const [deck, setDeck] = useState<Card[]>(INITIAL_DECK);
  const [activeIndex, setActiveIndex] = useState(0);

  // Judul deck.
  const [deckTitle, setDeckTitle] = useState("Beginner Deck");
  const [deckTitleInput, setDeckTitleInput] = useState(deckTitle);

  // Sheet dan modal.
  const [openSheet, setOpenSheet] = useState<"photo" | "details" | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadPhase, setDownloadPhase] = useState<"confirm" | "ready">(
    "confirm",
  );

  // Foto & Gaya.
  const [photoTab, setPhotoTab] = useState<"foto" | "gaya">("foto");
  const [selectedStyle, setSelectedStyle] = useState("Original");
  const [applyToAll, setApplyToAll] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isAiPreviewVisible, setIsAiPreviewVisible] = useState(false);

  // Membaca parameter template dari URL.
  const searchParams = useSearchParams();

  // Mengambil jenis template; default TCG bila tidak ada.
  const templateKey =
    (searchParams.get("template") as Template["key"]) ?? "tcg";

  // Menandai apakah editor dibuka dalam mode selesai (read-only).
  const isCompletedMode = searchParams.get("mode") === "selesai";

  // Input file dari kamera.
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Input file dari galeri atau file manager.
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  // Kartu aktif.
  const card = deck[activeIndex];

  // Pesan toast.
  const [toast, setToast] = useState<string | null>(null);

  // State edit kartu aktif; dibaca dari localStorage saat pertama render.
  const [editState, setEditState] = useState<EditState>(() =>
    loadEditState(card.id),
  );

  // Riwayat untuk undo.
  const [past, setPast] = useState<EditState[]>([]);

  // Riwayat untuk redo.
  const [future, setFuture] = useState<EditState[]>([]);

  // Timer toast.
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ID draft yang sedang diedit; kosong berarti deck baru.
  const draftId = searchParams.get("deckId") ?? "";

  // Menandai apakah ini draft lama atau deck baru.
  const [currentDraftId, setCurrentDraftId] = useState(draftId);

  // Ref untuk menampung elemen DOM tiap kartu (untuk export).
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Menampilkan toast prototype.
  function showToast(message: string) {
    setToast(message);

    if (toastTimer.current) clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2800);
  }

  // Memperbarui satu field kartu aktif secara immutable.
  function updateActiveCard<K extends keyof Card>(key: K, value: Card[K]) {
    setDeck((currentDeck) =>
      currentDeck.map((currentCard, index) =>
        index === activeIndex ? { ...currentCard, [key]: value } : currentCard,
      ),
    );
  }

  // Menyimpan draft deck dengan status tertentu.
  function handleSaveDraft(status: "draft" | "selesai" = "draft") {
    const id = currentDraftId || `deck-${crypto.randomUUID()}`;

    const draft: DeckDraft = {
      id,
      title: deckTitle,
      templateKey,
      status,
      cards: deck,
      editStates: {
        [card.id]: editState,
      },
      updatedAt: new Date().toISOString(),
    };

    saveDraft(draft);
    setCurrentDraftId(id);
    window.dispatchEvent(new Event("storage"));
    showToast(
      status === "selesai"
        ? "Deck selesai disimpan"
        : "Draft deck berhasil disimpan",
    );
  }

  // Memilih kartu dan memuat hasil editnya.
  function selectCard(index: number) {
    // Menentukan kartu aktif.
    setActiveIndex(index);

    // Memuat filter dan adjustment milik kartu tersebut.
    setEditState(loadEditState(deck[index].id));

    // Menghapus riwayat undo dan redo.
    setPast([]);
    setFuture([]);

    // Menyembunyikan pratinjau AI.
    setIsAiPreviewVisible(false);
  }

  // Menambah kartu dari file.
  function handleAddCard(event: React.ChangeEvent<HTMLInputElement>) {
    // Mengambil file yang dipilih.
    const file = event.target.files?.[0];

    // Berhenti bila tidak ada file.
    if (!file) return;

    // Membatasi jumlah kartu.
    if (deck.length >= MAX_CARDS) {
      alert(`Maksimal ${MAX_CARDS} kartu dalam satu deck.`);
      return;
    }

    // Membuat kartu baru dari file.
    const newCard: Card = {
      ...card,
      
      id: `card-${crypto.randomUUID()}`,
      image: URL.createObjectURL(file),
      index: `#${String(deck.length + 1).padStart(2, "0")}`,
    };

    // Menambah kartu ke deck.
    setDeck((currentDeck) => [...currentDeck, newCard]);
    // Jalankan AI otomatis untuk kartu baru.
    generateCardText(newCard);

    // Menjadikan kartu baru aktif.
    setActiveIndex(deck.length);

    // Mengosongkan input file.
    event.target.value = "";
  }

  // Simulasi AI.
  function startAi() {
    setIsAiProcessing(true);

    setTimeout(() => {
      setIsAiProcessing(false);
      setIsAiPreviewVisible(true);
    }, 900);
  }

  // Menerapkan hasil AI.
  function applyAi() {
    updateActiveCard("image", card.image);
    setIsAiPreviewVisible(false);
    setOpenSheet(null);
  }

  // Generate teks kartu dari foto menggunakan AI.
  async function generateCardText(targetCard: Card) {
    try {
      // Tandai sedang memproses.
      setIsAiProcessing(true);

      // Ambil gambar kartu.
      const imageResponse = await fetch(targetCard.image);
      const imageBlob = await imageResponse.blob();

      // Ubah blob menjadi base64.
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageBlob);
      });

      // Pisahkan prefix data URL.
      const [meta, base64Data] = base64.split(",");
      const mimeType = meta.replace("data:", "").replace(";base64", "");

      // Kirim ke API route.
      const response = await fetch("/api/generate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64Data, mimeType }),
      });

      // Ambil hasil JSON.
      const result = await response.json();

      // Bila gagal.
      if (!response.ok) {
        throw new Error(result.error || "Gagal generate");
      }

      // Perbarui kartu target dengan hasil AI.
      setDeck((currentDeck) =>
        currentDeck.map((currentCard) =>
          currentCard.id === targetCard.id
            ? {
                ...currentCard,
                name: result.name,
                skillTitle: result.skillTitle,
                skillDescription: result.skillDescription,
                tier: result.tier,
              }
            : currentCard,
        ),
      );
    } catch (error) {
      console.error("AI generate gagal:", error);
      showToast("Gagal generate teks kartu");
    } finally {
      setIsAiProcessing(false);
    }
  }

  // Menyimpan nama deck.
  function saveDeckTitle() {
    const newName = deckTitleInput.trim();

    if (newName) {
      setDeckTitle(newName);
    }

    setIsRenameOpen(false);
  }

  // Menambah jumlah deck gratis yang sudah selesai diunduh.
  function completeFreeDeckDownload() {
    // Mengambil jumlah deck yang sudah selesai.
    const saved = localStorage.getItem("decksnap-decks-used");

    // Menghitung jumlah baru.
    const nextCount = saved ? Number(saved) + 1 : 1;

    // Menyimpan jumlah baru.
    localStorage.setItem("decksnap-decks-used", String(nextCount));
  }

  // Menghapus kartu aktif dari deck.
  function handleDeleteCard() {
    // Cegah menghapus kartu terakhir.
    if (deck.length <= 1) {
      showToast("Minimal harus ada 1 kartu");
      return;
    }

    // Buat deck baru tanpa kartu aktif.
    const updatedDeck = deck.filter((_, index) => index !== activeIndex);

    // Tentukan index kartu aktif berikutnya.
    const nextActiveIndex = Math.max(0, activeIndex - 1);

    // Perbarui deck dan kartu aktif.
    setDeck(updatedDeck);
    setActiveIndex(nextActiveIndex);

    // Muat ulang hasil edit kartu yang sekarang aktif.
    setEditState(loadEditState(updatedDeck[nextActiveIndex].id));

    // Reset riwayat undo/redo.
    setPast([]);
    setFuture([]);

    showToast("Kartu berhasil dihapus");
  }

  // Membuka modal unduh dan menandai deck selesai.
  function handleFinishAndDownload() {
    // Simpan deck dengan status selesai.
    handleSaveDraft("selesai");

    setDownloadPhase("confirm");
    setIsDownloadOpen(true);
  }

  // Mengambil node kartu yang masih terpasang di DOM.
  function getMountedCardNodes(): HTMLElement[] {
    return cardRefs.current.filter(
      (node): node is HTMLDivElement => node !== null && node.isConnected,
    );
  }

  // Export deck menjadi PDF 9 kartu per halaman.
  async function handleExportPdf() {
    try {
      const nodes = getMountedCardNodes();

      await exportDeckToPdf(deckTitle, nodes);

      showToast("PDF berhasil diunduh");
    } catch (error) {
      console.error("Export PDF gagal:", error);
      showToast("Gagal membuat PDF");
    }
  }

  // Export deck menjadi ZIP gambar high-res.
  async function handleExportZip() {
    try {
      // Ambil elemen DOM kartu yang masih terpasang.
      const nodes = getMountedCardNodes();

      await exportDeckToZip(deckTitle, nodes);

      showToast("ZIP berhasil diunduh");
    } catch {
      showToast("Gagal membuat ZIP");
    }
  }

  // Memperbarui state edit dan menyimpan riwayat.
  function updateEditState(nextState: EditState) {
    // Menyimpan state sekarang ke riwayat undo.
    setPast((currentPast) => [...currentPast, editState]);

    // Menghapus riwayat redo.
    setFuture([]);

    // Mengatur state edit terbaru.
    setEditState(nextState);

    // Menyimpan hasil edit ke localStorage.
    localStorage.setItem(`decksnap-edit-${card.id}`, JSON.stringify(nextState));
  }

  // Membatalkan perubahan terakhir.
  function handleUndo() {
    if (past.length === 0) return;

    const previousState = past[past.length - 1];

    setFuture((currentFuture) => [editState, ...currentFuture]);
    setPast((currentPast) => currentPast.slice(0, -1));
    setEditState(previousState);
  }

  // Mengulang perubahan yang dibatalkan.
  function handleRedo() {
    if (future.length === 0) return;

    const nextState = future[0];

    setPast((currentPast) => [...currentPast, editState]);
    setFuture((currentFuture) => currentFuture.slice(1));
    setEditState(nextState);
  }

  // Memperbarui teks kartu yang diklik pengguna.
  function handleUpdateText(
    field: "name" | "skillTitle" | "skillDescription",
    value: string,
  ) {
    updateActiveCard(field, value);
  }

  return (
    <main className="relative flex min-h-dvh flex-col bg-surface pb-44 pt-24 text-ink">
      <EditorHeader
        deckTitle={deckTitle}
        onBack={() => router.back()}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {!isCompletedMode && (
        <div className="flex justify-end items-center gap-2 px-4">
          <button
            type="button"
            onClick={handleDeleteCard}
            disabled={deck.length <= 1}
            className="border border-accent rounded-xl p-2 font-semibold transition-colors hover:bg-danger/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Hapus kartu
          </button>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-md flex-col items-center px-4">
        <CardPreview
          key={card.id}
          card={card}
          templateKey={templateKey}
          editState={editState}
          onEditText={handleUpdateText}
        />

        <CardThumbnails
          deck={deck}
          activeIndex={activeIndex}
          completeMode={isCompletedMode}
          deckTitle={deckTitle}
          cameraInputRef={cameraInputRef}
          onSelectCard={selectCard}
          onAddCard={handleAddCard}
        />

        {/* Dua aksi edit */}
        {!isCompletedMode && (
          <div className="mt-4 grid w-full max-w-sm grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setOpenSheet("photo")}
              className="flex items-center justify-center gap-2 rounded-xl border border-surface-muted bg-surface-card px-3 py-3 text-xs font-bold shadow-button transition-all hover:bg-surface-soft active:scale-[0.98]"
            >
              ✦ Foto & Gaya
            </button>

            <button
              type="button"
              onClick={() => setOpenSheet("details")}
              className="flex items-center justify-center gap-2 rounded-xl border border-surface-muted bg-surface-card px-3 py-3 text-xs font-bold shadow-button transition-all hover:bg-surface-soft active:scale-[0.98]"
            >
              ✎ Edit
            </button>
          </div>
        )}
      </div>

      {/* Hidden render semua kartu untuk export */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: 360,
          height: 0,
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -10000,
            top: 0,
            width: 360,
          }}
        >
          {deck.map((exportCard, index) => (
            <div
              key={exportCard.id}
              ref={(node) => {
                cardRefs.current[index] = node;

                return () => {
                  cardRefs.current[index] = null;
                };
              }}
            >
              <CardPreview
                card={exportCard}
                templateKey={templateKey}
                editState={loadEditState(exportCard.id)}
                onEditText={() => {}}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA bawah */}
      {!isCompletedMode && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-surface-muted bg-surface/95 px-4 pb-4 pt-2.5 backdrop-blur-md">
          <div className="mx-auto flex max-w-md flex-col gap-2">
            {/* Tombol simpan draft */}
            <button
              type="button"
              onClick={async () => {
                handleSaveDraft();
                router.push("/");
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-surface-muted bg-surface-card py-3 text-sm font-bold text-ink shadow-button transition-all active:scale-[0.99]"
            >
              Simpan Draf dan Kembali
            </button>

            <button
              type="button"
              onClick={handleFinishAndDownload}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold tracking-wide text-white shadow-button transition-all active:scale-[0.99]"
            >
              Selesaikan & Unduh →
            </button>
          </div>
        </div>
      )}

      {/* Sheet Foto & Gaya */}
      {openSheet === "photo" && (
        <PhotoStyleSheet
          card={card}
          photoTab={photoTab}
          selectedStyle={selectedStyle}
          applyToAll={applyToAll}
          isAiProcessing={isAiProcessing}
          isAiPreviewVisible={isAiPreviewVisible}
          cameraInputRef={cameraInputRef}
          galleryInputRef={galleryInputRef}
          onClose={() => setOpenSheet(null)}
          onChangeTab={setPhotoTab}
          onSelectGalleryPhoto={(image) => updateActiveCard("image", image)}
          onUploadFile={handleAddCard}
          onSelectStyle={setSelectedStyle}
          onToggleApplyToAll={() => setApplyToAll((current) => !current)}
          onStartAi={startAi}
          onApplyAi={applyAi}
          onCancelAi={() => setIsAiPreviewVisible(false)}
        />
      )}

      {/* Panel Edit */}
      {openSheet === "details" && (
        <CardEditSheet
          card={card}
          editState={editState}
          onClose={() => setOpenSheet(null)}
          onUpdateStyle={(patch) =>
            updateEditState({
              ...editState,
              ...patch,
            })
          }
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={past.length > 0}
          canRedo={future.length > 0}
        />
      )}

      {/* Menu deck */}
      {isMenuOpen && (
        <DeckMenu
          onClose={() => setIsMenuOpen(false)}
          onRename={() => {
            setDeckTitleInput(deckTitle);
            setIsRenameOpen(true);
            setIsMenuOpen(false);
          }}
          onDuplicate={() => {
            setIsMenuOpen(false);
            alert("Prototype: Duplikasi Deck belum tersedia.");
          }}
          onDelete={() => {
            setIsMenuOpen(false);
            handleDeleteCard();
          }}
        />
      )}

      {/* Modal ubah nama */}
      {isRenameOpen && (
        <RenameDeckModal
          value={deckTitleInput}
          onChange={setDeckTitleInput}
          onCancel={() => setIsRenameOpen(false)}
          onSave={saveDeckTitle}
        />
      )}

      {/* Modal unduh */}
      {isDownloadOpen && (
        <DownloadModal
          phase={downloadPhase}
          deckCount={deck.length}
          onBackRoute={() => {
            router.push("/");
            setIsDownloadOpen(false);
          }}
          onClose={() => setIsDownloadOpen(false)}
          onConfirm={() => {
            completeFreeDeckDownload();
            setDownloadPhase("ready");
          }}
          onExportPdf={handleExportPdf}
          onExportZip={handleExportZip}
        />
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
