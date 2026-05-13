import Link from 'next/link';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/seo/JsonLd';

const URL = 'https://medicsingles.de/magazin/singles-regional/junge-fachgesellschaften/themen/mentoring-programme-aerzte';
const BASE = 'https://medicsingles.de/magazin';

const FAQ = [
  {
    question: 'Was ist ein Mentoring-Programm in der Medizin?',
    answer: 'Ein Mentoring-Programm vermittelt erfahrene Ärztinnen oder Ärzte (Mentoren) an jüngere Kolleginnen oder Kollegen (Mentees) — meist über sechs bis zwölf Monate, zwei bis vier Treffen pro Jahr plus laufender Austausch. Themen sind Karriereentscheidungen, Habilitations- oder Forschungs-Strategie, Vereinbarkeit Familie und Klinik, Wechselüberlegungen zwischen Kliniken. Mehrere Junge Fachgesellschaften betreiben solche Programme strukturiert.',
  },
  {
    question: 'Welche Junge FGs haben etablierte Mentoring-Programme?',
    answer: 'Klassiker ist WAKWiN der Jungen DGAI in der Anästhesiologie, seit 2007 etabliert. Die DGAUM (Arbeitsmedizin) baut seit 2021 die AG Next Generation mit rund 20 Mentorinnen und Mentoren bundesweit auf. Die AG Junge Rheumatologie (rheumadocs) arbeitet mit Learning Groups, GeSRU Academics bietet strukturierte Mentorate in der Urologie, JADE pflegt regionale Tandem-Modelle.',
  },
  {
    question: 'Wer kann Mentee werden?',
    answer: 'In der Regel Mitglieder der jeweiligen Jungen Fachgesellschaft, oft mit einer Mindest-Berufserfahrung von einem Jahr in der Weiterbildung. Manche Programme richten sich auch an fortgeschrittene Studierende oder an junge Fachärzte vor der ersten Oberarzt-Position. Anmeldung läuft über das Junge-FG-Sekretariat oder eine eigene Mentoring-Plattform.',
  },
  {
    question: 'Was kostet Mentoring?',
    answer: 'Für Mitglieder der Mutter-FG sind die meisten Mentoring-Programme kostenfrei oder nur über den regulären Mitgliedsbeitrag finanziert. Was zusätzlich Geld kostet, sind Anreisen zu gemeinsamen Treffen — manche Junge FGs haben dafür Reisestipendien.',
  },
  {
    question: 'Bringt Mentoring auch außerhalb des Berufs etwas?',
    answer: 'Indirekt ja. Wer in einem Mentoring-Programm aktiv ist, baut früh ein Netzwerk auf, das über die eigene Klinik hinausgeht. Dieses Netzwerk wird zur Selbstverständlichkeit — und damit zum Boden, auf dem auch private Begegnungen passieren. Mentoring ist nicht Dating-Plattform, aber gleichgesinnte Berufs-Communitiy.',
  },
];

const PROGRAMS = [
  { fg: 'Junge DGAI', programm: 'WAKWiN-Mentoring seit 2007 — Vorbild für viele andere Fächer', slug: 'junge-dgai-anaesthesie' },
  { fg: 'AG Next Generation DGAUM', programm: 'Arbeitsmedizin-Mentoring seit 2021, ca. 20 Mentorinnen und Mentoren bundesweit', slug: 'ag-next-generation-arbeitsmedizin' },
  { fg: 'AG Junge Rheumatologie (rheumadocs)', programm: 'Learning Groups mit Fallpräsentationen, strukturierte Tandems', slug: 'ag-junge-rheumatologie' },
  { fg: 'GeSRU', programm: 'GeSRU Academics — Urologie-Mentoring plus Steps-Videoplattform', slug: 'gesru-urologie' },
  { fg: 'JADE', programm: 'Regionale Tandem-Modelle, kostenfreie Mitgliedschaft', slug: 'jade-allgemeinmedizin' },
  { fg: 'Generation PSY', programm: 'Mentoring-Programm plus Facharztprüfungs-Intensivkurse', slug: 'generation-psy' },
  { fg: 'Junge DGHO', programm: 'Mentoring im Rahmen der Jahresveranstaltung Hämatologie/Onkologie', slug: 'junge-dgho-onkologie' },
];

const COLORS = [{ r: 15, g: 139, b: 141 }, { r: 47, g: 181, b: 184 }, { r: 255, g: 122, b: 0 }];

export const metadata = {
  title: 'Mediziner Mentoring: Programme der Jungen FGs (Übersicht)',
  description: 'Mediziner Mentoring der Jungen FGs: WAKWiN (DGAI seit 2007), AG Next Generation DGAUM, AGJR, GeSRU Academics, JADE-Tandems — Karriere in der Weiterbildung.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Mediziner-Mentoring in Deutschland — Programme',
    description: 'Strukturierte Mentoring-Programme der Jungen Fachgesellschaften — von Anästhesie bis Urologie.',
    url: URL, type: 'website', siteName: 'Medicsingles Magazin', locale: 'de-DE',
  },
};

export default function MentoringPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Magazin', url: BASE },
        { name: 'Singles Regional', url: `${BASE}/singles-regional` },
        { name: 'Junge Fachgesellschaften', url: `${BASE}/singles-regional/junge-fachgesellschaften` },
        { name: 'Mentoring', url: URL },
      ])} />
      <JsonLd data={faqJsonLd(FAQ)} />

      <PillarHero
        title="Mentoring für junge Ärzte"
        texts={['Mentoring', 'WAKWiN', 'Tandems', 'Karriere-Coaching', 'Mentoring für junge Ärzte']}
        subtitle="Strukturierte Mentoring-Programme der Jungen Fachgesellschaften — von WAKWiN in der Anästhesie bis zu GeSRU Academics in der Urologie."
        image="/images/hubs/junge-fachgesellschaften.webp"
        colors={COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Junge Fachgesellschaften', href: '/singles-regional/junge-fachgesellschaften' },
          { label: 'Mentoring', href: '/singles-regional/junge-fachgesellschaften/themen/mentoring-programme-aerzte' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90 space-y-4 text-base leading-relaxed">
              <p>
                Mediziner-Mentoring ist im deutschen Klinikalltag das stille Rückgrat der Karriereentwicklung. Wer früh eine Mentorin oder einen Mentor außerhalb der eigenen Abteilung hat, bekommt eine zweite Stimme zu Habilitation, Klinikwechsel, Forschungspfad und Teilzeit-Optionen — Themen, bei denen die direkte Vorgesetzten-Beziehung oft nicht der beste Ort ist.
              </p>
              <p>
                Mehrere Junge Fachgesellschaften haben dafür strukturierte Tandem-Formate aufgebaut. Klassiker ist WAKWiN der Jungen DGAI seit 2007. Andere Fächer haben in den letzten Jahren nachgezogen — Arbeitsmedizin, Rheumatologie, Urologie, Hämatologie und Onkologie.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Mediziner Mentoring: Programme der Jungen FGs im Überblick</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROGRAMS.map((p) => (
              <Link key={p.slug} href={`/singles-regional/junge-fachgesellschaften/${p.slug}`}
                className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
                <div className="text-base font-bold text-foreground mb-2">{p.fg}</div>
                <div className="text-sm text-foreground/70 leading-relaxed">{p.programm}</div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Wie ein gutes Tandem in der Medizin funktioniert</h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Strukturierte Tandems arbeiten mit klaren Paarungen über zwölf Monate. Zwei bis vier persönliche Treffen pro Jahr, dazwischen laufender Austausch per Telefon oder Mail. Themen werden meist im ersten Treffen gesetzt: Habilitationspläne, Auslandsaufenthalt, Wechsel in die Niederlassung, Versorgungsforschung, Familienplanung. Die Mentorinnen und Mentoren sind nicht die direkten Vorgesetzten — genau deshalb funktioniert das Format.
            </p>
            <p>
              <strong>WAKWiN</strong> in der Anästhesie ist das älteste deutsche Begleitungs-Format und Vorlage vieler andere. Es vermittelt seit 2007 systematisch Tandems zwischen jungen DGAI-Mitgliedern und erfahrenen Kolleginnen aus dem WAKWiN-Pool. Die <Link href="/singles-regional/junge-fachgesellschaften/ag-next-generation-arbeitsmedizin" className="text-brand-orange-text hover:underline">AG Next Generation</Link> der DGAUM nutzt seit 2021 ein vergleichbares Modell mit etwa 20 Mentorinnen und Mentoren bundesweit. <Link href="/singles-regional/junge-fachgesellschaften/gesru-urologie" className="text-brand-orange-text hover:underline">GeSRU Academics</Link> verbindet die Begleitung mit der Steps-Videoplattform.
            </p>
            <p>
              Wer in einem Fach ohne explizites Tandem-Format arbeitet, findet trotzdem Einstiege. Die <Link href="/singles-regional/junge-fachgesellschaften/themen/summer-schools-mediziner" className="text-brand-orange-text hover:underline">Summer Schools</Link> der Jungen FGs bauen praktisch immer einen Begleitungs-Slot ein. Wer dort dranbleibt, hat nach einem Wochenende einen ersten Kontakt, der oft jahrelang trägt.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">Häufige Fragen zum Mediziner-Mentoring</h2>
          <FAQAccordion items={FAQ} />
        </section>
      </ScrollReveal>


      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Weitere Themen-Übersichten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/singles-regional/junge-fachgesellschaften/themen/bjae-buendnis-junge-aerzte" className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
              <div className="text-2xl mb-2">🤝</div>
              <div className="text-base font-bold text-foreground mb-1">BJÄ — Bündnis Junge Ärzte</div>
              <div className="text-xs text-foreground/60 leading-relaxed">19+ Mitglieder, Allianz seit 2013</div>
            </Link>
            <Link href="/singles-regional/junge-fachgesellschaften/themen/summer-schools-mediziner" className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
              <div className="text-2xl mb-2">☀️</div>
              <div className="text-base font-bold text-foreground mb-1">Summer Schools</div>
              <div className="text-xs text-foreground/60 leading-relaxed">DGGG, YARE, jDEGRO, Young DGN</div>
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
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-mentoring">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
