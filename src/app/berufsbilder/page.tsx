import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { articleHref } from '@/lib/routes';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { TableOfContents } from '@/components/content/TableOfContents';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';

const HUB_URL = 'https://medicsingles.de/magazin/berufsbilder';

export const metadata = {
  title: 'Medizinische Berufe: Ausbildung, Gehalt & Karriere',
  description:
    'Berufsbilder der Medizin im Überblick: MFA, Pflegefachkraft, Hebamme, Physiotherapie, Notfallsanitäter und Arzt — Ausbildung, Gehalt und Karrierewege mit aktuellen Tarifzahlen.',
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: 'Medizinische Berufe: Ausbildung, Gehalt & Karriere',
    description:
      'MFA, Pflege, Hebamme, Physiotherapie, Rettungsdienst und Ärzte: Ausbildung, Gehalt und Karriere im Überblick.',
    url: HUB_URL,
    type: 'website',
    siteName: 'MedicSingles Magazin',
    locale: 'de-DE',
  },
};

const HUB_COLORS = [
  { r: 15, g: 139, b: 141 },
  { r: 47, g: 181, b: 184 },
  { r: 255, g: 122, b: 0 },
];

type BerufSection = {
  beruf: string;
  letter: string;
  tocLabel: string;
  heading: string;
  paragraphs: string[];
};

const SECTIONS: BerufSection[] = [
  {
    beruf: 'mfa',
    letter: 'A',
    tocLabel: 'MFA: Ausbildung & Gehalt in der Arztpraxis',
    heading: 'MFA: Ausbildung, Gehalt & Alltag in der Arztpraxis',
    paragraphs: [
      'Medizinische Fachangestellte sind das Rückgrat jeder Praxis: Terminmanagement, Blutabnahme, Abrechnung, Patientenkontakt. Die duale Ausbildung dauert drei Jahre, bezahlt wird nach dem MFA-Tarifvertrag — und der Fachkräftemangel macht den Beruf so sicher wie selten zuvor.',
    ],
  },
  {
    beruf: 'pflegefachkraft',
    letter: 'B',
    tocLabel: 'Pflegefachkraft: Generalistik & TVöD',
    heading: 'Pflegefachkraft: Generalistische Ausbildung, Gehalt & Schichtalltag',
    paragraphs: [
      'Seit der Generalistik-Reform führt eine einzige Ausbildung zur Pflegefachfrau bzw. zum Pflegefachmann — Krankenhaus, Altenpflege und Kinderkrankenpflege in einem Berufsbild. Im öffentlichen Dienst regelt der TVöD-P das Gehalt, Zuschläge für Nacht und Wochenende kommen dazu.',
    ],
  },
  {
    beruf: 'hebamme',
    letter: 'C',
    tocLabel: 'Hebamme: Duales Studium & Verdienst',
    heading: 'Hebamme: Duales Studium, Gehalt & Geburtshilfe',
    paragraphs: [
      'Hebamme ist seit der Reform 2020 ein dualer Studiengang — Bachelor statt Berufsfachschule. Zwischen Kreißsaal-Schichten, freiberuflicher Wochenbettbetreuung und Haftpflicht-Thematik ist der Beruf anspruchsvoll, aber gefragter denn je.',
    ],
  },
  {
    beruf: 'physiotherapeut',
    letter: 'D',
    tocLabel: 'Physiotherapie: Ausbildung & Gehalt',
    heading: 'Physiotherapie: Ausbildung, Gehalt & Praxisalltag',
    paragraphs: [
      'Physiotherapeutinnen und Physiotherapeuten arbeiten dort, wo Medizin anfassbar wird: Reha, Praxis, Klinik, Sport. Die dreijährige Ausbildung ist inzwischen vielerorts schulgeldfrei, und mit eigener Praxis oder Spezialisierungen steigt der Verdienst deutlich.',
    ],
  },
  {
    beruf: 'notfallsanitaeter',
    letter: 'E',
    tocLabel: 'Notfallsanitäter: Ausbildung & Gehalt',
    heading: 'Notfallsanitäter: Ausbildung, Gehalt & Einsatzalltag',
    paragraphs: [
      'Notfallsanitäter sind die höchstqualifizierten Nichtärzte im Rettungsdienst. Drei Jahre Ausbildung, erweiterte Heilkunde-Kompetenzen und ein Alltag zwischen Routine-Transport und Reanimation — bezahlt nach TVöD mit Schicht- und Gefahrenzulagen.',
    ],
  },
  {
    beruf: 'arzt',
    letter: 'F',
    tocLabel: 'Arzt: Studium, Gehalt & Karrierestufen',
    heading: 'Arzt und Ärztin: Medizinstudium, Gehalt & Karrierestufen',
    paragraphs: [
      'Vom Medizinstudium über die Assistenzarzt-Jahre bis zur Fach- oder Oberarztposition: Kaum ein Berufsweg ist so klar gestaffelt — und so tarifgenau bezahlt (TV-Ärzte). Was in welcher Stufe verdient wird und wie lange der Weg wirklich dauert, steht hier.',
    ],
  },
];

export default async function BerufsbilderHub() {
  const articles = await reader.collections.articles.all();
  const berufArticles = articles.filter((a) => a.entry.section === 'berufsbilder');
  const byBeruf = (beruf: string) =>
    berufArticles
      .filter((a) => a.entry.position === beruf)
      .sort((a, b) => (a.entry.type === 'berufsbild' ? -1 : b.entry.type === 'berufsbild' ? 1 : 0));

  const tocItems = [
    ...SECTIONS.map((s) => ({ label: `${s.letter}. ${s.tocLabel}`, id: s.beruf })),
    { label: 'Gehalt in der Medizin: Berufe im Vergleich', id: 'gehaltsvergleich' },
  ];

  const itemList = berufArticles.map((a) => ({
    name: a.entry.title,
    url: `https://medicsingles.de/magazin${articleHref({ slug: a.slug, entry: a.entry })}`,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Medizinische Berufe: Ausbildung, Gehalt & Karriere — alle Berufsbilder',
          description:
            'MFA, Pflegefachkraft, Hebamme, Physiotherapie, Notfallsanitäter und Arzt im Überblick.',
          url: HUB_URL,
          items: itemList,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Berufsbilder', url: HUB_URL },
        ])}
      />

      <PillarHero
        title="Medizinische Berufe"
        texts={[
          '6 Berufsbilder',
          'MFA · Pflege · Hebamme',
          'Ausbildung, Gehalt, Realität',
          'Praxis · Klinik · Rettung',
        ]}
        subtitle="Die wichtigsten Gesundheitsberufe im Überblick — mit Ausbildungswegen, aktuellen Tarif-Gehältern und dem Alltag dahinter."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Berufsbilder', href: '/berufsbilder' }]} />
      </div>

      {/* Intro + TOC */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-lg leading-relaxed text-foreground/80 mb-4">
            Rund sechs Millionen Menschen arbeiten im deutschen Gesundheitswesen — von der MFA am
            Praxistresen über Pflegefachkräfte und Hebammen bis zu Ärztinnen und Ärzten. Hier findest du
            die wichtigsten Berufsbilder im Überblick: Ausbildung oder Studium, realistische
            Tarif-Gehälter und der Alltag, über den selten ehrlich gesprochen wird.
          </p>
          <p className="text-lg leading-relaxed text-foreground/80 mb-8">
            Jede Sektion fasst das Berufsbild kurz zusammen und verlinkt auf die ausführlichen Guides zu
            Ausbildung und Gehalt.
          </p>
          <TableOfContents items={tocItems} showFaq={false} />
        </section>
      </ScrollReveal>

      {/* Beruf-Sektionen A–F */}
      {SECTIONS.map((section) => {
        const sectionArticles = byBeruf(section.beruf);
        return (
          <ScrollReveal key={section.beruf}>
            <section id={section.beruf} className="max-w-6xl mx-auto px-6 py-10 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
                {section.letter}. {section.heading}
              </h2>
              <div className="max-w-3xl">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-foreground/80 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
              </div>
              {sectionArticles.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-8 mb-5 text-foreground/90">
                    Guide & vertiefende Artikel
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {sectionArticles.map((a) => (
                      <ArticleCard
                        key={a.slug}
                        title={a.entry.title}
                        excerpt={a.entry.excerpt}
                        href={articleHref({ slug: a.slug, entry: a.entry })}
                        image={a.entry.featuredImage || undefined}
                        imageAlt={a.entry.featuredImageAlt || undefined}
                        category={a.entry.category}
                        date={a.entry.publishedAt || undefined}
                      />
                    ))}
                  </div>
                </>
              )}
            </section>
          </ScrollReveal>
        );
      })}

      {/* Gehaltsvergleich */}
      <ScrollReveal>
        <section id="gehaltsvergleich" className="max-w-3xl mx-auto px-6 py-10 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Gehalt in der Medizin: Berufe im Vergleich
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Brutto-Monatsspannen für Berufseinsteiger bis erfahrene Fachkräfte — Details, Tariftabellen
            und Zuschläge stehen in den Gehalts-Guides der einzelnen Berufe.
          </p>
          <dl className="divide-y divide-foreground/10 rounded-2xl bg-surface border border-foreground/10 overflow-hidden">
            {[
              ['Arzt/Ärztin (Assistenz- bis Oberarzt)', 'ca. 5.500–10.000+ €', 'arzt'],
              ['Hebamme', 'ca. 3.300–4.500 €', 'hebamme'],
              ['Notfallsanitäter/in', 'ca. 3.200–4.300 €', 'notfallsanitaeter'],
              ['Pflegefachkraft', 'ca. 3.300–4.300 €', 'pflegefachkraft'],
              ['Physiotherapeut/in', 'ca. 2.700–3.800 €', 'physiotherapeut'],
              ['MFA', 'ca. 2.400–3.300 €', 'mfa'],
            ].map(([label, value, slug]) => (
              <div key={slug} className="flex justify-between gap-4 px-5 py-3 text-sm">
                <dt className="text-foreground/60">
                  <Link href={`/berufsbilder/${slug}`} className="hover:text-brand-orange transition-colors">
                    {label}
                  </Link>
                </dt>
                <dd className="font-semibold text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl font-bold mb-4">Singles aus diesen Berufen kennenlernen?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Ärztinnen, Pfleger, Hebammen, Sanitäter — auf MedicSingles triffst du Menschen, die
            Schichtdienst und Bereitschaft nicht erklärt bekommen müssen. Mehr im{' '}
            <Link href="/singles-partnersuche" className="text-brand-orange hover:underline">
              Partnersuche-Guide für Medizinberufe
            </Link>.
          </p>
          <HeartButton href="https://medicsingles.de/registration/?AID=MedicMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
