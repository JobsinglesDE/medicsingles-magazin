// src/lib/hubs.ts — Single Source of Truth für Hub-/Sektion-Metadaten.
// REGEL (Tommy): title (H1) enthält ❤️. seoTitle OHNE ❤️ — layout.tsx template "%s ❤️"
// hängt es an (sonst Doppel-Herz). seoTitle-Basis ≤57, seoDescription ≤160.

export type Hub = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
};

// specialization-Wert → URL-Segment unter /singles-partnersuche/
export const SPEC_SLUG: Record<string, string> = {
  arzt: 'aerzte',
  pflege: 'pflege',
  therapeut: 'therapeuten',
  rettung: 'rettung',
};

// Sektion 3: Singles — specialization-getriebene Sub-Hubs
export const SPEC_HUBS: Record<string, Hub> = {
  arzt: {
    slug: 'singles-partnersuche/aerzte',
    title: 'Single-Ärzte ❤️ — Partnersuche für Mediziner',
    description:
      'Partnersuche für Ärztinnen und Ärzte: Dating trotz Schichtdienst, Klinikalltag und Bereitschaft — finde Menschen, die dein Tempo verstehen.',
    seoTitle: 'Single-Ärzte: Partnersuche für Mediziner',
    seoDescription:
      'Single-Ärzte: Partnersuche für Mediziner. Dating trotz Dienstplan, Klinik und Bereitschaft — finde Partner, die deinen Alltag kennen.',
  },
  pflege: {
    slug: 'singles-partnersuche/pflege',
    title: 'Singles in der Pflege ❤️ — Partnersuche im Gesundheitswesen',
    description:
      'Partnersuche für Pflegekräfte: Schichtdienst, Wochenenddienst, hohe Verantwortung — und trotzdem die große Liebe finden.',
    seoTitle: 'Singles in der Pflege: Partnersuche',
    seoDescription:
      'Singles in der Pflege: Partnersuche für Pflegekräfte. Dating trotz Schicht- und Wochenenddienst — Menschen, die deinen Beruf verstehen.',
  },
  therapeut: {
    slug: 'singles-partnersuche/therapeuten',
    title: 'Single-Therapeuten ❤️ — Partnersuche für Therapieberufe',
    description:
      'Partnersuche für Therapeutinnen und Therapeuten: Physio, Ergo, Logo & Psychotherapie — Dating für Menschen, die anderen helfen.',
    seoTitle: 'Single-Therapeuten: Partnersuche',
    seoDescription:
      'Single-Therapeuten: Partnersuche für Physio-, Ergo-, Logo- und Psychotherapeuten. Finde Partner, die deinen Berufsalltag verstehen.',
  },
  rettung: {
    slug: 'singles-partnersuche/rettung',
    title: 'Singles im Rettungsdienst ❤️ — Partnersuche für Retter',
    description:
      'Partnersuche für Rettungsdienst und Notfallsanitäter: 24-Stunden-Schichten, Einsätze, Adrenalin — und trotzdem Zeit für die Liebe.',
    seoTitle: 'Singles im Rettungsdienst: Partnersuche',
    seoDescription:
      'Singles im Rettungsdienst: Partnersuche für Notfallsanitäter & Retter. Dating trotz 24-Stunden-Schichten und Einsatzstress.',
  },
};

// Sektion 1: TV-Serien — show-basiert (seriesId). Nur Shows mit Content.
// Content-Lücken (DFS-Volumen, 0 Artikel): In aller Freundschaft 301k, Bergdoktor 110k,
// Dr. Nice 90k, Charité 49k → künftige Spokes, NICHT als leerer Hub.
export const SHOW_HUBS: Record<string, Hub> = {
  'greys-anatomy': {
    slug: 'tv-serien/greys-anatomy',
    title: "Grey's Anatomy ❤️ — Ärzte, Drama & Beziehungen",
    description:
      "Grey's Anatomy: das Klinik-Drama um Meredith Grey & Co. — Ärzte, Beziehungen und das Liebeschaos im Grey Sloan Memorial.",
    seoTitle: "Grey's Anatomy: Ärzte, Drama & Beziehungen",
    seoDescription:
      "Grey's Anatomy: Ärzte, Beziehungen und das Drama im Grey Sloan Memorial Hospital — Charaktere, Paare und News.",
  },
  'junge-aerzte': {
    slug: 'tv-serien/junge-aerzte',
    title: 'In aller Freundschaft – Die jungen Ärzte ❤️ — Sachsenklinik & Co.',
    description:
      'In aller Freundschaft – Die jungen Ärzte: die Nachwuchsmediziner der Sachsenklinik, ihre Fälle, Karrieren und Liebesgeschichten.',
    seoTitle: 'Die jungen Ärzte: Sachsenklinik & Charaktere',
    seoDescription:
      'In aller Freundschaft – Die jungen Ärzte: Nachwuchsmediziner der Sachsenklinik, ihre Fälle, Karrieren und Beziehungen.',
  },
};

// Sektion-Index-Hubs
export const SECTION_HUBS: Record<string, Hub> = {
  'singles-partnersuche': {
    slug: 'singles-partnersuche',
    title: 'Singles im Gesundheitswesen ❤️ — Partnersuche für Mediziner & Pflege',
    description:
      'Partnersuche für Menschen im Gesundheitswesen: Ärzte, Pflege, Therapie und Rettung. Dating trotz Schichtdienst — finde Partner, die deinen Alltag verstehen.',
    seoTitle: 'Singles im Gesundheitswesen: Partnersuche',
    seoDescription:
      'Singles im Gesundheitswesen: Partnersuche für Ärzte, Pflege, Therapie & Rettung. Dating trotz Schichtdienst und Klinikalltag.',
  },
  'tv-serien': {
    slug: 'tv-serien',
    title: 'Arzt-Serien im TV ❤️ — Grey’s Anatomy, Bergdoktor & Co.',
    description:
      'Die beliebtesten Arzt-Serien im Fernsehen: Charaktere, Beziehungen und News rund um Grey’s Anatomy, Die jungen Ärzte und mehr.',
    seoTitle: 'Arzt-Serien im TV: Charaktere & News',
    seoDescription:
      'Arzt-Serien im TV: Grey’s Anatomy, In aller Freundschaft – Die jungen Ärzte & Co. — Charaktere, Beziehungen und aktuelle News.',
  },
};

export const ALL_HUBS: Hub[] = [
  ...Object.values(SECTION_HUBS),
  ...Object.values(SPEC_HUBS),
  ...Object.values(SHOW_HUBS),
];
