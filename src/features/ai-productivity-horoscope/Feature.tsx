import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import { createRng, getBuzzword } from '../../slop/merge';
import './feature.css';

const ZODIAC_SIGNS = [
  { id: 'Aquarius', name: 'Aquarius (Water Bearer)', emoji: '💧', house: 'House of Ambient Flow' },
  { id: 'Pisces', name: 'Pisces (Chrome Dolphins)', emoji: '🐬', house: 'House of Oceanic Harmony' },
  { id: 'Aries', name: 'Aries (Aqua Ram)', emoji: '🌊', house: 'House of High-Velocity Synergy' },
  { id: 'Taurus', name: 'Taurus (Glass Bull)', emoji: '💎', house: 'House of Enduring Gloss' },
  { id: 'Gemini', name: 'Gemini (Twin Bubbles)', emoji: '🫧', house: 'House of Synchronized Tabs' },
  { id: 'Cancer', name: 'Cancer (Pearl Crab)', emoji: '🦀', house: 'House of Frosted Safety' },
  { id: 'Leo', name: 'Leo (Solar Flare)', emoji: '☀️', house: 'House of Specular Radiance' },
  { id: 'Virgo', name: 'Virgo (Crystal Meadow)', emoji: '🌿', house: 'House of Pure Alignment' },
  { id: 'Libra', name: 'Libra (Prism Scales)', emoji: '⚖️', house: 'House of Equalized Caustics' },
  { id: 'Scorpio', name: 'Scorpio (Tide Scorpion)', emoji: '🦂', house: 'House of Deep Stratosphere' },
  { id: 'Sagittarius', name: 'Sagittarius (Sky Archer)', emoji: '🏹', house: 'House of Horizon Trajectories' },
  { id: 'Capricorn', name: 'Capricorn (Sea Goat)', emoji: '🐐', house: 'House of Mountain Cumulus' },
];

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  mascot,
  hush,
  calm,
}) => {
  const initialSign = ns.get('selectedSign', ns.get('defaultSign', 'Aquarius'));
  const [selectedSign, setSelectedSign] = useState<string>(initialSign);
  const [forecastSeed, setForecastSeed] = useState<number>(0);

  const signData = ZODIAC_SIGNS.find((s) => s.id === selectedSign) || ZODIAC_SIGNS[0];

  // Deterministic horoscope forecast based on date & sign
  const now = new Date();
  const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${selectedSign}-${forecastSeed}`;
  const rng = createRng(dateKey);
  const buzz = getBuzzword(4, rng);

  const forecastText =
    `Today in the ${signData.house}, celestial alignments urge you to ${buzz[0]} your tasks with crystal clarity. ` +
    `Mercury is entering your primary workspace queue. Expect high-velocity resonance as you ${buzz[1]} with peers. ` +
    `Keep your tabs organized and your heart hydrated! 🌌✨`;

  // Chaos Card #032: Numbers displayed must round to "approximately gorgeous"
  const rawScore = 95 + Math.floor(rng() * 50) / 10;
  const alignmentPercent = `${rawScore.toFixed(1)}% (approximately gorgeous) 📈`;
  const focusResonance = `${(98.0 + rng() * 1.9).toFixed(1)}% (approximately gorgeous) ✨`;

  const handleSignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSign = e.target.value;
    setSelectedSign(newSign);
    ns.set('selectedSign', newSign);
    sound('bloop');
  };

  const handleConsult = () => {
    sound('sparkle');
    setForecastSeed((s) => s + 1);

    if (!hush) {
      toast(`🔮 Constellations consulted for ${signData.name}!`, 'success');
    }

    award('ai-productivity-horoscope:stars-aligned');
  };

  return (
    <div className={`feat-ai-productivity-horoscope ${calm ? 'calm-mode' : ''}`}>
      <div className="horoscope-header">
        <span className="cosmic-date-pill">
          📅 Celestial Date: {now.toLocaleDateString()} 🔮
        </span>
      </div>

      <div className="sign-picker-row">
        <label htmlFor="sign-select" className="sign-label">Aero Ascendant:</label>
        <select
          id="sign-select"
          value={selectedSign}
          onChange={handleSignChange}
          className="sign-dropdown"
        >
          {ZODIAC_SIGNS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.emoji} {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cosmic Orb Preview */}
      <div className="cosmic-stage">
        <div className="cosmic-orb" onClick={handleConsult} title="Consult the Frutiger Constellations">
          <span className="cosmic-sign-emoji">{signData.emoji}</span>
          <div className="cosmic-ring" />
        </div>
        <div className="house-title">{signData.house}</div>
      </div>

      {/* Metrics Row rounded to "approximately gorgeous" per Chaos Card #032 */}
      <div className="gorgeous-metrics-grid">
        <div className="metric-cell">
          <span className="metric-tag">Synergy Velocity</span>
          <span className="metric-gorgeous">{alignmentPercent}</span>
        </div>
        <div className="metric-cell">
          <span className="metric-tag">Aero Resonance</span>
          <span className="metric-gorgeous">{focusResonance}</span>
        </div>
      </div>

      {/* Forecast Card */}
      <div className="forecast-card">
        <p className="forecast-body">{forecastText}</p>
      </div>

      {!hush && (
        <div className="dewey-reading">
          Dewey says: "{mascot.say('happy')}"
        </div>
      )}

      <div className="action-row">
        <button onClick={handleConsult} className="consult-btn">
          Consult the Constellations 🔮
        </button>
      </div>

      <div className="astrology-disclaimer">
        🔮 Astrological productivity guidance for entertainment and motivation!
      </div>
    </div>
  );
};

export default Feature;
