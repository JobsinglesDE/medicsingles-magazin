import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { PillarArticleFeature } from '@/components/content/PillarArticleFeature';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { JsonLd, breadcrumbJsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';

const THERAPEUTEN_URL = 'https://medicsingles.de/magazin/singles-partnersuche/therapeuten';

export const metadata = {
  title: 'Partnersuche Therapeuten — Dating für Psychologen',
  description: 'Partnersuche für Therapeuten, Psychologen und Coaches. Emotionale Abgrenzung, das "Analysierst-du-mich"-Klischee und das erste Date — konkrete Guides.',
  alternates: { canonical: THERAPEUTEN_URL },
  openGraph: {
    title: 'Partnersuche Therapeuten — Liebe ohne Couch',
    description: 'Dating als Therapeut, Psychologe oder Coach — zwischen Empathie, Abgrenzung und echter Nähe.',
    url: THERAPEUTEN_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const THERAPEUTEN_COLORS = [
  { r: 123, g: 92, b: 196 },
  { r: 155, g: 130, b: 215 },
  { r: 255, g: 122, b: 0 },
];

const SECTIONS = [
  {
    title: '🧠 Grundlagen & Realität',
    intro: 'Die fünf Dating-Herausforderungen für psychologische Fachkräfte und die Vorurteile, denen Therapeuten beim Dating immer wieder begegnen.',
    slugs: [
      'fuenf-dating-herausforderungen-psychologen-therapeuten',
      'analysierst-du-mich-dating-vorurteile-therapeut',
    ],
  },
  {
    title: '💬 Online-Dating-Strategien',
    intro: 'Wie du Empathie zeigst, ohne wie eine Praxis-Website zu klingen — Profile und Erstnachrichten, die echte Verbindungen anziehen.',
    slugs: [
      'dating-profil-therapeuten-empathie-ohne-therapieren',
      'erste-nachricht-tiefgruendige-gespraechsstarter-therapeut',
    ],
  },
  {
    title: '☕ Erstes Date & Kennenlernen',
    intro: 'Date-Ideen, die tiefere Gespräche ermöglichen, ohne dass der Abend zur Therapiesitzung wird.',
    slugs: [
      'date-ideen-tiefgruendige-gespraeche-therapeuten',
      'ueber-sich-reden-date-aktives-teilen',
    ],
  },
  {
    title: '❤️ Beziehung & Alltag',
    intro: 'Wie es sich wirklich anfühlt, mit einem Therapeuten zu leben — emotionale Verfügbarkeit, Schweigepflicht, gesunde Streitkultur.',
    slugs: [
      'beziehung-mit-therapeut-partner-guide',
      'emotionale-abgrenzung-job-privat-therapeut',
      'kommunikationsmuster-beziehung-therapeut',
    ],
  },
  {
    title: '👨‍👩‍👧 Zukunft, Karriere & Familie',
    intro: 'Praxisgründung gemeinsam stemmen, Familienplanung zwischen Kassensitz und Elternzeit — die finanzielle und biographische Realität.',
    slugs: [
      'praxisgruendung-paar-therapeut-finanzen',
      'familienplanung-therapeut-karriere-kind',
    ],
  },
  {
    title: '🔬 Spezifische Lebenslagen & Fachrichtungen',
    intro: 'Dating als KJP mit Kindswohl-Themen, als Coach mit ungeregeltem Berufsbild — wo die Fachrichtung das Privatleben prägt.',
    slugs: [
      'dating-als-kinderjugendpsychotherapeut',
      'partnersuche-coach-berater-grenzen',
    ],
  },
  {
    title: '🎓 Networking & Kontakte',
    intro: 'Supervision, Intervision, Berufsverbände — wo psychologische Fachkräfte sich jenseits von Apps treffen.',
    slugs: [
      'supervision-intervision-networking-therapeuten',
    ],
  },
  {
    title: '⚖️ Ethik & Grenzen',
    intro: 'Das Abstinenzgebot, Klienten-Dating und Schweigepflicht in der Partnerschaft — was du unbedingt wissen musst.',
    slugs: [
      'klienten-daten-ethische-grenzen-abstinenzgebot',
      'schweigepflicht-partner-erzaehlen-therapeut',
    ],
  },
];

const CROSS_LINKS = [
  {
    title: 'Für Ärzte & Ärztinnen',
    excerpt: 'Dating zwischen Assistenzdienst, 60-Stunden-Woche und Klinikalltag.',
    href: '/singles-partnersuche/aerzte',
    icon: '🩺',
    color: '#0F8B8D',
  },
  {
    title: 'Für Pflegekräfte',
    excerpt: 'Partnersuche im Schichtdienst — ohne Erklärungen.',
    href: '/singles-partnersuche/pflege',
    icon: '💊',
    color: '#2E8B57',
  },
];

export default async function TherapeutenPillar() {
  const articles = await reader.collections.articles.all();

  function getSectionArticles(slugs: string[]) {
    return slugs
      .map((slug) => articles.find((a) => a.slug === slug))
      .filter(Boolean) as typeof articles;
  }

  const allSectionSlugs = SECTIONS.flatMap((s) => s.slugs);
  const schemaItems = allSectionSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean)
    .map((a) => ({
      name: a!.entry.title,
      url: `https://medicsingles.de/magazin/${a!.slug}`,
    }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Partnersuche Therapeuten — Dating für psychologische Fachkräfte',
          description: 'Cluster-Guides für Therapeuten, Psychologen und Coaches: Dating-Herausforderungen, Profile, Date-Ideen, Beziehungsalltag und ethische Grenzen.',
          url: THERAPEUTEN_URL,
          items: schemaItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: 'https://medicsingles.de/magazin/singles-partnersuche' },
          { name: 'Für Therapeuten', url: THERAPEUTEN_URL },
        ])}
      />
      <PillarHero
        title="Therapeuten Singles"
        texts={[
          'Erleben statt Analysieren',
          'Echte Nähe',
          'Coach sucht Herz',
          'Therapeuten Singles',
        ]}
        subtitle="Partnersuche für Therapeuten, Psychologen und Coaches — professionelle Distanz wahren, echte Beziehung finden."
        colors={THERAPEUTEN_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Für Therapeuten', href: '/singles-partnersuche/therapeuten' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Rund 68.000 approbierte Psychotherapeutinnen und Psychotherapeuten arbeiten in
                Deutschland — plus Tausende Psychologen, Coaches, Berater und Ergotherapeuten.
                Der Beruf verlangt Selbstreflexion, emotionale Arbeit und klare Abgrenzung.
                Genau diese Fähigkeiten, die im Job Gold wert sind, können im Dating zur Falle
                werden.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Der «Analysierst-du-mich-gerade?»-Witz beim ersten Date. Die Erwartung, dass
                du als Therapeutin ein perfektes Beziehungskonzept lieferst. Die Grenze zwischen
                beruflicher Empathie und privater Nähe, die sich nicht automatisch ergibt.
                Partnersuche für psychologische Fachkräfte hat eigene Regeln — und braucht
                eigene Antworten.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Auf Medicsingles.de triffst du Menschen, die dein Berufsfeld verstehen oder es
                zumindest wertschätzen. Kein Erklärungsmarathon über Supervisionen, Fortbildungen
                und emotionale Last. Echte Verbindungen zwischen Menschen, die wissen, dass
                Therapieräume Türen haben — und du privat eine andere Person bist.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-therapeuten">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* Thematic Sections */}
      {SECTIONS.map((section) => {
        const sectionArticles = getSectionArticles(section.slugs);
        if (sectionArticles.length === 0) return null;
        return (
          <ScrollReveal key={section.title}>
            <section className="max-w-6xl mx-auto px-6 py-10">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">
                {section.title}
              </h2>
              {section.intro && (
                <p className="text-foreground/70 mb-8 leading-relaxed">{section.intro}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectionArticles.map((article) => (
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
        );
      })}

      {/* Pillar-Guide Verweis */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-surface/50 border border-brand-orange/20 rounded-2xl p-6 text-center">
            <p className="text-foreground/60 leading-relaxed text-sm">
              Den vollständigen Überblick zur Partnersuche für Therapeuten findest du im{' '}
              <Link href="/partnersuche-therapeuten" className="text-brand-orange-text underline">
                Pillar-Guide Partnersuche Therapeuten
              </Link>
              . Weitere Cluster-Artikel zu Fachrichtungen, Familienplanung und Praxisgründung folgen laufend.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Cross-Links */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Weitere Berufsgruppen
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Vielleicht suchst du eine Partnerschaft außerhalb des therapeutischen Feldes.
            In diesen Communities findest du weitere Mediziner-Singles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CROSS_LINKS.map((link) => (
              <PillarArticleFeature
                key={link.href}
                title={link.title}
                excerpt={link.excerpt}
                href={link.href}
                icon={<span className="text-2xl">{link.icon}</span>}
                accentColor={link.color}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Psychologische Fachkräfte und Singles, die dein Feld verstehen — auf Medicsingles.de.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-therapeuten">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
