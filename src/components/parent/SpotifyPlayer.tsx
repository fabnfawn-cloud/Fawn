import { useState, useEffect, useRef } from 'react';
import { Music, ExternalLink, Play, Pause, Volume2, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import { ParentGateModal } from '../ParentGateModal';

export function SpotifyPlayer() {
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [ambientTheme, setAmbientTheme] = useState<'lullaby' | 'birds' | 'chimes'>('lullaby');
  const [showGate, setShowGate] = useState(false);
  const ambientTimerRef = useRef<NodeJS.Timeout | null>(null);

  // In-app gentle ambient generator using Web Audio API
  useEffect(() => {
    if (isPlayingAmbient) {
      // Periodic calming soft chords
      const chordSets = {
        lullaby: [523.25, 659.25, 783.99, 1046.5], // C major peaceful
        birds: [783.99, 880, 1046.5, 1174.66],
        chimes: [440, 554.37, 659.25, 830.61], // A major dreamy
      };

      const playCycle = () => {
        const notes = chordSets[ambientTheme];
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        sound.playNote(randomNote);
      };

      ambientTimerRef.current = setInterval(playCycle, 1800);
      playCycle();
    } else {
      if (ambientTimerRef.current) {
        clearInterval(ambientTimerRef.current);
        ambientTimerRef.current = null;
      }
    }
    return () => {
      if (ambientTimerRef.current) {
        clearInterval(ambientTimerRef.current);
      }
    };
  }, [isPlayingAmbient, ambientTheme]);

  const toggleAmbient = () => {
    sound.playPop();
    setIsPlayingAmbient((p) => !p);
  };

  const handleOpenSpotify = () => {
    sound.playPop();
    setShowGate(true);
  };

  return (
    <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-emerald-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-1">
            <Music className="w-3.5 h-3.5 text-emerald-700" /> Fawn & Fable Official Soundtracks
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Spotify Music, Lullabies & Ambient Sanctuary
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
            Gentle acoustic melodies, bedtime soundscapes, and preschool songs created by Fawn & Fable.
          </p>
        </div>

        <button
          onClick={handleOpenSpotify}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#1DB954] hover:bg-[#1AA34A] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
        >
          <span>Open on Spotify</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Official Spotify Artist Embed */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border-2 border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Stream Fawn & Fable on Spotify:
            </span>
            <span className="text-[11px] font-semibold text-stone-400">
              Toddler Lullabies & Daydream Songs
            </span>
          </div>

          <div className="w-full rounded-2xl overflow-hidden shadow-inner bg-stone-900 min-h-[352px]">
            <iframe
              title="Fawn and Fable Spotify Artist Player"
              src="https://open.spotify.com/embed/artist/7btqMCDDhQwH86phTjWzUs?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-2xl"
            />
          </div>
        </div>

        {/* Ambient Calming Sound Generator & Playlists */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-sm">
            <h3 className="text-base font-bold font-serif text-stone-900 mb-2 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-600" />
              In-App Peaceful Sound Generator
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Synthesized soothing frequencies for diaper changes, quiet reading, and sensory play without ads.
            </p>

            <div className="flex gap-2 mb-4">
              {[
                { id: 'lullaby', label: '🌙 Bedtime Box' },
                { id: 'chimes', label: '🍃 Meadow Bells' },
                { id: 'birds', label: '🌲 Morning Chorus' },
              ].map((thm) => (
                <button
                  key={thm.id}
                  onClick={() => {
                    sound.playPop();
                    setAmbientTheme(thm.id as typeof ambientTheme);
                  }}
                  className={`flex-1 py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                    ambientTheme === thm.id
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400 shadow-xs'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {thm.label}
                </button>
              ))}
            </div>

            <button
              onClick={toggleAmbient}
              className={`w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 ${
                isPlayingAmbient
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isPlayingAmbient ? (
                <>
                  <Pause className="w-4 h-4" /> Pause Calming Tones
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Play Gentle Meadow Tones
                </>
              )}
            </button>
          </div>

          {/* Calming Spotify Tracks List */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
              Curated Track Highlights:
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50/50 transition-colors">
                <div>
                  <strong className="text-stone-800 block">Fawn's Dewdrop Lullaby</strong>
                  <span className="text-stone-500 text-[11px]">Acoustic Harp & Soft Strings • 3:20</span>
                </div>
                <span className="text-emerald-700 font-bold text-[11px]">Bedtime</span>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50/50 transition-colors">
                <div>
                  <strong className="text-stone-800 block">Pippa's Alphabet Melody</strong>
                  <span className="text-stone-500 text-[11px]">Playful Xylophone & Whistle • 2:45</span>
                </div>
                <span className="text-purple-700 font-bold text-[11px]">Morning Play</span>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50/50 transition-colors">
                <div>
                  <strong className="text-stone-800 block">Willow’s Calm Stream</strong>
                  <span className="text-stone-500 text-[11px]">Ambient Water & Wind Chimes • 5:00</span>
                </div>
                <span className="text-rose-700 font-bold text-[11px]">Naptime</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ParentGateModal
        isOpen={showGate}
        onClose={() => setShowGate(false)}
        onSuccess={() => {
          window.open('https://open.spotify.com/artist/7btqMCDDhQwH86phTjWzUs', '_blank', 'noopener,noreferrer');
        }}
        targetDescription="open Fawn & Fable Spotify Artist page"
      />
    </div>
  );
}
