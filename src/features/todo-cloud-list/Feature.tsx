import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import './feature.css';

export interface CloudTask {
  id: number | string;
  title: string;
  tethered: boolean;
  completed: boolean;
}

const DEFAULT_CLOUD_TASKS: CloudTask = [
  { id: 1, title: 'Observe high-altitude cirrus clouds ☁️', tethered: false, completed: false },
  { id: 2, title: 'Sync with VapourCon 2007 keynote 🎤', tethered: true, completed: false },
];

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  hush,
  calm,
}) => {
  const [tasks, setTasks] = useState<CloudTask[]>(() =>
    ns.get<CloudTask[]>('cloudTasks', DEFAULT_CLOUD_TASKS)
  );
  const [inputText, setInputText] = useState('');
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  const persistTasks = (nextTasks: CloudTask[]) => {
    setTasks(nextTasks);
    ns.set('cloudTasks', nextTasks);
  };

  const handleAddCloudTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTask: CloudTask = {
      id: Date.now(),
      title: trimmed.includes(' ') && !/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/.test(trimmed)
        ? `${trimmed} ☁️`
        : trimmed,
      tethered: false,
      completed: false,
    };

    const nextTasks = [...tasks, newTask];
    persistTasks(nextTasks);
    setInputText('');
    sound('whoosh');

    if (!hush) {
      toast(`Cumulus task launched to the azure sky: "${newTask.title}" ☁️✨`, 'info');
    }
  };

  const handleToggleTether = (id: number | string) => {
    const nextTasks = tasks.map((t) =>
      t.id === id ? { ...t, tethered: !t.tethered } : t
    );
    persistTasks(nextTasks);
    sound('bloop');
    award('todo-cloud-list:cumulus-master');
  };

  const handleToggleComplete = (id: number | string) => {
    let nowDone = false;
    const nextTasks = tasks.map((t) => {
      if (t.id === id) {
        nowDone = !t.completed;
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    persistTasks(nextTasks);

    if (nowDone) {
      sound('chime');
      award('todo-cloud-list:cumulus-master');
      if (!hush) {
        toast('Cloud task dissolved into refreshing rain! 🌧️✨', 'success');
      }
    } else {
      sound('droplet');
    }
  };

  const handleDelete = (id: number | string) => {
    const nextTasks = tasks.filter((t) => t.id !== id);
    persistTasks(nextTasks);
    sound('whoosh');
  };

  // Card-017 pretend cloud sync
  const handlePretendCloudSync = () => {
    setIsCloudSyncing(true);
    sound('whoosh');
    setTimeout(() => {
      setIsCloudSyncing(false);
      sound('chime');
      if (!hush) {
        toast('Synchronized with local storage masquerading as cloud! ☁️💾', 'success');
      }
    }, 1200);
  };

  return (
    <div className={`feat-todo-cloud-list ${calm ? 'calm-mode' : ''}`}>
      <div className="sky-header">
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#0B4F8A' }}>
            ☁️ Cumulus Sky Grid
          </div>
          <div style={{ fontSize: '12px', color: '#5A7D9A' }}>
            Cluster: VapourCon '07 Cupertino Cloudstream 🌐
          </div>
        </div>
        <div className="vapourcon-tag">
          VapourCon '07 ☁️
        </div>
      </div>

      <div className="cloud-pretend-banner">
        <span>
          {isCloudSyncing ? 'Simulating Uplink to Cupertino Cumulus ☁️...' : 'Status: 100% Local (zero network calls) 💾'}
        </span>
        <button
          type="button"
          className="tether-btn"
          style={{ padding: '2px 8px', fontSize: '11px' }}
          onClick={handlePretendCloudSync}
          disabled={isCloudSyncing}
        >
          {isCloudSyncing ? 'Syncing... ⏳' : 'Sync Cloud ☁️'}
        </button>
      </div>

      <form onSubmit={handleAddCloudTask} className="add-box">
        <input
          type="text"
          className="cloud-input"
          placeholder="Launch a cloud task into the sky... ☁️"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="cloud-add-btn">
          Drift ➕
        </button>
      </form>

      <div className="sky-arena">
        {tasks.map((t) => (
          <div
            key={t.id}
            className={`cloud-item ${t.tethered ? 'tethered' : ''} ${t.completed ? 'completed' : ''}`}
          >
            <div
              className="cloud-task-title"
              onClick={() => handleToggleComplete(t.id)}
              title="Click to complete"
            >
              <span>{t.completed ? '🌧️' : '☁️'} </span>
              <span>{t.title}</span>
            </div>

            <div className="cloud-actions">
              <button
                type="button"
                className="tether-btn"
                title={t.tethered ? 'Release Tether' : 'Pin/Tether in place'}
                onClick={() => handleToggleTether(t.id)}
              >
                {t.tethered ? 'Anchored ⚓' : 'Tether 📌'}
              </button>
              <button
                type="button"
                className="tether-btn"
                style={{ color: '#c0392b' }}
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
