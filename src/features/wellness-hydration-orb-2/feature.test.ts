import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('wellness-hydration-orb-2 smoke test', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('wellness-hydration-orb-2');
    expect(manifest.category).toBe('wellness');
    expect(manifest.redundantWith).toContain('wellness-hydration-orb');
    expect(manifest.title).toContain('Hydration Orb 2');
    expect(manifest.description).toMatch(/[🌊💧🫧✨]/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('wellness-hydration-orb-2');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText('Log Primary Sip 🥤')).toBeDefined();
    expect(screen.getByText('Log Reserve Sip 🌊')).toBeDefined();
    expect(screen.getByText(/Not medical advice, just double the vibes!/)).toBeDefined();
  });

  it('interactively increments primary and reserve chambers', () => {
    const soundSpy = vi.fn();
    const props = stubProps('wellness-hydration-orb-2', { sound: soundSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const primaryBtn = screen.getByText('Log Primary Sip 🥤');
    const reserveBtn = screen.getByText('Log Reserve Sip 🌊');

    fireEvent.click(primaryBtn);
    expect(soundSpy).toHaveBeenCalledWith('droplet');

    fireEvent.click(reserveBtn);
    expect(soundSpy).toHaveBeenCalledWith('chime');

    expect(screen.getByText(/Total Hydration Sips:/)).toBeDefined();
  });
});
