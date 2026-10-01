// Web Audio API Procedural Synthesizer per §7.5, §9.3

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isMuted: boolean = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    try {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.8, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    } catch (e) {
      console.warn('[AeroAudio] AudioContext creation failed:', e);
      return null;
    }
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

export function setMasterMute(mute: boolean): void {
  isMuted = mute;
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(mute ? 0 : 0.8, audioCtx.currentTime);
  }
}

export function isMasterMuted(): boolean {
  return isMuted;
}

export type SoundEffect = 'bloop' | 'chime' | 'droplet' | 'sparkle' | 'whoosh';

export function playSound(name: SoundEffect): void {
  if (isMuted) return;

  const ctx = getAudioContext();
  if (!ctx || !masterGain) return;

  const now = ctx.currentTime;

  try {
    switch (name) {
      case 'bloop': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      case 'chime': {
        const freqs = [880, 1320, 1760];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.2 / (idx + 1), now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(now + idx * 0.03);
          osc.stop(now + 1.3);
        });
        break;
      }

      case 'droplet': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.12);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }

      case 'sparkle': {
        const pings = [1200, 1600, 2100, 2800];
        pings.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);

          gain.gain.setValueAtTime(0.18, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.18);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.2);
        });
        break;
      }

      case 'whoosh': {
        // Procedural noise buffer
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(1800, now + 0.25);
        filter.frequency.exponentialRampToValueAtTime(400, now + 0.5);
        filter.Q.setValueAtTime(3.0, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        noise.start(now);
        noise.stop(now + 0.5);
        break;
      }
    }
  } catch (err) {
    console.warn('[AeroAudio] playSound error:', err);
  }
}