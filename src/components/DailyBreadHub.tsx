import React from 'react';
import { BookOpen, ArrowLeft, Sun, Moon, Sparkles, Share2 } from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';

interface DailyBreadHubProps {
  currentUser?: CurrentUser | null;
  onBack: () => void;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
}

export const DailyBreadHub: React.FC<DailyBreadHubProps> = ({
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
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Daily Bread Hub</h2>
            <p className="text-xs text-slate-400 font-mono">Morning Manna &amp; Evening Solace Scriptures</p>
          </div>
        </div>
      </div>

      {/* Morning Manna Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-[#070C1C] to-black border border-amber-500/30 space-y-3 shadow-xl">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
            Morning Manna Devotion
          </span>
        </div>

        <h3 className="text-lg font-bold text-white">
          &ldquo;From whom the whole body fitly joined together and compacted by that which every joint supplieth...&rdquo;
        </h3>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => onNavigateToScripture && onNavigateToScripture('EPH', 4, 16)}
            className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Ephesians 4:16 (KJV)</span>
          </button>

          <span className="text-[10px] font-mono text-slate-400">
            Rebuilding Better Together
          </span>
        </div>
      </div>

      {/* Evening Solace Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-[#070C1C] to-black border border-cyan-500/30 space-y-3 shadow-xl">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
            Evening Solace Rest
          </span>
        </div>

        <h3 className="text-lg font-bold text-white">
          &ldquo;Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.&rdquo;
        </h3>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => onNavigateToScripture && onNavigateToScripture('JHN', 14, 27)}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>John 14:27 (KJV)</span>
          </button>

          <span className="text-[10px] font-mono text-slate-400">
            Unbroken Sacred Peace
          </span>
        </div>
      </div>
    </div>
  );
};

export default DailyBreadHub;
