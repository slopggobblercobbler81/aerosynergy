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
  const [primarySips, setPrimarySips] = useState<number>(() => ns.get('primarySips', 0));
  const [reserveSips, setReserveSips] = useState<number>(() => ns.get('reserveSips', 0));
  const reserveRatio = ns.get('reserveRatio', 50);

  const handlePrimarySip = () => {
    const next = primarySips + 1;
    setPrimarySips(next);
    ns.set('primarySips', next);

    sound('droplet');

    if (!hush) {
      toast(`💧 Primary chamber sip logged! (${next})`, 'success');
    }

    if (next >= 3 && reserveSips >= 3) {
      award('wellness-hydration-orb-2:twin-flow');
    }
  };

  const handleReserveSip = () => {
    const next = reserveSips + 1;
    setReserveSips(next);
    ns.set('reserveSips', next);

    sound('chime');

    if (!hush) {
      toast(`🌊 Reserve moisture logged! (${next})`, 'info');
    }

    if (primarySips >= 3 && next >= 3) {
      award('wellness-hydration-orb-2:twin-flow');
    }
  };

  const handleReset = () => {
    sound('bloop');
    setPrimarySips(0);
    setReserveSips(0);
    ns.set('primarySips', 0);
    ns.set('reserveSips', 0);
    if (!hush) {
      toast('🫧 Dual chambers purged and refreshed!', 'info');
    }
  };

  // Chaos Card #018: Tiny poem in tooltip
  const poemTooltip =
    'Droplets fall upon the glass,\n' +
    'Minutes turn to tides that pass,\n' +
    'Sip the sky and drink the sea,\n' +
    'Bubbles keep you wild and free. 🖋️💧';

  const totalSips = primarySips + reserveSips;

  return (
    <div className={`feat-wellness-hydration-orb-2 ${calm ? 'calm-mode' : ''}`}>
      <div className="tribute-badge">
        Built in loving tribute to #017 Hydration Orb ✨
      </div>

      <div className="dual-orbs-container">
        {/* Primary Orb */}
        <div className="orb-wrapper">
          <div className="orb-glass primary-sphere" title="Chamber Alpha: Primary Aquatic Flow 💧">
            <div className="orb-fluid alpha-fluid" style={{ height: `${Math.min(100, primarySips * 15)}%` }} />
            <div className="orb-highlight" />
            <div className="orb-inner-text">
              <span className="orb-sym">💧</span>
              <span className="orb-val">{primarySips}</span>
            </div>
          </div>
          <span className="orb-label">Alpha (Primary)</span>
        </div>

        {/* Sync Stream */}
        <div className="sync-tide-indicator" title="Synchronized fluid dynamics">
          <span className="sync-arrows">⇄ 🌊 ⇄</span>
        </div>

        {/* Reserve Orb with Chaos Card #018 Poem Tooltip */}
        <div className="orb-wrapper">
          <div
            className="orb-glass reserve-sphere"
            title={poemTooltip}
          >
            <div className="orb-fluid beta-fluid" style={{ height: `${Math.min(100, reserveSips * 15)}%` }} />
            <div className="orb-highlight" />
            <div className="orb-inner-text">
              <span className="orb-sym">🌊</span>
              <span className="orb-val">{reserveSips}</span>
            </div>
          </div>
          <span className="orb-label">Beta (Reserve {reserveRatio}%)</span>
        </div>
      </div>

      <div className="stats-row">
        <span className="stat-pill">Total Hydration Sips: <strong>{totalSips}</strong> 💧</span>
      </div>

      {!hush && (
        <div className="mascot-quote">
          Dewey says: "{mascot.say('proud')}"
        </div>
      )}

      <div className="button-group">
        <button onClick={handlePrimarySip} className="glow-btn primary-action">
          Log Primary Sip 🥤
        </button>
        <button onClick={handleReserveSip} className="glow-btn reserve-action" title={poemTooltip}>
          Log Reserve Sip 🌊
        </button>
        <button onClick={handleReset} className="glow-btn reset-action" title="Reset both chambers">
          Reset 🔄
        </button>
      </div>

      <div className="legal-disclaimer">
        💧 Not medical advice, just double the vibes!
      </div>
    </div>
  );
};

export default Feature;
