import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Finly — Controle financeiro simples e inteligente",
  description:
    "Controle gastos, defina metas e planeje seu mês com um app claro e intuitivo.",
  applicationName: "Finly",
  keywords: [
    "finanças pessoais",
    "gestão financeira",
    "budgeting app",
    "controle de gastos",
    "metas financeiras",
    "dashboard financeiro",
  ],
  metadataBase: new URL("https://finly.app"),
  openGraph: {
    title: "Finly — Controle financeiro simples e inteligente",
    description:
      "Controle gastos, defina metas e planeje seu mês com um app claro e intuitivo.",
    url: "https://finly.app",
    siteName: "Finly",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Finly — Plataforma premium de finanças pessoais",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finly — Controle financeiro simples e inteligente",
    description:
      "Controle gastos, defina metas e planeje seu mês com um app claro e intuitivo.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="light">
      <body className={`${inter.variable} ${sora.variable}`}>{children}</body>
    </html>
  );
}
