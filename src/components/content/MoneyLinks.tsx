import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';

// Motor → Money: Promi-Ärzte- und TV-Cast-Seiten sind der Traffic-Motor, ranken aber
// siloed (Related verlinkt nur innerhalb des eigenen Silos). Diese Brücke leitet
// Link-Equity gezielt auf die Berufs-/Studium-/Gehalt-Pillars (Money) — mit den
// Artikel-Titeln als deskriptive Anker. Default = arzt-zentriert, weil alle Motoren
// (Promi-Ärzte + Medizin-TV-Serien) Arzt-/Medizin-Themen sind.
const DEFAULT_MONEY_SLUGS = ['arzt-gehalt', 'medizinstudium', 'arzt'];

export async function MoneyLinks({
  slugs = DEFAULT_MONEY_SLUGS,
  heading = 'Beruf, Studium & Gehalt',
}: {
  slugs?: string[];
  heading?: string;
}) {
  const items = (
    await Promise.all(
      slugs.map(async (s) => {
        const a = await reader.collections.articles.read(s);
        return a
          ? { slug: s, title: a.title, section: a.section, specialization: a.specialization }
          : null;
      })
    )
  ).filter((x): x is NonNullable<typeof x> => !!x);

  if (items.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it) => (
          <Link
            key={it.slug}
            href={getArticleUrl(it.slug, it.specialization, it.section)}
            className="block p-4 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
          >
            <div className="text-xs uppercase text-foreground/50 mb-1">Berufsbild · medicsingles</div>
            <div className="text-base font-bold text-foreground">{it.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
