import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import './feature.css';

export interface DontTask {
  id: number | string;
  title: string;
  avoidedCount: number;
}

const DEFAULT_DONT_TASKS: DontTask = [
  { id: 1, title: 'Do not check inbox 40 times in one hour 🚫', avoidedCount: 3 },
  { id: 2, title: 'Do not doomscroll cynical commentary 📱', avoidedCount: 2 },
  { id: 3, title: 'Do not skip drinking crystal water 💧', avoidedCount: 5 },
];

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  hush,
  calm,
}) => {
  const [tasks, setTasks] = useState<DontTask[]>(() =>
    ns.get<DontTask[]>('dontTasks', DEFAULT_DONT_TASKS)
  );
  const [avoidanceScore, setAvoidanceScore] = useState<number>(() =>
    ns.get<number>('avoidanceScore', 10)
  );
  const [wobblingId, setWobblingId] = useState<number | string | null>(null);
  const [supportiveMessage, setSupportiveMessage] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  const persistTasks = (nextTasks: DontTask[]) => {
    setTasks(nextTasks);
    ns.set('dontTasks', nextTasks);
  };

  const handleForbidTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTask: DontTask = {
      id: Date.now(),
      title: trimmed.includes(' ') && !/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/.test(trimmed)
        ? `Anti-Goal: ${trimmed} 🚫`
        : trimmed,
      avoidedCount: 0,
    };

    const nextTasks = [...tasks, newTask];
    persistTasks(nextTasks);
    setInputText('');
    sound('bloop');

    if (!hush) {
      toast(`Anti-goal posted to the fortress: "${newTask.title}" 🚫✨`, 'info');
    }
  };

  // Button wobbles before working (card-008)
  const handleAvoidClick = (id: number | string) => {
    if (wobblingId === id) return;

    // Trigger wobble
    setWobblingId(id);
    sound('droplet');

    setTimeout(() => {
      setWobblingId(null);

      let targetTitle = '';
      const nextTasks = tasks.map((t) => {
        if (t.id === id) {
          targetTitle = t.title;
          return { ...t, avoidedCount: t.avoidedCount + 1 };
        }
        return t;
      });

      persistTasks(nextTasks);

      const nextScore = avoidanceScore + 1;
      setAvoidanceScore(nextScore);
      ns.set('avoidanceScore', nextScore);

      sound('chime');

      // Card-021: overwhelmingly supportive confirmation
      const supportiveText = `You resisted "${targetTitle}"! We love you so much and we believe in your majestic digital sovereignty! You are doing brilliantly! 💙✨`;
      setSupportiveMessage(supportiveText);

      if (nextScore >= 15) {
        award('todo-dont-list:master-resister');
      }

      if (!hush) {
        toast(`RESISTED! +1 to Avoidance Fortitude! 🛡️💙`, 'success');
      }
    }, calm ? 50 : 350); // Instant in calm mode
  };

  const handleDelete = (id: number | string) => {
    const nextTasks = tasks.filter((t) => t.id !== id);
    persistTasks(nextTasks);
    sound('whoosh');
  };

  return (
    <div className={`feat-todo-dont-list ${calm ? 'calm-mode' : ''}`}>
      <div className="dont-header">
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#881122' }}>
            🚫 To-Don't Fortress
          </div>
          <div style={{ fontSize: '12px', color: '#7a5058' }}>
            Temptations Defied: {avoidanceScore} 🛡️
          </div>
        </div>
        <div className="score-shield">
          Score: {avoidanceScore} 🛡️
        </div>
      </div>

      {supportiveMessage && (
        <div className="supportive-modal">
          <div className="supportive-title">
            Overwhelming Support & Affirmation 💙
          </div>
          <div className="supportive-body">
            {supportiveMessage}
          </div>
          <button
            type="button"
            style={{
              alignSelf: 'flex-end',
              background: '#0d47a1',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
            onClick={() => setSupportiveMessage(null)}
          >
            Thank You 💙
          </button>
        </div>
      )}

      <form onSubmit={handleForbidTask} className="add-box">
        <input
          type="text"
          className="dont-input"
          placeholder="What will you gloriously avoid today? 🚫"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="forbid-btn">
          Forbid 🚫
        </button>
      </form>

      <div className="dont-list">
        {tasks.map((t) => (
          <div key={t.id} className="dont-card">
            <div>
              <div className="dont-title">{t.title}</div>
              <div className="avoid-count">
                Successfully avoided {t.avoidedCount} times! ✨
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                type="button"
                className={`wobble-btn ${wobblingId === t.id ? 'wobbling' : ''}`}
                onClick={() => handleAvoidClick(t.id)}
                title="Wobbles enticingly before recording resistance (card-008)"
              >
                {wobblingId === t.id ? 'Wobbling... 🤸' : 'I Avoided This! 🚫'}
              </button>
              <button
                type="button"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  opacity: 0.6,
                }}
                title="Delete task"
                onClick={() => handleDelete(t.id)}
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
