import { reader } from '@/lib/keystatic';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SeriesCard } from '@/components/content/SeriesCard';
import { SendetermineWidget } from '@/components/content/SendetermineWidget';

export const metadata = {
  alternates: { canonical: '/tv-news/junge-aerzte' },
  title: 'In aller Freundschaft — Die jungen Ärzte',
  description: 'Die jungen Ärzte: Darsteller hinter der ARD-Serie, neue Staffeln und was die jungen Mediziner privat machen. News, Drehorte und Hintergründe.',
  openGraph: {
    title: 'In aller Freundschaft — Die jungen Ärzte | Medicsingles Magazin',
    description: 'Die Darsteller hinter der ARD-Serie und das Privatleben der jungen Mediziner.',
  },
};

export default async function JungeAerzte() {
  const allSeries = await reader.collections.series.all();
  const articles = allSeries
    .filter((s) => s.entry.seriesId === 'junge-aerzte' && s.entry.status !== 'draft')
    .sort((a, b) => String(b.entry.publishedAt ?? '').localeCompare(String(a.entry.publishedAt ?? '')));

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-brand-orange/20" />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            <span className="text-brand-orange">Junge</span> Ärzte
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            In aller Freundschaft — die Darsteller hinter der ARD-Serie.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'TV Serien', href: '/tv-news' },
          { label: 'Junge Ärzte', href: '/tv-news/junge-aerzte' },
        ]} />

        <div className="max-w-3xl mt-8 mb-10">
          <p className="text-foreground/80 leading-relaxed">
            Was machen die Darsteller von &quot;In aller Freundschaft — Die jungen Ärzte&quot;, wenn die
            Kamera nicht läuft? Hinter den Kulissen der beliebten ARD-Serie — echte Beziehungen,
            neue Projekte und Einblicke aus dem Leben der jungen Mediziner.
          </p>
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <SendetermineWidget seriesId="junge-aerzte" />
        </div>

        <h2 className="text-xl font-bold mb-6">Alle Artikel</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
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

        <div className="mt-8">
          <Link href="/tv-news" className="text-brand-orange font-semibold hover:underline text-sm">
            ← Zurück zu TV Serien
          </Link>
        </div>
      </section>
    </div>
  );
}
