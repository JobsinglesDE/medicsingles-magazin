import { reader } from '@/lib/keystatic';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SeriesCard } from '@/components/content/SeriesCard';
import { PersonStarsGrid } from '@/components/content/PersonStarsGrid';

export const metadata = {
  alternates: { canonical: '/tv-serien/charite' },
  title: 'Charité — Darsteller & Hintergründe',
  description: 'Charité (ARD): Die Geschichts-Serie um das berühmte Berliner Krankenhaus 1888, 1943 und 1961. Darsteller, Rollen, historische Vorbilder und Hintergründe.',
  openGraph: {
    title: 'Charité — Darsteller & Hintergründe | Medicsingles Magazin',
    description: 'Die Darsteller hinter der ARD-Geschichtsserie über das Berliner Krankenhaus.',
  },
};

export default async function Charite() {
  const allSeries = await reader.collections.series.all();
  const articles = allSeries
    .filter((s) => s.entry.seriesId === 'charite' && s.entry.status !== 'draft')
    .sort((a, b) => String(b.entry.publishedAt ?? '').localeCompare(String(a.entry.publishedAt ?? '')));

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-brand-orange/20" />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            Charité
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Die Darsteller der ARD-Geschichtsserie — 1888, 1943 und 1961.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'TV Serien', href: '/tv-serien' },
          { label: 'Charité', href: '/tv-serien/charite' },
        ]} />

        <div className="max-w-3xl mt-8 mb-10">
          <p className="text-foreground/80 leading-relaxed">
            «Charité» erzählt die Geschichte des berühmten Berliner Krankenhauses in drei Epochen:
            der Pionierzeit der Medizin um 1888, den dunklen Jahren 1943 und dem geteilten Berlin 1961.
            Hier findest du Porträts der Darsteller, ihre historischen Vorbilder und Hintergründe.
          </p>
        </div>

        <PersonStarsGrid show="charite" />

        <h2 className="text-xl font-bold mb-6">Alle Artikel</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <SeriesCard
                key={article.slug}
                title={article.entry.title}
                excerpt={article.entry.excerpt}
                href={`/tv-serien/charite/${article.slug}`}
                image={article.entry.featuredImage || undefined}
                imageAlt={article.entry.featuredImageAlt || undefined}
                seriesLabel="Charité"
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
