import { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { PHONICS_CARDS, PhonicsCard } from '../../data/characters';
import pippaImg from '../../assets/images/pippa_owl_1789229889402.jpg';
import { sound } from '../../utils/audio';
import { fireSparkleBurst } from '../../utils/confetti';
import { awardStarAndCheckBadge } from '../../utils/toddlerStorage';

export function PippaLiteracy() {
  const [selectedCard, setSelectedCard] = useState<PhonicsCard>(PHONICS_CARDS[0]);
  const [activeTab, setActiveTab] = useState<'cards' | 'quiz'>('cards');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const currentQuizCard = PHONICS_CARDS[quizIndex % PHONICS_CARDS.length];
  // Generate 3 options including correct one
  const quizOptions = [
    currentQuizCard,
    PHONICS_CARDS[(quizIndex + 2) % PHONICS_CARDS.length],
    PHONICS_CARDS[(quizIndex + 5) % PHONICS_CARDS.length],
  ].sort(() => 0.5 - Math.random());

  const handleCardClick = (card: PhonicsCard) => {
    setSelectedCard(card);
    sound.playPop();
    sound.speak(`${card.letter}! ${card.sound}! ${card.word}!`, 'pippa');
  };

  const handleQuizAnswer = (card: PhonicsCard) => {
    if (quizAnswered) return;
    setQuizAnswered(card.letter);

    if (card.letter === currentQuizCard.letter) {
      sound.playSuccess();
      sound.speak(`Hooray! That is ${card.word}!`, 'pippa');
      fireSparkleBurst(0.5, 0.4);
      awardStarAndCheckBadge('word_finder');
      setScore((s) => s + 1);
      setTimeout(() => {
        setQuizAnswered(null);
        setQuizIndex((i) => i + 1);
      }, 1600);
    } else {
      sound.playNote(260);
      sound.speak(`Almost! Let's listen again. Pippa is looking for ${currentQuizCard.word}.`, 'pippa');
      setTimeout(() => {
        setQuizAnswered(null);
      }, 1400);
    }
  };

  return (
    <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-sm">
      {/* Pippa Banner */}
      <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 mb-6 border-b border-purple-100">
        <div className="relative">
          <img
            src={pippaImg}
            alt="Pippa the Owl"
            referrerPolicy="no-referrer"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-purple-300 shadow-md transform -rotate-2"
          />
          <span className="absolute -bottom-2 -right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-xs">
            Phonics Guide
          </span>
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Early Literacy & Storybook Sounds
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Pippa’s Phonics & Reading Meadow
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-xl">
            Touch letters to hear soft sounds, gentle rhymes, and discover magical words with curious Owlet Pippa!
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-purple-100/70 p-1 rounded-2xl border border-purple-200">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('cards');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'cards' ? 'bg-purple-600 text-white shadow-xs' : 'text-purple-900 hover:bg-purple-200/50'
            }`}
          >
            🔤 Alphabet Sounds
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('quiz');
              sound.speak(`Can you find the letter for ${currentQuizCard.word}?`, 'pippa');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quiz' ? 'bg-purple-600 text-white shadow-xs' : 'text-purple-900 hover:bg-purple-200/50'
            }`}
          >
            🎯 Sound Safari Game
          </button>
        </div>
      </div>

      {activeTab === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Focus Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-purple-300 shadow-md text-center flex flex-col items-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center text-6xl sm:text-7xl shadow-inner mb-4 animate-bounce-short">
              {selectedCard.iconEmoji}
            </div>

            <div className="text-5xl sm:text-6xl font-black text-purple-700 font-serif tracking-tight mb-1">
              {selectedCard.letter}
            </div>

            <div className="text-lg font-bold text-stone-800 mb-1">
              {selectedCard.word}
            </div>

            <div className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-900 rounded-full mb-3">
              Sound: {selectedCard.sound}
            </div>

            <p className="text-stone-600 text-sm italic font-serif bg-amber-50/70 p-3 rounded-2xl border border-amber-100 mb-4 w-full">
              "{selectedCard.rhyme}"
            </p>

            <button
              onClick={() => {
                sound.playNote(520);
                sound.speak(`${selectedCard.letter}! ${selectedCard.sound}! ${selectedCard.word}! ${selectedCard.rhyme}`, 'pippa');
              }}
              className="w-full py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold flex items-center justify-center gap-2 shadow-md transition-all text-base"
            >
              <Volume2 className="w-5 h-5" /> Tap to Hear Pippa Say This
            </button>
          </div>

          {/* Letter Grid for Toddlers (Large Buttons) */}
          <div className="lg:col-span-7">
            <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3">
              Tap a Letter to Explore:
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {PHONICS_CARDS.map((card) => {
                const isSelected = selectedCard.letter === card.letter;
                return (
                  <button
                    key={card.letter}
                    onClick={() => handleCardClick(card)}
                    className={`p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center group active:scale-95 ${
                      isSelected
                        ? 'bg-purple-100 border-purple-500 shadow-md ring-2 ring-purple-300'
                        : 'bg-white border-stone-200 hover:border-purple-300 hover:bg-purple-50/40'
                    }`}
                  >
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                      {card.iconEmoji}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-purple-900 font-serif leading-none">
                      {card.letter}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-600 mt-1 truncate max-w-[80px]">
                      {card.word}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Pippa's Sound Safari Game */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-300 shadow-md text-center max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
              ⭐ Stars Collected: {score}
            </span>
            <button
              onClick={() => {
                sound.speak(`Can you find the letter for ${currentQuizCard.word}?`, 'pippa');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200"
            >
              <Volume2 className="w-4 h-4" /> Repeat Sound
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mb-2">
              Pippa is looking for:
            </h3>
            <div className="inline-block bg-purple-50 border-2 border-purple-200 rounded-3xl p-6 shadow-inner">
              <span className="text-6xl block mb-2">{currentQuizCard.iconEmoji}</span>
              <span className="text-2xl sm:text-3xl font-bold text-purple-900 font-serif">
                "{currentQuizCard.word}"
              </span>
              <p className="text-xs text-purple-700 mt-1">Which letter makes this sound?</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {quizOptions.map((opt) => {
              const isSelected = quizAnswered === opt.letter;
              const isCorrect = opt.letter === currentQuizCard.letter;

              let btnStyle = 'bg-[#FAF7F2] border-purple-200 hover:border-purple-400 hover:bg-purple-50';
              if (quizAnswered && isSelected) {
                btnStyle = isCorrect ? 'bg-emerald-100 border-emerald-500 text-emerald-900 scale-105' : 'bg-rose-100 border-rose-400 text-rose-800';
              }

              return (
                <button
                  key={opt.letter}
                  onClick={() => handleQuizAnswer(opt)}
                  disabled={quizAnswered !== null}
                  className={`p-6 rounded-3xl border-3 text-4xl sm:text-5xl font-black font-serif transition-all active:scale-95 shadow-sm ${btnStyle}`}
                >
                  {opt.letter}
                  {quizAnswered && isSelected && isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mt-2 animate-bounce" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setQuizIndex((i) => i + 1);
              setQuizAnswered(null);
            }}
            className="text-stone-500 hover:text-stone-800 text-xs font-bold inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Try Another Letter
          </button>
        </div>
      )}
    </div>
  );
}
