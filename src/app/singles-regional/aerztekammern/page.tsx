import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { BUNDESLAENDER, BUNDESLAND_SLUGS } from '@/lib/bundeslaender';

const PILLAR_URL = 'https://medicsingles.de/magazin/singles-regional/aerztekammern';

export const metadata = {
  title: 'Ärztekammern Deutschland: alle 17 Landeskammern',
  description: 'Alle deutschen Landesärztekammern und Bezirkskammern: Fortbildungen, Ärztetage und Delegiertenversammlungen als informelle Mediziner-Partnersuche.',
  alternates: { canonical: PILLAR_URL },
  openGraph: {
    title: 'Ärztekammern — Networking mit Liebes-Potenzial',
    description: 'Pro Bundesland: Kammer-Sitz, Mitgliederzahl, Top-Events und wie Mediziner-Singles diese nutzen.',
    url: PILLAR_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const KAMMER_COLORS = [
  { r: 15, g: 139, b: 141 },
  { r: 47, g: 181, b: 184 },
  { r: 255, g: 122, b: 0 },
];

export default async function AerztekammernPillar() {
  const all = await reader.collections.aerztekammern.all();
  const published = all.filter((a) => a.entry.status === 'published');

  function countByBL(slug: string) {
    return published.filter((a) => a.entry.bundesland === slug).length;
  }

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Ärztekammern — Singles Regional',
          description: '17 Landesärztekammern Deutschlands plus Bezirkskammern.',
          url: PILLAR_URL,
          items: BUNDESLAND_SLUGS.map((s) => ({
            name: BUNDESLAENDER[s].name,
            url: `${PILLAR_URL}/${s}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles Regional', url: 'https://medicsingles.de/magazin/singles-regional' },
          { name: 'Ärztekammern', url: PILLAR_URL },
        ])}
      />

      <PillarHero
        title="Ärztekammern"
        texts={[
          '17 Landesärztekammern',
          'Authority + Privates',
          'Fortbildung trifft Liebe',
          'Pflicht-Mitgliedschaft mit Mehrwert',
          'Ärztekammern',
        ]}
        subtitle="Alle Landesärztekammern und Bezirksärztekammern Deutschlands — und wie Singles im Heilberuf sie über das Pflichtprogramm hinaus nutzen."
        colors={KAMMER_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Ärztekammern', href: '/singles-regional/aerztekammern' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Die Landesärztekammer ist nicht der erste Ort, an den du beim Wort &laquo;Liebe&raquo; denkst.
                Aber sie ist der Ort, an dem du regelmäßig bist: Fortbildungspflicht, Delegiertenversammlung,
                Ärztetag. Wer dort wach hingeht, statt nur Pflicht-CME-Punkte zu sammeln, trifft Menschen,
                die deinen Beruf nicht erst erklärt bekommen müssen.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Wähle dein Bundesland — wir zeigen dir, welche Kammer-Events tatsächlich
                geeignet sind, welche Bezirkskammer-Stammtische offen sind, und wie du den
                Schritt von Fortbildung zu Privatem wagst, ohne unprofessionell zu wirken.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-aerztekammern">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* Bundesland-Grid */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Wähle dein Bundesland
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Jedes Bundesland hat eine eigene Landesärztekammer — manche zusätzlich Bezirkskammern.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {BUNDESLAND_SLUGS.map((slug) => {
              const bl = BUNDESLAENDER[slug];
              const count = countByBL(slug);
              return (
                <Link
                  key={slug}
                  href={`/singles-regional/aerztekammern/${slug}`}
                  className="group relative block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
                >
                  <div className="text-3xl mb-2">{bl.emoji}</div>
                  <div className="text-base font-bold text-foreground group-hover:text-brand-orange transition-colors leading-tight">
                    {bl.name}
                  </div>
                  <div className="text-xs text-foreground/50 mt-2">
                    {count > 0 ? `${count} Kammer${count > 1 ? 'n' : ''}` : 'In Vorbereitung'}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Direkt zur Stadt
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Alle Ärztekammern auf einen Blick — sortiert nach Stadt.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {published
              .slice()
              .sort((a, b) => (a.entry.stadt || '').localeCompare(b.entry.stadt || ''))
              .map((k) => (
                <Link
                  key={k.slug}
                  href={`/singles-regional/aerztekammern/${k.entry.bundesland}/${k.entry.stadt}`}
                  className="block px-4 py-3 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  <div className="text-base font-bold text-foreground capitalize">
                    {(k.entry.stadt || '').replace(/-/g, ' ')}
                  </div>
                  <div className="text-xs text-foreground/50 mt-1">
                    {BUNDESLAENDER[k.entry.bundesland]?.name || k.entry.bundesland}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Lieber direkt zum Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Mediziner-Singles aus jedem Bundesland — auf Medicsingles.de.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-aerztekammern">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
