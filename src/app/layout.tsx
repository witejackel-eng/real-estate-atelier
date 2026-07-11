import type { Metadata } from "next";
import { Instrument_Serif, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CursorManager } from "@/components/providers/CursorManager";
import { PageLoader } from "@/components/providers/PageLoader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://casaaurelia.com'),
  title: {
    default: "Casa Aurelia | Private Residential Advisory",
    template: "%s | Casa Aurelia",
  },
  description: "Private residential advisory for considered homes across India. Curated properties, considered selling, and discreet guidance.",
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`}>
      <body className="font-body antialiased bg-ivory text-espresso min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-espresso focus:text-ivory focus:text-sm focus:font-mono focus:tracking-wider focus:uppercase rounded-sm"
        >
          Skip to content
        </a>
        <PageLoader />
        <SmoothScrollProvider>
          <CursorManager />
          <ScrollProgress />
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}