import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Star, Trophy, Award, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { getToddlerProgress, ToddlerStreakData } from '../../utils/toddlerStorage';
import { fireCelebrationConfetti } from '../../utils/confetti';
import { sound } from '../../utils/audio';

const BADGE_DEFINITIONS = [
  { id: 'first_wonder', name: 'Meadow Sprout', icon: '🌱', description: 'Explored your first storybook' },
  { id: 'bubble_popper', name: 'Bubble Master', icon: '🫧', description: 'Popped over 20 magic bubbles' },
  { id: 'word_finder', name: 'Sound Seeker', icon: '🦉', description: 'Listened to letter sounds with Pippa' },
  { id: 'master_tracer', name: 'Star Drawer', icon: '⭐', description: 'Traced shapes with Milo Bunny' },
  { id: 'berry_counter', name: 'Berry Chef', icon: '🫐', description: 'Counted forest treats with Barnaby' },
  { id: 'calm_breather', name: 'Gentle Heart', icon: '🦊', description: 'Took calming breaths with Willow' },
];

export function ToddlerStreakHeader() {
  const [progress, setProgress] = useState<ToddlerStreakData>(getToddlerProgress());
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  useEffect(() => {
    // update state from storage
    setProgress(getToddlerProgress());
  }, []);

  const handleOpenBadges = () => {
    sound.playSuccess();
    fireCelebrationConfetti({ particleCount: 35 });
    setShowBadgeModal(true);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-emerald-500/10 rounded-3xl p-3 sm:p-4 border-2 border-amber-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Daily Streak Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl border-2 border-amber-300 shadow-xs">
            <span className="text-2xl animate-bounce">🔥</span>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block leading-none">
                Wonder Streak
              </span>
              <span className="text-base sm:text-lg font-black font-serif text-stone-900 leading-none">
                {progress.streakDays} Day{progress.streakDays !== 1 ? 's' : ''}!
              </span>
            </div>
          </div>

          {/* Star Balance */}
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl border-2 border-amber-300 shadow-xs">
            <span className="text-2xl">⭐</span>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block leading-none">
                Star Badges
              </span>
              <span className="text-base sm:text-lg font-black font-serif text-stone-900 leading-none">
                {progress.totalStars}
              </span>
            </div>
          </div>
        </div>

        {/* Action button to view badges & rewards */}
        <button
          onClick={handleOpenBadges}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-black text-xs sm:text-sm px-4 py-2 rounded-2xl border-2 border-white shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-stone-900" />
          <span>Treasure Chest & Badges</span>
          <span className="bg-white/80 text-stone-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
            {progress.badgesUnlocked.length}/{BADGE_DEFINITIONS.length}
          </span>
        </button>
      </div>

      {/* Badges and Rewards Modal */}
      <AnimatePresence>
        {showBadgeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#FCF9F3] border-4 border-amber-300 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <span className="text-5xl block mb-2 animate-bounce">🏆</span>
                <h3 className="text-2xl font-black font-serif text-stone-900">
                  Your Meadow Treasure Chest!
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-amber-900 mt-1">
                  Keep exploring with Fawn & friends to unlock all animal badges!
                </p>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {BADGE_DEFINITIONS.map((badge) => {
                  const isUnlocked = progress.badgesUnlocked.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-3 rounded-2xl border-3 text-center flex flex-col items-center justify-center transition-all ${
                        isUnlocked
                          ? 'bg-white border-amber-300 shadow-md scale-102'
                          : 'bg-stone-100 border-stone-200 opacity-50 grayscale'
                      }`}
                    >
                      <span className="text-3xl mb-1">{badge.icon}</span>
                      <span className="text-xs font-black text-stone-900 block leading-tight">
                        {badge.name}
                      </span>
                      <span className="text-[9px] font-bold text-stone-500 mt-1 line-clamp-2">
                        {badge.description}
                      </span>
                      {isUnlocked && (
                        <span className="mt-1 inline-flex items-center gap-0.5 text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Unlocked
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-amber-100/80 border-2 border-amber-200 rounded-2xl p-3.5 mb-6 text-center">
                <span className="text-xs font-bold text-amber-950 block">
                  🎉 Tip: Each letter traced, bubble popped, or berry counted brings you closer to new secret badges!
                </span>
              </div>

              <button
                onClick={() => {
                  sound.playPop();
                  setShowBadgeModal(false);
                }}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-amber-100 font-black text-sm rounded-2xl shadow-md transition-all active:scale-95"
              >
                Back to Play! ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
