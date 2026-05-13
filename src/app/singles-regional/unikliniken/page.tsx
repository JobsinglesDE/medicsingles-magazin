import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/seo/JsonLd';
import { BUNDESLAENDER, BUNDESLAND_SLUGS } from '@/lib/bundeslaender';

const FAQ = [
  {
    question: 'Was ist eine Universitätsklinik genau?',
    answer: 'Eine Universitätsklinik ist ein Krankenhaus, das in Forschung und Lehre an eine medizinische Fakultät angebunden ist. Sie übernimmt drei Aufgaben gleichzeitig: Krankenversorgung auf höchster Stufe (Maximalversorgung), klinische Forschung und die Ausbildung von Medizinstudierenden. In Deutschland gibt es 35 Universitätskliniken, dazu kommen einige Maximalversorger im Uniklinik-Verbund wie das Klinikum Stuttgart oder Vivantes Neukölln Berlin.',
  },
  {
    question: 'Wie lerne ich an einer Uniklinik jemanden privat kennen?',
    answer: 'Drei Orte funktionieren erfahrungsgemäß: die Mensa zwischen 12 und 13 Uhr (regelmäßige Mittagspause, andere bleiben länger sitzen), die jährliche Mitarbeiterfeier oder das Sommerfest der Fakultät (privater Rahmen, Alkohol senkt Hemmschwelle) und Forschungstage oder Doktoranden-Retreats (kleine Gruppen, gemeinsames Hobby Wissenschaft). Wer Frühbesprechung und Wäschekammer-Smalltalk als Kennenlern-Anlässe sieht, übersieht die wirklich relevanten Treffpunkte.',
  },
  {
    question: 'Welche Größenklassen gibt es bei Unikliniken?',
    answer: 'Klein (unter 1.000 Betten): Greifswald, Rostock, Magdeburg, Halle. Mittel (1.000–1.500 Betten): Mainz, Marburg, Bonn, Düsseldorf. Groß (1.500–2.500 Betten): Charité Berlin, MHH Hannover, Frankfurt, Köln, Heidelberg. Sehr groß (über 2.500 Betten): Charité ist mit Abstand das größte Universitätsklinikum Europas. Je größer das Haus, desto anonymer der Alltag — und desto wichtiger werden die kleinen, festen Kreise innerhalb der eigenen Abteilung.',
  },
  {
    question: 'Sind die Stadtteile rund um die Uniklinik typische Wohngegenden für Mediziner?',
    answer: 'Oft ja. In Heidelberg konzentriert sich die ärztliche Community in Neuenheim und Handschuhsheim, in Bonn am Venusberg und Poppelsdorf, in Frankfurt rund um Niederrad und Sachsenhausen, in München in Bogenhausen und Maxvorstadt. Wer in unmittelbarer Klinik-Nähe wohnt, lebt automatisch in einer Mediziner-Community — auch ohne aktive Suche.',
  },
  {
    question: 'Spielt der Trägerstatus (Land, Stiftung, privat) eine Rolle?',
    answer: 'Für den Berufsalltag ja, für die Begegnungs-Frage kaum. Landeskliniken (z.B. UKB Bonn, UKD Düsseldorf, MHH Hannover) sind klassische Vollausbildungs-Häuser mit hohem Akademiker-Anteil. Stiftungskliniken (z.B. UKE Hamburg, Universitätsmedizin Mainz) haben oft etwas andere Hierarchie-Kulturen. Privatisierte Uniklinik-Kooperationen sind selten und betreffen meist Spezialbereiche. Für Mediziner-Singles ist die Größe und die Stadt-Anbindung wichtiger als der Träger.',
  },
];

const PILLAR_URL = 'https://medicsingles.de/magazin/singles-regional/unikliniken';

export const metadata = {
  title: 'Unikliniken Deutschland: Mediziner-Singles am Campus',
  description: '34 Universitätskliniken und Maximalversorger. Wo Mediziner-Singles sich begegnen: Mensa, Sommerfest, Forschungstag. Pro Bundesland.',
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
      <JsonLd data={faqJsonLd(FAQ)} />

      <PillarHero
        title="Unikliniken"
        texts={[
          'Hochleistungsmedizin',
          'Forschung trifft Klinik',
          'Schichtdienst & Liebe',
          'Maximalversorger Deutschland',
          'Unikliniken',
        ]}
        subtitle="34 Universitätskliniken und Maximalversorger Deutschlands. Welche Häuser welchen Charakter haben und wie Mediziner-Singles sie jenseits von Dienstplan und OP-Schleuse nutzen."
        image="/images/hubs/unikliniken.webp"
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

      {/* Topic-Content */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Wie aus 60-Stunden-Wochen Begegnungen werden
          </h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Die Uniklinik ist nicht der erste Ort, an den man bei Dating denkt. Sie ist der
              Ort, an dem Mediziner den größten Teil ihrer Wachstunden verbringen. Frühbesprechung
              um 7 Uhr, Visite, OP-Plan, Wartung der Forschungsdaten, Spätdienst, Nachtdienst.
              Wer hier offen durch den Tag geht, statt nur durchzurennen, trifft Menschen, denen
              der eigene Alltag nicht erklärt werden muss.
            </p>
            <p>
              Drei Treffpunkte sind in fast jedem Universitätsklinikum gleich. Die Mensa zwischen
              12 und 13 Uhr. Wer regelmäßig zur gleichen Zeit kommt, sieht über Wochen die
              gleichen Gesichter. Das Sommerfest oder die Mitarbeiterfeier, einmal pro Jahr,
              meist im Juni. Hier verschwindet die Hierarchie, Oberärzte stehen am gleichen
              Tisch wie Pflegekräfte. Und Forschungstage oder Doktoranden-Retreats für alle, die
              wissenschaftlich arbeiten — kleine Gruppen, gemeinsames Thema, langer Tag. Wer
              ergänzend außerhalb der Klinik netzwerken will, findet bei den <a href="/singles-regional/aerztestammtische" className="text-brand-orange hover:underline">Mediziner-Stammtischen</a> regional sortierte
              JADE- und MB-Runden.
            </p>
            <p>
              Wer in einer Großstadt-Uniklinik arbeitet, kennt die Stadtteil-Konzentration der
              Kollegen. <a href="/singles-regional/unikliniken/baden-wuerttemberg/heidelberg" className="text-brand-orange hover:underline">Heidelberg-Neuenheim</a>, <a href="/singles-regional/unikliniken/nordrhein/bonn" className="text-brand-orange hover:underline">Bonn-Venusberg</a>, <a href="/singles-regional/unikliniken/hessen/frankfurt" className="text-brand-orange hover:underline">Frankfurt-Sachsenhausen</a>, München-
              Bogenhausen: kurze Wege zur Klinik bedeuten Nachbarn aus dem gleichen Haus. Die
              Bäckerei am Sonntagmorgen wird zum unfreiwilligen Treffpunkt.
            </p>
            <p>
              Pro Bundesland und Stadt zeigen die Detailseiten, welche Schwerpunkte das Haus
              hat, wie groß die Belegschaft ist und wo sich die Mediziner-Community konzentriert.
              Wähle dein Bundesland oben oder direkt deine Stadt.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Häufige Fragen zu Unikliniken
          </h2>
          <FAQAccordion items={FAQ} />
        </section>
      </ScrollReveal>

      {/* Cross-Links zu Sister-Pillars */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Auch im Cluster Singles Regional
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/singles-regional/aerztestammtische"
              className="block p-6 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
            >
              <div className="text-2xl mb-2">🍻</div>
              <div className="text-lg font-bold text-foreground mb-1">Ärztestammtische</div>
              <div className="text-sm text-foreground/60 leading-relaxed">
                52 Mediziner-Stammtische pro Bundesland — JADE, MB, lokale Runden.
              </div>
            </Link>
            <Link
              href="/singles-regional/aerztekammern"
              className="block p-6 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
            >
              <div className="text-2xl mb-2">🏛️</div>
              <div className="text-lg font-bold text-foreground mb-1">Ärztekammern</div>
              <div className="text-sm text-foreground/60 leading-relaxed">
                17 Landeskammern, Bezirkskammern, CME, Versorgungswerk.
              </div>
            </Link>
            <Link
              href="/singles-regional/junge-fachgesellschaften"
              className="block p-6 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
            >
              <div className="text-2xl mb-2">🩺</div>
              <div className="text-lg font-bold text-foreground mb-1">Junge Fachgesellschaften</div>
              <div className="text-sm text-foreground/60 leading-relaxed">
                JADE, JUNGE DGIM, Young DGK & Co. Summer Schools, Kongress-Sessions.
              </div>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Lieber direkt zum Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Mediziner-Singles aus jedem Bundesland auf Medicsingles.de — Profil in zwei Minuten,
            erste Nachricht noch heute.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-unikliniken">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
