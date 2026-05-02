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

const RETTUNG_URL = 'https://medicsingles.de/magazin/singles-partnersuche/rettung';

export const metadata = {
  title: 'Partnersuche Rettung — Dating für Sanitäter & Notärzte',
  description: 'Partnersuche im Rettungsdienst: zwischen 12/24-Schichtrhythmus und Adrenalin-Abfall. Guides für Rettungssanitäter, Notfallsanitäter und Notärzte.',
  alternates: { canonical: RETTUNG_URL },
  openGraph: {
    title: 'Partnersuche Rettungsdienst — Liebe trotz 12/24-Dienst',
    description: 'Dating im Wechselschicht-Rhythmus. Partner finden, die Adrenalin-Abfall und Einsatz-Stille verstehen.',
    url: RETTUNG_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const RETTUNG_COLORS = [
  { r: 220, g: 50, b: 50 },
  { r: 240, g: 100, b: 80 },
  { r: 255, g: 122, b: 0 },
];

const SECTIONS = [
  {
    title: '🚨 Grundlagen & Schichtrealität',
    intro: 'Der 12/24-Rhythmus prägt alles — vom Dating-Tempo bis zur Frage, wann Körper und Kopf überhaupt ansprechbar sind. Hier die Tiefenanalyse.',
    slugs: ['partnersuche-rettungsdienst-realitaet-12-24-rhythmus'],
  },
  {
    title: '💬 Online-Dating im Rettungsdienst',
    intro: 'Das richtige Profil entscheidet, ob du Menschen triffst, die deinen Beruf verstehen — oder solche, die beim ersten abgesagten Date abspringen.',
    slugs: ['dating-profil-rettungssanitaeter-notfallsanitaeter'],
  },
  {
    title: '❤️ Beziehung & Einsatz-Alltag',
    intro: 'Was im Körper nach einem schweren Einsatz passiert und wie du das deinem Partner erklärst, ohne jedes Heimkommen zum Drama zu machen.',
    slugs: [
      'adrenalin-abfall-partner-erklaeren-rettung',
      'beziehung-rettungsdienstler-schweigsam-einsatz',
      'zwei-rettungsdienstler-paar-wechselschicht',
    ],
  },
  {
    title: '👨‍👩‍👧 Karriere, Familie & Zukunft',
    intro: 'Kita-Logistik im 12/24-Rhythmus, Elternzeit als Rettungsdienstler, NotSan-Weiterbildung mit Kindern — die finanzielle und biographische Realität.',
    slugs: [
      'karriere-familie-12-24-rettungsdienst',
    ],
  },
  {
    title: '🚑 Fachrichtungen im Rettungsdienst',
    intro: 'Notarzt, Notfallsanitäter, Leitstelle, Bergrettung — alle tragen ein Rettungsdienst-Schild, aber die Dating-Realitäten unterscheiden sich deutlich.',
    slugs: [
      'notarzt-notfallsanitaeter-dating-unterschied',
      'leitstelle-dating-partnersuche-disponent',
      'bergrettung-partnersuche-alpen-dating',
    ],
  },
  {
    title: '🎓 Networking & Fachkontakte',
    intro: 'RettMobil, ACLS- und PHTLS-Fortbildungen, Feuerwehrtag — wo du Menschen aus dem Fach triffst, ohne dass es ein Dating-Event sein muss.',
    slugs: [
      'rettmobil-fulda-networking-singles-dating',
      'acls-phtls-fortbildung-dating-rettung',
    ],
  },
  {
    title: '🧠 Mental Health & Beziehung',
    intro: 'PTBS ist im Rettungsdienst statistisch relevant — und eine neue Beziehung ist kein Therapieersatz. Wie du damit offen umgehst.',
    slugs: [
      'ptbs-rettungsdienst-neue-beziehung-umgang',
    ],
  },
];

const CROSS_LINKS = [
  {
    title: 'Für Ärzte & Ärztinnen',
    excerpt: 'Auch Notärzte finden hier passende Partner — zwischen Klinik, NEF und Funkruf.',
    href: '/singles-partnersuche/aerzte',
    icon: '🩺',
    color: '#0F8B8D',
  },
  {
    title: 'Für Pflegekräfte',
    excerpt: 'Pflege und Rettung teilen den Schichtdienst — die Dating-Realität ist ähnlich.',
    href: '/singles-partnersuche/pflege',
    icon: '💊',
    color: '#2E8B57',
  },
];

export default async function RettungPillar() {
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
          name: 'Partnersuche Rettungsdienst — Dating für Rettungssanitäter',
          description: 'Dating für Rettungssanitäter, Notfallsanitäter und Notärzte. Ausführliche Cluster-Guides zum 12/24-Rhythmus, Dating-Profil und Adrenalin-Abfall nach Einsätzen.',
          url: RETTUNG_URL,
          items: schemaItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: 'https://medicsingles.de/magazin/singles-partnersuche' },
          { name: 'Für Rettungsdienst', url: RETTUNG_URL },
        ])}
      />
      <PillarHero
        title="Rettung Singles"
        texts={[
          'Liebe nach Einsatz',
          'Wer versteht 12/24?',
          'Adrenalin & Herz',
          'RTW Romanze',
          'Rettung Singles',
        ]}
        subtitle="Partnersuche für Rettungssanitäter, Notfallsanitäter und Notärzte — Wechselschicht, Adrenalin-Abfall und echte Verbindung."
        colors={RETTUNG_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Für Rettungsdienst', href: '/singles-partnersuche/rettung' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Rund 100.000 Menschen arbeiten in Deutschland im Rettungsdienst — als
                Rettungssanitäter, Notfallsanitäter und Notärzte auf RTW, NEF und in Leitstellen.
                Was sie verbindet: Ein 12/24-Schichtrhythmus, Adrenalin-Spitzen, die Stunden
                brauchen bis zum Abklingen, und eine mentale Belastung, die sich nicht einfach
                «nach Hause» lassen lässt.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Dating im Rettungsdienst ist kein Bonus-Thema. Es ist ein eigener Planet.
                Spontane Verabredungen am Wochenende? Unmöglich. Ein Partner, der den
                Adrenalin-Abfall nach einem Kindernotfall versteht, ohne es persönlich zu
                nehmen? Rar. Wer in diesem Beruf steht, kennt den Erklärungsmarathon. Und die
                Menschen, die trotzdem bleiben — weil sie wissen, was du jeden Tag leistest.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Medicsingles.de ist anders. Hier triffst du Menschen, die den Rettungsalltag
                kennen oder ihn zumindest wertschätzen. Keine Erklärungen, warum du nach einem
                Einsatz zwei Stunden nichts sagst. Echte Verbindungen zwischen Menschen, die
                wissen: Wer im RTW fährt, bringt mehr mit als einen Dienstplan.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-rettung">
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
              Den vollständigen Überblick zu Schichtrhythmen, Kollegen-Dating, RettMobil-Networking und
              PTBS in Beziehungen findest du im{' '}
              <Link href="/partnersuche-rettung" className="text-brand-orange-text underline">
                Pillar-Guide Partnersuche Rettungsdienst
              </Link>
              . Weitere Cluster-Artikel zu Leitstelle, Bergrettung, Familienplanung und Co. erscheinen laufend.
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
            Der Rettungsdienst arbeitet eng mit Klinik und Pflege zusammen. Vielleicht findest
            du dort den passenden Partner.
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
            Rettungssanitäter, Notfallsanitäter und Menschen, die deinen 12/24-Rhythmus kennen.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-rettung">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
