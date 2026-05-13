import type { MetadataRoute } from 'next';
import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';

const BASE = 'https://medicsingles.de/magazin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, regional, series, stories, authors, aerztekammern, aerztestammtische, unikliniken, jungeFG] = await Promise.all([
    reader.collections.articles.all(),
    reader.collections.regional.all(),
    reader.collections.series.all(),
    reader.collections.stories.all(),
    reader.collections.authors.all(),
    reader.collections.aerztekammern.all(),
    reader.collections.aerztestammtische.all(),
    reader.collections.unikliniken.all(),
    reader.collections.jungeFachgesellschaften.all(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/singles-partnersuche`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/tv-news`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/tv-news/greys-anatomy`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/tv-news/junge-aerzte`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE}/ueber-uns`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/regional`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/aerztekammern`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/aerztestammtische`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/unikliniken`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/junge-fachgesellschaften`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/junge-fachgesellschaften/themen/bjae-buendnis-junge-aerzte`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/junge-fachgesellschaften/themen/summer-schools-mediziner`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/junge-fachgesellschaften/themen/mentoring-programme-aerzte`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/junge-fachgesellschaften/themen/stipendien-junge-aerzte`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/erfolgsgeschichten`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/kontakt`, priority: 0.4, changeFrequency: 'yearly' },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}${getArticleUrl(a.slug, a.entry.type, a.entry.series)}`,
    lastModified: a.entry.publishedAt ? new Date(a.entry.publishedAt) : undefined,
    priority: a.entry.type === 'cluster' ? 0.8 : 0.7,
    changeFrequency: 'monthly',
  }));

  // Regional: collect unique kantons for pillar pages
  const kantons = [...new Set(regional.map((r) => r.entry.kanton.toLowerCase().replace(/\s+/g, '-')))];
  const kantonPages: MetadataRoute.Sitemap = kantons.map((k) => ({
    url: `${BASE}/regional/${k}`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  const regionalPages: MetadataRoute.Sitemap = regional.map((r) => ({
    url: `${BASE}/regional/${r.entry.kanton.toLowerCase().replace(/\s+/g, '-')}/${r.slug}`,
    lastModified: r.entry.publishedAt ? new Date(r.entry.publishedAt) : undefined,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  const seriesPages: MetadataRoute.Sitemap = series
    .filter((s) => s.entry.status !== 'draft')
    .map((s) => ({
      url: `${BASE}/tv-news/${s.entry.seriesId}/${s.slug}`,
      lastModified: s.entry.publishedAt ? new Date(s.entry.publishedAt) : undefined,
      priority: 0.6,
      changeFrequency: 'monthly',
    }));

  const storyPages: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${BASE}/erfolgsgeschichten/${s.slug}`,
    lastModified: s.entry.publishedAt ? new Date(s.entry.publishedAt) : undefined,
    priority: 0.5,
    changeFrequency: 'yearly',
  }));

  const authorPages: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${BASE}/autor/${a.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  // Ärztekammern: per-bundesland pillar + per-stadt detail
  const kammerBundeslaender = [...new Set(aerztekammern.map((a) => a.entry.bundesland))];
  const kammerBundeslandPages: MetadataRoute.Sitemap = kammerBundeslaender.map((b) => ({
    url: `${BASE}/singles-regional/aerztekammern/${b}`,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));
  const kammerPages: MetadataRoute.Sitemap = aerztekammern.map((a) => ({
    url: `${BASE}/singles-regional/aerztekammern/${a.entry.bundesland}/${a.entry.stadt}`,
    lastModified: a.entry.publishedAt ? new Date(a.entry.publishedAt) : undefined,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  // Ärztestammtische: per-bundesland pillar + per-stadt detail
  const stammtischBundeslaender = [...new Set(aerztestammtische.map((a) => a.entry.bundesland))];
  const stammtischBundeslandPages: MetadataRoute.Sitemap = stammtischBundeslaender.map((b) => ({
    url: `${BASE}/singles-regional/aerztestammtische/${b}`,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));
  const stammtischPages: MetadataRoute.Sitemap = aerztestammtische.map((a) => ({
    url: `${BASE}/singles-regional/aerztestammtische/${a.entry.bundesland}/${a.entry.stadt}`,
    lastModified: a.entry.publishedAt ? new Date(a.entry.publishedAt) : undefined,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  // Unikliniken: per-bundesland pillar + per-stadt detail
  const uniBundeslaender = [...new Set(unikliniken.map((a) => a.entry.bundesland))];
  const uniBundeslandPages: MetadataRoute.Sitemap = uniBundeslaender.map((b) => ({
    url: `${BASE}/singles-regional/unikliniken/${b}`,
    priority: 0.6, changeFrequency: 'monthly',
  }));
  const uniPages: MetadataRoute.Sitemap = unikliniken
    .filter((a) => a.entry.status === 'published')
    .map((a) => ({
      url: `${BASE}/singles-regional/unikliniken/${a.entry.bundesland}/${a.entry.stadt}`,
      lastModified: a.entry.publishedAt ? new Date(a.entry.publishedAt) : undefined,
      priority: 0.6, changeFrequency: 'monthly',
    }));

  // Junge Fachgesellschaften: pillar + detail
  const jungeFGPages: MetadataRoute.Sitemap = jungeFG
    .filter((a) => a.entry.status === 'published')
    .map((a) => ({
      url: `${BASE}/singles-regional/junge-fachgesellschaften/${a.slug}`,
      lastModified: a.entry.publishedAt ? new Date(a.entry.publishedAt) : undefined,
      priority: 0.7, changeFrequency: 'monthly',
    }));

  return [
    ...staticPages,
    ...articlePages,
    ...kantonPages,
    ...regionalPages,
    ...seriesPages,
    ...storyPages,
    ...authorPages,
    ...kammerBundeslandPages,
    ...kammerPages,
    ...stammtischBundeslandPages,
    ...stammtischPages,
    ...uniBundeslandPages,
    ...uniPages,
    ...jungeFGPages,
  ];
}
