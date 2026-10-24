// High-tech procedural Web Audio synthesis for interactive skill inspections
// Generates silky-smooth audio cues without external mp3/wav network dependencies.

let sharedAudioCtx: AudioContext | null = null;
let isAudioMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioContextClass();
    }

    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume().catch(() => {
        // User gesture needed; fails silently until interaction
      });
    }

    return sharedAudioCtx;
  } catch {
    return null;
  }
}

export function toggleSkillAudio(muted?: boolean): boolean {
  if (typeof muted === "boolean") {
    isAudioMuted = muted;
  } else {
    isAudioMuted = !isAudioMuted;
  }
  return isAudioMuted;
}

export function isSkillAudioMuted(): boolean {
  return isAudioMuted;
}

/**
 * Holographic chime played when a user clicks a skill pill.
 * Combines two crystalline sine waves with an exponential decay.
 */
export function playSkillClickSound(freqFactor = 1): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(0.14, now + 0.006);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    master.connect(ctx.destination);

    const biquad = ctx.createBiquadFilter();
    biquad.type = "bandpass";
    biquad.frequency.setValueAtTime(1800 * freqFactor, now);
    biquad.Q.value = 1.2;
    biquad.connect(master);

    const baseFrequencies = [880 * freqFactor, 1318.5 * freqFactor]; // A5 & E6 harmonic fifth
    baseFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.94, now + 0.15);

      gain.gain.setValueAtTime(idx === 0 ? 0.9 : 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(gain);
      gain.connect(biquad);

      osc.start(now);
      osc.stop(now + 0.16);
    });
  } catch (err) {
    console.debug("Audio play blocked", err);
  }
}

/**
 * Sci-fi tech scan pulse when the terminal benchmark execution starts.
 */
export function playBenchmarkStartSound(): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.12);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch (err) {
    console.debug("Audio play blocked", err);
  }
}

/**
 * Triumphant dual-harmonic chime when a benchmark diagnostic completes successfully.
 */
export function playBenchmarkCompleteSound(): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [659.25, 987.77, 1318.5]; // E5, B5, E6 chord

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const start = now + idx * 0.04;
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.1, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.24);
    });
  } catch (err) {
    console.debug("Audio play blocked", err);
  }
}

/**
 * Subtle tick on tab switch or filter chip toggle.
 */
export function playTabSwitchSound(): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.035);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch (err) {
    console.debug("Audio play blocked", err);
  }
}

/**
 * Soft downward dismiss sound when closing the inspector.
 */
export function playCloseSound(): void {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.08);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (err) {
    console.debug("Audio play blocked", err);
  }
}
