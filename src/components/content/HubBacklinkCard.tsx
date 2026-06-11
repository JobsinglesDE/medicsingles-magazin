import Link from 'next/link';
import { HeartButton } from '@/components/ui/HeartButton';

/**
 * Generische Backlink-Card Spoke → Hub (Berufsbilder, DEHOGA).
 * Ziel + Texte werden vom Aufrufer (ArticleView) bestimmt.
 */
export function HubBacklinkCard({
  heading,
  text,
  href,
  cta,
}: {
  heading: string;
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="not-prose my-12 rounded-2xl bg-surface border border-foreground/10 p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold mb-3">{heading}</h3>
      <p className="text-foreground/70 leading-relaxed mb-6">{text}</p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={href}
          className="inline-block px-5 py-2.5 rounded-lg bg-brand-orange text-white font-semibold hover:bg-brand-orange/90 transition"
        >
          {cta}
        </Link>
        <HeartButton href="https://medicsingles.de/registration/?AID=MedicMagazin">
          Jetzt mitmachen
        </HeartButton>
      </div>
    </div>
  );
}
