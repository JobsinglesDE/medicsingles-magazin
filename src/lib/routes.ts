import { SPEC_SLUG } from './hubs';

/**
 * Kanonische Artikel-URL aus der specialization (Hub-Treiber).
 * - specialization gesetzt → /singles-partnersuche/{spec-slug}/{slug}
 * - sonst → /singles-partnersuche/{slug}
 */
export function getArticleUrl(slug: string, specialization?: string): string {
  const spec = specialization && SPEC_SLUG[specialization];
  return spec ? `/singles-partnersuche/${spec}/${slug}` : `/singles-partnersuche/${slug}`;
}

/** URL eines TV-Serien-Artikels (series-Collection). */
export function getSeriesUrl(seriesId: string, slug: string): string {
  return `/tv-serien/${seriesId}/${slug}`;
}

/** URL eines Personen-Hubs (persons-Collection). */
export function getPersonHubUrl(slug: string, show: string = 'junge-aerzte'): string {
  return `/tv-serien/${show}/person/${slug}`;
}

/** Helfer: Artikel-URL aus einem Keystatic-Collection-Item ({slug, entry}). */
export function articleHref(item: {
  slug: string;
  entry: { specialization?: string };
}): string {
  return getArticleUrl(item.slug, item.entry.specialization);
}
