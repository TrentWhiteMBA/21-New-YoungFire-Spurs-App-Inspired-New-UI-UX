import React, { useState } from 'react';
import { VideoItem, DEFAULT_VIDEOS, KingdomVideoVault } from './KingdomVideoVault';
import { X, Maximize2, Minimize2, ArrowLeft, Play } from 'lucide-react';

interface KingdomMediaViewProps {
  isPiP?: boolean;
  onExpandToTheater?: () => void;
  onCloseVideo?: () => void;
  onBack?: () => void;
  onAudioDucking?: (duck: boolean) => void;
  onFloatVideo?: (video: any) => void;
  onActiveVideoChange?: (video: any) => void;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
  onPlayTrackInDock?: (video: any) => void;
}

export const KingdomMediaView: React.FC<KingdomMediaViewProps> = ({
  isPiP = false,
  onExpandToTheater,
  onCloseVideo,
  onBack,
  onFloatVideo,
  onActiveVideoChange
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(DEFAULT_VIDEOS[0]);

  const handleSelect = (video: VideoItem) => {
    setActiveVideo(video);
    if (onActiveVideoChange) onActiveVideoChange(video);
  };

  if (isPiP) {
    return (
      <div className="fixed bottom-20 right-4 z-50 w-72 rounded-2xl bg-black border border-white/20 shadow-2xl overflow-hidden p-2 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-300 px-1">
          <span className="truncate">{activeVideo.title}</span>
          <div className="flex items-center gap-1">
            {onExpandToTheater && (
              <button onClick={onExpandToTheater} className="p-1 hover:text-white">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
            {onCloseVideo && (
              <button onClick={onCloseVideo} className="p-1 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-900">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
            title={activeVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white font-['Outfit'] select-none">
      {/* Active Player */}
      <div className="space-y-3">
        <div className="aspect-video w-full rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
            title={activeVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div>
          <span className="text-xs font-mono text-amber-400 font-bold uppercase">{activeVideo.category}</span>
          <h2 className="text-xl font-bold text-white mt-0.5">{activeVideo.title}</h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{activeVideo.artist}</p>
        </div>
      </div>

      {/* Video Vault Catalog */}
      <KingdomVideoVault onSelectVideo={handleSelect} onBack={onBack} />
    </div>
  );
};

export default KingdomMediaView;
