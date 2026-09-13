/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ToddlerMeadow } from './components/toddler/ToddlerMeadow';
import { ParentSanctuary } from './components/parent/ParentSanctuary';
import { sound } from './utils/audio';
import { Sparkles, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { ParentGateModal } from './components/ParentGateModal';

export default function App() {
  const [currentMode, setCurrentMode] = useState<'toddler' | 'parent'>('toddler');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showGate, setShowGate] = useState(false);
  const [pendingLink, setPendingLink] = useState<string | null>(null);

  const handleToggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    sound.enabled = nextState;
  };

  const handleSafeLinkClick = (url: string) => {
    sound.playPop();
    setPendingLink(url);
    setShowGate(true);
  };

  const handleGateSuccess = () => {
    if (pendingLink) {
      window.open(pendingLink, '_blank', 'noopener,noreferrer');
      setPendingLink(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9F3] text-stone-800 flex flex-col font-sans">
      {/* Navigation & Brand Header */}
      <Navbar
        currentMode={currentMode}
        onModeChange={(mode) => setCurrentMode(mode)}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentMode === 'toddler' ? (
          <ToddlerMeadow />
        ) : (
          <ParentSanctuary />
        )}
      </div>

      {/* Storybook Footer */}
      <footer className="bg-[#FAF7F2] border-t border-amber-200/80 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl border border-amber-300">
              🦌
            </div>
            <div>
              <span className="font-serif font-bold text-stone-900 text-lg block">
                Fawn & Fable
              </span>
              <p className="text-xs text-stone-500 font-medium">
                Nurturing toddler wonder, early literacy, and calm hearts.
              </p>
            </div>
          </div>

          {/* Official Brand Links (Protected by Parent Gate) */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-stone-600">
            <button
              onClick={() => handleSafeLinkClick('https://fawnandfable.store')}
              className="hover:text-amber-800 transition-colors inline-flex items-center gap-1"
            >
              <span>fawnandfable.store</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </button>
            <span>•</span>
            <button
              onClick={() => handleSafeLinkClick('https://substack.com/@fawnandfable?utm_source=share&utm_medium=android&r=8uahf1')}
              className="hover:text-amber-800 transition-colors inline-flex items-center gap-1"
            >
              <span>Substack Journal</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </button>
            <span>•</span>
            <button
              onClick={() => handleSafeLinkClick('https://open.spotify.com/artist/7btqMCDDhQwH86phTjWzUs')}
              className="hover:text-amber-800 transition-colors inline-flex items-center gap-1"
            >
              <span>Spotify Lullabies</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ad-Free Kid Safe Space</span>
          </div>
        </div>
      </footer>

      {/* Parental Gate for footer links */}
      <ParentGateModal
        isOpen={showGate}
        onClose={() => setShowGate(false)}
        onSuccess={handleGateSuccess}
        targetDescription="visit external official link"
      />
    </div>
  );
}
