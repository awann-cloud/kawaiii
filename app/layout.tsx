import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const displayFont = Fredoka({
  variable: "--font-outfit", // keeping variable name so we don't have to change CSS everywhere
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Nunito({
  variable: "--font-inter", // keeping variable name so we don't have to change CSS everywhere
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UNO Deck",
  description:
    "Tulis target kamu. Aku yang bakal kalah. Kado digital yang bisa dibuka berkali-kali.",
  keywords: ["UNO", "birthday", "goals", "personal", "card game"],
  authors: [{ name: "UNO Deck" }],
  openGraph: {
    title: "UNO Deck",
    description: "Tulis target kamu. Aku yang bakal kalah.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
