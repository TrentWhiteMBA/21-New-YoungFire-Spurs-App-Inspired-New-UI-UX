import React from 'react';
import { Radio, Play, Pause, Volume2, VolumeX, ArrowLeft, Disc3 } from 'lucide-react';
import { GOSPEL_STATIONS, RadioStation } from '../data/radioStations';

interface LiveRadioPlayerProps {
  onBack?: () => void;
  onAudioDucking?: (duck: boolean) => void;
  activeStationId?: string;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onSelectStation?: (station: RadioStation) => void;
  volume?: number;
  onVolumeChange?: (vol: number) => void;
}

export const LiveRadioPlayer: React.FC<LiveRadioPlayerProps> = ({
  onBack,
  activeStationId,
  isPlaying = false,
  onTogglePlay,
  onSelectStation,
  volume = 0.8,
  onVolumeChange
}) => {
  const currentStation = GOSPEL_STATIONS.find(s => s.id === activeStationId) || GOSPEL_STATIONS[0];

  return (
    <div className="space-y-6 text-white font-['Outfit'] select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">24/7 Gospel Radio Ecosystem</h2>
            <p className="text-xs text-slate-400 font-mono">8 Global Broadcast Stations &bull; Praise Anthems</p>
          </div>
        </div>
      </div>

      {/* Main Broadcast Player Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#070C1C] to-black border border-amber-500/30 shadow-2xl flex flex-col items-center text-center space-y-4">
        <div className={`w-24 h-24 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)] ${
          isPlaying ? 'animate-pulse' : ''
        }`}>
          <Radio className="w-12 h-12" />
        </div>

        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-bold">
            LIVE BROADCAST • {currentStation.genre}
          </span>
          <h3 className="text-2xl font-bold text-white mt-2">{currentStation.name}</h3>
          <p className="text-xs text-slate-400 font-mono mt-1">{currentStation.description}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={onTogglePlay}
            className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xl transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Stations List */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block px-1">
          Available Gospel Broadcast Stations
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GOSPEL_STATIONS.map((station) => {
            const isSelected = station.id === currentStation.id;
            return (
              <button
                key={station.id}
                onClick={() => onSelectStation && onSelectStation(station)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-white ring-1 ring-amber-400'
                    : 'bg-[#070C1C] border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{station.name}</h4>
                  <p className="text-[10px] text-amber-400 font-mono mt-0.5">{station.genre}</p>
                </div>
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LiveRadioPlayer;
