import { useState, FormEvent } from 'react';
import { Film, Play, Plus, Sparkles, Check, Info } from 'lucide-react';
import { CURATED_DRIVE_VIDEOS, DriveVideo } from '../../data/characters';
import { sound } from '../../utils/audio';

export function DriveVideoTheater() {
  const [videoList, setVideoList] = useState<DriveVideo[]>(CURATED_DRIVE_VIDEOS);
  const [activeVideo, setActiveVideo] = useState<DriveVideo>(CURATED_DRIVE_VIDEOS[0]);
  const [customDriveUrl, setCustomDriveUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Extract drive file ID from standard Google Drive URL format
  const extractDriveId = (url: string): string | null => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return match[1];
    }
    // Check if user entered raw ID
    if (/^[a-zA-Z0-9_-]{20,}$/.test(url.trim())) {
      return url.trim();
    }
    return null;
  };

  const handleAddDriveVideo = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const fileId = extractDriveId(customDriveUrl);
    if (!fileId && !customDriveUrl.includes('preview')) {
      setErrorMsg('Please enter a valid Google Drive share link (e.g. drive.google.com/file/d/.../view) or Drive file ID.');
      return;
    }

    const previewUrl = fileId
      ? `https://drive.google.com/file/d/${fileId}/preview`
      : customDriveUrl;

    const newVideo: DriveVideo = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim() || 'Custom Fawn & Fable Story Video',
      narrator: 'Google Drive Video',
      duration: 'Safe Video',
      category: 'Storytime',
      description: 'Loaded safely from Google Drive with zero external ads or tracking.',
      drivePreviewUrl: previewUrl,
      thumbnailColor: 'from-amber-400 to-emerald-400',
    };

    setVideoList([newVideo, ...videoList]);
    setActiveVideo(newVideo);
    setCustomDriveUrl('');
    setCustomTitle('');
    setShowAddForm(false);
    sound.playSuccess();
  };

  return (
    <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-amber-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
            <Film className="w-3.5 h-3.5 text-amber-700" /> Safe Google Drive Video Theater
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Ad-Free Toddler Storytime & Lessons
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
            Stream curated Fawn & Fable storybooks, songs, or connect your private Google Drive videos for an entirely distraction-free safe space.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playPop();
            setShowAddForm(!showAddForm);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'Add Drive Video'}</span>
        </button>
      </div>

      {/* Add Custom Google Drive Video Form */}
      {showAddForm && (
        <form onSubmit={handleAddDriveVideo} className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md mb-8 animate-fade-in">
          <h3 className="text-base font-bold font-serif text-stone-900 mb-1">
            Add a Video from your Google Drive
          </h3>
          <p className="text-xs text-stone-500 mb-4">
            Paste any Google Drive video share link (set access to "Anyone with the link can view"). It will stream cleanly without commercial ads or distracting autoplay recommendations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-bold text-stone-600 uppercase block mb-1">Video Title:</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Bedtime Chapter 2 with Fawn"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs font-medium text-stone-800 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-600 uppercase block mb-1">Google Drive Share Link or File ID:</label>
              <input
                type="text"
                value={customDriveUrl}
                onChange={(e) => setCustomDriveUrl(e.target.value)}
                placeholder="https://drive.google.com/file/d/1a2b3c.../view"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs font-medium text-stone-800 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-rose-600 text-xs font-medium mb-3">
              {errorMsg}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs"
            >
              Load Video into Safe Theater
            </button>
          </div>
        </form>
      )}

      {/* Main Video Player & Playlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Active Player */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-sm">
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-stone-950 shadow-inner relative flex items-center justify-center">
            {activeVideo.drivePreviewUrl.includes('preview-') ? (
              /* Simulation/Curated Storyboard Player for preview items */
              <div className={`w-full h-full bg-gradient-to-br ${activeVideo.thumbnailColor} flex flex-col items-center justify-center p-8 text-center text-white relative`}>
                <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center mb-4 shadow-xl border-2 border-white/50 animate-pulse">
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full mb-2">
                  {activeVideo.category} • Ad-Free Safe Mode
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif max-w-md drop-shadow-sm">
                  {activeVideo.title}
                </h3>
                <p className="text-xs opacity-90 mt-2 max-w-sm">
                  Narrated by {activeVideo.narrator} ({activeVideo.duration})
                </p>
                <span className="absolute bottom-4 right-4 text-[10px] bg-black/30 px-2.5 py-1 rounded-md text-white/80">
                  Google Drive Safe Stream
                </span>
              </div>
            ) : (
              <iframe
                title={activeVideo.title}
                src={activeVideo.drivePreviewUrl}
                width="100%"
                height="100%"
                allow="autoplay; fullscreen"
                className="w-full h-full rounded-2xl border-none"
              />
            )}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {activeVideo.category}
              </span>
              <h3 className="text-lg font-bold font-serif text-stone-900 mt-1">
                {activeVideo.title}
              </h3>
            </div>
            <span className="text-xs font-medium text-stone-500">
              Duration: {activeVideo.duration}
            </span>
          </div>

          <p className="text-xs text-stone-600 mt-3 leading-relaxed">
            {activeVideo.description}
          </p>

          <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs text-emerald-900 font-medium">
            <Info className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              This theater blocks all 3rd-party commercial advertising, suggestions, and comments to keep toddlers calm and safe.
            </span>
          </div>
        </div>

        {/* Video Playlist */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            Available Video Stories:
          </h4>
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {videoList.map((vid) => {
              const isSelected = activeVideo.id === vid.id;
              return (
                <button
                  key={vid.id}
                  onClick={() => {
                    sound.playPop();
                    setActiveVideo(vid);
                  }}
                  className={`w-full p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 text-left ${
                    isSelected
                      ? 'bg-amber-100/70 border-amber-500 shadow-xs ring-1 ring-amber-300'
                      : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-amber-50/30'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${vid.thumbnailColor} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-stone-900 font-serif truncate">
                      {vid.title}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {vid.narrator} • {vid.duration}
                    </div>
                    <span className="inline-block text-[10px] text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.2 rounded-md mt-1">
                      {vid.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
