import { reader } from '@/lib/keystatic';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SeriesCard } from '@/components/content/SeriesCard';
import { PersonStarsGrid } from '@/components/content/PersonStarsGrid';

export const metadata = {
  alternates: { canonical: '/tv-serien/dr-nice' },
  title: 'Dr. Nice — News & Darsteller',
  description: 'Dr. Nice (ZDF): Patrick Kalupa als charmanter Mediziner, die Darsteller hinter der Serie und das Privatleben der Stars. News, Drehorte und Hintergründe.',
  openGraph: {
    title: 'Dr. Nice — News & Darsteller | Medicsingles Magazin',
    description: 'Patrick Kalupa und das Team hinter der ZDF-Serie Dr. Nice.',
  },
};

export default async function DrNice() {
  const allSeries = await reader.collections.series.all();
  const articles = allSeries
    .filter((s) => s.entry.seriesId === 'dr-nice' && s.entry.status !== 'draft')
    .sort((a, b) => String(b.entry.publishedAt ?? '').localeCompare(String(a.entry.publishedAt ?? '')));

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-brand-orange/20" />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            <span className="text-brand-orange">Dr.</span> Nice
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Patrick Kalupa und die Darsteller hinter der ZDF-Serie.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'TV Serien', href: '/tv-serien' },
          { label: 'Dr. Nice', href: '/tv-serien/dr-nice' },
        ]} />

        <div className="max-w-3xl mt-8 mb-10">
          <p className="text-foreground/80 leading-relaxed">
            «Dr. Nice» ist die ZDF-Serie um einen Mediziner, der mit Charme und Empathie auch
            die kniffligsten Fälle löst. Wer steckt hinter den Figuren? Hier findest du
            Porträts der Darsteller, Hintergründe und News rund um die Serie.
          </p>
        </div>

        <PersonStarsGrid show="dr-nice" />

        <h2 className="text-xl font-bold mb-6">Alle Artikel</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
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
