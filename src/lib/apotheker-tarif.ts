// Apotheker-Gehalt (strukturierte Quelle für das Occupation/Salary-Schema auf apotheker-gehalt).
// GESETZ: nur belegte Zahlen. ADA = Bundesrahmentarifvertrag ADEXA / Arbeitgeberverband
// Deutscher Apotheken (öffentliche Apotheke), TVöD = Krankenhausapotheke. Bruttomonat.
export const APOTHEKER_TARIF: { gruppe: string; median: string; max?: string }[] = [
  { gruppe: 'Approbierter Apotheker, 1. Berufsjahr (ADA-Tarif, öffentliche Apotheke)', median: '4.166 €' },
  { gruppe: '2.–5. Berufsjahr (ADA-Tarif)', median: '4.236 €' },
  { gruppe: '6.–10. Berufsjahr (ADA-Tarif)', median: '4.528 €' },
  { gruppe: 'ab 11. Berufsjahr (ADA-Tarif)', median: '4.922 €' },
  { gruppe: 'Krankenhausapotheke (TVöD EG 14, Stufe 1 bis Stufe 6)', median: '5.298 €', max: '7.552 €' },
];

export const APOTHEKER_TARIF_QUELLE =
  'ADEXA/ADA-Gehaltstarif 2026 (öffentliche Apotheke); TVöD (Krankenhausapotheke), Stand 2026';
