import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { CircularTestimonials } from '@/components/ui/CircularTestimonials';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';

const AERZTE_URL = 'https://medicsingles.de/magazin/singles-partnersuche/aerzte';

export const metadata = {
  title: 'Partnersuche Ärzte — Dating trotz Klinikalltag',
  description: 'Partnersuche für Ärztinnen und Ärzte: Guides zu Online-Dating, erstem Date, 60-Stunden-Woche und Karriere. Mediziner-Tipps von Mediziner-Singles.',
  alternates: { canonical: AERZTE_URL },
  openGraph: {
    title: 'Partnersuche Ärzte — Dating zwischen Assistenzdienst und Chefarzt',
    description: 'Singles im Arztberuf treffen — Schichtdienst, OP, Klinikalltag. Hier versteht man deinen Beruf ohne Erklärungen.',
    url: AERZTE_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const AERZTE_COLORS = [
  { r: 15, g: 139, b: 141 },
  { r: 47, g: 181, b: 184 },
  { r: 255, g: 122, b: 0 },
];

const testimonials = [
  {
    quote: 'Nach der Facharztprüfung dachte ich, die Beziehung bleibt auf der Strecke. Hier hab ich jemanden gefunden, der die 60-Stunden-Wochen nicht kommentiert — sondern mitträgt.',
    name: 'Dr. Lena K.',
    role: 'Fachärztin Innere Medizin, Berlin',
  },
  {
    quote: 'Ich wollte nicht ewig erklären, warum ich am Wochenende Notdienst habe. Hier weiss das jeder — und wir haben uns nach zwei Wochen im Kaffee zwischen zwei Diensten getroffen.',
    name: 'Dr. Markus B.',
    role: 'Assistenzarzt Chirurgie, München',
  },
  {
    quote: 'Zwei Ärzte in einer Beziehung — klingt anstrengend, ist aber entspannend. Wir planen Urlaub drei Monate voraus und haben trotzdem eine der ehrlichsten Beziehungen unseres Lebens.',
    name: 'Dr. Sarah M.',
    role: 'Oberärztin Anästhesie, Hamburg',
  },
];

const SECTIONS = [
  {
    title: '🩺 Grundlagen & Realität',
    intro: 'Warum Partnersuche als Arzt anders läuft — und was du darüber wissen solltest, bevor du anfängst.',
    slugs: [
      'partnersuche-aerzte-warum-schwer',
      'einsam-im-kittel-isolation-aerzte',
      'arzt-status-dating-anziehung-abschreckung',
    ],
  },
  {
    title: '💬 Online-Dating-Strategien',
    intro: 'Für Ärzte ist Online-Dating die mit Abstand effizienteste Methode. Hier findest du die richtigen Plattformen, Profil-Tipps und den Umgang mit Diskretion.',
    slugs: [
      'dating-profil-aerzte-pflegekraefte',
      'erste-nachricht-dating-app-mediziner',
      'dating-sicherheit-diskretion-arzt',
      'medicsingles-vs-tinder-nischen-dating',
    ],
  },
  {
    title: '☕ Erstes Date & Kennenlernen',
    intro: 'Micro-Dates, Video-Calls als Vorfilter und Gesprächsthemen, die nicht in Fachsimpelei abdriften.',
    slugs: [
      'erstes-date-aerzte-ideen',
      'gespraechsthemen-erstes-date-arzt',
      'online-chat-zum-treffen-mediziner',
      'video-call-effizienz-booster-arzt-dating',
    ],
  },
  {
    title: '❤️ Beziehung & Alltag im Arztberuf',
    intro: 'Der Beruf sitzt als dritter Partner am Tisch. Wie Paare das managen, welche Rolle der Partner einnimmt und wie Kommunikation funktioniert.',
    slugs: [
      'beziehung-mit-arzt-partner',
      'wenn-zwei-aerzte-ein-paar-sind',
      'grenzen-setzen-arztberuf-privatleben',
      'kommunikation-beziehung-arzt-stress',
    ],
  },
];

const SECTIONS_AFTER_CTA = [
  {
    title: '👨‍👩‍👧 Zukunft, Karriere & Familie',
    intro: 'Familienplanung, Assistenzarzt-Karriere, Praxisgründung und die Balance zwischen zwei ambitionierten Menschen.',
    slugs: [
      'familienplanung-aerzte-kinder-karriere',
      'karriere-arzt-beziehung-assistenzarzt-chefarzt',
      'praxisgruendung-paar-arzt-finanzen',
      'zwei-karrieren-arzt-paar-power-couple',
    ],
  },
  {
    title: '🔬 Fachrichtungen & Lebenslagen',
    intro: 'Chirurgen, Allgemeinmediziner, Ärzte über 40 — die Realität ist nicht für alle gleich.',
    slugs: [
      'dating-als-chirurg',
      'partnersuche-allgemeinmedizin',
      'partnersuche-arzt-ueber-40',
    ],
  },
  {
    title: '🎓 Networking & Kontakte',
    intro: 'Kongresse, Ärztekammern und Unikliniken — wo Ärzte-Singles sich jenseits von Apps treffen.',
    slugs: [
      'aerzte-kongresse-singles-kennenlernen',
      'aerztekammer-netzwerke-singles',
      'uniklinik-singles-charite-lmu-kennenlernen',
      'charite-dating-guide-berlin',
      'lmu-klinikum-muenchen-mediziner-dating',
      'heidelberg-uniklinik-mediziner-treffpunkte',
      'deutscher-aerztetag-singles-networking',
      'hauptstadtkongress-berlin-aerzte-dating',
      'medica-duesseldorf-singles-medizinmesse',
      'marburger-bund-tarif-arbeitsbedingungen-partnerschaft',
    ],
  },
  {
    title: '❓ Häufige Fragen',
    intro: 'Die Fragen, die sich jeder Arzt beim Thema Dating stellt — kompakt beantwortet.',
    slugs: [
      'faq-partnersuche-aerzte',
      'kollegen-daten-krankenhaus-ja-nein',
      'zeitmanagement-60h-woche-dating-arzt',
      'beruf-arzt-dating-profil-erwaehnen-faq',
      'partner-ohne-akademischen-abschluss-arzt',
      'patient-flirtet-mit-arzt-umgang',
    ],
  },
];

export default async function AerztePillar() {
  const articles = await reader.collections.articles.all();
  const simonJulia = articles.find((a) => a.slug === 'erfolgsgeschichte-simon-julia-arzt-marketing');

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
          name: 'Partnersuche Ärzte — Der komplette Guide für Mediziner',
          description: 'Dating für Ärztinnen und Ärzte. Von Online-Dating über erstes Date bis zu Familienplanung und Praxisgründung.',
          url: AERZTE_URL,
          items: schemaItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: 'https://medicsingles.de/magazin/singles-partnersuche' },
          { name: 'Für Ärzte', url: AERZTE_URL },
        ])}
      />
      <PillarHero
        title="Ärzte Singles"
        texts={[
          'Liebe nach Visite',
          'Wer versteht OP?',
          'Arzt sucht Arzt',
          'Kittel-Romanze',
          'Ärzte Singles',
        ]}
        subtitle="Partnersuche für Ärztinnen und Ärzte — Schichtdienst, Klinikalltag, Verständnis und echte Verbindungen."
        colors={AERZTE_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Für Ärzte', href: '/singles-partnersuche/aerzte' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Rund 420.000 berufstätige Ärztinnen und Ärzte arbeiten in Deutschland — in
                Kliniken, Praxen, auf dem Land und in Uniklinik-Hochhäusern. Was sie verbindet:
                Dienstpläne, die sich nicht verbiegen lassen, eine emotionale Last, die selten
                zu Hause bleibt, und die Erfahrung, Partner zu haben, die den Beruf nie wirklich
                verstehen.
              </p>
              <p className="text-base leading-relaxed mt-4">
                44 Prozent der Ärzte sagen in Umfragen, dass ihr Beruf die Partnersuche erschwert.
                Klassische Dating-Apps filtern nicht nach Verständnis für 60-Stunden-Wochen.
                Sie kennen kein «Sorry, spontaner Notfall» und keine Antwortzeiten, die sich nach
                Dienstschluss richten. Das Ergebnis: halbherzige Matches, abgesagte Dates und
                eine Partnerschaft, die sich wie eine zusätzliche Nachtschicht anfühlt.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Medicsingles.de ist anders. Hier triffst du Menschen, die deinen Alltag kennen —
                weil sie ihn selbst leben oder zumindest wertschätzen. Keine Erklärungen, kein
                Rechtfertigen deiner Arbeitszeiten. Echte Verbindungen zwischen Menschen, die
                wissen, was der Beruf verlangt. Meld dich an — dein Match wartet.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-aerzte">
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
                Jetzt Ärzte-Singles in deiner Region finden
              </p>
              <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-aerzte">
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
      {simonJulia && (
        <ScrollReveal>
          <section className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
              💕 Echte Paare — Echte Geschichten
            </h2>
            <div className="grid grid-cols-1">
              <ArticleCard
                title={simonJulia.entry.title}
                excerpt={simonJulia.entry.excerpt}
                href={`/${simonJulia.slug}`}
                image={simonJulia.entry.featuredImage || undefined}
                imageAlt={simonJulia.entry.featuredImageAlt || undefined}
                category="Erfolgsgeschichte"
                date={simonJulia.entry.publishedAt || undefined}
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
          <h2 className="text-2xl font-bold mb-4">Bereit für dein Mediziner-Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Tausende Ärzte-Singles warten — Menschen, die deinen Alltag kennen.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-aerzte">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
