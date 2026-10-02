import React, { useState, useEffect } from 'react';
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
  const [cloudSyncing, setCloudSyncing] = useState<boolean>(true);
  const dailyGoal = ns.get('dailyGoal', 8);

  // Chaos Card #017: Briefly pretends to be loading "from the cloud"
  useEffect(() => {
    const timer = setTimeout(() => {
      setCloudSyncing(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleSip = () => {
    const nextSips = sips + 1;
    setSips(nextSips);
    ns.set('sips', nextSips);

    sound('droplet');

    if (!hush) {
      toast(`💧 Refreshing sip logged! Total: ${nextSips} / ${dailyGoal}`, 'success');
    }

    if (nextSips === 1) {
      award('wellness-hydration-orb:first-sip');
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

  const handleManualSync = () => {
    sound('bloop');
    setCloudSyncing(true);
    setTimeout(() => {
      setCloudSyncing(false);
      if (!hush) {
        toast('☁️ Cloud sync complete (100% local, 0 bytes transmitted)!', 'info');
      }
    }, 600);
  };

  const fillPercent = Math.min(100, Math.round((sips / Math.max(1, dailyGoal)) * 100));

  return (
    <div className={`feat-wellness-hydration-orb ${calm ? 'calm-mode' : ''}`}>
      <div className="cloud-status-bar" onClick={handleManualSync} title="Click to simulate cloud sync">
        {cloudSyncing ? (
          <span className="cloud-syncing">☁️ Syncing with Nimbus Cloud...</span>
        ) : (
          <span className="cloud-synced">☁️ Synced locally (0.0ms ping, 100% offline) ✨</span>
        )}
      </div>

      <div className="orb-showcase">
        <div className="primordial-orb" title={`Fluid Level: ${fillPercent}%`}>
          <div
            className="orb-water-level"
            style={{ height: `${fillPercent}%` }}
          />
          <div className="orb-specular-highlight" />
          <div className="orb-center-label">
            <span className="orb-icon">💧</span>
            <span className="orb-percentage">{fillPercent}%</span>
          </div>
        </div>
      </div>

      <div className="counter-section">
        <div className="sip-count-number">{sips}</div>
        <div className="sip-count-label">Sips Today (Goal: {dailyGoal}) 🌊</div>
      </div>

      {!hush && (
        <div className="mascot-bubble">
          Dewey says: "{mascot.say('hydrating')}"
        </div>
      )}

      <div className="action-row">
        <button onClick={handleSip} className="gloss-action-btn primary-btn">
          Log a Sip 🥤
        </button>
        <button onClick={handleReset} className="gloss-action-btn secondary-btn" title="Reset counter">
          Reset 🔄
        </button>
      </div>

      <div className="disclaimer-text">
        💧 Not medical advice, just vibes!
      </div>
    </div>
  );
};

export default Feature;
