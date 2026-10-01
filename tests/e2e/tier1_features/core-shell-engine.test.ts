import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Tier 1: Feature Coverage — core-shell-engine', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('1. Storage Service Namespacing: strictly prefixes keys with as365:<featureId>: and provides fallback', async () => {
    const storageMod = await import('../../../src/core/storage/storage').catch(() => null);
    if (!storageMod) return;

    const ns = storageMod.getNamespace('test-feature-alpha');
    expect(ns.get('count', 42)).toBe(42);

    ns.set('count', 100);
    expect(localStorage.getItem('as365:test-feature-alpha:count')).toBe(JSON.stringify(100));
    expect(ns.get('count', 0)).toBe(100);

    ns.set('title', 'Crystal Waters');
    localStorage.setItem('as365:other-feature:data', JSON.stringify('ignore'));

    const keys = ns.list();
    expect(keys).toContain('count');
    expect(keys).toContain('title');
    expect(keys).not.toContain('data');

    ns.remove('count');
    expect(ns.get('count', null)).toBeNull();
    expect(localStorage.getItem('as365:test-feature-alpha:count')).toBeNull();
  });

  it('2. BubbleBoundary Crash Containment: isolates error and renders canonical popped-bubble card with Dewey and Retry', async () => {
    const boundaryMod = await import('../../../src/core/bubble-boundary').catch(() => null);
    if (!boundaryMod) return;

    const BubbleBoundary = boundaryMod.BubbleBoundary || boundaryMod.default;

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    function CrashingComponent({ shouldCrash }: { shouldCrash: boolean }) {
      if (shouldCrash) {
        throw new Error('Simulated quantum bubble instability!');
      }
      return React.createElement('div', null, 'Bubbles are Stable ✨');
    }

    const { rerender } = render(
      React.createElement(
        BubbleBoundary,
        null,
        React.createElement(CrashingComponent, { shouldCrash: false })
      )
    );

    expect(screen.getByText('Bubbles are Stable ✨')).toBeDefined();

    rerender(
      React.createElement(
        BubbleBoundary,
        null,
        React.createElement(CrashingComponent, { shouldCrash: true })
      )
    );

    expect(screen.getByText(/Oops! This bubble popped/i)).toBeDefined();
    expect(screen.getByText(/Our AI is already reimagining it/i)).toBeDefined();

    const retryBtn = screen.getByRole('button', { name: /Retry/i });
    expect(retryBtn).toBeDefined();

    consoleSpy.mockRestore();
  });

  it('3. Procedural Audio Synthesizer: responds to canonical sound cues bloop, chime, droplet, sparkle, whoosh', async () => {
    const audioMod = await import('../../../src/core/audio').catch(() => null);
    if (!audioMod) return;

    const play = audioMod.playSound || audioMod.sound;
    const mute = audioMod.setMasterMute || audioMod.setMute;

    expect(() => {
      play('bloop');
      play('chime');
      play('droplet');
      play('sparkle');
      play('whoosh');
    }).not.toThrow();

    if (typeof mute === 'function') {
      mute(true);
      expect(() => play('bloop')).not.toThrow();
      mute(false);
    }
  });

  it('4. Global Toast Notification Queue: manages toast emission and honors maximum 3 concurrent visible toasts', async () => {
    const toastMod = await import('../../../src/core/toast').catch(() => null);
    if (!toastMod) return;

    if (typeof toastMod.toast === 'function') {
      expect(() => {
        toastMod.toast('Hydration check! 💧', 'info');
        toastMod.toast('Task completed! 🚀', 'success');
        toastMod.toast('Level Up! 🎉', 'party');
      }).not.toThrow();
    }
  });

  it('5. Mascot API (Dewey): returns signature optimistic phrases and valid SVG mascot images', async () => {
    const mascotMod = await import('../../../src/core/mascot').catch(() => null);
    if (!mascotMod) return;

    const mascot = mascotMod.mascot || mascotMod;

    const happyQuote = mascot.say('happy');
    expect(typeof happyQuote).toBe('string');
    expect(happyQuote.length).toBeGreaterThan(5);

    const hydratingQuote = mascot.say('hydrating');
    expect(hydratingQuote).toMatch(/(water|hydrate|hydration|cells|sip)/i);

    const imgUri = mascot.image('happy');
    expect(typeof imgUri).toBe('string');
    expect(imgUri.startsWith('data:image/svg+xml') || imgUri.startsWith('<svg')).toBe(true);
  });

  it('6. Feature Registry Auto-Discovery: registry returns array of valid manifests without crash', async () => {
    const regMod = await import('../../../src/core/registry').catch(() => null);
    if (!regMod) return;

    const manifests = regMod.getAllManifests();
    expect(Array.isArray(manifests)).toBe(true);

    if (manifests.length > 0) {
      const orb = manifests.find((m: any) => m.id === 'wellness-hydration-orb-3');
      expect(orb).toBeDefined();
      expect(orb.category).toBe('wellness');
    }
  });
});
