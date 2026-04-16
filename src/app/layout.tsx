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
    default: 'Medicsingles Magazin — Echte Liebe in der Medizin',
    template: '%s · Medicsingles',
  },
  description:
    'Das Magazin für Ärzte, Pflegekräfte und Therapeuten. Partnersuche, Erfolgsgeschichten und Tipps für den Schichtdienst.',
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Medicsingles Magazin — Echte Liebe in der Medizin',
    description: 'Das Magazin für Ärzte, Pflegekräfte und Therapeuten.',
    url: BASE_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de_CH',
    images: [{ url: `${BASE_URL}/images/hero-startseite.webp`, width: 1256, height: 710, alt: 'Medicsingles — Partnersuche für Ärzte, Pflege und Therapeuten' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medicsingles Magazin — Echte Liebe in der Medizin',
    description: 'Das Magazin für Ärzte, Pflegekräfte und Therapeuten.',
    images: [`${BASE_URL}/images/hero-startseite.webp`],
  },
  verification: {
    google: 'wX9Cm671l9E8x5f5BB72cAo-r_RcVHKKk3Eu0rr-fZM',
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
          <main className="flex-1 pt-20 pb-20 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <ClientEnhancements />
        </ThemeProvider>
      </body>
    </html>
  );
}
