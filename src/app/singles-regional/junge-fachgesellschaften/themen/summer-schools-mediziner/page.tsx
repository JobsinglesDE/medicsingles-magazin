import Link from 'next/link';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/seo/JsonLd';

const URL = 'https://medicsingles.de/magazin/singles-regional/junge-fachgesellschaften/themen/summer-schools-mediziner';
const BASE = 'https://medicsingles.de/magazin';

const FAQ = [
  {
    question: 'Was ist eine Mediziner-Summer-School?',
    answer: 'Eine Summer School ist eine mehrtägige Fortbildungs- und Vernetzungsveranstaltung — meist zwei bis fünf Tage am Stück, organisiert von einer Jungen Fachgesellschaft. Programm sind Workshops, Hands-on-Trainings, Case-Conferences, Mentoring-Runden und ein gemeinsames Abendprogramm. Zielgruppe: junge Fachärztinnen und Fachärzte, Assistenzärzte in Weiterbildung, oft auch fortgeschrittene Studierende.',
  },
  {
    question: 'Wer organisiert Summer Schools in Deutschland?',
    answer: 'Mehrere Junge Fachgesellschaften haben fest etablierte Sommer- oder Autumn-School-Formate: das Junge Forum DGGG (Gynäkologie, seit 2018, bundesweit rotierend), YARE in der Endokrinologie (Annual Meeting plus ESE Summer School), jDEGRO in der Strahlentherapie, Young DGN Autumn School in der Nuklearmedizin, die DGKJ-Winterschule Schwanenwerder in der Pädiatrie. Junge Suchtmedizin plant für 2026 erstmals eine Summer School.',
  },
  {
    question: 'Was kostet die Teilnahme?',
    answer: 'Die meisten Summer Schools sind für Mitglieder der jeweiligen Jungen Fachgesellschaft sehr günstig oder kostenfrei, die Mutter-FG übernimmt häufig Teile der Kosten. Anreise und Unterkunft sind oft selbst zu tragen, viele FGs bieten aber Reisestipendien gerade für Assistenzärzte und Studierende. Details stehen auf den FG-Webseiten.',
  },
  {
    question: 'Lohnt sich eine Summer School für jemanden, der noch in der Weiterbildung steht?',
    answer: 'Ja — gerade dann. Das Format zielt explizit auf Fachärzte in der Weiterbildung. Die Workshops sind oft an realen Klinik-Cases gebaut, die Mentoring-Runden bringen erfahrene Kolleginnen an einen Tisch, und die Vernetzung läuft auf Augenhöhe. Wer früh dabei ist, kennt Schwerpunkt-Köpfe vor der Subspezialisierung.',
  },
  {
    question: 'Wie funktioniert das Kennenlernen auf einer Summer School privat?',
    answer: 'Mehrtägige Veranstaltungen erzeugen eine Dichte, die ein Stammtisch nicht hat. Gemeinsame Anreise, geteilte Workshops, Abendprogramm im selben Haus, Frühstücks-Slots am nächsten Morgen. Drei Anker funktionieren erfahrungsgemäß: das Abendessen am ersten Tag, Pausen zwischen den Sessions, die letzte Abend-Runde. Wer dort offen für ein Privatgespräch ist, trifft Menschen, die nicht erklärt werden müssen.',
  },
];

const SCHOOLS = [
  { fg: 'Junges Forum DGGG', fach: 'Gynäkologie/Geburtshilfe', format: 'Summer Schools seit 2018, bundesweit rotierend, Junior Academies seit 2022', slug: 'junges-forum-dggg-gynaekologie' },
  { fg: 'YARE', fach: 'Endokrinologie', format: 'YARE Annual Meeting plus ESE Summer School im europäischen Verbund', slug: 'yare-endokrinologie' },
  { fg: 'jDEGRO', fach: 'Strahlentherapie/Radioonkologie', format: 'jDEGRO Sessions plus Schulungs-Formate an der DEGRO-Jahrestagung', slug: 'jdegro-strahlentherapie' },
  { fg: 'Young DGN', fach: 'Nuklearmedizin', format: 'Young DGN Autumn School jährlich, Sessions auf Nuklearmedizin-Kongress', slug: 'young-dgn-nuklearmedizin' },
  { fg: 'Generation PSY', fach: 'Psychiatrie', format: 'Summer Schools plus Mentoring und Facharztprüfungs-Intensivkurse', slug: 'generation-psy' },
  { fg: 'Junge Suchtmedizin', fach: 'Suchtmedizin', format: 'Summer School 2026 erstmals geplant, Spotlight-Sucht-Online-Events', slug: 'junge-suchtmedizin' },
  { fg: 'Young DGK', fach: 'Kardiologie', format: 'Young DGK Autumn School jährlich, Sessions an DGK Herztage', slug: 'young-dgk-kardiologie' },
  { fg: 'Junge DGHO', fach: 'Hämatologie/Onkologie', format: 'Mehrtägige Jahresveranstaltung für junge Mediziner und Studierende', slug: 'junge-dgho-onkologie' },
];

const COLORS = [{ r: 15, g: 139, b: 141 }, { r: 47, g: 181, b: 184 }, { r: 255, g: 122, b: 0 }];

export const metadata = {
  title: 'Mediziner Summer Schools: Termine, Stipendien, Bewerbung',
  description: 'Summer Schools für junge Mediziner: DGGG, YARE, jDEGRO, Young DGN, Generation PSY, Junge Suchtmedizin, Young DGK. Format, Anmeldung, Stipendien.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Mediziner-Summer-Schools im Überblick',
    description: 'Welche Junge FG veranstaltet welche Summer School in Deutschland — Format, Termine, Anmeldung.',
    url: URL, type: 'website', siteName: 'Medicsingles Magazin', locale: 'de-DE',
  },
};

export default function SummerSchoolsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Magazin', url: BASE },
        { name: 'Singles Regional', url: `${BASE}/singles-regional` },
        { name: 'Junge Fachgesellschaften', url: `${BASE}/singles-regional/junge-fachgesellschaften` },
        { name: 'Summer Schools', url: URL },
      ])} />
      <JsonLd data={faqJsonLd(FAQ)} />

      <PillarHero
        title="Mediziner Summer Schools"
        texts={['Summer Schools', 'Autumn Schools', 'Sommerakademien', 'Mehrtägige Workshops', 'Mediziner Summer Schools']}
        subtitle="Mehrtägige Fortbildungs- und Vernetzungs-Formate junger Fachgesellschaften — DGGG, YARE, jDEGRO, Young DGN, Generation PSY, Young DGK und mehr."
        image="/images/hubs/junge-fachgesellschaften.webp"
        colors={COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Junge Fachgesellschaften', href: '/singles-regional/junge-fachgesellschaften' },
          { label: 'Summer Schools', href: '/singles-regional/junge-fachgesellschaften/themen/summer-schools-mediziner' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90 space-y-4 text-base leading-relaxed">
              <p>
                Summer Schools sind das dichteste Vernetzungs-Format, das die deutsche Mediziner-Nachwuchsszene zu bieten hat. Zwei bis fünf Tage gemeinsamer Workshops, Mentoring, Hands-on-Sessions und Abendprogramm — meist organisiert von einer Jungen Fachgesellschaft, fast immer offen für Mitglieder der Mutter-FG zu sehr reduzierten Konditionen.
              </p>
              <p>
                Wer als Assistenzärztin oder Assistenzarzt in der Weiterbildung steht und über den eigenen Klinikflur hinausschauen will, findet hier den effizientesten Hebel: gleicher Fachhintergrund, gleiche Altersgruppe, klar abgegrenzter Zeitraum.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Mediziner Summer Schools in Deutschland: Etablierte Formate</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-foreground/85">
              <thead>
                <tr className="border-b border-foreground/20 text-left">
                  <th className="py-3 pr-4">Junge FG</th>
                  <th className="py-3 pr-4">Fach</th>
                  <th className="py-3">Format</th>
                </tr>
              </thead>
              <tbody>
                {SCHOOLS.map((s) => (
                  <tr key={s.slug} className="border-b border-foreground/10">
                    <td className="py-3 pr-4 font-semibold">
                      <Link href={`/singles-regional/junge-fachgesellschaften/${s.slug}`} className="text-brand-orange-text hover:underline">{s.fg}</Link>
                    </td>
                    <td className="py-3 pr-4">{s.fach}</td>
                    <td className="py-3">{s.format}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Bewerbung, Stipendien, Kosten</h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Die meisten Summer Schools laufen über die Mitgliederverwaltung der jeweiligen Jungen FG. Wer Mitglied ist, zahlt einen reduzierten Beitrag — oft im niedrigen dreistelligen Bereich oder ganz kostenfrei. Nicht-Mitglieder zahlen mehr oder werden vor dem Beitritt zur Teilnahme aufgefordert. Anreise und Unterkunft sind in der Regel selbst zu tragen, viele FGs bieten aber Reisestipendien für Assistenzärzte und Studierende — siehe unsere <Link href="/singles-regional/junge-fachgesellschaften/themen/stipendien-junge-aerzte" className="text-brand-orange-text hover:underline">Stipendien-Übersicht</Link>.
            </p>
            <p>
              Bewerbungsfristen variieren je nach Schule — die Termine stehen auf den Webseiten der jeweiligen Jungen Fachgesellschaft. Manche Schools sind reine Anmeldungs-Formate (First-come-first-served), andere haben ein kuratorisches Filter, etwa ein Motivationsschreiben oder ein Abstract. Wer früh anmeldet, hat die besseren Chancen — die Plätze sind je nach Format auf 30 bis 100 Teilnehmer begrenzt.
            </p>
            <p>
              Eine Besonderheit: Die <Link href="/singles-regional/junge-fachgesellschaften/yare-endokrinologie" className="text-brand-orange-text hover:underline">YARE</Link>-Anbindung an die European Society of Endocrinology bringt ein europäisches Programm — wer dort dabei ist, lernt nicht nur die deutsche Endokrinologie-Szene kennen, sondern auch die europäische. Vergleichbar funktioniert die EFIM-Anbindung der <Link href="/singles-regional/junge-fachgesellschaften/junge-dgim" className="text-brand-orange-text hover:underline">JUNGE DGIM</Link>.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">Häufige Fragen zu Mediziner-Summer-Schools</h2>
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
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-summer-schools">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
