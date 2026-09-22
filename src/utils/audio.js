// Web Audio API Sound Synthesizer for Funky 8-Bit Retro Sound Effects
// Zero external sound files needed, completely offline, zero latency!

let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Check if sound is muted in localStorage
export const getIsMuted = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('TASK_CHAOS_MUTED') === 'true';
};

export const setIsMutedStorage = (muted) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('TASK_CHAOS_MUTED', muted ? 'true' : 'false');
  }
};

// Play a single synthesized note
const playTone = (freq, duration, type = 'sine', startDelay = 0, volume = 0.15) => {
  if (getIsMuted()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);

    gain.gain.setValueAtTime(volume, ctx.currentTime + startDelay);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startDelay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + startDelay);
    osc.stop(ctx.currentTime + startDelay + duration);
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
};

// 1. Funky Pop sound when adding task
export const playPop = () => {
  if (getIsMuted()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch {
    // Ignore audio context errors before user gesture
  }
};

// 2. Triumphant victory chime when completing task
export const playSuccess = () => {
  if (getIsMuted()) return;
  playTone(523.25, 0.1, 'sine', 0, 0.2);       // C5
  playTone(659.25, 0.1, 'sine', 0.08, 0.2);    // E5
  playTone(783.99, 0.1, 'sine', 0.16, 0.22);   // G5
  playTone(1046.50, 0.25, 'triangle', 0.24, 0.25); // C6
};

// 3. Funny slide whistle / uncheck sound
export const playUncheck = () => {
  if (getIsMuted()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch {}
};

// 4. Yeet sound when deleting a task
export const playYeet = () => {
  if (getIsMuted()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.22);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.23);
  } catch {}
};

// 5. Subtle button click
export const playClick = () => {
  playTone(800, 0.03, 'sine', 0, 0.08);
};

// 6. Grand victory fanfare when 100% done
export const playFanfare = () => {
  if (getIsMuted()) return;
  const notes = [
    { freq: 523.25, time: 0, dur: 0.12 },
    { freq: 523.25, time: 0.13, dur: 0.12 },
    { freq: 523.25, time: 0.26, dur: 0.12 },
    { freq: 659.25, time: 0.39, dur: 0.2 },
    { freq: 587.33, time: 0.60, dur: 0.12 },
    { freq: 659.25, time: 0.73, dur: 0.12 },
    { freq: 783.99, time: 0.86, dur: 0.35 },
  ];
  notes.forEach(n => playTone(n.freq, n.dur, 'triangle', n.time, 0.25));
};
