import React, { useState } from 'react';
import { Video, Play, ExternalLink, ArrowLeft, Search, Sparkles } from 'lucide-react';

export interface VideoItem {
  id: string;
  title: string;
  artist: string;
  category: string;
  youtubeId: string;
  duration?: string;
  albumArt?: string;
  thematicFocus?: string;
}

export const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 'jhow_sermon_1',
    title: 'Rebuilding Better Together — 2026 Annual Theme Celebration',
    artist: 'Joshua House of Worship',
    category: 'JHOW Sermons',
    youtubeId: 'rCSwaCZsAHg',
    duration: '1:12:45',
    albumArt: 'https://img.youtube.com/vi/rCSwaCZsAHg/hqdefault.jpg'
  },
  {
    id: 'jhow_sermon_2',
    title: 'Welcome to The Relaunch — Stepping Into Divine Momentum',
    artist: 'Joshua House of Worship',
    category: 'JHOW Sermons',
    youtubeId: 'jD36AIKAqp4',
    duration: '58:30',
    albumArt: 'https://img.youtube.com/vi/jD36AIKAqp4/hqdefault.jpg'
  },
  {
    id: 'jhow_worship_1',
    title: 'YoungFire Consecration & Worship Night',
    artist: 'YoungFire Praise Collective',
    category: 'Worship TV',
    youtubeId: 'W3q8Od5qJio',
    duration: '45:10',
    albumArt: 'https://img.youtube.com/vi/W3q8Od5qJio/hqdefault.jpg'
  }
];

interface KingdomVideoVaultProps {
  onSelectVideo?: (video: VideoItem) => void;
  onBack?: () => void;
}

export const KingdomVideoVault: React.FC<KingdomVideoVaultProps> = ({
  onSelectVideo,
  onBack
}) => {
  const [search, setSearch] = useState('');
  const videos = DEFAULT_VIDEOS;

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.artist.toLowerCase().includes(search.toLowerCase()) ||
    v.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white font-['Outfit'] select-none">
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
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Kingdom Video Vault</h2>
            <p className="text-xs text-slate-400 font-mono">200+ JHOW Sermons &bull; Worship Encounters</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((video) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo && onSelectVideo(video)}
            className="p-3 rounded-2xl bg-[#070C1C] border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer group space-y-2.5"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
              <img
                src={video.albumArt || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                {video.category}
              </span>
              <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                {video.title}
              </h4>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{video.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KingdomVideoVault;
