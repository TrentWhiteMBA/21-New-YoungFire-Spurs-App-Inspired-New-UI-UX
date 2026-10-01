import React from 'react';
import { Heart, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';

interface WomenIgnitedHubProps {
  currentUser?: CurrentUser | null;
  onBack: () => void;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
}

export const WomenIgnitedHub: React.FC<WomenIgnitedHubProps> = ({
  currentUser,
  onBack,
  onNavigateToScripture
}) => {
  return (
    <div className="space-y-6 text-white font-['Outfit'] select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white">Women Ignited Sisterhood Hub</h2>
              <p className="text-xs text-slate-400 font-mono">Joshua House of Worship &bull; Thursday 7:00 PM CST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Vision */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-950/40 via-[#070C1C] to-black border border-rose-500/30 space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
          Sisterhood Prayer &bull; Heart Consecration &bull; Joyful Fellowship
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Women Ignited creates a holy space for young adult women to grow in intimacy with Christ, embrace their divine purpose, and sharpen one another through love, creative praise, and authentic sisterhood.
        </p>

        <div className="flex items-center gap-3 pt-2">
          {onNavigateToScripture && (
            <button
              onClick={() => onNavigateToScripture('PRO', 31, 25)}
              className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400 text-rose-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Proverbs 31:25 — Strength and honour are her clothing</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WomenIgnitedHub;
