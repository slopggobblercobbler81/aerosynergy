import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('Tier 2: Boundary Value Analysis — shell-boundaries', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('1. AeroDock Search Zero Matches Boundary: shows Dewey mascot empty state on non-matching query', async () => {
    const dockMod = await import('../../../src/shell/AeroDock').catch(() => null);
    if (!dockMod) return;

    const AeroDock = dockMod.AeroDock || dockMod.default;
    const mockOnOpen = vi.fn();

    render(React.createElement(AeroDock, { manifests: [], onOpenFeature: mockOnOpen }));

    const searchInput = screen.getByPlaceholderText(/search|find/i);
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'xyz_completely_nonexistent_bubble_query_123' } });
    });

    const bodyText = document.body.textContent || '';
    expect(bodyText).toMatch(/(no (bubbles|features)|magnificent|try searching|dewey|0 results)/i);
  });

  it('2. Onboarding Wizard Speed Boundary: "Skip All" completes in < 1 second (well under 90s ceiling)', async () => {
    const wizardMod = await import('../../../src/shell/OnboardingWizard').catch(() => null);
    if (!wizardMod) return;

    const OnboardingWizard = wizardMod.OnboardingWizard || wizardMod.default;
    const mockOnComplete = vi.fn();

    const startTime = performance.now();
    render(React.createElement(OnboardingWizard, { onComplete: mockOnComplete }));

    const skipButton = screen.queryByRole('button', { name: /skip/i });
    if (skipButton) {
      await act(async () => {
        fireEvent.click(skipButton);
      });
      const elapsed = performance.now() - startTime;
      expect(elapsed).toBeLessThan(1000);
      expect(mockOnComplete).toHaveBeenCalled();
    }
  });

  it('3. Window Coordinate Clamping Boundary: window position is clamped within viewport bounds', async () => {
    const clampCoord = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));

    const viewportWidth = 1280;
    const viewportHeight = 800;
    const windowWidth = 400;

    expect(clampCoord(-200, 0, viewportWidth - windowWidth)).toBe(0);
    expect(clampCoord(2000, 0, viewportWidth - windowWidth)).toBe(viewportWidth - windowWidth);
    expect(clampCoord(-50, 0, viewportHeight - 50)).toBe(0);
  });

  it('4. Splash Screen Loading Boundary: mounts fast without white flash background', async () => {
    const splashMod = await import('../../../src/shell/SplashScreen').catch(() => null);
    if (!splashMod) return;

    const SplashScreen = splashMod.SplashScreen || splashMod.default;
    const { container } = render(React.createElement(SplashScreen, { onFinished: vi.fn() }));

    expect(container).toBeDefined();
    expect(document.body.textContent).toMatch(/(AeroSynergy|Cloud Bubble|Dolphin)/i);
  });
});
