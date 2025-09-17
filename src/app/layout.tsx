import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Marie-Line Pilates - Coaching en ligne",
  description: "Découvrez le Pilates avec Marie-Line. Vidéos de coaching, méditations et séances en ligne pour tous les niveaux.",
  keywords: "pilates, coaching, méditation, fitness, bien-être, Marie-Line",
  authors: [{ name: "Marie-Line" }],
  openGraph: {
    title: "Marie-Line Pilates - Coaching en ligne",
    description: "Découvrez le Pilates avec Marie-Line. Vidéos de coaching, méditations et séances en ligne pour tous les niveaux.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50">
        <Providers>
          <div className="relative flex flex-col min-h-screen overflow-x-hidden">
            {/* Global background decorative shapes */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-24 left-[-5%] w-72 h-72 organic-shape bg-primary-500/10" />
              <div className="absolute top-1/3 right-[-6%] w-56 h-56 organic-shape-2 bg-secondary-500/10" />
              <div className="absolute bottom-20 left-1/3 w-44 h-44 organic-shape-3 bg-accent-500/5" />
            </div>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
