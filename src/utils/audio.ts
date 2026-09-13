/**
 * Web Audio API synthesizer and warm, natural Speech Synthesis engine
 * Calibrated for toddler learning: soft, rich acoustic harmonics and natural human pacing.
 */

export type CharacterPersonaId = 'fawn' | 'pippa' | 'milo' | 'barnaby' | 'willow';

export interface CharacterPersona {
  id: CharacterPersonaId;
  name: string;
  role: string;
  emoji: string;
  basePitch: number;
  baseRate: number;
  description: string;
}

export const CHARACTER_PERSONAS: Record<CharacterPersonaId, CharacterPersona> = {
  fawn: {
    id: 'fawn',
    name: 'Fawn',
    role: 'Warm Storyteller',
    emoji: '🌸',
    basePitch: 1.02, // Natural, warm human pitch (avoids robotic tinny high-pitch)
    baseRate: 0.92,  // Gentle, measured storybook rhythm
    description: 'Cozy, soothing maternal storybook narrator',
  },
  pippa: {
    id: 'pippa',
    name: 'Pippa Owl',
    role: 'Phonics Guide',
    emoji: '🦉',
    basePitch: 1.06,
    baseRate: 0.95,
    description: 'Clear, crisp, encouraging letter sounds',
  },
  milo: {
    id: 'milo',
    name: 'Milo Bunny',
    role: 'Playful Friend',
    emoji: '🐰',
    basePitch: 1.08,
    baseRate: 0.98,
    description: 'Bouncy, cheerful doodle companion',
  },
  barnaby: {
    id: 'barnaby',
    name: 'Barnaby Bear',
    role: 'Cozy Bear',
    emoji: '🐻',
    basePitch: 0.93, // Grounding, deep, warm teddy bear resonance
    baseRate: 0.88,
    description: 'Deep, comforting forest counting guide',
  },
  willow: {
    id: 'willow',
    name: 'Willow Fox',
    role: 'Mindful Breath',
    emoji: '🦊',
    basePitch: 0.98,
    baseRate: 0.84, // Gentle slow pacing for meditation
    description: 'Whisper-soft, calming mindfulness presence',
  },
};

export interface VoicePreferences {
  activePersona: CharacterPersonaId;
  pitchModifier: number; // -0.2 to +0.2 offset
  rateModifier: number;  // -0.2 to +0.2 offset
  selectedVoiceURI: string | null;
  playWarmChime: boolean;
}

const VOICE_PREFS_KEY = 'fawn_fable_voice_prefs';

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  public preferences: VoicePreferences = {
    activePersona: 'fawn',
    pitchModifier: 0,
    rateModifier: 0,
    selectedVoiceURI: null,
    playWarmChime: true,
  };

  constructor() {
    this.loadPreferences();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  private loadPreferences() {
    try {
      const saved = localStorage.getItem(VOICE_PREFS_KEY);
      if (saved) {
        this.preferences = { ...this.preferences, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
  }

  public savePreferences(prefs: Partial<VoicePreferences>) {
    this.preferences = { ...this.preferences, ...prefs };
    try {
      localStorage.setItem(VOICE_PREFS_KEY, JSON.stringify(this.preferences));
    } catch {
      // ignore
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.cachedVoices = window.speechSynthesis.getVoices();
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.cachedVoices.length && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
    }
    return this.cachedVoices;
  }

  /**
   * Score voices to pick the warmest, most natural human storyteller voice
   * Avoids mechanical/robotic synthesizers (like eSpeak)
   */
  public getBestWarmVoice(): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();
    if (!voices.length) return null;

    // Check if user has explicitly chosen a voice
    if (this.preferences.selectedVoiceURI) {
      const chosen = voices.find((v) => v.voiceURI === this.preferences.selectedVoiceURI);
      if (chosen) return chosen;
    }

    const scored = voices.map((voice) => {
      let score = 0;
      const name = voice.name.toLowerCase();
      const lang = voice.lang.toLowerCase();

      // Strong penalty for known robotic/metallic sound fonts
      if (name.includes('espeak') || name.includes('klatt') || name.includes('croak') || name.includes('whisper')) {
        score -= 200;
      }

      // High praise for modern Natural / Neural / Premium models
      if (name.includes('natural') || name.includes('neural')) score += 120;
      if (name.includes('enhanced') || name.includes('premium')) score += 90;
      if (name.includes('online')) score += 50;

      // High-quality warm female/storybook voices
      if (
        name.includes('samantha') ||
        name.includes('victoria') ||
        name.includes('karen') ||
        name.includes('serena') ||
        name.includes('moira') ||
        name.includes('tessa') ||
        name.includes('fiona') ||
        name.includes('jenny') ||
        name.includes('aria') ||
        name.includes('zira') ||
        name.includes('google us english') ||
        name.includes('google uk english female')
      ) {
        score += 80;
      }

      // Prefer English for toddler instructions
      if (lang.startsWith('en')) {
        score += 40;
        if (lang === 'en-us' || lang === 'en-gb') score += 20;
      } else {
        score -= 100;
      }

      return { voice, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.voice || voices[0] || null;
  }

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Soft wooden marimba cushion chime before voice begins
  playWarmVoiceCushion() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(528, now); // 528 Hz gentle comforting frequency

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Gentle bubbly pop when touching buttons or items
  playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Warm wooden xylophone / marimba note for toddler learning
  playNote(frequency: number = 440) {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Sweet celebration sparkle chime when completing a step
  playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq);
      }, idx * 90);
    });
  }

  // Gentle calming bell for mindfulness breath
  playCalmBell() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(528, now); // 528 Hz healing chime

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.5);
  }

  // Sparkling harp glissando for bubble pop and magic stardust
  playHarpGlissando() {
    const ctx = this.getContext();
    if (!ctx) return;
    const freqs = [587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];
    freqs.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }, idx * 45);
    });
  }

  // Bouncy boing sound when tapping characters or bubbles
  playBoing() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(560, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.25);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  }

  // Playful giggle / chirp sound
  playGiggle() {
    const ctx = this.getContext();
    if (!ctx) return;
    [0, 80, 160].forEach((delay, i) => {
      setTimeout(() => {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + i * 150, now);
        osc.frequency.exponentialRampToValueAtTime(950 + i * 100, now + 0.06);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      }, delay);
    });
  }

  // Soft ocean splash / whoosh sound
  playSplash() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.4);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  /**
   * Warm, soothing voice speech synthesis for toddlers
   * Dynamically utilizes the warmest natural storytelling voice, gentle pitch, and friendly cadence.
   */
  speak(text: string, personaId?: CharacterPersonaId) {
    if (!this.enabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();

      // Play soft cushion chime if enabled
      if (this.preferences.playWarmChime) {
        this.playWarmVoiceCushion();
      }

      const activePersonaKey = personaId || this.preferences.activePersona || 'fawn';
      const persona = CHARACTER_PERSONAS[activePersonaKey] || CHARACTER_PERSONAS.fawn;

      const utterance = new SpeechSynthesisUtterance(text);

      // Select warm natural voice
      const bestVoice = this.getBestWarmVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
        utterance.lang = bestVoice.lang || 'en-US';
      }

      // Calculate warm pitch and measured rate
      // Clamped to natural human spectrum (0.85 to 1.15) to completely eliminate tinny/robotic artifacts
      const calculatedPitch = Math.max(0.82, Math.min(1.18, persona.basePitch + this.preferences.pitchModifier));
      const calculatedRate = Math.max(0.75, Math.min(1.15, persona.baseRate + this.preferences.rateModifier));

      utterance.pitch = calculatedPitch;
      utterance.rate = calculatedRate;
      utterance.volume = 1.0;

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore if speech synthesis unavailable
    }
  }
}

export const sound = new SoundEffects();

