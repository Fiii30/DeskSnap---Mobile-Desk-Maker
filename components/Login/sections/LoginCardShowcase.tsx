import { LOGIN_IMAGES } from "../../../lib/loginImages";

// Komponen dua kartu contoh pada halaman Login.
export default function LoginCardShowcase() {
  return (
    <div className="relative my-2 flex h-card-showcase w-full max-w-card-showcase items-center justify-center">
      {/* Cahaya lembut di belakang kartu */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary-soft blur-2xl" />

      {/* Kartu belakang: Fotocard Moment */}
      <article className="group absolute z-10 h-card-back-h w-card-back-w translate-x-7 -translate-y-2.5 rotate-6 rounded-2xl bg-surface p-2.5 shadow-md transition-transform duration-300 hover:rotate-12">
        <div className="flex h-full flex-col justify-between rounded-xl bg-surface-muted p-2">
          {/* Foto moment */}
          <div className="relative h-card-art-moment w-full overflow-hidden rounded-lg bg-surface-dim">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGIN_IMAGES.moment}
              alt="Momen liburan bersama teman saat matahari terbenam."
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold text-on-surface backdrop-blur-sm">
              310 gsm • Matte
            </span>
          </div>

          {/* Keterangan moment */}
          <div className="px-0.5 pt-1.5">
            <div className="flex items-center justify-between">
              <h2 className="truncate text-[12px] font-extrabold text-on-surface">
                Senja di Bali &apos;24
              </h2>

              <span className="text-[17px] leading-none text-primary">♥</span>
            </div>

            <p className="mt-0.5 text-[8px] font-semibold text-on-surface-muted">
              Koleksi Momen Liburan #04
            </p>
          </div>
        </div>
      </article>

      {/* Kartu depan: TCG */}
      <article className="group absolute z-20 h-card-front-h w-card-front-w -translate-x-5 translate-y-1.5 -rotate-3 rounded-2xl bg-surface p-2.5 shadow-xl transition-transform duration-300 hover:rotate-0 hover:scale-105">
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-surface-muted p-2">
          {/* Efek foil lembut */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary-soft blur-md" />

          {/* Header kartu */}
          <div className="relative z-10 flex items-center justify-between gap-1.5 pt-0.5">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />

              <span className="truncate text-[10px] font-extrabold uppercase tracking-wide text-on-surface">
                Kocheng Oyen
              </span>
            </div>

            <span className="flex shrink-0 items-center gap-1 rounded-full bg-surface-card px-2 py-0.5">
              <span className="text-[8px] font-extrabold text-primary">HP</span>

              <strong className="text-[10px] font-extrabold leading-none text-on-surface">
                950
              </strong>
            </span>
          </div>

          {/* Foto karakter */}
          <div className="relative z-10 my-1 h-card-art-moment w-full shrink-0 overflow-hidden rounded-lg bg-surface-dim">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGIN_IMAGES.cat}
              alt="Kucing oren memakai syal kecil bergaya petualang."
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <span className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 rounded bg-secondary px-1.5 py-0.5 text-[8px] font-bold text-white">
              ✦ Edisi Langka
            </span>
          </div>

          {/* Skill */}
          <div className="relative z-10 rounded-lg bg-surface-card p-1.5 shadow-sm">
            <div className="flex items-center justify-between gap-1">
              <span className="flex min-w-0 items-center gap-1 text-[10px] font-extrabold text-on-surface">
                <span className="text-[20px] leading-3 text-primary">ϟ</span>
                <span className="truncate">Cakar Bar-bar</span>
              </span>

              <span className="shrink-0 text-[9px] font-bold text-on-surface-muted">
                120 DMG
              </span>
            </div>

            <p className="mt-0.5 truncate text-[8px] leading-tight text-on-surface-muted">
              Menyebabkan musuh luluh seketika akibat keimutan luar biasa.
            </p>
          </div>

          {/* Footer kartu */}
          <div className="relative z-10 flex items-center justify-between px-1 pt-0.5 text-[7px] font-bold text-on-surface-soft">
            <span>DECK-TCG-001</span>
            <strong className="text-primary">★ FOIL HOLO</strong>
          </div>
        </div>
      </article>
    </div>
  );
}
