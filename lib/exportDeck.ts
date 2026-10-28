// Import jsPDF untuk membuat PDF.
import { jsPDF } from "jspdf";

// Import JSZip untuk membuat file ZIP.
import JSZip from "jszip";

// Import html2canvas untuk capture DOM kartu.
import html2canvas from "html2canvas-pro";

// Export deck menjadi PDF 9 kartu per halaman A4.
export async function exportDeckToPdf(
  deckTitle: string,
  cardNodes: HTMLElement[],
) {
  try {
    // Buat PDF A4 portrait dengan satuan mm.
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Ukuran halaman A4.
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Margin halaman.
    const margin = 1;

    // Grid 3 kolom x 3 baris.
    const cols = 3;
    const rows = 3;

    // Ukuran area cetak.
    const usableWidth = pageWidth - margin * 1;
    const usableHeight = pageHeight - margin * 1;

    // Ukuran tiap sel.
    const cellWidth = usableWidth / cols;
    const cellHeight = usableHeight / rows;

    // Ukuran kartu di dalam sel.
    const cardWidth = cellWidth - 1;
    const cardHeight = cellHeight - 1;

    // Loop semua kartu.
    for (let i = 0; i < cardNodes.length; i++) {
      const node = cardNodes[i];

      // Capture DOM kartu menjadi canvas resolusi tinggi.
      const canvas = await html2canvas(node, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        scrollX: 0,
        scrollY: 0,
        windowWidth: node.scrollWidth,
        windowHeight: node.scrollHeight,
      });

      // Tentukan posisi di grid.
      const col = i % cols;
      const row = Math.floor(i / cols) % rows;

      // Tambah halaman baru setiap 9 kartu.
      if (i > 0 && i % 9 === 0) {
        pdf.addPage();
      }

      // Hitung posisi x dan y.
      const x = margin + col * cellWidth + 1;
      const y = margin + row * cellHeight + 1;

      // Masukkan gambar kartu (lengkap dengan border) ke PDF.
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        x,
        y,
        cardWidth,
        cardHeight,
      );
    }

    // Simpan PDF.
    pdf.save(`${deckTitle || "deck"}.pdf`);
  } catch (error) {
    // Tampilkan error asli di console untuk debugging.
    console.error("Gagal export PDF:", error);

    // Lempar ulang agar pemanggil tahu gagal.
    throw error;
  }
}

// Export deck menjadi ZIP berisi PNG resolusi tinggi.
export async function exportDeckToZip(
  deckTitle: string,
  cardNodes: HTMLElement[],
) {
  // Buat instance ZIP baru.
  const zip = new JSZip();

  // Loop semua kartu.
  for (let i = 0; i < cardNodes.length; i++) {
    const node = cardNodes[i];

    // Capture DOM kartu menjadi canvas resolusi tinggi.
    const canvas = await html2canvas(node, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });

    // Ubah canvas menjadi blob PNG.
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );

    if (!blob) continue;

    // Nama file kartu.
    const fileName = `${String(i + 1).padStart(2, "0")}-kartu.png`;

    // Tambahkan ke ZIP.
    zip.file(fileName, blob);
  }

  // Buat file ZIP.
  const zipBlob = await zip.generateAsync({ type: "blob" });

  // Buat link download.
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${deckTitle || "deck"}.zip`;
  link.click();

  // Bersihkan URL.
  URL.revokeObjectURL(url);
}
