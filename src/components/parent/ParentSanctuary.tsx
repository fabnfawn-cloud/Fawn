import { useState, ReactNode } from 'react';
import { MessageSquare, Calendar, BookOpen, Music, Film, ShoppingBag, BookMarked, Sparkles, Volume2 } from 'lucide-react';
import { FawnAiChat } from './FawnAiChat';
import { LessonPlanGenerator } from './LessonPlanGenerator';
import { ParentingResourceGuide } from './ParentingResourceGuide';
import { SubstackLibrary } from './SubstackLibrary';
import { SpotifyPlayer } from './SpotifyPlayer';
import { DriveVideoTheater } from './DriveVideoTheater';
import { StoreShowcase } from './StoreShowcase';
import { sound } from '../../utils/audio';
import { VoiceSettingsModal } from '../common/VoiceSettingsModal';

type ParentTab = 'parenting-guide' | 'ai-chat' | 'lesson-plan' | 'substack' | 'spotify' | 'video' | 'store';

export function ParentSanctuary() {
  const [activeTab, setActiveTab] = useState<ParentTab>('parenting-guide');
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const tabs: Array<{ id: ParentTab; label: string; icon: ReactNode; badge?: string }> = [
    { id: 'parenting-guide', label: 'Parenting Guide & Milestones', icon: <BookMarked className="w-4 h-4 text-amber-400" />, badge: 'Core Resource' },
    { id: 'ai-chat', label: 'Ask Fawn (AI)', icon: <MessageSquare className="w-4 h-4" />, badge: 'Gemini AI' },
    { id: 'lesson-plan', label: 'Lesson Plan Studio', icon: <Calendar className="w-4 h-4" /> },
    { id: 'substack', label: 'Substack Journal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'spotify', label: 'Spotify Lullabies', icon: <Music className="w-4 h-4" /> },
    { id: 'video', label: 'Drive Video Safe Theater', icon: <Film className="w-4 h-4" /> },
    { id: 'store', label: 'fawnandfable.store', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Sub-Navigation Tabs with Voice Warmth Trigger */}
      <div className="flex items-center justify-between gap-3 border-b border-stone-200/80 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'bg-stone-900 text-amber-100 shadow-sm'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:text-stone-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-md font-semibold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            sound.playPop();
            setShowVoiceModal(true);
          }}
          className="hidden md:flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300/80 transition-all shrink-0 shadow-2xs"
          title="Calibrate voice tone warmth & character personas"
        >
          <Volume2 className="w-4 h-4 text-amber-700" />
          <span>Voice Warmth</span>
        </button>
      </div>

      {/* Dynamic Tab Content */}
      <main>
        {activeTab === 'parenting-guide' && <ParentingResourceGuide />}
        {activeTab === 'ai-chat' && <FawnAiChat />}
        {activeTab === 'lesson-plan' && <LessonPlanGenerator />}
        {activeTab === 'substack' && <SubstackLibrary />}
        {activeTab === 'spotify' && <SpotifyPlayer />}
        {activeTab === 'video' && <DriveVideoTheater />}
        {activeTab === 'store' && <StoreShowcase />}
      </main>

      <VoiceSettingsModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
      />
    </div>
  );
}
