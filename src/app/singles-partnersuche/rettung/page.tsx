import Link from 'next/link';
import { PillarHero } from '@/components/content/PillarHero';
import { PillarArticleFeature } from '@/components/content/PillarArticleFeature';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { JsonLd, breadcrumbJsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';

const RETTUNG_URL = 'https://medicsingles.de/magazin/singles-partnersuche/rettung';

export const metadata = {
  title: 'Partnersuche Rettungsdienst — Dating für Rettungssanitäter und Notfallsanitäter',
  description: 'Partnersuche im Rettungsdienst — zwischen 12/24-Schichtrhythmus, Adrenalin-Abfall und dem, was man nach einem Einsatz nicht erklären kann. Für Rettungssanitäter, Notfallsanitäter und Notärzte.',
  alternates: { canonical: RETTUNG_URL },
  openGraph: {
    title: 'Partnersuche Rettungsdienst — Liebe trotz 12/24-Dienst',
    description: 'Dating im Wechselschicht-Rhythmus. Partner finden, die Adrenalin-Abfall und Einsatz-Stille verstehen.',
    url: RETTUNG_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const RETTUNG_COLORS = [
  { r: 220, g: 50, b: 50 },
  { r: 240, g: 100, b: 80 },
  { r: 255, g: 122, b: 0 },
];

const CROSS_LINKS = [
  {
    title: 'Für Ärzte & Ärztinnen',
    excerpt: 'Auch Notärzte finden hier passende Partner — zwischen Klinik, NEF und Funkruf.',
    href: '/singles-partnersuche/aerzte',
    icon: '🩺',
    color: '#0F8B8D',
  },
  {
    title: 'Für Pflegekräfte',
    excerpt: 'Pflege und Rettung teilen den Schichtdienst — die Dating-Realität ist ähnlich.',
    href: '/singles-partnersuche/pflege',
    icon: '💊',
    color: '#2E8B57',
  },
];

export default function RettungPillar() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Partnersuche Rettungsdienst — Dating für Rettungssanitäter',
          description: 'Dating für Rettungssanitäter, Notfallsanitäter und Notärzte. Ausführliche Cluster-Guides folgen in Kürze.',
          url: RETTUNG_URL,
          items: [],
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: 'https://medicsingles.de/magazin/singles-partnersuche' },
          { name: 'Für Rettungsdienst', url: RETTUNG_URL },
        ])}
      />
      <PillarHero
        title="Rettung Singles"
        texts={[
          'Liebe nach Einsatz',
          'Wer versteht 12/24?',
          'Adrenalin & Herz',
          'RTW Romanze',
          'Rettung Singles',
        ]}
        subtitle="Partnersuche für Rettungssanitäter, Notfallsanitäter und Notärzte — Wechselschicht, Adrenalin-Abfall und echte Verbindung."
        colors={RETTUNG_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles & Partnersuche', href: '/singles-partnersuche' },
          { label: 'Für Rettungsdienst', href: '/singles-partnersuche/rettung' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Rund 100.000 Menschen arbeiten in Deutschland im Rettungsdienst — als
                Rettungssanitäter, Notfallsanitäter und Notärzte auf RTW, NEF und in Leitstellen.
                Was sie verbindet: Ein 12/24-Schichtrhythmus, Adrenalin-Spitzen, die Stunden
                brauchen bis zum Abklingen, und eine mentale Belastung, die sich nicht einfach
                «nach Hause» lassen lässt.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Dating im Rettungsdienst ist kein Bonus-Thema. Es ist ein eigener Planet.
                Spontane Verabredungen am Wochenende? Unmöglich. Ein Partner, der den
                Adrenalin-Abfall nach einem Kindernotfall versteht, ohne es persönlich zu
                nehmen? Rar. Wer in diesem Beruf steht, kennt den Erklärungsmarathon. Und die
                Menschen, die trotzdem bleiben — weil sie wissen, was du jeden Tag leistest.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Medicsingles.de ist anders. Hier triffst du Menschen, die den Rettungsalltag
                kennen oder ihn zumindest wertschätzen. Keine Erklärungen, warum du nach einem
                Einsatz zwei Stunden nichts sagst. Echte Verbindungen zwischen Menschen, die
                wissen: Wer im RTW fährt, bringt mehr mit als einen Dienstplan.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=magazin-rettung">
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
              Wir bauen gerade die Cluster-Artikel für den Rettungsdienst — von der
              12/24-Rhythmus-Realität über Profile, die mit Adrenalin-Abfall umgehen, bis zu
              Beziehungen zwischen zwei Rettungsdienstlern und PTBS-Themen in neuen
              Partnerschaften.
            </p>
            <p className="text-foreground/60 leading-relaxed text-sm">
              Der{' '}
              <Link href="/partnersuche-rettung" className="text-brand-orange-text underline">
                bestehende Pillar-Guide
              </Link>
              {' '}liefert dir bereits den Überblick inklusive FAQ zu Schichtrhythmen, Kollegen-Dating
              und RettMobil-Networking. Vertiefende Themen erscheinen hier laufend.
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
            Der Rettungsdienst arbeitet eng mit Klinik und Pflege zusammen. Vielleicht findest
            du dort den passenden Partner.
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
            Rettungssanitäter, Notfallsanitäter und Menschen, die deinen 12/24-Rhythmus kennen.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=magazin-rettung">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
