import React, { useEffect, useState } from 'react';
import { DeweyIcon } from '../styles/icons';
import { playSound } from '../core/audio';

interface SplashScreenProps {
  onDismiss: () => void;
  muteSounds?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss, muteSounds = false }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!muteSounds) {
      playSound('whoosh');
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onDismiss, 250);
          return 100;
        }
        return prev + 12;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onDismiss, muteSounds]);

  return (
    <div
      onClick={onDismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 35%, #E3F6FF 0%, #A6E1FF 50%, #4FC3F7 100%)',
        cursor: 'pointer',
      }}
    >
      <div
        className="glass-panel"
        style={{
          padding: '40px 48px',
          textAlign: 'center',
          maxWidth: '460px',
          boxShadow: '0 20px 60px rgba(11, 79, 138, 0.35)',
          background: 'rgba(255, 255, 255, 0.75)',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <DeweyIcon size={96} mood="happy" />
        </div>

        <h1
          className="chrome-text"
          style={{
            margin: '0 0 6px 0',
            fontSize: '26px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          AeroSynergy Ultra 365
        </h1>

        <div
          style={{
            fontSize: '14px',
            color: 'var(--sky-morning)',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          ✨ Cloud Bubble Edition ✨
        </div>

        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            margin: '0 0 24px 0',
            lineHeight: '1.4',
          }}
        >
          "Empowering your journey to seamless, crystal-clear productivity 🌊"
        </p>

        {/* Gloss Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '14px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 3px rgba(11, 79, 138, 0.2)',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #5EE7FF 0%, #1E90D6 70%, #00C8E6 100%)',
              borderRadius: '9999px',
              transition: 'width 120ms ease-out',
              boxShadow: '0 0 10px rgba(94, 231, 255, 0.6)',
            }}
          />
        </div>

        <div style={{ fontSize: '11px', color: '#6D8391' }}>
          Version 1.0.0 "Dolphin Sunrise" • Click anywhere to skip
        </div>
      </div>
    </div>
  );
};