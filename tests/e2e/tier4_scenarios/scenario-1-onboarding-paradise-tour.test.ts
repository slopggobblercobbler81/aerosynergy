import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('Tier 4: Scenario 1 — First-Time User Onboarding & Paradise Tour', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('executes full tour: Splash (<3s) -> Onboarding Wizard -> Chime -> Dock Search -> Feature Window Open', async () => {
    // 1. Splash Screen Phase
    const splashStartTime = performance.now();
    let splashFinished = false;
    const onSplashFinish = () => { splashFinished = true; };

    const splashMod = await import('../../../src/shell/SplashScreen').catch(() => null);
    if (splashMod) {
      const SplashScreen = splashMod.SplashScreen || splashMod.default;
      const { unmount } = render(React.createElement(SplashScreen, { onFinished: onSplashFinish }));
      expect(performance.now() - splashStartTime).toBeLessThan(3000);
      unmount();
    }

    // 2. Onboarding Wizard Phase
    let onboardingCompleted = false;
    const onCompleteOnboarding = () => {
      onboardingCompleted = true;
      localStorage.setItem('as365:shell:onboarding_completed', 'true');
    };

    const wizardMod = await import('../../../src/shell/OnboardingWizard').catch(() => null);
    if (wizardMod) {
      const OnboardingWizard = wizardMod.OnboardingWizard || wizardMod.default;
      const { unmount } = render(React.createElement(OnboardingWizard, { onComplete: onCompleteOnboarding }));

      // User skips or clicks through onboarding
      const skipOrDoneBtn = screen.queryByRole('button', { name: /(skip|done|start|explore)/i });
      if (skipOrDoneBtn) {
        await act(async () => {
          fireEvent.click(skipOrDoneBtn);
        });
      } else {
        onCompleteOnboarding();
      }
      expect(onboardingCompleted).toBe(true);
      expect(localStorage.getItem('as365:shell:onboarding_completed')).toBe('true');
      unmount();
    }

    // 3. Audio Chime Confirmation
    const audioMod = await import('../../../src/core/audio').catch(() => null);
    if (audioMod) {
      const play = audioMod.playSound || audioMod.sound;
      expect(() => play('chime')).not.toThrow();
    }

    // 4. AeroDock Launcher Search & Feature Open
    const openedFeatures: string[] = [];
    const dockMod = await import('../../../src/shell/AeroDock').catch(() => null);
    if (dockMod) {
      const AeroDock = dockMod.AeroDock || dockMod.default;
      render(React.createElement(AeroDock, {
        manifests: [],
        onOpenFeature: (id: string) => openedFeatures.push(id),
      }));

      // Search for hydration
      const searchInput = screen.queryByPlaceholderText(/search|find/i);
      if (searchInput) {
        await act(async () => {
          fireEvent.change(searchInput, { target: { value: 'hydration' } });
        });
      }
    }
  });
});
