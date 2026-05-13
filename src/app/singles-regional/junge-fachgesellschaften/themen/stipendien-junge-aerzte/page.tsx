import Link from 'next/link';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/seo/JsonLd';

const URL = 'https://medicsingles.de/magazin/singles-regional/junge-fachgesellschaften/themen/stipendien-junge-aerzte';
const BASE = 'https://medicsingles.de/magazin';

const FAQ = [
  {
    question: 'Welche Stipendien gibt es für junge Ärztinnen und Ärzte?',
    answer: 'Die Jungen Fachgesellschaften vergeben in mehreren Kategorien: Reisestipendien für Kongresse oder Summer Schools (typisch 200 bis 1.000 Euro), Forschungsstipendien für Doktorarbeit oder Postdoc-Aufenthalte, Hospitationsstipendien für Klinik-Wechsel im In- und Ausland, sowie Industrie-finanzierte Sonderpreise. Wer Mitglied einer Jungen FG ist, hat Zugriff auf das jeweilige Stipendien-Portfolio.',
  },
  {
    question: 'Wie bewerbe ich mich auf ein Stipendium?',
    answer: 'Bewerbung läuft über die jeweilige Junge FG — meist mit Motivationsschreiben, kurzem Lebenslauf, ggf. einem Abstract der geplanten Forschung oder dem Kongressprogramm. Die Fristen stehen auf den FG-Webseiten. Manche Stipendien werden mehrmals pro Jahr ausgeschrieben, manche jährlich an einen Kongress gekoppelt.',
  },
  {
    question: 'Welche Junge FG hat das größte Stipendien-Portfolio?',
    answer: 'Bei den Reisestipendien sind Young DGK (Kardiologie) mit Stipendien zur Autumn School und JuDerm (Dermatologie) mit Dissertations-, Hospitations- und Reisestipendien besonders sichtbar. Die Junge DGHO vergibt im Rahmen ihrer Jahresveranstaltung gezielt Forschungs-Förderungen. Die Nachwuchsvertretung DGNC arbeitet mit industriellen Partnern (DePuySynthes Spine, Codman, Carl-Zeiss) für Neurochirurgie-Stipendien.',
  },
  {
    question: 'Brauche ich für ein Stipendium schon einen Doktortitel?',
    answer: 'Nein — viele Stipendien richten sich gezielt an Studierende und Assistenzärzte. Reisestipendien sind oft ohne Promotion zugänglich, Forschungsstipendien manchmal mit. Die Junge Geriatrie zum Beispiel vergibt zwei Studierenden-Stipendien zu je 300 Euro für den Jahreskongress, die DGNC-Stipendien adressieren Assistenzärzte in der Weiterbildung.',
  },
  {
    question: 'Kann ich Stipendien kumulieren?',
    answer: 'Meist ja, solange die einzelnen Stipendien-Geber das nicht ausschließen. Wer einen Auslandsaufenthalt plant, kombiniert oft ein Reisestipendium der Jungen FG mit DAAD-Förderung oder einer Stiftungsfinanzierung. Wichtig ist Transparenz gegenüber allen Gebern — das ist Bedingung in den Bewerbungsformularen.',
  },
  {
    question: 'Was bringt ein Stipendium über das Geld hinaus?',
    answer: 'Sichtbarkeit. Wer Stipendiat einer Jungen FG ist, wird oft in deren Newsletter, auf Kongressen und in Sessions vorgestellt — das öffnet Kontaktmöglichkeiten zu Schwerpunkt-Köpfen früh in der Karriere. Außerdem ist ein vergebenes Stipendium ein konkreter Lebenslauf-Eintrag, der bei späteren Bewerbungen für Oberarzt- oder Habilitationspositionen relevant wird.',
  },
];

const STIPS = [
  { fg: 'Young DGK', kategorie: 'Reisestipendien zur Autumn School Kardiologie', slug: 'young-dgk-kardiologie' },
  { fg: 'jDEGRO', kategorie: 'Reisestipendien und Sessions-Moderationen im DEGRO-Kontext', slug: 'jdegro-strahlentherapie' },
  { fg: 'Junge Geriatrie', kategorie: 'Zwei Studierenden-Stipendien zu je 300 Euro für DGG-Jahrestagung', slug: 'junge-geriatrie' },
  { fg: 'JuDerm', kategorie: 'Dissertations-, Hospitations- und Reisestipendien (Dermatologie)', slug: 'juderm-dermatologie' },
  { fg: 'Nachwuchsvertretung DGNC', kategorie: 'Industrie-Partner-Stipendien: DePuySynthes Spine, Codman, Carl-Zeiss', slug: 'nachwuchsvertretung-neurochirurgie' },
  { fg: 'YARE', kategorie: 'Travel Grants über die ESE-Anbindung (Endokrinologie)', slug: 'yare-endokrinologie' },
  { fg: 'Junge DGHO', kategorie: 'Forschungs-Förderung im Rahmen der Jahresveranstaltung Onkologie', slug: 'junge-dgho-onkologie' },
  { fg: 'Forum Junge Radiologie', kategorie: 'Stipendien für Fortbildungs-Events und Reading Tips', slug: 'forum-junge-radiologie' },
];

const COLORS = [{ r: 15, g: 139, b: 141 }, { r: 47, g: 181, b: 184 }, { r: 255, g: 122, b: 0 }];

export const metadata = {
  title: 'Stipendium junge Ärzte: Reisen, Forschung, Hospitation',
  description: 'Stipendium junge Ärzte: Reise-, Forschungs-, Hospitations- und Dissertationsförderung. Programme von Young DGK, JuDerm, DGNC, YARE, Junge Geriatrie, Junge DGHO.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Stipendien für junge Ärzte: alle Programme der Jungen FGs',
    description: 'Reise-, Forschungs- und Hospitationsstipendien junger Fachgesellschaften — sortiert nach Fach.',
    url: URL, type: 'website', siteName: 'Medicsingles Magazin', locale: 'de-DE',
  },
};

export default function StipendienPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Magazin', url: BASE },
        { name: 'Singles Regional', url: `${BASE}/singles-regional` },
        { name: 'Junge Fachgesellschaften', url: `${BASE}/singles-regional/junge-fachgesellschaften` },
        { name: 'Stipendien', url: URL },
      ])} />
      <JsonLd data={faqJsonLd(FAQ)} />

      <PillarHero
        title="Stipendien für junge Ärzte"
        texts={['Stipendien', 'Reisestipendien', 'Forschungsförderung', 'Hospitations-Stipendien', 'Stipendien für junge Ärzte']}
        subtitle="Reise-, Forschungs- und Hospitationsstipendien der Jungen Fachgesellschaften — Young DGK, JuDerm, DGNC, YARE, Junge Geriatrie und mehr."
        image="/images/hubs/junge-fachgesellschaften.webp"
        colors={COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Junge Fachgesellschaften', href: '/singles-regional/junge-fachgesellschaften' },
          { label: 'Stipendien', href: '/singles-regional/junge-fachgesellschaften/themen/stipendien-junge-aerzte' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90 space-y-4 text-base leading-relaxed">
              <p>
                Ein Stipendium für junge Ärzte ist in der deutschen Nachwuchsszene viel breiter aufgestellt, als die meisten denken. Reise-, Forschungs-, Hospitations- und Dissertations-Förderungen gibt es in fast jedem Fach — vergeben durch die Jungen Fachgesellschaften, oft kofinanziert durch Industrie-Partner oder die Mutter-FG. Wer Mitglied ist, hat Zugriff.
              </p>
              <p>
                Die folgende Übersicht zeigt etablierte Programme, sortiert nach Junger FG. Für die aktuellen Fristen und Höhen bitte die Webseite der jeweiligen FG prüfen — die Bedingungen ändern sich von Jahr zu Jahr.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Stipendium für junge Ärzte: Etablierte Förderprogramme</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-foreground/85">
              <thead>
                <tr className="border-b border-foreground/20 text-left">
                  <th className="py-3 pr-4">Junge FG</th>
                  <th className="py-3">Stipendien-Kategorie</th>
                </tr>
              </thead>
              <tbody>
                {STIPS.map((s) => (
                  <tr key={s.slug} className="border-b border-foreground/10">
                    <td className="py-3 pr-4 font-semibold">
                      <Link href={`/singles-regional/junge-fachgesellschaften/${s.slug}`} className="text-brand-orange-text hover:underline">{s.fg}</Link>
                    </td>
                    <td className="py-3">{s.kategorie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">Stipendium beantragen: Bewerbung und Strategie für junge Ärzte</h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Wer früh Förderungen sammelt, baut nicht nur einen Lebenslauf-Strang, sondern Sichtbarkeit. Stipendiatinnen und Stipendiaten werden in Newslettern, auf Kongressen und in Junge-FG-Sessions vorgestellt. Wer dort einmal namentlich genannt wurde, kommt bei der nächsten Bewerbung leichter durch.
            </p>
            <p>
              Praktischer Tipp: Förderprogramme lassen sich oft mit <Link href="/singles-regional/junge-fachgesellschaften/themen/summer-schools-mediziner" className="text-brand-orange-text hover:underline">Summer Schools</Link> kombinieren. Wer eine Reiseförderung für die Autumn School der Young DGK oder die ESE-Anbindung über YARE bekommt, finanziert nicht nur Anreise und Hotel, sondern auch die Mitgliedsbeiträge und Workshopkosten. Wer parallel in einem <Link href="/singles-regional/junge-fachgesellschaften/themen/mentoring-programme-aerzte" className="text-brand-orange-text hover:underline">Mentoring-Programm</Link> ist, hat einen Sparringspartner für die Bewerbungsunterlagen.
            </p>
            <p>
              Spezialfall <Link href="/singles-regional/junge-fachgesellschaften/nachwuchsvertretung-neurochirurgie" className="text-brand-orange-text hover:underline">Neurochirurgie</Link>: die Nachwuchsvertretung der DGNC arbeitet mit drei Industrie-Partnern für ihre Förderung — DePuySynthes Spine, Codman und Carl-Zeiss. Solche Industrie-Förderungen sind formal sauber, sollten aber in jeder Bewerbung transparent angegeben werden.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">Häufige Fragen zu Mediziner-Stipendien</h2>
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
            <Link href="/singles-regional/junge-fachgesellschaften/themen/mentoring-programme-aerzte" className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
              <div className="text-2xl mb-2">🧭</div>
              <div className="text-base font-bold text-foreground mb-1">Mentoring-Programme</div>
              <div className="text-xs text-foreground/60 leading-relaxed">WAKWiN, AGJR, GeSRU Academics</div>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-stipendien">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
