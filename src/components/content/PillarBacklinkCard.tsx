import Link from 'next/link';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';

type Specialization = 'arzt' | 'pflege' | 'therapeut' | 'rettung';

interface Props {
  specialization?: Specialization;
}

const PILLARS: Record<Specialization, { heading: string; text: string; href: string; cta: string }> = {
  arzt: {
    heading: 'Partnersuche Ärzte — Der komplette Guide',
    text: 'Alle Cluster-Artikel zur Partnersuche für Ärztinnen und Ärzte — von Online-Dating über Erstes Date bis Karriere und Familie.',
    href: '/singles-partnersuche/aerzte',
    cta: 'Zum Ärzte-Guide →',
  },
  pflege: {
    heading: 'Partnersuche Pflege — Der komplette Guide',
    text: 'Cluster-Artikel rund um Dating im Schichtdienst, Beziehung in der Pflege und Lebenslagen zwischen Station und Privatleben.',
    href: '/singles-partnersuche/pflege',
    cta: 'Zum Pflege-Guide →',
  },
  therapeut: {
    heading: 'Partnersuche Therapeuten & Psychologen',
    text: 'Guides für Psychotherapeut:innen, Psycholog:innen und Coaches — Dating trotz Schweigepflicht, ethischer Grenzen und emotionaler Arbeit.',
    href: '/singles-partnersuche/therapeuten',
    cta: 'Zum Therapeuten-Guide →',
  },
  rettung: {
    heading: 'Partnersuche Rettungsdienst — Der komplette Guide',
    text: 'Cluster-Artikel zu 12/24-Rhythmus, Dating-Profil, Adrenalin-Abfall und Beziehung zwischen Einsatz und Leitstelle.',
    href: '/singles-partnersuche/rettung',
    cta: 'Zum Rettungsdienst-Guide →',
  },
};

export function PillarBacklinkCard({ specialization }: Props) {
  if (!specialization || !(specialization in PILLARS)) return null;
  const c = PILLARS[specialization];

  return (
    <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="mt-12 mb-8">
      <div className="p-6">
        <p className="font-bold text-foreground mb-1">{c.heading}</p>
        <p className="text-sm text-foreground/70 mb-4">{c.text}</p>
        <Link
          href={c.href}
          className="inline-flex items-center gap-2 bg-brand-orange text-white font-semibold rounded-full px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
        >
          {c.cta}
        </Link>
      </div>
    </AnimatedGradientBorder>
  );
}
