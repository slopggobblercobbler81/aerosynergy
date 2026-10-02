import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('ai-productivity-horoscope smoke test', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('ai-productivity-horoscope');
    expect(manifest.category).toBe('ai-insights');
    expect(manifest.title).toContain('Productivity Horoscope');
    expect(manifest.description).toMatch(/[🌊💧🫧🔮✨]/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('ai-productivity-horoscope');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText('Consult the Constellations 🔮')).toBeDefined();
    expect(screen.getByText(/approximately gorgeous/)).toBeDefined();
    expect(screen.getByText(/Astrological productivity guidance/)).toBeDefined();
  });

  it('consults constellations on button click and plays sparkle sound', () => {
    const soundSpy = vi.fn();
    const awardSpy = vi.fn();
    const props = stubProps('ai-productivity-horoscope', { sound: soundSpy, award: awardSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const consultBtn = screen.getByText('Consult the Constellations 🔮');
    fireEvent.click(consultBtn);

    expect(soundSpy).toHaveBeenCalledWith('sparkle');
    expect(awardSpy).toHaveBeenCalledWith('ai-productivity-horoscope:stars-aligned');
  });
});
