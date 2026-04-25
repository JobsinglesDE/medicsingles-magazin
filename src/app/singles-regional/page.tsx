import { PillarHero } from '@/components/content/PillarHero';
import { PillarArticleFeature } from '@/components/content/PillarArticleFeature';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';

const HUB_URL = 'https://medicsingles.de/magazin/singles-regional';

export const metadata = {
  title: 'Singles Regional — Ärztekammern und Mediziner-Stammtische in Deutschland',
  description: 'Regionale Partnersuche für Mediziner. Stammtische, Kammer-Netzwerke und lokale Treffpunkte für Singles aus Heilberufen — Bundesland für Bundesland.',
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: 'Singles Regional — Mediziner-Netzwerke vor Ort',
    description: 'Ärztekammer- und Stammtisch-Pages für jede Region. Wo Mediziner sich offline treffen.',
    url: HUB_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const HUB_COLORS = [
  { r: 15, g: 139, b: 141 },
  { r: 47, g: 181, b: 184 },
  { r: 255, g: 122, b: 0 },
];

const PILLARS = [
  {
    title: 'Ärztestammtische',
    excerpt: 'JADE, Marburger Bund, lokale Mediziner-Treffen. Wo informelles Networking auf Privatleben trifft — Stadt für Stadt aufgeschlüsselt.',
    href: '/singles-regional/aerztestammtische',
    icon: '🍻',
    color: '#FF7A00',
  },
  {
    title: 'Ärztekammern',
    excerpt: 'Alle 17 Landesärztekammern plus Bezirkskammern. Welche Fortbildungen Singles besuchen, wo Authority auf Realität trifft.',
    href: '/singles-regional/aerztekammern',
    icon: '🏛️',
    color: '#0F8B8D',
  },
];

export default function SinglesRegionalHub() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Singles Regional — Medicsingles',
          description: 'Regionale Mediziner-Netzwerke: Ärztestammtische und Ärztekammern in jedem Bundesland.',
          url: HUB_URL,
          items: PILLARS.map((p) => ({ name: p.title, url: `https://medicsingles.de/magazin${p.href}` })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://medicsingles.de/magazin' },
          { name: 'Singles Regional', url: HUB_URL },
        ])}
      />

      <PillarHero
        title="Singles Regional"
        texts={[
          'Mediziner vor Ort',
          'Stammtisch & Kammer',
          'Bundesland für Bundesland',
          'Liebe in deiner Region',
          'Singles Regional',
        ]}
        subtitle="Ärztestammtische und Kammer-Netzwerke nach Region — wo Mediziner sich offline treffen, abseits von Apps."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Dating-Apps allein reichen nicht. Mediziner-Singles finden Partner oft dort, wo sie ohnehin
                sind — bei Fortbildungen der Landesärztekammer, beim JADE-Stammtisch im Hofbräukeller,
                im Marburger-Bund-Regionaltreffen.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Singles Regional ist kein Event-Kalender. Es ist die ehrliche Karte: Welche Kammer-Events
                sind tatsächlich für Begegnungen geeignet. Welcher Stammtisch ist offen für Quereinsteiger.
                Wo überschneidet sich Beruf mit Privatem auf eine Art, die niemandem peinlich ist.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Wähle dein Bundesland und finde Stammtische und Kammern, die zu deinem Berufsalltag passen.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      {/* Top CTA */}
      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://medicsingles.de/?AID=magazin-regional">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* 2 Pillars */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Die 2 Pillars
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Wähle dein Format: informell beim Stammtisch oder strukturiert über die Kammer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p) => (
              <PillarArticleFeature
                key={p.href}
                title={p.title}
                excerpt={p.excerpt}
                href={p.href}
                icon={<span className="text-2xl">{p.icon}</span>}
                accentColor={p.color}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für dein lokales Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Mediziner aus deiner Region — beim Stammtisch, in der Kammer, oder direkt auf Medicsingles.de.
          </p>
          <HeartButton href="https://medicsingles.de/?AID=magazin-regional">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
