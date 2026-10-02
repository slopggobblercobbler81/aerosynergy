/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Procedural Backgrounds Conformance Test (§7.3, §16)
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   ═══════════════════════════════════════════════════════════════════════════ */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  SkyGradient,
  LightRays,
  AuroraRibbon,
  RollingHills,
  SwimmingFish,
  WaterCaustics,
  FloatingBubbles,
  ProceduralBackground,
} from '../../../src/shell/backgrounds';

describe('Procedural Background Library (§7.3)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders SkyGradient across dawn, day, dusk, and night states', () => {
    const states = ['dawn', 'day', 'dusk', 'night'] as const;
    const { container, rerender } = render(<SkyGradient timeState="dawn" />);
    for (const st of states) {
      rerender(<SkyGradient timeState={st} />);
      const el = container.querySelector('[data-testid="sky-gradient"]');
      expect(el).not.toBeNull();
      if (st === 'night') {
        expect(container.querySelector('svg')).not.toBeNull(); // Stars rendered
      }
    }
  });

  it('renders LightRays and responds to calm prop', () => {
    const { rerender } = render(<LightRays calm={false} />);
    expect(screen.getByTestId('light-rays')).not.toBeNull();

    rerender(<LightRays calm={true} />);
    expect(screen.getByTestId('light-rays')).not.toBeNull();
  });

  it('renders AuroraRibbon with multi-stop chromatic gradient paths', () => {
    const { container } = render(<AuroraRibbon calm={false} />);
    expect(screen.getByTestId('aurora-ribbon')).not.toBeNull();
    expect(container.innerHTML).toContain('auroraGrad1');
  });

  it('renders RollingHills with Bézier paths and ridge highlights', () => {
    const { container } = render(<RollingHills calm={false} />);
    expect(screen.getByTestId('rolling-hills')).not.toBeNull();
    expect(container.innerHTML).toContain('hillFront');
  });

  it('renders SwimmingFish with dolphin and fish SVG silhouettes', () => {
    const { container } = render(<SwimmingFish calm={false} />);
    expect(screen.getByTestId('swimming-fish')).not.toBeNull();
    expect(container.innerHTML).toContain('dolphSwimGrad');
    expect(container.innerHTML).toContain('fishSwimGrad');
  });

  it('renders WaterCaustics overlay with refraction filaments', () => {
    const { container } = render(<WaterCaustics calm={false} />);
    expect(screen.getByTestId('water-caustics')).not.toBeNull();
    expect(container.innerHTML).toContain('causticSpot1');
  });

  it('renders FloatingBubbles canvas safely in active and calm modes', () => {
    const { container: c1 } = render(<FloatingBubbles calm={false} />);
    expect(c1.querySelector('canvas')).not.toBeNull();

    const { container: c2 } = render(<FloatingBubbles calm={true} transparent={true} />);
    expect(c2.querySelector('canvas')).not.toBeNull();
  });

  it('renders ProceduralBackground compositor containing all layers', () => {
    render(<ProceduralBackground calm={false} timeState="day" />);
    expect(screen.getByTestId('procedural-background')).not.toBeNull();
    expect(screen.getByTestId('sky-gradient')).not.toBeNull();
    expect(screen.getByTestId('light-rays')).not.toBeNull();
    expect(screen.getByTestId('aurora-ribbon')).not.toBeNull();
    expect(screen.getByTestId('rolling-hills')).not.toBeNull();
    expect(screen.getByTestId('swimming-fish')).not.toBeNull();
    expect(screen.getByTestId('water-caustics')).not.toBeNull();
  });

  it('attaches and detaches visibilitychange listeners properly', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    const removeSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = render(<LightRays calm={false} />);
    expect(addSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));

    unmount();
    expect(removeSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });
});
