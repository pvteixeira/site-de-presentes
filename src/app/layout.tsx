import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Alex_Brush, WindSong } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const alexBrush = Alex_Brush({
  weight: "400",
  variable: "--font-signature",
  subsets: ["latin"],
});

const windSong = WindSong({
  weight: ["400", "500"],
  variable: "--font-windsong",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aline e Klécio - Lista de Presentes",
  description: "Agradecemos por fazer parte do nosso sonho. Contribua com nossa lista de presentes.",
  icons: {
    icon: "/img/LOGO_MARCA.png",
    shortcut: "/img/LOGO_MARCA.png",
    apple: "/img/LOGO_MARCA.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cormorant.variable} ${alexBrush.variable} ${windSong.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
