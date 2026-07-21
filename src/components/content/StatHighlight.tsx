'use client';

/**
 * StatHighlight — animierter Einzel-Stat fuer den Artikel-Body (Markdoc-Tag `{% stat %}`).
 * Zahl zaehlt beim Scrollen hoch, optionaler Vergleichsbalken waechst mit. Quelle Pflicht-Disziplin
 * (jede Zahl == Quelle). Wiederverwendbar ueber alle Spokes/Berufsgruppen.
 *
 * Nutzung im mdoc-Body:
 *   {% stat value="61" unit="%" label="Krankenhaus-Pflege arbeitet nachts" compare="18" source="AOK" /%}
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function toNum(s?: string): number | null {
  if (!s) return null;
  const n = Number(
    String(s).trim().replace(/\s/g, '').replace(/\.(?=\d{3}\b)/g, '').replace(',', '.')
  );
  return Number.isFinite(n) ? n : null;
}
function decimalsOf(s?: string): number {
  const frac = String(s ?? '').split(',')[1];
  return frac ? frac.length : 0;
}
function formatDE(v: number, decimals: number): string {
  return v.toFixed(decimals).replace('.', ',');
}

function CountUp({ raw }: { raw: string }) {
  const target = toNum(raw);
  const decimals = decimalsOf(raw);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [text, setText] = useState(target === null ? raw : formatDE(0, decimals));
  useEffect(() => {
    if (target === null || !inView) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: 'easeOut',
      onUpdate: (v) => setText(formatDE(v, decimals)),
    });
    return () => controls.stop();
  }, [inView, target, decimals]);
  return <span ref={ref}>{target === null ? raw : text}</span>;
}

export function StatHighlight({
  value,
  unit,
  label,
  source,
  compare,
}: {
  value: string;
  unit?: string;
  label?: string;
  source?: string;
  compare?: string;
}) {
  const main = toNum(value);
  const comp = toNum(compare);
  const max = Math.max(main ?? 0, comp ?? 0) || 1;

  return (
    <motion.div
      className="not-prose my-8 rounded-xl border border-brand-orange/25 bg-brand-orange/5 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex items-baseline gap-1 shrink-0">
        <span className="text-4xl font-extrabold text-brand-orange-text tabular-nums">
          <CountUp raw={value} />
        </span>
        {unit && <span className="text-xl font-bold text-brand-orange-text">{unit}</span>}
      </div>
      <div className="flex-1">
        {label && <p className="text-sm text-foreground/85 leading-snug">{label}</p>}
        {comp !== null && main !== null && (
          <div className="mt-2 space-y-1.5">
            <div className="h-2 rounded-full bg-brand-orange/15 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-brand-orange"
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.round((main / max) * 100)}%` }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className="h-2 rounded-full bg-foreground/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-foreground/30"
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.round((comp / max) * 100)}%` }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
              />
            </div>
            <p className="text-[11px] text-foreground/45">
              Vergleich: {compare}
              {unit}
            </p>
          </div>
        )}
        {source && <p className="text-[11px] text-foreground/45 mt-2">Quelle: {source}</p>}
      </div>
    </motion.div>
  );
}
