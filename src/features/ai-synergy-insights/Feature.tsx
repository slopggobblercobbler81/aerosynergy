import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import { getSynergyInsight, getBuzzword, createRng } from '../../slop/merge';
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
  const [calcCount, setCalcCount] = useState<number>(() => ns.get('calcCount', 0));
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const style = ns.get<'oceanic' | 'corporate' | 'cosmic'>('insightStyle', 'oceanic');

  const generateInsights = (seedNum: number) => {
    const rng = createRng(`synergy-${seedNum}-${style}`);
    const buzz = getBuzzword(3, rng);

    if (style === 'corporate') {
      return [
        `📊 Synergy Vector A: By proactively ${buzz[0]}ing deliverables, organizational velocity increases by 340% 💼`,
        `📈 Paradigm B: Cross-functional alignment confirms your focus is seamlessly ${buzz[1]}ing through Q4 🚀`,
        `💎 Strategic Horizon: Every keystroke is an actionable catalyst designed to ${buzz[2]} stakeholder joy ✨`,
      ];
    } else if (style === 'cosmic') {
      return [
        `🌌 Celestial Vector: The constellations of Aero indicate you will ${buzz[0]} with infinite astral clarity 🔮`,
        `⭐ Luminary Matrix: Your creative aura is projected to ${buzz[1]} across the digital ether without friction 🌟`,
        `✨ Horizon Resonance: Solar flares of optimism actively ${buzz[2]} your workflow into pure ascension 💠`,
      ];
    } else {
      // oceanic
      return [
        `🌊 Tidal Flow 1: Your focus is a crystalline wave, expertly ${buzz[0]}ing past digital distractions 💧`,
        `🐬 Cetacean Protocol: Deep breath caustics confirm you will ${buzz[1]} toward the sunlit shallows 🫧`,
        `💎 Coral Horizon: ${getSynergyInsight(`oceanic-${seedNum}`)} 🌊`,
      ];
    }
  };

  const [insights, setInsights] = useState<string[]>(() => generateInsights(calcCount));

  const handleRecalculate = () => {
    sound('sparkle');
    setIsSpinning(true);

    const nextCount = calcCount + 1;
    setCalcCount(nextCount);
    ns.set('calcCount', nextCount);

    setTimeout(() => {
      setInsights(generateInsights(nextCount));
      setIsSpinning(false);
      if (!hush) {
        toast('💠 New Synergy Insights calculated with 99.8% confidence!', 'party');
      }
      if (nextCount >= 5) {
        award('ai-synergy-insights:pure-alignment');
      }
    }, 600);
  };

  const quietAffirmations = [
    'The quiet tide gently grounds your work today. 🫧',
    'Peaceful focus is naturally and effortlessly unfolding. 🌊',
    'You are centered, present, and thoroughly steady. 🕊️',
  ];

  const displayedList = hush ? quietAffirmations : insights;

  return (
    <div className={`feat-ai-synergy-insights ${calm ? 'calm-mode' : ''}`}>
      <div className="status-badge-row">
        <span className="crystal-badge">💠 100% Offline Enthusiasm Matrix ✨</span>
      </div>

      <div className="crystal-orb-section">
        <div className={`crystal-orb ${isSpinning ? 'spinning' : ''}`} onClick={handleRecalculate} title="Click to recalculate synergy matrix">
          <div className="orb-facet" />
          <div className="orb-specular" />
          <span className="crystal-symbol">💠</span>
        </div>
        <div className="confidence-meter">
          Alignment Confidence: <strong>99.8%</strong> 📈
        </div>
      </div>

      <div className="insights-container">
        {displayedList.map((item, index) => (
          <div key={index} className="insight-card">
            <span className="insight-bullet">💠</span>
            <span className="insight-text">{item}</span>
          </div>
        ))}
      </div>

      {!hush && (
        <div className="dewey-comment">
          Dewey says: "{mascot.say('happy')}"
        </div>
      )}

      <div className="action-tray">
        <button onClick={handleRecalculate} className="recalc-btn">
          Recalculate Synergy 🔄
        </button>
      </div>

      <div className="slop-disclaimer">
        💠 All "intelligence" is locally generated enthusiasm per §4.1.9!
      </div>
    </div>
  );
};

export default Feature;
