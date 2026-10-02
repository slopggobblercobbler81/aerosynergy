import React, { useState, useEffect } from 'react';
import { FeatureProps } from '../../core/types';
import './feature.css';

export interface QuantumTask {
  id: number | string;
  title: string;
  state: 'superposition' | 'done' | 'synergy-needed';
  observedAt?: number;
}

const DEFAULT_QUANTUM_TASKS: QuantumTask = [
  { id: 1, title: 'Harmonize quantum caustics 🌊', state: 'superposition' },
  { id: 2, title: 'Observe crystalline wave function ⚛️', state: 'superposition' },
];

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  hush,
  calm,
}) => {
  const [tasks, setTasks] = useState<QuantumTask[]>(() =>
    ns.get<QuantumTask[]>('quantumTasks', DEFAULT_QUANTUM_TASKS)
  );
  const [inputText, setInputText] = useState('');
  const [leafCount, setLeafCount] = useState<number>(() => ns.get<number>('leafCount', 1));
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrateProgress, setCalibrateProgress] = useState(0);

  const collapseProbability = ns.get<number>('collapseProbability', 70);

  const persistTasks = (nextTasks: QuantumTask[]) => {
    setTasks(nextTasks);
    ns.set('quantumTasks', nextTasks);
  };

  const handleAddTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTask: QuantumTask = {
      id: Date.now(),
      title: trimmed.includes(' ') && !/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/.test(trimmed)
        ? `${trimmed} ⚛️`
        : trimmed,
      state: 'superposition',
    };

    const nextTasks = [...tasks, newTask];
    persistTasks(nextTasks);
    setInputText('');
    sound('bloop');

    if (!hush) {
      toast('Task injected into quantum superposition! ⚛️✨', 'info');
    }
  };

  const handleObserve = (id: number | string) => {
    // 70% probability of Done, 30% Need More Synergy
    const roll = Math.random() * 100;
    const isDone = roll < collapseProbability;
    const nextState: 'done' | 'synergy-needed' = isDone ? 'done' : 'synergy-needed';

    const nextTasks = tasks.map((t) =>
      t.id === id ? { ...t, state: nextState, observedAt: Date.now() } : t
    );
    persistTasks(nextTasks);

    // Botanical growth (card-012)
    const nextLeaves = leafCount + 1;
    setLeafCount(nextLeaves);
    ns.set('leafCount', nextLeaves);

    if (isDone) {
      sound('sparkle');
      award('todo-quantum-list:wave-collapse');
      if (!hush) {
        toast('Wave function collapsed to: ACCOMPLISHED! 🌟🎉', 'success');
      }
    } else {
      sound('bloop');
      if (!hush) {
        toast('Wave function collapsed to: Need More Synergy! ⚡', 'info');
      }
    }
  };

  const handleReEntangle = (id: number | string) => {
    const nextTasks = tasks.map((t) =>
      t.id === id ? { ...t, state: 'superposition' as const } : t
    );
    persistTasks(nextTasks);
    sound('whoosh');
  };

  const handleDelete = (id: number | string) => {
    const nextTasks = tasks.filter((t) => t.id !== id);
    persistTasks(nextTasks);
    sound('droplet');
  };

  // 7-second calibration loading bar (card-002)
  const handleStartCalibration = () => {
    if (isCalibrating) return;
    setIsCalibrating(true);
    setCalibrateProgress(0);
    sound('whoosh');

    const intervalTime = 100;
    const totalSteps = 70; // 70 * 100ms = 7000ms = 7 seconds
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCalibrateProgress(Math.min(100, Math.round((currentStep / totalSteps) * 100)));
      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setIsCalibrating(false);
        sound('chime');
        if (!hush) {
          toast('Quantum Entanglement calibrated with 100% confidence! ⚛️✨', 'success');
        }
      }
    }, intervalTime);
  };

  const plantDisplay = '🌿'.repeat(Math.min(5, Math.max(1, Math.floor(leafCount / 2))));

  return (
    <div className={`feat-todo-quantum-list ${calm ? 'calm-mode' : ''}`}>
      <div className="quantum-header">
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#0B4F8A' }}>
            ⚛️ Quantum Wave Matrix
          </div>
          <div style={{ fontSize: '12px', color: '#5A7D9A' }}>
            Probability bias: {collapseProbability}% Done 🌊
          </div>
        </div>
        <div className="sprout-badge" title="Botanical quantum growth (card-012)">
          <span>{plantDisplay}</span>
          <span>Level {leafCount} 🍃</span>
        </div>
      </div>

      <form onSubmit={handleAddTask} className="add-box">
        <input
          type="text"
          className="quantum-input"
          placeholder="Superposition task (e.g. Savor quantum breeze 🫧)..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="quantum-add-btn">
          Entangle ➕
        </button>
      </form>

      <div className="calibrate-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#0B4F8A' }}>
            Entanglement Calibrator (Takes 7s) ⏳
          </span>
          <button
            type="button"
            className="observe-btn"
            style={{ padding: '3px 8px', fontSize: '11px' }}
            onClick={handleStartCalibration}
            disabled={isCalibrating}
          >
            {isCalibrating ? `Calibrating (${calibrateProgress}%) ⏳` : 'Calibrate 7s 🔄'}
          </button>
        </div>
        {isCalibrating && (
          <div className="calibrate-bar-track">
            <div className="calibrate-bar-fill" style={{ width: `${calibrateProgress}%` }} />
          </div>
        )}
      </div>

      <div className="quantum-task-list">
        {tasks.map((t) => (
          <div key={t.id} className={`quantum-card ${t.state}`}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>
                {t.title}
              </div>
              <div style={{ fontSize: '11px', color: '#557799', marginTop: '2px' }}>
                {t.state === 'superposition' && 'State: Shimmering Superposition ⚛️'}
                {t.state === 'done' && 'State: Collapsed to DONE! ✅'}
                {t.state === 'synergy-needed' && 'State: Needs More Synergy! ⚡'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {t.state === 'superposition' ? (
                <button
                  type="button"
                  className="observe-btn"
                  onClick={() => handleObserve(t.id)}
                >
                  Observe 👁️
                </button>
              ) : (
                <button
                  type="button"
                  className="re-entangle-btn"
                  title="Return to superposition"
                  onClick={() => handleReEntangle(t.id)}
                >
                  Re-entangle 🔄
                </button>
              )}
              <button
                type="button"
                className="re-entangle-btn"
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
