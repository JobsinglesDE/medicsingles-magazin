import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/magazin',
  // Dynamische Routen (z.B. /wp-json/wp/v2/posts) lesen Keystatic-Content via fs
  // zur Laufzeit. Vercel muss die content/ Dateien in die Serverless Function bundeln,
  // sonst returnt der Reader [] in Production.
  outputFileTracingIncludes: {
    '/wp-json/wp/v2/posts': ['./content/**/*'],
  },
  images: {
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
    return [
      {
        source: '/partnersuche-medizin',
        destination: '/singles-partnersuche',
        permanent: true,
      },
      {
        source: '/partnersuche-aerzte',
        destination: '/singles-partnersuche/aerzte',
        permanent: true,
      },
      {
        source: '/partnersuche-pflege',
        destination: '/singles-partnersuche/pflege',
        permanent: true,
      },
      {
        source: '/partnersuche-therapeuten',
        destination: '/singles-partnersuche/therapeuten',
        permanent: true,
      },
      {
        source: '/partnersuche-rettung',
        destination: '/singles-partnersuche/rettung',
        permanent: true,
      },
    ];
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
