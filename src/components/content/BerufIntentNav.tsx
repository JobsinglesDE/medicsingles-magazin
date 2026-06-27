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

// Zweite Ebene: Gehalt nach Karrierestufe (eigene Suchvolumen je Stufe, z.B.
// "oberarzt gehalt"/"assistenzarzt gehalt" je 5.400/mo). Beruf-Key → Stufen-Spokes.
// Submenü erscheint nur auf Gehalt-Stufen-Seiten und nur für existierende Spokes.
const GEHALT_LADDER: Record<string, { label: string; slug: string }[]> = {
  arzt: [
    { label: 'Übersicht', slug: 'arzt-gehalt' },
    { label: 'Assistenzarzt', slug: 'assistenzarzt-gehalt' },
    { label: 'Facharzt', slug: 'facharzt-gehalt' },
    { label: 'Oberarzt', slug: 'oberarzt-gehalt' },
    { label: 'Chefarzt', slug: 'chefarzt-gehalt' },
  ],
  // Pflege-Leiter — alle Pflege-Gehalt-Spokes tragen position: pflegefachkraft
  pflegefachkraft: [
    { label: 'Pflegehelfer', slug: 'pflegehelfer-gehalt' },
    { label: 'Pflegefachkraft', slug: 'pflegefachkraft-gehalt' },
    { label: 'Altenpfleger', slug: 'altenpfleger-gehalt' },
    { label: 'Pflegedienstleitung', slug: 'pflegedienstleitung-gehalt' },
  ],
  // Apotheken-Leiter — PKA/PTA tragen position: apotheker
  apotheker: [
    { label: 'PKA', slug: 'pka-gehalt' },
    { label: 'PTA', slug: 'pta-gehalt' },
    { label: 'Apotheker', slug: 'apotheker-gehalt' },
  ],
  // Zahn-Leiter — ZFA trägt position: zahnarzt
  zahnarzt: [
    { label: 'ZFA', slug: 'zfa-gehalt' },
    { label: 'Zahnarzt', slug: 'zahnarzt-gehalt' },
  ],
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

  // Gehalt-Submenü (Karrierestufen) — nur wenn der aktive Slug Teil der Leiter ist.
  const ladder = GEHALT_LADDER[beruf] ?? [];
  const ladderTabs: Tab[] = ladder
    .filter((c) => availableSlugs.includes(c.slug))
    .map((c) => ({ label: c.label, href: `/berufsbilder/${c.slug}`, active: c.slug === activeSlug }));
  const showLadder = ladderTabs.length >= 2 && ladder.some((c) => c.slug === activeSlug);

  if (tabs.length < 2 && !showLadder) return null;

  return (
    <div className="my-6">
      {tabs.length >= 2 && (
        <nav aria-label="Berufsbild-Themen">
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
      )}

      {showLadder && (
        <nav aria-label="Gehalt nach Karrierestufe" className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-2">Gehalt nach Karrierestufe</p>
          <ul className="flex flex-wrap gap-2 list-none pl-0">
            {ladderTabs.map((t) => (
              <li key={t.href}>
                {t.active ? (
                  <span
                    aria-current="page"
                    className="inline-block px-3 py-1.5 rounded-full bg-brand-orange text-white text-xs font-semibold"
                  >
                    {t.label}
                  </span>
                ) : (
                  <Link
                    href={t.href}
                    className="inline-block px-3 py-1.5 rounded-full bg-surface border border-foreground/15 text-xs font-semibold text-foreground/70 hover:border-brand-orange/60 hover:text-brand-orange transition-colors"
                  >
                    {t.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
