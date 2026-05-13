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

    unikliniken: collection({
      label: 'Unikliniken & Maximalversorger (Singles Regional)',
      slugField: 'title',
      path: 'content/unikliniken/*',
      columns: ['publishedAt', 'title', 'bundesland', 'stadt'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'z.B. "Uniklinik Heidelberg Singles".',
        }),
        bundesland: fields.select({
          label: 'Bundesland',
          defaultValue: 'berlin',
          options: [
            { label: 'Baden-Württemberg', value: 'baden-wuerttemberg' },
            { label: 'Bayern', value: 'bayern' },
            { label: 'Berlin', value: 'berlin' },
            { label: 'Brandenburg', value: 'brandenburg' },
            { label: 'Bremen', value: 'bremen' },
            { label: 'Hamburg', value: 'hamburg' },
            { label: 'Hessen', value: 'hessen' },
            { label: 'Mecklenburg-Vorpommern', value: 'mecklenburg-vorpommern' },
            { label: 'Niedersachsen', value: 'niedersachsen' },
            { label: 'Nordrhein', value: 'nordrhein' },
            { label: 'Westfalen-Lippe', value: 'westfalen-lippe' },
            { label: 'Nordrhein-Westfalen', value: 'nordrhein-westfalen' },
            { label: 'Rheinland-Pfalz', value: 'rheinland-pfalz' },
            { label: 'Saarland', value: 'saarland' },
            { label: 'Sachsen', value: 'sachsen' },
            { label: 'Sachsen-Anhalt', value: 'sachsen-anhalt' },
            { label: 'Schleswig-Holstein', value: 'schleswig-holstein' },
            { label: 'Thüringen', value: 'thueringen' },
            { label: 'Deutschland (bundesweit)', value: 'deutschland' },
          ],
        }),
        stadt: fields.text({ label: 'Stadt (Slug-Form)', description: 'z.B. "heidelberg", "frankfurt-am-main"' }),
        klinikTyp: fields.select({
          label: 'Klinik-Typ',
          defaultValue: 'uniklinikum',
          options: [
            { label: 'Universitätsklinikum', value: 'uniklinikum' },
            { label: 'Maximalversorger', value: 'maximalversorger' },
            { label: 'Fachklinik (Uniklinik-Verbund)', value: 'fachklinik-uniklinik' },
          ],
        }),
        klinikName: fields.text({ label: 'Vollständiger Klinik-Name' }),
        bettenzahl: fields.text({ label: 'Bettenzahl (ca.)' }),
        webseite: fields.url({ label: 'Klinik-Webseite' }),
        sitzAdresse: fields.text({ label: 'Sitz-Adresse', multiline: true }),
        trägerschaft: fields.select({
          label: 'Trägerschaft',
          defaultValue: 'land',
          options: [
            { label: 'Land / Öffentlich', value: 'land' },
            { label: 'Privat', value: 'privat' },
            { label: 'Kirchlich', value: 'kirchlich' },
            { label: 'Kommunal', value: 'kommunal' },
          ],
        }),
        priorität: fields.select({
          label: 'Priorität (Build-Order)',
          defaultValue: 'MEDIUM',
          options: [
            { label: 'HIGH', value: 'HIGH' },
            { label: 'MEDIUM', value: 'MEDIUM' },
            { label: 'LOW', value: 'LOW' },
          ],
        }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Hero-Bild',
          directory: 'public/images/unikliniken',
          publicPath: '/images/unikliniken/',
        }),
        featuredImageAlt: fields.text({ label: 'Alt-Text', description: 'Klinik-Gebäude + Mediziner-Element' }),
        featuredImageCredit: fields.text({ label: 'Bild-Credit' }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          { label: 'FAQ', itemLabel: (props) => props.fields.question.value }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), { label: 'Das Wichtigste' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    aerztekammern: collection({
      label: 'Ärztekammern (Singles Regional)',
      slugField: 'title',
      path: 'content/aerztekammern/*',
      columns: ['publishedAt', 'title', 'bundesland', 'stadt'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'z.B. "Ärztekammer Berlin Singles".',
        }),
        bundesland: fields.select({
          label: 'Bundesland',
          defaultValue: 'berlin',
          options: [
            { label: 'Baden-Württemberg', value: 'baden-wuerttemberg' },
            { label: 'Bayern', value: 'bayern' },
            { label: 'Berlin', value: 'berlin' },
            { label: 'Brandenburg', value: 'brandenburg' },
            { label: 'Bremen', value: 'bremen' },
            { label: 'Hamburg', value: 'hamburg' },
            { label: 'Hessen', value: 'hessen' },
            { label: 'Mecklenburg-Vorpommern', value: 'mecklenburg-vorpommern' },
            { label: 'Niedersachsen', value: 'niedersachsen' },
            { label: 'Nordrhein', value: 'nordrhein' },
            { label: 'Westfalen-Lippe', value: 'westfalen-lippe' },
            { label: 'Nordrhein-Westfalen', value: 'nordrhein-westfalen' },
            { label: 'Rheinland-Pfalz', value: 'rheinland-pfalz' },
            { label: 'Saarland', value: 'saarland' },
            { label: 'Sachsen', value: 'sachsen' },
            { label: 'Sachsen-Anhalt', value: 'sachsen-anhalt' },
            { label: 'Schleswig-Holstein', value: 'schleswig-holstein' },
            { label: 'Thüringen', value: 'thueringen' },
            { label: 'Deutschland (bundesweit)', value: 'deutschland' },
          ],
        }),
        stadt: fields.text({ label: 'Stadt (Slug-Form)', description: 'z.B. "berlin", "frankfurt-am-main"' }),
        kammerTyp: fields.select({
          label: 'Kammer-Typ',
          defaultValue: 'landes',
          options: [
            { label: 'Landesärztekammer', value: 'landes' },
            { label: 'Bezirksärztekammer', value: 'bezirk' },
            { label: 'Kreisärztekammer', value: 'kreis' },
          ],
        }),
        kammerName: fields.text({ label: 'Vollständiger Kammer-Name' }),
        mitgliederzahl: fields.text({ label: 'Mitgliederzahl (ca.)' }),
        webseite: fields.url({ label: 'Kammer-Webseite' }),
        sitzAdresse: fields.text({ label: 'Sitz-Adresse', multiline: true }),
        priorität: fields.select({
          label: 'Priorität (Build-Order)',
          defaultValue: 'MEDIUM',
          options: [
            { label: 'HIGH', value: 'HIGH' },
            { label: 'MEDIUM', value: 'MEDIUM' },
            { label: 'LOW', value: 'LOW' },
          ],
        }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Hero-Bild',
          directory: 'public/images/aerztekammern',
          publicPath: '/images/aerztekammern/',
        }),
        featuredImageAlt: fields.text({ label: 'Alt-Text', description: 'Stadt-Wahrzeichen + Mediziner-Element' }),
        featuredImageCredit: fields.text({ label: 'Bild-Credit' }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          { label: 'FAQ', itemLabel: (props) => props.fields.question.value }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), { label: 'Das Wichtigste' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    aerztestammtische: collection({
      label: 'Ärztestammtische (Singles Regional)',
      slugField: 'title',
      path: 'content/aerztestammtische/*',
      columns: ['publishedAt', 'title', 'bundesland', 'stadt'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'z.B. "Mediziner Stammtisch Berlin".',
        }),
        bundesland: fields.select({
          label: 'Bundesland',
          defaultValue: 'berlin',
          options: [
            { label: 'Baden-Württemberg', value: 'baden-wuerttemberg' },
            { label: 'Bayern', value: 'bayern' },
            { label: 'Berlin', value: 'berlin' },
            { label: 'Brandenburg', value: 'brandenburg' },
            { label: 'Bremen', value: 'bremen' },
            { label: 'Hamburg', value: 'hamburg' },
            { label: 'Hessen', value: 'hessen' },
            { label: 'Mecklenburg-Vorpommern', value: 'mecklenburg-vorpommern' },
            { label: 'Niedersachsen', value: 'niedersachsen' },
            { label: 'Nordrhein', value: 'nordrhein' },
            { label: 'Westfalen-Lippe', value: 'westfalen-lippe' },
            { label: 'Nordrhein-Westfalen', value: 'nordrhein-westfalen' },
            { label: 'Rheinland-Pfalz', value: 'rheinland-pfalz' },
            { label: 'Saarland', value: 'saarland' },
            { label: 'Sachsen', value: 'sachsen' },
            { label: 'Sachsen-Anhalt', value: 'sachsen-anhalt' },
            { label: 'Schleswig-Holstein', value: 'schleswig-holstein' },
            { label: 'Thüringen', value: 'thueringen' },
            { label: 'Deutschland (bundesweit)', value: 'deutschland' },
          ],
        }),
        stadt: fields.text({ label: 'Stadt (Slug-Form)' }),
        traeger: fields.select({
          label: 'Träger-Organisation',
          defaultValue: 'lokal',
          options: [
            { label: 'JADE (Junge Allgemeinmedizin)', value: 'jade' },
            { label: 'Marburger Bund', value: 'marburger-bund' },
            { label: 'Hartmannbund', value: 'hartmannbund' },
            { label: 'Coliquio', value: 'coliquio' },
            { label: 'KV (Kassenärztliche Vereinigung)', value: 'kv' },
            { label: 'ÄKV (Ärztlicher Kreisverband)', value: 'aekv' },
            { label: 'Klinik-organisiert', value: 'klinik' },
            { label: 'ArbeiterKind.de', value: 'arbeiterkind' },
            { label: 'Lokale Initiative', value: 'lokal' },
            { label: 'BDC (Chirurgie)', value: 'bdc' },
            { label: 'BVOU (Orthopädie)', value: 'bvou' },
            { label: 'BVKJ (Pädiatrie)', value: 'bvkj' },
            { label: 'DGIM (Innere)', value: 'dgim' },
            { label: 'Krebsgesellschaft', value: 'krebsgesellschaft' },
            { label: 'Regional', value: 'regional' },
            { label: 'Verschiedene Träger', value: 'verschiedene' },
          ],
        }),
        traegerName: fields.text({ label: 'Vollständiger Träger-Name' }),
        frequenz: fields.text({ label: 'Frequenz', description: 'z.B. "monatlich", "quartalsweise"' }),
        anmeldung: fields.select({
          label: 'Anmeldung',
          defaultValue: 'offen',
          options: [
            { label: 'Offen für alle', value: 'offen' },
            { label: 'Nur Mitglieder', value: 'mitglieder' },
            { label: 'Nur Berufsgruppe', value: 'berufsgruppe' },
            { label: 'Eingeladen', value: 'eingeladen' },
          ],
        }),
        webseite: fields.url({ label: 'Stammtisch-URL' }),
        treffpunkt: fields.text({ label: 'Treffpunkt-Adresse', multiline: true }),
        priorität: fields.select({
          label: 'Priorität (Build-Order)',
          defaultValue: 'MEDIUM',
          options: [
            { label: 'HIGH', value: 'HIGH' },
            { label: 'MEDIUM', value: 'MEDIUM' },
            { label: 'LOW', value: 'LOW' },
          ],
        }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Hero-Bild',
          directory: 'public/images/aerztestammtische',
          publicPath: '/images/aerztestammtische/',
        }),
        featuredImageAlt: fields.text({ label: 'Alt-Text' }),
        featuredImageCredit: fields.text({ label: 'Bild-Credit' }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          { label: 'FAQ', itemLabel: (props) => props.fields.question.value }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), { label: 'Das Wichtigste' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    jungeFachgesellschaften: collection({
      label: 'Junge Fachgesellschaften (Singles Regional)',
      slugField: 'title',
      path: 'content/junge-fachgesellschaften/*',
      columns: ['publishedAt', 'title', 'fachrichtung'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'z.B. "Junge DGIM" oder "JADE Allgemeinmedizin".',
        }),
        fachrichtung: fields.select({
          label: 'Fachrichtung-Cluster',
          defaultValue: 'innere',
          options: [
            { label: 'Innere Medizin', value: 'innere' },
            { label: 'Chirurgie', value: 'chirurgie' },
            { label: 'Bildgebung & Strahlentherapie', value: 'bildgebung' },
            { label: 'Anästhesie & Notfall', value: 'anaesthesie' },
            { label: 'Neurologie & Psychiatrie', value: 'neuro-psy' },
            { label: 'Pädiatrie & Geburtshilfe', value: 'paediatrie-gyn' },
            { label: 'Allgemein- & Hausarztmedizin', value: 'allgemein' },
            { label: 'Spezialfächer', value: 'spezial' },
          ],
        }),
        mutterFG: fields.text({ label: 'Mutter-Fachgesellschaft (Kürzel)', description: 'z.B. DGIM, DGK, DEGAM' }),
        jungeFGName: fields.text({ label: 'Voller Junge-FG-Name', description: 'z.B. JUNGE DGIM, Young DGK, JADE' }),
        webseite: fields.url({ label: 'Junge-FG-Webseite' }),
        mutterFGWebseite: fields.url({ label: 'Mutter-FG-Webseite' }),
        altersgrenze: fields.text({ label: 'Altersgrenze', description: 'z.B. "unter 40" oder "keine"' }),
        gruendung: fields.text({ label: 'Gründungsjahr (ca.)' }),
        bjaeMitglied: fields.checkbox({ label: 'BJÄ-Mitglied (Bündnis Junge Ärzte)', defaultValue: false }),
        treffenFormat: fields.text({ label: 'Treffen-Format', multiline: true, description: 'Summer School, Kongress-Session, Stammtisch etc.' }),
        priorität: fields.select({
          label: 'Priorität (Build-Order)',
          defaultValue: 'MEDIUM',
          options: [
            { label: 'HIGH', value: 'HIGH' },
            { label: 'MEDIUM', value: 'MEDIUM' },
            { label: 'LOW', value: 'LOW' },
          ],
        }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Hero-Bild',
          directory: 'public/images/junge-fachgesellschaften',
          publicPath: '/images/junge-fachgesellschaften/',
        }),
        featuredImageAlt: fields.text({ label: 'Alt-Text', description: 'Fachrichtung-Szene + Mediziner-Element' }),
        featuredImageCredit: fields.text({ label: 'Bild-Credit' }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          { label: 'FAQ', itemLabel: (props) => props.fields.question.value }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), { label: 'Das Wichtigste' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
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
