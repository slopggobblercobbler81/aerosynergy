import { describe, it, expect, beforeEach } from 'vitest';
import { createMockStorage } from '../helpers/test-harness';

describe('Tier 3: Pairwise Combinations — storage-persistence-across-features', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('1. Namespaced Key Isolation: distinct features using identical key names remain strictly isolated', () => {
    const nsA = createMockStorage('todo-classic-list');
    const nsB = createMockStorage('wellness-hydration-orb-3');

    nsA.set('items', [{ id: 1, text: 'Water the focus meadow 🌿' }]);
    nsB.set('items', ['orb-1', 'orb-2', 'orb-3']);

    // Direct check of namespaced prefixes in localStorage
    expect(localStorage.getItem('as365:todo-classic-list:items')).toContain('Water the focus meadow');
    expect(localStorage.getItem('as365:wellness-hydration-orb-3:items')).toContain('orb-3');

    // Cross-retrieval verification
    expect(nsA.get('items', [])).toHaveLength(1);
    expect(nsB.get('items', [])).toHaveLength(3);
  });

  it('2. Reload State Recovery Simulation: state survives unmount and re-initialization', () => {
    const featureId = 'wellness-hydration-orb-3';
    const nsInitial = createMockStorage(featureId);

    nsInitial.set('sips', 12);
    nsInitial.set('favoriteTone', 'enthusiastic');
    nsInitial.set('lastTimestamp', 1770000000);

    // Simulate complete memory wipe / browser refresh
    const nsReloaded = createMockStorage(featureId);

    expect(nsReloaded.get('sips', 0)).toBe(12);
    expect(nsReloaded.get('favoriteTone', '')).toBe('enthusiastic');
    expect(nsReloaded.get('lastTimestamp', 0)).toBe(1770000000);
  });

  it('3. Namespace Key Discovery: list() cleanly isolates subkeys for each feature', () => {
    const nsTodo = createMockStorage('todo-classic-list');
    const nsWellness = createMockStorage('wellness-breathing-bubble');

    nsTodo.set('task_1', 'Meditate 🧘');
    nsTodo.set('task_2', 'Hydrate 💧');
    nsWellness.set('breath_cycle', 4);

    expect(nsTodo.list().sort()).toEqual(['task_1', 'task_2']);
    expect(nsWellness.list()).toEqual(['breath_cycle']);
  });
});
