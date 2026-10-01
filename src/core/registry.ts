// Dynamic Feature Registry per §4.2.2, §5.3
import { FeatureManifest, FeatureCategory } from './types';
import { registerAchievements } from './achievements';
import { recordPoppedBubble } from './diagnostics';

// Dynamic feature discovery via Vite glob import
const manifestModules = (import.meta as any).glob(
  '/src/features/*/manifest.ts',
  { eager: true }
) as Record<string, { manifest: FeatureManifest }>;

let cachedManifests: FeatureManifest[] | null = null;

export function getAllManifests(): FeatureManifest[] {
  if (cachedManifests) {
    return cachedManifests;
  }

  const list: FeatureManifest[] = [];

  for (const [path, mod] of Object.entries(manifestModules)) {
    try {
      if (mod && mod.manifest) {
        list.push(mod.manifest);
        // Automatically register any declarative achievements
        if (mod.manifest.achievements && mod.manifest.achievements.length > 0) {
          registerAchievements(mod.manifest.achievements);
        }
      } else {
        console.warn(`[Registry] Manifest at ${path} has no 'manifest' export.`);
      }
    } catch (err: any) {
      console.error(`[Registry] Failed to process manifest at ${path}:`, err);
      recordPoppedBubble(path, err);
    }
  }

  cachedManifests = list;
  return cachedManifests;
}

export function getManifestById(id: string): FeatureManifest | undefined {
  return getAllManifests().find((m) => m.id === id);
}

export function getManifestsByCategory(category: FeatureCategory): FeatureManifest[] {
  return getAllManifests().filter((m) => m.category === category);
}

export function getCategories(): FeatureCategory[] {
  return [
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
  ];
}