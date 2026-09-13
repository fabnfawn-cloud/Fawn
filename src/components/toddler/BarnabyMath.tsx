import { useState } from 'react';
import { Sparkles, Volume2, RotateCcw, Award } from 'lucide-react';
import { MATH_CHALLENGES, fawnBubbleForestImg } from '../../data/characters';
import barnabyImg from '../../assets/images/barnaby_bear_1789229877348.jpg';
import { sound } from '../../utils/audio';
import { fireCelebrationConfetti, fireSparkleBurst } from '../../utils/confetti';
import { awardStarAndCheckBadge } from '../../utils/toddlerStorage';

export function BarnabyMath() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [collectedCount, setCollectedCount] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [totalStars, setTotalStars] = useState(0);

  const currentChallenge = MATH_CHALLENGES[challengeIndex % MATH_CHALLENGES.length];

  const handleAddItem = () => {
    if (hasWon) return;
    const newCount = collectedCount + 1;
    setCollectedCount(newCount);

    // Play ascending musical notes
    const freqs = [330, 392, 440, 523, 587, 659];
    sound.playNote(freqs[(newCount - 1) % freqs.length]);
    sound.speak(`${newCount}!`, 'barnaby');

    if (newCount === currentChallenge.targetCount) {
      setHasWon(true);
      setTotalStars((s) => s + 1);
      fireCelebrationConfetti();
      awardStarAndCheckBadge('berry_counter');
      setTimeout(() => {
        sound.playSuccess();
        sound.speak(`Yum yum! We counted ${currentChallenge.targetCount} ${currentChallenge.itemName} for Barnaby!`, 'barnaby');
      }, 300);
    }
  };

  const nextChallenge = () => {
    sound.playPop();
    setChallengeIndex((i) => i + 1);
    setCollectedCount(0);
    setHasWon(false);
  };

  const resetCount = () => {
    sound.playPop();
    setCollectedCount(0);
    setHasWon(false);
  };

  return (
    <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-sm">
      {/* Barnaby & Fawn Duo Header */}
      <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 mb-6 border-b border-blue-100">
        <div className="flex items-center -space-x-4">
          <div className="relative z-10">
            <img
              src={barnabyImg}
              alt="Barnaby the Bear"
              referrerPolicy="no-referrer"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-blue-400 shadow-md transform -rotate-3 hover:rotate-0 transition-transform"
            />
            <span className="absolute -bottom-2 -left-1 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black shadow-xs">
              Barnaby 🐻
            </span>
          </div>

          <div className="relative z-20 cursor-pointer" onClick={() => { sound.playBoing(); sound.speak("Pop the blueberry bubbles with Fawn and Barnaby!", 'barnaby'); }}>
            <img
              src={fawnBubbleForestImg}
              alt="Fawn in Blueberry Forest"
              referrerPolicy="no-referrer"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-amber-300 shadow-md transform rotate-3 hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-2 -right-1 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black shadow-xs">
              Fawn 🫧
            </span>
          </div>
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" /> Barnaby & Fawn’s Counting Forest
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-stone-900">
            Count Sweet Forest Treats!
          </h2>
          <p className="text-stone-700 text-xs sm:text-sm mt-1 max-w-xl font-medium">
            Tap the big button or tap treats to fill Barnaby’s wooden bowl: one, two, three!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-950 px-4 py-2 rounded-2xl text-xs font-black border-2 border-amber-300 shadow-sm">
          <Award className="w-4 h-4 text-amber-600" />
          <span>Star Badges: {totalStars} ⭐</span>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-300 shadow-md max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-4">
          <Volume2 className="w-3.5 h-3.5" />
          <span>{currentChallenge.prompt}</span>
        </div>

        {/* Target Number Display */}
        <div className="mb-6">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
            Target Count:
          </span>
          <div className="inline-block bg-blue-50 border-2 border-blue-300 rounded-3xl px-8 py-3 text-5xl sm:text-6xl font-black text-blue-900 font-serif shadow-inner">
            {currentChallenge.targetCount}
          </div>
        </div>

        {/* Barnaby's Wooden Bowl */}
        <div className="relative bg-amber-100/70 border-4 border-amber-800/30 rounded-full w-64 h-36 sm:w-80 sm:h-44 mx-auto flex items-center justify-center p-4 shadow-inner mb-6 overflow-hidden">
          <span className="absolute bottom-2 text-stone-400 font-serif text-xs italic pointer-events-none">
            Barnaby's Snack Bowl
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 z-10">
            {Array.from({ length: collectedCount }).map((_, i) => (
              <span
                key={i}
                className="text-4xl sm:text-5xl animate-bounce-short transform hover:scale-110 transition-transform"
                role="img"
                aria-label={currentChallenge.itemName}
              >
                {currentChallenge.itemEmoji}
              </span>
            ))}
            {collectedCount === 0 && (
              <span className="text-stone-400 text-xs font-medium italic">
                Tap the big button below to drop a treat!
              </span>
            )}
          </div>
        </div>

        {/* Big Tap Button for Toddler Hands */}
        {!hasWon ? (
          <div className="space-y-4">
            <button
              id="tap-treat-btn"
              onClick={handleAddItem}
              className="w-full max-w-sm mx-auto py-5 px-6 rounded-3xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-lg transition-all border-b-4 border-blue-800"
            >
              <span className="text-3xl">{currentChallenge.itemEmoji}</span>
              <span>Tap to Add 1 More!</span>
            </button>
            <p className="text-stone-500 text-xs font-semibold">
              Currently in bowl: {collectedCount} / {currentChallenge.targetCount}
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 max-w-md mx-auto text-center">
              <span className="text-4xl block mb-1">🎉 🐻</span>
              <h3 className="text-xl font-bold font-serif text-emerald-900">
                You Did It! Exactly {currentChallenge.targetCount}!
              </h3>
              <p className="text-stone-600 text-xs mt-1">
                Barnaby is smiling and giving you a warm bear hug!
              </p>
            </div>

            <button
              onClick={nextChallenge}
              className="w-full max-w-sm mx-auto py-4 px-6 rounded-3xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Sparkles className="w-5 h-5" /> Count Next Forest Treat!
            </button>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-stone-100">
          <button
            onClick={resetCount}
            className="text-stone-500 hover:text-stone-700 text-xs font-bold inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Start Over
          </button>
          <button
            onClick={nextChallenge}
            className="text-stone-500 hover:text-stone-700 text-xs font-bold inline-flex items-center gap-1"
          >
            Skip Challenge →
          </button>
        </div>
      </div>
    </div>
  );
}
