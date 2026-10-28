"use client";

// Tipe Card dan batas maksimal kartu.
import type { Card } from "../data/editor-types";
import { MAX_CARDS } from "../data/editor-types";

// Props thumbnail.
type CardThumbnailsProps = {
  deck: Card[];
  activeIndex: number;
  deckTitle: string;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
  onSelectCard: (index: number) => void;
  onAddCard: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// Strip thumbnail: kartu aktif dan tombol tambah kartu.
export default function CardThumbnails(props: CardThumbnailsProps) {
  // Memisahkan ref kamera agar aman dipakai di event handler.
  const { cameraInputRef } = props;

  return (
    // Wrapper strip thumbnail.
    <div className="mt-2 flex w-full max-w-sm flex-col gap-1.5">
      {/* Informasi deck */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          {/* Judul deck */}
          <span className="text-xs font-bold text-ink">{props.deckTitle}</span>

          {/* Pemisah */}
          <span className="text-xs text-ink-muted">•</span>

          {/* Jumlah kartu */}
          <span className="text-xs font-medium text-ink-soft">
            {props.deck.length} dari {MAX_CARDS} Kartu
          </span>
        </div>

        {/* Status deck */}
        <span className="flex items-center gap-1 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Siap Cetak
        </span>
      </div>

      {/* Daftar thumbnail */}
      <div className="flex items-center gap-2 overflow-x-auto px-1 py-1">
        {/* Thumbnail setiap kartu */}
        {props.deck.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => props.onSelectCard(index)}
            className={`flex h-20 w-16 shrink-0 flex-col justify-between rounded-lg bg-surface-card p-1 text-left shadow-card ${
              props.activeIndex === index ? "ring-2 ring-primary" : ""
            }`}
          >
            {/* Gambar kartu */}
            <span className="h-15 w-full overflow-hidden rounded bg-surface-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.name}
                className="h-full w-full object-cover"
              />
            </span>

            {/* Nama dan nomor kartu */}
            <span className="flex flex-col leading-tight">
              <span className="truncate text-card-tiny font-bold text-ink">
                {card.name}
              </span>
            </span>
          </button>
        ))}

        {/* Tombol tambah kartu */}
        <button
          type="button"
          aria-label="Tambah gambar kartu"
          onClick={() => props.cameraInputRef.current?.click()}
          disabled={props.deck.length >= MAX_CARDS}
          className={`flex h-20 w-16 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed transition-all active:scale-95 ${
            props.deck.length >= MAX_CARDS
              ? "cursor-not-allowed border-surface-muted bg-surface-soft text-ink-muted"
              : "border-surface-muted bg-surface-card text-ink-soft hover:border-primary hover:text-primary"
          }`}
        >
          <span className="text-xl">+</span>

          <span className="text-xs font-bold leading-tight">
            {props.deck.length >= MAX_CARDS ? "Penuh" : "Tambah"}
          </span>
        </button>

        {/* Input galeri atau file manager */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          onChange={props.onAddCard}
          className="hidden"
        />
      </div>
    </div>
  );
}
