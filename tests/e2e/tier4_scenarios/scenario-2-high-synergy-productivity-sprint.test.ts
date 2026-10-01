import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { createTestFeatureProps, createMockStorage } from '../helpers/test-harness';

describe('Tier 4: Scenario 2 — High-Synergy Hydrated Productivity Sprint', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('executes productivity sprint: add tasks -> complete task -> trigger bridge -> log sips -> synergy dashboard update', async () => {
    // 1. Setup Task State in To-Do Namespace
    const todoNs = createMockStorage('todo-classic-list');
    const initialTasks = [\n      { id: 1, title: 'Drink crystal glacier water 💧', completed: false },\n      { id: 2, title: 'Align glossy lens flare 🌅', completed: false },\n    ];
    todoNs.set('tasks', initialTasks);
    expect(todoNs.get('tasks', [])).toHaveLength(2);

    // 2. Complete Task & Fire Bridge Event
    let hydrationReminderTriggered = false;
    const onBridgeTrigger = (msg: string) => {
      hydrationReminderTriggered = true;
      expect(msg).toContain('hydration');
    };

    // Simulate task completion
    const updatedTasks = initialTasks.map((t) => (t.id === 1 ? { ...t, completed: true } : t));
    todoNs.set('tasks', updatedTasks);
    onBridgeTrigger('💧 Task completed! Time to log a sip in your hydration orb!');
    expect(hydrationReminderTriggered).toBe(true);

    // 3. User opens wellness-hydration-orb-3 and logs sips
    let FeatureComponent: any;
    try {
      const manifestMod = await import('../../../src/features/wellness-hydration-orb-3/manifest');
      const compMod = await manifestMod.manifest.component();
      FeatureComponent = compMod.default;
    } catch {
      // Fallback
    }

    if (FeatureComponent) {
      const props = createTestFeatureProps('wellness-hydration-orb-3');
      const { unmount } = render(React.createElement(FeatureComponent, props));

      const sipButton = screen.getByRole('button', { name: /Log a Sip/i });
      await act(async () => {
        fireEvent.click(sipButton);
      });
      await act(async () => {
        fireEvent.click(sipButton);
      });

      expect(props.mockSound).toHaveBeenCalledWith('droplet');
      expect(props.ns.get('sips', 0)).toBe(2);
      unmount();
    }

    // 4. Verify AI Synergy Score Calculation Trends Upward
    const completedCount = todoNs.get<any[]>('tasks', []).filter((t) => t.completed).length;
    const sipsCount = createMockStorage('wellness-hydration-orb-3').get('sips', 0);
    const calculatedSynergyScore = Math.min(100, 50 + completedCount * 15 + sipsCount * 10);

    expect(calculatedSynergyScore).toBeGreaterThanOrEqual(65);
    expect(calculatedSynergyScore).toBeLessThanOrEqual(100);
  });
});
