import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import './feature.css';

export interface QuestItem {
  id: number | string;
  title: string;
  xpReward: number;
  completed: boolean;
}

const DEFAULT_QUESTS: QuestItem[] = [
  { id: 1, title: 'Slay the Procrastination Dragon 🐉', xpReward: 25, completed: false },
  { id: 2, title: 'Honor the Hydration Orb with 3 Sips 💧', xpReward: 25, completed: false },
  { id: 3, title: 'Harmonize with the Classic Matrix ☑️', xpReward: 25, completed: false },
  { id: 4, title: 'Breathe with the Zen Horizon 🧘', xpReward: 25, completed: false },
];

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  hush,
  calm,
}) => {
  const [quests, setQuests] = useState<QuestItem[]>(() =>
    ns.get<QuestItem[]>('quests', DEFAULT_QUESTS)
  );
  const [xp, setXp] = useState<number>(() => ns.get<number>('heroXP', 0));
  const [inputText, setInputText] = useState('');

  const heroLevel = Math.floor(xp / 100) + 1;
  const levelProgress = xp % 100; // 0 to 99

  const persistQuests = (nextQuests: QuestItem[]) => {
    setQuests(nextQuests);
    ns.set('quests', nextQuests);
  };

  const handleEmbark = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newQuest: QuestItem = {
      id: Date.now(),
      title: trimmed.includes(' ') && !/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/.test(trimmed)
        ? `Quest: ${trimmed} ⚔️`
        : trimmed,
      xpReward: 25,
      completed: false,
    };

    const nextQuests = [...quests, newQuest];
    persistQuests(nextQuests);
    setInputText('');
    sound('bloop');

    if (!hush) {
      toast(`Heroic quest forged: "${newQuest.title}" ⚔️✨`, 'info');
    }
  };

  const handleClaimQuest = (id: number | string) => {
    let claimedTitle = '';
    let rewardGained = 0;

    const nextQuests = quests.map((q) => {
      if (q.id === id && !q.completed) {
        claimedTitle = q.title;
        rewardGained = q.xpReward;
        return { ...q, completed: true };
      }
      return q;
    });

    if (rewardGained === 0) return;

    persistQuests(nextQuests);

    const nextXp = xp + rewardGained;
    setXp(nextXp);
    ns.set('heroXP', nextXp);

    sound('chime');

    const nextLevel = Math.floor(nextXp / 100) + 1;
    if (nextLevel > heroLevel) {
      sound('sparkle');
      award('todo-gamified-list:hero-level');
      if (!hush) {
        toast(`LEVEL UP! You are now Hero Rank ${nextLevel}! 🏆👑✨`, 'party');
      }
    } else {
      if (!hush) {
        toast(`VICTORY! ${claimedTitle} conquered! (+${rewardGained} XP) ⚔️✨`, 'success');
      }
    }
  };

  const handleDelete = (id: number | string) => {
    const nextQuests = quests.filter((q) => q.id !== id);
    persistQuests(nextQuests);
    sound('whoosh');
  };

  return (
    <div className={`feat-todo-gamified-list ${calm ? 'calm-mode' : ''}`}>
      <div className="hero-header">
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#0B4F8A' }}>
            🎮 Quest Guild Log
          </div>
          <div style={{ fontSize: '12px', color: '#5A7D9A' }}>
            Hero Level {heroLevel} · Total XP: {xp} 🌟
          </div>
        </div>
        <div className="level-badge">
          Rank {heroLevel} 👑
        </div>
      </div>

      <div>
        <div style={{ fontSize: '11px', color: '#0B4F8A', marginBottom: '4px', fontWeight: 600 }}>
          XP Progress River (Tiny Rowing Team Momentum 🚣)
        </div>
        <div className="xp-river-track">
          <div className="xp-river-fill" style={{ width: `${levelProgress}%` }} />
          <div
            className="rowing-team"
            style={{ left: `calc(${Math.min(88, levelProgress)}% - 10px)` }}
            title="Tiny rowing team powering your productivity XP (card-020)"
          >
            🚣
          </div>
          <div className="xp-label">
            {levelProgress} / 100 XP
          </div>
        </div>
      </div>

      <form onSubmit={handleEmbark} className="add-box">
        <input
          type="text"
          className="quest-input"
          placeholder="Forge a heroic quest (e.g. Slay inbox dragon)... ⚔️"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="embark-btn">
          Embark ⚔️
        </button>
      </form>

      <div className="quest-board">
        {quests.map((q) => (
          <div key={q.id} className={`quest-card ${q.completed ? 'completed' : ''}`}>
            <div>
              <div className="quest-title">{q.title}</div>
              <span className="quest-reward-tag">+{q.xpReward} XP 🌟</span>
            </div>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {!q.completed ? (
                <button
                  type="button"
                  className="claim-btn"
                  onClick={() => handleClaimQuest(q.id)}
                >
                  Conquer ⚔️
                </button>
              ) : (
                <span style={{ fontSize: '12px', color: '#2ed573', fontWeight: 700 }}>
                  Conquered ✅
                </span>
              )}
              <button
                type="button"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  opacity: 0.7,
                }}
                title="Delete quest"
                onClick={() => handleDelete(q.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
