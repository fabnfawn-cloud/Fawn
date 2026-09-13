import { useState } from 'react';
import { Sparkles, HeartHandshake, BookOpen, Clock, Lightbulb, CheckCircle2, Copy, BookmarkCheck, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface MilestoneCategory {
  id: string;
  name: string;
  age: string;
  icon: string;
  color: string;
  milestones: {
    title: string;
    description: string;
    parentTip: string;
    playPrompt: string;
  }[];
}

const MILESTONE_DATA: MilestoneCategory[] = [
  {
    id: 'language',
    name: 'Speech & Early Literacy',
    age: '18 - 36 Months',
    icon: '🦉',
    color: 'bg-purple-50 text-purple-900 border-purple-200',
    milestones: [
      {
        title: 'Two-to-Three Word Sentence Strings',
        description: 'Combining words organically like "More berries please", "Big bunny hop", or "Look puppy".',
        parentTip: 'Avoid correcting grammar directly. Expand instead: If they say "Car go!", say "Yes, the fast green car is zooming down the hill!"',
        playPrompt: 'Ask Fawn or Pippa the Owl to repeat simple rhymes with clear pausing.',
      },
      {
        title: 'Phonemic Sound Mimicking & Rhythms',
        description: 'Imitating consonant bursts (B, P, M, D) and singing melodic vowel pitches.',
        parentTip: 'Reading the same book 10 times builds neuronal acoustic mapping. Repetition is neurological comfort.',
        playPrompt: 'Use the Rainbow Xylophone with Pippa to match single spoken words to chime tones.',
      },
      {
        title: 'Object & Animal Labeling',
        description: 'Pointing to named pictures in books and identifying common household items.',
        parentTip: 'Follow their gaze before speaking. Naming what they are already looking at doubles retention rate.',
        playPrompt: 'Explore the "Blueberry Forest" world and have them point to Barnaby Bear.',
      },
    ],
  },
  {
    id: 'emotional',
    name: 'Emotional Regulation & Tantrum De-escalation',
    age: 'All Toddler Stages',
    icon: '🦊',
    color: 'bg-rose-50 text-rose-900 border-rose-200',
    milestones: [
      {
        title: 'The Co-Regulation Before Logic Rule',
        description: 'During a meltdown, a toddler’s prefrontal logic cortex is offline; reason will not work.',
        parentTip: 'Lower your physical eye level, soften your voice, and label the emotion: "You really wanted that blueberry. You feel so disappointed right now."',
        playPrompt: 'Practice Willow Fox’s gentle 4-second flower breath together during calm moments.',
      },
      {
        title: 'Transition Warnings & Visual Countdowns',
        description: 'Toddlers experience transitions as jarring losses of autonomy without advance cues.',
        parentTip: 'Give 3-minute and 1-minute notices. Use sensory cues: "When this lullaby chime finishes, we put shoes on."',
        playPrompt: 'Play one short track from the Spotify Lullaby tab as a predictable bath/bedtime transition cue.',
      },
      {
        title: 'Big Body Energy Release',
        description: 'Frustration often builds from physical stillness. Proprioceptive pressure restores calm.',
        parentTip: 'Try "bear hugs" (deep pressure) or heavy work like pushing a laundry basket together.',
        playPrompt: 'Hop like Milo Bunny for 30 seconds to shake out jittery tension safely.',
      },
    ],
  },
  {
    id: 'motor',
    name: 'Fine Motor & Pencil Grip Foundations',
    age: '2 - 4 Years',
    icon: '🐰',
    color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    milestones: [
      {
        title: 'Pincer Grasp & Finger Isolation',
        description: 'Using index finger and thumb independently rather than whole-hand fisted palmar grasp.',
        parentTip: 'Tearing construction paper or peeling stickers builds the exact intrinsic hand muscles needed for future writing.',
        playPrompt: 'Trace the curved letters and zigzag hops in Milo Bunny’s Tracing Studio.',
      },
      {
        title: 'Cross-Body Bilateral Coordination',
        description: 'Reaching across the body’s midline without switching hands.',
        parentTip: 'Tape large butcher paper to the wall so they draw standing up, engaging shoulder stability.',
        playPrompt: 'Pop bubbles floating from the left side of the screen using their right hand.',
      },
    ],
  },
  {
    id: 'routines',
    name: 'Bedtime & Gentle Sleep Hygiene',
    age: '12 - 48 Months',
    icon: '✨',
    color: 'bg-amber-50 text-amber-900 border-amber-200',
    milestones: [
      {
        title: 'The 20-Minute Predictable Sequence',
        description: 'Bath → Dim Lighting → Storybook with Fawn & Fable → White Noise/Lullaby → Cuddle.',
        parentTip: 'Consistent sensory rituals trigger melatonin release 30% faster than variable schedules.',
        playPrompt: 'Listen to the Fawn & Fable Spotify peaceful stream at 20% volume as the lights dim.',
      },
      {
        title: 'Handling Bedtime Resistance with Limited Autonomy',
        description: 'Bedtime protests are usually bids for control after a day of being directed.',
        parentTip: 'Offer two acceptable choices: "Do you want the dragon pajamas or the stars?" Never "Is it bedtime?"',
        playPrompt: 'Read one episode together in the Storybook Studio before switching off screens.',
      },
    ],
  },
];

export function ParentingResourceGuide() {
  const [selectedCatId, setSelectedCatId] = useState<string>('language');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const activeCategory = MILESTONE_DATA.find((c) => c.id === selectedCatId) || MILESTONE_DATA[0];

  const handleCopyScript = (text: string, idx: number) => {
    sound.playPop();
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-stone-100 to-emerald-100 rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Evidence-Based Parenting Toolbox
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-stone-900">
              Toddler Milestones & Calming Scripts
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-medium">
              Practical child psychology tips, actionable de-escalation scripts, and developmentally calibrated activities designed for real daily parenting moments.
            </p>
          </div>

          <div className="bg-white px-4 py-3 rounded-2xl border-2 border-amber-300 shadow-sm shrink-0">
            <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
              Pediatric Guidance
            </span>
            <span className="text-sm font-black text-stone-900 flex items-center gap-1">
              <HeartHandshake className="w-4 h-4 text-emerald-600" /> Gentle Attachment Method
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {MILESTONE_DATA.map((cat) => {
          const isSelected = cat.id === selectedCatId;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playPop();
                setSelectedCatId(cat.id);
              }}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md scale-102'
                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xl">{cat.icon}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-amber-200' : 'bg-stone-100 text-stone-600'}`}>
                  {cat.age}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-black font-serif leading-tight">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Category Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-black font-serif text-stone-900 flex items-center gap-2">
            <span>{activeCategory.icon}</span>
            <span>{activeCategory.name} Guide</span>
          </h3>
          <span className="text-xs font-bold text-stone-500">
            {activeCategory.milestones.length} core strategies
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeCategory.milestones.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border-2 border-stone-200/90 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Step {idx + 1}
                  </span>
                  <button
                    onClick={() => handleCopyScript(`${item.title}: ${item.parentTip}`, idx)}
                    className="text-[11px] font-bold text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors"
                    title="Copy advice script"
                  >
                    {copiedIndex === idx ? (
                      <span className="text-emerald-700 font-black inline-flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Copied!
                      </span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                <h4 className="text-base font-black text-stone-900 mb-1.5 font-serif">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 mb-3 font-medium leading-relaxed">
                  {item.description}
                </p>

                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 mb-3">
                  <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1 mb-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Practical Parenting Tip
                  </span>
                  <p className="text-xs text-stone-700 font-semibold leading-relaxed">
                    "{item.parentTip}"
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-2.5 text-[11px] text-stone-600 flex items-start gap-1.5 font-medium mt-2">
                <ArrowRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900">Meadow Link:</strong> {item.playPrompt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
