import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import './feature.css';

interface Task {
  id: number | string;
  title: string;
  completed: boolean;
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, title: 'Drink crystal glacier water 💧', completed: false },
  { id: 2, title: 'Align glossy lens flare 🌅', completed: false },
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
  const [tasks, setTasks] = useState<Task[]>(() => ns.get<Task[]>('tasks', DEFAULT_TASKS));
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const showDolphinCheer = ns.get<boolean>('showDolphinCheer', true);

  const persistTasks = (nextTasks: Task[]) => {
    setTasks(nextTasks);
    ns.set('tasks', nextTasks);
  };

  const handleAddTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: Date.now(),
      title: trimmed.includes(' ') && !/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/.test(trimmed)
        ? `${trimmed} ✨`
        : trimmed,
      completed: false,
    };

    const nextTasks = [...tasks, newTask];
    persistTasks(nextTasks);
    setInputText('');
    sound('bloop');

    if (!hush) {
      toast(`Task created: "${newTask.title}" 📝`, 'info');
    }
  };

  const handleToggleTask = (id: number | string) => {
    let nowCompleted = false;
    const nextTasks = tasks.map((t) => {
      if (t.id === id) {
        nowCompleted = !t.completed;
        return { ...t, completed: !t.completed };
      }
      return t;
    });

    persistTasks(nextTasks);

    if (nowCompleted) {
      sound('chime');
      award('todo-classic-list:first-done');
      if (!hush) {
        toast('Crystalline task accomplished! 🏆✨', 'success');
      }
    } else {
      sound('droplet');
    }
  };

  const handleDeleteTask = (id: number | string) => {
    const nextTasks = tasks.filter((t) => t.id !== id);
    persistTasks(nextTasks);
    sound('whoosh');
    if (!hush) {
      toast('Task released into the horizon! 🌊', 'info');
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className={`feat-todo-classic-list ${calm ? 'calm-mode' : ''}`}>
      <div className="header-bar">
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#0B4F8A' }}>
            ☑️ Classic Task Matrix
          </div>
          <div style={{ fontSize: '12px', color: '#5A7D9A' }}>
            {completedCount} of {tasks.length} tasks synergized ✨
          </div>
        </div>
        {showDolphinCheer && (
          <div className="dolphin-badge" title="Dewey's Dolphin Companion Mode">
            <span>🐬</span>
            <span>Dewey Cheering!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleAddTask} className="add-box">
        <input
          type="text"
          className="task-input"
          placeholder="Type a new task and achieve glory... ✍️"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="add-button">
          Add ➕
        </button>
      </form>

      <div className="filter-bar">
        <button
          type="button"
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length}) 📋
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({tasks.length - completedCount}) ⚡
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Done ({completedCount}) ✅
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-title">Pristine Ocean Horizon 🌊</div>
          <div className="empty-story">
            Once upon a crystal horizon, Dewey the dolphin swam through an empty ocean of tasks waiting for inspiration. He leaped with joy knowing that your next action will fill this space with pure synergy! 🐬✨
          </div>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((t) => (
            <div key={t.id} className={`task-item ${t.completed ? 'completed' : ''}`}>
              <div className="task-label-wrap" onClick={() => handleToggleTask(t.id)}>
                <div className="task-checkbox">
                  {t.completed && <span>✓</span>}
                </div>
                <span className="task-text">{t.title}</span>
              </div>
              <button
                type="button"
                className="delete-btn"
                title="Delete task"
                onClick={() => handleDeleteTask(t.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      {!hush && showDolphinCheer && (
        <div
          style={{
            fontSize: '12px',
            color: '#0B4F8A',
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '6px 12px',
            borderRadius: '8px',
            textAlign: 'center',
            fontStyle: 'italic',
            border: '1px solid rgba(0, 200, 230, 0.25)',
          }}
        >
          Dewey says: "{mascot.say('happy')}" 🐬
        </div>
      )}
    </div>
  );
};

export default Feature;
