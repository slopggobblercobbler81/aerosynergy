import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('ai-motivational-quotes smoke test', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('ai-motivational-quotes');
    expect(manifest.category).toBe('ai-insights');
    expect(manifest.title).toContain('Motivational Quote Generator');
    expect(manifest.description).toMatch(/[🌊💧🫧🌟✨]/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('ai-motivational-quotes');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText('Generate New Affirmation ✨')).toBeDefined();
    expect(screen.getByText(/Proudly in Beta Forever/)).toBeDefined();
    expect(screen.getByText(/procedural mad-libs optimism/)).toBeDefined();
  });

  it('generates new affirmation and copies to clipboard with awards', () => {
    const soundSpy = vi.fn();
    const awardSpy = vi.fn();
    const props = stubProps('ai-motivational-quotes', { sound: soundSpy, award: awardSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const generateBtn = screen.getByText('Generate New Affirmation ✨');
    fireEvent.click(generateBtn);
    expect(soundSpy).toHaveBeenCalledWith('bloop');

    const copyBtn = screen.getByText('Copy Quote 📋');
    fireEvent.click(copyBtn);
    expect(soundSpy).toHaveBeenCalledWith('sparkle');
    expect(awardSpy).toHaveBeenCalledWith('ai-motivational-quotes:sparkle-shared');
    expect(screen.getByText('Copied! 🌟')).toBeDefined();
  });
});
