import React from 'react';
import { Music, X, Radio, Volume2, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';

interface SpotifyYouTubePlayerProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
  isDucked?: boolean;
  masterVolume?: number;
  onMasterVolumeChange?: (vol: number) => void;
  onSwitchToRadio?: () => void;
}

export const SpotifyYouTubePlayer: React.FC<SpotifyYouTubePlayerProps> = ({
  isOpen,
  onToggleOpen,
  onSwitchToRadio,
  masterVolume = 0.8,
  onMasterVolumeChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 bg-[#070C1C] border border-amber-500/40 rounded-3xl p-4 shadow-2xl animate-slideUp text-white font-['Outfit'] select-none">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold">Worship Audio Dock</h4>
            <p className="text-[9px] font-mono text-slate-400">Sanctuary Streaming</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onSwitchToRadio && (
            <button
              onClick={onSwitchToRadio}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-400"
              title="Switch to 24/7 Gospel Radio"
            >
              <Radio className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onToggleOpen}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="py-3 flex items-center justify-between">
        <div>
          <h5 className="text-xs font-bold text-white">Rebuilding Better Together</h5>
          <p className="text-[10px] text-amber-400 font-mono">Joshua House of Worship</p>
        </div>
      </div>
    </div>
  );
};

export default SpotifyYouTubePlayer;
