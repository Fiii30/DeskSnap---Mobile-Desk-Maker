// Tipe satu kartu dalam draft.
export type DraftCard = {
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
};

// Tipe hasil edit visual kartu.
export type DraftEditState = {
  filter: string;
  brightness: number;
  contrast: number;
  saturation: number;
};

export type DeckDraft = {
  id: string;
  title: string;
  templateKey: string;
  cards: DraftCard[];
  editStates: Record<string, DraftEditState>;
  updatedAt: string;
};

// Kunci penyimpanan semua draft.
const DRAFTS_KEY = "decksnap-drafts";

// Mengambil semua draft dari localStorage.
export function getDrafts(): DeckDraft[] {
  // localStorage hanya tersedia di browser.
  if (typeof window === "undefined") {
    return [];
  }

  // Mengambil data draft.
  const saved = localStorage.getItem(DRAFTS_KEY);

  // Mengembalikan array kosong bila belum ada draft.
  if (!saved) {
    return [];
  }

  // Mengubah JSON menjadi array draft.
  return JSON.parse(saved) as DeckDraft[];
}

// Menyimpan atau memperbarui satu draft.
export function saveDraft(draft: DeckDraft) {
  // Mengambil draft yang sudah ada.
  const drafts = getDrafts();

  // Mencari draft dengan ID yang sama.
  const existingIndex = drafts.findIndex((item) => item.id === draft.id);

  // Memperbarui draft lama bila ada.
  if (existingIndex >= 0) {
    drafts[existingIndex] = draft;
  } else {
    // Menambah draft baru bila belum ada.
    drafts.push(draft);
  }

  // Menyimpan seluruh daftar draft.
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

// Mengambil satu draft berdasarkan ID.
export function getDraftById(draftId: string): DeckDraft | null {
  // Mencari draft sesuai ID.
  return getDrafts().find((draft) => draft.id === draftId) ?? null;
}

// Menghapus draft berdasarkan ID.
export function deleteDraft(draftId: string) {
  // Menyaring draft yang tidak dihapus.
  const drafts = getDrafts().filter((draft) => draft.id !== draftId);

  // Menyimpan kembali daftar draft.
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function draftToDeck(draft: DeckDraft) {
  // Mengambil kartu pertama sebagai sampul.
  const firstCard = draft.cards[0];

  return {
    // ID deck sama dengan ID draft.
    id: draft.id,

    // Judul deck.
    title: draft.title,

    // Gambar sampul dari kartu pertama.
    image: firstCard?.image ?? "",

    // Jumlah kartu dalam draft.
    cardCount: draft.cards.length,

    // Jenis template draft.
    templateKey: draft.templateKey,
  };
}
