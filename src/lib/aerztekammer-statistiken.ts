// Strukturierte Landesärztekammer-Daten (Single Source of Truth) für die GEO-Datenblöcke
// (Mitglieder-/Beitrags-Cards + Aufgaben-Liste + Arzt-Tarif-Tabelle + Dataset/Occupation-Schema)
// auf den Bundesland-Kammer-Landingpages /singles-regional/aerztekammern/{bundesland}.
//
// WICHTIG (GESETZ: echte Fakten, nie erfinden): Jede Zahl ist recherchiert und mit Quelle +
// Stand belegt. Fehlt ein Wert, bleibt das Feld weg/undefined — die Komponente blendet es aus,
// NIE schätzen. Die Zahlen liegen hier (TS), nicht im Frontmatter — geschützt vor Content-Agent-
// Erfindung. Mitgliederzahlen: Bundesärztekammer-Ärztestatistik 2024 (Stand 31.12.2024).
//
// Keys = Bundesland-Slug aus src/lib/bundeslaender.ts (NRW = ZWEI Kammern: nordrhein + westfalen-lippe).

export interface KammerBeitrag {
  hebesatz?: string; // z.B. "0,6 %" der Einkünfte aus ärztlicher Tätigkeit — nur wenn belegt
  mindestbeitrag?: string; // z.B. "60 €"
  hoechstbeitrag?: string; // z.B. "6.000 €"
  quelle?: string;
}

export interface AerztekammerData {
  kammerName: string; // offizieller Name, z.B. "Ärztekammer Nordrhein"
  url?: string; // offizielle Kammer-Website (extern → nofollow beim Rendern)
  sitz?: string; // Sitz der Hauptgeschäftsstelle
  mitglieder?: string; // Anzahl Kammermitglieder (Ärzte)
  mitgliederStand?: string; // Stand der Mitgliederzahl (z.B. "31.12.2024")
  gegruendet?: string; // Gründungsjahr (nur wenn belastbar belegt)
  beitrag?: KammerBeitrag; // einkommensabhängiger Pflichtbeitrag (je Satzung)
  aktualisiert?: string; // Stand der Datenpflege (ISO) -> dateModified
}

// Quelle aller Mitgliederzahlen (eine Tabelle deckt alle 17 Kammern ab).
export const MITGLIEDER_QUELLE =
  'Bundesärztekammer, Ärztestatistik 2024 (Kammermitglieder nach Landesärztekammern, Stand 31.12.2024)';

const STAND = '31.12.2024';
const PFLEGE_STAND = '2026-06-19';

export const AERZTEKAMMERN: Record<string, AerztekammerData> = {
  'baden-wuerttemberg': {
    kammerName: 'Landesärztekammer Baden-Württemberg', url: 'https://www.aerztekammer-bw.de', sitz: 'Stuttgart',
    mitglieder: '76.891', mitgliederStand: STAND, gegruendet: '1954', aktualisiert: PFLEGE_STAND,
    beitrag: { mindestbeitrag: '50 €', quelle: 'aerztekammer-bw.de (Beitrag, Stand 2026)' },
  },
  bayern: {
    kammerName: 'Bayerische Landesärztekammer', url: 'https://www.blaek.de', sitz: 'München',
    mitglieder: '96.830', mitgliederStand: STAND, gegruendet: '1945', aktualisiert: PFLEGE_STAND,
  },
  berlin: {
    kammerName: 'Ärztekammer Berlin', url: 'https://www.aekb.de', sitz: 'Berlin',
    mitglieder: '36.285', mitgliederStand: STAND, gegruendet: '1962', aktualisiert: PFLEGE_STAND,
    beitrag: { mindestbeitrag: '69 €', hoechstbeitrag: '6.555 €', quelle: 'aekb.de (Mitgliedsbeitrag, Stand 2026)' },
  },
  brandenburg: {
    kammerName: 'Landesärztekammer Brandenburg', url: 'https://www.laekb.de', sitz: 'Cottbus',
    mitglieder: '15.958', mitgliederStand: STAND, gegruendet: '1990', aktualisiert: PFLEGE_STAND,
  },
  bremen: {
    kammerName: 'Ärztekammer Bremen', url: 'https://www.aekhb.de', sitz: 'Bremen',
    mitglieder: '5.821', mitgliederStand: STAND, gegruendet: '1959', aktualisiert: PFLEGE_STAND,
    beitrag: { hebesatz: '0,6 %', mindestbeitrag: '60 €', hoechstbeitrag: '6.000 €', quelle: 'aekhb.de (Kammerbeitrag, Stand 2026)' },
  },
  hamburg: {
    kammerName: 'Ärztekammer Hamburg', url: 'https://www.aerztekammer-hamburg.org', sitz: 'Hamburg',
    mitglieder: '19.532', mitgliederStand: STAND, gegruendet: '1895', aktualisiert: PFLEGE_STAND,
    beitrag: { mindestbeitrag: '60 €', hoechstbeitrag: '5.500 €', quelle: 'aerztekammer-hamburg.org (Beitrag, Stand 2026)' },
  },
  hessen: {
    kammerName: 'Landesärztekammer Hessen', url: 'https://www.laekh.de', sitz: 'Frankfurt am Main',
    mitglieder: '40.059', mitgliederStand: STAND, gegruendet: '1956', aktualisiert: PFLEGE_STAND,
  },
  'mecklenburg-vorpommern': {
    kammerName: 'Ärztekammer Mecklenburg-Vorpommern', url: 'https://www.aek-mv.de', sitz: 'Rostock',
    mitglieder: '11.991', mitgliederStand: STAND, gegruendet: '1990', aktualisiert: PFLEGE_STAND,
  },
  niedersachsen: {
    kammerName: 'Ärztekammer Niedersachsen', url: 'https://www.aekn.de', sitz: 'Hannover',
    mitglieder: '46.563', mitgliederStand: STAND, gegruendet: '1945', aktualisiert: PFLEGE_STAND,
  },
  nordrhein: {
    kammerName: 'Ärztekammer Nordrhein', url: 'https://www.aekno.de', sitz: 'Düsseldorf',
    mitglieder: '71.394', mitgliederStand: STAND, gegruendet: '1946', aktualisiert: PFLEGE_STAND,
    beitrag: { mindestbeitrag: '15 €', hoechstbeitrag: '4.995 €', quelle: 'aekno.de (Kammerbeitrag, Stand 2026)' },
  },
  'westfalen-lippe': {
    kammerName: 'Ärztekammer Westfalen-Lippe', url: 'https://www.aekwl.de', sitz: 'Münster',
    mitglieder: '51.631', mitgliederStand: STAND, gegruendet: '1947', aktualisiert: PFLEGE_STAND,
  },
  'rheinland-pfalz': {
    kammerName: 'Landesärztekammer Rheinland-Pfalz', url: 'https://www.laek-rlp.de', sitz: 'Mainz',
    mitglieder: '24.441', mitgliederStand: STAND, gegruendet: '1949', aktualisiert: PFLEGE_STAND,
  },
  saarland: {
    kammerName: 'Ärztekammer des Saarlandes', url: 'https://www.aerztekammer-saarland.de', sitz: 'Saarbrücken',
    mitglieder: '7.095', mitgliederStand: STAND, gegruendet: '1945', aktualisiert: PFLEGE_STAND,
  },
  sachsen: {
    kammerName: 'Sächsische Landesärztekammer', url: 'https://www.slaek.de', sitz: 'Dresden',
    mitglieder: '27.723', mitgliederStand: STAND, gegruendet: '1990', aktualisiert: PFLEGE_STAND,
  },
  'sachsen-anhalt': {
    kammerName: 'Ärztekammer Sachsen-Anhalt', url: 'https://www.aeksa.de', sitz: 'Magdeburg',
    mitglieder: '14.058', mitgliederStand: STAND, gegruendet: '1990', aktualisiert: PFLEGE_STAND,
  },
  'schleswig-holstein': {
    kammerName: 'Ärztekammer Schleswig-Holstein', url: 'https://www.aeksh.de', sitz: 'Bad Segeberg',
    mitglieder: '20.503', mitgliederStand: STAND, aktualisiert: PFLEGE_STAND,
    beitrag: { hebesatz: '0,6 %', mindestbeitrag: '45 €', quelle: 'aeksh.de (Kammerbeitrag, Stand 2026)' },
  },
  thueringen: {
    kammerName: 'Landesärztekammer Thüringen', url: 'https://www.laek-thueringen.de', sitz: 'Jena',
    mitglieder: '14.114', mitgliederStand: STAND, gegruendet: '1990', aktualisiert: PFLEGE_STAND,
  },
};

// Gesetzlicher Aufgabenkatalog der Ärztekammern (ärztliche Selbstverwaltung, bundesweit
// ähnlich nach den Heilberufe-/Kammergesetzen der Länder). Quelle: Bundesärztekammer,
// Ärztekammer Nordrhein (Aufgaben), Heilberufsgesetze der Länder.
export const AERZTEKAMMER_AUFGABEN: { titel: string; text: string }[] = [
  { titel: 'Ärztliche Weiterbildung', text: 'Die Kammer erlässt die Weiterbildungsordnung, akkreditiert Weiterbildungsstätten und nimmt die Facharztprüfungen ab — der Facharzttitel wird von der Kammer verliehen, nicht vom Staat.' },
  { titel: 'Fortbildung', text: 'Sie überwacht und zertifiziert die gesetzlich vorgeschriebene ärztliche Fortbildung (Fortbildungspunkte nach § 95d SGB V).' },
  { titel: 'Berufsaufsicht & Berufsordnung', text: 'Die Kammer setzt die Berufsordnung durch und führt bei Verstößen berufsgerichtliche Verfahren — Kern der ärztlichen Selbstverwaltung.' },
  { titel: 'Arztregister', text: 'Sie führt das Verzeichnis aller Kammermitglieder mit Qualifikationen, Approbations- und Weiterbildungsdaten.' },
  { titel: 'Ethikkommissionen', text: 'Vor klinischer Forschung begutachten die Ethikkommissionen der Kammern Studien nach AMG und Medizinprodukterecht.' },
  { titel: 'Qualitätssicherung', text: 'Die Kammer überwacht fachliche Mindeststandards in der Patientenversorgung, etwa in der Röntgendiagnostik.' },
  { titel: 'Gutachter- & Schlichtungsstellen', text: 'Bei Vorwürfen ärztlicher Behandlungsfehler begutachten die Stellen der Kammern den Fall außergerichtlich und kostenfrei.' },
  { titel: 'Ärztliches Versorgungswerk', text: 'Über das Versorgungswerk organisiert die Kammer die Altersversorgung der Ärztinnen und Ärzte anstelle der gesetzlichen Rente.' },
];

export interface ArztTarifRow {
  gruppe: string; // z.B. "Assistenzarzt (Ä1)"
  einstieg: string; // €/Monat brutto, Stufe 1
  endstufe: string; // €/Monat brutto, höchste Stufe
}

// Arzt-Gehalt nach TV-Ärzte/VKA (kommunale Krankenhäuser), Tarifpartner Marburger Bund.
// Stand ab 01.06.2026 (Laufzeit 01.07.2024–31.12.2026, +2,0 % ab 01.06.2026). Bruttomonat,
// ohne Bereitschaftsdienst-Zuschläge. Quelle: oeffentlichen-dienst.de / praktischarzt.de.
export const ARZT_TARIF_VKA: ArztTarifRow[] = [
  { gruppe: 'Assistenzarzt (Ä1)', einstieg: '5.722 €', endstufe: '7.355 €' },
  { gruppe: 'Facharzt (Ä2)', einstieg: '7.552 €', endstufe: '9.699 €' },
  { gruppe: 'Oberarzt (Ä3)', einstieg: '9.460 €', endstufe: '10.811 €' },
  { gruppe: 'Leitender Oberarzt (Ä4)', einstieg: '11.128 €', endstufe: '11.923 €' },
];

export const ARZT_TARIF_QUELLE =
  'TV-Ärzte/VKA (kommunale Krankenhäuser), Tarifpartner Marburger Bund, Stand ab 01.06.2026 (oeffentlichen-dienst.de, praktischarzt.de)';

export function kammerData(bundesland: string): AerztekammerData | undefined {
  return AERZTEKAMMERN[bundesland];
}
