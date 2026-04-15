import Link from 'next/link';
import type { ReactNode } from 'react';

type Beruf = 'polizei' | 'feuerwehr' | 'sanitaet';

const TEXTS: Record<Beruf, { h2: string; paragraphs: ReactNode[] }> = {
  polizei: {
    h2: 'Polizei-Singles in der Schweiz — zwischen Schichtdienst und Beziehung',
    paragraphs: [
      <>
        Wer bei der Kantonspolizei, einer Stadtpolizei oder beim Grenzwachtkorps arbeitet, kennt das Problem: Der Job frisst Zeit, das Privatleben bleibt oft liegen. Schichtdienst, kurzfristige Einsätze, emotional heikle Lagen — und am Ende des Tages steht die Frage im Raum, <Link href="/singles-partnersuche/wo-polizisten-kennenlernen">wo man Menschen kennenlernt</Link>, die das nicht nur aushalten, sondern verstehen.
      </>,
      <>
        Blaulichtsingles.ch ist für genau diese Zielgruppe gebaut. Die Plattform richtet sich an Polizistinnen und Polizisten aus allen 26 Kantonen und den 300+ Gemeinde-Korps der Schweiz. Anders als bei generischen Dating-Apps musst du hier nicht erklären, warum du am Samstagabend arbeitest oder weshalb dein Telefon im Hintergrund permanent piept. Konkrete <Link href="/singles-partnersuche/polizei-dating-schweiz">Polizei-Dating-Tipps für die Schweiz</Link> helfen beim Einstieg.
      </>,
      <>
        Die Beziehungen, die hier entstehen, profitieren von zwei Dingen: einem gemeinsamen Grundverständnis für Belastungen und einem Netzwerk aus Gleichgesinnten. Viele Paare im Blaulicht-Umfeld berichten, dass sie sich über die Arbeit nicht erklären müssen — das allein reduziert Reibung im Alltag enorm. <Link href="/singles-partnersuche/ueberstunden-polizei-paare-zeit-finden">Überstunden und Dienstpläne als Paar meistern</Link> wird nicht zum Drama, sondern zur Routine. Auch <Link href="/singles-partnersuche/liebe-ueber-kantonsgrenzen-polizei">Liebe über Kantonsgrenzen hinweg</Link> funktioniert, wenn beide das Dienstmodell kennen.
      </>,
      <>
        Die Regional-Übersicht unten sortiert dich direkt zu deinem Kanton. Ob Kapo Zürich, Kapo Waadt, Kapo Bern oder eine kleinere Einheit wie die Kantonspolizei Uri — für jede Region gibt es eigene Tipps, Treffpunkte und eine Liste verfügbarer Profile in deiner Nähe. Einsatzkräfte aus anderen Berufen findest du übrigens im <Link href="/singles-partnersuche/feuerwehr">Feuerwehr-Pillar</Link> oder bei der <Link href="/singles-partnersuche/sanitaet">Sanität</Link>.
      </>,
    ],
  },
  feuerwehr: {
    h2: 'Feuerwehr-Singles in der Schweiz — Milizsystem und Liebe unter einem Dach',
    paragraphs: [
      <>
        Die Schweizer Feuerwehr ist anders als in den meisten Ländern — etwa 85 % der Einsatzkräfte sind Milizfeuerwehrleute, also Freiwillige neben dem Hauptberuf. Dazu kommen die Berufsfeuerwehren in Zürich, Bern, Basel, Genf und weiteren grösseren Städten. Beide Welten eint ein Ding: wenn der Piepser geht, ist Schluss mit Planung — und <Link href="/singles-partnersuche/erstes-date-feuerwehrmann-piepser">genau das erste Date</Link> ist dann oft gelaufen.
      </>,
      <>
        Das macht Partnersuche anspruchsvoll. Wer als Feuerwehrfrau oder Feuerwehrmann Dating-Apps ausprobiert, kennt die Reaktionen: „Du musst wieder weg? Jetzt?" — und dann war es das oft schon. Auf Blaulichtsingles.ch begegnest du Menschen, die das Pattern kennen und selber leben. <Link href="/singles-partnersuche/feuerwehr-partnersuche-schweiz">Feuerwehr-Partnersuche in der Schweiz</Link> ist der richtige Ausgangspunkt.
      </>,
      <>
        Was die Milizfeuerwehr besonders macht: die Doppelbelastung. Tagsüber Beruf, abends Übung, nachts ggf. Einsatz. Pärchen, die beide in der Feuerwehr sind, teilen oft sogar denselben Funkkanal. Wer darauf steht, findet hier passende Verbindungen — siehe <Link href="/singles-partnersuche/kameradschaft-liebe-dating-feuerwehrverein">Kameradschaft und Liebe im Feuerwehrverein</Link> oder <Link href="/singles-partnersuche/miliz-beruf-feuerwehr-dating-realitaeten">Miliz, Beruf und Dating-Realitäten</Link>.
      </>,
      <>
        Nutz die Kanton-Navigation unten, um Singles in deiner Region zu finden. Zusätzlich haben wir Artikel mit Tipps fürs erste Date nach der Übung, Umgang mit Einsatz-Trauma in der Beziehung und wie man als Feuerwehr-Paar auch ohne Kalender eine Beziehung am Laufen hält. Wer breiter sucht, startet beim <Link href="/singles-partnersuche/polizei">Polizei-Pillar</Link> oder der <Link href="/singles-partnersuche/sanitaet">Sanität</Link>.
      </>,
    ],
  },
  sanitaet: {
    h2: 'Sanität-Singles in der Schweiz — Rettungsdienst, Pflege und das Liebesleben danach',
    paragraphs: [
      <>
        Im Rettungsdienst, in der Pflege oder als Ärztin in der Notaufnahme: der Beruf verändert dich. Nicht jeder versteht, warum man nach einer 12-Stunden-Schicht keine grosse Lust auf Smalltalk hat — und warum ein ruhiger Abend auf dem Sofa oft mehr wert ist als jedes Ausgeh-Event. Beschrieben in <Link href="/singles-partnersuche/erstes-date-nach-nachtschicht">Erstes Date nach der Nachtschicht</Link>.
      </>,
      <>
        Blaulichtsingles.ch fasst Sanität als Oberbegriff: Rettungssanitäter HF, Notfallpflege, ambulante Pflege, Ärztinnen im Spital, Einsatzkräfte der REGA, Sanitätsdienst der Armee. Alle teilen den Dienstrhythmus und die Art, wie man über Tod, Notlagen und schnelle Entscheidungen spricht — oder eben nicht. Der <Link href="/singles-partnersuche/partnersuche-mediziner">Partnersuche-Guide für Mediziner</Link> bündelt das Wichtigste.
      </>,
      <>
        Ein oft übersehenes Thema ist der Berufsausstieg: rund <Link href="/singles-partnersuche/rettungssanitaeter-berufsausstieg-liebe">7,5 Jahre bleiben Rettungssanitäter im Schnitt im Beruf</Link>, bevor sie wechseln. Das verändert auch die Beziehungsdynamik. Wer eine Partnerin oder einen Partner mit ähnlichem Hintergrund hat, durchläuft diesen Übergang oft gemeinsam — und nicht einsam. Auch <Link href="/singles-partnersuche/ptbs-rettungsdienst-beziehung">PTBS im Rettungsdienst und die Beziehung</Link> ist ein reales Thema.
      </>,
      <>
        Die Regional-Liste ist nach Kantonen aufgeteilt, dazu findest du Stadt-Varianten für grössere Zentren wie Zürich, Bern, Basel, Luzern und Genf. Die Tipps-Artikel gehen auf Schichtdienst, PTBS-Umgang, <Link href="/singles-partnersuche/alleinerziehend-schichtdienst-sanitaeterin">Alleinerziehung im Schichtdienst</Link> und <Link href="/singles-partnersuche/pikett-nachtschicht-dating-rettungsdienst">Dating trotz Pikett</Link> ein. Parallel aktiv im <Link href="/singles-partnersuche/polizei">Polizei-Pillar</Link> oder bei der <Link href="/singles-partnersuche/feuerwehr">Feuerwehr</Link>.
      </>,
    ],
  },
};

export function PillarLongIntro({ beruf }: { beruf: Beruf }) {
  const t = TEXTS[beruf];
  return (
    <section className="pillar-long-intro max-w-3xl mx-auto px-6 py-12 border-t border-foreground/10 mt-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.h2}</h2>
      <div className="space-y-4 text-foreground/75 leading-relaxed">
        {t.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
