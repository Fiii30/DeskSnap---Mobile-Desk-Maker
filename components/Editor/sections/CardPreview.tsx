// Tipe Card diimpor dari file data Editor.
import type { Card } from "../data/editor-types";
import { checkRarity } from "@/lib/checkRarity";

// Props preview dengan hasil edit dan pengubah teks.
type CardPreviewProps = {
  card: Card;
  templateKey: "tcg" | "fotocard" | "jqka" | "trivia";
  editState: {
    filter: string;
    brightness: number;
    contrast: number;
    saturation: number;
  };
  onEditText: (
    field: "name" | "skillTitle" | "skillDescription",
    value: string,
  ) => void;
};

// Preview kartu yang sedang aktif.
export default function CardPreview({
  card,
  templateKey,
  editState,
  onEditText,
}: CardPreviewProps) {
  // Menentukan gaya badge berdasarkan kelangkaan kartu.
  const rarityStyle = checkRarity(card.rarity);

  // Preview khusus Fotocard.
  if (templateKey === "fotocard") {
    return (
      <div className="flex w-full justify-center py-2">
        <article className="relative h-96 w-72 overflow-hidden rounded-2xl border-8 border-white/40 bg-surface shadow-card-strong">
          {/* Foto utama — full 1 card */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image}
            alt={card.name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: `${editState.filter} brightness(${editState.brightness}%) contrast(${editState.contrast}%) saturate(${editState.saturation}%)`,
            }}
          />

          {/* Layer teks di atas foto */}
          <div className="absolute inset-0 flex flex-col justify-end bg-linier-to-t from-black/70 via-black/20 to-transparent p-4">
            {/* Nama kartu */}
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(event) =>
                onEditText("name", event.currentTarget.innerText)
              }
              className="w-full truncate text-lg font-bold italic leading-tight text-white outline-none"
            >
              {card.name}
            </span>

            {/* Meta kartu */}
            <span className="mt-1 text-card-tiny font-medium tracking-wide text-white/80">
              Created by DeckSnap
            </span>
          </div>
        </article>
      </div>
    );
  }

  // Preview TCG.
  if (templateKey === "tcg") {
    return (
      // Wrapper preview TCG.
      <div className="flex w-full justify-center py-2">
        <article className="relative flex h-96 w-72  flex-col justify-between rounded-2xl border-2 border-ink bg-surface p-2.5 shadow-card-strong">
          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl bg-surface-card p-0.5 shadow-inner">
            {/* Arketipe dan nomor */}
            <div className="absolute z-10 pb-1.5 right-1 top-1">
              <span
                className={`flex items-center rounded-md border border-surface-muted ${rarityStyle.bg} px-2 py-0.5`}
              >
                <span
                  className={`text-card-small py-0.5 font-extrabold ${rarityStyle.text}`}
                >
                  {card.rarity}
                </span>
              </span>
            </div>

            {/* Foto */}
            <div className="relative h-80 w-full overflow-hidden rounded-lg border border-ink/25 bg-surface-soft shadow-inner">
              {/* Gambar dengan filter dan adjustment */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.name}
                className="h-full w-full object-cover"
                style={{
                  filter: `${editState.filter} brightness(${editState.brightness}%) contrast(${editState.contrast}%) saturate(${editState.saturation}%)`,
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-linier-to-tr from-ink/10 via-transparent to-primary-soft/30" />
            </div>

            {/* Nama */}
            <div className="z-10 pb-0.5 pt-1.5">
              <div className="flex items-center justify-between rounded-md border border-surface-muted bg-surface-card px-2 py-1 shadow-button">
                {/* Nama kartu bisa diklik untuk diedit */}
                <h2
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(event) =>
                    onEditText("name", event.currentTarget.innerText)
                  }
                  className="text-xs font-extrabold uppercase tracking-tight text-ink outline-none"
                >
                  {card.name}
                </h2>
              </div>
            </div>

            {/* Statistik */}
            <div className="z-10 flex items-center justify-between rounded-md border border-surface-muted bg-surface-soft px-2 py-1 text-card-title font-bold">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-ink-soft">
                  <span className="text-card-title font-semibold text-ink-muted">
                    ATK
                  </span>
                  <span className="text-primary">{card.atk}</span>
                </span>

                <span className="h-3 w-px bg-surface-muted" />

                <span className="flex items-center gap-1 text-ink-soft">
                  <span className="text-card-title font-semibold text-ink-muted">
                    HP
                  </span>
                  <span className="text-primary-deep">{card.hp}</span>
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-card-title font-semibold text-ink-muted">
                  COST
                </span>
                <span className="rounded bg-ink px-1.5 py-0.5 text-white">
                  {card.cost}
                </span>
              </div>
            </div>

            {/* Skill */}
            <div className="z-10 flex flex-col gap-0.5 rounded-md border border-surface-muted bg-surface-card p-2 shadow-button">
              <div className="flex items-center justify-between text-xs">
                {/* Judul skill bisa diklik untuk diedit */}
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(event) =>
                    onEditText("skillTitle", event.currentTarget.innerText)
                  }
                  className="flex items-center gap-1 font-bold uppercase text-ink text-card-small outline-none"
                >
                  <span className="text-primary">ϟ</span>
                  {card.skillTitle}
                </span>

              </div>

              {/* Deskripsi skill bisa diklik untuk diedit */}
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(event) =>
                  onEditText("skillDescription", event.currentTarget.innerText)
                }
                className="h-8 ont-bold text-card-tiny leading-4 text-ink-soft tracking-tighter outline-none"
              >
                <span className="line-clamp-2">
                  {card.skillDescription}
                </span>
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Template lain belum memiliki preview khusus.
  return null;
}
