import { reader } from '@/lib/keystatic';
import { ArticleCard } from '@/components/content/ArticleCard';

export const metadata = {
  alternates: { canonical: \'/erfolgsgeschichten\' },
  title: 'Erfolgsgeschichten — Medicsingles Magazin',
  description: 'Echte Liebesgeschichten von Medicsingles.de — Ärzte, Pflegekräfte und Therapeuten, die ihre Partner im Gesundheitswesen gefunden haben.',
  openGraph: {
    title: 'Erfolgsgeschichten — Medicsingles Magazin',
    description: 'Echte Paare aus dem Gesundheitswesen. Keine inszenierten Storys — Menschen, die ihren Alltag im Kittel teilen.',
  },
};

export default async function Erfolgsgeschichten() {
  const allArticles = await reader.collections.articles.all();
  const stories = allArticles.filter(
    (a) => a.entry.type === 'story' && a.entry.status === 'published'
  );

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 particle-overlay opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 particle-text">Erfolgsgeschichten</h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Echte Paare. Echte Geschichten. So findet Medizin die Liebe.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-4">
        <div className="space-y-4 text-foreground/75 leading-relaxed">
          <p>
            Echte Paare, die sich über Medicsingles.de gefunden haben. Keine Werbesprüche, keine inszenierten Models —
            sondern Menschen, die im Berufsalltag mit Schichtdienst, Notaufnahme und 60-Stunden-Wochen leben.
            Ihre Geschichten zeigen, dass Partnersuche im medizinischen Umfeld funktioniert.
          </p>
          <p>
            Was sie eint: beide Seiten verstehen, was der andere beruflich durchmacht — und beide haben bewusst
            eine Plattform gewählt, die darauf zugeschnitten ist.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="sr-only">Erfolgsgeschichten unserer Mitglieder</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <ArticleCard
              key={story.slug}
              title={story.entry.title}
              excerpt={story.entry.excerpt}
              href={`/${story.slug}`}
              image={story.entry.featuredImage || undefined}
              imageAlt={story.entry.featuredImageAlt || undefined}
              date={story.entry.publishedAt || undefined}
            />
          ))}
        </div>
        {stories.length === 0 && (
          <p className="text-foreground/50 text-center py-12">Erfolgsgeschichten folgen in Kürze.</p>
        )}
      </section>
    </>
  );
}
