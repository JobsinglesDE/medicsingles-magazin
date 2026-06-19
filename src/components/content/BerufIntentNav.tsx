import Link from 'next/link';

type Tab = { label: string; href: string; active: boolean };

// Geschlechts-Varianten teilen sich EINE Ausbildung-Seite (Kannibalisierung vermeiden)
const INTENT_ALIAS: Record<string, string> = {};

// Akademiker-Berufe: der Ausbildungsweg ist ein Studium → keyword-reicher Spoke-Slug
// (z.B. "pharmazie studium" 6.600/mo statt "apotheker-ausbildung"). Beruf-Key → Studium-Spoke-Slug.
const STUDIUM_ALIAS: Record<string, string> = {
  apotheker: 'pharmazie-studium',
  zahnarzt: 'zahnmedizin-studium',
  tierarzt: 'tiermedizin-studium',
};

/**
 * Intent-Leiste auf Berufsbild-Seiten: Übersicht · Ausbildung · Gehalt.
 * Jeder Tab ist eine eigene URL (Spoke), keine Anker — rankt eigenständig.
 * Tabs erscheinen nur, wenn der Spoke existiert.
 */
export function BerufIntentNav({
  beruf,
  activeSlug,
  availableSlugs,
}: {
  beruf: string;
  activeSlug: string;
  availableSlugs: string[];
}) {
  const resolve = (slug: string) => INTENT_ALIAS[slug] ?? slug;
  const candidates = [
    { label: 'Übersicht', slug: beruf },
    { label: 'Studium', slug: STUDIUM_ALIAS[beruf] ?? `${beruf}-studium` },
    { label: 'Ausbildung', slug: resolve(`${beruf}-ausbildung`) },
    { label: 'Gehalt', slug: resolve(`${beruf}-gehalt`) },
  ];
  const tabs: Tab[] = candidates
    .filter((c) => availableSlugs.includes(c.slug))
    .map((c) => ({
      label: c.label,
      href: `/berufsbilder/${c.slug}`,
      active: c.slug === activeSlug,
    }));

  if (tabs.length < 2) return null;

  return (
    <nav aria-label="Berufsbild-Themen" className="my-6">
      <ul className="flex flex-wrap gap-2 list-none pl-0">
        {tabs.map((t) => (
          <li key={t.href}>
            {t.active ? (
              <span
                aria-current="page"
                className="inline-block px-4 py-2 rounded-full bg-brand-orange text-white text-sm font-semibold"
              >
                {t.label}
              </span>
            ) : (
              <Link
                href={t.href}
                className="inline-block px-4 py-2 rounded-full bg-surface border border-foreground/15 text-sm font-semibold text-foreground/80 hover:border-brand-orange/60 hover:text-brand-orange transition-colors"
              >
                {t.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
