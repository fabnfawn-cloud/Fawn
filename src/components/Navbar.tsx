import { useState } from 'react';
import { Volume2, VolumeX, ShieldCheck, Sparkles, HeartHandshake, Baby, Mic } from 'lucide-react';
import { sound, CHARACTER_PERSONAS } from '../utils/audio';
import { ParentGateModal } from './ParentGateModal';
import { VoiceSettingsModal } from './common/VoiceSettingsModal';

interface NavbarProps {
  currentMode: 'toddler' | 'parent';
  onModeChange: (mode: 'toddler' | 'parent') => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export function Navbar({
  currentMode,
  onModeChange,
  audioEnabled,
  onToggleAudio,
}: NavbarProps) {
  const [showGate, setShowGate] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const activePersona = CHARACTER_PERSONAS[sound.preferences.activePersona] || CHARACTER_PERSONAS.fawn;

  const handleParentClick = () => {
    sound.playPop();
    if (currentMode === 'toddler') {
      setShowGate(true);
    } else {
      onModeChange('parent');
    }
  };

  const handleToddlerClick = () => {
    sound.playPop();
    onModeChange('toddler');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Characters Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-800 shadow-sm">
                <span className="text-2xl" role="img" aria-label="Fawn deer">🦌</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
                    Fawn & Fable
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> Safe Space
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium hidden sm:block">
                  Toddler Early Learning & Gentle Parent Guide
                </p>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center bg-stone-100/90 p-1.5 rounded-2xl border border-stone-200/80">
              <button
                id="toddler-mode-btn"
                onClick={handleToddlerClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  currentMode === 'toddler'
                    ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-400/40'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                <Baby className="w-4 h-4" />
                <span>Toddler Meadow</span>
              </button>

              <button
                id="parent-mode-btn"
                onClick={handleParentClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  currentMode === 'parent'
                    ? 'bg-stone-800 text-amber-100 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Parent Sanctuary</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-800 px-1.5 py-0.5 rounded-md font-semibold">
                  AI
                </span>
              </button>
            </div>

            {/* Sound & Audio Controls */}
            <div className="flex items-center gap-2">
              <button
                id="voice-settings-btn"
                onClick={() => {
                  sound.playPop();
                  setShowVoiceModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-300/80 bg-amber-50/80 hover:bg-amber-100 text-stone-800 text-xs font-bold transition-all shadow-xs"
                title="Adjust warm storybook voice & tone"
                aria-label="Storybook voice settings"
              >
                <span className="text-base">{activePersona.emoji}</span>
                <span className="hidden sm:inline">Voice:</span>
                <span className="font-extrabold text-amber-900">{activePersona.name}</span>
              </button>

              <button
                id="sound-toggle-btn"
                onClick={() => {
                  onToggleAudio();
                  if (!audioEnabled) sound.playSuccess();
                }}
                className={`p-2.5 rounded-xl border transition-all ${
                  audioEnabled
                    ? 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                    : 'bg-stone-100 border-stone-200 text-stone-400 hover:bg-stone-200'
                }`}
                title={audioEnabled ? 'Sound effects active' : 'Sound effects muted'}
                aria-label={audioEnabled ? 'Mute sound' : 'Unmute sound'}
              >
                {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>

              {currentMode === 'toddler' && (
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-medium text-amber-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span>Kid-Proof Zone</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <VoiceSettingsModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
      />

      <ParentGateModal
        isOpen={showGate}
        onClose={() => setShowGate(false)}
        onSuccess={() => onModeChange('parent')}
        targetDescription="open the Parent Sanctuary & AI Advisor"
      />
    </>
  );
}
