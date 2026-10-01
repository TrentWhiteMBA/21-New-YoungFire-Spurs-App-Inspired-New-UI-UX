import React from 'react';
import { X, Maximize2 } from 'lucide-react';

interface FloatingVideoPlayerProps {
  video: { id: string; title: string; youtubeId: string } | null;
  onClose: () => void;
  onExpand: () => void;
}

export const FloatingVideoPlayer: React.FC<FloatingVideoPlayerProps> = ({
  video,
  onClose,
  onExpand
}) => {
  if (!video) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 w-72 rounded-2xl bg-black border border-white/20 shadow-2xl overflow-hidden p-2 flex flex-col gap-1.5 text-white">
      <div className="flex items-center justify-between text-xs font-mono text-slate-300 px-1">
        <span className="truncate">{video.title}</span>
        <div className="flex items-center gap-1">
          <button onClick={onExpand} className="p-1 hover:text-white">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose} className="p-1 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-900">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default FloatingVideoPlayer;
