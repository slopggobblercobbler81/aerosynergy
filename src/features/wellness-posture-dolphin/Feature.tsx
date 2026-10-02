import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import './feature.css';

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  mascot,
  hush,
  calm,
}) => {
  const [alignedCount, setAlignedCount] = useState<number>(() => ns.get('alignedCount', 0));
  const [isArching, setIsArching] = useState<boolean>(false);
  const [showOverSupportiveModal, setShowOverSupportiveModal] = useState<boolean>(false);
  const checkInterval = ns.get('checkInterval', 30);

  const handlePostureCheck = () => {
    sound('whoosh');
    setIsArching(true);
    setTimeout(() => {
      setIsArching(false);
    }, 2000);
  };

  const handleImUpright = () => {
    // Chaos Card #021: Confirmation dialog that is TOO supportive
    sound('sparkle');
    setShowOverSupportiveModal(true);
  };

  const handleConfirmSupport = () => {
    const nextCount = alignedCount + 1;
    setAlignedCount(nextCount);
    ns.set('alignedCount', nextCount);
    setShowOverSupportiveModal(false);

    sound('chime');

    if (!hush) {
      toast('🐬 Spine aligned with crystalline perfection! You radiate grace! 💎', 'success');
    }

    if (nextCount >= 1) {
      award('wellness-posture-dolphin:spine-aligned');
    }
  };

  return (
    <div className={`feat-wellness-posture-dolphin ${calm ? 'calm-mode' : ''}`}>
      <div className="dolphin-header">
        <span className="cadence-pill">Interval: Every {checkInterval} Minutes 🐬</span>
      </div>

      {/* Dolphin Posture Canvas */}
      <div className="dolphin-stage">
        <div className={`dolphin-avatar ${isArching ? 'arching-upright' : ''}`}>
          <svg className="dolphin-svg" viewBox="0 0 140 100" width="140" height="100">
            {/* Water Waves */}
            <path d="M 0 85 Q 35 75 70 85 T 140 85 L 140 100 L 0 100 Z" fill="rgba(79, 195, 247, 0.4)" />
            {/* Dolphin Body */}
            <path
              d={
                isArching
                  ? 'M 25 70 C 40 30, 80 15, 120 40 C 125 43, 115 52, 95 60 C 65 72, 45 80, 25 70 Z'
                  : 'M 20 60 C 45 45, 85 45, 120 55 C 125 58, 115 65, 95 70 C 65 78, 40 75, 20 60 Z'
              }
              fill="url(#dolphinGradient)"
              stroke="#5EE7FF"
              strokeWidth="1.5"
            />
            {/* Dorsal Fin */}
            <path
              d={isArching ? 'M 65 30 L 75 10 L 85 32 Z' : 'M 65 48 L 75 32 L 85 50 Z'}
              fill="#00C8E6"
            />
            {/* Dolphin Fluke / Tail */}
            <path
              d={isArching ? 'M 25 70 L 10 60 L 15 75 L 10 85 Z' : 'M 20 60 L 5 50 L 10 65 L 5 75 Z'}
              fill="#1E90D6"
            />
            {/* Eye with Sparkle */}
            <circle cx={isArching ? 108 : 108} cy={isArching ? 42 : 54} r="3" fill="#0B4F8A" />
            <circle cx={isArching ? 107 : 107} cy={isArching ? 41 : 53} r="1" fill="#FFFFFF" />
            {/* Gradients */}
            <defs>
              <linearGradient id="dolphinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A6E1FF" />
                <stop offset="40%" stopColor="#00C8E6" />
                <stop offset="100%" stopColor="#0B4F8A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="spine-alignment-status">
          {isArching ? '✨ Spine Erect & Majestic!' : '🐬 Resting in gentle aquatic curve'}
        </div>
      </div>

      <div className="reminder-text">
        Uncurl your shell, magnificent friend! 🐬
      </div>

      <div className="counter-row">
        Alignment checks completed: <strong>{alignedCount}</strong> 🌊
      </div>

      {!hush && (
        <div className="mascot-whisper">
          Dewey says: "{mascot.say('proud')}"
        </div>
      )}

      <div className="button-shelf">
        <button onClick={handlePostureCheck} className="dolphin-btn arch-btn">
          Demonstrate Posture 🐬
        </button>
        <button onClick={handleImUpright} className="dolphin-btn upright-btn">
          I'm Upright! 🌟
        </button>
      </div>

      {/* Chaos Card #021: OVERLY SUPPORTIVE CONFIRMATION MODAL */}
      {showOverSupportiveModal && (
        <div className="support-modal-backdrop">
          <div className="support-modal-card">
            <div className="modal-title">🌟 UNBELIEVABLE POSTURE EXCELLENCE! 💙</div>
            <div className="modal-body">
              We just checked your spinal alignment from orbit and you are looking like a Greek god sculpted from pure diamond! Your cervical curvature is literally weeping tears of oceanic joy! The dolphins in the lagoon are leaping in synchronized tribute to your dorsal uprightness! We are so, so endlessly proud of you! ✨🐬
            </div>
            <button onClick={handleConfirmSupport} className="dolphin-btn confirm-btn">
              Thank You, Dolphin! (Accept Radiance) 💎
            </button>
          </div>
        </div>
      )}

      <div className="posture-disclaimer">
        🐬 Ergonomic companion for vibes and alignment!
      </div>
    </div>
  );
};

export default Feature;
