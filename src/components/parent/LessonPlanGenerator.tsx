import { useState } from 'react';
import { Sparkles, Calendar, Clock, BookOpen, CheckCircle, Printer, RefreshCw } from 'lucide-react';
import { sound } from '../../utils/audio';

interface LessonPlanStep {
  stepNumber: number;
  title: string;
  duration: string;
  description: string;
  parentTip: string;
}

interface LessonPlanData {
  title: string;
  characterGuide: string;
  ageGroup: string;
  duration: string;
  objective: string;
  materialsNeeded: string[];
  steps: LessonPlanStep[];
  socialEmotionalTieIn: string;
  spotifyMusicSuggestion: string;
}

const FOCUS_AREAS = [
  { id: 'literacy', name: 'Early Literacy & Phonics', guide: 'Pippa the Owl', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  { id: 'writing', name: 'Writing & Fine Motor Tracing', guide: 'Milo the Bunny', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { id: 'math', name: 'Tactile Math & Counting', guide: 'Barnaby the Bear', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  { id: 'feelings', name: 'Social-Emotional & Calming', guide: 'Willow the Fox', color: 'text-rose-700 bg-rose-50 border-rose-200' },
];

export function LessonPlanGenerator() {
  const [selectedAge, setSelectedAge] = useState('2-3 Years');
  const [selectedFocus, setSelectedFocus] = useState(FOCUS_AREAS[0]);
  const [duration, setDuration] = useState(15);
  const [materials, setMaterials] = useState('Flour tray, smooth pebbles, wooden spoons, storybook');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<LessonPlanData | null>(null);

  const handleGeneratePlan = async () => {
    sound.playPop();
    setIsLoading(true);

    try {
      const response = await fetch('/api/lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childAge: selectedAge,
          focusArea: selectedFocus.name,
          durationMinutes: duration,
          materials: materials.split(',').map((s) => s.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) throw new Error('Failed');

      const data: LessonPlanData = await response.json();
      sound.playSuccess();
      setGeneratedPlan(data);
    } catch {
      // Fallback
      setGeneratedPlan({
        title: `Meadow Wonder: ${selectedFocus.name} with ${selectedFocus.guide}`,
        characterGuide: selectedFocus.guide,
        ageGroup: selectedAge,
        duration: `${duration} Minutes`,
        objective: 'Play-based sensory discovery and gentle confidence building without screen overload.',
        materialsNeeded: ['Sensory tray or shallow baking sheet', 'Natural items (leaves, pebbles, acorns)', 'Soft crayon or paintbrush'],
        steps: [
          {
            stepNumber: 1,
            title: 'Welcome Song & Sensory Warmup',
            duration: '3 min',
            description: 'Sit in a circle and hum a gentle melody. Let your toddler explore the textures with their fingers.',
            parentTip: 'Follow their lead without directing immediately.',
          },
          {
            stepNumber: 2,
            title: 'Guided Character Exploration',
            duration: '8 min',
            description: `Introduce ${selectedFocus.guide}! Playfully practice the target concept with gentle storytelling and finger movements.`,
            parentTip: 'Use rich describing words like "swirling", "smooth", and "tucking".',
          },
          {
            stepNumber: 3,
            title: 'Willow’s Dandelion Breath Wind-Down',
            duration: '4 min',
            description: 'Pack the materials away with a clean-up rhyme, followed by three slow dandelion breaths together.',
            parentTip: 'Celebrate their natural curiosity and gentle effort.',
          },
        ],
        socialEmotionalTieIn: 'Every little effort is celebrated; perfection is never required in the Fawn & Fable meadow.',
        spotifyMusicSuggestion: 'Fawn & Fable Acoustic Meadow Melodies on Spotify',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-emerald-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" /> Play-Based Curriculum
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Fawn & Fable Lesson Plan Studio
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
            Generate customized, pressure-free daily activities guided by our animal characters using everyday home materials.
          </p>
        </div>

        {generatedPlan && (
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 shadow-xs"
          >
            <Printer className="w-4 h-4" /> Print / Save Plan
          </button>
        )}
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-stone-600 uppercase block mb-1.5">Child’s Age:</label>
          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="w-full bg-white border-2 border-stone-200 rounded-xl py-2.5 px-3 text-xs font-bold text-stone-800 focus:outline-none focus:border-emerald-500"
          >
            <option>12-18 Months</option>
            <option>18-24 Months</option>
            <option>2-3 Years</option>
            <option>3-4 Years</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-stone-600 uppercase block mb-1.5">Learning Focus:</label>
          <select
            value={selectedFocus.id}
            onChange={(e) => {
              const f = FOCUS_AREAS.find((item) => item.id === e.target.value)!;
              setSelectedFocus(f);
            }}
            className="w-full bg-white border-2 border-stone-200 rounded-xl py-2.5 px-3 text-xs font-bold text-stone-800 focus:outline-none focus:border-emerald-500"
          >
            {FOCUS_AREAS.map((fa) => (
              <option key={fa.id} value={fa.id}>
                {fa.name} ({fa.guide})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-stone-600 uppercase block mb-1.5">Duration:</label>
          <div className="flex gap-2">
            {[10, 15, 25].map((mins) => (
              <button
                key={mins}
                onClick={() => setDuration(mins)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  duration === mins
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs font-bold text-stone-600 uppercase block mb-1.5">
          Household or Nature Items On-Hand:
        </label>
        <input
          type="text"
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
          placeholder="e.g. flour tray, pebbles, cardboard tube, wooden blocks..."
          className="w-full bg-white border-2 border-stone-200 rounded-xl py-2.5 px-4 text-xs font-medium text-stone-800 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <button
        onClick={handleGeneratePlan}
        disabled={isLoading}
        className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all mb-8"
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Fawn is crafting your gentle lesson plan...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Generate Fawn & Fable Lesson Plan</span>
          </>
        )}
      </button>

      {/* Generated Lesson Plan View */}
      {generatedPlan && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-md animate-fade-in print:border-none print:shadow-none">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-4 mb-6">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                Guide: {generatedPlan.characterGuide}
              </span>
              <h3 className="text-2xl font-bold font-serif text-stone-900 mt-2">
                {generatedPlan.title}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-stone-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {generatedPlan.duration}
              </span>
              <span>•</span>
              <span>{generatedPlan.ageGroup}</span>
            </div>
          </div>

          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 mb-6">
            <span className="text-xs font-bold text-amber-900 block mb-1">
              🌱 Gentle Developmental Objective:
            </span>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              {generatedPlan.objective}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              Gather Together:
            </h4>
            <div className="flex flex-wrap gap-2">
              {generatedPlan.materialsNeeded.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 text-xs bg-stone-100 text-stone-800 px-3 py-1.5 rounded-xl font-medium"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Play-Based Steps:
            </h4>
            {generatedPlan.steps.map((st) => (
              <div
                key={st.stepNumber}
                className="bg-[#FAF7F2] rounded-2xl p-4 border border-stone-200 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {st.stepNumber}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-sm text-stone-900 font-serif">
                      {st.title}
                    </h5>
                    <span className="text-[11px] font-semibold text-stone-400">
                      {st.duration}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-2">
                    {st.description}
                  </p>
                  <div className="bg-white/80 rounded-xl p-2.5 text-[11px] text-amber-900 border border-amber-200/60 flex items-center gap-1.5">
                    <span>💡 <strong>Parent Co-regulation Note:</strong> {st.parentTip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Emotional & Spotify Music Tie-In */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-100 text-xs">
            <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-200 text-rose-900">
              <strong className="block mb-1">🌸 Social-Emotional Anchor:</strong>
              <span>{generatedPlan.socialEmotionalTieIn}</span>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 text-blue-900">
              <strong className="block mb-1">🎵 Spotify Audio Soundtrack:</strong>
              <span>{generatedPlan.spotifyMusicSuggestion}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
