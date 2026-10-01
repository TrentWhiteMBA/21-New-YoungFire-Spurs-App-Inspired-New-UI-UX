import React, { useState } from 'react';
import { BookMarked, ArrowLeft, CheckCircle2, Flame, Award, Calendar } from 'lucide-react';

interface PhysicalBibleTrackerProps {
  onBack: () => void;
}

export const PhysicalBibleTracker: React.FC<PhysicalBibleTrackerProps> = ({ onBack }) => {
  const [streak, setStreak] = useState(14);
  const [checkedToday, setCheckedToday] = useState(false);

  const handleCheckIn = () => {
    if (!checkedToday) {
      setCheckedToday(true);
      setStreak(prev => prev + 1);
    }
  };

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
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Physical Bible Tracker</h2>
            <p className="text-xs text-slate-400 font-mono">Paper Sword Reading Plan &bull; Daily Streaks</p>
          </div>
        </div>
      </div>

      {/* Streak Dashboard Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-[#070C1C] to-black border border-amber-500/30 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-400">
          <Flame className="w-8 h-8 fill-current drop-shadow" />
        </div>

        <div>
          <span className="text-4xl font-black font-['Anton'] tracking-wider text-white">
            {streak} DAYS
          </span>
          <p className="text-xs font-mono text-amber-400 mt-1 uppercase tracking-widest">
            Unbroken Paper Sword Streak
          </p>
        </div>

        <button
          onClick={handleCheckIn}
          disabled={checkedToday}
          className={`w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-lg transition-all ${
            checkedToday
              ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{checkedToday ? 'Sword Checked In for Today!' : 'Check In Today’s Reading'}</span>
        </button>
      </div>
    </div>
  );
};

export default PhysicalBibleTracker;
