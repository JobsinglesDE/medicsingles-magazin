import { SPEC_SLUG } from './hubs';

/**
 * Kanonische Artikel-URL.
 * - section==='promi-aerzte' → /promi-aerzte/{slug} (eigene Sektion, hat Vorrang)
 * - specialization gesetzt → /singles-partnersuche/{spec-slug}/{slug}
 * - sonst → /singles-partnersuche/{slug}
 */
export function getArticleUrl(slug: string, specialization?: string, section?: string): string {
  if (section === 'promi-aerzte') return `/promi-aerzte/${slug}`;
  const spec = specialization && SPEC_SLUG[specialization];
  return spec ? `/singles-partnersuche/${spec}/${slug}` : `/singles-partnersuche/${slug}`;
}

/** URL eines TV-Serien-Artikels (series-Collection). */
export function getSeriesUrl(seriesId: string, slug: string): string {
  return `/tv-serien/${seriesId}/${slug}`;
}

/** URL eines TV-Cast-Personen-Hubs (persons-Collection, personType='tv-cast'). */
export function getPersonHubUrl(slug: string, show: string = 'junge-aerzte'): string {
  return `/tv-serien/${show}/person/${slug}`;
}

/** URL eines Promi-Arzt-Personen-Hubs (persons-Collection, personType='promi-arzt'). */
export function getDoctorHubUrl(slug: string): string {
  return `/aerzte/${slug}`;
}

/** Helfer: Artikel-URL aus einem Keystatic-Collection-Item ({slug, entry}). */
export function articleHref(item: {
  slug: string;
  entry: { specialization?: string; section?: string };
}): string {
  return getArticleUrl(item.slug, item.entry.specialization, item.entry.section);
}
