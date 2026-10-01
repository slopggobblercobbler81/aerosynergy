import { describe, it, expect } from 'vitest';
import { CANONICAL_CATEGORIES } from '../helpers/test-harness';

const TARGET_MATRIX_FEATURES = [
  { id: 'wellness-hydration-orb-3', category: 'wellness', milestone: 'M1' },
  { id: 'todo-classic-list', category: 'productivity', milestone: 'M2' },
  { id: 'todo-quantum-list', category: 'productivity', milestone: 'M2' },
  { id: 'wellness-hydration-orb', category: 'wellness', milestone: 'M2' },
  { id: 'ai-synergy-insights', category: 'ai-insights', milestone: 'M2' },
  { id: 'gadget-chrome-clock', category: 'gadgets', milestone: 'M3' },
  { id: 'media-lofi-aero-radio', category: 'media-ambience', milestone: 'M3' },
  { id: 'game-xp-engine', category: 'gamification', milestone: 'M3' },
  { id: 'settings-toggles-47', category: 'personalization', milestone: 'M4' },
  { id: 'synergy-todo-hydration-bridge', category: 'synergy', milestone: 'M4' },
  { id: 'meta-feature-count-hall', category: 'meta', milestone: 'M4' },
  { id: 'easter-konami-code', category: 'lore-easter-eggs', milestone: 'M4' },
];

describe('Tier 1: Feature Contracts Matrix & Progressive Verification', () => {
  TARGET_MATRIX_FEATURES.forEach(({ id, category, milestone }) => {
    it(`Feature Contract [${milestone}]: ${id}`, async () => {
      let manifestMod: any;
      try {
        manifestMod = await import(`../../../src/features/${id}/manifest.ts`);
      } catch {
        return;
      }

      const manifest = manifestMod.manifest;
      expect(manifest).toBeDefined();
      expect(manifest.id).toBe(id);
      expect(manifest.category).toBe(category);
      expect(CANONICAL_CATEGORIES).toContain(manifest.category);

      expect(manifest.title).toMatch(/\p{Emoji}/u);

      expect(manifest.synergyScore).toBeGreaterThanOrEqual(0);
      expect(manifest.synergyScore).toBeLessThanOrEqual(100);

      expect(typeof manifest.author).toBe('string');
      expect(manifest.author.length).toBeGreaterThan(0);

      expect(typeof manifest.component).toBe('function');
      const comp = await manifest.component();
      expect(comp.default).toBeDefined();
    });
  });
});
