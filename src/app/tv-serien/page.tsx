import Image from 'next/image';
import { reader } from '@/lib/keystatic';
import { SeriesCard } from '@/components/content/SeriesCard';

export const metadata = {
  alternates: { canonical: '/tv-serien' },
  title: "TV Serien — Grey's Anatomy & Junge Ärzte",
  description: "Hintergrund-Storys zu Grey's Anatomy und Junge Ärzte: Darsteller, Privatleben, Drehorte, neue Staffeln und Dating-Perspektiven aus dem Klinikalltag.",
  openGraph: {
    title: "TV Serien — Grey's Anatomy & Junge Ärzte | Medicsingles Magazin",
    description: "Hintergrund-Storys zu Grey's Anatomy und In aller Freundschaft — Die jungen Ärzte.",
    images: [{ url: '/images/hero-tv-news.webp', width: 2880, height: 1536, alt: 'Chirurgin im OP und Klinik-Arzt im Korridor — Split-Frame zu Grey’s Anatomy und Junge Ärzte' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/hero-tv-news.webp'] },
};

export default async function TVNews() {
  const allSeries = await reader.collections.series.all();
  const byDateDesc = (a: { entry: { publishedAt?: string | null } }, b: { entry: { publishedAt?: string | null } }) =>
    String(b.entry.publishedAt ?? '').localeCompare(String(a.entry.publishedAt ?? ''));
  const published = allSeries.filter((s) => s.entry.status !== 'draft').sort(byDateDesc);

  const greysAnatomy = published.filter((s) => s.entry.seriesId === 'greys-anatomy');
  const jungeAerzte = published.filter((s) => s.entry.seriesId === 'junge-aerzte');
  const inAllerFreundschaft = published.filter((s) => s.entry.seriesId === 'in-aller-freundschaft');
  const drNice = published.filter((s) => s.entry.seriesId === 'dr-nice');

  return (
    <>
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-tv-news.webp"
            alt="Chirurgin im OP und Klinik-Arzt im Korridor — Split-Frame zu Grey’s Anatomy und Junge Ärzte"
            width={2880}
            height={1536}
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 30%' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            <span className="text-brand-orange">TV —</span> News
          </h1>
          <div className="flex justify-center gap-8 mb-2">
            <span className="text-sm md:text-base font-semibold text-white/90 uppercase tracking-widest drop-shadow">Grey&apos;s Anatomy</span>
            <span className="text-white/40">·</span>
            <span className="text-sm md:text-base font-semibold text-white/90 uppercase tracking-widest drop-shadow">Junge Ärzte</span>
          </div>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Hintergrund-Storys, Drehorte und was die Darsteller privat machen.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6">Grey&apos;s Anatomy</h2>
        {greysAnatomy.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {greysAnatomy.map((article) => (
              <SeriesCard
                key={article.slug}
                title={article.entry.title}
                excerpt={article.entry.excerpt}
                href={`/tv-serien/greys-anatomy/${article.slug}`}
                image={article.entry.featuredImage || undefined}
                imageAlt={article.entry.featuredImageAlt || undefined}
                seriesLabel="Grey's Anatomy"
              />
            ))}
          </div>
        ) : (
          <p className="text-foreground/50 mb-16">Artikel folgen in Kürze.</p>
        )}

        <h2 className="text-2xl font-bold mb-6">In aller Freundschaft — Die jungen Ärzte</h2>
        {jungeAerzte.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jungeAerzte.map((article) => (
              <SeriesCard
                key={article.slug}
                title={article.entry.title}
                excerpt={article.entry.excerpt}
                href={`/tv-serien/junge-aerzte/${article.slug}`}
                image={article.entry.featuredImage || undefined}
                imageAlt={article.entry.featuredImageAlt || undefined}
                seriesLabel="Junge Ärzte"
              />
            ))}
          </div>
        ) : (
          <p className="text-foreground/50">Artikel folgen in Kürze.</p>
        )}

        <h2 className="text-2xl font-bold mb-6 mt-16">
          <a href="/tv-serien/in-aller-freundschaft" className="hover:text-brand-orange transition-colors">In aller Freundschaft</a>
        </h2>
        {inAllerFreundschaft.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inAllerFreundschaft.map((article) => (
              <SeriesCard
                key={article.slug}
                title={article.entry.title}
                excerpt={article.entry.excerpt}
                href={`/tv-serien/in-aller-freundschaft/${article.slug}`}
                image={article.entry.featuredImage || undefined}
                imageAlt={article.entry.featuredImageAlt || undefined}
                seriesLabel="In aller Freundschaft"
              />
            ))}
          </div>
        ) : (
          <p className="text-foreground/50">Cast-Porträts der Sachsenklinik — <a href="/tv-serien/in-aller-freundschaft" className="text-brand-orange hover:underline">zu den Darstellern →</a></p>
        )}

        <h2 className="text-2xl font-bold mb-6 mt-16">
          <a href="/tv-serien/dr-nice" className="hover:text-brand-orange transition-colors">Dr. Nice</a>
        </h2>
        {drNice.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {drNice.map((article) => (
              <SeriesCard
                key={article.slug}
                title={article.entry.title}
                excerpt={article.entry.excerpt}
                href={`/tv-serien/dr-nice/${article.slug}`}
                image={article.entry.featuredImage || undefined}
                imageAlt={article.entry.featuredImageAlt || undefined}
                seriesLabel="Dr. Nice"
              />
            ))}
          </div>
        ) : (
          <p className="text-foreground/50">Patrick Kalupa &amp; das Team — <a href="/tv-serien/dr-nice" className="text-brand-orange hover:underline">zu den Darstellern →</a></p>
        )}
      </section>
    </>
  );
}
