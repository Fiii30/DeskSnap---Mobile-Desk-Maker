// Import Suspense dari React.
import { Suspense } from "react";

// Mengimpor halaman Editor & Preview.
import EditorPage from "@/components/Editor/EditorPage";

// Route /editor menampilkan Editor.
export default function EditorRoute() {
  return (
    // Suspense menahan render Editor sampai query URL tersedia.
    <Suspense
      fallback={
        // Tampilan sementara saat Editor dimuat.
        <main className="flex min-h-dvh items-center justify-center bg-surface text-ink">
          <p className="text-sm font-semibold">Memuat Editor...</p>
        </main>
      }
    >
      {/* Editor membaca ?template=... lewat useSearchParams */}
      <EditorPage />
    </Suspense>
  );
}