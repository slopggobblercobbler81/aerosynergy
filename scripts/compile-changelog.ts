import fs from 'fs';
import path from 'path';

const changesDir = path.resolve(process.cwd(), 'changes');
const changelogPath = path.resolve(process.cwd(), 'CHANGELOG.md');

console.log('📜 [AeroCompiler] Compiling changelog fragments from changes/...\n');

let fragments: string[] = [];

if (fs.existsSync(changesDir)) {
  const files = fs.readdirSync(changesDir).filter((f) => f.endsWith('.md')).sort();
  for (const f of files) {
    const full = path.join(changesDir, f);
    const content = fs.readFileSync(full, 'utf-8').trim();
    fragments.push(content);
  }
}

const header = `# Changelog 🌊✨

All notable changes to **AeroSynergy Ultra 365 ✨ Cloud Bubble Edition** are documented here.
Compiled automatically from \`changes/*.md\` fragments.

---

## 1.0.0 "Dolphin Sunrise" (Genesis Dawn)

`;

const fullChangelog = header + (fragments.length > 0 ? fragments.join('\n\n---\n\n') : '*No fragments found.*') + '\n';

fs.writeFileSync(changelogPath, fullChangelog, 'utf-8');
console.log(`✅ [AeroCompiler] Successfully compiled ${fragments.length} fragments into CHANGELOG.md!\n`);
