// scripts/gen-redirects.mjs — 301-Redirects auf das 3-Sektionen-Modell.
// articles: flach /{slug} → /singles-partnersuche/{spec}/{slug} (spiegelt routes.ts).
// series:   /tv-news/{seriesId}/{slug} → /tv-serien/{seriesId}/{slug}.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SPEC_SLUG = { arzt: 'aerzte', pflege: 'pflege', therapeut: 'therapeuten', rettung: 'rettung' };

function field(s, key) {
  const m = s.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

const out = [];

// Artikel
const ADIR = 'content/articles';
for (const f of readdirSync(ADIR).filter((x) => x.endsWith('.mdoc'))) {
  const s = readFileSync(join(ADIR, f), 'utf8');
  const slug = f.replace(/\.mdoc$/, '');
  const spec = SPEC_SLUG[field(s, 'specialization')];
  const section = field(s, 'section');

  if (section === 'promi-aerzte') {
    // Promi-Ärzte: eigene Sektion. Alte URLs (flach + bisher nested unter aerzte) → /promi-aerzte/{slug}.
    const dest = `/promi-aerzte/${slug}`;
    out.push({ source: `/${slug}`, destination: dest, permanent: true });
    out.push({ source: `/singles-partnersuche/aerzte/${slug}`, destination: dest, permanent: true });
    continue;
  }

  if (section === 'berufsbilder') {
    // Berufsbilder/Money-Seiten leben unter /berufsbilder/{slug} (siehe getArticleUrl).
    // Alte flache URL + evtl. altes spec-Nesting → kanonische Berufsbild-URL (kein Equity-Leck auf den Dating-Hub).
    const dest = `/berufsbilder/${slug}`;
    out.push({ source: `/${slug}`, destination: dest, permanent: true });
    if (spec) out.push({ source: `/singles-partnersuche/${spec}/${slug}`, destination: dest, permanent: true });
    continue;
  }

  const dest = spec ? `/singles-partnersuche/${spec}/${slug}` : '/singles-partnersuche';
  if (dest !== `/${slug}`) out.push({ source: `/${slug}`, destination: dest, permanent: true });
}

// Konsolidierte Dating-Spokes (2026-06-27, gelöscht wg. 0-Volumen/0-Impr) → 301 auf Pillar.
// Pflicht: dynamicParams=false → gelöschter Slug wäre sonst 404. Manifest: consolidated.json.
if (existsSync('consolidated.json')) {
  const consolidated = JSON.parse(readFileSync('consolidated.json', 'utf8'));
  for (const { slug, spec } of consolidated) {
    const pillar = SPEC_SLUG[spec] ? `/singles-partnersuche/${SPEC_SLUG[spec]}` : '/singles-partnersuche';
    out.push({ source: `/${slug}`, destination: pillar, permanent: true });
    if (SPEC_SLUG[spec]) out.push({ source: `/singles-partnersuche/${SPEC_SLUG[spec]}/${slug}`, destination: pillar, permanent: true });
  }
  console.log(`${consolidated.length} konsolidierte Spokes → Pillar-Redirects`);
}

// Aus Persoenlichkeitsrechts-Gruenden entfernte Personen-Artikel (2026-07-20) → 301 auf den Hub.
// Wie oben: dynamicParams=false, ein geloeschter Slug waere sonst 404. Manifest: removed.json.
// Alle drei historischen URL-Varianten abdecken (flach, spec-nested, promi-aerzte-Sektion).
if (existsSync('removed.json')) {
  const removed = JSON.parse(readFileSync('removed.json', 'utf8'));
  for (const { slug, dest } of removed) {
    const d = dest || '/promi-aerzte';
    out.push({ source: `/${slug}`, destination: d, permanent: true });
    out.push({ source: `/promi-aerzte/${slug}`, destination: d, permanent: true });
    out.push({ source: `/singles-partnersuche/aerzte/${slug}`, destination: d, permanent: true });
  }
  console.log(`${removed.length} entfernte Personen-Artikel → Hub-Redirects`);
}

// TV-Serien-Artikel (series-Collection): /tv-news/* → /tv-serien/*
const SDIR = 'content/series';
const seriesIds = new Set();
for (const f of readdirSync(SDIR).filter((x) => x.endsWith('.mdoc'))) {
  const s = readFileSync(join(SDIR, f), 'utf8');
  const slug = f.replace(/\.mdoc$/, '');
  const sid = field(s, 'seriesId');
  if (!sid) continue;
  seriesIds.add(sid);
  out.push({ source: `/tv-news/${sid}/${slug}`, destination: `/tv-serien/${sid}/${slug}`, permanent: true });
}
// Serien-Hubs + TV-Index
for (const sid of seriesIds) out.push({ source: `/tv-news/${sid}`, destination: `/tv-serien/${sid}`, permanent: true });
out.push({ source: '/tv-news', destination: '/tv-serien', permanent: true });

writeFileSync('redirects.generated.json', JSON.stringify(out, null, 2));
console.log(`${out.length} Redirects generiert`);
