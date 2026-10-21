"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

type Screen =
  | "login"
  | "dashboard"
  | "templates"
  | "editor"
  | "profile"
  | "payment";

type Template = "TCG" | "Fotocard Moment" | "JQKA" | "Trivia Kuis";

type Panel = "photo" | "detail" | "ai" | null;

type Product = "AI Style" | "Template Premium";

type CardData = {
  id: string;
  name: string;
  image: string;
  archetype: string;
  rarity: string;
  skill: string;
  description: string;
};

type Deck = {
  id: string;
  name: string;
  template: Template;
  status: "Draft" | "Selesai";
  cards: CardData[];
};

const templates: {
  name: Template;
  icon: string;
  description: string;
  premium: boolean;
}[] = [
  {
    name: "TCG",
    icon: "🐈",
    description: "Kartu pertarungan versimu.",
    premium: false,
  },
  {
    name: "Fotocard Moment",
    icon: "📸",
    description: "Simpan cerita dalam kartu.",
    premium: false,
  },
  {
    name: "JQKA",
    icon: "♠",
    description: "Kartu remi dengan gayamu.",
    premium: true,
  },
  {
    name: "Trivia Kuis",
    icon: "💡",
    description: "Pertanyaan seru untuk bersama.",
    premium: true,
  },
];

const roles = [
  { name: "Penyerang", atk: 5, hp: 10 },
  { name: "Pelindung", atk: 3, hp: 15 },
  { name: "Penyusup", atk: 4, hp: 11 },
  { name: "Penopang", atk: 3, hp: 12 },
  { name: "Penipu", atk: 4, hp: 12 },
  { name: "Penyembuh", atk: 3, hp: 13 },
];

function createCards(template: Template): CardData[] {
  const count = template === "TCG" ? 6 : 3;

  return Array.from({ length: count }, (_, index) => ({
    id: crypto.randomUUID(),
    name: index === 0 ? "Oren Si Barbar" : `Kartu ${index + 1}`,
    image: "",
    archetype: roles[index % roles.length].name,
    rarity: "Common",
    skill: "Cakar Pembuka",
    description: "Serangan pertama mendapat +1 damage.",
  }));
}

export default function DeckSnap() {
  // Menyimpan halaman yang sedang dibuka.
  const [screen, setScreen] = useState<Screen>("login");

  // Menyimpan deck selama aplikasi masih terbuka.
  const [decks, setDecks] = useState<Deck[]>([]);

  // Menyimpan ID deck yang sedang diedit.
  const [activeId, setActiveId] = useState("");

  // Menyimpan urutan kartu yang sedang dipilih.
  const [cardIndex, setCardIndex] = useState(0);

  // Menentukan bottom sheet editor yang sedang terbuka.
  const [panel, setPanel] = useState<Panel>(null);

  // Menyimpan produk yang akan dibeli pada simulasi.
  const [product, setProduct] = useState<Product>("AI Style");

  // Menyimpan halaman asal sebelum membuka pembayaran.
  const [returnScreen, setReturnScreen] = useState<Screen>("editor");

  // Menyimpan status akses premium simulasi.
  const [access, setAccess] = useState({
    ai: false,
    templates: false,
  });

  // Menyimpan pesan informasi yang terlihat di aplikasi.
  const [notice, setNotice] = useState("");

  // Menyimpan gaya AI yang dipilih, bukan hasil AI asli.
  const [selectedStyle, setSelectedStyle] = useState("Vektor");

  // Menyimpan semua URL sementara dari foto yang diunggah.
  const imageUrls = useRef<string[]>([]);

  // Membersihkan URL sementara ketika komponen dilepas.
  useEffect(() => {
    return () => {
      imageUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Mencari deck aktif dari daftar deck.
  const activeDeck = decks.find((deck) => deck.id === activeId);

  // Mengambil kartu aktif dari deck yang dipilih.
  const activeCard = activeDeck?.cards[cardIndex];

  // Mengambil statistik berdasarkan arketipe kartu aktif.
  const activeRole =
    roles.find((role) => role.name === activeCard?.archetype) ?? roles[0];

  // Memindahkan tampilan dan membersihkan panel/pesan sebelumnya.
  function navigate(nextScreen: Screen) {
    setScreen(nextScreen);
    setPanel(null);
    setNotice("");
  }

  // Membuka pembayaran untuk produk tertentu.
  function openPayment(
    nextProduct: Product,
    destination: Screen,
  ) {
    setProduct(nextProduct);
    setReturnScreen(destination);
    navigate("payment");
  }

  // Membuat deck baru dari template.
  function createDeck(template: Template) {
    // Mencari informasi premium template.
    const selected = templates.find((item) => item.name === template);

    // Template terkunci akan membuka simulasi pembayaran.
    if (selected?.premium && !access.templates) {
      openPayment("Template Premium", "templates");
      return;
    }

    // Menyusun data deck baru.
    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name: `Deck ${template}`,
      template,
      status: "Draft",
      cards: createCards(template),
    };

    // Memasukkan deck baru ke bagian paling awal.
    setDecks((previous) => [newDeck, ...previous]);

    // Menjadikan deck baru sebagai deck aktif.
    setActiveId(newDeck.id);

    // Memilih kartu pertama.
    setCardIndex(0);

    // Membuka editor.
    navigate("editor");
  }

  // Memperbarui sebagian data kartu aktif.
  function updateCard(changes: Partial<CardData>) {
    setDecks((previous) =>
      previous.map((deck) =>
        deck.id === activeId
          ? {
              ...deck,
              status: "Draft",
              cards: deck.cards.map((card, index) =>
                index === cardIndex ? { ...card, ...changes } : card,
              ),
            }
          : deck,
      ),
    );
  }

  // Memproses satu file foto yang dipilih.
  function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    // Mengambil file pertama dari input.
    const file = event.target.files?.[0];

    // Berhenti jika tidak ada file.
    if (!file) return;

    // Validasi ringan untuk prototype frontend.
    if (!file.type.startsWith("image/")) {
      setNotice("Pilih file gambar.");
      return;
    }

    // Membatasi ukuran contoh sampai 5 MB.
    if (file.size > 5 * 1024 * 1024) {
      setNotice("Ukuran foto maksimal 5 MB.");
      return;
    }

    // Membuat alamat sementara agar foto bisa ditampilkan di browser.
    const url = URL.createObjectURL(file);

    // Menyimpan URL agar nanti dapat dibersihkan.
    imageUrls.current.push(url);

    // Memasang foto pada kartu aktif.
    updateCard({ image: url });

    // Menutup panel upload.
    setPanel(null);

    // Mengosongkan input agar file yang sama bisa dipilih lagi.
    event.target.value = "";
  }

  // Menandai deck selesai tanpa menjalankan backend.
  function finishDeck() {
    setDecks((previous) =>
      previous.map((deck) =>
        deck.id === activeId ? { ...deck, status: "Selesai" } : deck,
      ),
    );

    // Menjelaskan bahwa ekspor produksi belum tersedia.
    setNotice(
      "Deck ditandai selesai. Ekspor PDF dan gambar akan dibuat pada tahap berikutnya.",
    );
  }

  // Mengaktifkan premium secara lokal untuk demonstrasi tampilan.
  function simulatePayment() {
    setAccess((previous) => ({
      ...previous,
      ai: product === "AI Style" ? true : previous.ai,
      templates:
        product === "Template Premium" ? true : previous.templates,
    }));

    // Kembali ke halaman asal.
    navigate(returnScreen);

    // Menampilkan pemberitahuan bahwa transaksi ini tidak nyata.
    setNotice("Akses demo aktif. Tidak ada pembayaran sungguhan.");
  }

  return (
    <main className="app-shell">
      {/* Label tetap agar prototype tidak disangka aplikasi produksi. */}
      <div className="demo-strip">PROTOTYPE FRONTEND · DATA SEMENTARA</div>

      {/* Pesan status dapat dibaca oleh pembaca layar. */}
      {notice && (
        <div className="notice" role="status">
          <span>{notice}</span>
          <button
            className="icon-button"
            onClick={() => setNotice("")}
            aria-label="Tutup pemberitahuan"
          >
            ×
          </button>
        </div>
      )}

      {/* HALAMAN LOGIN */}
      {screen === "login" && (
        <section className="login-page">
          <div className="brand">DeckSnap<span>✳</span></div>

          <div className="login-showcase" aria-hidden="true">
            <div className="mini-photo">📷<small>MOMENT</small></div>
            <div className="hero-card">
              <span className="badge">PENYERANG</span>
              <div className="hero-cat">🐈</div>
              <strong>OREN SI BARBAR</strong>
              <div className="hero-stats"><span>ATK 5</span><span>HP 10</span></div>
            </div>
          </div>

          <p className="eyebrow">DARI GALERI, JADI KOLEKSI</p>
          <h1>Foto favoritmu,<br />jadi deck kartu.</h1>
          <p className="muted">
            Buat, bagikan, atau cetak kartu versimu sendiri.
          </p>

          <button
            className="button primary full"
            onClick={() => navigate("dashboard")}
          >
            <span className="google-mark">G</span>
            Masuk dengan Google
          </button>

          <small className="muted">
            Login masih simulasi. Belum terhubung ke Google.
          </small>
        </section>
      )}

      {/* HALAMAN DASHBOARD */}
      {screen === "dashboard" && (
        <section className="page">
          <header className="topbar">
            <div className="brand">DeckSnap<span>✳</span></div>
            <button
              className="avatar"
              onClick={() => navigate("profile")}
              aria-label="Buka profil"
            >
              W
            </button>
          </header>

          <div className="intro">
            <p className="eyebrow">RUANG KREASIMU</p>
            <h1>Bikin kartu.<br />Bawa ceritamu.</h1>
          </div>

          <button
            className="button primary full"
            onClick={() => navigate("templates")}
          >
            + Buat Deck Baru
          </button>

          <div className="section-heading">
            <h2>Deck Kamu</h2>
            <span className="muted">{decks.length} deck</span>
          </div>

          {decks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">▱</span>
              <h3>Belum ada deck</h3>
              <p className="muted">Mulai dari foto favoritmu.</p>
            </div>
          ) : (
            <div className="deck-grid">
              {decks.map((deck) => (
                <button
                  key={deck.id}
                  className="deck-tile"
                  onClick={() => {
                    setActiveId(deck.id);
                    setCardIndex(0);
                    navigate("editor");
                  }}
                >
                  <div className="deck-cover">
                    {deck.cards[0]?.image ? (
                      // Foto lokal sementara memakai elemen img biasa.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={deck.cards[0].image} alt="" />
                    ) : (
                      <span>{deck.template === "TCG" ? "🐈" : "📸"}</span>
                    )}
                  </div>
                  <strong>{deck.name}</strong>
                  <span className="muted">{deck.template}</span>
                  <span className="status-pill">{deck.status}</span>
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* HALAMAN PILIH TEMPLATE */}
      {screen === "templates" && (
        <section className="page">
          <header className="page-header">
            <button className="back-button" onClick={() => navigate("dashboard")}>
              ← Kembali
            </button>
            <h1>Pilih Template</h1>
            <p className="muted">Mau bikin kartu apa?</p>
          </header>

          <div className="template-grid">
            {templates.map((template) => (
              <button
                key={template.name}
                className="template-tile"
                onClick={() => createDeck(template.name)}
              >
                <div className="template-art">{template.icon}</div>
                <span className="badge">
                  {template.premium ? "✦ Premium" : "Gratis"}
                </span>
                <h2>{template.name}</h2>
                <p className="muted">{template.description}</p>
              </button>
            ))}
          </div>

          <p className="footnote">
            Contoh frontend: komposisi deck lengkap disiapkan pada tahap lanjutan.
          </p>
        </section>
      )}

      {/* HALAMAN PROFIL */}
      {screen === "profile" && (
        <section className="page">
          <button className="back-button" onClick={() => navigate("dashboard")}>
            ← Kembali
          </button>
          <h1>Profil</h1>

          <div className="profile-card">
            <div className="avatar large">W</div>
            <h2>Wafi</h2>
            <p className="muted">Akun contoh · Login Google simulasi</p>
          </div>

          <div className="menu-card">
            <div className="menu-row">
              <span>Template Premium</span>
              <span className="status-pill">
                {access.templates ? "Aktif demo" : "Belum aktif"}
              </span>
            </div>
            <div className="menu-row">
              <span>AI Style</span>
              <span className="status-pill">
                {access.ai ? "Aktif demo" : "Belum aktif"}
              </span>
            </div>
            <button
              className="menu-row"
              onClick={() => setNotice("Halaman bantuan belum dibuat.")}
            >
              Bantuan <span>↗</span>
            </button>
          </div>

          <p className="footnote">
            Data hanya tersimpan selama tab ini terbuka.
          </p>

          <button
            className="button danger full"
            onClick={() => navigate("login")}
          >
            Keluar
          </button>
        </section>
      )}

      {/* HALAMAN PEMBAYARAN SIMULASI */}
      {screen === "payment" && (
        <section className="page">
          <button className="back-button" onClick={() => navigate(returnScreen)}>
            ← Kembali
          </button>
          <h1>Pembayaran</h1>
          <p className="muted">Buka lebih banyak ruang berkreasi.</p>

          <div className="purchase-card">
            <span className="premium-icon">✦</span>
            <h2>{product}</h2>
            <p className="muted">
              {product === "AI Style"
                ? "Ubah foto menjadi vektor, pixel, dan gaya lainnya."
                : "Akses template JQKA dan Trivia Kuis."}
            </p>
            <hr />
            <div className="menu-row">
              <span>Total</span>
              <strong>Belum ditetapkan</strong>
            </div>
          </div>

          <div className="payment-methods">
            <span>QRIS</span><span>E-Wallet</span><span>Virtual Account</span>
          </div>

          <button className="button primary full" onClick={simulatePayment}>
            Simulasikan Pembayaran Berhasil
          </button>

          <p className="footnote">
            Tidak ada transaksi nyata atau koneksi payment gateway.
          </p>
        </section>
      )}

      {/* HALAMAN EDITOR */}
      {screen === "editor" && activeDeck && activeCard && (
        <section className="page editor-page">
          <header className="editor-header">
            <button
              className="icon-button"
              onClick={() => navigate("dashboard")}
              aria-label="Kembali ke dashboard"
            >
              ←
            </button>
            <div>
              <strong>{activeDeck.name}</strong>
              <small className="muted">Draft lokal · belum permanen</small>
            </div>
            <span className="badge">{activeDeck.template}</span>
          </header>

          <article className="playing-card">
            <div className="card-top">
              <span className="badge">
                {activeDeck.template === "TCG"
                  ? activeCard.archetype
                  : activeDeck.template}
              </span>
              {activeDeck.template === "TCG" && (
                <small>{activeCard.rarity}</small>
              )}
            </div>

            <div className="card-art">
              {activeCard.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={activeCard.image} alt={activeCard.name} />
              ) : (
                <span>{activeDeck.template === "TCG" ? "🐈" : "📷"}</span>
              )}
            </div>

            <div className="card-content">
              <h2>{activeCard.name}</h2>

              {activeDeck.template === "TCG" ? (
                <>
                  <div className="card-stats">
                    <span>⚔ ATK <strong>{activeRole.atk}</strong></span>
                    <span>♡ HP <strong>{activeRole.hp}</strong></span>
                  </div>
                  <div className="skill-box">
                    <strong>{activeCard.skill}</strong>
                    <p>{activeCard.description}</p>
                  </div>
                </>
              ) : (
                <p className="muted">{activeCard.description}</p>
              )}

              <div className="card-footer">
                <span>DECKSNAP</span>
                <span>{String(cardIndex + 1).padStart(2, "0")}</span>
              </div>
            </div>
          </article>

          <div className="thumbnail-list" aria-label="Pilih kartu">
            {activeDeck.cards.map((card, index) => (
              <button
                key={card.id}
                className={`thumbnail ${index === cardIndex ? "selected" : ""}`}
                onClick={() => setCardIndex(index)}
                aria-label={`Pilih kartu ${index + 1}`}
                aria-pressed={index === cardIndex}
              >
                {card.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={card.image} alt="" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>
            ))}
          </div>

          <p className="card-counter">
            {cardIndex + 1} dari {activeDeck.cards.length} kartu
          </p>

          <div className="editor-actions">
            <button className="button secondary" onClick={() => setPanel("photo")}>
              ▧ Foto & Gaya
            </button>
            <button className="button secondary" onClick={() => setPanel("detail")}>
              ✎ Detail Kartu
            </button>
          </div>

          <button className="button primary full" onClick={finishDeck}>
            {activeDeck.status === "Selesai" ? "Deck Selesai ✓" : "Selesaikan Deck"}
          </button>

          <p className="footnote">Ekspor PDF belum aktif pada versi frontend ini.</p>
        </section>
      )}

      {/* PANEL BAWAH EDITOR */}
      {panel && activeCard && activeDeck && (
        <div
          className="sheet-overlay"
          onClick={() => setPanel(null)}
        >
          <section
            className="bottom-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === "Escape") setPanel(null);
            }}
          >
            <div className="sheet-handle" />

            <header className="sheet-header">
              <h2 id="sheet-title">
                {panel === "photo"
                  ? "Foto & Gaya"
                  : panel === "detail"
                    ? "Detail Kartu"
                    : "AI Style"}
              </h2>
              <button
                className="icon-button"
                onClick={() => setPanel(null)}
                aria-label="Tutup panel"
                autoFocus
              >
                ×
              </button>
            </header>

            {panel === "photo" && (
              <div className="sheet-body">
                <p className="muted">Ganti foto untuk kartu yang sedang dipilih.</p>

                <label className="upload-area">
                  <span>＋</span>
                  <strong>Pilih dari Galeri</strong>
                  <small>File gambar · maksimal 5 MB</small>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadPhoto}
                  />
                </label>

                <button
                  className="button secondary full"
                  onClick={() => updateCard({ image: "" })}
                >
                  Gunakan Gambar Bawaan
                </button>

                <button
                  className="ai-entry"
                  onClick={() => setPanel("ai")}
                >
                  <span>✦ Ubah Gaya dengan AI</span>
                  <span className="badge">Premium</span>
                </button>
              </div>
            )}

            {panel === "detail" && (
              <div className="sheet-body">
                <label className="field">
                  <span>Nama Kartu</span>
                  <input
                    value={activeCard.name}
                    onChange={(event) => updateCard({ name: event.target.value })}
                  />
                </label>

                {activeDeck.template === "TCG" && (
                  <details className="form-group">
                    <summary>Karakter · {activeCard.archetype}</summary>

                    <label className="field">
                      <span>Arketipe</span>
                      <select
                        value={activeCard.archetype}
                        onChange={(event) =>
                          updateCard({ archetype: event.target.value })
                        }
                      >
                        {roles.map((role) => (
                          <option key={role.name}>{role.name}</option>
                        ))}
                      </select>
                    </label>

                    <label className="field">
                      <span>Rarity</span>
                      <select
                        value={activeCard.rarity}
                        onChange={(event) =>
                          updateCard({ rarity: event.target.value })
                        }
                      >
                        {["Common", "Rare", "Super Rare", "Ultra"].map((rarity) => (
                          <option key={rarity}>{rarity}</option>
                        ))}
                      </select>
                    </label>
                  </details>
                )}

                <details className="form-group">
                  <summary>
                    {activeDeck.template === "TCG" ? "Skill" : "Teks Kartu"}
                  </summary>

                  {activeDeck.template === "TCG" && (
                    <label className="field">
                      <span>Judul Skill</span>
                      <input
                        value={activeCard.skill}
                        onChange={(event) =>
                          updateCard({ skill: event.target.value })
                        }
                      />
                    </label>
                  )}

                  <label className="field">
                    <span>Deskripsi</span>
                    <textarea
                      rows={3}
                      value={activeCard.description}
                      onChange={(event) =>
                        updateCard({ description: event.target.value })
                      }
                    />
                  </label>
                </details>

                <button
                  className="button primary full"
                  onClick={() => setPanel(null)}
                >
                  Selesai Edit
                </button>
              </div>
            )}

            {panel === "ai" && (
              <div className="sheet-body">
                <p className="muted">Pilih gaya untuk foto kartumu.</p>

                <div className="style-grid">
                  {["Vektor", "Pixel", "Kartun", "Cat Air"].map((style) => (
                    <button
                      key={style}
                      className={`style-tile ${
                        selectedStyle === style ? "active" : ""
                      }`}
                      onClick={() => setSelectedStyle(style)}
                    >
                      <span>✦</span>
                      {style}
                    </button>
                  ))}
                </div>

                <p className="footnote">
                  AI belum aktif. Pilihan gaya hanya demonstrasi antarmuka.
                </p>

                <button
                  className="button premium full"
                  onClick={() => {
                    if (!access.ai) {
                      openPayment("AI Style", "editor");
                      return;
                    }

                    setNotice(
                      `Gaya ${selectedStyle} dipilih. Generasi AI belum dihubungkan.`,
                    );
                    setPanel(null);
                  }}
                >
                  {access.ai ? "Coba Tampilan AI" : "Buka AI Style"}
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}