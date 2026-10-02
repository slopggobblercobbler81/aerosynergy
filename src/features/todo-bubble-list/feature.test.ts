import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('todo-bubble-list smoke & interaction tests', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('todo-bubble-list');
    expect(manifest.category).toBe('productivity');
    expect(manifest.title).toContain('Bubble To-Do List');
    expect(manifest.description).toMatch(/🫧|💧|🌊|✨/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('todo-bubble-list');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText(/Iridescent Bubble Sphere/i)).toBeDefined();
    expect(screen.getByText(/Blow 🫧/i)).toBeDefined();
  });

  it('pops a bubble task, triggering droplet sound and awarding badge', () => {
    const soundSpy = vi.fn();
    const awardSpy = vi.fn();
    const props = stubProps('todo-bubble-list', { sound: soundSpy, award: awardSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const bubbleItem = screen.getByText('Breathe crystal sea air 🌊');
    fireEvent.click(bubbleItem);

    expect(soundSpy).toHaveBeenCalledWith('droplet');
    expect(awardSpy).toHaveBeenCalledWith('todo-bubble-list:first-pop');
  });
});
