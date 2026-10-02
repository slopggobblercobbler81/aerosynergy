import React, { useState } from 'react';
import { FeatureProps } from '../../core/types';
import './feature.css';

export interface SynergyPair {
  id: number | string;
  taskA: { title: string; completed: boolean };
  taskB: { title: string; completed: boolean };
  synergyScore: number;
  explanation: string;
}

const MADLIB_TEMPLATES = [
  'Task A optimizes the quantum throughput required for Task B by 98.4%! ⚡',
  'Executing Task A aligns crystalline corporate caustics directly into Task B! 🌊',
  'Task B achieves 300% greater velocity when fueled by Task A’s momentum! 🚀',
  'Simultaneous alignment induces transcendent executive synergy! 💎',
];

const DEFAULT_PAIRS: SynergyPair[] = [
  {
    id: 1,
    taskA: { title: 'Draft high-velocity keynote slides 📊', completed: false },
    taskB: { title: 'Hydrate with alpine electrolyte water 💧', completed: false },
    synergyScore: 98.7,
    explanation: 'Task A optimizes the quantum throughput required for Task B by 98.4%! ⚡',
  },
  {
    id: 2,
    taskA: { title: 'Align glossy lens flares across UI 🌅', completed: false },
    taskB: { title: 'Savor triumphant Frutiger chime 🔔', completed: false },
    synergyScore: 99.2,
    explanation: 'Executing Task A aligns crystalline corporate caustics directly into Task B! 🌊',
  },
];

const Feature: React.FC<FeatureProps> = ({
  ns,
  toast,
  sound,
  award,
  hush,
  calm,
}) => {
  const [pairs, setPairs] = useState<SynergyPair[]>(() =>
    ns.get<SynergyPair[]>('synergyTasks', DEFAULT_PAIRS)
  );
  const [ribbonCut, setRibbonCut] = useState<boolean>(() =>
    ns.get<boolean>('ribbonCut', false)
  );
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');

  const persistPairs = (nextPairs: SynergyPair[]) => {
    setPairs(nextPairs);
    ns.set('synergyTasks', nextPairs);
  };

  const handleCutRibbon = () => {
    setRibbonCut(true);
    ns.set('ribbonCut', true);
    sound('sparkle');
    award('todo-synergy-list:ceremonial-cut');
    if (!hush) {
      toast('✂️ Grand Ribbon Cut! The Synergy Matrix is officially inaugurated! 🎉✨', 'party');
    }
  };

  const handleAddPair = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const titleA = inputA.trim() || 'Accelerate team velocity ⚡';
    const titleB = inputB.trim() || 'Polish crystalline metrics 💎';

    const randomTemplate =
      MADLIB_TEMPLATES[Math.floor(Math.random() * MADLIB_TEMPLATES.length)];
    const generatedScore = parseFloat((95 + Math.random() * 4.9).toFixed(1));

    const newPair: SynergyPair = {
      id: Date.now(),
      taskA: { title: `${titleA} ⚡`, completed: false },
      taskB: { title: `${titleB} 💎`, completed: false },
      synergyScore: generatedScore,
      explanation: randomTemplate,
    };

    const nextPairs = [...pairs, newPair];
    persistPairs(nextPairs);
    setInputA('');
    setInputB('');
    sound('bloop');

    if (!hush) {
      toast(`Synergy Pair synthesized at ${generatedScore}% resonance! ⚡✨`, 'info');
    }
  };

  const handleToggleTask = (pairId: number | string, which: 'A' | 'B') => {
    let pairFullyAccomplished = false;
    let currentScore = 0;

    const nextPairs = pairs.map((p) => {
      if (p.id === pairId) {
        const nextA = which === 'A' ? { ...p.taskA, completed: !p.taskA.completed } : p.taskA;
        const nextB = which === 'B' ? { ...p.taskB, completed: !p.taskB.completed } : p.taskB;

        if (nextA.completed && nextB.completed) {
          pairFullyAccomplished = true;
          currentScore = p.synergyScore;
        }

        return { ...p, taskA: nextA, taskB: nextB };
      }
      return p;
    });

    persistPairs(nextPairs);

    if (pairFullyAccomplished) {
      sound('chime');
      if (!hush) {
        toast(`CASCADE SYNERGY! Pair harmonized at ${currentScore}% resonance! 🎉💎⚡`, 'party');
      }
    } else {
      sound('droplet');
    }
  };

  const averageSynergy =
    pairs.length > 0
      ? (pairs.reduce((acc, p) => acc + p.synergyScore, 0) / pairs.length).toFixed(1)
      : '99.0';

  return (
    <div className={`feat-todo-synergy-list ${calm ? 'calm-mode' : ''}`}>
      <div className="synergy-header">
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#0B4F8A' }}>
            ⚡ Synergy To-Do List: Dynamic Resonance Matrix
          </div>
          <div style={{ fontSize: '12px', color: '#5A7D9A' }}>
            System-wide Synergy Index: {averageSynergy}% 📈
          </div>
        </div>
        <div className="matrix-score-badge">
          {averageSynergy}% ⚡
        </div>
      </div>

      {!ribbonCut && (
        <div className="ribbon-banner">
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px' }}>
              ✂️ Ceremonial Ribbon Awaiting Inauguration!
            </div>
            <div style={{ fontSize: '11px', opacity: 0.9 }}>
              Click to cut the ceremonial ribbon and commence synergistic operations.
            </div>
          </div>
          <button type="button" className="cut-btn" onClick={handleCutRibbon}>
            Cut Ribbon ✂️
          </button>
        </div>
      )}

      <form onSubmit={handleAddPair} className="add-box">
        <input
          type="text"
          className="synergy-input"
          placeholder="Task Alpha (e.g. Brainstorm)... ⚡"
          value={inputA}
          onChange={(e) => setInputA(e.target.value)}
        />
        <input
          type="text"
          className="synergy-input"
          placeholder="Task Beta (e.g. Execute)... 💎"
          value={inputB}
          onChange={(e) => setInputB(e.target.value)}
        />
        <button type="submit" className="synergy-add-btn">
          Pair ⚡
        </button>
      </form>

      <div className="synergy-cluster">
        {pairs.map((p) => {
          const bothDone = p.taskA.completed && p.taskB.completed;
          return (
            <div
              key={p.id}
              className={`pair-card ${bothDone ? 'paired-completed' : ''}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0077b8' }}>
                  {bothDone ? '✨ FULLY HARMONIZED ✨' : '⚡ Active Synergy Pair'}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#ff9f1a' }}>
                  Resonance: {p.synergyScore}% ⚡
                </span>
              </div>

              <div className={`task-line ${p.taskA.completed ? 'completed' : ''}`}>
                <div
                  className="checkbox-synergy"
                  onClick={() => handleToggleTask(p.id, 'A')}
                >
                  <input
                    type="checkbox"
                    checked={p.taskA.completed}
                    readOnly
                  />
                  <span>{p.taskA.title}</span>
                </div>
              </div>

              <div className={`task-line ${p.taskB.completed ? 'completed' : ''}`}>
                <div
                  className="checkbox-synergy"
                  onClick={() => handleToggleTask(p.id, 'B')}
                >
                  <input
                    type="checkbox"
                    checked={p.taskB.completed}
                    readOnly
                  />
                  <span>{p.taskB.title}</span>
                </div>
              </div>

              <div className="synergy-madlib">
                {p.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feature;
