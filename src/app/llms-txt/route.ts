import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';

const BASE = 'https://medicsingles.de/magazin';

export async function GET() {
  const [articles, regional, series, stories, bekanntschaften] = await Promise.all([
    reader.collections.articles.all(),
    reader.collections.regional.all(),
    reader.collections.series.all(),
    reader.collections.stories.all(),
    reader.collections.bekanntschaften.all(),
  ]);

  const published = {
    articles: articles.filter((a) => a.entry.status !== 'draft'),
    regional,
    series: series.filter((s) => s.entry.status !== 'draft'),
    stories,
    bekanntschaften,
  };

  const lines: string[] = [];

  lines.push('# Blaulicht Magazin — medicsingles.de');
  lines.push('');
  lines.push('Dating-Magazin für Blaulicht-Singles: Polizei, Feuerwehr, Sanität und Ärzte in der Schweiz.');
  lines.push('Partnersuche-Tipps, regionale Guides für alle Kantone, Erfolgsgeschichten und TV-News');
  lines.push('zu «Tatort» Zürich und Der Bergdoktor.');
  lines.push('');
  lines.push('## Sitemaps');
  lines.push('');
  lines.push(`- [XML Sitemap](${BASE}/sitemap.xml): Alle öffentlichen URLs`);
  lines.push(`- [News Sitemap](${BASE}/news-sitemap.xml): Aktuelle Artikel (letzte 48h)`);
  lines.push('');

  // Articles (Partnersuche)
  lines.push('## Partnersuche & Dating');
  lines.push('');
  for (const a of published.articles) {
    const url = `${BASE}${getArticleUrl(a.slug, a.entry.type, a.entry.series)}`;
    const desc = a.entry.excerpt || a.entry.seoDescription || '';
    lines.push(`- [${a.entry.title}](${url})${desc ? ` - ${desc}` : ''}`);
  }
  lines.push('');

  // Series (TV-News)
  lines.push('## TV-News — «Tatort» Zürich & Der Bergdoktor');
  lines.push('');
  for (const s of published.series) {
    const url = `${BASE}/tv-news/${s.entry.seriesId}/${s.slug}`;
    const desc = s.entry.excerpt || s.entry.seoDescription || '';
    lines.push(`- [${s.entry.title}](${url})${desc ? ` - ${desc}` : ''}`);
  }
  lines.push('');

  // Regional
  lines.push('## Regionale Guides — Kantone & Städte');
  lines.push('');
  for (const r of published.regional) {
    const kanton = r.entry.kanton.toLowerCase().replace(/\s+/g, '-');
    const url = `${BASE}/regional/${kanton}/${r.slug}`;
    const desc = r.entry.excerpt || r.entry.seoDescription || '';
    lines.push(`- [${r.entry.title}](${url})${desc ? ` - ${desc}` : ''}`);
  }
  lines.push('');

  // Bekanntschaften
  lines.push('## Bekanntschaften — Städte');
  lines.push('');
  for (const b of published.bekanntschaften) {
    const url = `${BASE}/regional/bekanntschaften/${b.slug}`;
    const desc = b.entry.excerpt || b.entry.seoDescription || '';
    lines.push(`- [${b.entry.title}](${url})${desc ? ` - ${desc}` : ''}`);
  }
  lines.push('');

  // Erfolgsgeschichten
  lines.push('## Erfolgsgeschichten');
  lines.push('');
  for (const s of published.stories) {
    const url = `${BASE}/erfolgsgeschichten/${s.slug}`;
    const desc = s.entry.excerpt || s.entry.seoDescription || '';
    lines.push(`- [${s.entry.title}](${url})${desc ? ` - ${desc}` : ''}`);
  }
  lines.push('');

  lines.push('## Kontakt');
  lines.push('');
  lines.push('- Website: https://medicsingles.de');
  lines.push('- Magazin: https://medicsingles.de/magazin');
  lines.push('- Netzwerk: JobSingles.de — Dating für Berufe');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
