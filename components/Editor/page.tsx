"use client";

// useState untuk deck, kartu aktif, sheet, modal, dan form.
import { useRef, useState } from "react";

// Tipe kartu TCG.
type Card = {
  id: string;
  name: string;
  archetype: string;
  index: string;
  rarity: string;
  atk: number;
  hp: number;
  cost: number;
  skillTitle: string;
  skillDescription: string;
  image: string;
  thumbTitle: string;
  thumbSubtitle: string;
};

// Gambar dari export Stitch.
const IMG_1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCk7d_zScX5BwQ6529WwyVyffdsfXB2jzkqasw4Fic6QkIHV4FeryM2rcGaOhr6XseOBrzTEX5povSz4b84075MgcsceTKJPJUwgq4NoIy2L6qn_JR4MzP4lFnxbEI5IRlbA9Y3tomDFamqRfPZjRn3CULKYJ9V7vG09SYdjoLQh8RpRrXcP9ylb6FkjEt77edhB6swZ89TdYhXLbyCMfh8VKcqERnCfJTzwV6qFMe4M924ly5ZK9AE";

const IMG_2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDM4deHuI6e9uUhCMXAVDAQubS8mPPGQxLlKFzz2gt6Lv5aQ60jpkT8LVamLn5Tk1_h9OGyHK7JONk3KI3crM7-Wkw1TJ-QrR-HBrh3lfrUqXGXZVk2WMA44BMwilb29-N3tj77nQarjBX-XE3pR0Q-27Q_ms5uYRaIAd62OzUAJY2focRh8_bI3QmxcFzhgo7mq-TqwP4xPGyhLqAE4coA7yJtAanCbYf2x4XFKeoHQwDQpjmihEXO";

const IMG_3 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCk7d_zScX5BwQ6529WwyVyffdsfXB2jzkqasw4Fic6QkIHV4FeryM2rcGaOhr6XseOBrzTEX5povSz4b84075MgcsceTKJPJUwgq4NoIy2L6qn_JR4MzP4lFnxbEI5IRlbA9Y3tomDFamqRfPZjRn3CULKYJ9V7vG09SYdjoLQh8RpRrXcP9ylb6FkjEt77edhB6swZ89TdYhXLbyCMfh8VKcqERnCfJTzwV6qFMe4M924ly5ZK9AE";

const IMG_4 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCZKbzynlZyjqRwcgsHuXnIEv5sJhzhqv_MSGqU1s_G1f2JX-c8x_BwQe9BIYabVKF2xVxKdm1jo1RRuChXqRh7Z2G4ZlNnQrGd6sCuBdtcZ8odh5ChMuvPV8mdl-gafzdH8X2n-FI86m8JE83zYpdmxlGkvFVxdkKTV-3m2q8ZpKdi2eoCvcOTLhXFOfE7PL88Vw2mdHNP-EfwjPqDDToBngEkQScydtpPVnwvpS89zdRpoV_3X1fA";

const IMG_5 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCHipSeG_7rEF4M-p_rZOBpSDbHPKIkJGiD5en06a88qYWiEBnG0tx_7n0Ya6TLlS2NYP6Rw2G1f3ruo3HPKEbsrJjf5abCdbErsUGuLoHZIlqtwPQm5GeYiFe2ArOlMcxr5NwuXHLALcC0WtGR_SLp3g_oDkFe27hxeFVxL1oMOz-3kBco6C09rLUJrQuZPHweWMIL4dWo2epXLOVyH07U61HwzafX2fXoyFra0J9VLUQOehDVDBAs";

// Enam kartu awal dari export Stitch.
const INITIAL_DECK: Card[] = [
  {
    id: "card-1",
    name: "Oren si Barbar",
    archetype: "PENYERANG",
    index: "#01",
    rarity: "SUPER RARE",
    atk: 120,
    hp: 950,
    cost: 3,
    skillTitle: "Cakar Bar-bar",
    skillDescription:
      "Menerjang musuh dengan cakaran beruntun. Menembus 30% perisai pertahanan musuh.",
    image: IMG_1,
    thumbTitle: "Oren Barbar",
    thumbSubtitle: "Penyerang",
  },
];

// Gaya AI.
const AI_STYLES = [
  {
    key: "Original",
    label: "Original",
    note: "Gratis",
    color: "text-stone-600",
  },
  { key: "Vektor", label: "Vektor", note: "Klasik", color: "text-blue-600" },
  { key: "Pixel", label: "Pixel", note: "16-Bit", color: "text-purple-600" },
  { key: "Kartun", label: "Kartun", note: "Imut", color: "text-pink-600" },
  {
    key: "Cat Air",
    label: "Cat Air",
    note: "Artistik",
    color: "text-teal-600",
  },
  { key: "Komik", label: "Komik", note: "Heroik", color: "text-[#C2410C]" },
];

// Varian gaya template TCG.
const TCG_STYLES = [
  {
    key: "tcg-default",
    title: "TCG Default",
    note: "Gratis",
    isPremium: false,
    image: IMG_1,
  },
  {
    key: "tcg-neon",
    title: "TCG Neon",
    note: "Premium",
    isPremium: true,
    image: IMG_3,
  },
  {
    key: "tcg-retro",
    title: "TCG Retro",
    note: "Premium",
    isPremium: true,
    image: IMG_4,
  },
  {
    key: "tcg-holo",
    title: "TCG Holo",
    note: "Premium",
    isPremium: true,
    image: IMG_5,
  },
  {
    key: "tcg-dark",
    title: "TCG Dark",
    note: "Premium",
    isPremium: true,
    image: IMG_2,
  },
  {
    key: "tcg-pastel",
    title: "TCG Pastel",
    note: "Premium",
    isPremium: true,
    image: IMG_1,
  },
];

export default function EditorPreviewScreen() {
  // Seluruh kartu dalam deck.
  const [deck, setDeck] = useState<Card[]>(INITIAL_DECK);

  // Index kartu yang sedang ditampilkan.
  const [activeIndex, setActiveIndex] = useState(0);

  // Judul deck.
  const [deckTitle, setDeckTitle] = useState("Kucing Tempur");

  // Form ubah nama deck.
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [deckTitleInput, setDeckTitleInput] = useState(deckTitle);

  // Sheet dan modal.
  const [openSheet, setOpenSheet] = useState<"photo" | "details" | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadPhase, setDownloadPhase] = useState<"confirm" | "ready">(
    "confirm",
  );

  // Tab Foto & Gaya.
  const [photoTab, setPhotoTab] = useState<"foto" | "gaya">("foto");

  // Template TCG yang sedang dipakai.
  const [selectedTcgStyle, setSelectedTcgStyle] = useState("tcg-default");

  // Sheet penawaran template premium.
  const [isPremiumStyleSheetOpen, setIsPremiumStyleSheetOpen] = useState(false);

  // Nama style premium yang ingin dibuka.
  const [pendingPremiumStyle, setPendingPremiumStyle] = useState<string | null>(
    null,
  );

  // AI.
  const [selectedStyle, setSelectedStyle] = useState("Original");
  const [applyToAll, setApplyToAll] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isAiPreviewVisible, setIsAiPreviewVisible] = useState(false);

  // Accordion: hanya satu yang terbuka.
  const [openAccordion, setOpenAccordion] = useState<
    "karakter" | "skill" | null
  >(null);

  // Input file.
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Kartu aktif.
  const card = deck[activeIndex];

  // Batas maksimal kartu dalam satu deck.
  const MAX_CARDS = 10;

  // Mengubah satu kartu dalam deck secara immutable.
  function updateActiveCard<K extends keyof Card>(key: K, value: Card[K]) {
    setDeck((currentDeck) =>
      currentDeck.map((currentCard, index) =>
        index === activeIndex ? { ...currentCard, [key]: value } : currentCard,
      ),
    );
  }

  // Memilih kartu dari thumbnail.
  function selectCard(index: number) {
    setActiveIndex(index);
    setIsAiPreviewVisible(false);
  }

  // Memilih foto galeri.
  function selectGalleryPhoto(image: string) {
    updateActiveCard("image", image);
  }

  // Upload foto lokal untuk preview.
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    updateActiveCard("image", URL.createObjectURL(file));
  }

  // Simulasi AI.
  function startAiSimulation() {
    setIsAiProcessing(true);

    setTimeout(() => {
      setIsAiProcessing(false);
      setIsAiPreviewVisible(true);
    }, 900);
  }

  function applyAiResult() {
    updateActiveCard("image", IMG_3);
    setIsAiPreviewVisible(false);
    setOpenSheet(null);
  }

  // Menyimpan perubahan detail kartu.
  function saveCardDetails() {
    setOpenSheet(null);
  }

  // Mengubah nama deck.
  function saveDeckTitle() {
    const newName = deckTitleInput.trim();

    if (newName) {
      setDeckTitle(newName);
    }

    setIsRenameOpen(false);
  }

  // Menambahkan kartu baru dari foto yang dipilih.
  function addCardFromUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    // Jika tidak ada file, hentikan fungsi.
    if (!file) return;

    // Jika sudah 10 kartu, jangan menambah lagi.
    if (deck.length >= MAX_CARDS) {
      alert(`Maksimal ${MAX_CARDS} kartu dalam satu deck.`);
      return;
    }

    // Membuat preview sementara di browser.
    const localImageUrl = URL.createObjectURL(file);

    // Membuat kartu baru mengikuti kartu aktif sebagai template awal.
    const newCard: Card = {
      ...card,
      id: `card-${Date.now()}`,
      image: localImageUrl,
      index: `#${String(deck.length + 1).padStart(2, "0")}`,
      thumbTitle: `Kartu ${deck.length + 1}`,
    };

    // Menambahkan kartu baru ke deck.
    setDeck((currentDeck) => [...currentDeck, newCard]);

    // Langsung memilih kartu yang baru ditambahkan.
    setActiveIndex(deck.length);

    // Mengosongkan input agar file yang sama bisa dipilih lagi.
    event.target.value = "";
  }

  return (
    <main className="relative flex min-h-dvh flex-col bg-[#F4EFEA] pb-25 pt-[68px] text-[#1C1917]">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-stone-200/70 bg-[#FAF7F2]/90 pt-[max(env(safe-area-inset-top),12px)] backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Kembali ke Dashboard"
              onClick={() => history.back()}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform hover:bg-stone-200/60 active:scale-95"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M19 12H5m6-6-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold tracking-tight">
                {deckTitle}
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/60 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                ✓ Tersimpan
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label="Opsi Deck"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform hover:bg-stone-200/60 active:scale-95"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <circle cx="12" cy="5" r="1.8" />
              <circle cx="12" cy="12" r="1.8" />
              <circle cx="12" cy="19" r="1.8" />
            </svg>
          </button>
        </div>
      </header>

      {/* MENU OVERFLOW */}
      {isMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="fixed right-4 top-16 z-50 flex w-56 flex-col gap-0.5 rounded-xl border border-stone-200 bg-white p-1.5 shadow-xl">
            <button
              type="button"
              onClick={() => {
                setDeckTitleInput(deckTitle);
                setIsRenameOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-semibold hover:bg-stone-100"
            >
              <span aria-hidden="true">✎</span>
              Ubah Nama Deck
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                alert("Prototype: Pengaturan Cetak belum tersedia.");
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-semibold hover:bg-stone-100"
            >
              <span aria-hidden="true">⚙</span>
              Pengaturan Cetak
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                alert("Prototype: Duplikasi Deck belum tersedia.");
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-semibold hover:bg-stone-100"
            >
              <span aria-hidden="true">⧉</span>
              Duplikasi Deck
            </button>

            <div className="my-1 border-t border-stone-100" />

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="w-full rounded-lg px-3 py-2 text-left text-[13px] font-medium text-stone-500 hover:bg-stone-100"
            >
              Tutup
            </button>
          </div>
        </>
      )}

      <div className="mx-auto flex w-full max-w-md flex-col items-center px-4">
        {/* PREVIEW KARTU */}
        <div className="flex w-full justify-center py-2">
          <div className="relative flex aspect-[2.5/3.75] w-full max-w-[316px] flex-col justify-between rounded-2xl border-[1.5px] border-[#2B2723] bg-[#FAF7F2] p-2.5 shadow-[0_8px_20px_rgba(28,25,23,0.08),0_2px_4px_rgba(28,25,23,0.04)]">
            <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[10px] border border-[#2B2723]/30 bg-[#FFFDF9] p-2.5 shadow-inner">
              <div className="z-10 flex items-center justify-between pb-1.5">
                <span className="inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-0.5 text-white shadow-sm">
                  <span aria-hidden="true">⚔</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {card.archetype}
                  </span>
                </span>

                <span className="flex items-center rounded border border-stone-200 bg-stone-100 px-2 py-0.5">
                  <span className="text-[11px] font-extrabold">
                    {card.index}
                  </span>
                </span>
              </div>

              <div className="relative h-[47%] w-full overflow-hidden rounded-lg border border-[#2B2723]/25 bg-stone-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.name}
                  className="h-full w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-stone-900/10 via-transparent to-amber-100/10" />
              </div>

              <div className="z-10 pb-0.5 pt-1.5">
                <div className="flex items-center justify-between rounded-md border border-stone-200/80 bg-white px-2 py-1 shadow-sm">
                  <h2 className="truncate text-[14px] font-extrabold uppercase tracking-tight">
                    {card.name}
                  </h2>

                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px] text-amber-800">
                    ★
                  </span>
                </div>
              </div>

              <div className="z-10 flex items-center justify-between rounded-md border border-stone-200/80 bg-stone-100/90 px-2 py-1 text-[11px] font-bold">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-stone-600">
                    <span className="text-[10px] font-semibold text-stone-400">
                      ATK
                    </span>
                    <span className="text-blue-600">{card.atk}</span>
                  </span>

                  <span className="h-3 w-px bg-stone-300" />

                  <span className="flex items-center gap-1 text-stone-600">
                    <span className="text-[10px] font-semibold text-stone-400">
                      HP
                    </span>
                    <span className="text-blue-700">{card.hp}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-semibold text-stone-400">
                    COST
                  </span>
                  <span className="rounded bg-[#1C1917] px-1.5 py-0.5 text-[10px] text-white">
                    {card.cost}
                  </span>
                </div>
              </div>

              <div className="z-10 flex flex-col gap-0.5 rounded-md border border-stone-200/80 bg-white p-2 shadow-sm">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 font-bold uppercase">
                    <span
                      className="text-[13px] text-blue-600"
                      aria-hidden="true"
                    >
                      ϟ
                    </span>
                    {card.skillTitle}
                  </span>

                  <span className="text-[10px] font-medium text-stone-400">
                    Aktif
                  </span>
                </div>

                <p className="line-clamp-2 text-[10.5px] leading-[14px] text-stone-600">
                  {card.skillDescription}
                </p>
              </div>

              <div className="z-10 flex items-center justify-between px-0.5 pt-0.5 text-[9px] font-medium text-stone-400">
                <span>DeckSnap {card.index}-KCNG</span>
                <span>Art Carton 310g • Gloss</span>
              </div>
            </div>
          </div>
        </div>

        {/* THUMBNAIL */}
        <div className="mt-2 flex w-full max-w-[340px] flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-bold">{deckTitle}</span>
              <span className="text-[12px] text-stone-400">•</span>
              <span className="text-[12px] font-medium text-stone-600">
                {activeIndex + 1} dari {deck.length}
              </span>
            </div>

            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Siap Cetak
            </span>
          </div>

          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-1 pb-1 pt-0.5">
            {/* HANYA SATU THUMBNAIL: KARTU AKTIF */}
            <button
              key={card.id}
              type="button"
              className="flex h-20 w-16 shrink-0 flex-col justify-between rounded-lg bg-white p-1 text-left shadow-sm ring-2 ring-[#C2410C]"
            >
              <span className="h-11 w-full overflow-hidden rounded bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.name}
                  className="h-full w-full object-cover"
                />
              </span>

              <span className="flex flex-col leading-tight">
                <span className="truncate text-[9.5px] font-bold">
                  {card.thumbTitle}
                </span>

                <span className="text-[8px] font-medium text-stone-500">
                  {card.index}
                </span>
              </span>
            </button>

            {/* TOMBOL TAMBAH GAMBAR */}
            <button
              type="button"
              aria-label="Tambah gambar kartu"
              onClick={() => fileInputRef.current?.click()}
              disabled={deck.length >= MAX_CARDS}
              className={`flex h-20 w-16 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed transition-all active:scale-95 ${
                deck.length >= MAX_CARDS
                  ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400"
                  : "border-stone-300 bg-white/70 text-stone-500 hover:border-[#C2410C] hover:bg-white hover:text-[#C2410C]"
              }`}
            >
              <span className="text-[20px]" aria-hidden="true">
                +
              </span>

              <span className="text-[9px] font-bold leading-tight">
                {deck.length >= MAX_CARDS ? "Penuh" : "Tambah"}
              </span>
            </button>

            {/* INPUT FILE TERSEMBUNYI */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={addCardFromUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* AKSI EDIT */}
        <div className="mt-4 grid w-full max-w-[340px] grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setOpenSheet("photo")}
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-3 text-[13px] font-bold shadow-sm transition-all hover:bg-stone-50 active:scale-[0.98]"
          >
            <span className="text-[20px] text-blue-600" aria-hidden="true">
              ✦
            </span>
            Foto & Gaya
          </button>

          <button
            type="button"
            onClick={() => setOpenSheet("details")}
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-3 text-[13px] font-bold shadow-sm transition-all hover:bg-stone-50 active:scale-[0.98]"
          >
            <span className="text-[20px] text-blue-600" aria-hidden="true">
              ✎
            </span>
            Detail Kartu
          </button>
        </div>
      </div>

      {/* CTA BAWAH */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-[#FAF7F2]/95 px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-md flex-col gap-1">
          <button
            type="button"
            onClick={() => {
              setDownloadPhase("confirm");
              setIsDownloadOpen(true);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-[15px] font-bold tracking-wide text-white shadow-md transition-all active:scale-[0.99]"
          >
            Selesaikan & Unduh
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* SHEET FOTO & GAYA */}
      {openSheet === "photo" && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#1C1917]/40 backdrop-blur-sm">
          <div className="flex max-h-[88vh] flex-col overflow-hidden rounded-t-2xl border-t border-stone-200 bg-[#FAF7F2] shadow-2xl">
            <div className="mx-auto my-2 h-1 w-10 shrink-0 rounded-full bg-stone-300" />

            <div className="flex shrink-0 items-center justify-between border-b border-stone-200/80 px-5 pb-3">
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt=""
                  className="h-9 w-9 rounded-lg border border-stone-300 object-cover"
                />

                <div>
                  <h3 className="text-[15px] font-bold leading-tight">
                    Foto & Gaya
                  </h3>
                  <p className="text-[12px] text-stone-500">
                    {card.name.toUpperCase()} ({card.index})
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Tutup Foto & Gaya"
                onClick={() => setOpenSheet(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200/60 text-stone-700 hover:bg-stone-300"
              >
                ✕
              </button>
            </div>

            <div className="shrink-0 px-5 pt-3">
              <div className="grid grid-cols-2 rounded-xl bg-stone-200/70 p-1">
                <button
                  type="button"
                  onClick={() => setPhotoTab("foto")}
                  className={`rounded-lg py-1.5 text-[13px] font-bold transition-all ${
                    photoTab === "foto"
                      ? "bg-white shadow-sm"
                      : "text-stone-600"
                  }`}
                >
                  Foto
                </button>

                <button
                  type="button"
                  onClick={() => setPhotoTab("gaya")}
                  className={`rounded-lg py-1.5 text-[13px] font-bold transition-all ${
                    photoTab === "gaya"
                      ? "bg-white shadow-sm"
                      : "text-stone-600"
                  }`}
                >
                  ✦ Gaya AI
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {photoTab === "foto" ? (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-300 bg-white/70 px-4 py-3.5 transition-all hover:bg-white active:scale-[0.99]"
                  >
                    <span
                      className="text-[22px] text-[#C2410C]"
                      aria-hidden="true"
                    >
                      🖼
                    </span>
                    <span className="text-[13px] font-bold">
                      Tambah Foto dari Galeri
                    </span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* GAYA TEMPLATE TCG */}
                  <div>
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      Gaya Template TCG
                    </span>

                    <div className="grid grid-cols-3 gap-2.5">
                      {TCG_STYLES.map((style) => {
                        const isActive = selectedTcgStyle === style.key;

                        return (
                          <button
                            key={style.key}
                            type="button"
                            onClick={() => {
                              if (style.isPremium) {
                                setPendingPremiumStyle(style.title);
                                setIsPremiumStyleSheetOpen(true);
                                return;
                              }

                              setSelectedTcgStyle(style.key);
                            }}
                            className={`relative aspect-square overflow-hidden rounded-xl bg-white shadow-sm transition-all ${
                              isActive
                                ? "ring-2 ring-[#C2410C]"
                                : "hover:opacity-90"
                            }`}
                          >
                            {/* Preview gaya */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={style.image}
                              alt={style.title}
                              className="h-full w-full object-cover"
                            />

                            {/* Nama gaya */}
                            <span className="absolute inset-x-0 bottom-0 bg-black/55 px-1 py-1 text-[9px] font-bold text-white">
                              {style.title}
                            </span>

                            {/* Badge gratis atau premium */}
                            <span
                              className={`absolute left-1 top-1 rounded px-1.5 py-0.5 text-[8px] font-bold ${
                                style.isPremium
                                  ? "bg-[#C2410C] text-white"
                                  : "bg-emerald-500 text-white"
                              }`}
                            >
                              {style.note}
                            </span>

                            {/* Overlay kunci untuk premium */}
                            {style.isPremium && (
                              <>
                                <span className="absolute inset-0 flex flex-col items-center justify-center bg-[#1C1917]/35 backdrop-blur-sm">
                                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[12px] text-[#004ac6] shadow">
                                    🔒
                                  </span>

                                  <span className="mt-1 text-[9px] font-bold text-white">
                                    Premium
                                  </span>
                                </span>
                                <span className="absolute inset-x-0 bottom-0 bg-black/55 px-1 py-1 text-[9px] font-bold text-white">
                                  {style.title}
                                </span>
                              </>
                            )}

                            {/* Centang untuk gaya aktif */}
                            {isActive && (
                              <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C2410C] text-[12px] text-white">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-2 text-[10.5px] leading-tight text-stone-500">
                      TCG Default gratis. Varian TCG lain memerlukan akses
                      Template Premium dan dibeli terpisah dari AI Style.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        alert("Prototype: alat potong foto belum tersedia.")
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-[12px] font-bold active:scale-95"
                    >
                      <span aria-hidden="true">⛶</span>
                      Potong Foto
                    </button>

                    <button
                      type="button"
                      onClick={() => selectGalleryPhoto(IMG_1)}
                      className="text-[12px] font-semibold text-stone-500 underline hover:text-stone-800"
                    >
                      Gunakan Gambar Bawaan
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2 rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[20px] text-blue-600"
                          aria-hidden="true"
                        >
                          ✦
                        </span>
                        <span className="text-[12px] font-bold">
                          Batas Kuota AI Harian
                        </span>
                      </div>

                      <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                        7/10 Tersedia
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full border border-stone-200 bg-stone-100">
                      <div className="h-full w-[70%] rounded-full bg-blue-600" />
                    </div>

                    <p className="text-[11px] font-medium text-stone-600">
                      7 dari 10 gambar AI tersedia hari ini.
                    </p>

                    <div className="flex items-center justify-between border-t border-stone-100 pt-1 text-[10px] text-stone-500">
                      <span>Reset otomatis setiap 00:00 WIB</span>
                      <span className="font-semibold text-emerald-700">
                        Gratis 100% tanpa token
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      Pilih Filter / Gaya
                    </span>

                    <div className="grid grid-cols-3 gap-2">
                      {AI_STYLES.map((style) => (
                        <button
                          key={style.key}
                          type="button"
                          onClick={() => setSelectedStyle(style.key)}
                          className={`flex flex-col items-center gap-1 rounded-xl border-2 bg-white p-2 text-center transition-all ${
                            selectedStyle === style.key
                              ? "border-[#C2410C]"
                              : "border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          <span
                            className={`text-[22px] ${style.color}`}
                            aria-hidden="true"
                          >
                            ✦
                          </span>
                          <span className="text-[12px] font-bold">
                            {style.label}
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                              style.note === "Gratis"
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-stone-400"
                            }`}
                          >
                            {style.note}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-2.5">
                    <div>
                      <span className="block text-[12px] font-bold">
                        Cakupan Gaya
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {applyToAll
                          ? "Terapkan ke semua 6 foto dalam deck ini"
                          : `Terapkan hanya untuk kartu ini (${card.index})`}
                      </span>

                      <span className="mt-0.5 block text-[10.5px] font-semibold text-blue-600">
                        Akan memproses {applyToAll ? deck.length : 1} gambar AI
                      </span>
                    </div>

                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={applyToAll}
                        onChange={(event) =>
                          setApplyToAll(event.target.checked)
                        }
                        className="peer sr-only"
                      />

                      <span className="h-6 w-10 rounded-full bg-stone-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-stone-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#C2410C] peer-checked:after:translate-x-full peer-checked:after:border-white" />
                    </label>
                  </div>

                  <div className="flex items-start gap-2 rounded-xl border border-stone-200/80 bg-stone-100/90 p-2.5 text-[11px] text-stone-600">
                    <span
                      className="mt-0.5 shrink-0 text-[16px] text-stone-500"
                      aria-hidden="true"
                    >
                      ⓘ
                    </span>
                    <p className="leading-tight">
                      Hanya 1 proses AI aktif per akun dengan jeda cooldown
                      singkat antar pembuatan gambar.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={startAiSimulation}
                    disabled={isAiProcessing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C1917] py-3 text-[14px] font-bold text-white transition-transform active:scale-[0.99] disabled:opacity-70"
                  >
                    <span
                      className="text-[18px] text-[#C2410C]"
                      aria-hidden="true"
                    >
                      ✦
                    </span>
                    {isAiProcessing ? "Memproses Seni AI..." : "Buat Gaya AI"}
                  </button>

                  <div className="flex items-start gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50 p-3">
                    <span
                      className="mt-0.5 shrink-0 text-[18px] text-amber-700"
                      aria-hidden="true"
                    >
                      !
                    </span>

                    <div>
                      <p className="text-[11px] font-bold text-amber-800">
                        Bila Batas AI Tercapai
                      </p>
                      <p className="mt-0.5 text-[10.5px] leading-tight text-stone-600">
                        Kamu tetap bisa mengedit dan mengunduh deck. Fitur edit
                        foto asli galeri tetap berfungsi penuh tanpa batasan.
                      </p>
                    </div>
                  </div>

                  {isAiPreviewVisible && (
                    <div className="space-y-3 border-t border-stone-200 pt-1">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Pratinjau Hasil Gaya AI
                      </span>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-stone-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={IMG_3}
                            alt=""
                            className="h-full w-full object-cover"
                          />

                          <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">
                            Sebelum
                          </span>
                        </div>

                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-[#C2410C]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />

                          <span className="absolute bottom-1 left-1 rounded bg-[#C2410C] px-1.5 py-0.5 text-[9px] font-bold text-white">
                            Hasil AI
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={applyAiResult}
                          className="flex-1 rounded-lg bg-[#C2410C] py-2.5 text-[13px] font-bold text-white"
                        >
                          Gunakan Hasil
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsAiPreviewVisible(false)}
                          className="rounded-lg bg-stone-200 px-4 py-2.5 text-[13px] font-semibold text-stone-700"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="shrink-0 border-t border-stone-200 bg-white p-4">
              <button
                type="button"
                onClick={() => setOpenSheet(null)}
                className="w-full rounded-xl bg-[#1C1917] py-3 text-[14px] font-bold text-white"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHEET DETAIL KARTU */}
      {openSheet === "details" && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#1C1917]/40 backdrop-blur-sm">
          <div className="flex max-h-[88vh] flex-col overflow-hidden rounded-t-2xl border-t border-stone-200 bg-[#FAF7F2] shadow-2xl">
            <div className="mx-auto my-2 h-1 w-10 shrink-0 rounded-full bg-stone-300" />

            <div className="flex shrink-0 items-center justify-between border-b border-stone-200/80 px-5 pb-3">
              <div>
                <h3 className="text-[16px] font-bold">Detail Kartu - TCG</h3>
                <p className="text-[12px] text-stone-500">
                  Sesuaikan profil dan kekuatan tempur
                </p>
              </div>

              <button
                type="button"
                aria-label="Tutup Detail Kartu"
                onClick={() => setOpenSheet(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200/60 text-stone-700 hover:bg-stone-300"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-3.5 overflow-y-auto p-5">
              {/* NAMA */}
              <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Nama Kartu
                </label>

                <input
                  type="text"
                  value={card.name}
                  onChange={(event) =>
                    updateActiveCard("name", event.target.value)
                  }
                  className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-[14px] font-bold focus:border-[#C2410C] focus:bg-white focus:outline-none"
                />
              </div>

              {/* KARAKTER */}
              <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion((current) =>
                      current === "karakter" ? null : "karakter",
                    )
                  }
                  aria-expanded={openAccordion === "karakter"}
                  className="flex w-full items-center justify-between px-3.5 py-3 text-left transition-colors hover:bg-stone-50/70"
                >
                  <div>
                    <span className="block text-[13px] font-bold">
                      Karakter & Arketipe
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {card.archetype} · {card.rarity}
                    </span>
                  </div>

                  <span
                    className={`text-[20px] text-stone-400 transition-transform duration-200 ${
                      openAccordion === "karakter" ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </button>

                {openAccordion === "karakter" && (
                  <div className="space-y-3 border-t border-stone-100 px-3.5 pb-3.5 pt-3">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold text-stone-500">
                          Arketipe
                        </label>

                        <select
                          value={card.archetype}
                          onChange={(event) =>
                            updateActiveCard("archetype", event.target.value)
                          }
                          className="w-full rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-2 text-[13px] font-medium focus:border-[#C2410C] focus:outline-none"
                        >
                          {[
                            "PENYERANG",
                            "PELINDUNG",
                            "PENYUSUP",
                            "PENOPANG",
                            "PENIPU",
                            "PENYEMBUH",
                          ].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-[11px] font-semibold text-stone-500">
                          Kelangkaan
                        </label>

                        <select
                          value={card.rarity}
                          onChange={(event) =>
                            updateActiveCard("rarity", event.target.value)
                          }
                          className="w-full rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-2 text-[13px] font-medium focus:border-[#C2410C] focus:outline-none"
                        >
                          {["COMMON", "RARE", "SUPER RARE", "ULTRA RARE"].map(
                            (option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div>
                        <label className="mb-0.5 block text-[10px] font-bold text-stone-500">
                          ATK
                        </label>
                        <input
                          type="number"
                          value={card.atk}
                          onChange={(event) =>
                            updateActiveCard("atk", Number(event.target.value))
                          }
                          className="w-full rounded-lg border border-stone-200 bg-stone-50 px-2 py-1.5 text-[12px] font-bold"
                        />
                      </div>

                      <div>
                        <label className="mb-0.5 block text-[10px] font-bold text-stone-500">
                          HP
                        </label>
                        <input
                          type="number"
                          value={card.hp}
                          onChange={(event) =>
                            updateActiveCard("hp", Number(event.target.value))
                          }
                          className="w-full rounded-lg border border-stone-200 bg-stone-50 px-2 py-1.5 text-[12px] font-bold"
                        />
                      </div>

                      <div>
                        <label className="mb-0.5 block text-[10px] font-bold text-stone-500">
                          COST
                        </label>
                        <input
                          type="number"
                          value={card.cost}
                          onChange={(event) =>
                            updateActiveCard("cost", Number(event.target.value))
                          }
                          className="w-full rounded-lg border border-stone-200 bg-stone-50 px-2 py-1.5 text-[12px] font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SKILL */}
              <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion((current) =>
                      current === "skill" ? null : "skill",
                    )
                  }
                  aria-expanded={openAccordion === "skill"}
                  className="flex w-full items-center justify-between px-3.5 py-3 text-left transition-colors hover:bg-stone-50/70"
                >
                  <div>
                    <span className="block text-[13px] font-bold">
                      Skill & Efek
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {card.skillTitle}
                    </span>
                  </div>

                  <span
                    className={`text-[20px] text-stone-400 transition-transform duration-200 ${
                      openAccordion === "skill" ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </button>

                {openAccordion === "skill" && (
                  <div className="space-y-3 border-t border-stone-100 px-3.5 pb-3.5 pt-3">
                    <div>
                      <label className="mb-1 block text-[11px] font-semibold text-stone-500">
                        Judul Skill
                      </label>

                      <input
                        type="text"
                        value={card.skillTitle}
                        onChange={(event) =>
                          updateActiveCard("skillTitle", event.target.value)
                        }
                        className="w-full rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-2 text-[13px] font-bold focus:border-[#C2410C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-semibold text-stone-500">
                        Deskripsi Skill
                      </label>

                      <textarea
                        rows={2}
                        value={card.skillDescription}
                        onChange={(event) =>
                          updateActiveCard(
                            "skillDescription",
                            event.target.value,
                          )
                        }
                        className="w-full rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-2 text-[12px] leading-relaxed focus:border-[#C2410C] focus:outline-none"
                      />
                    </div>

                    <p className="text-[11px] italic text-stone-400">
                      Untuk mode main, gunakan efek sesuai panduan permainan.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-stone-200 bg-white p-4">
              <button
                type="button"
                onClick={saveCardDetails}
                className="w-full rounded-xl bg-blue-600 py-3.5 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-[#9A3412] active:scale-[0.99]"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHEET TEMPLATE PREMIUM */}
      {isPremiumStyleSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#1C1917]/50 backdrop-blur-sm">
          <div className="w-full rounded-t-[28px] bg-white p-5 pb-[max(env(safe-area-inset-bottom),16px)] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-stone-200" />

            <div className="mb-3 flex items-start justify-between">
              <div>
                <span className="mb-1.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#dbe1ff] px-2.5 py-0.5 text-[11px] font-bold text-[#003ea8]">
                  👑 TEMPLATE PREMIUM
                </span>

                <h3 className="text-[20px] font-semibold leading-7">
                  Buka {pendingPremiumStyle ?? "Gaya TCG Premium"}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Tutup penawaran premium"
                onClick={() => setIsPremiumStyleSheetOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300"
              >
                ✕
              </button>
            </div>

            <p className="mb-4 text-[15px] leading-6 text-stone-600">
              Buka akses permanen untuk seluruh varian TCG premium, termasuk{" "}
              {pendingPremiumStyle ?? "gaya terpilih"}.
            </p>

            <div className="mb-4 flex items-center justify-between rounded-lg bg-stone-100 p-3">
              <div>
                <span className="block text-[11px] font-bold text-stone-600">
                  Bayar Sekali, Miliki Selamanya
                </span>

                <span className="text-[24px] font-extrabold leading-8">
                  Rp49.000
                </span>
              </div>

              <span className="rounded bg-[#ffdad6] px-2 py-0.5 text-[11px] font-bold text-[#93000a]">
                Hemat 45%
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsPremiumStyleSheetOpen(false);
                  alert(
                    "Prototype: pembayaran Template Premium belum terhubung.",
                  );
                }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#004ac6] text-[15px] font-bold text-white shadow-sm transition-transform active:scale-[0.98]"
              >
                Lanjut ke Pembayaran
                <span aria-hidden="true">💳</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPremiumStyleSheetOpen(false)}
                className="h-10 w-full rounded-lg text-[13px] font-semibold text-stone-600"
              >
                Nanti Saja
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] font-bold text-stone-500">
              Template Premium terpisah dari AI Style.
            </p>
          </div>
        </div>
      )}

      {/* MODAL RENAME DECK */}
      {isRenameOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="mb-1 text-[20px] font-semibold">Ubah Nama Deck</h3>
            <p className="mb-4 text-[13px] leading-5 text-stone-500">
              Masukkan judul baru untuk deck kartu ini.
            </p>

            <input
              type="text"
              value={deckTitleInput}
              onChange={(event) => setDeckTitleInput(event.target.value)}
              className="mb-5 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-[15px] focus:border-[#C2410C] focus:bg-white focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIsRenameOpen(false)}
                className="rounded-xl bg-stone-200 py-2.5 text-[15px] font-semibold"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={saveDeckTitle}
                className="rounded-xl bg-blue-600 py-2.5 text-[15px] font-bold text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL UNDUH */}
      {isDownloadOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1C1917]/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex w-full max-w-md flex-col gap-4 rounded-t-2xl border border-stone-200 bg-[#FAF7F2] p-5 shadow-2xl sm:rounded-2xl">
            {downloadPhase === "confirm" ? (
              <>
                <div className="flex items-center justify-between border-b border-stone-200/80 pb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[24px] text-blue-600"
                      aria-hidden="true"
                    >
                      🖨
                    </span>
                    <h3 className="text-[16px] font-bold">
                      Siapkan Berkas Cetak
                    </h3>
                  </div>

                  <button
                    type="button"
                    aria-label="Tutup"
                    onClick={() => setIsDownloadOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-200 text-stone-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 rounded-xl border border-stone-200 bg-white p-3">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-stone-600">
                      Kelengkapan Deck:
                    </span>
                    <span className="flex items-center gap-1 font-bold text-emerald-700">
                      ✓ {deck.length} dari {deck.length} Kartu Lengkap
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-stone-600">Format:</span>
                    <span className="font-bold">
                      A4 Lembar Standar (300 DPI)
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-100 pt-1 text-[13px]">
                    <span className="font-medium text-stone-600">
                      Biaya Cetak & Unduh:
                    </span>
                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                      ✓ Gratis
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setDownloadPhase("ready")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-[#9A3412] active:scale-[0.99]"
                  >
                    Konfirmasi Cetak & Unduh
                    <span aria-hidden="true">⬇</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsDownloadOpen(false)}
                    className="w-full rounded-xl py-2.5 text-[13px] font-semibold text-stone-600"
                  >
                    Batal
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-stone-200/80 pb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[24px] text-emerald-600"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <h3 className="text-[16px] font-bold">
                      Deck Siap Diunduh!
                    </h3>
                  </div>

                  <button
                    type="button"
                    aria-label="Tutup"
                    onClick={() => setIsDownloadOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-200 text-stone-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() =>
                      alert("Prototype: pembuatan PDF belum tersedia.")
                    }
                    className="group flex w-full items-center justify-between rounded-xl border border-stone-300 bg-white p-3.5 text-left shadow-sm transition-all hover:border-[#C2410C]"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="text-[26px] text-red-600"
                        aria-hidden="true"
                      >
                        📄
                      </span>

                      <span>
                        <span className="block text-[13px] font-bold group-hover:text-[#C2410C]">
                          PDF Siap Cetak (A4 300 DPI)
                        </span>
                        <span className="text-[11px] text-stone-500">
                          6 kartu per lembar + garis potong halus
                        </span>
                      </span>
                    </span>

                    <span
                      className="text-[18px] text-stone-400"
                      aria-hidden="true"
                    >
                      ⬇
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Prototype: pembuatan ZIP HD belum tersedia.")
                    }
                    className="group flex w-full items-center justify-between rounded-xl border border-stone-300 bg-white p-3.5 text-left shadow-sm transition-all hover:border-[#C2410C]"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="text-[26px] text-blue-600"
                        aria-hidden="true"
                      >
                        🗂
                      </span>

                      <span>
                        <span className="block text-[13px] font-bold group-hover:text-[#C2410C]">
                          Gambar Kartu (ZIP HD)
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Berkas PNG individual kualitas tinggi
                        </span>
                      </span>
                    </span>

                    <span
                      className="text-[18px] text-stone-400"
                      aria-hidden="true"
                    >
                      ⬇
                    </span>
                  </button>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      alert("Prototype: fitur bagikan belum tersedia.")
                    }
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-stone-200/80 py-3 text-[13px] font-bold hover:bg-stone-300"
                  >
                    <span aria-hidden="true">↗</span>
                    Bagikan
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsDownloadOpen(false)}
                    className="flex-1 rounded-xl bg-[#1C1917] py-3 text-[13px] font-bold text-white"
                  >
                    Selesai
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
