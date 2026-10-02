import React, { useState, useEffect } from 'react';
import { FeatureProps } from '../../core/types';
import './feature.css';

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  mascot,
  hush,
  calm,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [phaseTimer, setPhaseTimer] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(() => ns.get('cycleCount', 0));
  const technique = ns.get<'relax' | 'box'>('breathTechnique', 'relax');

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setPhaseTimer((prev) => {
        if (prev <= 1) {
          // Transition phase
          let nextPhase: BreathPhase = 'inhale';
          let nextDuration = 4;

          if (technique === 'relax') {
            if (phase === 'inhale') {
              nextPhase = 'hold';
              nextDuration = 7;
              sound('sparkle');
            } else if (phase === 'hold') {
              nextPhase = 'exhale';
              nextDuration = 8;
              sound('whoosh');
            } else {
              nextPhase = 'inhale';
              nextDuration = 4;
              sound('droplet');
              const nextCycles = cycleCount + 1;
              setCycleCount(nextCycles);
              ns.set('cycleCount', nextCycles);
              if (!hush) toast('🫧 Breath cycle completed! Serenity flows 🌊', 'success');
              if (nextCycles >= 1) award('wellness-breathing-bubble:deep-breath');
            }
          } else {
            // box breathing
            if (phase === 'inhale') {
              nextPhase = 'hold';
              nextDuration = 4;
              sound('sparkle');
            } else if (phase === 'hold') {
              nextPhase = 'exhale';
              nextDuration = 4;
              sound('whoosh');
            } else if (phase === 'exhale') {
              nextPhase = 'rest';
              nextDuration = 4;
              sound('droplet');
            } else {
              nextPhase = 'inhale';
              nextDuration = 4;
              sound('bloop');
              const nextCycles = cycleCount + 1;
              setCycleCount(nextCycles);
              ns.set('cycleCount', nextCycles);
              if (!hush) toast('🧊 Box breathing cycle completed! Mind aligned ✨', 'success');
              if (nextCycles >= 1) award('wellness-breathing-bubble:deep-breath');
            }
          }

          setPhase(nextPhase);
          return nextDuration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase, technique, cycleCount, hush, sound, toast, award, ns]);

  const handleToggle = () => {
    if (!isActive) {
      sound('droplet');
      setIsActive(true);
      setPhase('inhale');
      setPhaseTimer(4);
      if (!hush) toast('🌬️ Mindful breathing session started!', 'info');
    } else {
      sound('bloop');
      setIsActive(false);
      if (!hush) toast('⏸️ Session paused in serene equilibrium.', 'info');
    }
  };

  const handleReset = () => {
    sound('bloop');
    setIsActive(false);
    setPhase('inhale');
    setPhaseTimer(4);
    setCycleCount(0);
    ns.set('cycleCount', 0);
  };

  const getPromptText = () => {
    if (!isActive) return 'Ready to breathe with the tide? Press Start 🫧';
    switch (phase) {
      case 'inhale':
        return 'Inhale the future... 🌬️';
      case 'hold':
        return 'Hold the clarity... ✨';
      case 'exhale':
        return 'Exhale the doubts... 🫧';
      case 'rest':
        return 'Rest in peaceful stillness... 🌊';
    }
  };

  const bubbleScale = !isActive
    ? 1
    : phase === 'inhale'
    ? 1.35
    : phase === 'hold'
    ? 1.35
    : phase === 'exhale'
    ? 0.85
    : 0.95;

  return (
    <div className={`feat-wellness-breathing-bubble ${calm ? 'calm-mode' : ''}`}>
      <div className="breath-header">
        <span className="pattern-pill">Pattern: {technique === 'relax' ? '4-7-8 Deep Relaxation 🌊' : '4-4-4-4 Box Breathing 🧊'}</span>
      </div>

      {/* Main Breathing Orb */}
      <div className="bubble-arena">
        <div
          className={`living-bubble ${phase}`}
          style={{ transform: calm ? 'none' : `scale(${bubbleScale})` }}
        >
          <div className="bubble-iridescence" />
          <div className="bubble-specular" />
          <div className="bubble-inner-content">
            <span className="bubble-phase-icon">
              {phase === 'inhale' ? '🌬️' : phase === 'hold' ? '✨' : phase === 'exhale' ? '🫧' : '🌊'}
            </span>
            <span className="bubble-countdown">{isActive ? phaseTimer : '—'}</span>
            <span className="bubble-phase-name">{isActive ? phase.toUpperCase() : 'PEACE'}</span>
          </div>
        </div>
      </div>

      <div className="breath-instruction">
        {getPromptText()}
      </div>

      {/* Chaos Card #020: Tiny Rowing Team visual */}
      <div className="rowing-lagoon" title="Rowing Team synchronized with respiratory cadence 🚣">
        <div className={`rowing-crew ${isActive && !calm ? 'rowing-active' : ''}`}>
          <svg className="rowing-svg" viewBox="0 0 160 36" width="160" height="36">
            {/* Water Ripple */}
            <path d="M 0 28 Q 40 22 80 28 T 160 28" fill="none" stroke="rgba(79, 195, 247, 0.6)" strokeWidth="2" />
            {/* Boat Hull */}
            <path d="M 15 24 Q 80 32 145 24 L 140 28 Q 80 36 20 28 Z" fill="#0B4F8A" stroke="#4FC3F7" strokeWidth="1" />
            {/* Oars */}
            <line x1="45" y1="20" x2="30" y2="32" stroke="#AFC3CE" strokeWidth="2" strokeLinecap="round" />
            <line x1="75" y1="20" x2="60" y2="32" stroke="#AFC3CE" strokeWidth="2" strokeLinecap="round" />
            <line x1="105" y1="20" x2="90" y2="32" stroke="#AFC3CE" strokeWidth="2" strokeLinecap="round" />
            <line x1="135" y1="20" x2="120" y2="32" stroke="#AFC3CE" strokeWidth="2" strokeLinecap="round" />
            {/* Tiny Rowers (circle heads) */}
            <circle cx="45" cy="16" r="4" fill="#00C8E6" />
            <circle cx="75" cy="16" r="4" fill="#00C8E6" />
            <circle cx="105" cy="16" r="4" fill="#00C8E6" />
            <circle cx="135" cy="16" r="4" fill="#00C8E6" />
          </svg>
        </div>
        <span className="rowing-caption">🚣 Synergy Rowing Club (Synched to Breath)</span>
      </div>

      <div className="cycles-counter">
        Cycles completed: <strong>{cycleCount}</strong> 🌊
      </div>

      {!hush && (
        <div className="dewey-advice">
          Dewey says: "{mascot.say('supportive')}"
        </div>
      )}

      <div className="controls-row">
        <button onClick={handleToggle} className="bubble-btn primary-ctrl">
          {isActive ? 'Pause ⏸️' : 'Start Breathing 🌬️'}
        </button>
        <button onClick={handleReset} className="bubble-btn reset-ctrl" title="Reset counter">
          Reset 🔄
        </button>
      </div>

      <div className="disclaimer-note">
        💧 Not medical advice, just vibes!
      </div>
    </div>
  );
};

export default Feature;
