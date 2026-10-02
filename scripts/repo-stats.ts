import fs from 'fs';
import path from 'path';

function countFiles(dir: string, ext = '.md'): number {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir).filter((f) => f.endsWith(ext)).length;
}

function countFolders(dir: string): number {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).length;
}

const featuresCount = countFolders(path.resolve(process.cwd(), 'src/features'));
const chaosCardsCount = countFiles(path.resolve(process.cwd(), 'chaos-deck'), '.md');
const promisedFutureCount = countFiles(path.resolve(process.cwd(), 'lore/promised-future'), '.md');
const mascotLoreCount = countFiles(path.resolve(process.cwd(), 'lore/mascot'), '.md');
const personasCount = countFiles(path.resolve(process.cwd(), 'personas'), '.md');
const phraseBanksCount = countFiles(path.resolve(process.cwd(), 'src/slop/phrases'), '.json');

console.log(`
═══════════════════════════════════════════════════════════
   🌊 AeroSynergy Ultra 365 ✨ Repository Status 📊
═══════════════════════════════════════════════════════════
  Installed Features:     ${featuresCount}
  Chaos Deck Cards:       ${chaosCardsCount} / 60
  Promised Future Seeds:  ${promisedFutureCount} / 20
  Mascot Lore Entries:    ${mascotLoreCount} / 20
  Active Personas:        ${personasCount}
  Fake AI Phrase Banks:   ${phraseBanksCount}
  Runtime Network Calls:  0 (Strict Zero-Network)
═══════════════════════════════════════════════════════════
`);
