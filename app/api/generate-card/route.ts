// Route handler Next.js App Router.
import { NextResponse } from "next/server";

// Prompt tetap yang ditanam di server.
const SYSTEM_PROMPT = `
Kamu adalah pembuat teks kartu game TCG.
Lihat gambar yang dikirim, lalu buat teks kartu yang sesuai dengan isi gambar.

Balas HANYA dengan JSON valid, tanpa penjelasan lain, dengan format:
{
  "name": "nama karakter singkat dan keren atau konyol",
  "skillTitle": "judul skill singkat",
  "skillDescription": "deskripsi skill 1-2 kalimat sesuai gambar",
  "tier": "Common | Rare | SuperRare"
}

Aturan:
- Nama maksimal 15 karakter.
- skillTitle maksimal 15 karakter.
- skillDescription maksimal 65 karakter.
- tier WAJIB salah satu dari: "Common", "Rare", "SuperRare".
- Pilih tier secara acak namun masuk akal (Common paling sering, SuperRare paling jarang).
- Bahasa Indonesia.
- Sesuaikan tema dengan gambar.
`;

// Handler POST.
export async function POST(request: Request) {
  try {
    // Ambil body dari client.
    const body = await request.json();

    // Ambil base64 image dan mime type.
    const { imageBase64, mimeType } = body as {
      imageBase64: string;
      mimeType: string;
    };

    // Validasi input.
    if (!imageBase64 || !mimeType) {
      return NextResponse.json(
        { error: "imageBase64 dan mimeType wajib diisi" },
        { status: 400 },
      );
    }

    // Fungsi fetch dengan timeout custom.
    async function fetchWithTimeout(
      url: string,
      options: RequestInit,
      timeoutMs: number,
    ) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);

      try {
        return await fetch(url, {
          ...options,
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }
    }

    // URL endpoint Gemini.
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    // Body request.
    const requestBody = JSON.stringify({
      contents: [
        {
          parts: [
            { text: SYSTEM_PROMPT },
            {
              inline_data: {
                mime_type: mimeType,
                data: imageBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.9,
        responseMimeType: "application/json",
      },
    });

    // Coba kirim, retry 1x bila timeout.
    // Coba kirim hingga 3 kali dengan jeda.
    let response: Response | null = null;
    let lastError: unknown = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        response = await fetchWithTimeout(
          geminiUrl,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
          },
          60000,
        );

        // Bila sukses atau error selain high demand, berhenti retry.
        if (response.ok || response.status !== 503) {
          break;
        }

        // Bila 503 (overloaded), tunggu lalu coba lagi.
        const delay = 3000 * (attempt + 1);
        console.warn(`Gemini overloaded, retry dalam ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } catch (error) {
        lastError = error;
        const delay = 3000 * (attempt + 1);
        console.warn(
          `Percobaan ${attempt + 1} gagal, retry dalam ${delay / 1000}s...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // Bila semua percobaan gagal.
    if (!response) {
      throw lastError ?? new Error("Gagal konek ke Gemini");
    }

    // Ambil hasil JSON dari Gemini.
    const data = await response.json();

    // Log respons mentah untuk debugging.
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    // Bila Gemini menolak / error.
    if (!response.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json(
        { error: data?.error?.message || "Gemini API error" },
        { status: response.status },
      );
    }

    // Ambil kandidat pertama.
    const candidate = data?.candidates?.[0];

    // Bila tidak ada kandidat (mis. kena safety filter).
    if (!candidate) {
      console.error("Tidak ada candidate. Full response:", data);
      return NextResponse.json(
        {
          error:
            "AI tidak mengembalikan hasil (kemungkinan kena safety filter)",
        },
        { status: 502 },
      );
    }

    // Gabungkan semua parts teks.
    const text = (candidate.content?.parts ?? [])
      .map((part: { text?: string }) => part.text ?? "")
      .join("")
      .trim();

    // Bila teks kosong.
    if (!text) {
      console.error("Teks kosong. Full response:", data);
      return NextResponse.json(
        { error: "AI mengembalikan teks kosong" },
        { status: 502 },
      );
    }

    // Bersihkan kemungkinan markdown wrapper.
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse JSON dengan try-catch terpisah.
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("AI balasan bukan JSON:", cleaned);
      return NextResponse.json(
        { error: "AI mengembalikan format tidak valid" },
        { status: 502 },
      );
    }

    // Kirim hasil ke client.
    return NextResponse.json(parsed);
  } catch (error) {
    // Log error untuk debugging.
    console.error("Gagal generate kartu:", error);

    // Kirim pesan error.
    return NextResponse.json(
      { error: "Gagal generate teks kartu" },
      { status: 500 },
    );
  }
}
