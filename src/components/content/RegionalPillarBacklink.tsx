import Link from 'next/link';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';

type Pillar = 'aerztekammern' | 'aerztestammtische';

interface Props {
  currentPillar: Pillar;
  bundesland: string;
  bundeslandName: string;
  stadt: string;
}

const PILLAR_META: Record<Pillar, { heading: string; text: string; cta: string }> = {
  aerztekammern: {
    heading: 'Ärztekammern — Der komplette Überblick',
    text: 'Alle 17 Landesärztekammern und Bezirkskammern für Mediziner-Singles — Bundesland für Bundesland.',
    cta: 'Zur Kammer-Übersicht →',
  },
  aerztestammtische: {
    heading: 'Ärztestammtische — Mediziner-Treffen vor Ort',
    text: 'JADE, Marburger Bund, ÄKV-Stammtische und lokale Initiativen — wo sich Mediziner offline treffen.',
    cta: 'Zur Stammtisch-Übersicht →',
  },
};

const CROSS_PILLAR_META: Record<Pillar, { heading: string; text: string; cta: string }> = {
  aerztekammern: {
    heading: 'Auch interessant: Ärztestammtisch in dieser Region',
    text: 'Informelles Networking ergänzt die formelle Kammer. JADE-Stammtisch, MB-Junges-Netzwerk und lokale Treffen vor Ort.',
    cta: 'Zum Stammtisch →',
  },
  aerztestammtische: {
    heading: 'Auch interessant: Ärztekammer dieser Region',
    text: 'Die Kammer ergänzt den Stammtisch um offizielle Fortbildungen, Delegiertenversammlungen und Authority-Networking.',
    cta: 'Zur Kammer →',
  },
};

export function RegionalPillarBacklink({ currentPillar, bundesland, bundeslandName, stadt }: Props) {
  const ownPillar = PILLAR_META[currentPillar];
  const otherPillar = currentPillar === 'aerztekammern' ? 'aerztestammtische' : 'aerztekammern';
  const cross = CROSS_PILLAR_META[currentPillar];
  const ownPillarHref = `/singles-regional/${currentPillar}`;
  const ownBLHref = `/singles-regional/${currentPillar}/${bundesland}`;
  const crossHref = `/singles-regional/${otherPillar}/${bundesland}/${stadt}`;

  return (
    <div className="space-y-4 mt-12 mb-8">
      <AnimatedGradientBorder borderRadius={12} borderWidth={2}>
        <div className="p-6">
          <p className="font-bold text-foreground mb-1">{ownPillar.heading}</p>
          <p className="text-sm text-foreground/70 mb-4">{ownPillar.text}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={ownPillarHref}
              className="inline-flex items-center gap-2 bg-brand-orange text-white font-semibold rounded-full px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
            >
              {ownPillar.cta}
            </Link>
            <Link
              href={ownBLHref}
              className="inline-flex items-center gap-2 bg-surface border border-foreground/20 text-foreground font-semibold rounded-full px-5 py-2.5 text-sm hover:border-brand-orange/50 transition-colors"
            >
              Alle in {bundeslandName} →
            </Link>
          </div>
        </div>
      </AnimatedGradientBorder>

      <AnimatedGradientBorder borderRadius={12} borderWidth={2}>
        <div className="p-6">
          <p className="font-bold text-foreground mb-1">{cross.heading}</p>
          <p className="text-sm text-foreground/70 mb-4">{cross.text}</p>
          <Link
            href={crossHref}
            className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange-text font-semibold rounded-full px-5 py-2.5 text-sm hover:bg-brand-orange/20 transition-colors"
          >
            {cross.cta}
          </Link>
        </div>
      </AnimatedGradientBorder>
    </div>
  );
}
