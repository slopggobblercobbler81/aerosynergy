import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('todo-zen-list smoke & interaction tests', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('todo-zen-list');
    expect(manifest.category).toBe('productivity');
    expect(manifest.title).toContain('Zen To-Do List');
    expect(manifest.description).toMatch(/🧘|🌅|✨/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('todo-zen-list');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText(/Horizon Reflection Sanctuary/i)).toBeDefined();
    expect(screen.getByText(/Fulfill Task ✨/i)).toBeDefined();
    expect(screen.getByText(/Breathe 🫧/i)).toBeDefined();
  });

  it('fulfills task with chime sound and awards achievement', () => {
    const soundSpy = vi.fn();
    const awardSpy = vi.fn();
    const props = stubProps('todo-zen-list', { sound: soundSpy, award: awardSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const fulfillButton = screen.getByText('Fulfill Task ✨');
    fireEvent.click(fulfillButton);

    expect(soundSpy).toHaveBeenCalledWith('chime');
    expect(awardSpy).toHaveBeenCalledWith('todo-zen-list:mindful-moment');
  });

  it('breathes to rotate intuitive task with droplet sound', () => {
    const soundSpy = vi.fn();
    const props = stubProps('todo-zen-list', { sound: soundSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const breatheButton = screen.getByText('Breathe 🫧');
    fireEvent.click(breatheButton);

    expect(soundSpy).toHaveBeenCalledWith('droplet');
  });
});
