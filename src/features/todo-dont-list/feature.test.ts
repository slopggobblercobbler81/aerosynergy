import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('todo-dont-list smoke & interaction tests', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('todo-dont-list');
    expect(manifest.category).toBe('productivity');
    expect(manifest.title).toContain("To-Don't List");
    expect(manifest.description).toMatch(/🚫|💙|✨/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('todo-dont-list');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText(/To-Don't Fortress/i)).toBeDefined();
    expect(screen.getByText(/Forbid 🚫/i)).toBeDefined();
  });

  it('clicks avoidance button wobbling and logging victory with sound', async () => {
    vi.useFakeTimers();
    const soundSpy = vi.fn();
    const props = stubProps('todo-dont-list', { sound: soundSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const avoidButtons = screen.getAllByText('I Avoided This! 🚫');
    expect(avoidButtons.length).toBeGreaterThan(0);

    fireEvent.click(avoidButtons[0]);

    // Initial click triggers droplet
    expect(soundSpy).toHaveBeenCalledWith('droplet');

    // Advance timer past wobble
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // Then triggers chime
    expect(soundSpy).toHaveBeenCalledWith('chime');
    expect(screen.getByText(/Overwhelming Support & Affirmation 💙/i)).toBeDefined();

    vi.useRealTimers();
  });
});
