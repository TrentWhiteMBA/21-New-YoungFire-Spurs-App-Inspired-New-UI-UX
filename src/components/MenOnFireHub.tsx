import React from 'react';
import { Flame, ArrowLeft, Shield, Users, BookOpen, Video } from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';

interface MenOnFireHubProps {
  currentUser?: CurrentUser | null;
  onBack: () => void;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
}

export const MenOnFireHub: React.FC<MenOnFireHubProps> = ({
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
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white">Men on Fire Brotherhood Hub</h2>
              <p className="text-xs text-slate-400 font-mono">Joshua House of Worship &bull; Wednesday 7:30 PM CST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Vision */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-[#070C1C] to-black border border-amber-500/30 space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
          Brotherhood Accountability &bull; Spiritual Warfare &bull; The Mantle
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Men on Fire gathers young men in living room cohorts and virtual war rooms to study the pure Word, build generational accountability, and intercede for families and the community.
        </p>

        <div className="flex items-center gap-3 pt-2">
          {onNavigateToScripture && (
            <button
              onClick={() => onNavigateToScripture('1CO', 16, 13)}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>1 Corinthians 16:13 — Watch ye, stand fast in the faith</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenOnFireHub;
