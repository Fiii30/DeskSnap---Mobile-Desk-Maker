// Tipe status deck.
export type DeckStatus = "Draft" | "Siap Cetak";

// Tipe data satu deck.
export type Deck = {
  id: string;
  title: string;
  cardCount: number;
  status: DeckStatus;
  timeLabel: string;
  image: string;
};

// Data awal untuk prototype Dashboard.
export const INITIAL_DECKS: Deck[] = [
  // {
  //   id: "deck-1",
  //   title: "Kucing Oren",
  //   cardCount: 14,
  //   status: "Draft",
  //   timeLabel: "2 jam lalu",
  //   image:
  //     "https://lh3.googleusercontent.com/aida-public/AB6AXuCSQirKXgNFW0VtNUIlXToGfWfcAw4Ajn0cB_pASmzQLttpUEoAIRAY5V5aqFiCMkNgCpp26cL6qHwLcHMh_-QbklnuwVARTMe7ThaiPbsfwywe_eK3SlZSVRTH8FE7tSIOCNPOtM9UwRHatc7be0uWqmiptVHRLRXDl6QwXJ4wrT5bINvKxs-WlhYeQoQOjT2ws3A5BkgnU9XJia6ReTYOYqLiz7veKtZ_v-y0OqbGNFi37yb48YSW",
  // },
  // {
  //   id: "deck-2",
  //   title: "Kenangan Kampus",
  //   cardCount: 24,
  //   status: "Siap Cetak",
  //   timeLabel: "Siap Ekspor",
  //   image:
  //     "https://lh3.googleusercontent.com/aida-public/AB6AXuAdEaM40jEQGTHhEzxfCzS45hHWoAXblVasM_y92iX884WsIacwbcE9YJESi10jsbTg9QnSfFw20KhXV0MPd7iiSCQ5psN-OAt2VaW6PBsdBVB4fN8Vkxq9Jm4P6nQRQ330cCdN17LovtGGfK_r3qq1os516tveafyBfYycTPXZSmfNPvqWBl256DpnLGzkx_GzdG7-i5eGGKOTuadDtrakO3wrKVYE4KgZzMZGcItLZwLejpzX_g0S",
  // },
];
