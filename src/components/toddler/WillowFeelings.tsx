import { useState, useEffect } from 'react';
import { Sparkles, Wind, Heart, Volume2 } from 'lucide-react';
import { FEELING_CARDS, FeelingCard } from '../../data/characters';
import willowImg from '../../assets/images/willow_fox_1789229913173.jpg';
import { sound } from '../../utils/audio';

export function WillowFeelings() {
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingCard>(FEELING_CARDS[0]);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [breathCounter, setBreathCounter] = useState(4);
  const [breathCycleCount, setBreathCycleCount] = useState(0);

  // Breathing loop timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathCounter((prev) => {
          if (prev <= 1) {
            setBreathPhase((phase) => {
              if (phase === 'inhale') {
                sound.playNote(440);
                sound.speak('Soft blow out...', 'willow');
                return 'exhale';
              } else {
                sound.playCalmBell();
                sound.speak('Smell the meadow flower...', 'willow');
                setBreathCycleCount((c) => c + 1);
                return 'inhale';
              }
            });
            return 4; // 4 seconds phase
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive]);

  const toggleBreathing = () => {
    sound.playPop();
    if (!isBreathingActive) {
      setIsBreathingActive(true);
      setBreathPhase('inhale');
      setBreathCounter(4);
      sound.playCalmBell();
      sound.speak('Smell the flower, deep breath in...', 'willow');
    } else {
      setIsBreathingActive(false);
      sound.speak('Beautiful gentle breathing with Willow.', 'willow');
    }
  };

  const handleSelectFeeling = (card: FeelingCard) => {
    setSelectedFeeling(card);
    sound.playPop();
    sound.speak(`You feel ${card.name}. ${card.willowAdvice}`, 'willow');
  };

  return (
    <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-sm">
      {/* Willow Header */}
      <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 mb-6 border-b border-rose-100">
        <div className="relative">
          <img
            src={willowImg}
            alt="Willow the Fox"
            referrerPolicy="no-referrer"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-rose-300 shadow-md transform rotate-1"
          />
          <span className="absolute -bottom-2 -right-2 bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-xs">
            Feelings Guide
          </span>
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Social-Emotional Skills & Calming
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Willow’s Feelings & Calm Burrow
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-xl">
            Name your big emotions, take slow dandelion breaths, and know that all feelings are welcome here.
          </p>
        </div>

        <button
          onClick={toggleBreathing}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold shadow-md transition-all active:scale-95 ${
            isBreathingActive
              ? 'bg-emerald-600 text-white animate-pulse'
              : 'bg-rose-600 hover:bg-rose-700 text-white'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>{isBreathingActive ? 'Pause Breathing' : 'Breathe with Willow'}</span>
        </button>
      </div>

      {isBreathingActive ? (
        /* Dandelion Breathing Studio */
        <div className="bg-white rounded-3xl p-8 border-2 border-rose-300 shadow-md text-center max-w-xl mx-auto my-4 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold mb-4">
            <Heart className="w-3.5 h-3.5 text-rose-600" /> Dandelion Breath Sanctuary
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mb-2">
            {breathPhase === 'inhale' ? '🌸 Smell the Meadow Flower' : '💨 Blow Out the Dandelion Seeds'}
          </h3>

          <p className="text-stone-600 text-sm mb-6">
            {breathPhase === 'inhale'
              ? 'Slow, gentle breath in through your nose...'
              : 'Slow, soft whoosh out through your lips...'}
          </p>

          {/* Rhythmic Breathing Animation Circle */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center mb-6">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                breathPhase === 'inhale'
                  ? 'scale-110 bg-amber-100 border-4 border-amber-400'
                  : 'scale-75 bg-sky-100 border-4 border-sky-400'
              }`}
            />
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-6xl mb-2">
                {breathPhase === 'inhale' ? '🌼' : '🌬️'}
              </span>
              <span className="text-3xl font-black font-mono text-stone-800">
                {breathCounter}s
              </span>
              <span className="text-xs font-bold text-stone-500 uppercase mt-1">
                {breathPhase}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-bold text-stone-500 mb-4">
            <span>Calm Breaths Completed: {breathCycleCount}</span>
          </div>

          <button
            onClick={toggleBreathing}
            className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors"
          >
            I Feel Calm Now
          </button>
        </div>
      ) : (
        /* Feelings Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Active Emotion Display */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-300 shadow-md text-center flex flex-col items-center">
            <span className="text-7xl sm:text-8xl mb-4 block animate-bounce-short">
              {selectedFeeling.emoji}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mb-2">
              {selectedFeeling.name}
            </h3>

            <p className="text-stone-600 text-sm italic font-serif bg-rose-50/60 p-4 rounded-2xl border border-rose-100 mb-4 w-full">
              "{selectedFeeling.description}"
            </p>

            <div className="w-full bg-amber-50 rounded-2xl p-4 border border-amber-200 text-left mb-5">
              <span className="text-xs font-bold text-amber-900 block mb-1">
                🦊 Willow’s Gentle Heart Tip:
              </span>
              <p className="text-xs text-stone-700 font-medium leading-relaxed">
                {selectedFeeling.willowAdvice}
              </p>
            </div>

            <button
              onClick={() => {
                sound.speak(`You feel ${selectedFeeling.name}. ${selectedFeeling.willowAdvice}`, 'willow');
              }}
              className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center justify-center gap-2 shadow-md transition-all text-sm active:scale-95"
            >
              <Volume2 className="w-5 h-5" /> Listen to Willow's Comfort
            </button>
          </div>

          {/* Emotion Cards Options */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              How does your little heart feel right now?
            </h3>
            <div className="space-y-2.5">
              {FEELING_CARDS.map((card) => {
                const isSelected = selectedFeeling.id === card.id;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleSelectFeeling(card)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left active:scale-98 ${
                      isSelected
                        ? `${card.colorBg} ${card.borderColor} shadow-md ring-2 ring-rose-200`
                        : 'bg-white border-stone-200 hover:border-rose-200 hover:bg-rose-50/30'
                    }`}
                  >
                    <span className="text-4xl p-2 rounded-2xl bg-white shadow-xs">
                      {card.emoji}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-base text-stone-900 font-serif">
                        {card.name}
                      </div>
                      <div className="text-xs text-stone-500 line-clamp-1">
                        {card.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
