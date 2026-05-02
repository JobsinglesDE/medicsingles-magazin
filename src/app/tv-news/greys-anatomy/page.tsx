import { reader } from '@/lib/keystatic';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SeriesCard } from '@/components/content/SeriesCard';
import { SendetermineWidget } from '@/components/content/SendetermineWidget';

export const metadata = {
  alternates: { canonical: '/tv-news/greys-anatomy' },
  title: "Grey's Anatomy — News & Hintergründe",
  description: "Grey's Anatomy: Ellen Pompeo, die Darsteller und das Privatleben der Stars aus Grey Sloan Memorial — neue Staffeln, Drehorte und Dating-Perspektiven.",
  openGraph: {
    title: "Grey's Anatomy — News & Hintergründe | Medicsingles Magazin",
    description: "Ellen Pompeo und das Privatleben der Stars aus Grey Sloan Memorial.",
  },
};

export default async function GreysAnatomy() {
  const allSeries = await reader.collections.series.all();
  const articles = allSeries
    .filter((s) => s.entry.seriesId === 'greys-anatomy' && s.entry.status !== 'draft')
    .sort((a, b) => String(b.entry.publishedAt ?? '').localeCompare(String(a.entry.publishedAt ?? '')));

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-brand-orange/20" />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            Grey&apos;s <span className="text-brand-orange">Anatomy</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Ellen Pompeo und das Privatleben der Stars aus Grey Sloan Memorial.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'TV Serien', href: '/tv-news' },
          { label: "Grey's Anatomy", href: '/tv-news/greys-anatomy' },
        ]} />

        <div className="max-w-3xl mt-8 mb-10">
          <p className="text-foreground/80 leading-relaxed">
            Was machen Ellen Pompeo, Sandra Oh und die anderen Darsteller, wenn die Kamera aus ist?
            Hinter den Kulissen von Grey Sloan Memorial — echte Beziehungen, neue Projekte und
            ehrliche Einblicke aus der Welt der Chirurgen und Ärzte.
          </p>
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <SendetermineWidget seriesId="greys-anatomy" />
        </div>

        <h2 className="text-xl font-bold mb-6">Alle Artikel</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
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
