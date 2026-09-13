import { useState } from 'react';
import { BookOpen, ExternalLink, Bookmark, Sparkles } from 'lucide-react';
import { SUBSTACK_ARTICLES, SubstackArticle } from '../../data/characters';
import { sound } from '../../utils/audio';
import { ParentGateModal } from '../ParentGateModal';

export function SubstackLibrary() {
  const [filter, setFilter] = useState('All');
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [showGate, setShowGate] = useState(false);

  const categories = ['All', 'Daily Rhythms', 'Early Literacy', 'Social-Emotional', 'Math & Logic'];

  const filteredArticles = filter === 'All'
    ? SUBSTACK_ARTICLES
    : SUBSTACK_ARTICLES.filter((a) => a.category === filter);

  const handleOpenArticle = (url: string) => {
    sound.playPop();
    setPendingUrl(url);
    setShowGate(true);
  };

  const handleGatePassed = () => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank', 'noopener,noreferrer');
      setPendingUrl(null);
    }
  };

  return (
    <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-amber-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" /> Fawn & Fable Substack
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Parenting Journal & Developmental Reads
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
            Thoughtful essays, gentle co-regulation guidance, and play recipes from our official publication.
          </p>
        </div>

        <button
          onClick={() => handleOpenArticle('https://substack.com/@fawnandfable?utm_source=share&utm_medium=android&r=8uahf1')}
          className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-amber-100 rounded-xl text-xs font-bold shadow-xs transition-colors"
        >
          <span>Visit @fawnandfable Substack</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playPop();
              setFilter(cat);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === cat
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-amber-50/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredArticles.map((article: SubstackArticle, idx: number) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border-2 border-amber-200/70 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold font-serif text-stone-900 group-hover:text-amber-700 transition-colors mb-2 leading-snug">
                {article.title}
              </h3>

              <p className="text-stone-600 text-xs font-medium italic mb-3">
                {article.subtitle}
              </p>

              <p className="text-stone-600 text-xs leading-relaxed bg-[#FAF7F2] p-3 rounded-2xl border border-stone-100 mb-4">
                "{article.excerpt}"
              </p>
            </div>

            <button
              onClick={() => handleOpenArticle(article.url)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Read Full Article on Substack</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Substack Newsletter Quote */}
      <div className="mt-8 bg-amber-50/80 rounded-2xl p-5 border border-amber-200 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-200/70 flex items-center justify-center text-2xl shrink-0">
          📜
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold text-amber-900 block mb-0.5">
            The Fawn & Fable Slow Living Manifesto:
          </span>
          <p className="text-xs text-stone-700 leading-relaxed italic">
            "We believe childhood is a meadow to be gently wandered through, not a race to be won. When we protect space for slow wonder, literacy and confidence emerge naturally."
          </p>
        </div>
      </div>

      <ParentGateModal
        isOpen={showGate}
        onClose={() => setShowGate(false)}
        onSuccess={handleGatePassed}
        targetDescription="open the Fawn & Fable Substack in a new tab"
      />
    </div>
  );
}
