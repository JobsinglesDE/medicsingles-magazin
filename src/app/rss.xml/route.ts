import { reader } from '@/lib/keystatic';

const BASE = 'https://medicsingles.de/magazin';
const SITE_TITLE = 'Medicsingles Magazin';
const SITE_DESCRIPTION = 'Partnersuche für Ärzte, Pflege & Therapeuten — Guides, Erfolgsgeschichten und Dating-Tipps aus dem Gesundheitswesen.';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const [articles, series] = await Promise.all([
    reader.collections.articles.all(),
    reader.collections.series.all(),
  ]);

  type FeedItem = { url: string; title: string; description: string; date: string };
  const items: FeedItem[] = [];

  for (const a of articles) {
    if (a.entry.status !== 'published' || !a.entry.publishedAt) continue;
    items.push({
      url: `${BASE}/${a.slug}`,
      title: a.entry.title,
      description: a.entry.excerpt || '',
      date: new Date(a.entry.publishedAt).toUTCString(),
    });
  }

  for (const s of series) {
    if (s.entry.status === 'draft' || !s.entry.publishedAt) continue;
    items.push({
      url: `${BASE}/tv-news/${s.entry.seriesId}/${s.slug}`,
      title: s.entry.title,
      description: s.entry.excerpt || '',
      date: new Date(s.entry.publishedAt).toUTCString(),
    });
  }

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>de</language>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.slice(0, 50).map((item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.date}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
