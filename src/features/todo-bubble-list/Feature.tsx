import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import './feature.css';

export interface BubbleTask {
  id: number | string;
  title: string;
  popped: boolean;
}

const DEFAULT_BUBBLE_TASKS: BubbleTask = [
  { id: 1, title: 'Breathe crystal sea air 🌊', popped: false },
  { id: 2, title: 'Polish aqua lens flare ✨', popped: false },
  { id: 3, title: 'Hydrate the team dolphin 🐬', popped: false },
];

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  hush,
  calm,
}) => {
  const [tasks, setTasks] = useState<BubbleTask[]>(() =>
    ns.get<BubbleTask[]>('bubbleTasks', DEFAULT_BUBBLE_TASKS)
  );
  const [inputText, setInputText] = useState('');

  const persistTasks = (nextTasks: BubbleTask[]) => {
    setTasks(nextTasks);
    ns.set('bubbleTasks', nextTasks);
  };

  const handleBlowBubble = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTask: BubbleTask = {
      id: Date.now(),
      title: trimmed.includes(' ') && !/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/.test(trimmed)
        ? `${trimmed} 🫧`
        : trimmed,
      popped: false,
    };

    const nextTasks = [...tasks, newTask];
    persistTasks(nextTasks);
    setInputText('');
    sound('whoosh');

    if (!hush) {
      toast(`Iridescent bubble blown: "${newTask.title}" 🫧`, 'info');
    }
  };

  const handlePopBubble = (id: number | string) => {
    let taskName = '';
    const nextTasks = tasks.map((t) => {
      if (t.id === id) {
        taskName = t.title;
        return { ...t, popped: true };
      }
      return t;
    });

    persistTasks(nextTasks);
    sound('droplet');
    award('todo-bubble-list:first-pop');

    if (!hush) {
      toast(`POP! Bubble "${taskName}" burst into sparkling droplets! 💧✨`, 'success');
    }
  };

  const handleReinflateAll = () => {
    const nextTasks = tasks.map((t) => ({ ...t, popped: false }));
    persistTasks(nextTasks);
    sound('bloop');
    if (!hush) {
      toast('All bubbles reinflated with buoyant ocean breeze! 🫧🌊', 'info');
    }
  };

  const activeBubbles = tasks.filter((t) => !t.popped);
  const poppedCount = tasks.filter((t) => t.popped).length;

  return (
    <div className={`feat-todo-bubble-list ${calm ? 'calm-mode' : ''}`}>
      <div className="bubble-header">
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#0B4F8A' }}>
            🫧 Iridescent Bubble Sphere
          </div>
          <div style={{ fontSize: '12px', color: '#5A7D9A' }}>
            Atmospheric Pressure: 365 mbar 🔢 (Optimal Buoyancy 🌊)
          </div>
        </div>
        <div className="hat-mascot" title="Dewey in Top Hat (card-003)">
          <span>🎩🐬</span>
          <span>Sir Dewey 365</span>
        </div>
      </div>

      <form onSubmit={handleBlowBubble} className="add-box">
        <input
          type="text"
          className="bubble-input"
          placeholder="Blow a new task bubble (e.g. Sip cold dew 💧)..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="blow-btn">
          Blow 🫧
        </button>
      </form>

      {activeBubbles.length === 0 ? (
        <div
          style={{
            padding: '24px',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '12px',
            border: '1px dashed #70c4ff',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0B4F8A' }}>
            All Bubbles Popped! 💧✨
          </div>
          <div style={{ fontSize: '12px', color: '#4A7090', margin: '8px 0' }}>
            Every task has successfully burst into crisp mountain mist!
          </div>
          <button
            type="button"
            className="blow-btn"
            style={{ padding: '6px 16px', fontSize: '12px' }}
            onClick={handleReinflateAll}
          >
            Reinflate Bubbles 🔄🫧
          </button>
        </div>
      ) : (
        <div className="bubble-grid">
          {activeBubbles.map((b) => (
            <div
              key={b.id}
              className="bubble-orb"
              onClick={() => handlePopBubble(b.id)}
              title="Click to pop!"
            >
              <div className="bubble-title">{b.title}</div>
              <div className="bubble-hint">Click to POP! 💥</div>
            </div>
          ))}
        </div>
      )}

      <div className="popped-archive">
        <span>Popped Droplets: {poppedCount} 💧</span>
        {poppedCount > 0 && (
          <button
            type="button"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0088cc',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '12px',
            }}
            onClick={handleReinflateAll}
          >
            Re-blow All 🫧
          </button>
        )}
      </div>
    </div>
  );
};

export default Feature;
