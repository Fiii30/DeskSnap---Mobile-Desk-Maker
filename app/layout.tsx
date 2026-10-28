import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Masuk | DeckSnap",
  description: "Ubah foto favoritmu menjadi deck kartu koleksi.",

};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} font-[family-name:var(--font-jakarta)] antialiased`}>
        {children}
      </body>
    </html>
  );
}