import { useState, useEffect } from 'react';
import { Volume2, Sparkles, Sliders, RefreshCw, Check, Music2, Heart, Play, X } from 'lucide-react';
import { sound, CHARACTER_PERSONAS, CharacterPersonaId, VoicePreferences } from '../../utils/audio';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceSettingsModal({ isOpen, onClose }: VoiceSettingsModalProps) {
  const [preferences, setPreferences] = useState<VoicePreferences>(() => ({ ...sound.preferences }));
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setPreferences({ ...sound.preferences });
    const loadVoices = () => {
      const v = sound.getAvailableVoices();
      setAvailableVoices(v);
    };
    loadVoices();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePersonaSelect = (personaId: CharacterPersonaId) => {
    sound.playPop();
    const updated: VoicePreferences = {
      ...preferences,
      activePersona: personaId,
    };
    setPreferences(updated);
    sound.savePreferences(updated);

    // Give immediate vocal feedback with chosen character tone
    const persona = CHARACTER_PERSONAS[personaId];
    sound.speak(`Hello! I am ${persona.name}. Welcome to our meadow!`, personaId);
  };

  const handlePitchChange = (pitchModifier: number) => {
    const updated = { ...preferences, pitchModifier };
    setPreferences(updated);
    sound.savePreferences(updated);
  };

  const handleRateChange = (rateModifier: number) => {
    const updated = { ...preferences, rateModifier };
    setPreferences(updated);
    sound.savePreferences(updated);
  };

  const handleVoiceChange = (voiceURI: string) => {
    const updated = {
      ...preferences,
      selectedVoiceURI: voiceURI === 'auto' ? null : voiceURI,
    };
    setPreferences(updated);
    sound.savePreferences(updated);
  };

  const handleToggleChime = () => {
    sound.playPop();
    const updated = { ...preferences, playWarmChime: !preferences.playWarmChime };
    setPreferences(updated);
    sound.savePreferences(updated);
  };

  const handleResetDefaults = () => {
    sound.playPop();
    const defaults: VoicePreferences = {
      activePersona: 'fawn',
      pitchModifier: 0,
      rateModifier: 0,
      selectedVoiceURI: null,
      playWarmChime: true,
    };
    setPreferences(defaults);
    sound.savePreferences(defaults);
    sound.speak("Restored warm storybook voice.");
  };

  const handleTestVoice = () => {
    setIsPlayingTest(true);
    const activePersona = CHARACTER_PERSONAS[preferences.activePersona] || CHARACTER_PERSONAS.fawn;
    sound.speak(`Hello little wonder! This is ${activePersona.name} in our warm storybook voice.`, preferences.activePersona);
    setTimeout(() => setIsPlayingTest(false), 3000);
  };

  const bestVoice = sound.getBestWarmVoice();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FFFDF9] rounded-3xl border-2 border-amber-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 via-stone-100 to-rose-100 p-5 sm:p-6 border-b border-amber-200/80 relative">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200/60 text-stone-600 hover:text-stone-900 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 bg-amber-500/20 text-amber-900 rounded-xl">
              <Volume2 className="w-5 h-5 text-amber-700" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-800">
              Acoustic & Voice Settings
            </span>
          </div>

          <h3 className="text-2xl font-black font-serif text-stone-900 leading-tight">
            Warm Storybook Voice
          </h3>
          <p className="text-xs text-stone-600 mt-1 font-medium">
            Fine-tuned for cozy, natural tone without metallic or robotic pitch-shifting.
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Character Voice Persona Selection */}
          <div>
            <label className="block text-xs font-black uppercase text-stone-600 tracking-wider mb-2 flex items-center justify-between">
              <span>Choose Meadow Voice Persona</span>
              <span className="text-[11px] font-normal text-amber-800 lowercase">tap to hear preview</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.values(CHARACTER_PERSONAS) as typeof CHARACTER_PERSONAS[CharacterPersonaId][]).map((p) => {
                const isSelected = preferences.activePersona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handlePersonaSelect(p.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-100/90 border-amber-500 ring-2 ring-amber-400/40 shadow-xs'
                        : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">{p.emoji}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-black text-stone-900 font-serif leading-tight">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium">
                      {p.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Warmth & Pitch Tuning */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-stone-800 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Voice Warmth & Tone</span>
                </span>
                <span className="text-[11px] font-semibold text-amber-800">
                  {preferences.pitchModifier < -0.05
                    ? 'Deep & Grounding'
                    : preferences.pitchModifier > 0.05
                    ? 'Gentle & Bright'
                    : 'Balanced & Warm'}
                </span>
              </div>
              <input
                type="range"
                min="-0.15"
                max="0.15"
                step="0.02"
                value={preferences.pitchModifier}
                onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>Cozy & Deep</span>
                <span>Natural Sweet Spot</span>
                <span>Light & Lively</span>
              </div>
            </div>

            {/* Reading Pace Tuning */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-stone-800 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  <span>Storytelling Pace</span>
                </span>
                <span className="text-[11px] font-semibold text-amber-800">
                  {preferences.rateModifier < -0.05
                    ? 'Unhurried & Calm'
                    : preferences.rateModifier > 0.05
                    ? 'Playful & Spry'
                    : 'Storybook Cadence'}
                </span>
              </div>
              <input
                type="range"
                min="-0.15"
                max="0.15"
                step="0.02"
                value={preferences.rateModifier}
                onChange={(e) => handleRateChange(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>Gentle / Bedtime</span>
                <span>Standard Story</span>
                <span>Active Game</span>
              </div>
            </div>
          </div>

          {/* Browser Synthesizer Voice Selector */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
            <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
              <span>Speech Engine Voice</span>
              {bestVoice && (
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                  Auto-Selected Best
                </span>
              )}
            </label>
            <select
              value={preferences.selectedVoiceURI || 'auto'}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            >
              <option value="auto">
                Automatic (Recommended: {bestVoice ? bestVoice.name : 'System Natural Voice'})
              </option>
              {availableVoices
                .filter((v) => v.lang.startsWith('en'))
                .map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
            </select>
            <p className="text-[10px] text-stone-500 mt-1.5">
              We automatically filter out metallic legacy synthesizers in favor of natural neural storytelling voices.
            </p>
          </div>

          {/* Pre-Voice Chime Cushion */}
          <div className="flex items-center justify-between bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-2.5">
              <Music2 className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="text-xs font-bold text-stone-900 block">
                  Soft Marimba Chime Cue
                </span>
                <span className="text-[10px] text-stone-500 block">
                  Plays a subtle 528Hz organic harmonic before voice begins
                </span>
              </div>
            </div>
            <button
              onClick={handleToggleChime}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                preferences.playWarmChime ? 'bg-amber-500' : 'bg-stone-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  preferences.playWarmChime ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="p-4 sm:p-5 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 px-3 py-2 rounded-xl hover:bg-stone-200/70 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestVoice}
              disabled={isPlayingTest}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 shadow-xs transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-amber-600" />
              <span>{isPlayingTest ? 'Speaking...' : 'Test Voice'}</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="px-5 py-2 rounded-xl text-xs font-black bg-stone-900 hover:bg-stone-800 text-white shadow-sm transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
