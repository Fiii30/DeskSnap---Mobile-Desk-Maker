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
  // thumbTitle: string;
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
  status: "draft" | "selesai";
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
  const drafts = getDrafts();
  const existingIndex = drafts.findIndex((item) => item.id === draft.id);

  // Pertahankan status lama bila draft baru tidak menyertakan status.
  const status = draft.status ?? drafts[existingIndex]?.status ?? "draft";

  const draftWithStatus = { ...draft, status };

  if (existingIndex >= 0) {
    drafts[existingIndex] = draftWithStatus;
  } else {
    drafts.push(draftWithStatus);
  }

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
  const firstCard = draft.cards[0];

  return {
    id: draft.id,
    title: draft.title,
    image: firstCard?.image ?? "",
    cardCount: draft.cards.length,
    templateKey: draft.templateKey,
    status: draft.status === "selesai" ? "Completed" : "Draft",
  };
}
