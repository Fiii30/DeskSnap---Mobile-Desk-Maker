"use client";

// useState mengelola daftar deck, modal, dan toast.
import { useEffect, useRef, useState } from "react";

// Tipe data deck.
type Deck = {
  id: string;
  title: string;
  cardCount: number;
  status: "Draft" | "Siap Cetak";
  timeLabel: string;
  statusIcon: "edit" | "check";
  image: string;
};

// Tipe menu yang sedang dipilih.
type SelectedDeck = {
  id: string;
  title: string;
} | null;

// Gambar cover dari export Stitch.
const DECK_IMAGES = {
  cat: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSQirKXgNFW0VtNUIlXToGfWfcAw4Ajn0cB_pASmzQLttpUEoAIRAY5V5aqFiCMkNgCpp26cL6qHwLcHMh_-QbklnuwVARTMe7ThaiPbsfwywe_eK3SlZSVRTH8FE7tSIOCNPOtM9UwRHatc7be0uWqmiptVHRLRXDl6QwXJ4wrT5bINvKxs-WlhYeQoQOjT2ws3A5BkgnU9XJia6ReTYOYqLiz7veKtZ_v-y0OqbGNFi37yb48YSW",
  campus:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAdEaM40jEQGTHhEzxfCzS45hHWoAXblVasM_y92iX884WsIacwbcE9YJESi10jsbTg9QnSfFw20KhXV0MPd7iiSCQ5psN-OAt2VaW6PBsdBVB4fN8Vkxq9Jm4P6nQRQ330cCdN17LovtGGfK_r3qq1os516tveafyBfYycTPXZSmfNPvqWBl256DpnLGzkx_GzdG7-i5eGGKOTuadDtrakO3wrKVYE4KgZzMZGcItLZwLejpzX_g0S",
  quiz:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBm3yKJZ1ASTXyA6_8FSJzHCHF048JQh3vAAKHK2C-UgdFIrb5OrML8wshjnBXRJ_m6RgqBVVb2kauUBCRohCKXNyRz11BGF87EoIQIJUCxk0canOcygoYwxWX5QcFK90MjMBoZ4NafxGhTNBPi5E8XImlHh0aBMEbEdkCYwkH5FVeyfbtCAfpxd-dUcfewjlOKBPrN8N_9rwFmW3XxSi_eLF78wCydNDFlO2TDMNtG52xmqwGt48DW",
};

// Data awal hanya untuk prototype.
const INITIAL_DECKS: Deck[] = [
  {
    id: "deck-1",
    title: "Kucing Oren",
    cardCount: 14,
    status: "Draft",
    timeLabel: "2 jam lalu",
    statusIcon: "edit",
    image: DECK_IMAGES.cat,
  },
  {
    id: "deck-2",
    title: "Kenangan Kampus",
    cardCount: 24,
    status: "Siap Cetak",
    timeLabel: "Siap Ekspor",
    statusIcon: "check",
    image: DECK_IMAGES.campus,
  },
  {
    id: "deck-3",
    title: "Kuis Teman",
    cardCount: 30,
    status: "Draft",
    timeLabel: "Kemarin",
    statusIcon: "edit",
    image: DECK_IMAGES.quiz,
  },
];

// Ikon plus.
function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Ikon panah.
function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ikon titik tiga.
function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  );
}

// Ikon edit.
function EditIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 20h4l10-10-4-4L4 16v4Zm12-14 2-2 4 4-2 2-4-4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ikon salin.
function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 5H6a2 2 0 0 0-2 2v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Ikon hapus.
function TrashIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ikon centang.
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ikon kartu untuk empty state.
function CardsIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 6 3 17a2 2 0 0 0 1.6 2.3l2.4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

// Halaman Dashboard.
export default function DashboardScreen() {
  // Daftar deck yang tampil.
  const [decks, setDecks] = useState<Deck[]>(INITIAL_DECKS);

  // Modal profil terbuka atau tidak.
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Deck yang dipilih dari menu titik tiga.
  const [selectedDeck, setSelectedDeck] = useState<SelectedDeck>(null);

  // Modal ubah nama dan hapus.
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Nilai input ubah nama.
  const [renameValue, setRenameValue] = useState("");

  // Pesan toast sementara.
  const [toast, setToast] = useState<string | null>(null);

  // Referensi timer toast agar tidak bertumpuk.
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Membersihkan timer saat komponen dilepas.
  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // Menampilkan pesan prototype selama 2,8 detik.
  function showToast(message: string) {
    setToast(message);

    if (toastTimer.current) clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2800);
  }

  // Membuka menu titik tiga untuk deck tertentu.
  function openDeckMenu(deck: Deck) {
    setSelectedDeck({ id: deck.id, title: deck.title });
  }

  // Menutup semua menu dan modal.
  function closeOverlays() {
    setSelectedDeck(null);
    setIsRenameOpen(false);
    setIsDeleteOpen(false);
    setIsProfileOpen(false);
  }

  // Mengubah nama deck pada state.
  function handleRename() {
    const newName = renameValue.trim();

    if (!newName || !selectedDeck) return;

    setDecks((currentDecks) =>
      currentDecks.map((deck) =>
        deck.id === selectedDeck.id ? { ...deck, title: newName } : deck,
      ),
    );

    showToast(`Nama deck diubah menjadi "${newName}"`);
    closeOverlays();
  }

  // Menghapus deck dari state.
  function handleDelete() {
    if (!selectedDeck) return;

    setDecks((currentDecks) =>
      currentDecks.filter((deck) => deck.id !== selectedDeck.id),
    );

    showToast(`Deck "${selectedDeck.title}" berhasil dihapus`);
    closeOverlays();
  }

  return (
    <main className="relative min-h-dvh bg-[#f9f9fb] pb-[env(safe-area-inset-bottom)] pt-16 text-[#1a1c1e]">
      {/* HEADER TETAP */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#f9f9fb]/85 pt-[env(safe-area-inset-top)] shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-7 -rotate-3 items-center justify-center rounded-lg bg-[#dbe1ff]">
              <CardsIcon className="text-[#0051d5]" />
            </div>

            <span className="text-[20px] font-semibold tracking-tight">
              Deck<span className="text-[#0051d5]">Snap</span>
            </span>
          </div>

          <button
            type="button"
            aria-label="Buka profil pengguna"
            onClick={() => setIsProfileOpen(true)}
            className="flex h-11 min-w-[44px] items-center justify-center rounded-full transition-colors hover:bg-[#e8e8ea]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0051d5] text-[12px] font-bold text-white">
              RP
            </span>
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-md px-4 pb-10">
        {/* SUBHEADER */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-[20px] font-semibold tracking-tight">Studio Kartu</h1>

            <span className="rounded-full bg-[#dbe1ff] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0051d5]">
              Koleksi Pribadi
            </span>
          </div>

          <button
            type="button"
            aria-label="Buka profil pengguna"
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-2 rounded-full bg-[#edeef0] p-1 pl-2.5 transition-transform active:scale-95"
          >
            <span className="flex items-center gap-1.5 text-[13px] font-semibold">
              <span className="text-[16px] text-[#0051d5]" aria-hidden="true">
                ◎
              </span>
              12
            </span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#316bf3] text-[13px] font-semibold text-white">
              RP
            </span>
          </button>
        </div>

        {/* TOMBOL BUAT DECK */}
        <div className="mt-1 mb-4">
          <button
            type="button"
            onClick={() => showToast("Membuka kanvas pembuatan deck baru... (prototype)")}
            className="group flex w-full items-center justify-between rounded-xl bg-[#0051d5] px-4 py-3.5 text-white shadow-md transition-all hover:bg-[#316bf3] active:scale-[0.99]"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                <PlusIcon className="transition-transform duration-300 group-hover:rotate-90" />
              </span>

              <span className="text-left">
                <span className="block text-[15px] font-bold">Buat Deck Baru</span>
                <span className="block text-[13px] leading-5 text-white/80">
                  Ubah memori & kreasi jadi kartu fisik
                </span>
              </span>
            </span>

            <ArrowIcon />
          </button>
        </div>

        {/* JUDUL DAFTAR DECK */}
        <div className="flex items-center justify-between pt-1 pb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-semibold">Deck Kamu</h2>

            <span className="rounded-full bg-[#e8e8ea] px-2 py-0.5 text-[11px] font-bold text-[#58423c]">
              {decks.length} deck
            </span>
          </div>

          <button
            type="button"
            onClick={() => showToast("Pratinjau kosong akan dibuat pada tahap berikutnya.")}
            className="flex items-center gap-1.5 rounded-full bg-[#edeef0] px-2.5 py-1 text-[11px] font-bold transition-colors hover:bg-[#e8e8ea]"
          >
            <span className="text-[15px] text-[#0051d5]" aria-hidden="true">
              ⇄
            </span>
            Pratinjau Kosong
          </button>
        </div>

        {/* GRID DECK */}
        {decks.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5">
            {decks.map((deck) => (
              <article
                key={deck.id}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              >
                {/* COVER DECK */}
                <button
                  type="button"
                  onClick={() =>
                    showToast(`Membuka "${deck.title}" di Editor & Pratinjau... (prototype)`)
                  }
                  className="relative block w-full cursor-pointer overflow-hidden bg-[#f3f3f6] aspect-[4/5]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deck.image}
                    alt={`Cover deck ${deck.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <span className="absolute inset-0 bg-gradient-to-t from-[#2f3133]/60 via-transparent to-transparent opacity-60" />

                  <span
                    className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[11px] font-bold backdrop-blur-sm ${
                      deck.status === "Siap Cetak"
                        ? "bg-[#dbe1ff] text-[#004883]"
                        : "bg-white/90 text-[#58423c]"
                    }`}
                  >
                    {deck.status}
                  </span>
                </button>

                {/* INFO DECK */}
                <div className="flex grow flex-col justify-between p-3">
                  <div className="flex items-start justify-between gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        showToast(`Membuka "${deck.title}" di Editor & Pratinjau... (prototype)`)
                      }
                      className="min-w-0 text-left"
                    >
                      <h3 className="truncate text-[15px] font-bold">{deck.title}</h3>
                      <p className="text-[13px] leading-5 text-[#58423c]">
                        {deck.cardCount} Kartu
                      </p>
                    </button>

                    <button
                      type="button"
                      aria-label={`Opsi deck ${deck.title}`}
                      onClick={() => openDeckMenu(deck)}
                      className="-mr-1 rounded-full p-1 text-[#58423c] transition-colors hover:bg-[#e8e8ea]"
                    >
                      <MoreIcon />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between border-t border-[#e8e8ea] pt-2 text-[#5d5c56]">
                    <span className="flex items-center gap-1 text-[11px] font-bold">
                      <span aria-hidden="true">
                        {deck.statusIcon === "check" ? "✓" : "🗓"}
                      </span>
                      {deck.timeLabel}
                    </span>

                    <span className="text-[16px] text-[#0051d5] transition-transform group-hover:translate-x-0.5">
                      {deck.statusIcon === "check" ? <CheckIcon /> : <EditIcon />}
                    </span>
                  </div>
                </div>
              </article>
            ))}

            {/* TILE TAMBAH CEPAT */}
            <button
              type="button"
              onClick={() => showToast("Membuka kanvas pembuatan deck baru... (prototype)")}
              className="flex flex-col items-center justify-center rounded-xl bg-[#f3f3f6] p-4 text-center transition-colors hover:bg-[#edeef0] active:scale-95"
            >
              <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0051d5] shadow-sm transition-transform group-hover:scale-110">
                <PlusIcon />
              </span>

              <span className="text-[13px] font-bold">Deck Baru</span>
              <span className="mt-0.5 text-[13px] leading-5 text-[#58423c]">Mulai racik</span>
            </button>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center rounded-xl bg-white px-4 py-12 text-center shadow-sm">
            <div className="relative mb-4 flex h-24 w-20 items-center justify-center rounded-xl bg-[#edeef0]">
              <div className="flex h-[72px] w-14 items-center justify-center rounded-lg bg-white shadow-sm">
                <CardsIcon className="text-[#0051d5]" />
              </div>

              <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#0051d5] text-white">
                <PlusIcon className="h-4 w-4" />
              </span>
            </div>

            <h3 className="mb-1 text-[20px] font-semibold">Belum ada deck.</h3>

            <p className="mb-6 max-w-xs text-[15px] leading-6 text-[#58423c]">
              Mulai dari foto favoritmu dan cetak jadi kartu fisik berkualitas boutique.
            </p>

            <button
              type="button"
              onClick={() => showToast("Membuka kanvas pembuatan deck baru... (prototype)")}
              className="flex items-center gap-2 rounded-xl bg-[#0051d5] px-6 py-3 text-[15px] font-bold text-white shadow-sm transition-all hover:bg-[#316bf3] active:scale-95"
            >
              <PlusIcon />
              Buat Deck Sekarang
            </button>
          </div>
        )}
      </div>

      {/* MENU TITIK TIGA */}
      {selectedDeck && !isRenameOpen && !isDeleteOpen && (
        <>
          <button
            type="button"
            aria-label="Tutup menu deck"
            onClick={() => setSelectedDeck(null)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="fixed inset-x-4 bottom-6 z-50 mx-auto w-full max-w-[176px] rounded-xl bg-white py-1.5 text-left shadow-xl">
            <button
              type="button"
              onClick={() => {
                setRenameValue(selectedDeck.title);
                setIsRenameOpen(true);
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-[13px] font-semibold hover:bg-[#edeef0]"
            >
              <EditIcon className="text-[#58423c]" />
              Ubah Nama
            </button>

            <button
              type="button"
              onClick={() => {
                showToast(`Menyalin "${selectedDeck.title}"... (prototype)`);
                setSelectedDeck(null);
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-[13px] font-semibold hover:bg-[#edeef0]"
            >
              <CopyIcon />
              Duplikasi
            </button>

            <div className="my-1 h-px bg-[#edeef0]" />

            <button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-[13px] font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]"
            >
              <TrashIcon className="text-[#ba1a1a]" />
              Hapus Deck
            </button>
          </div>
        </>
      )}

      {/* MODAL PROFIL */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#2f3133]/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl">
            <div className="flex items-center justify-between pb-4">
              <h3 className="text-[20px] font-semibold">Profil Pengguna</h3>

              <button
                type="button"
                aria-label="Tutup profil"
                onClick={() => setIsProfileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edeef0] text-[#58423c] transition-colors hover:bg-[#e8e8ea]"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 flex items-center gap-3.5 rounded-xl bg-[#edeef0] p-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0051d5] text-[20px] font-bold text-white">
                RP
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold">Wafi</p>
                <p className="truncate text-[13px] leading-5 text-[#58423c]">
                  w***@gmail.com
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-xl bg-[#f3f3f6] p-3.5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-semibold">Sisa Token Cetak</span>

                <span className="flex items-center gap-1 text-[15px] font-bold text-[#0051d5]">
                  ◎ 12 Token
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-[#e2e2e5]">
                <div className="h-full w-[60%] rounded-full bg-[#0051d5]" />
              </div>

              <p className="mt-2 text-[13px] leading-5 text-[#58423c]">
                Cukup untuk mencetak 1 deck standar (54 kartu).
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => showToast("Riwayat pesanan cetak belum tersedia.")}
                className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-[#edeef0]"
              >
                <span className="flex items-center gap-2.5 text-[13px] font-semibold">
                  <span className="text-[20px] text-[#0051d5]">🧾</span>
                  Riwayat Pesanan Cetak
                </span>

                <span className="text-[#5d5c56]">›</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Alamat pengiriman belum tersedia.")}
                className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-[#edeef0]"
              >
                <span className="flex items-center gap-2.5 text-[13px] font-semibold">
                  <span className="text-[20px] text-[#0051d5]">🚚</span>
                  Alamat Pengiriman
                </span>

                <span className="text-[#5d5c56]">›</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeOverlays();
                  showToast("Sesi akun berakhir (simulasi).");
                }}
                className="w-full rounded-lg bg-[#edeef0] py-3 text-center text-[15px] font-bold text-[#ba1a1a] transition-colors hover:bg-[#ffdad6]"
              >
                Keluar Akun
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HAPUS */}
      {isDeleteOpen && selectedDeck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f3133]/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffdad6] text-[#93000a]">
              <TrashIcon className="h-6 w-6" />
            </div>

            <h3 className="mb-1.5 text-[20px] font-semibold">Hapus Deck?</h3>

            <p className="mb-6 text-[15px] leading-6 text-[#58423c]">
              Apakah kamu yakin ingin menghapus deck{" "}
              <strong className="text-[#1a1c1e]">{selectedDeck.title}</strong>? Tindakan ini
              tidak dapat dibatalkan.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-xl bg-[#edeef0] px-4 py-2.5 text-[15px] font-bold transition-colors hover:bg-[#e8e8ea]"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-[#ba1a1a] px-4 py-2.5 text-[15px] font-bold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL UBAH NAMA */}
      {isRenameOpen && selectedDeck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f3133]/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-1 text-[20px] font-semibold">Ubah Nama Deck</h3>

            <p className="mb-4 text-[13px] leading-5 text-[#58423c]">
              Masukkan judul baru untuk deck kartu ini.
            </p>

            <input
              type="text"
              value={renameValue}
              onChange={(event) => setRenameValue(event.target.value)}
              placeholder="Judul Deck"
              className="mb-5 w-full rounded-lg bg-[#edeef0] px-3 py-2.5 text-[15px] outline-none transition-colors focus:bg-white"
            />

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIsRenameOpen(false)}
                className="rounded-xl bg-[#edeef0] px-4 py-2.5 text-[15px] font-bold transition-colors hover:bg-[#e8e8ea]"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleRename}
                className="rounded-xl bg-[#0051d5] px-4 py-2.5 text-[15px] font-bold text-white shadow-sm transition-colors hover:bg-[#316bf3]"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-[#2f3133] px-4 py-2.5 text-[13px] font-semibold text-[#f0f0f3] shadow-lg"
        >
          <span className="text-[#b4c5ff]" aria-hidden="true">
            ✓
          </span>
          {toast}
        </div>
      )}
    </main>
  );
}