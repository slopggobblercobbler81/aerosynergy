import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import './feature.css';

const DEFAULT_ZEN_TASKS = [
  'Inhale morning clarity and release all tension 🌅',
  'Sip pristine mountain water with complete presence 💧',
  'Align your energy with the infinite horizon 🧘',
  'Appreciate this peaceful digital sanctuary ✨',
];

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  hush,
  calm,
}) => {
  const [tasks, setTasks] = useState<string[]>(() =>
    ns.get<string[]>('zenTasks', DEFAULT_ZEN_TASKS)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputText, setInputText] = useState('');

  const currentTask = tasks[currentIndex % tasks.length] || 'Breathe in pure tranquility 🫧';

  const persistTasks = (nextTasks: string[]) => {
    setTasks(nextTasks);
    ns.set('zenTasks', nextTasks);
  };

  const handleCompleteCurrent = () => {
    sound('chime');
    award('todo-zen-list:mindful-moment');

    if (!hush) {
      toast('Tranquil accomplishment realized in stillness 🌅✨', 'success');
    }

    // Advance to next task
    setCurrentIndex((prev) => (prev + 1) % tasks.length);
  };

  const handleBreathe = () => {
    sound('droplet');
    if (!hush) {
      toast('Exhaling backlog thoughts... rotating focus 🧘🌊', 'info');
    }
    // Pseudo-random walk to another index
    const nextIdx = (currentIndex + 1 + Math.floor(Math.random() * (tasks.length - 1))) % tasks.length;
    setCurrentIndex(nextIdx);
  };

  const handleAddQuietTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTask = trimmed.includes(' ') && !/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/.test(trimmed)
      ? `${trimmed} 🧘`
      : trimmed;

    const nextTasks = [...tasks, newTask];
    persistTasks(nextTasks);
    setInputText('');
    sound('bloop');

    if (!hush) {
      toast('Task gently woven into the intuitive horizon stream 🌅', 'info');
    }
  };

  return (
    <div className={`feat-todo-zen-list ${calm ? 'calm-mode' : ''}`}>
      <div
        className="horizon-mirror"
        title="Upon the glossy surface blue / A single droplet rests for you / In tranquil peace the hour moves / And clarity your spirit proves 🖋️🌅"
      >
        <div className="horizon-title">
          🌅 Horizon Reflection Sanctuary
        </div>
      </div>

      <div className="monotask-orb">
        <div style={{ fontSize: '12px', color: '#0088cc', fontWeight: 600 }}>
          Present Moment Focus 🧘
        </div>
        <div className="task-focus-text">
          {currentTask}
        </div>
        <div className="zen-controls">
          <button
            type="button"
            className="zen-action-btn"
            onClick={handleCompleteCurrent}
          >
            Fulfill Task ✨
          </button>
          <button
            type="button"
            className="breathe-btn"
            onClick={handleBreathe}
          >
            Breathe 🫧
          </button>
        </div>
      </div>

      <form onSubmit={handleAddQuietTask} className="add-box-minimal">
        <input
          type="text"
          className="zen-input"
          placeholder="Whisper a new intuitive task... ✍️"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type="submit"
          className="breathe-btn"
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          Add ➕
        </button>
      </form>

      <div className="zen-poem-tooltip">
        "Upon the glossy surface blue, a single droplet rests for you." 🖋️🌅
      </div>
    </div>
  );
};

export default Feature;
