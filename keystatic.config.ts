import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'JobsinglesDE/medicsingles-magazin',
  },
  ui: {
    brand: { name: 'Medicsingles Magazin' },
  },
  collections: {
    articles: collection({
      label: 'Artikel',
      slugField: 'title',
      path: 'content/articles/*',
      columns: ['publishedAt', 'title', 'category', 'specialization'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        category: fields.select({
          label: 'Kategorie',
          defaultValue: 'partnersuche',
          options: [
            { label: 'Anerkennung', value: 'anerkennung' },
            { label: 'Psychologie', value: 'psychologie' },
            { label: 'Karriere', value: 'karriere' },
            { label: 'Partnersuche', value: 'partnersuche' },
            { label: 'News', value: 'news' },
          ],
        }),
        specialization: fields.select({
          label: 'Fachrichtung',
          defaultValue: '',
          options: [
            { label: '— (alle)', value: '' },
            { label: 'Ärzte', value: 'arzt' },
            { label: 'Pflege', value: 'pflege' },
            { label: 'Therapeuten', value: 'therapeut' },
            { label: 'Rettung', value: 'rettung' },
          ],
        }),
        type: fields.select({
          label: 'Typ',
          defaultValue: 'cluster',
          options: [
            { label: 'Cluster', value: 'cluster' },
            { label: 'Pillar-Sub', value: 'pillar-sub' },
            { label: 'Serie', value: 'serie' },
            { label: 'Story', value: 'story' },
          ],
        }),
        series: fields.select({
          label: 'Serie',
          defaultValue: '',
          options: [
            { label: 'Keine', value: '' },
            { label: 'Grey’s Anatomy', value: 'greys-anatomy' },
            { label: 'In aller Freundschaft — Die jungen Ärzte', value: 'junge-aerzte' },
          ],
        }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Beitragsbild',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Beitragsbild',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Beispiel: "Hans Sigl im weißen Arztkittel vor Bergpanorama". Falls leer, wird der Artikel-Titel als Fallback genutzt.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        author: fields.relationship({
          label: 'Autor',
          collection: 'authors',
        }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value,
          }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), {
          label: 'Das Wichtigste',
        }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'published',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        isNews: fields.checkbox({ label: 'News-Artikel (NewsArticle JSON-LD)', defaultValue: false }),
        isFeatured: fields.checkbox({ label: 'Auf ICONY-Startseite anzeigen (max. 3)', defaultValue: false }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
        theme: fields.select({
          label: 'Theme',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ],
        }),
      },
    }),

    regional: collection({
      label: 'Regional',
      slugField: 'title',
      path: 'content/regional/*',
      columns: ['publishedAt', 'kanton', 'title'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        beruf: fields.select({
          label: 'Beruf',
          defaultValue: 'polizei',
          options: [
            { label: 'Polizei', value: 'polizei' },
            { label: 'Sanität', value: 'sanitaet' },
            { label: 'Feuerwehr', value: 'feuerwehr' },
          ],
        }),
        kanton: fields.text({ label: 'Kanton' }),
        city: fields.text({ label: 'Stadt (optional)' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Ortsbild',
          directory: 'public/images/regional',
          publicPath: '/images/regional/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Ortsbild',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Falls leer → Titel als Fallback.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value,
          }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), {
          label: 'Das Wichtigste',
        }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    series: collection({
      label: 'TV News',
      slugField: 'title',
      path: 'content/series/*',
      columns: ['publishedAt', 'seriesId', 'title', 'status'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'published',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        seriesId: fields.select({
          label: 'Serie',
          defaultValue: 'greys-anatomy',
          options: [
            { label: "Grey's Anatomy (ABC)", value: 'greys-anatomy' },
            { label: 'In aller Freundschaft — Die jungen Ärzte (ARD)', value: 'junge-aerzte' },
          ],
        }),
        isNews: fields.checkbox({ label: 'News-Artikel (NewsArticle JSON-LD)', defaultValue: false }),
        theme: fields.select({
          label: 'Theme',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ],
        }),
        author: fields.relationship({ label: 'Autor', collection: 'authors' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Bild',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Bild',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Falls leer → Titel als Fallback.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value,
          }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), { label: 'Das Wichtigste' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    stories: collection({
      label: 'Erfolgsgeschichten',
      slugField: 'title',
      path: 'content/stories/*',
      columns: ['publishedAt', 'couple', 'location'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        couple: fields.text({ label: 'Paar-Namen' }),
        location: fields.text({ label: 'Ort' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Paar-Foto',
          directory: 'public/images/stories',
          publicPath: '/images/stories/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Paar-Foto',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Falls leer → Titel als Fallback.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        content: fields.markdoc({ label: 'Geschichte' }),
        isFeatured: fields.checkbox({ label: 'Auf ICONY-Startseite anzeigen (max. 3)', defaultValue: false }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
      },
    }),

    authors: collection({
      label: 'Autoren',
      slugField: 'name',
      path: 'content/authors/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Rolle' }),
        bio: fields.text({ label: 'Kurz-Bio (Artikel-Box)', multiline: true }),
        longBio: fields.text({ label: 'Ausführliche Bio (Autoren-Seite)', multiline: true }),
        avatar: fields.image({
          label: 'Profilbild',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.text({ label: 'Plattform' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: 'Social Links' }
        ),
      },
    }),
  },
});
