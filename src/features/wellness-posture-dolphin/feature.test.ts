import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { manifest } from './manifest';
import Feature from './Feature';
import { BubbleBoundary } from '../../core/bubble-boundary';
import { stubProps } from '../../core/test-utils';

describe('wellness-posture-dolphin smoke test', () => {
  it('manifest conforms to schema', () => {
    expect(manifest.id).toBe('wellness-posture-dolphin');
    expect(manifest.category).toBe('wellness');
    expect(manifest.title).toContain('Posture Dolphin');
    expect(manifest.description).toMatch(/[🌊💧🫧🐬✨]/);
  });

  it('renders healthy inside BubbleBoundary with stubProps', () => {
    const props = stubProps('wellness-posture-dolphin');
    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    expect(screen.getByText("I'm Upright! 🌟")).toBeDefined();
    expect(screen.getByText('Uncurl your shell, magnificent friend! 🐬')).toBeDefined();
  });

  it('opens overly supportive modal and awards achievement on confirm', () => {
    const soundSpy = vi.fn();
    const awardSpy = vi.fn();
    const props = stubProps('wellness-posture-dolphin', { sound: soundSpy, award: awardSpy });

    render(
      React.createElement(
        BubbleBoundary,
        { featureId: manifest.id },
        React.createElement(Feature, props)
      )
    );

    const uprightBtn = screen.getByText("I'm Upright! 🌟");
    fireEvent.click(uprightBtn);

    expect(soundSpy).toHaveBeenCalledWith('sparkle');
    expect(screen.getByText(/UNBELIEVABLE POSTURE EXCELLENCE/)).toBeDefined();

    const confirmBtn = screen.getByText(/Thank You, Dolphin!/);
    fireEvent.click(confirmBtn);

    expect(awardSpy).toHaveBeenCalledWith('wellness-posture-dolphin:spine-aligned');
    expect(screen.getByText(/Alignment checks completed:/)).toBeDefined();
  });
});
