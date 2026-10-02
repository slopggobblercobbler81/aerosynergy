import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('todo-quantum-list smoke & interaction tests', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('todo-quantum-list');
    expect(manifest.category).toBe('productivity');
    expect(manifest.title).toContain('Quantum To-Do List');
    expect(manifest.description).toMatch(/⚛️|🌿|✨/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('todo-quantum-list');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText(/Quantum Wave Matrix/i)).toBeDefined();
    expect(screen.getByText(/Entangle ➕/i)).toBeDefined();
  });

  it('observes quantum task collapsing wave function with sparkle or bloop sound', () => {
    const soundSpy = vi.fn();
    const awardSpy = vi.fn();
    const props = stubProps('todo-quantum-list', { sound: soundSpy, award: awardSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const observeButtons = screen.getAllByText('Observe 👁️');
    expect(observeButtons.length).toBeGreaterThan(0);

    fireEvent.click(observeButtons[0]);

    // Either sparkle or bloop is called
    expect(soundSpy).toHaveBeenCalled();
    const calledWithSound = soundSpy.mock.calls.some(
      (c) => c[0] === 'sparkle' || c[0] === 'bloop'
    );
    expect(calledWithSound).toBe(true);
  });
});
