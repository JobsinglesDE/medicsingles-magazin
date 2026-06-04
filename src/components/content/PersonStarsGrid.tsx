import Link from 'next/link';
import Image from 'next/image';
import { reader } from '@/lib/keystatic';
import { getPersonHubUrl } from '@/lib/routes';

interface PersonStarsGridProps {
  show: string;
  heading?: string;
}

/** "Die Stars"-Grid: alle Personen-Hubs einer Show als runde Avatare. */
export async function PersonStarsGrid({ show, heading = 'Die Stars' }: PersonStarsGridProps) {
  const allPersons = await reader.collections.persons.all();
  const persons = allPersons
    .filter((p) => p.entry.show === show && p.entry.status !== 'draft')
    .sort((a, b) => a.entry.name.localeCompare(b.entry.name));

  if (persons.length === 0) return null;

  return (
    <section className="mt-12 mb-12">
      <h2 className="text-xl font-bold mb-6">{heading}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {persons.map((p) => (
          <Link
            key={p.slug}
            href={getPersonHubUrl(p.slug, show)}
            className="group flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-brand-orange/30 group-hover:ring-brand-orange transition-all bg-surface-dark">
              {p.entry.featuredImage ? (
                <Image
                  src={p.entry.featuredImage}
                  alt={p.entry.featuredImageAlt || p.entry.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-foreground/30">
                  {p.entry.name.charAt(0)}
                </div>
              )}
            </div>
            <p className="font-semibold text-sm mt-3 group-hover:text-brand-orange transition-colors">
              {p.entry.name}
            </p>
            {p.entry.role && (
              <p className="text-xs text-foreground/50">{p.entry.role}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
