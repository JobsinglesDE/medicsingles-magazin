// scripts/gen-redirects.mjs — 301-Redirects auf das 3-Sektionen-Modell.
// articles: flach /{slug} → /singles-partnersuche/{spec}/{slug} (spiegelt routes.ts).
// series:   /tv-news/{seriesId}/{slug} → /tv-serien/{seriesId}/{slug}.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
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

  const dest = spec ? `/singles-partnersuche/${spec}/${slug}` : '/singles-partnersuche';
  if (dest !== `/${slug}`) out.push({ source: `/${slug}`, destination: dest, permanent: true });
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
