import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('wellness-breathing-bubble smoke test', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('wellness-breathing-bubble');
    expect(manifest.category).toBe('wellness');
    expect(manifest.title).toContain('Breathing Bubble');
    expect(manifest.description).toMatch(/[🌊💧🫧✨]/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('wellness-breathing-bubble');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText('Start Breathing 🌬️')).toBeDefined();
    expect(screen.getByText(/Synergy Rowing Club/)).toBeDefined();
    expect(screen.getByText(/Not medical advice, just vibes!/)).toBeDefined();
  });

  it('toggles session on button click and calls sound', () => {
    const soundSpy = vi.fn();
    const props = stubProps('wellness-breathing-bubble', { sound: soundSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const toggleBtn = screen.getByText('Start Breathing 🌬️');
    fireEvent.click(toggleBtn);

    expect(soundSpy).toHaveBeenCalledWith('droplet');
    expect(screen.getByText('Pause ⏸️')).toBeDefined();
  });
});
