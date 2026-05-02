import Image from 'next/image';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { PillarArticleFeature } from '@/components/content/PillarArticleFeature';
import { ArticleCard } from '@/components/content/ArticleCard';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';

const HUB_URL = 'https://medicsingles.de/magazin/singles-partnersuche';

export const metadata = {
  title: 'Partnersuche Medizin — Hub für alle Heilberufe',
  description: 'Partnersuche im Gesundheitswesen: Guides für Ärzte, Pflege, Therapeuten & Rettung. Dating trotz Schichtdienst, 60-Stunden-Woche und emotionaler Belastung.',
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: 'Partnersuche Medizin — Dating für Heilberufe',
    description: 'Für Ärzte, Pflegekräfte, Therapeuten und Rettungsdienst. Die Hub-Seite mit Guides, Tipps und echten Erfolgsgeschichten.',
    url: HUB_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const HUB_COLORS = [
  { r: 15, g: 139, b: 141 },    // Medical Teal
  { r: 47, g: 181, b: 184 },    // Teal Light
  { r: 255, g: 122, b: 0 },     // Brand Orange
];

const PILLARS = [
  {
    title: 'Ärzte & Ärztinnen',
    excerpt: 'Partnersuche zwischen Assistenzdienst, Chefarzt-Visite und 60-Stunden-Woche. Für Mediziner, die eine Partnerschaft auf Augenhöhe suchen.',
    href: '/singles-partnersuche/aerzte',
    icon: '🩺',
    color: '#0F8B8D',
  },
  {
    title: 'Pflege & Krankenschwestern',
    excerpt: 'Dating trotz Schichtdienst, Dreischicht und emotionaler Erschöpfung. Für Pflegekräfte, die jemanden suchen, der den Alltag mitträgt.',
    href: '/singles-partnersuche/pflege',
    icon: '💊',
    color: '#2E8B57',
  },
  {
    title: 'Therapeuten & Psychologen',
    excerpt: 'Partnersuche mit professioneller Distanz — und echter Nähe. Für Menschen, die beruflich zuhören und privat gehört werden wollen.',
    href: '/singles-partnersuche/therapeuten',
    icon: '🧠',
    color: '#7B5CC4',
  },
  {
    title: 'Rettungsdienst',
    excerpt: 'Dating im 12/24-Rhythmus, zwischen Adrenalin-Abfall und Funkruf. Für Rettungssanitäter, Notfallsanitäter und Notärzte.',
    href: '/singles-partnersuche/rettung',
    icon: '🚑',
    color: '#DC3232',
  },
];

export default async function SinglesPartnersuche() {
  const articles = await reader.collections.articles.all();

  const pillarItems = PILLARS.map((p) => ({
    name: p.title,
    url: `https://medicsingles.de/magazin${p.href}`,
  }));

  const highlightSlugs = [
    'partnersuche-aerzte-warum-schwer',
    'dating-als-krankenschwester-schichtdienst',
    'beziehung-mit-arzt-partner',
    'erstes-date-aerzte-ideen',
  ];
  const highlights = highlightSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean) as typeof articles;

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Partnersuche Medizin — Der Hub für Heilberufe',
          description: 'Partnersuche im Gesundheitswesen für Ärzte, Pflege, Therapeuten und Rettungsdienst.',
          url: HUB_URL,
          items: pillarItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: HUB_URL },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[320px] md:min-h-[440px]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-singles-partnersuche.webp"
            alt="Partnersuche im Gesundheitswesen — Ärzte, Pflege, Therapeuten und Rettungsdienst"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 20%' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col justify-end min-h-[320px] md:min-h-[440px] pb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg text-center">
            <span className="text-brand-orange">Partnersuche</span> Medizin
          </h1>
          <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
            Dating für Heilberufe — Ärzte, Pflege, Therapeuten und Rettungsdienst.
            Deine Community versteht den Schichtdienst, ohne dass du ihn erklären musst.
          </p>
        </div>
      </section>

      <PillarHero
        as="h2"
        title="Partnersuche"
        texts={[
          'Liebe im Kittel',
          'Wer versteht dich?',
          'Dein Match',
          'Medizin Singles',
          'Herz-Visite',
        ]}
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 pt-4 pb-8">
          <AnimatedGradientBorder borderRadius={20} borderWidth={2}>
            <div className="bg-gray-900 rounded-[18px] p-8 text-gray-100">
              <h2 className="text-xl font-bold mb-4 text-white">
                Dating im Gesundheitswesen — anders, aber nicht schlechter
              </h2>
              <p className="leading-relaxed text-gray-300">
                Über 6 Millionen Menschen arbeiten in Deutschland im Gesundheitswesen. Ärzte,
                Pflegekräfte, Therapeuten, Rettungskräfte — jede Berufsgruppe hat ihre eigene
                Realität. Schichtdienst, Pikett, emotionale Erschöpfung, Kittel-Stolz und der
                Adrenalin-Abfall nach einem harten Einsatz. All das gehört dazu.
              </p>
              <p className="mt-4 leading-relaxed text-gray-300">
                Was sie verbindet: Die Partnersuche funktioniert anders als bei Menschen mit
                regulären Arbeitszeiten. Klassische Dating-Apps kennen keine Nachtschichten und
                keine 60-Stunden-Woche. Wer als Arzt, Krankenschwester oder Rettungssanitäter
                dort unterwegs ist, kennt den Erklärungsmarathon. Das Ergebnis: abgesagte Dates,
                halbherzige Matches und Partner, die den Beruf nie wirklich verstehen.
              </p>
              <p className="mt-4 leading-relaxed text-gray-300">
                Medicsingles.de ist anders. Hier triffst du Menschen, die deinen Alltag aus
                eigener Erfahrung kennen — oder ihn zumindest respektieren. Kein Grundkurs in
                Medizin, keine Entschuldigungen für deine Dienste. Echte Verbindungen, die
                halten, weil sie auf Verständnis aufgebaut sind. Wähl deine Berufsgruppe und
                finde den passenden Guide.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* 4 Sub-Pillar Links */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Dein Beruf — deine Community
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Ob Arzt, Krankenschwester, Therapeut oder Rettungssanitäter — jede Berufsgruppe
            im Gesundheitswesen hat ihre eigene Dating-Realität. Wähl deinen Beruf und entdecke
            maßgeschneiderte Guides für deine Partnersuche.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar) => (
              <PillarArticleFeature
                key={pillar.href}
                title={pillar.title}
                excerpt={pillar.excerpt}
                href={pillar.href}
                icon={<span className="text-2xl">{pillar.icon}</span>}
                accentColor={pillar.color}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Middle CTA */}
      <ScrollReveal>
        <section className="max-w-xl mx-auto px-6 py-10 text-center">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-background rounded-xl p-8 flex flex-col items-center gap-4">
              <p className="text-lg font-semibold">
                Jetzt Medizin-Singles in deiner Region finden
              </p>
              <HeartButton href="https://medicsingles.de/?AID=MedicMagazin">
                Jetzt kostenlos registrieren
              </HeartButton>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Highlights */}
      {highlights.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">
              💡 Empfohlene Guides
            </h2>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              Die meistgelesenen Artikel aus allen Berufsgruppen — für den ersten Überblick.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.entry.title}
                  excerpt={article.entry.excerpt}
                  href={`/${article.slug}`}
                  image={article.entry.featuredImage || undefined}
                  imageAlt={article.entry.featuredImageAlt || undefined}
                  category={article.entry.category}
                  date={article.entry.publishedAt || undefined}
                />
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein Match im Gesundheitswesen?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Tausende Medizin-Singles warten auf dich — echte Menschen, echter Alltag, echte Verbindungen.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
