import Link from 'next/link';
import Image from 'next/image';
import { reader } from '@/lib/keystatic';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getArticleUrl } from '@/lib/routes';

const HUB_URL = 'https://medicsingles.de/promi-aerzte';

export const metadata = {
  title: 'Promi-Ärzte Deutschland — die 8 bekanntesten TV-Mediziner',
  description: 'Hirschhausen, Riedl, Doc Fischer, Doc Esser und vier weitere prominente Mediziner: Werdegang, Sendungen, Bücher und was Mediziner-Singles aus ihren Karrieren lernen können.',
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: 'Promi-Ärzte Deutschland — die bekanntesten TV-Mediziner',
    description: 'Wer ist wer in der deutschen Gesundheits-TV-Landschaft. Acht Portraits, alle Wikipedia-verifiziert.',
    url: HUB_URL,
    type: 'website',
    siteName: 'Medicsingles Magazin',
    locale: 'de-DE',
  },
};

const PROMIS = [
  { slug: 'promi-eckart-hirschhausen', name: 'Eckart von Hirschhausen', role: 'Arzt, Komiker, Klima-Stifter', sender: 'ARD' },
  { slug: 'promi-matthias-riedl', name: 'Matthias Riedl', role: 'Internist, Ernährungs-Doc', sender: 'NDR' },
  { slug: 'promi-doc-fischer', name: 'Doc Fischer (Julia Fischer)', role: 'Gesundheits-TV-Moderatorin', sender: 'SWR / ARD' },
  { slug: 'promi-yael-adler', name: 'Yael Adler', role: 'Dermatologin, Bestseller-Autorin', sender: 'Verlag Droemer Knaur' },
  { slug: 'promi-doc-esser', name: 'Doc Esser', role: 'Pneumologe, Gesundheits-Check', sender: 'WDR' },
  { slug: 'promi-anne-fleck', name: 'Anne Fleck', role: 'Internistin, Präventionsmedizinerin', sender: 'NDR' },
  { slug: 'promi-johannes-wimmer', name: 'Johannes Wimmer', role: 'Arzt, Health-Influencer', sender: 'ZDF / Sat.1' },
  { slug: 'promi-carsten-lekutat', name: 'Carsten Lekutat', role: 'Hausarzt, Charité-Lehrarzt', sender: 'MDR / ARD' },
];

export default async function PromiAerzteHub() {
  const articles = await reader.collections.articles.all();
  const promiCards = PROMIS.map((p) => {
    const article = articles.find((a) => a.slug === p.slug);
    return {
      ...p,
      title: article?.entry.title ?? p.name,
      excerpt: article?.entry.excerpt ?? '',
      featuredImage: article?.entry.featuredImage ?? `/images/articles/${p.slug}/${p.slug}.webp`,
    };
  });

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Promi-Ärzte Deutschland',
          description: 'Die 8 bekanntesten deutschen TV-Mediziner im Portrait',
          url: HUB_URL,
          items: promiCards.map((p) => ({
            name: p.name,
            url: `https://medicsingles.de/magazin${getArticleUrl(p.slug, 'arzt')}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Startseite', url: 'https://medicsingles.de/' },
          { name: 'Promi-Ärzte', url: HUB_URL },
        ])}
      />

      <section className="relative overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-teal/40 via-surface-dark to-background" />
        <div className="relative max-w-4xl mx-auto px-6 text-center py-12">
          <div className="text-6xl mb-4">⭐</div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Promi-Ärzte <span className="text-brand-orange-text">Deutschland</span>
          </h1>
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mt-4 leading-relaxed">
            Acht prominente Mediziner zwischen Klinik, Praxis und Fernsehen. Werdegang, Sendungen, Bücher und was Mediziner-Singles aus ihren Karrieren lernen können.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-6">
        <Breadcrumbs items={[{ label: 'Promi-Ärzte', href: '/promi-aerzte' }]} />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promiCards.map((p, idx) => (
            <Link
              key={p.slug}
              href={getArticleUrl(p.slug, 'arzt')}
              className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-brand-orange transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg"
            >
              <div className="relative aspect-[3/2] bg-surface-dark overflow-hidden">
                <Image
                  src={p.featuredImage}
                  alt={`${p.name}, ${p.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={idx < 3}
                  loading={idx < 3 ? undefined : 'lazy'}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-brand-orange-text font-semibold mb-2">
                  {p.sender}
                </div>
                <h3 className="text-lg font-bold text-foreground leading-tight mb-2 group-hover:text-brand-orange-text transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-foreground/70 mb-3">
                  {p.role}
                </p>
                {p.excerpt && (
                  <p className="text-sm text-foreground/60 line-clamp-3">
                    {p.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-surface-dark/40 rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Was diese acht Mediziner verbindet</h2>
          <ul className="space-y-3 text-foreground/80">
            <li><strong className="text-brand-orange-text">Bestseller-Sachbuch:</strong> alle haben mindestens einen Spiegel-Bestseller veröffentlicht oder eine sechsstellige Auflage erreicht.</li>
            <li><strong className="text-brand-orange-text">Klare Spezialisierung:</strong> jeder hat ein eindeutig erkennbares Themenfeld (Ernährung, Haut, Lunge, Hausarztmedizin, Klimagesundheit) etabliert.</li>
            <li><strong className="text-brand-orange-text">Patient-Education statt Fachsprache:</strong> alle übersetzen Medizin in Alltagssprache, ohne fachlich nachzulassen.</li>
            <li><strong className="text-brand-orange-text">Öffentlich-rechtlicher Karriere-Hebel:</strong> ARD, NDR, WDR, MDR, ZDF und SWR sind der entscheidende Sprungbrett-Sender für die meisten.</li>
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
