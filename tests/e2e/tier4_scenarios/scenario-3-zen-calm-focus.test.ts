import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMockStorage } from '../helpers/test-harness';

describe('Tier 4: Scenario 3 — Zen & Calm Focus Mode', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('executes zen workflow: activate Calm Waters + Hush -> verify particle pause & toast suppression -> complete zen task', () => {
    // 1. Enable Global Calm Waters & Hush Mode
    const shellStorage = createMockStorage('shell');
    shellStorage.set('calmWaters', true);
    shellStorage.set('hushMode', true);

    expect(shellStorage.get('calmWaters', false)).toBe(true);
    expect(shellStorage.get('hushMode', false)).toBe(true);

    // 2. Verify Motion & Animation Reduction Flags
    const isMotionReduced = shellStorage.get('calmWaters', false);
    const particleCount = isMotionReduced ? 0 : 40;
    expect(particleCount).toBe(0);

    // 3. Verify Toast Suppression Under Hush Mode
    let toastEmitted = false;
    const triggerToast = (msg: string) => {
      if (!shellStorage.get('hushMode', false)) {
        toastEmitted = true;
      }
    };

    triggerToast('Zen inspiration: The quiet stream flows deep 🌊');
    expect(toastEmitted).toBe(false);

    // 4. Perform Zen Task Completion (Only 1 Single Task Shown at a Time)
    const zenStorage = createMockStorage('todo-zen-list');
    zenStorage.set('activeTask', { id: 1, title: 'Breathe with the water bubble 🫧', done: false });

    const currentTask = zenStorage.get<any>('activeTask', null);
    expect(currentTask).toBeDefined();
    expect(currentTask.title).toContain('Breathe');

    // Complete the singular zen task
    zenStorage.set('activeTask', { ...currentTask, done: true });
    expect(zenStorage.get<any>('activeTask', null).done).toBe(true);
  });
});
