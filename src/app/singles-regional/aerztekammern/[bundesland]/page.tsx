import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reader } from '@/lib/keystatic';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, kammerOrgJsonLd, kammerDatasetJsonLd, physicianSalaryJsonLd, faqJsonLd } from '@/components/seo/JsonLd';
import { BUNDESLAENDER, BUNDESLAND_SLUGS, bundeslandName, bundeslandEmoji } from '@/lib/bundeslaender';
import { KammerStats } from '@/components/content/KammerStats';
import { kammerData, ARZT_TARIF_VKA, ARZT_TARIF_QUELLE } from '@/lib/aerztekammer-statistiken';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

// Long-Tail-FAQ (aufgaben/mitgliedschaft/pflichtbeitrag) — data-aware, deckt informationale Queries ab.
function kammerFaq(blName: string, data: ReturnType<typeof kammerData>) {
  const b = data?.beitrag;
  const beitragAntwort = b
    ? `Der Beitrag ist einkommensabhängig${b.hebesatz ? ` (Hebesatz ${b.hebesatz} der Einkünfte aus ärztlicher Tätigkeit)` : ''}.${b.mindestbeitrag ? ` Mindestbeitrag ${b.mindestbeitrag}` : ''}${b.hoechstbeitrag ? `, Höchstbeitrag ${b.hoechstbeitrag} pro Jahr` : (b.mindestbeitrag ? ' pro Jahr aufwärts' : '')}.`
    : 'Der Beitrag ist einkommensabhängig und wird als Hebesatz (häufig rund 0,6 %) auf die Einkünfte aus ärztlicher Tätigkeit berechnet, mit satzungsgemäßem Mindest- und Höchstbeitrag.';
  return [
    {
      question: `Ist die Mitgliedschaft in der Ärztekammer ${blName} Pflicht?`,
      answer: `Ja. Approbierte Ärztinnen und Ärzte, die in ${blName} ärztlich tätig sind, sind Pflichtmitglied der Kammer. Sie ist eine Körperschaft des öffentlichen Rechts nach dem Heilberufsgesetz des Landes.`,
    },
    {
      question: `Wie hoch ist der Kammerbeitrag in ${blName}?`,
      answer: beitragAntwort,
    },
    {
      question: `Welche Aufgaben hat die Ärztekammer ${blName}?`,
      answer: 'Zu den gesetzlichen Aufgaben zählen die ärztliche Weiterbildung samt Facharztprüfung, die Berufsaufsicht, die Fortbildung, das Arztregister, Ethikkommissionen, Gutachter- und Schlichtungsstellen für Behandlungsfehler sowie das ärztliche Versorgungswerk.',
    },
  ];
}

export async function generateStaticParams() {
  return BUNDESLAND_SLUGS.map((bundesland) => ({ bundesland }));
}

export async function generateMetadata({ params }: { params: Promise<{ bundesland: string }> }) {
  const { bundesland } = await params;
  if (!BUNDESLAENDER[bundesland]) return {};
  const name = bundeslandName(bundesland);
  const url = `https://medicsingles.de/magazin/singles-regional/aerztekammern/${bundesland}`;
  const data = kammerData(bundesland);
  const title = `Ärztekammer ${name}: Mitglieder, Beitrag & Aufgaben 2026`;
  const description = data
    ? `${data.kammerName}${data.mitglieder ? `: ${data.mitglieder} Mitglieder` : ''}${data.sitz ? `, Sitz ${data.sitz}` : ''}. Pflichtbeitrag, Aufgaben, Weiterbildung und Arzt-Tarif 2026 — plus Mediziner-Singles in ${name}.`
    : `Landesärztekammer ${name}: Mitglieder, Pflichtbeitrag, Aufgaben und Arzt-Tarif 2026 im Überblick — plus Mediziner-Singles in ${name}.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', siteName: 'Medicsingles Magazin', locale: 'de_DE' },
  };
}

export default async function KammerBundeslandPage({ params }: { params: Promise<{ bundesland: string }> }) {
  const { bundesland } = await params;
  if (!BUNDESLAENDER[bundesland]) notFound();

  const all = await reader.collections.aerztekammern.all();
  const inBL = all
    .filter((a) => a.entry.status === 'published' && a.entry.bundesland === bundesland)
    .sort((a, b) => (a.entry.kammerTyp === 'landes' ? -1 : 1));

  const blName = bundeslandName(bundesland);
  const url = `https://medicsingles.de/magazin/singles-regional/aerztekammern/${bundesland}`;
  const data = kammerData(bundesland);
  const faq = data ? kammerFaq(blName, data) : [];

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: `Ärztekammer ${blName}`,
          description: `Kammer-Pages für ${blName}.`,
          url,
          items: inBL.map((a) => ({
            name: a.entry.title,
            url: `https://medicsingles.de/magazin/singles-regional/aerztekammern/${bundesland}/${a.entry.stadt}`,
          })),
        })}
      />
      {data && (
        <>
          <JsonLd
            data={kammerOrgJsonLd({
              name: data.kammerName,
              url,
              webseite: data.url,
              bundesland: blName,
              mitgliederzahl: data.mitglieder,
              kammerTyp: 'Landesärztekammer',
            })}
          />
          <JsonLd
            data={kammerDatasetJsonLd({
              name: `${data.kammerName} — Mitglieder & Kammerbeitrag`,
              description: `Mitgliederzahl und Beitragsmodell der ${data.kammerName} (${blName}).`,
              url,
              mitglieder: data.mitglieder,
              bezugsjahr: data.mitgliederStand?.slice(-4),
              dateModified: data.aktualisiert,
            })}
          />
          <JsonLd data={physicianSalaryJsonLd({ bundesland: blName, url, rows: ARZT_TARIF_VKA, quelle: ARZT_TARIF_QUELLE })} />
          {faq.length > 0 && <JsonLd data={faqJsonLd(faq)} />}
        </>
      )}

      <section className="relative overflow-hidden min-h-[280px] md:min-h-[360px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-teal/40 via-surface-dark to-background" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="text-7xl mb-4">{bundeslandEmoji(bundesland)}</div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Ärztekammer <span className="text-brand-orange-text">{blName}</span>
          </h1>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mt-4 leading-relaxed">
            Landeskammer und Bezirkskammern in {blName} — Mediziner-Networking mit Liebes-Potenzial.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Ärztekammern', href: '/singles-regional/aerztekammern' },
          { label: blName, href: `/singles-regional/aerztekammern/${bundesland}` },
        ]} />
      </div>

      {data && (
        <div className="max-w-3xl mx-auto px-6 pt-8">
          <p className="text-foreground/80 leading-relaxed">
            Die <strong>{data.kammerName}</strong> ist die ärztliche Selbstverwaltung in {blName}: Pflichtmitgliedschaft für
            alle hier tätigen Ärztinnen und Ärzte, zuständig für Weiterbildung, Berufsaufsicht und das Versorgungswerk.
            Hier findest du die wichtigsten Zahlen, den Pflichtbeitrag, die Aufgaben und den aktuellen Arzt-Tarif — und am
            Ende lokale Mediziner-Singles in {blName}.
          </p>

          <KammerStats data={data} kammerName={blName} />

          {faq.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-2">Häufige Fragen zur Ärztekammer {blName}</h2>
              <FAQAccordion items={faq} />
            </section>
          )}
        </div>
      )}

      {inBL.length === 0 ? (
        !data && (
        <ScrollReveal>
          <section className="max-w-3xl mx-auto px-6 py-16 text-center">
            <p className="text-lg text-foreground/70 mb-6">
              Pages für {blName} sind in Vorbereitung. Während wir die Recherche finalisieren —
              Medicsingles.de wartet nicht.
            </p>
            <HeartButton href="https://medicsingles.de/registration/?AID=MedicMagazin-aerztekammern">
              Jetzt kostenfrei mitmachen
            </HeartButton>
          </section>
        </ScrollReveal>
        )
      ) : (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">
              Kammern in {blName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inBL.map((a) => (
                <ArticleCard
                  key={a.slug}
                  title={a.entry.title}
                  excerpt={a.entry.excerpt}
                  href={`/singles-regional/aerztekammern/${bundesland}/${a.entry.stadt}`}
                  image={a.entry.featuredImage || undefined}
                  imageAlt={a.entry.featuredImageAlt || undefined}
                  category={a.entry.kammerTyp === 'landes' ? 'Landeskammer' : 'Bezirkskammer'}
                  date={a.entry.publishedAt || undefined}
                />
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <Link
            href="/singles-regional/aerztekammern"
            className="text-brand-orange-text hover:underline text-sm"
          >
            ← zurück zur Kammern-Übersicht
          </Link>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Direkt zu den Singles in {blName}?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Lokale Mediziner-Singles auf Medicsingles.de finden.
          </p>
          <HeartButton href="https://medicsingles.de/registration/?AID=MedicMagazin-aerztekammern">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
