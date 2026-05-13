import { PillarHero } from '@/components/content/PillarHero';
import { PillarArticleFeature } from '@/components/content/PillarArticleFeature';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/seo/JsonLd';

const HUB_URL = 'https://medicsingles.de/magazin/singles-regional';

export const metadata = {
  title: 'Singles Regional: Stammtische, Unikliniken & Kammern',
  description: 'Regionale Mediziner-Treffpunkte: 52 Ärztestammtische, 34 Unikliniken, 51 Ärztekammern, 35 Junge Fachgesellschaften — sortiert nach Bundesland.',
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: 'Singles Regional — Mediziner-Netzwerke vor Ort',
    description: 'Stammtisch, Uniklinik oder Kammer. Drei Pillars für regionale Mediziner-Begegnungen, sortiert nach Bundesland.',
    url: HUB_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const HUB_COLORS = [
  { r: 15, g: 139, b: 141 },
  { r: 47, g: 181, b: 184 },
  { r: 255, g: 122, b: 0 },
];

const PILLARS = [
  {
    title: 'Ärztestammtische',
    excerpt: '52 lokale Mediziner-Treffen: JADE Junge Allgemeinmedizin, Marburger-Bund-Netzwerke, ÄKV-Kreisstammtische. Wer regelmäßig hingeht, wird Teil einer kleinen, festen Runde.',
    href: '/singles-regional/aerztestammtische',
    icon: '🍻',
    color: '#FF7A00',
  },
  {
    title: 'Unikliniken',
    excerpt: '34 Universitätskliniken und Maximalversorger Deutschlands. Hier verbringen Mediziner-Singles den größten Teil ihrer Wachstunden, also entstehen hier auch die meisten Begegnungen.',
    href: '/singles-regional/unikliniken',
    icon: '🏥',
    color: '#2FB5B8',
  },
  {
    title: 'Ärztekammern',
    excerpt: '17 Landesärztekammern und Bezirkskammern. Fortbildungen, Junge-Ärzte-Foren, Versorgungswerk-Events: strukturierte Anlässe für Mediziner, die fachliche Pflicht mit Privatleben verbinden wollen.',
    href: '/singles-regional/aerztekammern',
    icon: '🏛️',
    color: '#0F8B8D',
  },
];

const FAQ = [
  {
    question: 'Warum drei Pillars statt einer Übersichtsseite?',
    answer: 'Stammtisch, Uniklinik und Kammer sprechen unterschiedliche Suchabsichten an. Wer "Ärztestammtisch München" googelt, will sofort Termine. Wer "Charité Singles" sucht, denkt an seinen Arbeitsplatz. Wer "Fortbildung Ärztekammer Nordrhein" eingibt, sucht das nächste Pflicht-CME. Eine gemeinsame Seite würde keiner dieser drei Suchabsichten gerecht.',
  },
  {
    question: 'Welcher Pillar passt zu mir?',
    answer: 'Junge Ärzte in Weiterbildung starten meist über die Stammtische, weil dort der Einstieg am niedrigschwelligsten ist. Wer fest an einer Uniklinik arbeitet, nutzt zuerst die Uniklinik-Page seiner Stadt, weil dort die Kollegen-Community sitzt. Die Kammer wird relevant, sobald CME-Fortbildungen oder Versorgungswerk-Termine anstehen. Fast alle Mediziner bewegen sich zwischen zwei der drei Welten.',
  },
  {
    question: 'Wie aktuell sind die Daten?',
    answer: 'Stammtisch-Termine kommen aus den öffentlichen JADE-Listen, dem Marburger-Bund-Netzwerk und den Veröffentlichungen der Landesärztekammern. Wir verifizieren regelmäßig. Da Termine sich ändern, verlinken wir auf jeder Detailseite die offizielle Quelle, damit du dort die Live-Daten findest.',
  },
  {
    question: 'Meine Stadt fehlt. Was tun?',
    answer: 'Wir bauen das Netzwerk nach Aktivität: Regionen mit dokumentierter Community-Aktivität kommen zuerst. Wenn dein Bundesland "In Vorbereitung" zeigt, sind wir gerade dran. Über das Kontaktformular auf medicsingles.de kannst du deine Stadt priorisieren lassen.',
  },
  {
    question: 'Brauche ich eine Medicsingles-Anmeldung, um Stammtische zu finden?',
    answer: 'Nein. Die Pillar-Pages und alle Detailseiten sind frei lesbar. Eine kostenfreie Anmeldung lohnt sich nur, wenn du danach direkt mit anderen Mediziner-Singles in Kontakt treten willst, statt auf den nächsten Stammtisch zu warten.',
  },
];

export default function SinglesRegionalHub() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Singles Regional — Medicsingles',
          description: 'Regionale Mediziner-Netzwerke: Ärztestammtische, Unikliniken und Ärztekammern in jedem Bundesland.',
          url: HUB_URL,
          items: PILLARS.map((p) => ({ name: p.title, url: `https://medicsingles.de/magazin${p.href}` })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles Regional', url: HUB_URL },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQ)} />

      <PillarHero
        title="Singles Regional"
        texts={[
          'Mediziner vor Ort',
          'Stammtisch · Klinik · Kammer',
          'Bundesland für Bundesland',
          'Drei Wege, einander zu treffen',
          'Singles Regional',
        ]}
        subtitle="Drei Pillars für regionale Mediziner-Begegnungen: 52 Stammtische, 34 Unikliniken, 51 Ärztekammern. Sortiert nach Bundesland, geprüft pro Stadt."
        image="/images/hubs/singles-regional.webp"
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90 space-y-4">
              <p className="text-base leading-relaxed">
                Mediziner-Singles in Deutschland haben ein eigenartiges Problem. Sie arbeiten 50–60
                Stunden pro Woche an Orten voller Menschen, gehen abends erschöpft heim und sollen
                dann auf Dating-Apps charmant wirken. Das funktioniert selten. Was funktioniert:
                den Beruf nicht trennen vom Privatleben, sondern als Treffpunkt nutzen.
              </p>
              <p className="text-base leading-relaxed">
                Singles Regional sortiert die echten Treffpunkte nach Region und Anlass. Stammtisch
                heißt niedrigschwellig, monatlich, in der Kneipe nebenan. Uniklinik heißt: dein
                Arbeitgeber, dein Team, deine Mensa, dein Forschungstag. Kammer heißt Pflicht-CME,
                Versorgungswerk-Treffen, fachliche Foren mit klarer Struktur.
              </p>
              <p className="text-base leading-relaxed">
                Wähle den Anlass, der zu deinem Wochenrhythmus passt. Die Detailseiten zeigen pro
                Bundesland, welche Veranstaltungen aktiv sind und wer sie organisiert.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-regional">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* 3 Pillars */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Die drei Pillars im Überblick
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Jeder Pillar steht für eine andere Art, sich zu treffen. Stammtisch ist locker,
            Uniklinik ist alltäglich, Kammer ist strukturiert. Wer alle drei kennt, bewegt sich
            souverän zwischen Bier, Visite und CME-Fortbildung.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <PillarArticleFeature
                key={p.href}
                title={p.title}
                excerpt={p.excerpt}
                href={p.href}
                icon={<span className="text-2xl">{p.icon}</span>}
                accentColor={p.color}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* So wählst du den passenden Pillar */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            So findest du den richtigen Einstieg
          </h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              <strong className="text-foreground">Du bist in Weiterbildung und neu in der Stadt.</strong> Geh
              zuerst zum nächsten JADE-Stammtisch in deiner Region. Die Runden sind klein,
              freundlich und meist offen für Neue. Termine stehen auf der JADE-Seite, wir
              zeigen sie pro Bundesland gebündelt.
            </p>
            <p>
              <strong className="text-foreground">Du arbeitest fest an einer Uniklinik.</strong> Die
              <a href="/singles-regional/unikliniken" className="text-brand-orange hover:underline"> Uniklinik-Page deiner Stadt</a> ist
              dein Startpunkt. Sie listet Schwerpunkte, Forschungstage und typische
              Begegnungsorte am Campus auf — von der Mensa bis zum Sommerfest der Fakultät.
              Beispiele: <a href="/singles-regional/unikliniken/berlin/berlin" className="text-brand-orange hover:underline">Charité Berlin</a>, <a href="/singles-regional/unikliniken/niedersachsen/hannover" className="text-brand-orange hover:underline">MHH Hannover</a> und <a href="/singles-regional/unikliniken/nordrhein/bonn" className="text-brand-orange hover:underline">UKB Bonn</a>.
            </p>
            <p>
              <strong className="text-foreground">Du machst gerade Facharzt-Vorbereitung oder bist
              fertig.</strong> <a href="/singles-regional/aerztekammern" className="text-brand-orange hover:underline">Kammer-Pflichtfortbildungen</a> lassen sich gut
              als Anlass nutzen. Welche Landesärztekammer welche Format-Mischung anbietet
              (Hybrid, Präsenz, Akademie-Wochenende), zeigen wir pro Bundesland.
            </p>
            <p>
              <strong className="text-foreground">Du willst nicht mehr warten.</strong> Direkt auf
              Medicsingles.de anmelden. Die Pillars helfen, wenn du offline weitergehen willst —
              für den ersten Kontakt geht es online schneller.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Häufige Fragen
          </h2>
          <FAQAccordion items={FAQ} />
        </section>
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein lokales Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Mediziner-Singles aus deiner Region. Stammtisch, Klinik, Kammer oder direkt auf
            Medicsingles.de.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-regional">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
