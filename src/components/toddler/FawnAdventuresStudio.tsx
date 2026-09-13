import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, Heart, Star, Award, RotateCcw, PartyPopper, Music } from 'lucide-react';
import { FAWN_ADVENTURES, FawnAdventure } from '../../data/characters';
import { sound } from '../../utils/audio';
import { fireSparkleBurst, fireCelebrationConfetti } from '../../utils/confetti';
import { awardStarAndCheckBadge } from '../../utils/toddlerStorage';
import { Tilt3DCard } from '../common/Tilt3DCard';

interface FloatingBubble {
  id: number;
  x: number; // percentage across screen 5% to 90%
  y: number; // starts near bottom
  size: number;
  emoji: string;
  label: string;
  speed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const RAINBOW_NOTES = [
  { note: 'Do', freq: 261.63, color: 'bg-rose-400 hover:bg-rose-500 border-rose-500 text-white', emoji: '🍓', label: 'C' },
  { note: 'Re', freq: 293.66, color: 'bg-orange-400 hover:bg-orange-500 border-orange-500 text-white', emoji: '🍊', label: 'D' },
  { note: 'Mi', freq: 329.63, color: 'bg-amber-400 hover:bg-amber-500 border-amber-500 text-amber-950', emoji: '⭐', label: 'E' },
  { note: 'Fa', freq: 349.23, color: 'bg-emerald-400 hover:bg-emerald-500 border-emerald-500 text-white', emoji: '🍀', label: 'F' },
  { note: 'Sol', freq: 392.00, color: 'bg-sky-400 hover:bg-sky-500 border-sky-500 text-white', emoji: '🫐', label: 'G' },
  { note: 'La', freq: 440.00, color: 'bg-indigo-400 hover:bg-indigo-500 border-indigo-500 text-white', emoji: '🍇', label: 'A' },
  { note: 'Ti', freq: 493.88, color: 'bg-purple-400 hover:bg-purple-500 border-purple-500 text-white', emoji: '🌸', label: 'B' },
  { note: 'High Do', freq: 523.25, color: 'bg-pink-400 hover:bg-pink-500 border-pink-500 text-white', emoji: '💖', label: 'C+' },
];

export function FawnAdventuresStudio() {
  const [activeAdventure, setActiveAdventure] = useState<FawnAdventure>(FAWN_ADVENTURES[0]);
  const [characterBounce, setCharacterBounce] = useState(false);
  const [bubblesPopped, setBubblesPopped] = useState(0);
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeEffectMessage, setActiveEffectMessage] = useState<string | null>(null);
  const [showMusicPad, setShowMusicPad] = useState(false);

  // Initialize and spawn floating bubbles
  useEffect(() => {
    const bubbleEmojis = ['🫐', '⭐', '💖', '🫧', '🌈', '🌸', '✨', '🐚', '🍎'];
    const initialBubbles: FloatingBubble[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 75,
      y: 70 + Math.random() * 20,
      size: 56 + Math.random() * 28,
      emoji: bubbleEmojis[Math.floor(Math.random() * bubbleEmojis.length)],
      label: 'Bubble',
      speed: 12 + Math.random() * 8,
    }));
    setBubbles(initialBubbles);

    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= 8) return prev;
        const newBubble: FloatingBubble = {
          id: Date.now() + Math.random(),
          x: 8 + Math.random() * 80,
          y: 85,
          size: 54 + Math.random() * 28,
          emoji: bubbleEmojis[Math.floor(Math.random() * bubbleEmojis.length)],
          label: 'Bubble',
          speed: 10 + Math.random() * 8,
        };
        return [...prev, newBubble];
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [activeAdventure]);

  // Handle popping a bubble
  const handlePopBubble = (bubble: FloatingBubble, event: MouseEvent) => {
    sound.playPop();
    sound.playHarpGlissando();

    // Spawn floating celebration particles
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const newParticles: Particle[] = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() * 40 - 20),
      y: rect.top + rect.height / 2 + (Math.random() * 40 - 20),
      emoji: ['✨', '⭐', '💖', '🫐'][i % 4],
    }));
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => {
      setParticles((p) => p.filter((item) => !newParticles.some((np) => np.id === item.id)));
    }, 800);

    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
    setBubblesPopped((prev) => {
      const next = prev + 1;
      if (next % 5 === 0) {
        sound.playSuccess();
        sound.speak(`Super popping! You popped ${next} magical bubbles!`);
        fireSparkleBurst(rect.left / window.innerWidth, rect.top / window.innerHeight);
        awardStarAndCheckBadge('bubble_popper');
      }
      return next;
    });
  };

  // Unleash a burst of fun bubbles
  const handleAddMoreBubbles = () => {
    sound.playBoing();
    fireSparkleBurst(0.5, 0.4);
    const bubbleEmojis = ['🫐', '⭐', '💖', '🫧', '🌈', '🌸', '✨'];
    const extraBubbles: FloatingBubble[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: 10 + (i * 18),
      y: 75 + Math.random() * 15,
      size: 58 + Math.random() * 24,
      emoji: bubbleEmojis[Math.floor(Math.random() * bubbleEmojis.length)],
      label: 'Bubble',
      speed: 8 + Math.random() * 6,
    }));
    setBubbles((prev) => [...prev, ...extraBubbles]);
    sound.speak('Bubble burst! Pop them all!');
  };

  // Tap Fawn character
  const handleTapFawn = () => {
    setCharacterBounce(true);
    sound.playBoing();
    sound.playGiggle();
    sound.speak(activeAdventure.voiceLine);

    setActiveEffectMessage(activeAdventure.headline);
    setTimeout(() => {
      setCharacterBounce(false);
    }, 700);
    setTimeout(() => {
      setActiveEffectMessage(null);
    }, 2800);
  };

  // Select Adventure World
  const handleSelectAdventure = (adv: FawnAdventure) => {
    sound.playPop();
    sound.playHarpGlissando();
    setActiveAdventure(adv);
    sound.speak(adv.voiceLine);
    setActiveEffectMessage(`Welcome to ${adv.title}!`);
    setTimeout(() => setActiveEffectMessage(null), 2400);
  };

  // Tap Interactive Scene Prop
  const handleTapProp = (prop: typeof activeAdventure.interactiveProps[0]) => {
    if (prop.soundType === 'glissando') sound.playHarpGlissando();
    else if (prop.soundType === 'boing') sound.playBoing();
    else if (prop.soundType === 'giggle') sound.playGiggle();
    else if (prop.soundType === 'splash') sound.playSplash();
    else if (prop.soundType === 'chime') sound.playSuccess();
    else sound.playPop();

    sound.speak(prop.speech);
    setActiveEffectMessage(`${prop.emoji} ${prop.effectText}`);
    setTimeout(() => setActiveEffectMessage(null), 2200);
  };

  // Play Rainbow Xylophone Note
  const handlePlayRainbowNote = (item: typeof RAINBOW_NOTES[0]) => {
    sound.playNote(item.freq);
    sound.speak(item.note);
  };

  return (
    <div className="space-y-6">
      {/* 4 Storybook Adventure World Pickers (Kid-Chunky Cards) */}
      <section className="bg-white/90 backdrop-blur-xs rounded-3xl p-4 sm:p-6 border-4 border-amber-200 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl animate-bounce">✨</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-stone-900 tracking-tight">
                Fawn’s Fun Adventure Worlds
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-amber-900">
                Choose Fawn’s outfit & magical story to play!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-amber-100 border-2 border-amber-300 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-black text-amber-900 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              <span>Bubbles Popped: {bubblesPopped} 🫧</span>
            </div>
          </div>
        </div>

        {/* 4 Chunky 3D World Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {FAWN_ADVENTURES.map((adv) => {
            const isSelected = activeAdventure.id === adv.id;
            return (
              <Tilt3DCard
                key={adv.id}
                onClick={() => handleSelectAdventure(adv)}
                maxTilt={14}
                className="h-full"
              >
                <div
                  className={`relative h-full rounded-3xl p-3 sm:p-4 text-left border-4 transition-all flex flex-col items-center text-center ${
                    isSelected
                      ? `${adv.accentBorder} bg-gradient-to-b ${adv.themeGradient} shadow-xl ring-4 ring-amber-300 scale-102`
                      : 'border-stone-200 bg-stone-50/90 hover:bg-white hover:border-amber-300 opacity-90 hover:opacity-100 shadow-sm hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute -top-3 bg-amber-400 text-stone-950 text-[11px] font-black px-3 py-0.5 rounded-full border-2 border-white shadow-xs z-30">
                      Playing Now! ⭐
                    </span>
                  )}
                  <div className="relative mb-2">
                    <img
                      src={adv.image}
                      alt={adv.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-white shadow-md group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-2 -right-2 text-xl bg-white rounded-full p-0.5 shadow-xs border">
                      {adv.id === 'meadow-rainbow' ? '🌈' : adv.id === 'bubble-forest' ? '🫧' : adv.id === 'ocean-beach' ? '🏖️' : '🏮'}
                    </span>
                  </div>

                  <span className="text-sm sm:text-base font-black text-stone-900 font-serif leading-tight">
                    {adv.title}
                  </span>
                  <span className="text-[11px] font-bold text-stone-600 mt-1 line-clamp-1">
                    {adv.badge}
                  </span>
                </div>
              </Tilt3DCard>
            );
          })}
        </div>
      </section>

      {/* Main Interactive Stage for Fawn */}
      <section
        className={`relative rounded-3xl p-6 sm:p-10 border-4 ${activeAdventure.accentBorder} bg-gradient-to-b ${activeAdventure.themeGradient} shadow-xl overflow-hidden min-h-[520px] sm:min-h-[580px] flex flex-col justify-between`}
      >
        {/* Floating Bubble Minigame Canvas (Interactive Tappable Bubbles) */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {bubbles.map((b) => (
            <motion.button
              key={b.id}
              onClick={(e) => handlePopBubble(b, e)}
              initial={{ y: 520, opacity: 0.1, scale: 0.7 }}
              animate={{
                y: -120,
                opacity: [0.2, 0.95, 0.95, 0],
                scale: [0.8, 1.05, 0.95, 1],
                x: [0, (b.id % 2 === 0 ? 30 : -30), 0],
              }}
              transition={{
                duration: b.speed,
                ease: 'linear',
                repeat: Infinity,
              }}
              style={{
                left: `${b.x}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
              }}
              className="absolute pointer-events-auto rounded-full bg-white/70 backdrop-blur-xs border-3 border-sky-300/80 shadow-lg flex items-center justify-center cursor-pointer active:scale-125 transition-transform hover:bg-white group"
              title="Tap to pop!"
            >
              {/* Bubble Highlight Gleam */}
              <div className="absolute top-1.5 left-2 w-3 h-2 bg-white rounded-full transform -rotate-45 opacity-80" />
              <span className="text-2xl sm:text-3xl select-none group-hover:scale-110 transition-transform">
                {b.emoji}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Floating Confetti Particles from Popping */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: 0, scale: 2.2, y: -45 }}
            transition={{ duration: 0.75 }}
            style={{ left: p.x, top: p.y }}
            className="fixed text-2xl pointer-events-none z-50 select-none"
          >
            {p.emoji}
          </motion.div>
        ))}

        {/* Top Banner / Speech Bubble */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3 border-3 border-amber-300 shadow-md flex items-center gap-3 max-w-xl">
            <span className="text-3xl animate-bounce">💬</span>
            <div>
              <span className="text-[11px] font-black text-amber-800 uppercase tracking-wide">
                Fawn Whispers:
              </span>
              <p className="text-sm sm:text-base font-bold text-stone-900 font-serif leading-snug">
                "{activeAdventure.voiceLine}"
              </p>
            </div>
            <button
              onClick={() => sound.speak(activeAdventure.voiceLine)}
              className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors shrink-0"
              title="Hear Fawn speak"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Interactive Bubble Storm Button */}
          <button
            onClick={handleAddMoreBubbles}
            className="bg-sky-400 hover:bg-sky-500 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl border-3 border-sky-600 shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>🫧 More Bubbles to Pop!</span>
          </button>
        </div>

        {/* Center: Fawn Interactive Hero Character */}
        <div className="relative z-20 my-6 flex flex-col items-center text-center">
          <Tilt3DCard
            maxTilt={16}
            glowColor="rgba(245, 158, 11, 0.45)"
            onClick={() => {
              handleTapFawn();
              fireSparkleBurst(0.5, 0.45);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAdventure.id}
                initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
                animate={{
                  scale: characterBounce ? 1.08 : 1,
                  opacity: 1,
                  rotate: characterBounce ? 3 : 0,
                }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="relative select-none group p-2"
              >
                {/* Outer Glow Ring */}
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-300 via-amber-200 to-sky-300 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity animate-pulse" />

                {/* Character Photo Frame */}
                <div className="relative rounded-full p-2.5 bg-white shadow-2xl border-4 border-amber-300">
                  <img
                    src={activeAdventure.image}
                    alt={activeAdventure.title}
                    referrerPolicy="no-referrer"
                    className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover shadow-inner group-hover:scale-103 transition-transform duration-300"
                  />

                  {/* Floating Tap Badge */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-black px-4 py-1.5 rounded-full border-2 border-white shadow-md flex items-center gap-1.5 whitespace-nowrap animate-bounce">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Tap Me to Play! ⭐</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Tilt3DCard>

          {/* Temporary Speech / Sparkle Notification Banner */}
          <AnimatePresence>
            {activeEffectMessage && (
              <motion.div
                initial={{ y: 15, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="mt-4 bg-white/95 text-stone-900 border-3 border-amber-400 font-black text-sm sm:text-base px-6 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{activeEffectMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <h3 className="text-2xl sm:text-3xl font-black font-serif text-stone-900 mt-4 tracking-tight">
            {activeAdventure.headline}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-stone-700 max-w-lg mt-1 bg-white/60 backdrop-blur-xs px-4 py-1.5 rounded-full">
            Outfit: <span className="text-amber-900 font-black">{activeAdventure.outfit}</span>
          </p>
        </div>

        {/* Bottom Interactive Scene Props */}
        <div className="relative z-20">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-3 border-white shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-black text-stone-800 flex items-center gap-1.5">
                <span>🪄 Tap Items in the Scene:</span>
              </span>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Interactive Wonder
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {activeAdventure.interactiveProps.map((prop) => (
                <button
                  key={prop.id}
                  onClick={() => handleTapProp(prop)}
                  className="bg-gradient-to-b from-white to-amber-50/70 hover:to-amber-100 border-2 border-amber-200 hover:border-amber-400 rounded-2xl p-3 flex items-center gap-3 transition-all active:scale-95 shadow-xs text-left group cursor-pointer"
                >
                  <span className="text-2xl sm:text-3xl group-hover:scale-120 transition-transform">
                    {prop.emoji}
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-stone-900 block leading-tight">
                      {prop.name}
                    </span>
                    <span className="text-[10px] font-semibold text-stone-500">
                      Tap to sound!
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Rainbow Xylophone Music Studio */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-pink-200 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🎹</span>
            <div>
              <h3 className="text-lg sm:text-xl font-black font-serif text-stone-900">
                Fawn’s Rainbow Music & Xylophone Studio
              </h3>
              <p className="text-xs sm:text-sm font-bold text-pink-700">
                Tap the colorful rainbow keys to make sweet music!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              sound.speak('Listen to our meadow melody!');
            }}
            className="bg-pink-100 hover:bg-pink-200 text-pink-900 border-2 border-pink-300 px-4 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Music className="w-4 h-4 text-pink-600" />
            <span>Play Meadow Song 🎵</span>
          </button>
        </div>

        {/* 8 Rainbow Piano Keys */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5">
          {RAINBOW_NOTES.map((item) => (
            <button
              key={item.note}
              onClick={() => handlePlayRainbowNote(item)}
              className={`${item.color} rounded-2xl py-4 sm:py-6 px-2 flex flex-col items-center justify-between border-b-6 active:border-b-2 active:translate-y-1 transition-all shadow-md cursor-pointer group`}
            >
              <span className="text-2xl sm:text-3xl mb-1 group-hover:scale-125 transition-transform">
                {item.emoji}
              </span>
              <span className="text-sm sm:text-base font-black tracking-tight">
                {item.note}
              </span>
              <span className="text-[10px] font-bold opacity-80 mt-0.5">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
