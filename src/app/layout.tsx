import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { Preloader } from "@/components/shared/Preloader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://casaaurelia.com'),
  title: {
    default: "Casa Aurelia — Curated Premium Real Estate",
    template: "%s — Casa Aurelia",
  },
  description: "A premium real estate studio for curated homes, private viewings, property selling, and calm buying decisions.",
  keywords: ["luxury real estate", "premium homes India", "villas", "penthouses", "property advisory"],
  authors: [{ name: "Casa Aurelia" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Casa Aurelia",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${geistMono.variable}`}>
      <body className="font-body antialiased bg-ivory text-espresso">
        <Preloader />
        <SmoothScroll>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}