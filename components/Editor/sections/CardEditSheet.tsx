"use client";

// Tipe Card dan EditState dari EditorPage.
import type { Card } from "../data/editor-types";

// Tipe state edit.
type EditState = {
  filter: string;
  brightness: number;
  contrast: number;
  saturation: number;
};

// Props panel Edit tanpa sticker dan coretan.
type CardEditSheetProps = {
  card: Card;
  editState: EditState;
  onClose: () => void;
  onUpdateStyle: (patch: Partial<EditState>) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

// Filter standar yang tersedia.
const FILTERS = [
  { id: "none", label: "Normal", value: "none" },
  { id: "grayscale", label: "Hitam Putih", value: "grayscale(1)" },
  { id: "sepia", label: "Sepia", value: "sepia(0.7)" },
  { id: "warm", label: "Hangat", value: "saturate(1.3) hue-rotate(-10deg)" },
  { id: "cool", label: "Dingin", value: "saturate(1.1) hue-rotate(15deg)" },
];

// Panel Edit umum untuk semua template.
export default function CardEditSheet({
  card,
  editState,
  onClose,
  onUpdateStyle,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: CardEditSheetProps) {
  return (
    // Overlay panel Edit.
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-ink/40 backdrop-blur-sm">
      <div className="flex max-h-screen flex-col overflow-hidden rounded-t-3xl border-t border-surface-muted bg-surface shadow-card-strong">
        <div className="mx-auto my-2 h-1 w-10 shrink-0 rounded-full bg-surface-muted" />

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-surface-muted px-5 pb-3">
          <div>
            <h3 className="text-base font-bold text-ink">Edit Kartu</h3>
            <p className="text-xs text-ink-muted">
              Berlaku untuk semua template
            </p>
          </div>

          {/* Tombol undo dan redo */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Undo"
              onClick={onUndo}
              disabled={!canUndo}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-ink disabled:opacity-40"
            >
              ↶
            </button>

            <button
              type="button"
              aria-label="Redo"
              onClick={onRedo}
              disabled={!canRedo}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-ink disabled:opacity-40"
            >
              ↷
            </button>

            <button
              type="button"
              aria-label="Tutup Edit"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-ink-soft"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Isi panel */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {/* Foto yang sedang diedit */}
          <section className="space-y-3 rounded-xl border border-surface-muted bg-surface-card p-3.5 shadow-button">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-soft">
              Foto yang Diedit
            </h4>

            {/* Pratinjau foto dengan filter dan adjustment aktif */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.name}
                className="h-full w-full object-cover"
                style={{
                  filter: `${editState.filter} brightness(${editState.brightness}%) contrast(${editState.contrast}%) saturate(${editState.saturation}%)`,
                }}
              />
            </div>

            <p className="text-xs leading-5 text-ink-soft">
              Klik teks pada preview kartu untuk langsung mengubah tulisannya.
            </p>
          </section>

          {/* Filter standar */}
          <section className="space-y-2.5 rounded-xl border border-surface-muted bg-surface-card p-3.5 shadow-button">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-soft">
              Filter Standar
            </h4>

            <div className="grid grid-cols-3 gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => onUpdateStyle({ filter: filter.value })}
                  className={`rounded-lg border-2 py-2 text-xs font-bold transition-all ${
                    editState.filter === filter.value
                      ? "border-primary text-primary"
                      : "border-surface-muted text-ink"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </section>

          {/* Adjustment */}
          <section className="space-y-3 rounded-xl border border-surface-muted bg-surface-card p-3.5 shadow-button">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-soft">
              Adjustment
            </h4>

            {/* Brightness */}
            <div>
              <label className="mb-1 flex justify-between text-xs font-semibold text-ink-soft">
                Brightness
                <span>{editState.brightness}%</span>
              </label>

              <input
                type="range"
                min={50}
                max={150}
                value={editState.brightness}
                onChange={(event) =>
                  onUpdateStyle({
                    brightness: Number(event.target.value),
                  })
                }
                className="w-full"
              />
            </div>

            {/* Contrast */}
            <div>
              <label className="mb-1 flex justify-between text-xs font-semibold text-ink-soft">
                Contrast
                <span>{editState.contrast}%</span>
              </label>

              <input
                type="range"
                min={50}
                max={150}
                value={editState.contrast}
                onChange={(event) =>
                  onUpdateStyle({
                    contrast: Number(event.target.value),
                  })
                }
                className="w-full"
              />
            </div>

            {/* Saturation */}
            <div>
              <label className="mb-1 flex justify-between text-xs font-semibold text-ink-soft">
                Saturation
                <span>{editState.saturation}%</span>
              </label>

              <input
                type="range"
                min={0}
                max={200}
                value={editState.saturation}
                onChange={(event) =>
                  onUpdateStyle({
                    saturation: Number(event.target.value),
                  })
                }
                className="w-full"
              />
            </div>
          </section>
        </div>

        {/* Tombol selesai */}
        <div className="shrink-0 border-t border-surface-muted bg-surface-card p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-button"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
