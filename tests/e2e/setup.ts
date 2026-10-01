import { vi } from 'vitest';

// 1. Mock Web Audio API for jsdom environment
class MockAudioNode {
  connect() { return this; }
  disconnect() {}
}

class MockGainNode extends MockAudioNode {
  gain = {
    value: 1,
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  };
}

class MockOscillatorNode extends MockAudioNode {
  frequency = {
    value: 440,
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  };
  type = 'sine';
  start = vi.fn();
  stop = vi.fn();
}

class MockBiquadFilterNode extends MockAudioNode {
  frequency = {
    value: 1000,
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
  };
  Q = {
    value: 1,
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
  };
  type = 'lowpass';
}

class MockAudioBufferSourceNode extends MockAudioNode {
  buffer: any = null;
  start = vi.fn();
  stop = vi.fn();
}

class MockAudioContext {
  state: 'running' | 'suspended' | 'closed' = 'running';
  currentTime = 0;
  destination = new MockAudioNode();
  createGain = vi.fn(() => new MockGainNode());
  createOscillator = vi.fn(() => new MockOscillatorNode());
  createBiquadFilter = vi.fn(() => new MockBiquadFilterNode());
  createBufferSource = vi.fn(() => new MockAudioBufferSourceNode());
  createBuffer = vi.fn((channels, length, sampleRate) => ({
    numberOfChannels: channels,
    length,
    sampleRate,
    getChannelData: vi.fn(() => new Float32Array(length)),
  }));
  resume = vi.fn().mockResolvedValue(undefined);
  close = vi.fn().mockResolvedValue(undefined);
}

if (typeof window !== 'undefined') {
  (window as any).AudioContext = (window as any).AudioContext || MockAudioContext;
  (window as any).webkitAudioContext = (window as any).webkitAudioContext || MockAudioContext;

  // 2. Mock matchMedia (defaults to no prefers-reduced-motion)
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }

  // 3. Mock Canvas 2D Context for procedural backgrounds & bubbles
  if (typeof HTMLCanvasElement !== 'undefined') {
    HTMLCanvasElement.prototype.getContext = function (contextType: string) {
      if (contextType === '2d') {
        return {
          canvas: this,
          clearRect: vi.fn(),
          fillRect: vi.fn(),
          strokeRect: vi.fn(),
          beginPath: vi.fn(),
          closePath: vi.fn(),
          arc: vi.fn(),
          fill: vi.fn(),
          stroke: vi.fn(),
          save: vi.fn(),
          restore: vi.fn(),
          translate: vi.fn(),
          rotate: vi.fn(),
          scale: vi.fn(),
          createLinearGradient: vi.fn(() => ({
            addColorStop: vi.fn(),
          })),
          createRadialGradient: vi.fn(() => ({
            addColorStop: vi.fn(),
          })),
        } as any;
      }
      return null;
    } as any;
  }

  // 4. Mock requestAnimationFrame / cancelAnimationFrame
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback: FrameRequestCallback) => {
      return setTimeout(() => callback(performance.now()), 16) as unknown as number;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id: number) => {
      clearTimeout(id);
    };
  }
}
