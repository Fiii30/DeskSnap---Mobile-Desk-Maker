// Props modal profil.
type ProfileModalProps = {
  onClose: () => void;
  onLogout: () => void;
};

// Modal profil pengguna.
export default function ProfileModal({ onClose, onLogout }: ProfileModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-dark/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-md rounded-t-2xl bg-surface-card p-6 shadow-card-strong sm:rounded-2xl">
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-lg font-bold text-ink">Profil Pengguna</h3>

          <button
            type="button"
            aria-label="Tutup profil"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-ink-soft transition-colors hover:bg-surface-hover"
          >
            ✕
          </button>
        </div>

        {/* Identitas */}
        <div className="mb-4 flex items-center gap-3.5 rounded-xl bg-surface-muted p-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            RP
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-ink">Wafi</p>
            <p className="truncate text-xs leading-5 text-ink-soft">w***@gmail.com</p>
          </div>
        </div>

        {/* Akses */}
        <div className="mb-6 rounded-xl bg-surface-soft p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-ink">Sisa Token Cetak</span>
            <span className="text-sm font-bold text-primary">◎ 12 Token</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
            <div className="h-full w-3/5 rounded-full bg-primary" />
          </div>

          <p className="mt-2 text-xs leading-5 text-ink-soft">
            Cukup untuk mencetak 1 deck standar (54 kartu).
          </p>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => alert("Prototype: Riwayat Pesanan Cetak belum tersedia.")}
            className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-surface-muted"
          >
            <span className="flex items-center gap-2.5 text-xs font-semibold text-ink">
              🧾 Riwayat Pesanan Cetak
            </span>
            <span className="text-ink-muted">›</span>
          </button>

          <button
            type="button"
            onClick={() => alert("Prototype: Alamat Pengiriman belum tersedia.")}
            className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-surface-muted"
          >
            <span className="flex items-center gap-2.5 text-xs font-semibold text-ink">
              🚚 Alamat Pengiriman
            </span>
            <span className="text-ink-muted">›</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="w-full rounded-lg bg-surface-muted py-3 text-sm font-bold text-danger transition-colors hover:bg-danger/10"
          >
            Keluar Akun
          </button>
        </div>
      </div>
    </div>
  );
}