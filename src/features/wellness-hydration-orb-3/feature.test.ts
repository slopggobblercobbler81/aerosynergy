import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('wellness-hydration-orb-3 smoke test', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('wellness-hydration-orb-3');
    expect(manifest.category).toBe('wellness');
    expect(manifest.title).toContain('Hydration Orb');
    expect(manifest.description).toMatch(/💧|🌊|🫧|✨/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('wellness-hydration-orb-3');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText('Log a Sip 🥤')).toBeDefined();
    expect(screen.getByText('💧 Not medical advice, just vibes!')).toBeDefined();
  });

  it('increments sip count and calls sound on click', () => {
    const soundSpy = vi.fn();
    const awardSpy = vi.fn();
    const props = stubProps('wellness-hydration-orb-3', { sound: soundSpy, award: awardSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const logButton = screen.getByText('Log a Sip 🥤');
    fireEvent.click(logButton);

    expect(soundSpy).toHaveBeenCalledWith('droplet');
    expect(screen.getByText('1')).toBeDefined();
  });
});
