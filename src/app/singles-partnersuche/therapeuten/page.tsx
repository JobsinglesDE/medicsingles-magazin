import Link from 'next/link';
import { PillarHero } from '@/components/content/PillarHero';
import { PillarArticleFeature } from '@/components/content/PillarArticleFeature';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { JsonLd, breadcrumbJsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';

const THERAPEUTEN_URL = 'https://medicsingles.de/magazin/singles-partnersuche/therapeuten';

export const metadata = {
  title: 'Partnersuche Therapeuten & Psychologen — Dating für psychologische Fachkräfte',
  description: 'Partnersuche für Therapeuten, Psychologen und Coaches. Wie die emotionale Abgrenzung, das "Analysierst-du-mich-Klischee" und das erste Date wirklich funktionieren.',
  alternates: { canonical: THERAPEUTEN_URL },
  openGraph: {
    title: 'Partnersuche Therapeuten — Liebe ohne Couch',
    description: 'Dating als Therapeut, Psychologe oder Coach — zwischen Empathie, Abgrenzung und echter Nähe.',
    url: THERAPEUTEN_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const THERAPEUTEN_COLORS = [
  { r: 123, g: 92, b: 196 },
  { r: 155, g: 130, b: 215 },
  { r: 255, g: 122, b: 0 },
];

const CROSS_LINKS = [
  {
    title: 'Für Ärzte & Ärztinnen',
    excerpt: 'Dating zwischen Assistenzdienst, 60-Stunden-Woche und Klinikalltag.',
    href: '/singles-partnersuche/aerzte',
    icon: '🩺',
    color: '#0F8B8D',
  },
  {
    title: 'Für Pflegekräfte',
    excerpt: 'Partnersuche im Schichtdienst — ohne Erklärungen.',
    href: '/singles-partnersuche/pflege',
    icon: '💊',
    color: '#2E8B57',
  },
];

export default function TherapeutenPillar() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Partnersuche Therapeuten — Dating für psychologische Fachkräfte',
          description: 'Dating als Therapeut, Psychologe oder Coach. Ausführliche Cluster-Guides folgen in Kürze.',
          url: THERAPEUTEN_URL,
          items: [],
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: 'https://medicsingles.de/magazin/singles-partnersuche' },
          { name: 'Für Therapeuten', url: THERAPEUTEN_URL },
        ])}
      />
      <PillarHero
        title="Therapeuten Singles"
        texts={[
          'Erleben statt Analysieren',
          'Echte Nähe',
          'Coach sucht Herz',
          'Therapeuten Singles',
        ]}
        subtitle="Partnersuche für Therapeuten, Psychologen und Coaches — professionelle Distanz wahren, echte Beziehung finden."
        colors={THERAPEUTEN_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Für Therapeuten', href: '/singles-partnersuche/therapeuten' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Rund 68.000 approbierte Psychotherapeutinnen und Psychotherapeuten arbeiten in
                Deutschland — plus Tausende Psychologen, Coaches, Berater und Ergotherapeuten.
                Der Beruf verlangt Selbstreflexion, emotionale Arbeit und klare Abgrenzung.
                Genau diese Fähigkeiten, die im Job Gold wert sind, können im Dating zur Falle
                werden.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Der «Analysierst-du-mich-gerade?»-Witz beim ersten Date. Die Erwartung, dass
                du als Therapeutin ein perfektes Beziehungskonzept lieferst. Die Grenze zwischen
                beruflicher Empathie und privater Nähe, die sich nicht automatisch ergibt.
                Partnersuche für psychologische Fachkräfte hat eigene Regeln — und braucht
                eigene Antworten.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Auf Medicsingles.de triffst du Menschen, die dein Berufsfeld verstehen oder es
                zumindest wertschätzen. Kein Erklärungsmarathon über Supervisionen, Fortbildungen
                und emotionale Last. Echte Verbindungen zwischen Menschen, die wissen, dass
                Therapieräume Türen haben — und du privat eine andere Person bist.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=magazin-therapeuten">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* Coming Soon Notice */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-10">
          <div className="bg-surface/50 border border-brand-orange/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">📝 Ausführliche Guides folgen in Kürze</h2>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Wir bauen gerade die Cluster-Artikel für Therapeuten und Psychologen auf — von
              den fünf größten Dating-Herausforderungen über Profile, die Empathie ohne Therapie
              zeigen, bis hin zu rechtlich-ethischen Grenzen beim Daten ehemaliger Klienten.
            </p>
            <p className="text-foreground/60 leading-relaxed text-sm">
              Der{' '}
              <Link href="/partnersuche-therapeuten" className="text-brand-orange-text underline">
                bestehende Pillar-Guide
              </Link>
              {' '}liefert dir bereits den Überblick. Vertiefende Themen erscheinen hier laufend.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Cross-Links */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Weitere Berufsgruppen
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Vielleicht suchst du eine Partnerschaft außerhalb des therapeutischen Feldes.
            In diesen Communities findest du weitere Mediziner-Singles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CROSS_LINKS.map((link) => (
              <PillarArticleFeature
                key={link.href}
                title={link.title}
                excerpt={link.excerpt}
                href={link.href}
                icon={<span className="text-2xl">{link.icon}</span>}
                accentColor={link.color}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Psychologische Fachkräfte und Singles, die dein Feld verstehen — auf Medicsingles.de.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=magazin-therapeuten">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
