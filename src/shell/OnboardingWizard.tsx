import React, { useState } from 'react';
import { DeweyIcon } from '../styles/icons';
import { playSound } from '../core/audio';

interface OnboardingWizardProps {
  onComplete: () => void;
}

const STEPS = [
  {
    title: 'Welcome to AeroSynergy! 🌊',
    emoji: '💧',
    body: "Hi there! I'm Dewey the Droplet! I'm 94% water and 100% sure you are going to love this crystal-clear workspace.",
  },
  {
    title: 'The Aero Dock Launcher 🫧',
    emoji: '🔍',
    body: "Explore over 100+ glossy, genuinely working features. Press '/' anytime to search, or hit 'Surprise Me 🎲' for a random burst of joy!",
  },
  {
    title: 'Your Productivity Lagoon 🌅',
    emoji: '✨',
    body: 'Draggable glass windows, synthetic ocean ambience, and zero network calls. You are fully empowered to shine!',
  },
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    playSound('bloop');
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    playSound('chime');
    try {
      localStorage.setItem('as365:shell:onboarding_completed', 'true');
    } catch {}
    onComplete();
  };

  const step = STEPS[currentStep];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 42, 67, 0.45)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '440px',
          padding: '32px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 16px 48px rgba(11, 79, 138, 0.4)',
        }}
      >
        <div style={{ marginBottom: '14px' }}>
          <DeweyIcon size={76} mood="happy" />
        </div>

        <h2
          style={{
            margin: '0 0 10px 0',
            color: 'var(--sky-deep)',
            fontSize: '20px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {step.title}
        </h2>

        <p
          style={{
            margin: '0 0 24px 0',
            color: 'var(--text-primary)',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >
          {step.body}
        </p>

        {/* Step Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentStep ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === currentStep ? 'var(--aqua-bright)' : 'rgba(11, 79, 138, 0.2)',
                transition: 'all 200ms ease',
              }}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={finish}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Skip All ⏩
          </button>
          <button
            onClick={handleNext}
            className="gloss-orb"
            style={{ padding: '8px 24px', fontSize: '14px' }}
          >
            {currentStep === STEPS.length - 1 ? "Let's Dive In! 🌊" : 'Next ➡️'}
          </button>
        </div>
      </div>
    </div>
  );
};