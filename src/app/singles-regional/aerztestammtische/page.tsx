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
    question: 'Was ist ein Mediziner-Stammtisch genau?',
    answer: 'Ein Mediziner-Stammtisch ist ein regelmäßiges, meist monatliches Treffen von Ärztinnen und Ärzten an einem festen Ort, oft in einer Kneipe oder einem Restaurant. Es gibt drei große Träger in Deutschland: JADE (Junge Allgemeinmedizin Deutschland) mit Stammtischen in über 15 Städten, das Marburger-Bund-Netzwerk Junge Ärzte in fast jedem Landesverband, und lokale Kreisstammtische einzelner Ärztekammern. Teilnahme ist meist offen, Anmeldung selten erforderlich.',
  },
  {
    question: 'Lohnt sich der erste Besuch, wenn ich niemanden kenne?',
    answer: 'Ja, weil die Gruppen klein und freundlich sind. Typische Größe: 8 bis 20 Personen. Wer mit "Ich bin neu hier" reinkommt, wird in den ersten Minuten herumgereicht. Tipp: nicht direkt am Abend mit den meisten Leuten reden wollen, sondern zwei oder drei Gespräche bewusst führen. Beim zweiten Besuch wirst du wiedererkannt — und ab dem dritten Besuch bist du Teil der Runde.',
  },
  {
    question: 'Sind Stammtische zum Daten geeignet oder dafür zu professionell?',
    answer: 'Beides geht, wenn die Reihenfolge stimmt. Erst Stammtisch als Stammtisch nutzen, also fachlich und kollegial. Dann mit der Zeit die Personen kennenlernen. Direktes Anbaggern in der Runde verbrennt sowohl den Stammtisch als auch die Begegnung. Wer dagegen jemanden über Wochen kennenlernt und dann außerhalb der Stammtisch-Runde einlädt, hat einen sehr natürlichen Übergang.',
  },
  {
    question: 'Was unterscheidet JADE vom Marburger-Bund-Netzwerk?',
    answer: 'JADE richtet sich an Allgemeinmediziner und Ärzte in allgemeinmedizinischer Weiterbildung, ist also fachlich fokussiert. Das Marburger-Bund-Junges-Netzwerk ist berufspolitisch breiter und für alle MB-Mitglieder offen. JADE-Stammtische sind oft kleiner und stärker freundschaftlich, MB-Treffen häufiger Networking-orientiert mit klarer Tagesordnung. Wer sich nicht entscheiden will, geht zu beiden Formaten.',
  },
  {
    question: 'Ich bin Pflegekraft oder Therapeut. Sind Stammtische für mich offen?',
    answer: 'JADE und MB-Junges-Netzwerk sind primär Ärzte-Formate. Pflege und Therapie haben eigene Netzwerke, die auf einigen Stammtisch-Detailseiten verlinkt sind. Pflegekraft-spezifische Stammtische gibt es vor allem in Großstädten, oft organisiert über Berufsverbände wie DBfK oder die ÄK-Pflegekammer. Wer aus Pflege oder Therapie zu einem Ärzte-Stammtisch dazu möchte, fragt am besten vorher beim Veranstalter an.',
  },
];

const PILLAR_URL = 'https://medicsingles.de/magazin/singles-regional/aerztestammtische';

export const metadata = {
  title: 'Ärztestammtische Deutschland: JADE, MB, ÄKV-Runden',
  description: '52 Mediziner-Stammtische in Deutschland: JADE Junge Allgemeinmedizin, Marburger-Bund-Netzwerke, ÄKV-Kreisrunden. Pro Bundesland und Stadt.',
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
      <JsonLd data={faqJsonLd(FAQ)} />

      <PillarHero
        title="Ärztestammtische"
        texts={[
          'Mediziner offline',
          'JADE-Stammtisch',
          'Junges Netzwerk MB',
          'Bier statt Bumble',
          'Ärztestammtische',
        ]}
        subtitle="52 Mediziner-Stammtische in Deutschland: JADE Junge Allgemeinmedizin, Marburger-Bund-Netzwerke, ÄKV-Kreisrunden. Sortiert nach Bundesland, dokumentiert pro Stadt."
        image="/images/hubs/aerztestammtische.webp"
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
            Alle aktiven Mediziner-Stammtische auf einen Blick. Klick öffnet die Bundesland-Seite,
            wo der gesuchte Stammtisch detailliert beschrieben ist.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {published
              .slice()
              .sort((a, b) => (a.entry.stadt || '').localeCompare(b.entry.stadt || ''))
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/singles-regional/aerztestammtische/${s.entry.bundesland}#${s.entry.stadt}`}
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

      {/* Topic-Content */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Warum Stammtische funktionieren, wenn Apps versagen
          </h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Stammtisch klingt altbacken, ist aber das am wenigsten ausgelutschte Format für
              Mediziner-Begegnungen in Deutschland. Drei Gründe. Erstens: Gleicher Beruf,
              gleicher Rhythmus. Niemand muss erklären, warum man Mittwochabend gerädert ist
              oder am Wochenende plötzlich Dienst hat. Zweitens: Klein und wiederkehrend. Wer
              dreimal hingeht, ist Teil der Runde. Auf einer Dating-App wirst du nach drei
              Wochen vom Algorithmus durchgemischt. Drittens: Es geht nicht primär ums Daten.
              Das senkt den Druck und macht echte Begegnungen wahrscheinlicher.
            </p>
            <p>
              JADE (Junge Allgemeinmedizin Deutschland) hat regelmäßige Stammtische in <a href="/singles-regional/aerztestammtische/berlin" className="text-brand-orange hover:underline">Berlin</a>,
              <a href="/singles-regional/aerztestammtische/hamburg" className="text-brand-orange hover:underline"> Hamburg</a>, <a href="/singles-regional/aerztestammtische/bayern" className="text-brand-orange hover:underline">München</a>, Köln,
              Frankfurt und einem Dutzend weiterer Städte. Die Termine stehen auf
              jungeallgemeinmedizin.de/termine. Das Marburger-Bund-Junges-Netzwerk
              veranstaltet in fast jedem Landesverband Treffen, oft mit fachlichem Input am
              Anfang und freiem Ausklang. Lokale ÄKV-Kreisstammtische gibt es in Regionen wie
              <a href="/singles-regional/aerztestammtische/bayern" className="text-brand-orange hover:underline"> Bamberg</a>, Bad Kissingen oder
              Hoyerswerda seit Jahrzehnten — kleine, feste Runden ohne Marketing.
            </p>
            <p>
              Der erste Besuch ist immer am schwersten. Tipp: vorher anschreiben, dass man neu
              kommt. Fast alle Veranstalter melden sich aktiv zurück und kümmern sich am Abend
              um den Erstkontakt. Wer zweimal kommt, wird wiedererkannt. Wer dreimal kommt,
              gehört dazu.
            </p>
            <p>
              Pro Bundesland und Stadt findest du auf den Detailseiten Treffpunkt, Frequenz,
              Anmelde-Status und Ansprechpartner für die einzelnen Stammtische. Wer den
              Stammtisch um den klinischen Alltag herum platzieren will, sieht in der
              <a href="/singles-regional/unikliniken" className="text-brand-orange hover:underline"> Uniklinik-Übersicht</a>, welche Häuser im
              eigenen Bundesland sitzen.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Häufige Fragen zu Mediziner-Stammtischen
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
              href="/singles-regional/unikliniken"
              className="block p-6 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
            >
              <div className="text-2xl mb-2">🏥</div>
              <div className="text-lg font-bold text-foreground mb-1">Unikliniken</div>
              <div className="text-sm text-foreground/60 leading-relaxed">
                34 Universitätskliniken und Maximalversorger. Mensa, Sommerfest, Forschungstage.
              </div>
            </Link>
            <Link
              href="/singles-regional/aerztekammern"
              className="block p-6 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
            >
              <div className="text-2xl mb-2">🏛️</div>
              <div className="text-lg font-bold text-foreground mb-1">Ärztekammern</div>
              <div className="text-sm text-foreground/60 leading-relaxed">
                17 Landesärztekammern und Bezirkskammern. Pflicht-CME, Versorgungswerk.
              </div>
            </Link>
            <Link
              href="/singles-regional/junge-fachgesellschaften"
              className="block p-6 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
            >
              <div className="text-2xl mb-2">🩺</div>
              <div className="text-lg font-bold text-foreground mb-1">Junge Fachgesellschaften</div>
              <div className="text-sm text-foreground/60 leading-relaxed">
                JADE, JUNGE DGIM, Young DGK & Co. Summer Schools, BJÄ-Netzwerk, Kongress-Sessions.
              </div>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Lieber gleich zum Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Mediziner-Singles in deiner Region. Wenn das Warten auf den nächsten Stammtisch zu
            lang dauert, geht es direkt auf Medicsingles.de schneller.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-aerztestammtische">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
