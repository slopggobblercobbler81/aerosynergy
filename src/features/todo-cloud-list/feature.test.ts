import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('todo-cloud-list smoke & interaction tests', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('todo-cloud-list');
    expect(manifest.category).toBe('productivity');
    expect(manifest.title).toContain('Cloud To-Do List');
    expect(manifest.description).toMatch(/☁️|✨|🌧️/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('todo-cloud-list');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText(/Cumulus Sky Grid/i)).toBeDefined();
    expect(screen.getByText(/Drift ➕/i)).toBeDefined();
  });

  it('toggles tether and completes cloud task with sound', () => {
    const soundSpy = vi.fn();
    const props = stubProps('todo-cloud-list', { sound: soundSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const tetherButtons = screen.getAllByText(/Tether 📌|Anchored ⚓/i);
    expect(tetherButtons.length).toBeGreaterThan(0);

    fireEvent.click(tetherButtons[0]);
    expect(soundSpy).toHaveBeenCalledWith('bloop');

    const taskTitle = screen.getByText('Observe high-altitude cirrus clouds ☁️');
    fireEvent.click(taskTitle);
    expect(soundSpy).toHaveBeenCalledWith('chime');
  });
});
