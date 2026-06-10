// Einmal-Migration: setzt section: promi-aerzte + person: <hub-slug> auf die Promi-Arzt-Artikel.
// ALLOWLIST (Map slug -> person-Hub-slug) — KEIN Präfix-Match.
// promi-aerzte-deutschland (pillar-sub) ist BEWUSST NICHT enthalten (bleibt Partnersuche).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'content/articles';

const MAP = {
  'eckart-hirschhausen': [
    'promi-eckart-hirschhausen', 'promi-eckart-hirschhausen-buecher',
    'promi-eckart-hirschhausen-frau', 'promi-eckart-hirschhausen-vermoegen',
    'hirschhausen-deepfake-ard-doku-2026', 'hirschhausen-goldene-tanne-sdw-2026',
    'hirschhausen-papst-vatikan',
  ],
  'matthias-riedl': [
    'promi-matthias-riedl', 'promi-matthias-riedl-buecher',
    'promi-matthias-riedl-praxis', 'promi-matthias-riedl-vermoegen',
    'matthias-riedl-iss-besser-3sat-2026',
  ],
  'anne-fleck': [
    'promi-anne-fleck', 'promi-anne-fleck-buecher', 'promi-anne-fleck-methode',
    'promi-anne-fleck-vermoegen', 'anne-fleck-longevity-schlaf-podcast-2026',
  ],
  'yael-adler': [
    'promi-yael-adler', 'promi-yael-adler-buecher', 'promi-yael-adler-mann',
    'promi-yael-adler-vermoegen', 'yael-adler-hautpflege-tipps-2026',
    'yael-adler-sonnencreme-vitamin-d-2026', 'yael-adler-zuerich-genial-ernaehrt-2026',
  ],
  'johannes-wimmer': [
    'promi-johannes-wimmer', 'promi-johannes-wimmer-buecher',
    'promi-johannes-wimmer-sendung', 'promi-johannes-wimmer-vermoegen',
    'johannes-wimmer-pro-care-hannover-2026',
  ],
  'carsten-lekutat': [
    'promi-carsten-lekutat', 'promi-carsten-lekutat-buecher',
    'promi-carsten-lekutat-frau', 'promi-carsten-lekutat-vermoegen',
    'carsten-lekutat-buehnenprogramm-hausarzt-2026',
  ],
  'doc-esser': [
    'promi-doc-esser', 'promi-doc-esser-buecher', 'promi-doc-esser-frau',
    'promi-doc-esser-vermoegen', 'doc-esser-sprechende-medizin-2026',
  ],
  'doc-fischer': [
    'promi-doc-fischer', 'promi-doc-fischer-alter',
    'promi-doc-fischer-buecher', 'promi-doc-fischer-swr',
  ],
  'dietrich-groenemeyer': ['dietrich-groenemeyer-demenz-buch'],
  'hans-wilhelm-mueller-wohlfahrt': ['mueller-wohlfahrt-wiederverletzungen-2026'],
  'werner-mang': ['werner-mang-kirche-kanzel-2026'],
};

function setKey(lines, key, value) {
  const idx = lines.findIndex((l) => new RegExp(`^${key}:`).test(l));
  if (idx >= 0) { lines[idx] = `${key}: ${value}`; return; }
  lines.push(`${key}: ${value}`); // an Frontmatter-Ende anhängen
}

let count = 0;
const missing = [];
for (const [person, slugs] of Object.entries(MAP)) {
  for (const slug of slugs) {
    const file = join(DIR, `${slug}.mdoc`);
    if (!existsSync(file)) { missing.push(slug); continue; }
    const raw = readFileSync(file, 'utf8');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) { missing.push(`${slug} (kein Frontmatter)`); continue; }
    const fmLines = m[1].split('\n');
    setKey(fmLines, 'section', 'promi-aerzte');
    setKey(fmLines, 'person', person);
    const rebuilt = `---\n${fmLines.join('\n')}\n---\n${m[2]}`;
    writeFileSync(file, rebuilt);
    count++;
  }
}
console.log(`✅ ${count} Artikel migriert (section: promi-aerzte + person gesetzt).`);
if (missing.length) console.log(`⚠️  Fehlend: ${missing.join(', ')}`);
