import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/seo/JsonLd';

const FACHRICHTUNGEN: Record<string, { label: string; emoji: string; description: string }> = {
  innere: { label: 'Innere Medizin', emoji: '🫀', description: 'Junge Internisten, Kardiologie, Gastro, Nephrologie, Pneumologie, Onkologie, Endokrinologie, Rheumatologie, Diabetologie.' },
  chirurgie: { label: 'Chirurgie', emoji: '🔪', description: 'Perspektivforum, Viszeral, Orthopädie/Unfallchirurgie, Plastische, Hand, Herz, Thorax, Gefäß, Neuro, MKG.' },
  bildgebung: { label: 'Bildgebung & Strahlentherapie', emoji: '🩻', description: 'Forum Junge Radiologie, jDEGRO, Young DGN Nuklearmedizin.' },
  anaesthesie: { label: 'Anästhesie & Notfall', emoji: '💨', description: 'Junge DGAI, WAKWiN-Mentoring, junge Schmerzmedizin.' },
  'neuro-psy': { label: 'Neurologie & Psychiatrie', emoji: '🧠', description: 'Junge Neurologie DGN One, Generation PSY, Junge DGPPN.' },
  'paediatrie-gyn': { label: 'Pädiatrie & Geburtshilfe', emoji: '👶', description: 'Junges Forum DGGG, Junge DGKJ.' },
  allgemein: { label: 'Allgemein- & Hausarztmedizin', emoji: '🩺', description: 'JADE — Junge Allgemeinmedizin Deutschland, kostenfreie Mitgliedschaft.' },
  spezial: { label: 'Spezialfächer', emoji: '🔬', description: 'GeSRU Urologie, Junge HNO, Young DOG, JuDerm, Junge Geriatrie, Junge Suchtmedizin, BÄMI.' },
};
const FACH_KEYS = Object.keys(FACHRICHTUNGEN);

const FAQ = [
  {
    question: 'Was ist eine Junge Fachgesellschaft?',
    answer: 'Eine Junge Fachgesellschaft ist die Nachwuchs-Sektion einer medizinischen Fachgesellschaft. Sie richtet sich an Medizinstudierende, Assistenzärzt:innen in Weiterbildung und junge Fachärzt:innen — meist bis 40 Jahre. Typische Aufgaben: Vernetzung, Summer Schools, Stipendien, Lobbyarbeit für die Weiterbildung, eigene Sessions auf Fachkongressen. Fast jede größere deutsche Fachgesellschaft hat heute ein eigenes Junges Forum.',
  },
  {
    question: 'Was ist das Bündnis Junge Ärztinnen und Ärzte (BJÄ)?',
    answer: 'Das BJÄ ist ein Zusammenschluss von 19+ Verbänden und Fachgesellschaften, gegründet 2013. Es vertritt die Interessen junger Mediziner gegenüber Politik, Bundesärztekammer und Kassenärztlicher Bundesvereinigung. Mitglieder sind unter anderem JADE, Junge DGIM, jDEGRO, GeSRU, Forum Junge Radiologie, Junge HNO. Webseite: buendnisjungeaerzte.org.',
  },
  {
    question: 'Wie lerne ich auf einer Summer School jemanden privat kennen?',
    answer: 'Summer Schools (DGGG, DGAI, DGE/ESE, jDEGRO, DGKJ) sind mehrtägige Veranstaltungen mit gemeinsamen Workshops, Abendprogramm und Gruppenarbeit. Die Konstellation funktioniert: kleine Gruppen, gemeinsames Fach, klar abgegrenzter Zeitraum. Drei Anker — die gemeinsame Anreise, das Abendessen am ersten Tag und die Pausen-Slots zwischen den Sessions. Wer dort ein offenes Gespräch beginnt, hat hohe Chance, die Person auch nach der Schule wieder zu treffen.',
  },
  {
    question: 'Welche Junge FGs haben bundesweit regionale Stammtische?',
    answer: 'JADE (Allgemeinmedizin) hat das dichteste regionale Netz — viele Bundesländer, eigene Stammtische in Städten wie Berlin, München, Hamburg, Köln. Junge Neurologie DGN One hat regionale Treffen z.B. in München. Die meisten anderen Jungen FGs nutzen ihren Jahreskongress als zentrales Vernetzungs-Format und ergänzen mit digitalen Formaten. Wer regional weiter sucht, findet auf den Mediziner-Stammtisch-Pages pro Stadt die lokalen Anker.',
  },
  {
    question: 'Bringen die Junge-FG-Mitgliedschaften wirklich was für Dating?',
    answer: 'Direkt vermitteln sie nichts — sie sind Berufs-Communities, keine Dating-Plattformen. Indirekt sehr viel: gleicher Beruf, gleiche Altersgruppe (oft 25–40), gleiches Engagement-Level. Wer auf der Junge-DGIM-Session, dem Young-DGK-Autumn-School-Wochenende oder dem JADE-Stammtisch nicht nur fachlich, sondern offen für Privates ist, trifft Menschen, denen man weder Schichtdienst noch CME-Pflicht erklären muss. Genau dieser Kontext-Wegfall ist der Vorteil.',
  },
];

const PILLAR_URL = 'https://medicsingles.de/magazin/singles-regional/junge-fachgesellschaften';

export const metadata = {
  title: 'Junge Fachgesellschaften: Nachwuchs-Foren',
  description: 'Junge Sektionen der medizinischen Fachgesellschaften: BJÄ, JADE, JUNGE DGIM, Young DGK, jDEGRO und mehr. Treffen, Summer Schools, Stipendien.',
  alternates: { canonical: PILLAR_URL },
  openGraph: {
    title: 'Junge Fachgesellschaften — Mediziner-Nachwuchs vernetzt',
    description: 'Pro Fachrichtung: Junges Forum, Stammtisch-Format, Altersgrenze, BJÄ-Status. Wo Mediziner-Singles auf Augenhöhe netzwerken.',
    url: PILLAR_URL, type: 'website', siteName: 'Medicsingles Magazin', locale: 'de-DE',
  },
};

const FG_COLORS = [
  { r: 15, g: 139, b: 141 },
  { r: 47, g: 181, b: 184 },
  { r: 255, g: 122, b: 0 },
];

export default async function JungeFachgesellschaftenPillar() {
  const all = await reader.collections.jungeFachgesellschaften.all();
  const published = all
    .filter((a) => a.entry.status === 'published')
    .sort((a, b) => (a.entry.title || '').localeCompare(b.entry.title || ''));

  function inCluster(slug: string) {
    return published.filter((a) => a.entry.fachrichtung === slug);
  }

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Junge Fachgesellschaften — Singles Regional',
          description: 'Junge Sektionen deutscher medizinischer Fachgesellschaften.',
          url: PILLAR_URL,
          items: published.map((a) => ({
            name: a.entry.title,
            url: `${PILLAR_URL}/${a.slug}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles Regional', url: 'https://medicsingles.de/magazin/singles-regional' },
          { name: 'Junge Fachgesellschaften', url: PILLAR_URL },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQ)} />

      <PillarHero
        title="Junge Fachgesellschaften"
        texts={[
          'Nachwuchs-Foren',
          'Summer Schools',
          'BJÄ-Netzwerk',
          'Junge Mediziner vernetzt',
          'Junge Fachgesellschaften',
        ]}
        subtitle="Über 40 Junge Sektionen deutscher medizinischer Fachgesellschaften: JADE, JUNGE DGIM, Young DGK, jDEGRO, GeSRU. Wo der Nachwuchs sich trifft, wo Singles auf Augenhöhe netzwerken."
        image="/images/hubs/junge-fachgesellschaften.webp"
        colors={FG_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Junge Fachgesellschaften', href: '/singles-regional/junge-fachgesellschaften' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                In fast jeder größeren deutschen Fachgesellschaft gibt es heute eine Nachwuchs-Sektion —
                meist <strong>Junges Forum</strong> genannt, mit Mitgliedern unter 40: Studierende,
                Assistenzärzt:innen, Fachärzt:innen in der frühen Karrierephase. Diese Foren sind
                keine Dating-Plattformen, sondern Orte, an denen Mediziner gleicher Altersgruppe und
                gleichem Engagement aufeinandertreffen — ohne Schichtdienst, CME-Pflicht oder
                Facharztprüfung erklären zu müssen.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Wähle deine Fachrichtung — wir zeigen dir, welches Nachwuchs-Forum welches Format hat,
                ob Stammtisch, Summer School oder Kongress-Session, ob BJÄ-Mitglied und wo der
                erste sinnvolle Berührungspunkt liegt.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-junge-fg">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* Fachrichtungs-Grid */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Nach Fachrichtung
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Acht Cluster fassen über 40 Junge Sektionen zusammen — von der Inneren Medizin bis zu den Spezialfächern.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {FACH_KEYS.map((key) => {
              const f = FACHRICHTUNGEN[key];
              const list = inCluster(key);
              return (
                <div key={key} className="p-5 rounded-xl bg-surface border border-foreground/10">
                  <div className="text-3xl mb-2">{f.emoji}</div>
                  <div className="text-base font-bold text-foreground mb-2 leading-tight">{f.label}</div>
                  <div className="text-xs text-foreground/50 mb-3 leading-relaxed">{f.description}</div>
                  {list.length > 0 ? (
                    <ul className="text-sm space-y-1">
                      {list.map((a) => (
                        <li key={a.slug}>
                          <Link href={`/singles-regional/junge-fachgesellschaften/${a.slug}`} className="text-brand-orange-text hover:underline">
                            {a.entry.jungeFGName || a.entry.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-xs text-foreground/40 italic">In Vorbereitung</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Themen-Pillars */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Nach Thema
          </h2>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            Vier Themen-Übersichten bündeln Fakten quer durch alle Jungen FGs:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/singles-regional/junge-fachgesellschaften/themen/bjae-buendnis-junge-aerzte"
              className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
              <div className="text-2xl mb-2">🤝</div>
              <div className="text-base font-bold text-foreground mb-1">BJÄ — Bündnis Junge Ärzte</div>
              <div className="text-xs text-foreground/60 leading-relaxed">19+ Mitglieder, politische Allianz seit 2013</div>
            </Link>
            <Link href="/singles-regional/junge-fachgesellschaften/themen/summer-schools-mediziner"
              className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
              <div className="text-2xl mb-2">☀️</div>
              <div className="text-base font-bold text-foreground mb-1">Summer Schools</div>
              <div className="text-xs text-foreground/60 leading-relaxed">DGGG, YARE, jDEGRO, Young DGN und mehr</div>
            </Link>
            <Link href="/singles-regional/junge-fachgesellschaften/themen/mentoring-programme-aerzte"
              className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
              <div className="text-2xl mb-2">🧭</div>
              <div className="text-base font-bold text-foreground mb-1">Mentoring</div>
              <div className="text-xs text-foreground/60 leading-relaxed">WAKWiN, AGJR, GeSRU Academics, JADE-Tandems</div>
            </Link>
            <Link href="/singles-regional/junge-fachgesellschaften/themen/stipendien-junge-aerzte"
              className="block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors">
              <div className="text-2xl mb-2">🎓</div>
              <div className="text-base font-bold text-foreground mb-1">Stipendien</div>
              <div className="text-xs text-foreground/60 leading-relaxed">Reise-, Forschungs- und Hospitationsstipendien</div>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats-Strip */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: published.length, label: 'Junge Fachgesellschaften', sub: 'aktiv & verlinkt' },
              { num: published.filter((a) => a.entry.bjaeMitglied).length, label: 'davon im BJÄ', sub: 'Bündnis Junge Ärzte' },
              { num: 8, label: 'Fachrichtungs-Cluster', sub: 'Innere bis Spezial' },
              { num: 4, label: 'Themen-Übersichten', sub: 'BJÄ · Summer · Mentor · Stip.' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-surface-dark border border-foreground/10 px-5 py-4">
                <div className="text-3xl font-extrabold text-brand-orange-text leading-none">{s.num}</div>
                <div className="text-sm font-semibold text-foreground/90 mt-2">{s.label}</div>
                <div className="text-xs text-foreground/50 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Highlight-Spotlights: 3 BJÄ-Schwergewichte mit Hero-Bild */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Im Spotlight
          </h2>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            Drei BJÄ-Schwergewichte mit besonders aktiven Nachwuchs-Strukturen — Stammtisch, Autumn School, regionales Netzwerk.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {['jade-allgemeinmedizin', 'young-dgk-kardiologie', 'junge-dgim'].map((slug) => {
              const fg = published.find((a) => a.slug === slug);
              if (!fg) return null;
              return (
                <Link
                  key={slug}
                  href={`/singles-regional/junge-fachgesellschaften/${slug}`}
                  className="group block rounded-xl overflow-hidden bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  {fg.entry.featuredImage && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-surface-dark">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={fg.entry.featuredImage}
                        alt={fg.entry.featuredImageAlt || fg.entry.jungeFGName || fg.entry.title}
                        width={400}
                        height={225}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {fg.entry.bjaeMitglied && (
                        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider font-bold bg-brand-orange/90 text-white px-2 py-1 rounded">BJÄ</span>
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <div className="text-xs uppercase tracking-wider text-foreground/50 mb-2">{fg.entry.mutterFG}</div>
                    <div className="text-lg font-bold text-foreground leading-tight">{fg.entry.jungeFGName || fg.entry.title}</div>
                    {fg.entry.altersgrenze && (
                      <div className="text-xs text-foreground/60 mt-2">⌖ {fg.entry.altersgrenze}</div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Alphabetisch — visuelle FG-Cards */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-baseline justify-between mb-4 pb-2 border-b-2 border-brand-orange">
            <h2 className="text-2xl font-bold">Alle Junge Fachgesellschaften A–Z</h2>
            <span className="text-xs text-foreground/50 hidden sm:inline">{published.length} Pages</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {published.map((a) => {
              const fach = FACHRICHTUNGEN[a.entry.fachrichtung];
              return (
                <Link
                  key={a.slug}
                  href={`/singles-regional/junge-fachgesellschaften/${a.slug}`}
                  className="group relative block rounded-xl overflow-hidden bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
                >
                  <div className="flex gap-4 p-4">
                    {a.entry.featuredImage ? (
                      <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-surface-dark">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={a.entry.featuredImage}
                          alt={a.entry.featuredImageAlt || a.entry.jungeFGName || a.entry.title}
                          width={80}
                          height={80}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-20 w-20 shrink-0 rounded-lg bg-surface-dark flex items-center justify-center text-3xl">
                        {fach?.emoji || '🩺'}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-foreground leading-tight">
                        {a.entry.jungeFGName || a.entry.title}
                      </div>
                      <div className="text-[11px] text-foreground/50 mt-1">{a.entry.mutterFG}</div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {fach && (
                          <span className="text-[10px] uppercase tracking-wide bg-foreground/10 text-foreground/70 px-2 py-0.5 rounded">
                            {fach.emoji} {fach.label}
                          </span>
                        )}
                        {a.entry.bjaeMitglied && (
                          <span className="text-[10px] uppercase tracking-wide bg-brand-orange/15 text-brand-orange-text px-2 py-0.5 rounded font-semibold">
                            BJÄ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Topic-Content */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Wie die Mediziner-Nachwuchs-Szene in Deutschland funktioniert
          </h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Das <strong>Bündnis Junge Ärztinnen und Ärzte (BJÄ)</strong>, gegründet 2013, bündelt 19+
              Verbände und Fachgesellschaften unter einem Dach. Es ist die politische Stimme der
              Mediziner-Generation zwischen 25 und 40 gegenüber Bundesärztekammer, KBV und
              Gesundheitspolitik. Mitglieder reichen von <Link href="/singles-regional/junge-fachgesellschaften/jade-allgemeinmedizin" className="text-brand-orange-text hover:underline">JADE</Link> (Allgemeinmedizin)
              über die <Link href="/singles-regional/junge-fachgesellschaften/junge-dgim" className="text-brand-orange-text hover:underline">JUNGE DGIM</Link> bis zur
              <Link href="/singles-regional/junge-fachgesellschaften/gesru-urologie" className="text-brand-orange-text hover:underline"> GeSRU</Link> der Urologie.
            </p>
            <p>
              Die meisten Nachwuchs-Foren funktionieren nach dem gleichen Muster. Eine
              <strong> Altersgrenze unter 40</strong>, eine eigene Session auf dem jährlichen Fachkongress,
              ein bis zwei dedizierte Summer Schools oder Autumn Schools pro Jahr, ein
              Mentoring-Programm und Stipendien für Forschungsaufenthalte. Wer mitmacht,
              akzeptiert dass sein Netzwerk zur eigenen Karriere passt — und genau dieses Netzwerk
              ist auch privat hochwertvoll.
            </p>
            <p>
              Drei Nachwuchs-FGs haben besonders aktive regionale Strukturen: <strong>JADE</strong> mit Stammtischen
              in praktisch jeder größeren Stadt, <strong>DGN One</strong> in der Neurologie mit
              regionalen Treffen z.B. in München, und <strong>Young DGK</strong> mit
              Nucleus-Wahlen alle zwei Jahre und Autumn School. Wer regional weiter sucht,
              findet auf unseren <Link href="/singles-regional/aerztestammtische" className="text-brand-orange-text hover:underline">Mediziner-Stammtisch-Pages</Link> pro Stadt
              die JADE- und MB-Runden mit konkreten Treffpunkten. Wer eher klinik-zentriert
              netzwerken will, schaut bei den <Link href="/singles-regional/unikliniken" className="text-brand-orange-text hover:underline">Unikliniken</Link>:
              Forschungstage und Doktoranden-Retreats laufen oft parallel zu Nachwuchs-FG-Aktivitäten.
            </p>
            <p>
              Pro Nachwuchs-Forum zeigen die Detailseiten Format, BJÄ-Status, Treffpunkte und welche
              Anker für Mediziner-Singles relevant sind. Wähle deine Fachrichtung oben oder die
              FG direkt aus der A–Z-Liste.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Häufige Fragen zum Mediziner-Nachwuchs
          </h2>
          <FAQAccordion items={FAQ} />
        </section>
      </ScrollReveal>

      {/* Cross-Links */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Auch im Cluster Singles Regional
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/singles-regional/aerztestammtische" className="block p-6 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors">
              <div className="text-2xl mb-2">🍻</div>
              <div className="text-lg font-bold text-foreground mb-1">Ärztestammtische</div>
              <div className="text-sm text-foreground/60 leading-relaxed">JADE, MB, lokale Runden — pro Stadt sortiert.</div>
            </Link>
            <Link href="/singles-regional/unikliniken" className="block p-6 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors">
              <div className="text-2xl mb-2">🏥</div>
              <div className="text-lg font-bold text-foreground mb-1">Unikliniken</div>
              <div className="text-sm text-foreground/60 leading-relaxed">34 Häuser, Mensa, Sommerfest, Forschungstag.</div>
            </Link>
            <Link href="/singles-regional/aerztekammern" className="block p-6 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors">
              <div className="text-2xl mb-2">🏛️</div>
              <div className="text-lg font-bold text-foreground mb-1">Ärztekammern</div>
              <div className="text-sm text-foreground/60 leading-relaxed">17 Landeskammern, CME, Versorgungswerk.</div>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Lieber direkt zum Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Mediziner-Singles aus jedem Fachgebiet auf Medicsingles.de — Profil in zwei Minuten,
            erste Nachricht noch heute.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin-junge-fg">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
