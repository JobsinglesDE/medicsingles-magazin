import Link from 'next/link';
import Image from 'next/image';
import { reader } from '@/lib/keystatic';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
import { getDoctorHubUrl } from '@/lib/routes';
import { PROMI_AERZTE_SECTION_HUB } from '@/lib/hubs';

const SITE = 'https://medicsingles.de/magazin';
const HUB_URL = `${SITE}/promi-aerzte`;

export const metadata = {
  title: PROMI_AERZTE_SECTION_HUB.seoTitle,
  description: PROMI_AERZTE_SECTION_HUB.seoDescription,
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: PROMI_AERZTE_SECTION_HUB.seoTitle,
    description: PROMI_AERZTE_SECTION_HUB.seoDescription,
    url: HUB_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de_DE',
  },
};

export default async function PromiAerzteHub() {
  const persons = (await reader.collections.persons.all())
    .filter((p) => p.entry.personType === 'promi-arzt' && p.entry.status !== 'draft')
    .sort((a, b) => a.entry.name.localeCompare(b.entry.name, 'de'));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Promi-Ärzte Deutschland',
          description: 'Deutschlands bekannteste TV-Mediziner im Portrait',
          url: HUB_URL,
          items: persons.map((p) => ({
            name: p.entry.name,
            url: `${SITE}${getDoctorHubUrl(p.slug)}`,
          })),
        })}
      />

      <section className="relative overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-teal/40 via-surface-dark to-background" />
        <div className="relative max-w-4xl mx-auto px-6 text-center py-12">
          <div className="text-6xl mb-4">⭐</div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Promi-Ärzte <span className="text-brand-orange-text">Deutschland</span>
          </h1>
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mt-4 leading-relaxed">
            {PROMI_AERZTE_SECTION_HUB.description}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-6">
        <Breadcrumbs items={[{ label: 'Promi-Ärzte', href: '/promi-aerzte' }]} />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {persons.map((p, idx) => (
            <Link
              key={p.slug}
              href={getDoctorHubUrl(p.slug)}
              className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-brand-orange transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg"
            >
              <div className="relative aspect-[3/2] bg-surface-dark overflow-hidden">
                {p.entry.featuredImage && (
                  <Image
                    src={p.entry.featuredImage}
                    alt={p.entry.featuredImageAlt || `${p.entry.name}, ${p.entry.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={idx < 3}
                    loading={idx < 3 ? undefined : 'lazy'}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-5">
                {p.entry.role && (
                  <div className="text-xs uppercase tracking-wider text-brand-orange-text font-semibold mb-2">
                    {p.entry.role}
                  </div>
                )}
                <h3 className="text-lg font-bold text-foreground leading-tight mb-2 group-hover:text-brand-orange-text transition-colors">
                  {p.entry.name}
                </h3>
                {p.entry.intro && (
                  <p className="text-sm text-foreground/60 line-clamp-3">{p.entry.intro}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-surface-dark/40 rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Was diese Mediziner verbindet</h2>
          <ul className="space-y-3 text-foreground/80">
            <li><strong className="text-brand-orange-text">Bestseller-Sachbuch:</strong> fast alle haben mindestens einen Spiegel-Bestseller veröffentlicht.</li>
            <li><strong className="text-brand-orange-text">Klare Spezialisierung:</strong> jeder hat ein eindeutig erkennbares Themenfeld etabliert (Ernährung, Haut, Lunge, Hausarztmedizin, Klimagesundheit).</li>
            <li><strong className="text-brand-orange-text">Patient-Education statt Fachsprache:</strong> alle übersetzen Medizin in Alltagssprache, ohne fachlich nachzulassen.</li>
            <li><strong className="text-brand-orange-text">Öffentlich-rechtlicher Karriere-Hebel:</strong> ARD, NDR, WDR, MDR, ZDF und SWR sind das entscheidende Sprungbrett.</li>
            <li><strong className="text-brand-orange-text">Doppelkarriere:</strong> klinische oder praktische Tätigkeit läuft fast immer parallel zur Medienkarriere weiter.</li>
          </ul>
          <p className="mt-6 text-sm text-foreground/60">
            Vertiefender Pillar-Text:{' '}
            <Link href="/promi-aerzte-deutschland" className="text-brand-orange-text hover:underline">
              Promi-Ärzte Deutschland — die bekanntesten TV-Mediziner (ausführlicher Pillar)
            </Link>
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Verwandte Mediziner-Themen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/singles-aerzte" className="block p-4 rounded-xl border border-border hover:border-brand-orange transition-colors">
            <div className="font-semibold text-foreground">Singles Ärzte</div>
            <div className="text-sm text-foreground/60">Warum Ärzte oft Single sind</div>
          </Link>
          <Link href="/partnersuche-mediziner-kennenlernen" className="block p-4 rounded-xl border border-border hover:border-brand-orange transition-colors">
            <div className="font-semibold text-foreground">Partnersuche Mediziner</div>
            <div className="text-sm text-foreground/60">Mediziner kennenlernen</div>
          </Link>
          <Link href="/singles-partnersuche/aerzte" className="block p-4 rounded-xl border border-border hover:border-brand-orange transition-colors">
            <div className="font-semibold text-foreground">Partnersuche für Ärzte (Pillar)</div>
            <div className="text-sm text-foreground/60">Dating als Arzt oder Ärztin</div>
          </Link>
          <Link href="/tv-serien" className="block p-4 rounded-xl border border-border hover:border-brand-orange transition-colors">
            <div className="font-semibold text-foreground">TV Serien</div>
            <div className="text-sm text-foreground/60">Grey&apos;s Anatomy &amp; Junge Ärzte</div>
          </Link>
        </div>
      </section>
    </>
  );
}
