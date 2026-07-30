import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GridBackdrop, ScrollProgress } from "@/components/effects";
import { company } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://scope360.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description: company.support,
  keywords: [
    "full-service execution partner",
    "project delivery",
    "digital transformation",
    "managed services",
    "civil works",
    "enterprise support",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: company.name,
    title: `${company.name} — ${company.tagline}`,
    description: company.support,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${company.tagline}`,
    description: company.support,
  },
  icons: { icon: "/icon.png", apple: "/icon.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  slogan: company.tagline,
  description: company.about.join(" "),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`no-js ${inter.variable} ${displaySerif.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js')",
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-amber-brand focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>
        <GridBackdrop />
        <ScrollProgress />
        <SiteHeader />
        <main id="main" className="relative z-10 pt-18">
          {children}
        </main>
        <div className="relative z-10">
          <SiteFooter />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
