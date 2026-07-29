import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { getArticleUrl, articleHref, getDoctorHubUrl } from '@/lib/routes';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { PillarBacklinkCard } from '@/components/content/PillarBacklinkCard';
import { DoctorBacklinkCard } from '@/components/content/DoctorBacklinkCard';
import { HubBacklinkCard } from '@/components/content/HubBacklinkCard';
import { BerufIntentNav } from '@/components/content/BerufIntentNav';
import { MoneyLinks } from '@/components/content/MoneyLinks';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { CarouselCards } from '@/components/ui/CarouselCards';
import { MatchQuiz } from '@/components/ui/MatchQuiz';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { StickyTOC } from '@/components/content/StickyTOC';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleByline } from '@/components/content/ArticleByline';
import { JsonLd, articleJsonLd, faqJsonLd, videoJsonLd, extractYoutubeEmbed, physicianSalaryJsonLd, occupationSalaryJsonLd, studieDatasetJsonLd } from '@/components/seo/JsonLd';
import { StudyReport } from '@/components/content/StudyReport';
import { ARZT_TARIF_VKA, ARZT_TARIF_QUELLE } from '@/lib/aerztekammer-statistiken';
import { APOTHEKER_TARIF, APOTHEKER_TARIF_QUELLE } from '@/lib/apotheker-tarif';
import { SPEC_HUBS, SECTION_HUBS } from '@/lib/hubs';

const BASE_URL = 'https://medicsingles.de/magazin';

function toId(text: string) {
  return text.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function collectText(n: any): string {
  if (typeof n === 'string') return n;
  if (n?.type === 'text') return n.attributes?.content ?? '';
  return (n?.children ?? []).map(collectText).join('');
}
function extractH2s(content: any): { label: string; id: string }[] {
  const node = 'node' in content ? content.node : content;
  const items: { label: string; id: string }[] = [];
  function walk(n: any) {
    if (n?.type === 'heading' && n?.attributes?.level === 2) {
      const text = collectText(n);
      if (text) items.push({ label: text, id: toId(text) });
    }
    (n?.children ?? []).forEach(walk);
  }
  walk(node);
  return items;
}

/**
 * Echte Pressefotos erkennt man am Credit mit Quellenangabe. Sie duerfen NIE als
 * KI gekennzeichnet werden — das waere selbst irrefuehrend (§ 5 UWG) und entwertet
 * die Lizenzangabe des Rechteinhabers.
 */
function istEchtesFoto(credit?: string | null): boolean {
  if (!credit) return false;
  return /Foto:|Wikimedia|CC[- ]BY|GFDL|dpa|Getty|imago|ZDF|RTL|SRF|ARD|MDR|NDR|SWR|SAT\.1|ProSieben|VOX|Joyn|Verlag|Pressefoto|Autorenfoto/i.test(credit);
}

export async function buildArticleMetadata(slug: string) {
  const article = await reader.collections.articles.read(slug);
  if (!article) return {};

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const url = `${BASE_URL}${getArticleUrl(slug, article.specialization, article.section)}`;
  const image = article.featuredImage
    ? `${BASE_URL}${article.featuredImage}`
    : `${BASE_URL}/logos/jobsingles-logo.webp`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: image, width: 1256, height: 710, alt: title }],
      siteName: 'Medicsingles Magazin',
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticleView({ slug }: { slug: string }) {
  const article = await reader.collections.articles.read(slug, { resolveLinkedFiles: true });
  // `status: draft` hielt den Artikel bisher nur aus Sitemap + Listings raus — die Detailseite
  // rendete trotzdem, öffentlich erreichbar und mit `index, follow`. "Draft" war damit kein
  // Review-Zustand, sondern nur "unverlinkt". Für medic ist das zentral: der News-Agent schreibt
  // seit 2026-07-16 bewusst Drafts, und erst der keystatic-publisher (news_gate + verify_facts
  // + fact_crosscheck) schaltet sie live. Ohne diese Zeile wäre die ganze Kette wirkungslos.
  if (!article || article.status !== 'published') notFound();

  const author = article.author
    ? await reader.collections.authors.read(article.author)
    : null;

  const isDoctor = article.section === 'promi-aerzte';
  const isStudie = article.section === 'studien';

  const allArticles = await reader.collections.articles.all();
  const relatedArticles = allArticles
    .filter((a) =>
      a.slug !== slug &&
      (isDoctor
        ? a.entry.section === 'promi-aerzte'
        : a.entry.specialization === article.specialization && a.entry.section !== 'promi-aerzte' && a.entry.type === 'cluster')
    )
    .slice(0, 6)
    .map((a) => ({
      title: a.entry.title,
      excerpt: a.entry.excerpt,
      href: articleHref({ slug: a.slug, entry: a.entry }),
      image: a.entry.featuredImage || undefined,
      category: a.entry.category,
    }));

  const canonicalPath = getArticleUrl(slug, article.specialization, article.section);
  const specHub = article.specialization ? SPEC_HUBS[article.specialization] : null;
  const isBerufsbild = article.section === 'berufsbilder';
  const crumbs = isBerufsbild
    ? [
        { label: 'Berufsbilder', href: '/berufsbilder' },
        { label: article.title, href: canonicalPath },
      ]
    : isStudie
    ? [
        { label: 'Wissenschaft & Liebe', href: '/studien' },
        { label: article.title, href: canonicalPath },
      ]
    : isDoctor
    ? [
        { label: 'Promi-Ärzte', href: '/promi-aerzte' },
        ...(article.person ? [{ label: article.title.split(':')[0], href: getDoctorHubUrl(article.person) }] : []),
        { label: article.title, href: canonicalPath },
      ]
    : [
        { label: 'Singles & Partnersuche', href: `/${SECTION_HUBS['singles-partnersuche'].slug}` },
        ...(specHub ? [{ label: specHub.title.split(' ❤️')[0], href: `/${specHub.slug}` }] : []),
        { label: article.title, href: canonicalPath },
      ];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `${BASE_URL}${canonicalPath}`,
          image: article.featuredImage ? `${BASE_URL}${article.featuredImage}` : undefined,
          datePublished: article.publishedAt || undefined,
          authorName: author?.name,
          authorUrl: author?.socialLinks?.find((l) => l.platform === 'Website')?.url ?? undefined,
          isNews: article.isNews === true,
        })}
      />
      {article.faqItems && article.faqItems.length > 0 && (
        <JsonLd data={faqJsonLd(article.faqItems)} />
      )}
      {isStudie && (
        <JsonLd
          data={studieDatasetJsonLd({
            name: article.title,
            description: article.excerpt,
            url: `${BASE_URL}${canonicalPath}`,
            datenpunkte: article.studieDatenpunkte || [],
            temporalCoverage: article.studieDatengrundlage || undefined,
            dateModified: article.publishedAt || undefined,
          })}
        />
      )}
      {slug === 'arzt-gehalt' && (
        <JsonLd data={physicianSalaryJsonLd({
          bundesland: 'Deutschland',
          url: `${BASE_URL}${canonicalPath}`,
          rows: ARZT_TARIF_VKA,
          quelle: ARZT_TARIF_QUELLE,
        })} />
      )}
      {slug === 'apotheker-gehalt' && (() => {
        const s = occupationSalaryJsonLd({
          name: 'Apotheker / Apothekerin',
          url: `${BASE_URL}${canonicalPath}`,
          rows: APOTHEKER_TARIF,
          quelle: APOTHEKER_TARIF_QUELLE,
        });
        return s ? <JsonLd data={s} /> : null;
      })()}
      {(() => {
        const ytEmbed = extractYoutubeEmbed(article.content);
        return ytEmbed ? (
          <JsonLd data={videoJsonLd({
            name: ytEmbed.title || article.title,
            description: article.excerpt,
            videoId: ytEmbed.videoId,
            uploadDate: article.publishedAt ? `${article.publishedAt}T08:00:00+02:00` : undefined,
          })} />
        ) : null;
      })()}

      <ClusterHero
        title={article.title}
        excerpt={article.excerpt}
        category={article.category}
        image={article.featuredImage || undefined}
        imageAlt={article.featuredImageAlt || undefined}
        imageCredit={article.featuredImageCredit || undefined}
        date={article.publishedAt || undefined}
        /* News nutzen echte Pressebilder, alles andere ist KI-generiert
           (Art. 50 Abs. 4 KI-VO). */
        aiGenerated={!article.isNews && !istEchtesFoto(article.featuredImageCredit)}
      />

      <StickyTOC items={extractH2s(article.content)} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={crumbs} />

        {isBerufsbild && (
          <BerufIntentNav
            beruf={article.type === 'berufsbild' ? slug : article.position || ''}
            activeSlug={slug}
            availableSlugs={allArticles
              .filter((a) => a.entry.section === 'berufsbilder')
              .map((a) => a.slug)}
          />
        )}

        <ArticleByline publishedAt={article.publishedAt || undefined} />

        <TableOfContents items={extractH2s(article.content)} />

        {article.calloutQuestion && (
          <CalloutBox question={article.calloutQuestion}>
            {article.calloutAnswer}
          </CalloutBox>
        )}

        {isStudie && (
          <StudyReport
            methodik={article.studieMethodik || undefined}
            datengrundlage={article.studieDatengrundlage || undefined}
            stichprobe={article.studieStichprobe || undefined}
            institut={article.studieInstitut || undefined}
            datenpunkte={article.studieDatenpunkte || []}
            quellen={article.studieQuellen || []}
          />
        )}

        <ArticleBody
          content={article.content}
          insertAfterH2={2}
          insertElement={
            article.noCta ? null : (
              <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="my-8">
                <div className="p-6 text-center">
                  <p className="text-sm text-foreground/70 mb-3">Du suchst Singles aus dem Gesundheitswesen?</p>
                  <HeartButton href="https://medicsingles.de/?AID=MedicMagazin">
                    Jetzt kostenfrei anmelden
                  </HeartButton>
                </div>
              </AnimatedGradientBorder>
            )
          }
        />

        {/* CTA Stopper nach Content — bei noCta unterdrueckt, damit Personen-Artikel
            mit Privatsphaeren-Bezug nicht in einem Werbekontext stehen. */}
        {!article.noCta && (
          <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
            <div className="py-10 px-6 bg-surface-dark text-white text-center">
              <p className="text-lg font-bold mb-2">Genug gelesen?</p>
              <p className="text-white/60 text-sm mb-5">Finde Singles, die deinen Alltag verstehen.</p>
              <HeartButton href="https://medicsingles.de/?AID=MedicMagazin">
                Jetzt kostenfrei mitmachen
              </HeartButton>
            </div>
          </AnimatedGradientBorder>
        )}

        {article.takeaways && article.takeaways.length > 0 && (
          <TakeawayBox items={article.takeaways} />
        )}

        {/* Mini Quiz */}
        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
          <div className="py-8 px-6">
            <p className="text-center text-sm font-bold text-foreground/50 uppercase tracking-widest mb-4">Finde deinen Match-Typ</p>
            <MatchQuiz />
          </div>
        </AnimatedGradientBorder>

        {article.faqItems && article.faqItems.length > 0 && (
          <>
            <h2 id="haeufige-fragen" className="text-2xl font-bold mt-16 mb-2 scroll-mt-24">Häufige Fragen</h2>
            <FAQAccordion items={article.faqItems} />
          </>
        )}

        {/* Author Bio */}
        {author && (
          <AuthorBio
            name={author.name}
            slug={article.author || undefined}
            role={author.role}
            bio={author.bio}
            avatar={author.avatar || undefined}
            socialLinks={author.socialLinks}
          />
        )}

        {/* Backlink: Promi-Arzt → Personen-Hub, Berufsbild → Beruf-Hub/Übersicht, sonst Pillar-Hub */}
        {isBerufsbild ? (
          <HubBacklinkCard
            {...(article.type !== 'berufsbild' && article.position && allArticles.some((a) => a.slug === article.position)
              ? {
                  heading: allArticles.find((a) => a.slug === article.position)!.entry.title,
                  text:
                    allArticles.find((a) => a.slug === article.position)!.entry.excerpt ||
                    'Das komplette Berufsbild mit Aufgaben, Gehalt und Karrierewegen.',
                  href: `/berufsbilder/${article.position}`,
                  cta: 'Zum kompletten Berufsbild →',
                }
              : {
                  heading: 'Alle Berufsbilder der Medizin',
                  text: 'MFA, Pflege, Hebamme, Physiotherapie, Rettungsdienst und Ärzte: Ausbildung, Gehalt und Karriere im Überblick.',
                  href: '/berufsbilder',
                  cta: 'Zur Berufsbilder-Übersicht →',
                })}
          />
        ) : isDoctor ? (
          article.person ? <DoctorBacklinkCard personSlug={article.person} /> : null
        ) : article.specialization && ['arzt', 'pflege', 'therapeut', 'rettung'].includes(article.specialization) ? (
          <PillarBacklinkCard specialization={article.specialization as 'arzt' | 'pflege' | 'therapeut' | 'rettung'} />
        ) : article.category === 'partnersuche' ? (
          <HubBacklinkCard
            heading="Partnersuche in der Medizin: der komplette Guide"
            text="Ärzte, Pflege, Therapeuten und Rettungsdienst — alle Guides für die Partnersuche im Gesundheitswesen."
            href="/singles-partnersuche"
            cta="Zum Partnersuche-Hub →"
          />
        ) : null}
      </div>

      {/* Related Articles Carousel */}
      {relatedArticles.length > 0 && (
        <CarouselCards title="Weitere Artikel" items={relatedArticles} />
      )}

      {/* Motor → Money: Promi-Ärzte-Seiten brücken Equity auf die Berufs-/Gehalt-Pillars */}
      {isDoctor && (
        <div className="max-w-3xl mx-auto px-6 pb-4">
          <MoneyLinks />
        </div>
      )}

      {/* Bottom CTA — bei noCta unterdrueckt (siehe oben) */}
      {!article.noCta && (
        <section className="text-center py-16 px-6">
          <HeartButton href="https://medicsingles.de/?AID=MedicMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      )}
    </>
  );
}
