import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { getDoctorHubUrl } from '@/lib/routes';
import { HeartButton } from '@/components/ui/HeartButton';

/**
 * Spoke → Hub Backlink: wird in der Artikel-Detailseite gerendert, wenn das Artikel-Feld
 * `person` auf einen Promi-Arzt-Hub zeigt. Verlinkt zurück zum Personen-Hub unter /aerzte/{slug}.
 */
export async function DoctorBacklinkCard({ personSlug }: { personSlug: string }) {
  if (!personSlug) return null;
  const person = await reader.collections.persons.read(personSlug);
  if (!person || person.status === 'draft' || person.personType !== 'promi-arzt') return null;

  return (
    <div className="mt-12 mb-8 rounded-xl border border-white/10 bg-surface p-6 ambient-shadow">
      <p className="font-bold text-foreground mb-1">Mehr über {person.name}</p>
      <p className="text-sm text-foreground/70 mb-4">
        {person.intro ||
          `Steckbrief, Werdegang und alle Artikel zu ${person.name} im Überblick.`}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={getDoctorHubUrl(personSlug)}
          className="inline-flex items-center gap-2 bg-brand-orange text-white font-semibold rounded-full px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
        >
          Zum {person.name}-Hub →
        </Link>
        <Link
          href="/promi-aerzte"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-foreground px-5 py-2.5 transition-colors"
        >
          Alle Promi-Ärzte →
        </Link>
      </div>
    </div>
  );
}
