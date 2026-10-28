// Tipe satu kartu TCG.
export type Card = {
  id: string;
  name: string;
  archetype: string;
  index: string;
  rarity: RarityType;
  atk: number;
  hp: number;
  cost: number;
  skillTitle: string;
  skillDescription: string;
  image: string;
};

type RarityType = "COMMON" | "RARE" | "SUPER RARE" | "ULTRA RARE";

// Gambar contoh dari export Stitch.
export const EDITOR_IMAGES = {
  card1: "./images/gecko.jpg",
};

// Batas maksimal kartu.
export const MAX_CARDS = 9;

// Enam kartu awal.
export const INITIAL_DECK: Card[] = [
  {
    id: "card-1",
    name: "Crested gecko",
    archetype: "Trickster",
    index: "#01",
    rarity: "ULTRA RARE",
    atk: 870,
    hp: 1520,
    cost: 5,
    skillTitle: "Caplok",
    skillDescription: "HAAAP langsung kena cokot",
    image: EDITOR_IMAGES.card1,
  },
];
