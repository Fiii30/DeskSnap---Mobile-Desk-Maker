"use client";

// Props accordion pengaturan akun.
type AccountSettingsAccordionProps = {
  displayName: string;
  isOpen: boolean;
  isEditNameOpen: boolean;
  nameInput: string;
  onToggle: () => void;
  onToggleEditName: () => void;
  onNameInputChange: (value: string) => void;
  onSaveName: () => void;
  onDeleteAccount: () => void;
};

// Accordion Pengaturan Akun.
export default function AccountSettingsAccordion({
  displayName,
  isOpen,
  isEditNameOpen,
  nameInput,
  onToggle,
  onToggleEditName,
  onNameInputChange,
  onSaveName,
  onDeleteAccount,
}: AccountSettingsAccordionProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-surface-card shadow-card">
      {/* Tombol accordion */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-surface-soft"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-muted">
            ⚙
          </span>

          <span className="text-sm font-semibold text-ink">
            Pengaturan Akun
          </span>
        </span>

        <span
          className={`text-lg text-ink-soft transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ⌄
        </span>
      </button>

      {/* Isi accordion */}
      {isOpen && (
        <div className="space-y-2 bg-surface-soft px-4 py-2">
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-xs font-semibold text-ink">
                Ubah Nama Tampilan
              </div>
              <div className="text-xs leading-5 text-ink-soft">
                {displayName}
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleEditName}
              className="rounded-lg bg-surface-muted px-3 py-1 text-xs font-bold text-ink transition-colors hover:bg-surface-hover"
            >
              Ubah
            </button>
          </div>

          {isEditNameOpen && (
            <div className="pb-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(event) => onNameInputChange(event.target.value)}
                  placeholder="Ketik nama baru..."
                  className="w-full rounded-md bg-surface-card px-3 py-2 text-xs text-ink focus:outline-none"
                />

                <button
                  type="button"
                  onClick={onSaveName}
                  className="rounded-md bg-primary px-3 py-2 text-xs font-bold text-white shadow-button"
                >
                  Simpan
                </button>
              </div>
            </div>
          )}

          <div className="h-px bg-surface-muted" />

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-xs font-semibold text-danger">
                Hapus Akun
              </div>
              <div className="text-xs leading-5 text-ink-soft">
                Hapus profil dan semua deck permanen
              </div>
            </div>

            <button
              type="button"
              aria-label="Hapus akun"
              onClick={onDeleteAccount}
              className="rounded-lg bg-danger/10 p-1.5 text-danger transition-opacity hover:opacity-80"
            >
              🗑
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
