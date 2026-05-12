import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { BUNDESLAENDER, BUNDESLAND_SLUGS } from '@/lib/bundeslaender';

const PILLAR_URL = 'https://medicsingles.de/magazin/singles-regional/unikliniken';

export const metadata = {
  title: 'Unikliniken & Maximalversorger Deutschland — Singles im Heilberuf',
  description: 'Übersicht aller Universitätskliniken und Maximalversorger. Wie Schichtdienst, Forschungstage und Fakultätsfeste zu echten Begegnungen für Mediziner-Singles werden.',
  alternates: { canonical: PILLAR_URL },
  openGraph: {
    title: 'Unikliniken — Hochleistungsmedizin trifft Privatleben',
    description: 'Pro Bundesland: Klinik-Sitz, Bettenzahl, Forschungsschwerpunkte und wie Mediziner-Singles diese Häuser jenseits der Dienstpläne nutzen.',
    url: PILLAR_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const KLINIK_COLORS = [
  { r: 15, g: 139, b: 141 },
  { r: 47, g: 181, b: 184 },
  { r: 255, g: 122, b: 0 },
];

export default async function UniklinikenPillar() {
  const all = await reader.collections.unikliniken.all();
  const published = all.filter((a) => a.entry.status === 'published');

  function countByBL(slug: string) {
    return published.filter((a) => a.entry.bundesland === slug).length;
  }

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Unikliniken — Singles Regional',
          description: 'Universitätskliniken und Maximalversorger Deutschlands.',
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
          { name: 'Unikliniken', url: PILLAR_URL },
        ])}
      />

      <PillarHero
        title="Unikliniken"
        texts={[
          'Hochleistungsmedizin',
          'Forschung trifft Klinik',
          'Schichtdienst & Liebe',
          'Maximalversorger Deutschland',
          'Unikliniken',
        ]}
        subtitle="Alle Universitätskliniken und Maximalversorger Deutschlands — und wie Singles im Heilberuf sie jenseits von Dienstplan und OP-Schleuse nutzen."
        colors={KLINIK_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Unikliniken', href: '/singles-regional/unikliniken' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Die Uniklinik ist nicht der erste Ort, an den du beim Wort &laquo;Liebe&raquo; denkst.
                Aber sie ist der Ort, an dem du den größten Teil deiner Wachstunden verbringst:
                Frühbesprechung, OP, Visite, Spätdienst, Forschungslabor. Wer hier mit offenen Augen
                durchläuft, statt nur durchzurennen, trifft Menschen, die deinen Alltag nicht erst
                erklärt bekommen müssen.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Wähle dein Bundesland — wir zeigen dir, welche Uniklinik welchen Charakter hat,
                welche Fakultätsfeste und Forschungstage offen sind, und wie du den Schritt von
                Kollegialität zu Privatem wagst, ohne unprofessionell zu wirken.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-unikliniken">
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
            Jedes Bundesland hat eine oder mehrere Universitätskliniken — dazu kommen Maximalversorger im Uniklinik-Verbund.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {BUNDESLAND_SLUGS.map((slug) => {
              const bl = BUNDESLAENDER[slug];
              const count = countByBL(slug);
              return (
                <Link
                  key={slug}
                  href={`/singles-regional/unikliniken/${slug}`}
                  className="group relative block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
                >
                  <div className="text-3xl mb-2">{bl.emoji}</div>
                  <div className="text-base font-bold text-foreground group-hover:text-brand-orange transition-colors leading-tight">
                    {bl.name}
                  </div>
                  <div className="text-xs text-foreground/50 mt-2">
                    {count > 0 ? `${count} Klinik${count > 1 ? 'en' : ''}` : 'In Vorbereitung'}
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
            Alle Unikliniken und Maximalversorger auf einen Blick — sortiert nach Stadt.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {published
              .slice()
              .sort((a, b) => (a.entry.stadt || '').localeCompare(b.entry.stadt || ''))
              .map((k) => (
                <Link
                  key={k.slug}
                  href={`/singles-regional/unikliniken/${k.entry.bundesland}/${k.entry.stadt}`}
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
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-unikliniken">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
