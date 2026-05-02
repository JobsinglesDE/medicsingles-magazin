import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ClientEnhancements } from '@/components/layout/ClientEnhancements';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const BASE_URL = 'https://medicsingles.de/magazin';

export const metadata: Metadata = {
  title: {
    default: '❤️ Medicsingles — Partnersuche im Gesundheitswesen',
    template: '%s ❤️',
  },
  description:
    'Magazin für Ärzte, Pflege & Therapeuten: Partnersuche-Guides, Erfolgsgeschichten und Tipps für Dating trotz Schichtdienst. Jetzt kostenlos zu Medicsingles.de.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    types: {
      'application/rss+xml': `${BASE_URL}/rss.xml`,
    },
  },
  openGraph: {
    title: '❤️ Medicsingles — Partnersuche im Gesundheitswesen',
    description: 'Magazin für Ärzte, Pflege & Therapeuten: Partnersuche-Guides, Erfolgsgeschichten und Dating-Tipps für den Schichtdienst.',
    url: BASE_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de_DE',
    images: [{ url: `${BASE_URL}/images/hero-startseite.webp`, width: 1920, height: 1080, alt: 'Medicsingles — Partnersuche für Ärzte, Pflege und Therapeuten' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '❤️ Medicsingles — Partnersuche im Gesundheitswesen',
    description: 'Magazin für Ärzte, Pflege & Therapeuten: Partnersuche-Guides und Dating-Tipps für den Schichtdienst.',
    images: [`${BASE_URL}/images/hero-startseite.webp`],
  },
  verification: {
    google: ['wX9Cm671l9E8x5f5BB72cAo-r_RcVHKKk3Eu0rr-fZM', 'QGrCPnN_tCvvrSaaq7sPx_oKm8k1mDUAzO4ZlI0iRa0'],
  },
  icons: {
    icon: [
      { url: '/magazin/logos/jobsingles-logo.png', type: 'image/png' },
    ],
    shortcut: '/magazin/logos/jobsingles-logo.png',
    apple: '/magazin/logos/jobsingles-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider theme="light">
          <Header />
          <main id="main-content" className="flex-1 pt-20 pb-20 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <ClientEnhancements />
        </ThemeProvider>
      </body>
    </html>
  );
}
