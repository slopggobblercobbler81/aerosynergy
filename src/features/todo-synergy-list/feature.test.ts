import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('todo-synergy-list smoke & interaction tests', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('todo-synergy-list');
    expect(manifest.category).toBe('productivity');
    expect(manifest.title).toContain('Synergy To-Do List');
    expect(manifest.description).toMatch(/⚡|🎉|✨/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('todo-synergy-list');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText(/Synergy To-Do List: Dynamic Resonance Matrix/i)).toBeDefined();
    expect(screen.getByText(/Pair ⚡/i)).toBeDefined();
  });

  it('cuts ceremonial ribbon with sparkle sound and awards achievement', () => {
    const soundSpy = vi.fn();
    const awardSpy = vi.fn();
    const props = stubProps('todo-synergy-list', { sound: soundSpy, award: awardSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const cutButton = screen.getByText('Cut Ribbon ✂️');
    fireEvent.click(cutButton);

    expect(soundSpy).toHaveBeenCalledWith('sparkle');
    expect(awardSpy).toHaveBeenCalledWith('todo-synergy-list:ceremonial-cut');
  });

  it('completing complementary pair triggers party toast and chime sound', () => {
    const soundSpy = vi.fn();
    const toastSpy = vi.fn();
    const props = stubProps('todo-synergy-list', { sound: soundSpy, toast: toastSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const taskA = screen.getByText('Draft high-velocity keynote slides 📊');
    const taskB = screen.getByText('Hydrate with alpine electrolyte water 💧');

    fireEvent.click(taskA);
    fireEvent.click(taskB);

    expect(soundSpy).toHaveBeenCalledWith('chime');
    expect(toastSpy).toHaveBeenCalledWith(
      expect.stringContaining('CASCADE SYNERGY!'),
      'party'
    );
  });
});
