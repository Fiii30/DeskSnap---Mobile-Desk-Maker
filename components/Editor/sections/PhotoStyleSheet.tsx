"use client";

// Tipe Card.
import type { Card } from "../data/editor-types";
import { EDITOR_IMAGES } from "../data/editor-types";

// Gaya AI.
const AI_STYLES = ["Original", "Vektor", "Pixel", "Kartun", "Cat Air", "Komik"];

// Props bottom sheet Foto & Gaya.
type PhotoStyleSheetProps = {
  card: Card;
  photoTab: "foto" | "gaya";
  selectedStyle: string;
  applyToAll: boolean;
  isAiProcessing: boolean;
  isAiPreviewVisible: boolean;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
  galleryInputRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onChangeTab: (tab: "foto" | "gaya") => void;
  onSelectGalleryPhoto: (image: string) => void;
  onUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectStyle: (style: string) => void;
  onToggleApplyToAll: () => void;
  onStartAi: () => void;
  onApplyAi: () => void;
  onCancelAi: () => void;
};

// Bottom sheet Foto & Gaya.
export default function PhotoStyleSheet(props: PhotoStyleSheetProps) {
  
  const { cameraInputRef, galleryInputRef } = props;
  return (
    // Overlay bottom sheet
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-ink/40 backdrop-blur-sm">

      <div className="flex max-h-screen flex-col overflow-hidden rounded-t-3xl border-t border-surface-muted bg-surface shadow-card-strong">
        
        <div className="mx-auto my-2 h-1 w-10 shrink-0 rounded-full bg-surface-muted" />

        {/* Header sheet */}
        <div className="flex shrink-0 items-center justify-between border-b border-surface-muted px-5 pb-3">
          <div className="flex items-center gap-2.5">
            {/* Gambar kartu aktif */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.card.image}
              alt=""
              className="h-9 w-9 rounded-lg border border-surface-muted object-cover"
            />

            <div>
              {/* Judul sheet */}
              <h3 className="text-sm font-bold leading-tight text-ink">
                Foto & Gaya
              </h3>

              {/* Nama dan nomor kartu */}
              <p className="text-xs text-ink-muted">
                {props.card.name.toUpperCase()} ({props.card.index})
              </p>
            </div>
          </div>

          {/* Tombol tutup */}
          <button
            type="button"
            aria-label="Tutup Foto & Gaya"
            onClick={props.onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-ink-soft"
          >
            ✕
          </button>
        </div>

        {/* Tab Foto dan Gaya AI */}
        <div className="shrink-0 px-5 pt-3">
          <div className="grid grid-cols-2 rounded-xl bg-surface-muted p-1">
            {/* Tab Foto */}
            <button
              type="button"
              onClick={() => props.onChangeTab("foto")}
              className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                props.photoTab === "foto"
                  ? "bg-surface-card text-ink shadow-button"
                  : "text-ink-soft"
              }`}
            >
              Foto
            </button>

            {/* Tab Gaya AI */}
            <button
              type="button"
              onClick={() => props.onChangeTab("gaya")}
              className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                props.photoTab === "gaya"
                  ? "bg-surface-card text-ink shadow-button"
                  : "text-ink-soft"
              }`}
            >
              ✦ Gaya AI
            </button>
          </div>
        </div>

        {/* Isi tab */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {props.photoTab === "foto" ? (
            <>
              {/* Pilihan sumber gambar */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Tombol kamera */}
                <button
                  type="button"
                  onClick={() => props.cameraInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-surface-muted bg-surface-card px-4 py-3.5 transition-all hover:bg-surface-soft active:scale-[0.99]"
                >
                  <span className="text-xl text-primary">📷</span>

                  <span className="text-xs font-bold text-ink">Kamera</span>

                  <span className="text-xs text-ink-soft">Ambil foto baru</span>
                </button>

                {/* Tombol galeri atau file manager */}
                <button
                  type="button"
                  onClick={() => props.galleryInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-surface-muted bg-surface-card px-4 py-3.5 transition-all hover:bg-surface-soft active:scale-[0.99]"
                >
                  <span className="text-xl text-primary">🖼</span>

                  <span className="text-xs font-bold text-ink">
                    Galeri / File
                  </span>

                  <span className="text-xs text-ink-soft">
                    Pilih foto tersimpan
                  </span>
                </button>
              </div>

              {/* Input kamera */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={props.onUploadFile}
                className="hidden"
              />

              {/* Input galeri atau file manager */}
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={props.onUploadFile}
                className="hidden"
              />

              {/* Gaya template TCG */}
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Gaya Template TCG
                </span>

                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    {
                      key: "default",
                      title: "TCG Default",
                      premium: false,
                      image: EDITOR_IMAGES.card1,
                    },
                    {
                      key: "neon",
                      title: "TCG Neon",
                      premium: true,
                      image: EDITOR_IMAGES.card1,
                    },
                    {
                      key: "retro",
                      title: "TCG Retro",
                      premium: true,
                      image: EDITOR_IMAGES.card1,
                    },
                    {
                      key: "holo",
                      title: "TCG Holo",
                      premium: true,
                      image: EDITOR_IMAGES.card1,
                    },
                    {
                      key: "dark",
                      title: "TCG Dark",
                      premium: true,
                      image: EDITOR_IMAGES.card1,
                    },
                    {
                      key: "pastel",
                      title: "TCG Pastel",
                      premium: true,
                      image: EDITOR_IMAGES.card1,
                    },
                  ].map((style) => (
                    <button
                      key={style.key}
                      type="button"
                      onClick={() => {
                        // Varian premium belum dapat dipakai pada prototype.
                        if (style.premium) {
                          alert(
                            "Prototype: varian TCG premium memerlukan Template Premium.",
                          );
                          return;
                        }

                        // Memakai gambar varian gratis.
                        props.onSelectGalleryPhoto(style.image);
                      }}
                      className={`relative aspect-square overflow-hidden rounded-xl bg-surface-card shadow-button transition-all ${
                        props.card.image === style.image
                          ? "ring-2 ring-primary"
                          : "hover:opacity-90"
                      }`}
                    >
                      {/* Gambar varian template */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={style.image}
                        alt={style.title}
                        className="h-full w-full object-cover"
                      />

                      {/* Nama varian */}
                      <span className="absolute inset-x-0 bottom-0 bg-ink/60 px-1 py-1 text-xs font-bold text-white">
                        {style.title}
                      </span>

                      {/* Badge harga varian */}
                      <span className="absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-white">
                        {style.premium ? "Premium" : "Gratis"}
                      </span>

                      {/* Overlay varian premium */}
                      {style.premium && (
                        <span className="absolute inset-0 flex items-center justify-center bg-ink/40 backdrop-blur-sm">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-card text-xs text-primary">
                            🔒
                          </span>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aksi foto */}
              <div className="flex items-center justify-between pt-2">
                {/* Tombol potong foto */}
                <button
                  type="button"
                  onClick={() =>
                    alert("Prototype: alat potong foto belum tersedia.")
                  }
                  className="flex items-center gap-1.5 rounded-lg border border-surface-muted bg-surface-card px-3 py-2 text-xs font-bold active:scale-95"
                >
                  ⛶ Potong Foto
                </button>

                {/* Tombol gambar bawaan */}
                <button
                  type="button"
                  onClick={() => props.onSelectGalleryPhoto(EDITOR_IMAGES.card1)}
                  className="text-xs font-semibold text-ink-soft underline"
                >
                  Gunakan Gambar Bawaan
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Kuota AI */}
              <div className="space-y-2 rounded-xl border border-surface-muted bg-surface-card p-3.5 shadow-button">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-primary">✦</span>

                    <span className="text-xs font-bold text-ink">
                      Batas Kuota AI Harian
                    </span>
                  </div>

                  <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold text-primary-deep">
                    7/10 Tersedia
                  </span>
                </div>

                {/* Progress kuota */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-soft">
                  <div className="h-full w-7/12 rounded-full bg-primary" />
                </div>

                <p className="text-xs font-medium text-ink-soft">
                  7 dari 10 gambar AI tersedia hari ini.
                </p>
              </div>

              {/* Pilihan gaya AI */}
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Pilih Filter / Gaya
                </span>

                <div className="grid grid-cols-3 gap-2">
                  {AI_STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => props.onSelectStyle(style)}
                      className={`flex flex-col items-center gap-1 rounded-xl border-2 bg-surface-card p-2 text-center transition-all ${
                        props.selectedStyle === style
                          ? "border-primary"
                          : "border-surface-muted"
                      }`}
                    >
                      <span className="text-lg text-primary">✦</span>

                      <span className="text-xs font-bold text-ink">{style}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cakupan gaya */}
              <div className="flex items-center justify-between rounded-xl border border-surface-muted bg-surface-card p-2.5">
                <div>
                  <span className="block text-xs font-bold text-ink">
                    Cakupan Gaya
                  </span>

                  <span className="text-xs text-ink-soft">
                    {props.applyToAll
                      ? "Terapkan ke semua kartu"
                      : `Terapkan hanya untuk kartu ini (${props.card.index})`}
                  </span>
                </div>

                {/* Toggle terapkan ke semua kartu */}
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={props.applyToAll}
                    onChange={props.onToggleApplyToAll}
                    className="peer sr-only"
                  />

                  <span className="h-6 w-10 rounded-full bg-surface-muted after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-surface-card after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-4" />
                </label>
              </div>

              {/* Tombol buat gaya AI */}
              <button
                type="button"
                onClick={props.onStartAi}
                disabled={props.isAiProcessing}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm font-bold text-white transition-transform active:scale-[0.99] disabled:opacity-70"
              >
                ✦{" "}
                {props.isAiProcessing
                  ? "Memproses Seni AI..."
                  : "Buat Gaya AI"}
              </button>

              {/* Pratinjau AI */}
              {props.isAiPreviewVisible && (
                <div className="space-y-3 border-t border-surface-muted pt-3">
                  <span className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Pratinjau Hasil Gaya AI
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Gambar sebelum */}
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-surface-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={EDITOR_IMAGES.card1}
                        alt=""
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute bottom-1 left-1 rounded bg-ink/60 px-1.5 py-0.5 text-xs font-bold text-white">
                        Sebelum
                      </span>
                    </div>

                    {/* Gambar hasil AI */}
                    <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-primary">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={props.card.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute bottom-1 left-1 rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-white">
                        Hasil AI
                      </span>
                    </div>
                  </div>

                  {/* Aksi pratinjau */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={props.onApplyAi}
                      className="flex-1 rounded-lg bg-primary py-2.5 text-xs font-bold text-white"
                    >
                      Gunakan Hasil
                    </button>

                    <button
                      type="button"
                      onClick={props.onCancelAi}
                      className="rounded-lg bg-surface-muted px-4 py-2.5 text-xs font-semibold text-ink"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Tombol selesai */}
        <div className="shrink-0 border-t border-surface-muted bg-surface-card p-4">
          <button
            type="button"
            onClick={props.onClose}
            className="w-full rounded-xl bg-ink py-3 text-sm font-bold text-white"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}