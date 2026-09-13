import { useState } from 'react';
import { ShoppingBag, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { FAWN_AND_FABLE_ADS, StoreItem } from '../../data/characters';
import { sound } from '../../utils/audio';
import { ParentGateModal } from '../ParentGateModal';

export function StoreShowcase() {
  const [showGate, setShowGate] = useState(false);
  const [targetUrl, setTargetUrl] = useState('https://fawnandfable.store');

  const handleOpenStore = (url: string) => {
    sound.playPop();
    setTargetUrl(url);
    setShowGate(true);
  };

  return (
    <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-amber-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-700" /> Exclusive Brand Boutique
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Fawn & Fable Shop
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
            Ethical, heirloom-quality wooden blocks, plush companions, and storybooks. (Zero 3rd-party commercial advertising).
          </p>
        </div>

        <button
          onClick={() => handleOpenStore('https://fawnandfable.store')}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
        >
          <span>Visit fawnandfable.store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Featured Boutique Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FAWN_AND_FABLE_ADS.map((item: StoreItem) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 border-2 border-amber-200/70 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Product Visual Mock */}
              <div className={`w-full aspect-square rounded-2xl ${item.imagePlaceholderColor} border flex flex-col items-center justify-center p-4 mb-4 relative overflow-hidden shadow-inner`}>
                <span className="text-6xl mb-2 group-hover:scale-110 transition-transform">
                  {item.iconEmoji}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                  fawnandfable.store
                </span>
                <span className="absolute top-2 right-2 text-[10px] font-bold bg-white text-stone-800 px-2 py-0.5 rounded-full shadow-xs">
                  {item.tag}
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold text-stone-900 text-sm font-serif leading-snug">
                  {item.title}
                </h3>
                <span className="text-sm font-bold text-amber-900 ml-2">
                  {item.price}
                </span>
              </div>

              <p className="text-stone-500 text-xs mt-2 leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>

            <button
              onClick={() => handleOpenStore(item.url)}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View on fawnandfable.store</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Zero 3rd-Party Ads Guarantee Banner */}
      <div className="mt-8 bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs text-emerald-950">
          <strong className="block font-semibold">Our Child-Safe Advertising Promise:</strong>
          <span>This app is completely free of third-party advertising, commercial tracking, and external sponsorships. The only featured items are our own brand creations at fawnandfable.store.</span>
        </div>
      </div>

      <ParentGateModal
        isOpen={showGate}
        onClose={() => setShowGate(false)}
        onSuccess={() => {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }}
        targetDescription="visit the official fawnandfable.store website"
      />
    </div>
  );
}
