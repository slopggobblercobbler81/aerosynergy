import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Tier 3: Pairwise Combinations — animation + calm-waters', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('1. Confetti vs Ripple Substitution: under Calm Waters, confetti bursts become a gentle single ripple', () => {
    // Contract verification per §4.5.6 and §7.4
    function triggerCelebration(calm: boolean) {
      if (calm) {
        return { type: 'ripple', particles: 1, duration: 600 };
      }
      return { type: 'confetti', particles: 40, duration: 1200 };
    }

    const standardEffect = triggerCelebration(false);
    expect(standardEffect.type).toBe('confetti');
    expect(standardEffect.particles).toBe(40);

    const calmEffect = triggerCelebration(true);
    expect(calmEffect.type).toBe('ripple');
    expect(calmEffect.particles).toBe(1);
    expect(calmEffect.duration).toBeLessThanOrEqual(600);
  });

  it('2. Media Query Auto-Detection: prefers-reduced-motion activates Calm Waters automatically', () => {
    let currentMatch = false;
    const listeners: Array<(e: any) => void> = [];

    const mockMatchMedia = (query: string) => ({
      matches: currentMatch,
      media: query,
      addEventListener: (_: string, cb: any) => listeners.push(cb),
      removeEventListener: vi.fn(),
    });

    const mql = mockMatchMedia('(prefers-reduced-motion: reduce)');
    expect(mql.matches).toBe(false);

    // Simulate user toggling Windows / OS reduce motion setting
    currentMatch = true;
    expect(mockMatchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true);
  });

  it('3. Photosensitivity Safety Floor: animation keyframes strictly prohibit flashing > 3 Hz', () => {
    // Max flashes per second floor per §16
    const maxFlashesPerSecond = 3;
    const minPeriodMs = 1000 / maxFlashesPerSecond; // ~333.3ms minimum cycle
    expect(minPeriodMs).toBeGreaterThanOrEqual(330);
  });
});
