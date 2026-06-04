import { reader } from '@/lib/keystatic';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SeriesCard } from '@/components/content/SeriesCard';
import { PersonStarsGrid } from '@/components/content/PersonStarsGrid';

export const metadata = {
  alternates: { canonical: '/tv-serien/in-aller-freundschaft' },
  title: 'In aller Freundschaft — News & Darsteller',
  description: 'In aller Freundschaft (ARD): Thomas Rühmann als Dr. Roland Heilmann, die Darsteller der Sachsenklinik und das Privatleben der Stars. News und Hintergründe.',
  openGraph: {
    title: 'In aller Freundschaft — News & Darsteller | Medicsingles Magazin',
    description: 'Die Darsteller der Sachsenklinik aus der ARD-Kultserie.',
  },
};

export default async function InAllerFreundschaft() {
  const allSeries = await reader.collections.series.all();
  const articles = allSeries
    .filter((s) => s.entry.seriesId === 'in-aller-freundschaft' && s.entry.status !== 'draft')
    .sort((a, b) => String(b.entry.publishedAt ?? '').localeCompare(String(a.entry.publishedAt ?? '')));

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-brand-orange/20" />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            In aller <span className="text-brand-orange">Freundschaft</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Die Darsteller der Sachsenklinik — seit 1998 im Ersten.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'TV Serien', href: '/tv-serien' },
          { label: 'In aller Freundschaft', href: '/tv-serien/in-aller-freundschaft' },
        ]} />

        <div className="max-w-3xl mt-8 mb-10">
          <p className="text-foreground/80 leading-relaxed">
            Seit 1998 läuft «In aller Freundschaft» im Ersten — die Geschichten rund um die
            Leipziger Sachsenklinik gehören zu den erfolgreichsten Serien im deutschen Fernsehen.
            Hier findest du Porträts der Darsteller, Hintergründe und News.
          </p>
        </div>

        <PersonStarsGrid show="in-aller-freundschaft" />

        <h2 className="text-xl font-bold mb-6">Alle Artikel</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
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
          <p className="text-foreground/50">Artikel folgen in Kürze.</p>
        )}

        <div className="mt-8">
          <Link href="/tv-serien" className="text-brand-orange font-semibold hover:underline text-sm">
            ← Zurück zu TV Serien
          </Link>
        </div>
      </section>
    </div>
  );
}
