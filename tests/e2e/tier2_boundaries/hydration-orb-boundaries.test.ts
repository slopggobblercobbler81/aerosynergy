import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { createTestFeatureProps } from '../helpers/test-harness';

describe('Tier 2: Boundary Value Analysis — hydration-orb-boundaries', () => {
  let FeatureComponent: React.ComponentType<any>;

  beforeEach(async () => {
    localStorage.clear();
    const manifestMod = await import('../../../src/features/wellness-hydration-orb-3/manifest');
    const compMod = await manifestMod.manifest.component();
    FeatureComponent = compMod.default;
  });

  it('1. Zero Sips Boundary: clean initial state without NaN or formatting errors', () => {
    const props = createTestFeatureProps('wellness-hydration-orb-3');
    const { container } = render(React.createElement(FeatureComponent, props));

    const countEl = container.querySelector('.sip-counter');
    expect(countEl?.textContent).toBe('0');
  });

  it('2. Extreme Sips Boundary: handles 10,000+ sips gracefully in UI and storage', () => {
    localStorage.setItem('as365:wellness-hydration-orb-3:sips', JSON.stringify(10000));

    const props = createTestFeatureProps('wellness-hydration-orb-3');
    const { container } = render(React.createElement(FeatureComponent, props));

    const countEl = container.querySelector('.sip-counter');
    expect(countEl?.textContent).toBe('10000');
  });

  it('3. Rapid Burst Clicks Stress Boundary: 10 rapid clicks accumulate accurately', async () => {
    const props = createTestFeatureProps('wellness-hydration-orb-3');
    const { container } = render(React.createElement(FeatureComponent, props));

    const button = screen.getByRole('button', { name: /Log a Sip/i });

    for (let i = 0; i < 10; i++) {
      await act(async () => {
        fireEvent.click(button);
      });
    }

    const countEl = container.querySelector('.sip-counter');
    expect(countEl?.textContent).toBe('10');
    expect(props.mockSound).toHaveBeenCalledTimes(10);
  });

  it('4. Calm Waters Boundary: honors calm prop without triggering motion or bouncy effects', () => {
    const props = createTestFeatureProps('wellness-hydration-orb-3', { calm: true });
    const { container } = render(React.createElement(FeatureComponent, props));

    const rootEl = container.querySelector('.feat-wellness-hydration-orb-3');
    expect(rootEl?.classList.contains('calm-mode')).toBe(true);
  });

  it('5. Reset Boundary: reset button resets sips to 0 and sounds bloop', async () => {
    localStorage.setItem('as365:wellness-hydration-orb-3:sips', JSON.stringify(8));
    const props = createTestFeatureProps('wellness-hydration-orb-3');
    const { container } = render(React.createElement(FeatureComponent, props));

    const resetBtn = screen.getByRole('button', { name: /Reset/i });
    await act(async () => {
      fireEvent.click(resetBtn);
    });

    const countEl = container.querySelector('.sip-counter');
    expect(countEl?.textContent).toBe('0');
    expect(props.mockSound).toHaveBeenCalledWith('bloop');
    expect(props.ns.get('sips', 99)).toBe(0);
  });
});
