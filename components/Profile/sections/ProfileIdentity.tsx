// Props identitas pengguna.
type ProfileIdentityProps = {
  displayName: string;
};

// Kartu identitas pengguna.
export default function ProfileIdentity({ displayName }: ProfileIdentityProps) {
  return (
    <section className="relative flex flex-col items-center overflow-hidden rounded-xl bg-surface-card p-4 text-center shadow-card">
      <div className="relative mb-2">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-surface-muted shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzlxH8wjLISssDYUnByvAUZ2K8_B7yG3bherZwO5iglEXQXYhLdwtNm1U-_Dx8pVMgjAMZJi1w1KSQI9ukXce2CAHyPBY91pMUbEYFJzA6klmL5QEH-wPRGfrlH_7u2ypsqio2uv_AR5Iz352k0AmGnyhMEu_oUSFFh2I5drPzAbUGDfI2PHw5ZgyYsrBizDO-5shhjDcw8EVufTiMCA9-FL_hGDOppFAmkG6MkClbrgyz5LYeVPov"
            alt="Foto profil Wafi"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white shadow-button">
          ✦
        </div>
      </div>

      <h2 className="text-xl font-bold leading-7 text-ink">{displayName}</h2>

      <p className="mb-1 text-xs leading-5 text-ink-soft">w***@gmail.com</p>

      <div className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-xs font-bold text-ink-soft">
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
        Masuk dengan Google
      </div>
    </section>
  );
}
