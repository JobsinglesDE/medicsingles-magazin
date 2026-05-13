import Link from 'next/link';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, breadcrumbJsonLd, faqJsonLd, organizationJsonLd } from '@/components/seo/JsonLd';

const URL = 'https://medicsingles.de/magazin/singles-regional/junge-fachgesellschaften/themen/bjae-buendnis-junge-aerzte';
const BASE = 'https://medicsingles.de/magazin';

const FAQ = [
  {
    question: 'Was ist das Bündnis Junge Ärztinnen und Ärzte (BJÄ)?',
    answer: 'Das BJÄ ist ein Zusammenschluss von 19 und mehr Verbänden, Fachgesellschaften und Berufsverbänden, die alle eigene Nachwuchsstrukturen pflegen. Gegründet 2013, bündelt das Bündnis die Interessen junger Ärztinnen und Ärzte in Deutschland gegenüber Bundesärztekammer, Kassenärztlicher Bundesvereinigung und Politik.',
  },
  {
    question: 'Wer kann Mitglied im BJÄ werden?',
    answer: 'Das BJÄ selbst nimmt keine Einzelpersonen auf — es ist ein Zusammenschluss von Organisationen. Wer als Person dabei sein will, tritt einer der Mitgliedsorganisationen bei: JADE für Allgemeinmedizin, JUNGE DGIM für Innere, Young DGK für Kardiologie, Junge HNO, JuDerm, jDEGRO, GeSRU, Forum Junge Radiologie und viele mehr.',
  },
  {
    question: 'Wofür setzt sich das BJÄ politisch ein?',
    answer: 'Schwerpunkte sind eine geordnete Weiterbildungsreform, Arbeitsbedingungen in der Klinik, Versorgungswerk-Fragen, Klinikfinanzierung und Nachwuchspolitik. Das BJÄ positioniert sich öffentlich zu Themen wie Krankenhausreform, Weiterbildungsverträgen und der Vereinbarkeit von Familie und Klinik.',
  },
  {
    question: 'Hat das BJÄ eigene Veranstaltungen?',
    answer: 'Direkt selten — die Mitgliedsorganisationen veranstalten meist eigene Summer Schools, Kongress-Sessions und Stammtische. Das BJÄ tritt eher als gemeinsame Stimme auf, etwa bei Stellungnahmen, gemeinsamen Briefen an Politik oder bei der Bundesärztekammer.',
  },
  {
    question: 'Was bringt das BJÄ für Mediziner-Singles?',
    answer: 'Das BJÄ selbst nicht direkt — aber seine Mitgliedsorganisationen sind die wichtigste Sammelbewegung junger Ärztinnen und Ärzte in Deutschland. Wer in einer Jungen FG aktiv ist, bewegt sich in einem Pool von 25- bis 40-Jährigen mit gleichem Berufsbild. Die Detailseiten der einzelnen BJÄ-Mitglieds-FGs zeigen, wo der Berührungspunkt am dichtesten ist.',
  },
];

export const metadata = {
  title: 'Bündnis Junge Ärzte (BJÄ): Mitglieder, Ziele, FGs',
  description: 'Bündnis Junge Ärzte BJÄ seit 2013: 19+ Verbände und Fachgesellschaften, politische Stimme gegenüber BÄK, KBV und Politik. Alle BJÄ-Mitglieds-FGs im Überblick.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'BJÄ — politische Stimme junger Mediziner',
    description: 'Bündnis Junge Ärzte: Mitglieder, Ziele, Geschichte seit 2013 — und welche Junge FG zu welcher Karriere passt.',
    url: URL, type: 'website', siteName: 'Medicsingles Magazin', locale: 'de-DE',
  },
};

const BJAE_MEMBERS = [
  { slug: 'jade-allgemeinmedizin', name: 'JADE', mutter: 'DEGAM (Allgemeinmedizin)' },
  { slug: 'junge-dgim', name: 'JUNGE DGIM', mutter: 'DGIM (Innere Medizin)' },
  { slug: 'young-dgk-kardiologie', name: 'Young DGK', mutter: 'DGK (Kardiologie)' },
  { slug: 'junge-dgai-anaesthesie', name: 'Junge DGAI', mutter: 'DGAI (Anästhesiologie)' },
  { slug: 'junge-neurologie-dgn-one', name: 'Junge Neurologie DGN One', mutter: 'DGN (Neurologie)' },
  { slug: 'generation-psy', name: 'Generation PSY', mutter: 'DGPPN (Psychiatrie)' },
  { slug: 'gesru-urologie', name: 'GeSRU', mutter: 'DGU/BDU (Urologie)' },
  { slug: 'junge-hno', name: 'Junge HNO', mutter: 'DGHNO-KHC' },
  { slug: 'forum-junge-radiologie', name: 'Forum Junge Radiologie', mutter: 'DRG (Radiologie)' },
  { slug: 'jdegro-strahlentherapie', name: 'jDEGRO', mutter: 'DEGRO (Strahlentherapie)' },
  { slug: 'young-dgn-nuklearmedizin', name: 'Young DGN', mutter: 'DGN (Nuklearmedizin)' },
  { slug: 'junges-forum-dggg-gynaekologie', name: 'Junges Forum DGGG', mutter: 'DGGG (Gynäkologie)' },
  { slug: 'junge-dgho-onkologie', name: 'Junge DGHO', mutter: 'DGHO (Hämatologie/Onkologie)' },
  { slug: 'ag-junge-rheumatologie', name: 'AG Junge Rheumatologie', mutter: 'DGRh (Rheumatologie)' },
  { slug: 'youngdgp-pneumologie', name: 'YoungDGP', mutter: 'DGP (Pneumologie)' },
  { slug: 'juga-gastroenterologie', name: 'JUGA', mutter: 'DGVS (Gastroenterologie)' },
  { slug: 'yare-endokrinologie', name: 'YARE', mutter: 'DGE (Endokrinologie)' },
  { slug: 'junge-geriatrie', name: 'Junge Geriatrie', mutter: 'DGG (Geriatrie)' },
  { slug: 'junge-suchtmedizin', name: 'Junge Suchtmedizin', mutter: 'DGS' },
  { slug: 'baemi-mikrobiologie', name: 'BÄMI Nachwuchs', mutter: 'BÄMI (Mikrobiologie)' },
];

const COLORS = [
  { r: 15, g: 139, b: 141 }, { r: 47, g: 181, b: 184 }, { r: 255, g: 122, b: 0 },
];

export default function BjaePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd({
        name: 'Bündnis Junge Ärztinnen und Ärzte',
        alternateName: 'BJÄ',
        url: 'https://www.buendnisjungeaerzte.org',
        description: 'Zusammenschluss von Verbänden und Fachgesellschaften zur politischen Vertretung junger Ärztinnen und Ärzte in Deutschland.',
        foundingDate: '2013',
      })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Magazin', url: BASE },
        { name: 'Singles Regional', url: `${BASE}/singles-regional` },
        { name: 'Junge Fachgesellschaften', url: `${BASE}/singles-regional/junge-fachgesellschaften` },
        { name: 'BJÄ', url: URL },
      ])} />
      <JsonLd data={faqJsonLd(FAQ)} />

      <PillarHero
        title="Bündnis Junge Ärzte"
        texts={['BJÄ', 'Politische Stimme', 'Junge Mediziner-Allianz', 'Seit 2013', 'Bündnis Junge Ärzte']}
        subtitle="Das BJÄ bündelt 19+ Verbände und Fachgesellschaften — die wichtigste Sammelbewegung junger Ärztinnen und Ärzte in Deutschland."
        image="/images/hubs/junge-fachgesellschaften.webp"
        colors={COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Junge Fachgesellschaften', href: '/singles-regional/junge-fachgesellschaften' },
          { label: 'BJÄ', href: '/singles-regional/junge-fachgesellschaften/themen/bjae-buendnis-junge-aerzte' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90 space-y-4 text-base leading-relaxed">
              <p>
                Das <strong>Bündnis Junge Ärztinnen und Ärzte (BJÄ)</strong>, gegründet 2013, ist die politische Allianz der Nachwuchs-Strukturen der deutschen Medizin. Anders als eine einzelne Junge Fachgesellschaft vertritt das BJÄ nicht ein Fach, sondern die Generation der 25- bis 40-jährigen Mediziner als Ganzes — gegenüber Bundesärztekammer, Kassenärztlicher Bundesvereinigung und Gesundheitspolitik.
              </p>
              <p>
                Mitglied sind Berufsverbände wie Marburger Bund (Junge Klinikärzte), Hartmannbund (junge Mediziner), Bundesvertretung der Medizinstudierenden (bvmd), aber auch die Jungen Sektionen großer Fachgesellschaften: JADE für Allgemeinmedizin, JUNGE DGIM für Innere, Young DGK für Kardiologie, Junge HNO, jDEGRO und viele mehr.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Bündnis Junge Ärzte: Geschichte und Selbstverständnis</h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Das BJÄ entstand 2013 aus der Beobachtung, dass die deutsche Ärzteschaft viele
              politische Strukturen hat — Bundesärztekammer, KBV, Marburger Bund, Hartmannbund —
              aber kaum eine Stimme, die spezifisch die Sicht der Jungen vertritt. Themen wie
              <strong> Weiterbildungsreform</strong>, <strong>Klinik-Arbeitsbedingungen</strong>,
              <strong> Versorgungswerk-Beiträge</strong>, <strong>Klinikfinanzierung</strong> und
              <strong> Vereinbarkeit von Familie und Klinik</strong> treffen junge Mediziner härter
              als etablierte Kolleginnen und Kollegen mit gefestigtem Status.
            </p>
            <p>
              Heute sind 19 und mehr Organisationen Teil des Bündnisses. Es positioniert sich
              regelmäßig öffentlich — etwa zur Krankenhausreform, zu Weiterbildungs-Curricula
              oder zu Fragen der Bedarfsplanung. Sprecher des BJÄ sitzen bei der
              Bundesärztekammer in Gremien und schreiben gemeinsame Briefe an Ministerien.
            </p>
            <p>
              Für eine einzelne Person ist eine direkte BJÄ-Mitgliedschaft nicht vorgesehen.
              Wer mitwirken will, tritt einer der Mitgliedsorganisationen bei und engagiert
              sich dort. Genau dort findet auch die fachliche und soziale Vernetzung statt —
              auf Kongressen, Summer Schools und in regionalen Stammtischen.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Die BJÄ-Mitglieder im Medicsingles-Cluster</h2>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            Diese Jungen Fachgesellschaften sind im BJÄ organisiert und auf Medicsingles mit eigener Detailseite vertreten:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BJAE_MEMBERS.map((m) => (
              <Link key={m.slug} href={`/singles-regional/junge-fachgesellschaften/${m.slug}`}
                className="block p-4 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
                <div className="text-base font-bold text-foreground">{m.name}</div>
                <div className="text-xs text-foreground/50 mt-1">{m.mutter}</div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">Häufige Fragen zum BJÄ</h2>
          <FAQAccordion items={FAQ} />
        </section>
      </ScrollReveal>


      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Weitere Themen-Übersichten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/singles-regional/junge-fachgesellschaften/themen/summer-schools-mediziner" className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
              <div className="text-2xl mb-2">☀️</div>
              <div className="text-base font-bold text-foreground mb-1">Summer Schools</div>
              <div className="text-xs text-foreground/60 leading-relaxed">DGGG, YARE, jDEGRO, Young DGN</div>
            </Link>
            <Link href="/singles-regional/junge-fachgesellschaften/themen/mentoring-programme-aerzte" className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
              <div className="text-2xl mb-2">🧭</div>
              <div className="text-base font-bold text-foreground mb-1">Mentoring-Programme</div>
              <div className="text-xs text-foreground/60 leading-relaxed">WAKWiN, AGJR, GeSRU Academics</div>
            </Link>
            <Link href="/singles-regional/junge-fachgesellschaften/themen/stipendien-junge-aerzte" className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
              <div className="text-2xl mb-2">🎓</div>
              <div className="text-base font-bold text-foreground mb-1">Stipendien</div>
              <div className="text-xs text-foreground/60 leading-relaxed">Reise, Forschung, Hospitation</div>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Direkt zum Mediziner-Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Mediziner-Singles aus jedem BJÄ-Mitglieds-Fach — auf Augenhöhe, ohne Erklärungs-Overhead.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-bjae">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
