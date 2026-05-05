import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { BUNDESLAENDER, BUNDESLAND_SLUGS } from '@/lib/bundeslaender';

const PILLAR_URL = 'https://medicsingles.de/magazin/singles-regional/aerztestammtische';

export const metadata = {
  title: 'Ärztestammtische Deutschland — JADE, Marburger Bund und lokale Mediziner-Treffen',
  description: 'Mediziner-Stammtische pro Stadt und Bundesland. JADE Junge Allgemeinmedizin, Marburger Bund Junges Netzwerk, ÄKV-Kreisstammtische — wo Singles im Heilberuf offline networking betreiben.',
  alternates: { canonical: PILLAR_URL },
  openGraph: {
    title: 'Ärztestammtische — informelle Mediziner-Treffen',
    description: 'JADE-Stammtisch, MB-Junges-Netzwerk, lokale ÄKV-Treffen. Pro Bundesland und Stadt aufgelistet.',
    url: PILLAR_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const STAMMTISCH_COLORS = [
  { r: 255, g: 122, b: 0 },
  { r: 220, g: 80, b: 30 },
  { r: 15, g: 139, b: 141 },
];

export default async function AerztestammtischePillar() {
  const all = await reader.collections.aerztestammtische.all();
  const published = all.filter((a) => a.entry.status === 'published');

  function countByBL(slug: string) {
    return published.filter((a) => a.entry.bundesland === slug).length;
  }

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Ärztestammtische — Singles Regional',
          description: 'Mediziner-Stammtische und Junge-Ärzte-Netzwerke pro Bundesland.',
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
          { name: 'Ärztestammtische', url: PILLAR_URL },
        ])}
      />

      <PillarHero
        title="Ärztestammtische"
        texts={[
          'Mediziner offline',
          'JADE-Stammtisch',
          'Junges Netzwerk MB',
          'Bier statt Bumble',
          'Ärztestammtische',
        ]}
        subtitle="Wo Mediziner sich trotz Schichtdienst regelmäßig treffen — Stammtische, Junge-Ärzte-Netzwerke und ÄKV-Kreisrunden, geordnet nach Bundesland."
        colors={STAMMTISCH_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Ärztestammtische', href: '/singles-regional/aerztestammtische' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Stammtisch klingt altbacken. Ist es nicht. JADE (Junge Allgemeinmedizin Deutschland)
                hat in über 15 deutschen Städten regelmäßige Treffen, der Marburger Bund organisiert
                Junges Netzwerk in fast jedem Landesverband, und in Bamberg, Bad Kissingen, Hoyerswerda
                gibt es lokale ÄKV-Stammtische, die seit Jahren laufen.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Hier zählt das gesprochene Wort, nicht das Profilbild. Wer regelmäßig hingeht,
                wird gesehen. Wir zeigen pro Bundesland, welche Stammtische aktiv sind, wie der
                Einstieg geht und wo Singles besonders willkommen sind.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-aerztestammtische">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Wähle dein Bundesland
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Stammtisch-Landschaft ist regional sehr unterschiedlich — manche Bundesländer haben
            10+ aktive Gruppen, andere konzentrieren sich auf Landesverbands-Ebene.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {BUNDESLAND_SLUGS.map((slug) => {
              const bl = BUNDESLAENDER[slug];
              const count = countByBL(slug);
              return (
                <Link
                  key={slug}
                  href={`/singles-regional/aerztestammtische/${slug}`}
                  className="group relative block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
                >
                  <div className="text-3xl mb-2">{bl.emoji}</div>
                  <div className="text-base font-bold text-foreground group-hover:text-brand-orange transition-colors leading-tight">
                    {bl.name}
                  </div>
                  <div className="text-xs text-foreground/50 mt-2">
                    {count > 0 ? `${count} Stammtisch${count > 1 ? 'e' : ''}` : 'In Vorbereitung'}
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
            Alle aktiven Mediziner-Stammtische auf einen Blick — sortiert nach Stadt.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {published
              .slice()
              .sort((a, b) => (a.entry.stadt || '').localeCompare(b.entry.stadt || ''))
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/singles-regional/aerztestammtische/${s.entry.bundesland}/${s.entry.stadt}`}
                  className="block px-4 py-3 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  <div className="text-base font-bold text-foreground capitalize">
                    {(s.entry.stadt || '').replace(/-/g, ' ')}
                  </div>
                  <div className="text-xs text-foreground/50 mt-1">
                    {BUNDESLAENDER[s.entry.bundesland]?.name || s.entry.bundesland}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Lieber gleich zum Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Mediziner-Singles in deiner Region — Stammtisch oder direkt auf Medicsingles.de.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-aerztestammtische">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
