import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reader } from '@/lib/keystatic';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { StickyTOC } from '@/components/content/StickyTOC';
import { ArticleByline } from '@/components/content/ArticleByline';
import { RegionalPillarBacklink } from '@/components/content/RegionalPillarBacklink';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { BUNDESLAENDER, bundeslandName } from '@/lib/bundeslaender';

const BASE_URL = 'https://medicsingles.de/magazin';
type Params = Promise<{ bundesland: string; stadt: string }>;

function toId(text: string) {
  return text.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function collectText(n: any): string {
  if (typeof n === 'string') return n;
  if (n?.type === 'text') return n.attributes?.content ?? '';
  return (n?.children ?? []).map(collectText).join('');
}
function extractH2s(content: any): { label: string; id: string }[] {
  const node = 'node' in content ? content.node : content;
  const items: { label: string; id: string }[] = [];
  function walk(n: any) {
    if (n?.type === 'heading' && n?.attributes?.level === 2) {
      const text = collectText(n);
      if (text) items.push({ label: text, id: toId(text) });
    }
    (n?.children ?? []).forEach(walk);
  }
  walk(node);
  return items;
}

export async function generateStaticParams() {
  const all = await reader.collections.aerztestammtische.all();
  return all
    .filter((a) => a.entry.status === 'published')
    .map((a) => ({ bundesland: a.entry.bundesland, stadt: a.entry.stadt }));
}

async function findEntry(bundesland: string, stadt: string) {
  const all = await reader.collections.aerztestammtische.all();
  const found = all.find(
    (a) => a.entry.status === 'published' && a.entry.bundesland === bundesland && a.entry.stadt === stadt
  );
  if (!found) return null;
  const full = await reader.collections.aerztestammtische.read(found.slug, { resolveLinkedFiles: true });
  return full ? { slug: found.slug, entry: full } : null;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { bundesland, stadt } = await params;
  const entry = await findEntry(bundesland, stadt);
  if (!entry) return {};
  const e = entry.entry;
  const url = `${BASE_URL}/singles-regional/aerztestammtische/${bundesland}/${stadt}`;
  const title = e.seoTitle || e.title;
  const description = e.seoDescription || e.excerpt;
  const image = e.featuredImage ? `${BASE_URL}${e.featuredImage}` : `${BASE_URL}/logos/jobsingles-logo.png`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      siteName: 'Medicsingles Magazin', locale: 'de_DE',
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function StammtischStadtPage({ params }: { params: Params }) {
  const { bundesland, stadt } = await params;
  if (!BUNDESLAENDER[bundesland]) notFound();
  const entry = await findEntry(bundesland, stadt);
  if (!entry) notFound();

  const e = entry.entry;
  const blName = bundeslandName(bundesland);
  const url = `${BASE_URL}/singles-regional/aerztestammtische/${bundesland}/${stadt}`;
  const tocItems = extractH2s(e.content);
  const author = await reader.collections.authors.read('tommy-honold');

  // Verwandte Pages: Ärztekammer gleiche Stadt + 3 Nachbar-Stammtische
  const allKammern = await reader.collections.aerztekammern.all();
  const matchingKammer = allKammern.find(
    (k) => k.entry.status === 'published' && k.entry.bundesland === bundesland && k.entry.stadt === stadt,
  );
  const allStamm = await reader.collections.aerztestammtische.all();
  const sameBundesland = allStamm
    .filter((s) => s.entry.status === 'published' && s.entry.bundesland === bundesland && s.entry.stadt !== stadt);
  const otherBundesland = allStamm
    .filter((s) => s.entry.status === 'published' && s.entry.bundesland !== bundesland)
    .sort((a, b) => (a.entry.stadt || '').localeCompare(b.entry.stadt || ''));
  const nearbyStammtische = [...sameBundesland, ...otherBundesland].slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: e.title,
          description: e.excerpt,
          url,
          image: e.featuredImage ? `${BASE_URL}${e.featuredImage}` : undefined,
          datePublished: e.publishedAt || undefined,
          authorName: author?.name,
        })}
      />
      {e.faqItems && e.faqItems.length > 0 && <JsonLd data={faqJsonLd(e.faqItems)} />}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: BASE_URL },
          { name: 'Singles Regional', url: `${BASE_URL}/singles-regional` },
          { name: 'Ärztestammtische', url: `${BASE_URL}/singles-regional/aerztestammtische` },
          { name: blName, url: `${BASE_URL}/singles-regional/aerztestammtische/${bundesland}` },
          { name: e.title, url },
        ])}
      />

      <ClusterHero
        title={e.title}
        excerpt={e.excerpt}
        category="Ärztestammtisch"
        image={e.featuredImage || undefined}
        imageAlt={e.featuredImageAlt || undefined}
        imageCredit={e.featuredImageCredit || undefined}
        date={e.publishedAt || undefined}
      />

      <StickyTOC items={tocItems} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Ärztestammtische', href: '/singles-regional/aerztestammtische' },
          { label: blName, href: `/singles-regional/aerztestammtische/${bundesland}` },
          { label: e.title, href: `/singles-regional/aerztestammtische/${bundesland}/${stadt}` },
        ]} />

        <ArticleByline publishedAt={e.publishedAt || undefined} />

        {/* Stammtisch-Fakten Box */}
        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-8">
          <div className="bg-surface-dark rounded-xl p-6 text-white/90 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {e.traegerName && <div><span className="text-white/50">Träger:</span> {e.traegerName}</div>}
            {e.frequenz && <div><span className="text-white/50">Frequenz:</span> {e.frequenz}</div>}
            {e.anmeldung && <div><span className="text-white/50">Anmeldung:</span> {e.anmeldung}</div>}
            {e.treffpunkt && <div className="sm:col-span-2"><span className="text-white/50">Treffpunkt:</span> {e.treffpunkt}</div>}
            {e.webseite && (
              <div className="sm:col-span-2">
                <span className="text-white/50">Web:</span>{' '}
                <a href={e.webseite} target="_blank" rel="nofollow noopener noreferrer" className="text-brand-orange-text hover:underline">{e.webseite}</a>
              </div>
            )}
          </div>
        </AnimatedGradientBorder>

        <TableOfContents items={tocItems} />

        {e.calloutQuestion && (
          <CalloutBox question={e.calloutQuestion}>{e.calloutAnswer}</CalloutBox>
        )}

        <ArticleBody
          content={e.content}
          insertAfterH2={2}
          insertElement={
            <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="my-8">
              <div className="p-6 text-center">
                <p className="text-sm text-foreground/70 mb-3">Du arbeitest im Gesundheitswesen?</p>
                <HeartButton href={`https://medicsingles.de/?AID=MedicMagazin-stammtisch-${stadt}`}>
                  Jetzt kostenfrei anmelden
                </HeartButton>
              </div>
            </AnimatedGradientBorder>
          }
        />

        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
          <div className="py-10 px-6 bg-surface-dark text-white text-center">
            <p className="text-lg font-bold mb-2">Genug gelesen?</p>
            <p className="text-white/60 text-sm mb-5">Finde Mediziner-Singles in {blName}.</p>
            <HeartButton href={`https://medicsingles.de/?AID=MedicMagazin-stammtisch-${stadt}`}>
              Jetzt kostenfrei mitmachen
            </HeartButton>
          </div>
        </AnimatedGradientBorder>

        {e.takeaways && e.takeaways.length > 0 && <TakeawayBox items={e.takeaways} />}

        {e.faqItems && e.faqItems.length > 0 && (
          <>
            <h2 id="haeufige-fragen" className="text-2xl font-bold mt-16 mb-2 scroll-mt-24">Häufige Fragen</h2>
            <FAQAccordion items={e.faqItems} />
          </>
        )}

        {author && (
          <AuthorBio
            name={author.name}
            slug="tommy-honold"
            role={author.role}
            bio={author.bio}
            avatar={author.avatar || undefined}
            socialLinks={author.socialLinks}
          />
        )}

        {(matchingKammer || nearbyStammtische.length > 0) && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
              Verwandte Seiten
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchingKammer && (
                <Link
                  href={`/singles-regional/aerztekammern/${matchingKammer.entry.bundesland}/${matchingKammer.entry.stadt}`}
                  className="block p-4 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  <div className="text-xs uppercase text-foreground/50 mb-1">Ärztekammer in {stadt}</div>
                  <div className="text-base font-bold text-foreground">{matchingKammer.entry.title}</div>
                </Link>
              )}
              {nearbyStammtische.map((s) => (
                <Link
                  key={s.slug}
                  href={`/singles-regional/aerztestammtische/${s.entry.bundesland}/${s.entry.stadt}`}
                  className="block p-4 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  <div className="text-xs uppercase text-foreground/50 mb-1">
                    Stammtisch {bundeslandName(s.entry.bundesland)}
                  </div>
                  <div className="text-base font-bold text-foreground">{s.entry.title}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <RegionalPillarBacklink
          currentPillar="aerztestammtische"
          bundesland={bundesland}
          bundeslandName={blName}
          stadt={stadt}
        />
      </div>

      {/* Bottom CTA */}
      <section className="text-center py-16 px-6">
        <HeartButton href={`https://medicsingles.de/?AID=MedicMagazin-stammtisch-${stadt}`}>
          Jetzt kostenfrei mitmachen
        </HeartButton>
      </section>
    </>
  );
}
