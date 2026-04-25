import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { reader } from '@/lib/keystatic';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { BUNDESLAENDER, bundeslandName } from '@/lib/bundeslaender';

type Params = Promise<{ bundesland: string; stadt: string }>;

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
  const url = `https://medicsingles.de/magazin/singles-regional/aerztestammtische/${bundesland}/${stadt}`;
  return {
    title: entry.entry.seoTitle || entry.entry.title,
    description: entry.entry.seoDescription || entry.entry.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: entry.entry.title,
      description: entry.entry.excerpt,
      url,
      type: 'article',
      siteName: 'Medicsingles Magazin',
      locale: 'de-DE',
      images: entry.entry.featuredImage ? [{ url: entry.entry.featuredImage }] : [],
    },
  };
}

export default async function StammtischStadtPage({ params }: { params: Params }) {
  const { bundesland, stadt } = await params;
  if (!BUNDESLAENDER[bundesland]) notFound();

  const entry = await findEntry(bundesland, stadt);
  if (!entry) notFound();

  const e = entry.entry;
  const blName = bundeslandName(bundesland);
  const url = `https://medicsingles.de/magazin/singles-regional/aerztestammtische/${bundesland}/${stadt}`;

  const faqJsonLd = (e.faqItems && e.faqItems.length > 0) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: e.faqItems.map((f: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles Regional', url: 'https://medicsingles.de/magazin/singles-regional' },
          { name: 'Ärztestammtische', url: 'https://medicsingles.de/magazin/singles-regional/aerztestammtische' },
          { name: blName, url: `https://medicsingles.de/magazin/singles-regional/aerztestammtische/${bundesland}` },
          { name: e.title, url },
        ])}
      />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        {e.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={e.featuredImage}
              alt={e.featuredImageAlt || e.title}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
            {e.title}
          </h1>
          {e.excerpt && (
            <p className="text-base md:text-lg text-white/85 max-w-2xl mt-3 leading-relaxed drop-shadow">
              {e.excerpt}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 mt-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Ärztestammtische', href: '/singles-regional/aerztestammtische' },
          { label: blName, href: `/singles-regional/aerztestammtische/${bundesland}` },
          { label: e.title, href: url },
        ]} />
      </div>

      {/* Stammtisch-Fakten Box */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {e.traegerName && <div><span className="text-white/50">Träger:</span> {e.traegerName}</div>}
              {e.frequenz && <div><span className="text-white/50">Frequenz:</span> {e.frequenz}</div>}
              {e.anmeldung && <div><span className="text-white/50">Anmeldung:</span> {e.anmeldung}</div>}
              {e.treffpunkt && <div className="sm:col-span-2"><span className="text-white/50">Treffpunkt:</span> {e.treffpunkt}</div>}
              {e.webseite && (
                <div className="sm:col-span-2">
                  <span className="text-white/50">Web:</span>{' '}
                  <a href={e.webseite} target="_blank" rel="noopener noreferrer" className="text-brand-orange-text hover:underline">{e.webseite}</a>
                </div>
              )}
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Callout Frage/Antwort */}
      {e.calloutQuestion && e.calloutAnswer && (
        <ScrollReveal>
          <section className="max-w-3xl mx-auto px-6">
            <CalloutBox question={e.calloutQuestion}>{e.calloutAnswer}</CalloutBox>
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href={`https://medicsingles.de/?AID=magazin-stammtisch-${stadt}`}>
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      <article className="max-w-3xl mx-auto px-6 py-8 prose prose-invert prose-lg">
        <ArticleBody content={e.content} />
      </article>

      {e.faqItems && e.faqItems.length > 0 && (
        <ScrollReveal>
          <section className="max-w-3xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">FAQ</h2>
            {e.faqItems.map((f: { question: string; answer: string }, i: number) => (
              <details key={i} className="mb-4 p-4 rounded-lg bg-surface border border-foreground/10">
                <summary className="font-bold cursor-pointer">{f.question}</summary>
                <p className="mt-3 text-foreground/80 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </section>
        </ScrollReveal>
      )}

      {e.takeaways && e.takeaways.length > 0 && (
        <ScrollReveal>
          <section className="max-w-3xl mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Das Wichtigste</h2>
            <ul className="space-y-2">
              {e.takeaways.map((t: string, i: number) => (
                <li key={i} className="flex gap-3"><span className="text-brand-orange">→</span><span>{t}</span></li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <Link
            href={`/singles-regional/aerztekammern/${bundesland}/${stadt}`}
            className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
          >
            <div className="text-sm text-foreground/50 mb-1">Auch sehenswert</div>
            <div className="font-bold text-brand-orange-text">→ Ärztekammer in dieser Region</div>
          </Link>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein lokales Match?</h2>
          <HeartButton href={`https://medicsingles.de/?AID=magazin-stammtisch-${stadt}`}>
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
