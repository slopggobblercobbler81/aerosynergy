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
  const [sips, setSips] = useState<number>(() => ns.get('sips', 0));
  const dailyGoal = ns.get('dailyGoal', 8);

  const handleSip = () => {
    const nextSips = sips + 1;
    setSips(nextSips);
    ns.set('sips', nextSips);

    sound('droplet');

    if (!hush) {
      toast(`💧 Refreshing sip logged! Total: ${nextSips} / ${dailyGoal}`, 'success');
    }

    if (nextSips >= 5) {
      award('wellness-hydration-orb-3:big-sip');
    }
  };

  const handleReset = () => {
    sound('bloop');
    setSips(0);
    ns.set('sips', 0);
    if (!hush) {
      toast('🫧 Hydration tracker reset for a fresh tide!', 'info');
    }
  };

  return (
    <div className={`feat-wellness-hydration-orb-3 ${calm ? 'calm-mode' : ''}`}>
      <div className="orbs-row">
        <div className="orb-item" title="Orb Alpha (Wisdom)">💧</div>
        <div className="orb-item" title="Orb Beta (Vitality)">🌊</div>
        <div className="orb-item" title="Orb Gamma (Resonance)">🫧</div>
      </div>

      <div>
        <div className="sip-counter">{sips}</div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Sips Today (Goal: {dailyGoal})
        </div>
      </div>

      {!hush && (
        <div
          style={{
            fontSize: '13px',
            color: 'var(--sky-deep)',
            background: 'rgba(255, 255, 255, 0.65)',
            padding: '8px 14px',
            borderRadius: '10px',
            fontStyle: 'italic',
          }}
        >
          Dewey says: "{mascot.say('hydrating')}"
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleSip} className="gloss-orb" style={{ padding: '10px 24px' }}>
          Log a Sip 🥤
        </button>
        <button
          onClick={handleReset}
          className="gloss-orb"
          style={{
            padding: '10px 16px',
            background: 'radial-gradient(circle at 50% 20%, #AFC3CE 0%, #6D8391 100%)',
          }}
          title="Reset daily counter"
        >
          Reset 🔄
        </button>
      </div>

      <div className="disclaimer">
        💧 Not medical advice, just vibes!
      </div>
    </div>
  );
};

export default Feature;
