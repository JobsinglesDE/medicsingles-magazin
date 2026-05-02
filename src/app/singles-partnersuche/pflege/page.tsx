import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { CircularTestimonials } from '@/components/ui/CircularTestimonials';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';

const PFLEGE_URL = 'https://medicsingles.de/magazin/singles-partnersuche/pflege';

export const metadata = {
  title: 'Partnersuche Pflege — Dating trotz Schichtdienst',
  description: 'Partnersuche für Pflegekräfte trotz Dreischicht und Dienstplan. Guides für Online-Dating, erstes Date und Beziehung im Pflegealltag — Medicsingles.de.',
  alternates: { canonical: PFLEGE_URL },
  openGraph: {
    title: 'Partnersuche Pflege — Liebe im Schichtdienst',
    description: 'Singles aus Pflege und Pflegeberufen. Hier versteht man deinen Dienstplan ohne Erklärungen.',
    url: PFLEGE_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const PFLEGE_COLORS = [
  { r: 46, g: 139, b: 87 },
  { r: 89, g: 176, b: 124 },
  { r: 255, g: 122, b: 0 },
];

const testimonials = [
  {
    quote: 'Nach fünf Jahren Spätdienst im Seniorenheim hatte ich Dating fast aufgegeben. Hier hab ich Max gefunden — Pfleger aus der Nachbarstadt. Wir teilen Dienstpläne und Ruhepausen.',
    name: 'Anna S.',
    role: 'Altenpflegerin, Köln',
  },
  {
    quote: 'Als Intensivpflegerin erklär ich normalerweise drei Mal pro Date, was ich beruflich mache. Hier nicht. Hier frag man nach Erfahrungen — nicht nach Definitionen.',
    name: 'Lisa K.',
    role: 'Intensivpflegerin, Berlin',
  },
  {
    quote: 'Ich dachte, als alleinerziehender Krankenpfleger bin ich schwer vermittelbar. Hier war das nie ein Thema — nur Teil meiner Realität.',
    name: 'Tom B.',
    role: 'Krankenpfleger, Hamburg',
  },
];

const SECTIONS = [
  {
    title: '💊 Grundlagen & Realität',
    intro: 'Die fünf zentralen Dating-Herausforderungen für Pflegekräfte — vom Schichtdienst über öffentliches Bild bis zum Gehalts-Realismus.',
    slugs: [
      'fuenf-dating-herausforderungen-pflege',
    ],
  },
  {
    title: '💬 Online-Dating im Schichtdienst',
    intro: 'Online-Dating funktioniert für Pflegekräfte besser als fast jede andere Methode. Du knüpfst Kontakte zwischen Spätdienst und Schlafphase, ohne Ausgehen. Die richtige Plattform, authentisches Profil und eine erste Nachricht, die zieht.',
    slugs: [
      'krankenschwester-partner-finden-online',
      'pfleger-dating-app-tipps',
      'erste-nachricht-krankenschwester-pfleger-dating',
      'online-dating-sicherheit-pflege-diskretion',
    ],
  },
  {
    title: '☕ Erstes Date & Kennenlernen',
    intro: 'Date-Ideen, die zum Pflege-Dienstplan passen — von Micro-Dates im Tagesloch bis zum Wochenende-Ausflug.',
    slugs: [
      'zehn-date-ideen-dienstplan-pflege',
      'gespraechsthemen-erstes-date-pflege',
      'chat-zu-treffen-pflegekraft-naechster-schritt',
    ],
  },
  {
    title: '❤️ Beziehung & Alltag in der Pflege',
    intro: 'Der Dienstplan sitzt als dritter Partner am Tisch. Wie Partner das tragen, warum emotionale Abgrenzung entscheidend ist, und wie zwei Pflegekräfte ein funktionierendes Paar werden.',
    slugs: [
      'beziehung-krankenschwester-nicht-pflege',
      'partnersuche-pflegekraft-stress-abgrenzung',
      'zwei-pflegekraefte-paar-gemeinsames-verstaendnis',
      'kommunikation-schichtdienst-beziehung-stark',
    ],
  },
];

const SECTIONS_AFTER_CTA = [
  {
    title: '👨‍👩‍👧 Zukunft, Karriere & Familie',
    intro: 'Familienplanung in der Pflege: Elternzeit, Wiedereinstieg, Betreuungs-Puzzle und finanzielle Realität zwischen Kind und Schichtdienst.',
    slugs: [
      'kind-karriere-kittel-familienplanung-pflege',
      'weiterbildung-pflege-partner-unterstuetzung',
      'finanzielle-absicherung-partnerschaft-pflege',
    ],
  },
  {
    title: '🌙 Spezifische Lebenslagen',
    intro: 'Dreischicht, alleinerziehend, Intensivstation — jede Pflege-Lebenslage hat ihre eigenen Dating-Herausforderungen.',
    slugs: [
      'dating-als-krankenschwester-schichtdienst',
      'alleinerziehend-pflegekraft-dating',
      'dating-als-intensivpfleger-stress-partner',
      'partnersuche-altenpflege-empathie-abgrenzung',
      'pflege-ueber-40-zweiter-fruehling-dating',
    ],
  },
  {
    title: '🎓 Networking & Kontakte',
    intro: 'Kongresse, Sportgruppen, Stationsteam — wo Pflegekräfte-Singles sich jenseits von Apps treffen.',
    slugs: [
      'pflegemanagementkongress-networking-pflege',
      'hobbies-ausgleich-pflege-singles-treffen',
      'kollegen-daten-station-krankenhaus-pflege',
    ],
  },
  {
    title: '❓ Häufige Fragen',
    intro: 'Die Fragen, die sich jede Pflegekraft beim Thema Dating stellt — kompakt beantwortet.',
    slugs: [
      'zeitmanagement-50h-woche-dating-pflege-faq',
    ],
  },
];

export default async function PflegePillar() {
  const articles = await reader.collections.articles.all();
  const annaMark = articles.find((a) => a.slug === 'erfolgsgeschichte-anna-mark-medicsingles');

  function getSectionArticles(slugs: string[]) {
    return slugs
      .map((slug) => articles.find((a) => a.slug === slug))
      .filter(Boolean) as typeof articles;
  }

  const allSectionSlugs = [...SECTIONS, ...SECTIONS_AFTER_CTA].flatMap((s) => s.slugs);
  const schemaItems = allSectionSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean)
    .map((a) => ({
      name: a!.entry.title,
      url: `https://medicsingles.de/magazin/${a!.slug}`,
    }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Partnersuche Pflege — Dating im Schichtdienst',
          description: 'Dating für Krankenschwestern, Pfleger und Pflegefachkräfte. Online-Dating, erstes Date und Beziehungs-Tipps für den Pflegealltag.',
          url: PFLEGE_URL,
          items: schemaItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: 'https://medicsingles.de/magazin/singles-partnersuche' },
          { name: 'Für Pflegekräfte', url: PFLEGE_URL },
        ])}
      />
      <PillarHero
        title="Pflege Singles"
        texts={[
          'Liebe im Dienst',
          'Wer versteht Schicht?',
          'Herz & Pflege',
          'Stations-Liebe',
          'Pflege Singles',
        ]}
        subtitle="Partnersuche für Krankenschwestern, Pfleger und Pflegefachkräfte — Schichtdienst, Verständnis und echte Verbindungen."
        colors={PFLEGE_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Für Pflegekräfte', href: '/singles-partnersuche/pflege' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Rund 1,7 Millionen Menschen arbeiten in Deutschland in der Pflege — Krankenpflege,
                Altenpflege, Intensivpflege, ambulante Dienste. Was sie verbindet: Dreischicht,
                kaum planbare Freizeit, körperliche Erschöpfung und eine emotionale Last, die selten
                jemand versteht, der nicht selbst in diesem Beruf steht.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Dating als Pflegekraft ist kein Luxusproblem. Es ist der Elefant im Raum, der oft
                ignoriert wird. Wer nach einer Nachtschicht um sieben Uhr morgens heimkommt und erst
                mal zwei Stunden runterfahren muss, hat es auf klassischen Dating-Apps schwer.
                Spontane Verabredungen? Fehlanzeige. Verständnis für den Beruf? Selten.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Medicsingles.de ist anders. Hier triffst du Menschen, die den Pflegealltag kennen —
                weil sie ihn selbst leben oder ihn zumindest wertschätzen. Keine Erklärungen mehr,
                warum du am Wochenende arbeitest. Echte Partnerschaft — mit jemandem, der deinen
                Rhythmus nicht toleriert, sondern versteht.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-pflege">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* Thematic Sections — before middle CTA */}
      {SECTIONS.map((section) => {
        const sectionArticles = getSectionArticles(section.slugs);
        if (sectionArticles.length === 0) return null;
        return (
          <ScrollReveal key={section.title}>
            <section className="max-w-6xl mx-auto px-6 py-10">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">
                {section.title}
              </h2>
              {section.intro && (
                <p className="text-foreground/70 mb-8 leading-relaxed">{section.intro}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectionArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    title={article.entry.title}
                    excerpt={article.entry.excerpt}
                    href={`/${article.slug}`}
                    image={article.entry.featuredImage || undefined}
                    imageAlt={article.entry.featuredImageAlt || undefined}
                    category={article.entry.category}
                    date={article.entry.publishedAt || undefined}
                  />
                ))}
              </div>
            </section>
          </ScrollReveal>
        );
      })}

      {/* Middle CTA */}
      <ScrollReveal>
        <section className="max-w-xl mx-auto px-6 py-10 text-center">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-background rounded-xl p-8 flex flex-col items-center gap-4">
              <p className="text-lg font-semibold">
                Jetzt Pflege-Singles in deiner Region finden
              </p>
              <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-pflege">
                Jetzt kostenlos registrieren
              </HeartButton>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Thematic Sections — after middle CTA */}
      {SECTIONS_AFTER_CTA.map((section) => {
        const sectionArticles = getSectionArticles(section.slugs);
        if (sectionArticles.length === 0) return null;
        return (
          <ScrollReveal key={section.title}>
            <section className="max-w-6xl mx-auto px-6 py-10">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">
                {section.title}
              </h2>
              {section.intro && (
                <p className="text-foreground/70 mb-8 leading-relaxed">{section.intro}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectionArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    title={article.entry.title}
                    excerpt={article.entry.excerpt}
                    href={`/${article.slug}`}
                    image={article.entry.featuredImage || undefined}
                    imageAlt={article.entry.featuredImageAlt || undefined}
                    category={article.entry.category}
                    date={article.entry.publishedAt || undefined}
                  />
                ))}
              </div>
            </section>
          </ScrollReveal>
        );
      })}

      {/* Success Story */}
      {annaMark && (
        <ScrollReveal>
          <section className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
              💕 Echte Paare — Echte Geschichten
            </h2>
            <div className="grid grid-cols-1">
              <ArticleCard
                title={annaMark.entry.title}
                excerpt={annaMark.entry.excerpt}
                href={`/${annaMark.slug}`}
                image={annaMark.entry.featuredImage || undefined}
                imageAlt={annaMark.entry.featuredImageAlt || undefined}
                category="Erfolgsgeschichte"
                date={annaMark.entry.publishedAt || undefined}
              />
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Testimonials */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-8">
          <CircularTestimonials items={testimonials} />
        </section>
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein Pflege-Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Krankenschwestern, Pfleger und Pflegefachkräfte — echte Menschen, die deinen Alltag teilen.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-pflege">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
