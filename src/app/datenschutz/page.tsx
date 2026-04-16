import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutz — Medicsingles Magazin',
  description:
    'Datenschutzerklärung für das Medicsingles Magazin auf medicsingles.de. Wie wir Daten behandeln, welche Cookies wir setzen und wer Ansprechpartner ist.',
};

export default function DatenschutzPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-24 pb-20 prose prose-neutral">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">Datenschutz Magazin</h1>
      <p className="text-lg text-foreground/70 mb-10">
        Diese Seite bezieht sich auf das redaktionelle Magazin unter <code>medicsingles.de/magazin</code>. Die vollständige
        Datenschutzerklärung der Dating-Plattform ist auf der Hauptseite verlinkt.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Verantwortliche Stelle</h2>
      <p className="text-foreground/70">
        Verantwortlich für den redaktionellen Inhalt: <strong>Tommy Honold</strong><br />
        E-Mail:{' '}
        <a href="mailto:redaktion@medicsingles.de" className="text-brand-orange hover:underline">
          redaktion@medicsingles.de
        </a>
        <br />
        Autor-Profil:{' '}
        <Link href="/autor/tommy-honold" className="text-brand-orange hover:underline">
          /autor/tommy-honold
        </Link>
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Welche Daten werden erhoben?</h2>
      <p className="text-foreground/70">
        Das Magazin setzt keine Tracking-Cookies und kein Remarketing. Logfiles des Hosters (Vercel) werden 14 Tage
        aufbewahrt und enthalten anonymisierte IP-Adressen, User-Agent und aufgerufene URLs — ausschließlich zur
        Sicherstellung des Betriebs.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Server &amp; Hosting</h2>
      <p className="text-foreground/70">
        Das Magazin wird über <strong>Vercel Inc.</strong> (USA / EU-Frankfurt) ausgeliefert. Der Zugriff erfolgt ausschließlich
        über HTTPS. Einbettungen (YouTube) werden nur beim Klick geladen.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Externe Links</h2>
      <p className="text-foreground/70">
        Wir verlinken auf externe Seiten (z.B. Sender-Presseportale, Instagram-Profile von Prominenten). Für deren Inhalt
        und Datenerhebung sind die jeweiligen Betreiber verantwortlich.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Cookies auf der Hauptseite</h2>
      <p className="text-foreground/70">
        Die Dating-Plattform <a href="https://medicsingles.de" className="text-brand-orange hover:underline">medicsingles.de</a>{' '}
        hat eine eigene Datenschutzerklärung — bitte{' '}
        <a href="https://medicsingles.de/datenschutz.html" className="text-brand-orange hover:underline">
          dort nachlesen
        </a>.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Deine Rechte</h2>
      <p className="text-foreground/70">
        Auskunft, Berichtigung, Löschung, Widerspruch, Datenübertragung — alle DSGVO-/revDSG-Rechte gelten. Einfach per
        Mail an{' '}
        <a href="mailto:redaktion@medicsingles.de" className="text-brand-orange hover:underline">
          redaktion@medicsingles.de
        </a>{' '}
        anfragen. Antwortzeit 24–48 Stunden.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Impressum</h2>
      <p className="text-foreground/70">
        Das Impressum + AGB der Plattform findest du{' '}
        <a href="https://medicsingles.de/impressum.html" className="text-brand-orange hover:underline">
          hier
        </a>.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Schweizer Kontext</h2>
      <p className="text-foreground/70">
        Diese Datenschutzerklärung folgt sowohl dem revidierten Schweizer Datenschutzgesetz (revDSG, gültig seit 1. September 2023)
        als auch der EU-DSGVO. Beides trifft zu, weil das Magazin in Deutschland und der Schweiz erreichbar ist und Nutzer aus
        beiden Rechtsräumen anspricht. Die Plattform MedicSingles.de wird von der ICONY GmbH (Sitz in Berlin) betrieben — Detail
        siehe <a href="https://medicsingles.de/impressum.html" className="text-brand-orange hover:underline">Impressum auf
        der Hauptseite</a>.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Beschwerdestellen</h2>
      <p className="text-foreground/70">
        Wenn du der Meinung bist, dass deine Daten unrechtmässig verarbeitet werden, kannst du dich neben einer direkten
        Anfrage an uns auch an die zuständigen Aufsichtsbehörden wenden: in der Schweiz an den Eidgenössischen Datenschutz-
        und Öffentlichkeitsbeauftragten (EDÖB), in Deutschland an die jeweilige Landesdatenschutzbehörde, in Österreich an
        die Datenschutzbehörde (DSB).
      </p>

      <p className="text-sm text-foreground/45 mt-12">Stand: 14. April 2026</p>
    </section>
  );
}
