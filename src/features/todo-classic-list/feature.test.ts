import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('todo-classic-list smoke & interaction tests', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('todo-classic-list');
    expect(manifest.category).toBe('productivity');
    expect(manifest.title).toContain('Classic To-Do List');
    expect(manifest.description).toMatch(/🐬|✨|🌊|☑️/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('todo-classic-list');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText(/Classic Task Matrix/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Type a new task/i)).toBeDefined();
  });

  it('adds, toggles, and deletes a task with sound and storage persistence', () => {
    const soundSpy = vi.fn();
    const awardSpy = vi.fn();
    const props = stubProps('todo-classic-list', { sound: soundSpy, award: awardSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const input = screen.getByPlaceholderText(/Type a new task/i);
    const addButton = screen.getByText('Add ➕');

    // Add a new task
    fireEvent.change(input, { target: { value: 'Polish iridescent bubble gloss 🫧' } });
    fireEvent.click(addButton);

    expect(soundSpy).toHaveBeenCalledWith('bloop');
    expect(screen.getByText('Polish iridescent bubble gloss 🫧')).toBeDefined();

    // Toggle the new task
    const taskItem = screen.getByText('Polish iridescent bubble gloss 🫧');
    fireEvent.click(taskItem);

    expect(soundSpy).toHaveBeenCalledWith('chime');
    expect(awardSpy).toHaveBeenCalledWith('todo-classic-list:first-done');

    // Delete task
    const deleteButtons = screen.getAllByTitle('Delete task');
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);

    expect(soundSpy).toHaveBeenCalledWith('whoosh');
  });
});
