// Props menu Profil.
type ProfileMenuProps = {
  onOpenPurchases: () => void;
  onOpenHelp: () => void;
  onOpenPrivacy: () => void;
};

// Menu aktivitas dan pengaturan.
export default function ProfileMenu({
  onOpenPurchases,
  onOpenHelp,
  onOpenPrivacy,
}: ProfileMenuProps) {
  const menuItems = [
    {
      key: "purchases",
      icon: "🧾",
      label: "Pembelian Saya",
      detail: "3 Transaksi",
      onClick: onOpenPurchases,
    },
    {
      key: "help",
      icon: "❓",
      label: "Bantuan & Panduan",
      detail: "",
      onClick: onOpenHelp,
    },
    {
      key: "privacy",
      icon: "🛡",
      label: "Kebijakan Privasi",
      detail: "",
      onClick: onOpenPrivacy,
    },
  ];

  return (
    <section className="space-y-1">
      <div className="px-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Aktivitas & Pengaturan
        </h3>
      </div>

      <div className="overflow-hidden rounded-xl bg-surface-card shadow-card">
        {menuItems.map((item, index) => (
          <div key={item.key}>
            <button
              type="button"
              onClick={item.onClick}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-surface-soft"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-muted">
                  {item.icon}
                </span>

                <span className="text-sm font-semibold text-ink">
                  {item.label}
                </span>
              </span>

              <span className="flex items-center gap-1 text-xs text-ink-soft">
                {item.detail}
                <span aria-hidden="true">›</span>
              </span>
            </button>

            {index < menuItems.length - 1 && (
              <div className="mx-4 h-px bg-surface-muted" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
