import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reader } from '@/lib/keystatic';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { StickyTOC } from '@/components/content/StickyTOC';
import { ArticleByline } from '@/components/content/ArticleByline';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, articleJsonLd, faqJsonLd, breadcrumbJsonLd, organizationJsonLd } from '@/components/seo/JsonLd';

const BASE_URL = 'https://medicsingles.de/magazin';
type Params = Promise<{ slug: string }>;

const FACH_LABEL: Record<string, string> = {
  innere: 'Innere Medizin',
  chirurgie: 'Chirurgie',
  bildgebung: 'Bildgebung & Strahlentherapie',
  anaesthesie: 'Anästhesie & Notfall',
  'neuro-psy': 'Neurologie & Psychiatrie',
  'paediatrie-gyn': 'Pädiatrie & Geburtshilfe',
  allgemein: 'Allgemein- & Hausarztmedizin',
  spezial: 'Spezialfächer',
};

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
  const all = await reader.collections.jungeFachgesellschaften.all();
  return all.filter((a) => a.entry.status === 'published').map((a) => ({ slug: a.slug }));
}

async function findEntry(slug: string) {
  const full = await reader.collections.jungeFachgesellschaften.read(slug, { resolveLinkedFiles: true });
  if (!full || full.status !== 'published') return null;
  return { slug, entry: full };
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const entry = await findEntry(slug);
  if (!entry) return {};
  const e = entry.entry;
  const url = `${BASE_URL}/singles-regional/junge-fachgesellschaften/${slug}`;
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

export default async function JungeFGDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const entry = await findEntry(slug);
  if (!entry) notFound();

  const e = entry.entry;
  const url = `${BASE_URL}/singles-regional/junge-fachgesellschaften/${slug}`;
  const tocItems = extractH2s(e.content);
  const fachLabel = FACH_LABEL[e.fachrichtung] || 'Fachgesellschaft';

  const author = await reader.collections.authors.read('tommy-honold');

  const allFG = await reader.collections.jungeFachgesellschaften.all();
  const sameCluster = allFG
    .filter((a) => a.entry.status === 'published' && a.entry.fachrichtung === e.fachrichtung && a.slug !== slug);
  const otherCluster = allFG
    .filter((a) => a.entry.status === 'published' && a.entry.fachrichtung !== e.fachrichtung)
    .sort((a, b) => (a.entry.title || '').localeCompare(b.entry.title || ''));
  const nearby = [...sameCluster, ...otherCluster].slice(0, 4);

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
        data={organizationJsonLd({
          name: e.jungeFGName || e.title,
          alternateName: e.mutterFG ? `Junge ${e.mutterFG}` : undefined,
          url: e.webseite || undefined,
          parentName: e.mutterFG || undefined,
          parentUrl: e.mutterFGWebseite || undefined,
          description: e.excerpt || undefined,
          foundingDate: e.gruendung && /^\d{4}/.test(e.gruendung) ? e.gruendung.match(/^\d{4}/)![0] : undefined,
          memberOfBjae: !!e.bjaeMitglied,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: BASE_URL },
          { name: 'Singles Regional', url: `${BASE_URL}/singles-regional` },
          { name: 'Junge Fachgesellschaften', url: `${BASE_URL}/singles-regional/junge-fachgesellschaften` },
          { name: e.title, url },
        ])}
      />

      <ClusterHero
        title={e.title}
        excerpt={e.excerpt}
        category={fachLabel}
        image={e.featuredImage || undefined}
        imageAlt={e.featuredImageAlt || undefined}
        imageCredit={e.featuredImageCredit || undefined}
        date={e.publishedAt || undefined}
      />

      <StickyTOC items={tocItems} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Junge Fachgesellschaften', href: '/singles-regional/junge-fachgesellschaften' },
          { label: e.title, href: `/singles-regional/junge-fachgesellschaften/${slug}` },
        ]} />

        <ArticleByline publishedAt={e.publishedAt || undefined} />

        {/* FG-Fakten-Box */}
        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-8">
          <div className="bg-surface-dark rounded-xl p-6 text-white/90 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {e.jungeFGName && <div><span className="text-white/50">Junges Forum:</span> {e.jungeFGName}</div>}
            {e.mutterFG && <div><span className="text-white/50">Mutter-FG:</span> {e.mutterFG}</div>}
            {e.altersgrenze && <div><span className="text-white/50">Altersgrenze:</span> {e.altersgrenze}</div>}
            {e.gruendung && <div><span className="text-white/50">Gegründet:</span> {e.gruendung}</div>}
            {e.bjaeMitglied && <div className="sm:col-span-2"><span className="text-white/50">BJÄ-Mitglied:</span> Ja (Bündnis Junge Ärzte)</div>}
            {e.treffenFormat && <div className="sm:col-span-2"><span className="text-white/50">Format:</span> {e.treffenFormat}</div>}
            {e.webseite && (
              <div className="sm:col-span-2">
                <span className="text-white/50">Web:</span>{' '}
                <a href={e.webseite} target="_blank" rel="nofollow noopener noreferrer" className="text-brand-orange-text hover:underline">{e.webseite}</a>
              </div>
            )}
            {e.mutterFGWebseite && (
              <div className="sm:col-span-2">
                <span className="text-white/50">Mutter-FG-Web:</span>{' '}
                <a href={e.mutterFGWebseite} target="_blank" rel="nofollow noopener noreferrer" className="text-brand-orange-text hover:underline">{e.mutterFGWebseite}</a>
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
                <p className="text-sm text-foreground/70 mb-3">Junge Ärztin oder junger Arzt?</p>
                <HeartButton href={`https://medicsingles.de/?AID=MedicMagazin-fg-${slug}`}>
                  Jetzt kostenfrei anmelden
                </HeartButton>
              </div>
            </AnimatedGradientBorder>
          }
        />

        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
          <div className="py-10 px-6 bg-surface-dark text-white text-center">
            <p className="text-lg font-bold mb-2">Genug gelesen?</p>
            <p className="text-white/60 text-sm mb-5">Finde Mediziner-Singles in deinem Fach.</p>
            <HeartButton href={`https://medicsingles.de/?AID=MedicMagazin-fg-${slug}`}>
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

        {nearby.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
              Verwandte Junge Fachgesellschaften
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nearby.map((a) => (
                <Link
                  key={a.slug}
                  href={`/singles-regional/junge-fachgesellschaften/${a.slug}`}
                  className="block p-4 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  <div className="text-xs uppercase text-foreground/50 mb-1">
                    {FACH_LABEL[a.entry.fachrichtung] || a.entry.fachrichtung}
                  </div>
                  <div className="text-base font-bold text-foreground">
                    {a.entry.jungeFGName || a.entry.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 mb-8">
          <Link href="/singles-regional/junge-fachgesellschaften" className="text-brand-orange-text hover:underline text-sm">
            ← zurück zu allen Junge Fachgesellschaften
          </Link>
        </div>
      </div>

      <section className="text-center py-16 px-6">
        <HeartButton href={`https://medicsingles.de/?AID=MedicMagazin-fg-${slug}`}>
          Jetzt kostenfrei mitmachen
        </HeartButton>
      </section>
    </>
  );
}
