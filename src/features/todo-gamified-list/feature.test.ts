import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('todo-gamified-list smoke & interaction tests', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('todo-gamified-list');
    expect(manifest.category).toBe('productivity');
    expect(manifest.title).toContain('Quest To-Do List');
    expect(manifest.description).toMatch(/🎮|🚣|✨/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('todo-gamified-list');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText(/Quest Guild Log/i)).toBeDefined();
    expect(screen.getByText(/Embark ⚔️/i)).toBeDefined();
    expect(screen.getAllByText(/🚣/i).length).toBeGreaterThan(0);
  });

  it('claims a quest, granting +25 XP and playing chime sound', () => {
    const soundSpy = vi.fn();
    const props = stubProps('todo-gamified-list', { sound: soundSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const conquerButtons = screen.getAllByText('Conquer ⚔️');
    expect(conquerButtons.length).toBeGreaterThan(0);

    fireEvent.click(conquerButtons[0]);

    expect(soundSpy).toHaveBeenCalledWith('chime');
    expect(screen.getByText(/Total XP: 25/i)).toBeDefined();
  });
});
