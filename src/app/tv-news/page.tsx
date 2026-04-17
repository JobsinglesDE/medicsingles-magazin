import { reader } from '@/lib/keystatic';
import { SeriesCard } from '@/components/content/SeriesCard';

export const metadata = {
  title: "TV Serien — Grey's Anatomy & Junge Ärzte | Medicsingles Magazin",
  description: "Hintergrund-Storys zu Grey's Anatomy und In aller Freundschaft — Die jungen Ärzte: was die Darsteller privat machen, Drehorte und neue Staffeln.",
  openGraph: {
    title: "TV Serien — Grey's Anatomy & Junge Ärzte | Medicsingles Magazin",
    description: "Hintergrund-Storys zu Grey's Anatomy und In aller Freundschaft — Die jungen Ärzte.",
  },
};

export default async function TVNews() {
  const allSeries = await reader.collections.series.all();
  const published = allSeries.filter((s) => s.entry.status !== 'draft');

  const greysAnatomy = published.filter((s) => s.entry.seriesId === 'greys-anatomy');
  const jungeAerzte = published.filter((s) => s.entry.seriesId === 'junge-aerzte');

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 particle-overlay opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 particle-text">
            <span className="text-brand-orange">TV</span> Serien
          </h1>
          <div className="flex justify-center gap-8 mb-4">
            <span className="text-sm md:text-base font-semibold text-foreground/70 uppercase tracking-widest">Grey&apos;s Anatomy</span>
            <span className="text-foreground/30">·</span>
            <span className="text-sm md:text-base font-semibold text-foreground/70 uppercase tracking-widest">Junge Ärzte</span>
          </div>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
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
                href={`/tv-news/greys-anatomy/${article.slug}`}
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
                href={`/tv-news/junge-aerzte/${article.slug}`}
                image={article.entry.featuredImage || undefined}
                imageAlt={article.entry.featuredImageAlt || undefined}
                seriesLabel="Junge Ärzte"
              />
            ))}
          </div>
        ) : (
          <p className="text-foreground/50">Artikel folgen in Kürze.</p>
        )}
      </section>
    </>
  );
}
