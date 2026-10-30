"use client";

// State untuk nama, accordion, dan modal.
import { useState } from "react";

// Router App Router untuk kembali ke halaman sebelumnya.
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

// Komponen Profil yang sudah dipisah.
import ProfileHeader from "./sections/ProfileHeader";
import ProfileIdentity from "./sections/ProfileIdentity";
import AccessSummary from "./sections/AccessSummary";
import ProfileMenu from "./sections/ProfileMenu";
import AccountSettingsAccordion from "./sections/AccountSettingsAccordion";
import LogoutModal from "./modals/LogoutModal";
import DeleteAccountModal from "./modals/DeleteAccountModal";

// Halaman Profil.
export default function ProfilePage() {
  // Router untuk navigasi kembali.
  const router = useRouter();

  // Nama tampilan, masih data prototype.
  const [displayName, setDisplayName] = useState("Wafi");

  // Nilai input ubah nama.
  const [nameInput, setNameInput] = useState("Wafi");

  // Accordion pengaturan akun.
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Form ubah nama.
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);

  // Modal keluar dan hapus akun.
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Menyimpan nama baru.
  function handleSaveName() {
    const newName = nameInput.trim();

    if (newName) {
      setDisplayName(newName);
    }

    setIsEditNameOpen(false);
  }
  
  async function handleConfirmLogout() {
    const supabase = createClient();

    // Sign out dari Supabase.
    await supabase.auth.signOut();

    // Arahkan ke halaman login.
    router.push("/login");
  }

  return (
    <main className="relative min-h-dvh bg-surface pb-10 pt-20 text-ink">
      <ProfileHeader onBack={() => router.back()} />

      <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 py-4">
        <ProfileIdentity displayName={displayName} />

        <AccessSummary
          onTopUp={() =>
            alert("Prototype: fitur isi ulang token belum tersedia.")
          }
        />

        <ProfileMenu
          onOpenPurchases={() =>
            alert("Prototype: halaman Pembelian Saya belum tersedia.")
          }
          onOpenHelp={() =>
            alert("Prototype: halaman Bantuan & Panduan belum tersedia.")
          }
          onOpenPrivacy={() =>
            alert("Prototype: halaman Kebijakan Privasi belum tersedia.")
          }
        />

        <AccountSettingsAccordion
          displayName={displayName}
          isOpen={isSettingsOpen}
          isEditNameOpen={isEditNameOpen}
          nameInput={nameInput}
          onToggle={() => setIsSettingsOpen((current) => !current)}
          onToggleEditName={() => {
            setNameInput(displayName);
            setIsEditNameOpen((current) => !current);
          }}
          onNameInputChange={setNameInput}
          onSaveName={handleSaveName}
          onDeleteAccount={() => setIsDeleteOpen(true)}
        />

        {/* Tombol keluar */}
        <section className="pt-1">
          <button
            type="button"
            onClick={() => setIsLogoutOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface-hover py-3.5 text-sm font-semibold text-ink shadow-button transition-colors hover:bg-surface-muted"
          >
            ↪ Keluar
          </button>
        </section>
      </div>

      {/* Modal keluar */}
      {isLogoutOpen && (
        <LogoutModal
          onCancel={() => setIsLogoutOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}

      {/* Modal hapus akun */}
      {isDeleteOpen && (
        <DeleteAccountModal
          onCancel={() => setIsDeleteOpen(false)}
          onConfirm={() => {
            setIsDeleteOpen(false);
            alert("Prototype: penghapusan akun belum diaktifkan.");
          }}
        />
      )}
    </main>
  );
}
