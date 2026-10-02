import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import { createRng } from '../../slop/merge';
import './feature.css';

const ADJECTIVES = ['Radiant', 'Crystalline', 'Unstoppable', 'Luminous', 'Buoyant', 'Harmonious', 'Majestic', 'Resonant', 'Sparkling'];
const ROLES = ['Horizon Navigator', 'Cloud Bubble Architect', 'Aero Trailblazer', 'Synergy Alchemist', 'Desktop Luminary', 'Lagoon Pioneer'];
const SKILLS = ['boundless enthusiasm', 'specular intuition', 'crystal clarity', 'diaphragmatic calm', 'aqueous resilience', 'ambient optimism'];
const ACTIONS = ['illuminate', 'elevate', 'synergize', 'streamline', 'harmonize', 'revitalize', 'transcend'];
const NOUNS = ['the digital stratosphere', 'the sunrise horizon', 'the azure workflow', 'the celestial dock', 'the crystalline lagoon', 'the bubble matrix'];

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  mascot,
  hush,
  calm,
}) => {
  const [quoteIndex, setQuoteIndex] = useState<number>(() => ns.get('quoteIndex', 0));
  const [copied, setCopied] = useState<boolean>(false);
  const vibeLevel = ns.get('vibeLevel', 8);

  const generateQuote = (idx: number) => {
    const rng = createRng(`quote-${idx}-${vibeLevel}`);
    const adj = ADJECTIVES[Math.floor(rng() * ADJECTIVES.length)];
    const role = ROLES[Math.floor(rng() * ROLES.length)];
    const skill = SKILLS[Math.floor(rng() * SKILLS.length)];
    const act = ACTIONS[Math.floor(rng() * ACTIONS.length)];
    const noun = NOUNS[Math.floor(rng() * NOUNS.length)];

    return `"${adj} ${role}, your ${skill} will ${act} ${noun} today! 🌟"`;
  };

  const currentQuote = generateQuote(quoteIndex);

  const handleNextQuote = () => {
    sound('bloop');
    const nextIdx = quoteIndex + 1;
    setQuoteIndex(nextIdx);
    ns.set('quoteIndex', nextIdx);
    setCopied(false);
  };

  const handleCopy = () => {
    sound('sparkle');
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentQuote).catch(() => {});
    }
    setCopied(true);

    if (!hush) {
      toast('🌟 Affirmation copied to clipboard! Radiate that light! 💎', 'party');
    }

    award('ai-motivational-quotes:sparkle-shared');
  };

  return (
    <div className={`feat-ai-motivational-quotes ${calm ? 'calm-mode' : ''}`}>
      {/* Chaos Card #033: Proudly in beta forever 🧪 */}
      <div className="beta-forever-badge" title="Perfection is a horizon, not a destination 🧪✨">
        <span className="beta-tag">v0.99.9-beta-forever 🧪</span>
        <span className="beta-motto">Proudly in Beta Forever</span>
      </div>

      <div className="quote-display-card">
        <div className="quote-sparkle-decor">✨ 🌟 ✨</div>
        <p className="quote-text">{currentQuote}</p>
        <div className="quote-author-tag">— AeroSynergy Oracle of Optimism 💎</div>
      </div>

      <div className="vibe-indicator">
        Affirmation Resonance: <strong>Level {vibeLevel} / 10</strong> 🌊
      </div>

      {!hush && (
        <div className="dewey-cheer">
          Dewey says: "{mascot.say('supportive')}"
        </div>
      )}

      <div className="button-tray">
        <button onClick={handleNextQuote} className="quote-btn generate-btn">
          Generate New Affirmation ✨
        </button>
        <button onClick={handleCopy} className="quote-btn copy-btn">
          {copied ? 'Copied! 🌟' : 'Copy Quote 📋'}
        </button>
      </div>

      <div className="oracle-disclaimer">
        🌟 100% procedural mad-libs optimism for genuine daily smiles!
      </div>
    </div>
  );
};

export default Feature;
