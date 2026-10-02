import fs from 'fs';
import path from 'path';

const APPROVED_CATEGORIES = new Set([
  'productivity',
  'wellness',
  'ai-insights',
  'gadgets',
  'media-ambience',
  'gamification',
  'personalization',
  'lore-easter-eggs',
  'meta',
  'synergy',
]);

const APPROVED_EMOJIS_REGEX = /[🌊💧🫧☁️🌈🌿🍃🐬🐠🦋✨💎🚀💙🌟🔮🌐🎉✅🟢🌅⚙️🔍⭐🗑️➕✏️❌🔔]/u;

interface ValidationError {
  featureId: string;
  rule: string;
  message: string;
}

const errors: ValidationError[] = [];

const featuresDir = path.resolve(process.cwd(), 'src/features');
const srcDir = path.resolve(process.cwd(), 'src');

console.log('🫧 [AeroValidator] Launching Feature Ocean Quality Gate per §14.2...\n');

if (!fs.existsSync(featuresDir)) {
  console.error('❌ Features directory src/features not found!');
  process.exit(1);
}

const targetFeature = process.argv[2];
const featureFolders = fs
  .readdirSync(featuresDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((name) => !targetFeature || name === targetFeature);

console.log(`🔍 Discovered ${featureFolders.length} feature folders to inspect.`);

// 1. Validate each feature folder
for (const id of featureFolders) {
  const folderPath = path.join(featuresDir, id);

  // Check required files
  const manifestPath = path.join(folderPath, 'manifest.ts');
  const componentPath = path.join(folderPath, 'Feature.tsx');
  const cssPath = path.join(folderPath, 'feature.css');
  const testPath = path.join(folderPath, 'feature.test.ts');

  if (!fs.existsSync(manifestPath)) {
    errors.push({ featureId: id, rule: 'manifest-exists', message: 'Missing manifest.ts' });
    continue;
  }
  if (!fs.existsSync(componentPath)) {
    errors.push({ featureId: id, rule: 'component-exists', message: 'Missing Feature.tsx' });
  }
  if (!fs.existsSync(cssPath)) {
    errors.push({ featureId: id, rule: 'css-exists', message: 'Missing feature.css' });
  }
  if (!fs.existsSync(testPath)) {
    errors.push({ featureId: id, rule: 'test-exists', message: 'Missing feature.test.ts smoke test' });
  }

  // Read manifest source
  const manifestContent = fs.readFileSync(manifestPath, 'utf-8');

  // Verify id match
  const idMatch = manifestContent.match(/id:\s*['"`]([^'"`]+)['"`]/);
  if (!idMatch || idMatch[1] !== id) {
    errors.push({
      featureId: id,
      rule: 'manifest-id',
      message: `Manifest id '${idMatch ? idMatch[1] : 'unknown'}' does not match folder name '${id}'`,
    });
  }

  // Verify category
  const catMatch = manifestContent.match(/category:\s*['"`]([^'"`]+)['"`]/);
  if (!catMatch || !APPROVED_CATEGORIES.has(catMatch[1])) {
    errors.push({
      featureId: id,
      rule: 'manifest-category',
      message: `Invalid or missing category '${catMatch ? catMatch[1] : 'unknown'}'`,
    });
  }

  // Verify emoji in description
  const descMatch = manifestContent.match(/description:\s*['"`]([\s\S]*?)['"`],/);
  if (descMatch) {
    if (!APPROVED_EMOJIS_REGEX.test(descMatch[1])) {
      errors.push({
        featureId: id,
        rule: 'manifest-emoji',
        message: 'Manifest description must contain at least one approved Frutiger Aero emoji per §8.2',
      });
    }
  }

  // Scan files in feature folder for illegal sibling imports and direct storage access
  const featureFiles = fs.readdirSync(folderPath);
  for (const f of featureFiles) {
    const filePath = path.join(folderPath, f);
    const stat = fs.statSync(filePath);

    // Asset size enforcement (< 300 KB)
    if (stat.size > 300 * 1024) {
      errors.push({
        featureId: id,
        rule: 'asset-size',
        message: `File ${f} (${(stat.size / 1024).toFixed(1)} KB) exceeds 300 KB limit`,
      });
    }

    if (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf-8');

      // Check cross-feature sibling import
      const siblingImportRegex = /from\s+['"`].*\/features\/(?!wellness-hydration-orb-3)[^/'"`]+.*['"`]/g;
      const match = siblingImportRegex.exec(content);
      if (match) {
        errors.push({
          featureId: id,
          rule: 'import-isolation',
          message: `Illegal sibling feature import: ${match[0]}`,
        });
      }

      // Check direct localStorage/sessionStorage access
      if (/window\.localStorage|window\.sessionStorage|\blocalStorage\.|\bsessionStorage\./.test(content)) {
        errors.push({
          featureId: id,
          rule: 'storage-access',
          message: `Direct access to localStorage/sessionStorage in ${f}. Use ns prop instead!`,
        });
      }
    }
  }

  // Verify CSS scoping
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    // Strip comments
    let cleanCss = cssContent.replace(/\/\*[\s\S]*?\*\//g, '');
    // Strip @keyframes blocks (handles nested braces)
    cleanCss = cleanCss.replace(/@keyframes\s+[\w-]+\s*\{[\s\S]*?\n\}/g, '');
    cleanCss = cleanCss.replace(/@keyframes\s+[\w-]+\s*\{[^}]*\{[^}]*\}[^}]*\}/g, '');

    // Match selectors
    const ruleBlocks = cleanCss.split('}');
    for (const block of ruleBlocks) {
      const selector = block.split('{')[0]?.trim();
      if (selector && !selector.startsWith('@') && selector.length > 0) {
        // Skip keyframe step percentages if any remained
        if (/^\d+%\s*$/.test(selector) || selector === 'from' || selector === 'to') {
          continue;
        }
        const subSelectors = selector.split(',').map((s) => s.trim());
        for (const sub of subSelectors) {
          if (sub && !sub.startsWith(`.feat-${id}`) && !/^\d+%\s*$/.test(sub) && sub !== 'from' && sub !== 'to') {
            errors.push({
              featureId: id,
              rule: 'css-scoping',
              message: `Unscoped CSS selector '${sub}' in feature.css. Must begin with .feat-${id}`,
            });
          }
        }
      }
    }
  }
}

// 2. Global Zero-Network Grep across src/
function scanZeroNetwork(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanZeroNetwork(fullPath);
    } else if (/\.(ts|tsx|js|html)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, lineNo) => {
        // Exclude comments
        const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
        // Exclude SVG xmlns, schema definitions, or test mocks
        if (cleanLine.includes('http://www.w3.org') || cleanLine.includes('xmlns=')) {
          return;
        }

        if (
          /\bfetch\(/.test(cleanLine) ||
          /\bXMLHttpRequest\b/.test(cleanLine) ||
          /\bWebSocket\b/.test(cleanLine) ||
          /\baxios\b/.test(cleanLine) ||
          /['"`]http:\/\/(?!localhost)/.test(cleanLine) ||
          /['"`]https:\/\/(?!localhost)/.test(cleanLine)
        ) {
          errors.push({
            featureId: 'global-network-check',
            rule: 'zero-network',
            message: `Prohibited network call in ${path.relative(process.cwd(), fullPath)}:${lineNo + 1}: ${line.trim()}`,
          });
        }
      });
    }
  }
}

scanZeroNetwork(srcDir);

// 3. Output results
console.log('═══════════════════════════════════════════════════════════');
if (errors.length === 0) {
  console.log('✨ [AeroValidator] 100% PASS! All features buoyant, glossy & compliant! 🌊🐬');
  console.log('═══════════════════════════════════════════════════════════\n');
  process.exit(0);
} else {
  console.error(`🚨 [AeroValidator] Found ${errors.length} quality gate violations:`);
  errors.forEach((err, idx) => {
    console.error(`  ${idx + 1}. [${err.featureId}] (${err.rule}): ${err.message}`);
  });
  console.error('═══════════════════════════════════════════════════════════\n');
  process.exit(1);
}
