import { useState } from 'react';
import { Sparkles, BookOpen, PenTool, Hash, Heart, Volume2, Sliders } from 'lucide-react';
import { CHARACTERS } from '../../data/characters';
import { FawnAdventuresStudio } from './FawnAdventuresStudio';
import { PippaLiteracy } from './PippaLiteracy';
import { MiloTracing } from './MiloTracing';
import { BarnabyMath } from './BarnabyMath';
import { WillowFeelings } from './WillowFeelings';
import { ToddlerStreakHeader } from './ToddlerStreakHeader';
import { Tilt3DCard } from '../common/Tilt3DCard';
import { sound, CharacterPersonaId } from '../../utils/audio';
import { VoiceSettingsModal } from '../common/VoiceSettingsModal';

type ActiveModule = 'welcome' | 'literacy' | 'tracing' | 'math' | 'feelings';

export function ToddlerMeadow() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('welcome');
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const fawnChar = CHARACTERS.find((c) => c.id === 'fawn')!;

  const handleSelectModule = (mod: ActiveModule, voicePrompt?: string) => {
    sound.playPop();
    setActiveModule(mod);
    if (voicePrompt) {
      const personaMap: Record<ActiveModule, CharacterPersonaId> = {
        welcome: 'fawn',
        literacy: 'pippa',
        tracing: 'milo',
        math: 'barnaby',
        feelings: 'willow',
      };
      sound.speak(voicePrompt, personaMap[mod] || 'fawn');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Daily Wonder Streak & Badge Progress Header */}
      <ToddlerStreakHeader />

      {/* Whimsical Character Navigator Bar with 3D Depth */}
      <section className="bg-[#FAF7F2] rounded-3xl p-5 sm:p-6 border-2 border-amber-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-pulse">🌿</span>
            <h2 className="text-base sm:text-lg font-black font-serif text-stone-900">
              Meet Your Meadow Animal Friends
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playPop();
                setShowVoiceModal(true);
              }}
              className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-full border border-amber-300 transition-colors shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Voice Warmth</span>
            </button>
            <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border-2 border-amber-200 shadow-xs">
              Tap a Friend to Play! ✨
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {/* Fawn */}
          <Tilt3DCard
            maxTilt={12}
            onClick={() => handleSelectModule('welcome', fawnChar.greeting)}
          >
            <div
              className={`p-3 rounded-2xl border-3 transition-all flex flex-col items-center text-center cursor-pointer h-full ${
                activeModule === 'welcome'
                  ? 'bg-gradient-to-b from-amber-100 to-pink-100 border-amber-500 shadow-lg ring-3 ring-amber-300 scale-102'
                  : 'bg-white border-amber-200/80 hover:bg-amber-50/70 hover:border-amber-400 shadow-xs'
              }`}
            >
              <div className="relative">
                <img
                  src={fawnChar.image}
                  alt={fawnChar.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover mb-2 border-3 border-amber-300 shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full p-0.5 border shadow-xs">
                  ⭐
                </span>
              </div>
              <span className="text-sm font-black text-stone-900 font-serif">Fawn</span>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full mt-1">
                Worlds & Pop!
              </span>
            </div>
          </Tilt3DCard>

          {/* Pippa Owl */}
          <Tilt3DCard
            maxTilt={12}
            onClick={() => handleSelectModule('literacy', "Hoo-hoo! Let's play with Pippa and letter sounds!")}
          >
            <div
              className={`p-3 rounded-2xl border-3 transition-all flex flex-col items-center text-center cursor-pointer h-full ${
                activeModule === 'literacy'
                  ? 'bg-purple-100 border-purple-500 shadow-lg ring-3 ring-purple-300 scale-102'
                  : 'bg-white border-purple-200/80 hover:bg-purple-50/60 hover:border-purple-300 shadow-xs'
              }`}
            >
              <img
                src={CHARACTERS[1].image}
                alt={CHARACTERS[1].name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover mb-2 border-3 border-purple-300 shadow-xs"
              />
              <span className="text-sm font-black text-stone-900 font-serif">Pippa Owl</span>
              <span className="text-[10px] font-bold text-purple-900 bg-purple-200/80 px-2 py-0.5 rounded-full mt-1">
                Phonics & Reading
              </span>
            </div>
          </Tilt3DCard>

          {/* Milo Bunny */}
          <Tilt3DCard
            maxTilt={12}
            onClick={() => handleSelectModule('tracing', "Hop hop! Let's trace lines and letters with Milo Bunny!")}
          >
            <div
              className={`p-3 rounded-2xl border-3 transition-all flex flex-col items-center text-center cursor-pointer h-full ${
                activeModule === 'tracing'
                  ? 'bg-emerald-100 border-emerald-500 shadow-lg ring-3 ring-emerald-300 scale-102'
                  : 'bg-white border-emerald-200/80 hover:bg-emerald-50/60 hover:border-emerald-300 shadow-xs'
              }`}
            >
              <img
                src={CHARACTERS[2].image}
                alt={CHARACTERS[2].name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover mb-2 border-3 border-emerald-300 shadow-xs"
              />
              <span className="text-sm font-black text-stone-900 font-serif">Milo Bunny</span>
              <span className="text-[10px] font-bold text-emerald-900 bg-emerald-200/80 px-2 py-0.5 rounded-full mt-1">
                Writing & Tracing
              </span>
            </div>
          </Tilt3DCard>

          {/* Barnaby Bear */}
          <Tilt3DCard
            maxTilt={12}
            onClick={() => handleSelectModule('math', "Let's count delicious forest treats with Barnaby Bear!")}
          >
            <div
              className={`p-3 rounded-2xl border-3 transition-all flex flex-col items-center text-center cursor-pointer h-full ${
                activeModule === 'math'
                  ? 'bg-blue-100 border-blue-500 shadow-lg ring-3 ring-blue-300 scale-102'
                  : 'bg-white border-blue-200/80 hover:bg-blue-50/60 hover:border-blue-300 shadow-xs'
              }`}
            >
              <img
                src={CHARACTERS[3].image}
                alt={CHARACTERS[3].name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover mb-2 border-3 border-blue-300 shadow-xs"
              />
              <span className="text-sm font-black text-stone-900 font-serif">Barnaby Bear</span>
              <span className="text-[10px] font-bold text-blue-900 bg-blue-200/80 px-2 py-0.5 rounded-full mt-1">
                Toddler Math
              </span>
            </div>
          </Tilt3DCard>

          {/* Willow Fox */}
          <Tilt3DCard
            maxTilt={12}
            className="col-span-2 sm:col-span-1"
            onClick={() => handleSelectModule('feelings', "Willow welcomes you to take a slow, gentle breath.")}
          >
            <div
              className={`p-3 rounded-2xl border-3 transition-all flex flex-col items-center text-center cursor-pointer h-full ${
                activeModule === 'feelings'
                  ? 'bg-rose-100 border-rose-500 shadow-lg ring-3 ring-rose-300 scale-102'
                  : 'bg-white border-rose-200/80 hover:bg-rose-50/60 hover:border-rose-300 shadow-xs'
              }`}
            >
              <img
                src={CHARACTERS[4].image}
                alt={CHARACTERS[4].name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover mb-2 border-3 border-rose-300 shadow-xs"
              />
              <span className="text-sm font-black text-stone-900 font-serif">Willow Fox</span>
              <span className="text-[10px] font-bold text-rose-900 bg-rose-200/80 px-2 py-0.5 rounded-full mt-1">
                Feelings & Calm
              </span>
            </div>
          </Tilt3DCard>
        </div>
      </section>

      {/* Dynamic Module Presentation */}
      <main>
        {activeModule === 'welcome' && <FawnAdventuresStudio />}
        {activeModule === 'literacy' && <PippaLiteracy />}
        {activeModule === 'tracing' && <MiloTracing />}
        {activeModule === 'math' && <BarnabyMath />}
        {activeModule === 'feelings' && <WillowFeelings />}
      </main>

      <VoiceSettingsModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
      />
    </div>
  );
}
