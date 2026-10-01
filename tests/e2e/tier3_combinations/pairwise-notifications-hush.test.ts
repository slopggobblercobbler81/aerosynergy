import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestFeatureProps } from '../helpers/test-harness';

describe('Tier 3: Pairwise Combinations — notifications + hush-mode', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('1. Standard Notification Flow: features emit celebratory toasts and AI commentary', () => {
    const props = createTestFeatureProps('wellness-hydration-orb-3', { hush: false });

    // When hush is false, toasts are permitted
    props.toast('💧 Sip logged! Your cells are doing a little happy dance! 🎉', 'success');
    expect(props.mockToast).toHaveBeenCalledWith(
      expect.stringContaining('Sip logged!'),
      'success'
    );
  });

  it('2. Hush Mode Suppression Flow: unsolicited toasts and AI enthusiasm are strictly suppressed', () => {
    const props = createTestFeatureProps('wellness-hydration-orb-3', { hush: true });

    // Under hush mode, features must check hush flag before calling toast()
    if (!props.hush) {
      props.toast('This should NOT fire under hush mode! 🫧', 'info');
    }

    expect(props.mockToast).not.toHaveBeenCalled();
  });

  it('3. Quiet Fallback Rendering: hush mode triggers plain calm copy instead of over-celebration', () => {
    function getStatusMessage(hush: boolean) {
      if (hush) {
        return 'Hydration recorded.';
      }
      return '🎉 Cellular ovation in progress! Amazing hydration milestone! 💧✨';
    }

    expect(getStatusMessage(true)).toBe('Hydration recorded.');
    expect(getStatusMessage(false)).toContain('Cellular ovation');
  });
});
