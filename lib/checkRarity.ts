export type RarityStyle = {
  bg: string;
  text: string;
  border: string;
};

export const checkRarity = (rarity: string): RarityStyle => {
  const normalizedRarity = rarity?.toUpperCase().trim();

  switch (normalizedRarity) {
    case "COMMON":
      return {
        bg: "bg-rarity-common",
        text: "text-white",
        border: "border-rarity-common",
      };

    case "RARE":
      return {
        bg: "bg-rarity-rare",
        text: "text-white",
        border: "border-rarity-rare",
      };

    case "SUPER RARE":
      return {
        bg: "bg-rarity-super-rare",
        text: "text-white",
        border: "border-rarity-super-rare",
      };

    case "ULTRA RARE":
      return {
        bg: "bg-rarity-ultra-rare",
        text: "text-ink",
        border: "border-rarity-ultra-rare",
      };

    default:
      return {
        bg: "bg-rarity-common",
        text: "text-white",
        border: "border-rarity-common",
      };
  }
};