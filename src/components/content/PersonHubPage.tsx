import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { JsonLd, personJsonLd, faqJsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
import { ClusterHero } from '@/components/content/ClusterHero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleBody } from '@/components/content/ArticleBody';
import { SteckbriefTable } from '@/components/content/SteckbriefTable';
import { SeriesCard } from '@/components/content/SeriesCard';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { HeartButton } from '@/components/ui/HeartButton';
import { getSeriesUrl, getPersonHubUrl } from '@/lib/routes';

const SITE_BASE = 'https://medicsingles.de/magazin';

const SHOW_LABELS: Record<string, string> = {
  'greys-anatomy': "Grey's Anatomy",
  'junge-aerzte': 'Die jungen Ärzte',
  'in-aller-freundschaft': 'In aller Freundschaft',
  'dr-nice': 'Dr. Nice',
};

interface PersonHubPageProps {
  slug: string;
  show: string;
}

export async function PersonHubPage({ slug, show }: PersonHubPageProps) {
  const person = await reader.collections.persons.read(slug, { resolveLinkedFiles: true });
  if (!person || person.status === 'draft') notFound();

  const showLabel = SHOW_LABELS[show] ?? show;
  const personUrl = `${SITE_BASE}${getPersonHubUrl(slug, show)}`;

  // Aggregate all series articles linked to this person
  const allSeries = await reader.collections.series.all();
  const relatedArticles = allSeries
    .filter((s) => ((s.entry.person as string[]) ?? []).includes(slug) && s.entry.status !== 'draft')
    .sort((a, b) =>
      String(b.entry.publishedAt ?? '').localeCompare(String(a.entry.publishedAt ?? ''))
    );

  const author = (person as any).author
    ? await reader.collections.authors.read((person as any).author)
    : null;

  const hasFaq = person.faqItems && person.faqItems.length > 0;
  const hasTakeaways = person.takeaways && (person.takeaways as string[]).length > 0;
  const hasSteckbrief = person.steckbrief && person.steckbrief.length > 0;

  const articleListItems = relatedArticles.map((s) => ({
    name: s.entry.title,
    url: `${SITE_BASE}${getSeriesUrl(show, s.slug)}`,
  }));

  return (
    <>
      {/* JSON-LD: Person */}
      <JsonLd
        data={personJsonLd({
          name: person.name,
          role: person.role || undefined,
          image: person.featuredImage || undefined,
          url: personUrl,
        })}
      />

      {/* JSON-LD: FAQ */}
      {hasFaq && <JsonLd data={faqJsonLd(person.faqItems as { question: string; answer: string }[])} />}

      {/* JSON-LD: CollectionPage (article list) */}
      {articleListItems.length > 0 && (
        <JsonLd
          data={collectionPageJsonLd({
            name: `Alle Artikel zu ${person.name}`,
            description: person.intro || `Artikel über ${person.name} aus ${showLabel}`,
            url: personUrl,
            items: articleListItems,
          })}
        />
      )}

      {/* Hero */}
      <ClusterHero
        title={person.name}
        excerpt={person.intro || undefined}
        category={showLabel}
        image={person.featuredImage || undefined}
        imageAlt={person.featuredImageAlt || undefined}
        imageCredit={person.featuredImageCredit || undefined}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'TV Serien', href: '/tv-serien' },
            { label: showLabel, href: `/tv-serien/${show}` },
            { label: person.name, href: getPersonHubUrl(slug, show) },
          ]}
        />

        {/* Credit line */}
        {person.creditLine && (
          <p className="text-xs text-foreground/40 mt-3 mb-0">{person.creditLine}</p>
        )}

        {/* Steckbrief */}
        {hasSteckbrief && (
          <SteckbriefTable
            rows={(person.steckbrief as { label: string; value: string }[])}
          />
        )}

        {/* Bio (Markdoc) */}
        <ArticleBody content={person.bio} />

        {/* Takeaways */}
        {hasTakeaways && (
          <TakeawayBox items={person.takeaways as string[]} />
        )}

        {/* Aggregated articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Alle Artikel zu {person.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((article) => (
                <SeriesCard
                  key={article.slug}
                  title={article.entry.title}
                  excerpt={article.entry.excerpt}
                  href={getSeriesUrl(show, article.slug)}
                  image={article.entry.featuredImage || undefined}
                  imageAlt={article.entry.featuredImageAlt || undefined}
                  seriesLabel={showLabel}
                />
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {hasFaq && (
          <>
            <h2 id="haeufige-fragen" className="text-2xl font-bold mt-16 mb-2 scroll-mt-24">
              Häufige Fragen
            </h2>
            <FAQAccordion items={person.faqItems as { question: string; answer: string }[]} />
          </>
        )}

        {/* Author Bio */}
        {author && (
          <AuthorBio
            name={author.name}
            slug={(person as any).author || undefined}
            role={author.role}
            bio={author.bio}
            avatar={author.avatar || undefined}
            socialLinks={author.socialLinks}
          />
        )}

        {/* Pillar Backlink (Show-Hub) */}
        <div className="mt-12 mb-8 rounded-xl border border-white/10 bg-surface p-6 ambient-shadow">
          <p className="font-bold text-foreground mb-1">Mehr aus {showLabel}</p>
          <p className="text-sm text-foreground/70 mb-4">
            Alle News, Cast-Porträts und Hintergründe zu {showLabel} im Überblick.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/tv-serien/${show}`}
              className="inline-flex items-center gap-2 bg-brand-orange text-white font-semibold rounded-full px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
            >
              Zu allen {showLabel}-Artikeln →
            </Link>
            <Link
              href="/tv-serien"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-foreground px-5 py-2.5 transition-colors"
            >
              Alle TV-Serien →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <HeartButton href={`https://medicsingles.de/?AID=MedicMagazin-${show}`}>
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </div>
      </div>
    </>
  );
}
