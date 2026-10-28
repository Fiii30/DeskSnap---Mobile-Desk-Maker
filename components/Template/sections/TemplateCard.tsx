// Tipe Template dari file induk.
import type { Template } from "../data/template-types";

// Konfigurasi varian gaya dari folder data.
import { TEMPLATE_STYLES } from "../data/template-styles";

// Props satu kartu template.
type TemplateCardProps = {
  template: Template;
  isActive: boolean;
  onSelect: (template: Template) => void;
};

// Kartu satu template.
export default function TemplateCard({
  template,
  isActive,
  onSelect,
}: TemplateCardProps) {
  // Pengaman bila data template belum tersedia.
  if (!template) {
    return null;
  }

  // Mengambil daftar varian gaya untuk template ini.
  const styles = TEMPLATE_STYLES[template.key] ?? [];

  // Mengambil varian pertama sebagai pratinjau utama.
  const previewStyle = styles[0];

  // Pengaman bila varian pratinjau belum tersedia.
  if (!previewStyle) {
    return null;
  }

  return (
    // Tombol kartu template.
    <button
      type="button"
      onClick={() => onSelect(template)}
      className={`relative flex flex-col rounded-xl bg-surface-card p-2.5 text-left shadow-card transition-all duration-200 ${
        isActive ? "ring-2 ring-primary" : ""
      }`}
    >
      {/* Badge terpilih */}
      <span
        className={`absolute right-4 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-button ${
          isActive
            ? "bg-primary text-white"
            : "bg-surface-muted text-ink-soft opacity-0"
        }`}
      >
        ✓
      </span>

      {/* Miniature template */}
      <div className="relative flex h-72 w-full flex-col justify-between overflow-hidden rounded-lg bg-surface-muted p-1.5">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded bg-surface-card p-1.5">
          {/* Gambar pratinjau dari konfigurasi */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewStyle.image}
            alt={previewStyle.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Overlay premium */}
        {template.isPremium && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-ink/35 p-2 text-center backdrop-blur-sm">
            <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-surface-card text-sm text-primary shadow-button">
              🔒
            </span>

            <span className="text-[10px] font-bold text-surface-card drop-shadow">
              Akses Terkunci
            </span>
          </div>
        )}
      </div>

      {/* Info template */}
      <div className="mt-3 flex min-w-0 flex-col">
        <div className="mb-0.5 flex items-center gap-1.5">
          {/* Judul template */}
          <span className="truncate text-sm font-bold text-ink">
            {template.title}
          </span>

          {/* Badge premium atau gratis */}
          {template.isPremium ? (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-primary-soft px-1.5 py-0.5 text-[10px] font-bold text-primary-deep">
              🔒 Premium
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-surface-muted px-1.5 py-0.5 text-[10px] font-bold text-ink-soft">
              Gratis
            </span>
          )}
        </div>

        {/* Deskripsi template */}
        <p className="line-clamp-1 text-xs leading-snug text-ink-soft">
          {template.description}
        </p>
      </div>
    </button>
  );
}