import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('ai-synergy-insights smoke test', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('ai-synergy-insights');
    expect(manifest.category).toBe('ai-insights');
    expect(manifest.icon).toBe('💠');
    expect(manifest.title).toContain('AI Synergy Insights');
    expect(manifest.description).toMatch(/[🌊💧🫧✨💠]/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('ai-synergy-insights');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText('Recalculate Synergy 🔄')).toBeDefined();
    expect(screen.getByText(/100% Offline Enthusiasm Matrix/)).toBeDefined();
    expect(screen.getByText(/All "intelligence" is locally generated/)).toBeDefined();
  });

  it('recalculates on button click and plays sound', () => {
    const soundSpy = vi.fn();
    const props = stubProps('ai-synergy-insights', { sound: soundSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const recalcBtn = screen.getByText('Recalculate Synergy 🔄');
    fireEvent.click(recalcBtn);

    expect(soundSpy).toHaveBeenCalledWith('sparkle');
  });

  it('renders quiet affirmations in hush mode', () => {
    const props = stubProps('ai-synergy-insights', { hush: true });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText(/The quiet tide gently grounds your work/)).toBeDefined();
  });
});
