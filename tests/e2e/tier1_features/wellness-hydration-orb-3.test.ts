import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { createTestFeatureProps } from '../helpers/test-harness';

describe('Tier 1: Feature Coverage — wellness-hydration-orb-3', () => {
  let manifest: any;
  let FeatureComponent: React.ComponentType<any>;

  beforeEach(async () => {
    localStorage.clear();
    const manifestMod = await import('../../../src/features/wellness-hydration-orb-3/manifest');
    manifest = manifestMod.manifest;
    const compMod = await manifest.component();
    FeatureComponent = compMod.default;
  });

  it('1. Manifest Specification Conformance: matches folder name and requirements', () => {
    expect(manifest).toBeDefined();
    expect(manifest.id).toBe('wellness-hydration-orb-3');
    expect(manifest.title).toContain('💧');
    expect(manifest.title).toContain('Hydration Orb Pro Max');
    expect(manifest.category).toBe('wellness');
    expect(manifest.issue).toBe(42);
    expect(manifest.synergyScore).toBeGreaterThanOrEqual(0);
    expect(manifest.synergyScore).toBeLessThanOrEqual(100);
    expect(manifest.redundantWith).toContain('wellness-hydration-orb');
    expect(manifest.redundantWith).toContain('wellness-hydration-orb-2');
  });

  it('2. Declarative Contributions Conformance: contributes settings, onboarding, and achievements', () => {
    expect(manifest.settings).toBeDefined();
    expect(Array.isArray(manifest.settings)).toBe(true);
    const sliderSetting = manifest.settings.find((s: any) => s.type === 'slider');
    expect(sliderSetting).toBeDefined();
    expect(sliderSetting.min).toBeDefined();
    expect(sliderSetting.max).toBeDefined();

    expect(manifest.onboarding).toBeDefined();
    expect(manifest.onboarding.length).toBeLessThanOrEqual(2);
    expect(manifest.onboarding[0].emoji).toBe('💧');

    expect(manifest.achievements).toBeDefined();
    const bigSipAchievement = manifest.achievements.find(
      (a: any) => a.id === 'wellness-hydration-orb-3:big-sip'
    );
    expect(bigSipAchievement).toBeDefined();
    expect(bigSipAchievement.title).toBe('Big Sip Energy');
  });

  it('3. Initial Healthy Render: renders within scoped CSS container with mascot quote and disclaimer', () => {
    const props = createTestFeatureProps('wellness-hydration-orb-3');

    const { container } = render(React.createElement(FeatureComponent, props));

    const rootEl = container.querySelector('.feat-wellness-hydration-orb-3');
    expect(rootEl).not.toBeNull();

    expect(container.querySelectorAll('.orb-item').length).toBe(3);

    expect(props.mascot.say).toHaveBeenCalledWith('hydrating');
    expect(screen.getByText(/Dewey says:/i)).toBeDefined();

    expect(screen.getByText(/Not medical advice, just vibes!/i)).toBeDefined();

    const sipCounter = container.querySelector('.sip-counter');
    expect(sipCounter?.textContent).toBe('0');
  });

  it('4. Interactive Sip Logging: logs sip, triggers droplet sound, success toast, and storage set', async () => {
    const props = createTestFeatureProps('wellness-hydration-orb-3');

    const { container } = render(React.createElement(FeatureComponent, props));

    const button = screen.getByRole('button', { name: /Log a Sip/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(props.mockSound).toHaveBeenCalledWith('droplet');

    expect(props.mockToast).toHaveBeenCalled();
    expect(props.mockToast.mock.calls[0][0]).toContain('sip logged');
    expect(props.mockToast.mock.calls[0][1]).toBe('success');

    const sipCounter = container.querySelector('.sip-counter');
    expect(sipCounter?.textContent).toBe('1');

    expect(props.ns.get('sips', 0)).toBe(1);
  });

  it('5. Achievement Unlocking and Persistence: 5 sips trigger award and persist across re-render', async () => {
    const props = createTestFeatureProps('wellness-hydration-orb-3');
    const { container, unmount } = render(React.createElement(FeatureComponent, props));

    const button = screen.getByRole('button', { name: /Log a Sip/i });

    for (let i = 0; i < 5; i++) {
      await act(async () => {
        fireEvent.click(button);
      });
    }

    expect(props.mockAward).toHaveBeenCalledWith('wellness-hydration-orb-3:big-sip');

    const sipCounter = container.querySelector('.sip-counter');
    expect(sipCounter?.textContent).toBe('5');
    expect(props.ns.get('sips', 0)).toBe(5);

    unmount();

    const props2 = createTestFeatureProps('wellness-hydration-orb-3');
    const { container: container2 } = render(React.createElement(FeatureComponent, props2));
    const sipCounter2 = container2.querySelector('.sip-counter');
    expect(sipCounter2?.textContent).toBe('5');
  });

  it('6. Hush Mode Compliance: suppresses toast when hush is enabled', async () => {
    const props = createTestFeatureProps('wellness-hydration-orb-3', { hush: true });

    render(React.createElement(FeatureComponent, props));

    const button = screen.getByRole('button', { name: /Log a Sip/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(props.mockSound).toHaveBeenCalledWith('droplet');
    expect(props.mockToast).not.toHaveBeenCalled();
  });
});
