import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://sddenver.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Synergistic Development | Luxury Home Building & Advisory · Denver",
  description:
    "Luxury custom home building, renovation, and owner's representation in Denver, Colorado. 20+ years of trusted expertise in Cherry Creek, Highlands, Bow Mar, and beyond.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Synergistic Development",
    description:
      "Luxury home building, renovation, and consulting. Denver's most desirable neighborhoods.",
    type: "website",
    url: SITE_URL,
  },
};

// Organization / LocalBusiness structured data (JSON-LD), rendered sitewide
// so every page carries consistent entity information for search engines
// and AI answer engines (GEO/AEO).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Synergistic Development",
  url: SITE_URL,
  description:
    "Luxury custom home building, renovation, and independent construction advisory services in Denver, Colorado.",
  email: "shane@sddenver.com",
  telephone: "+1-303-910-7881",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bow Mar",
    addressRegion: "CO",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Denver",
    },
    "Cherry Creek",
    "Highlands",
    "Bow Mar",
    "Denver Metro & Front Range, Colorado",
  ],
  founder: {
    "@type": "Person",
    name: "Shane Fable",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Nav />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
