import {
  type AerztekammerData,
  AERZTEKAMMER_AUFGABEN,
  ARZT_TARIF_VKA,
  ARZT_TARIF_QUELLE,
  MITGLIEDER_QUELLE,
} from '@/lib/aerztekammer-statistiken';

// GEO-Datenblock für die Bundesland-Kammer-Landingpage: macht die Seite zur datenreichsten
// Nicht-Verband-Ressource (Mitglieder + Beitrag + Aufgaben + Arzt-Tarif), gefüttert aus
// aerztekammer-statistiken.ts (echte, belegte Zahlen). Mirror des gastro DEHOGA-GEO-Layers.
export function KammerStats({ data, kammerName }: { data: AerztekammerData; kammerName: string }) {
  const beitrag = data.beitrag;
  const hasFacts = data.mitglieder || data.sitz || data.gegruendet || beitrag;

  return (
    <section className="my-10">
      {/* Fakten-Cards */}
      {hasFacts && (
        <>
          <h2 id="kammer-in-zahlen" className="text-2xl font-bold mb-4 scroll-mt-24">
            {kammerName} in Zahlen
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {data.mitglieder && (
              <div className="rounded-xl bg-surface-dark border border-white/10 p-4">
                <div className="text-2xl font-bold text-brand-orange-text">{data.mitglieder}</div>
                <div className="text-xs text-white/60 mt-1">Kammermitglieder{data.mitgliederStand ? ` (${data.mitgliederStand})` : ''}</div>
              </div>
            )}
            {data.sitz && (
              <div className="rounded-xl bg-surface-dark border border-white/10 p-4">
                <div className="text-2xl font-bold text-brand-orange-text">{data.sitz}</div>
                <div className="text-xs text-white/60 mt-1">Sitz der Kammer</div>
              </div>
            )}
            {data.gegruendet && (
              <div className="rounded-xl bg-surface-dark border border-white/10 p-4">
                <div className="text-2xl font-bold text-brand-orange-text">{data.gegruendet}</div>
                <div className="text-xs text-white/60 mt-1">gegründet</div>
              </div>
            )}
            {beitrag && (beitrag.hebesatz || beitrag.mindestbeitrag) && (
              <div className="rounded-xl bg-surface-dark border border-white/10 p-4">
                <div className="text-2xl font-bold text-brand-orange-text">
                  {beitrag.hebesatz ?? `ab ${beitrag.mindestbeitrag}`}
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {beitrag.hebesatz ? 'Beitrag (Hebesatz)' : 'Mindestbeitrag/Jahr'}
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-white/40 mb-6">Quelle: {MITGLIEDER_QUELLE}.</p>
        </>
      )}

      {/* Pflichtbeitrag erklärt */}
      <h3 className="text-xl font-bold mb-2 mt-8">Mitgliedschaft &amp; Pflichtbeitrag</h3>
      <p className="text-foreground/80 leading-relaxed mb-3">
        Jede Ärztin und jeder Arzt, die in {data.kammerName.replace(/^(Landes|Bayerische|Sächsische)?\s?Ärztekammer\s?(des\s)?/, '') || 'diesem Bundesland'} ärztlich tätig sind, sind <strong>Pflichtmitglied</strong> der Kammer — sie ist eine
        Körperschaft des öffentlichen Rechts nach dem jeweiligen Heilberufsgesetz. Der Kammerbeitrag ist
        einkommensabhängig: Er wird als Hebesatz{beitrag?.hebesatz ? ` (hier ${beitrag.hebesatz})` : ' (häufig rund 0,6 %)'} auf
        die Einkünfte aus ärztlicher Tätigkeit berechnet, mit einem satzungsgemäßen Mindest- und Höchstbeitrag.
      </p>
      {beitrag && (beitrag.mindestbeitrag || beitrag.hoechstbeitrag) && (
        <p className="text-foreground/80 leading-relaxed mb-3">
          Bei der {data.kammerName} liegt der Beitrag {beitrag.mindestbeitrag ? `zwischen ${beitrag.mindestbeitrag}` : ''}
          {beitrag.hoechstbeitrag ? ` und ${beitrag.hoechstbeitrag} pro Jahr` : (beitrag.mindestbeitrag ? ' pro Jahr aufwärts' : '')}
          {beitrag.quelle ? `. (${beitrag.quelle})` : '.'}
        </p>
      )}

      {/* Offizielle Kammer-Website (extern → nofollow, GESETZ) */}
      {data.url && (
        <p className="text-sm text-foreground/70 mb-6">
          Offizielle Website:{' '}
          <a href={data.url} target="_blank" rel="nofollow noopener noreferrer" className="text-brand-orange-text hover:underline">
            {data.url.replace(/^https?:\/\/(www\.)?/, '')}
          </a>
        </p>
      )}

      {/* Aufgaben */}
      <h3 className="text-xl font-bold mb-3 mt-8">Was macht die {data.kammerName.includes('Ärztekammer') ? 'Ärztekammer' : 'Landesärztekammer'}?</h3>
      <ul className="space-y-2 mb-6 list-none pl-0">
        {AERZTEKAMMER_AUFGABEN.map((a) => (
          <li key={a.titel} className="flex gap-2 text-foreground/80 leading-relaxed">
            <span className="text-brand-orange-text font-bold shrink-0">•</span>
            <span><strong>{a.titel}:</strong> {a.text}</span>
          </li>
        ))}
      </ul>

      {/* Arzt-Gehalt / Tarif */}
      <h3 className="text-xl font-bold mb-2 mt-8">Arzt-Gehalt in {kammerName}: Tarif TV-Ärzte/VKA 2026</h3>
      <p className="text-foreground/80 leading-relaxed mb-3">
        Wer als angestellter Arzt an einem kommunalen Krankenhaus arbeitet, wird nach dem Tarifvertrag
        <strong> TV-Ärzte/VKA</strong> vergütet — verhandelt vom Marburger Bund. Die Eckwerte (Bruttomonat, ohne
        Bereitschaftsdienst-Zuschläge):
      </p>
      <div className="overflow-x-auto mb-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-foreground/20 text-left">
              <th className="py-2 pr-4 font-semibold">Position</th>
              <th className="py-2 pr-4 font-semibold">Einstieg</th>
              <th className="py-2 font-semibold">Endstufe</th>
            </tr>
          </thead>
          <tbody>
            {ARZT_TARIF_VKA.map((r) => (
              <tr key={r.gruppe} className="border-b border-foreground/10">
                <td className="py-2 pr-4">{r.gruppe}</td>
                <td className="py-2 pr-4">{r.einstieg}</td>
                <td className="py-2">{r.endstufe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-white/40 mb-2">Quelle: {ARZT_TARIF_QUELLE}.</p>
    </section>
  );
}
