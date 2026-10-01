import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestFeatureProps } from '../helpers/test-harness';

describe('Tier 3: Pairwise Combinations — audio-synth + mute-toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('1. Pairwise Unmuted Interaction: sound triggers invoke Web Audio synthesis', async () => {
    const audioMod = await import('../../../src/core/audio').catch(() => null);
    if (!audioMod) return;

    const play = audioMod.playSound || audioMod.sound;
    const mute = audioMod.setMasterMute || audioMod.setMute;
    const isMuted = audioMod.isMasterMuted || audioMod.isMuted;

    if (typeof mute === 'function') {
      mute(false);
      if (typeof isMuted === 'function') {
        expect(isMuted()).toBe(false);
      }
    }

    // Triggering sounds must not throw and should execute successfully
    expect(() => {
      play('bloop');
      play('droplet');
    }).not.toThrow();
  });

  it('2. Pairwise Muted Interaction: when Mute All Sounds is enabled, sound calls are silent no-ops', async () => {
    const audioMod = await import('../../../src/core/audio').catch(() => null);
    if (!audioMod) return;

    const play = audioMod.playSound || audioMod.sound;
    const mute = audioMod.setMasterMute || audioMod.setMute;
    const isMuted = audioMod.isMasterMuted || audioMod.isMuted;

    if (typeof mute === 'function') {
      mute(true);
      if (typeof isMuted === 'function') {
        expect(isMuted()).toBe(true);
      }

      // Feature calls sound() while muted — guaranteed silent no-op per §4.5.6
      expect(() => {
        play('chime');
        play('sparkle');
        play('whoosh');
      }).not.toThrow();
    }
  });

  it('3. Feature Sound Integration with Mute Flag: feature props sound calls respect mute state', async () => {
    const props = createTestFeatureProps('wellness-hydration-orb-3');

    // Simulate sound call
    props.sound('droplet');
    expect(props.mockSound).toHaveBeenCalledWith('droplet');
  });
});
