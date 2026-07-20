import type { NextConfig } from 'next';
import { readFileSync } from 'node:fs';

// Generierte 301-Redirects (flache /{slug} + /tv-news → neue Hub-URLs).
// Erzeugt von scripts/gen-redirects.mjs.
const generatedRedirects: { source: string; destination: string; permanent: boolean }[] =
  JSON.parse(readFileSync(new URL('./redirects.generated.json', import.meta.url), 'utf8'));

const nextConfig: NextConfig = {
  basePath: '/magazin',
  // Dynamische Routen (z.B. /wp-json/wp/v2/posts) lesen Keystatic-Content via fs
  // zur Laufzeit. Vercel muss die content/ Dateien in die Serverless Function bundeln,
  // sonst returnt der Reader [] in Production.
  outputFileTracingIncludes: {
    '/wp-json/wp/v2/posts': ['./content/**/*'],
  },
  images: {
    // Vercel-Image-Optimizer-Quota des Accounts ist erschöpft (intermittierende 402
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED, account-weit über alle Magazine). Bilder
    // liegen bereits als WebP in passender Größe vor → direkt ausliefern, keine Quota.
    loader: 'custom',
    loaderFile: './image-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'medicsingles.de',
      },
    ],
    // Reduzierte Device-Sizes → weniger srcset-Varianten pro Bild → kleiner byte-weight
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [96, 256, 600],
    formats: ['image/webp'],
    // Default-quality: aggressiver
    qualities: [60, 75, 85],
  },
  async redirects() {
    // Legacy partnersuche-*-Hub-Redirects (Bestand) + generierte. Dedupe nach source.
    const legacy = [
      { source: '/partnersuche-aerzte', destination: '/singles-partnersuche/aerzte', permanent: true },
      { source: '/partnersuche-pflege', destination: '/singles-partnersuche/pflege', permanent: true },
      { source: '/partnersuche-therapeuten', destination: '/singles-partnersuche/therapeuten', permanent: true },
      { source: '/partnersuche-rettung', destination: '/singles-partnersuche/rettung', permanent: true },
      // Gelöschte, aber in GSC noch rankende tv-news-Seite (4 Klk/129 Impr) → auf Show-Hub statt 404
      { source: '/tv-news/greys-anatomy/greys-anatomy-winston-jules-staffel-22-finale', destination: '/tv-serien/greys-anatomy', permanent: true },
      // 2026-07-20 Löschverlangen der Presseagentur (BUCH CONTACT) → Artikel entfernt, alle
      // URL-Varianten auf den Hub. Über diese Person wird nicht mehr publiziert.
      { source: '/promi-aerzte/giovanni-maio-arzt-philosoph-freiburg', destination: '/promi-aerzte', permanent: true },
      { source: '/giovanni-maio-arzt-philosoph-freiburg', destination: '/promi-aerzte', permanent: true },
      { source: '/singles-partnersuche/aerzte/giovanni-maio-arzt-philosoph-freiburg', destination: '/promi-aerzte', permanent: true },
    ];
    const seen = new Set<string>();
    return [...legacy, ...generatedRedirects].filter((r) =>
      seen.has(r.source) ? false : (seen.add(r.source), true),
    );
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self' https://medicsingles.de https://*.vercel.app",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://*.googletagmanager.com https://www.instagram.com https://*.cdninstagram.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https: blob:",
          "font-src 'self' data:",
          "connect-src 'self' https: wss:",
          "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.instagram.com",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join('; '),
      },
    ];
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
