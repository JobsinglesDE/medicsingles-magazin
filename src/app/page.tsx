import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicsingles Magazin — Echte Liebe in der Medizin',
  description: 'Partnersuche für Ärzte, Pflegepersonal, Therapeuten und Rettungskräfte. Wir verstehen Schichtdienst, emotionale Last und den Alltag im Heilberuf.',
};

const GUIDES = [
  { slug: 'partnersuche-medizin', title: 'Der große Guide', kicker: 'Pillar', lead: 'Die ultimative Anleitung zur Partnersuche für alle Heilberufe — von Online-Dating bis Erfolgsgeschichten.' },
  { slug: 'partnersuche-aerzte', title: 'Dating als Arzt oder Ärztin', kicker: 'Ärzte', lead: 'Vom Kittel zum Date — strategisch, ehrlich, realistisch. Für Assistenzärztinnen und Oberärzte.' },
  { slug: 'partnersuche-pflege', title: 'Liebe in der Pflege', kicker: 'Pflege', lead: 'Dating trotz Schichtdienst und emotionaler Last. Für Krankenschwestern, Pfleger und Pflegefachkräfte.' },
  { slug: 'partnersuche-therapeuten', title: 'Partnersuche für Therapeuten', kicker: 'Therapeuten', lead: 'Den Kopf im Feierabend frei bekommen — und trotzdem echten Kontakt finden.' },
];

export default function HomePage() {
  return (
    <main className="bg-zinc-950 text-zinc-100 min-h-screen">
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <p className="text-brand-orange-text uppercase tracking-widest text-xs mb-4">Medicsingles Magazin</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Echte Liebe in der Medizin
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Partnersuche für Ärzte, Pflegepersonal, Therapeuten und Rettungskräfte. Wir verstehen Schichtdienst, emotionale Last und den Alltag im Heilberuf.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 grid md:grid-cols-2 gap-6">
        {GUIDES.map(g => (
          <Link key={g.slug} href={`/${g.slug}`} className="group p-8 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition border border-zinc-800">
            <p className="text-brand-orange-text text-xs uppercase tracking-widest mb-3">{g.kicker}</p>
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-brand-orange-text">{g.title}</h2>
            <p className="text-zinc-400">{g.lead}</p>
          </Link>
        ))}
      </section>

      <footer className="mx-auto max-w-5xl px-6 py-12 text-zinc-500 text-sm border-t border-zinc-800">
        © {new Date().getFullYear()} Medicsingles.de · <Link href="/kontakt" className="hover:underline">Kontakt</Link> · <Link href="/datenschutz" className="hover:underline">Datenschutz</Link> · <Link href="/keystatic" className="hover:underline">CMS</Link>
      </footer>
    </main>
  );
}
