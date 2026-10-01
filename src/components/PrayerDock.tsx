import React, { useState } from 'react';
import { Heart, Plus, Sparkles, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';

interface PrayerDockProps {
  currentUser?: CurrentUser | null;
  onBack: () => void;
}

interface PrayerItem {
  id: string;
  cause: string;
  authorName: string;
  prayedCount: number;
  hasPrayed?: boolean;
}

const DEFAULT_PRAYERS: PrayerItem[] = [
  {
    id: 'prayer_1',
    cause: 'Revival and spiritual awakening across the youth and young adults of San Antonio.',
    authorName: 'Lead Facilitator Trent White',
    prayedCount: 38
  },
  {
    id: 'prayer_2',
    cause: 'Divine wisdom, favor, and spiritual strength for our young adults entering careers and college.',
    authorName: 'Whitney White',
    prayedCount: 29
  },
  {
    id: 'prayer_3',
    cause: 'Healing, restoration, and emotional peace for all fellowship members under physical trial.',
    authorName: 'Sanctuary Intercessors',
    prayedCount: 44
  }
];

export const PrayerDock: React.FC<PrayerDockProps> = ({
  currentUser,
  onBack
}) => {
  const [prayers, setPrayers] = useState<PrayerItem[]>(DEFAULT_PRAYERS);
  const [newRequest, setNewRequest] = useState('');

  const handlePray = (id: string) => {
    setPrayers(prev => prev.map(p => {
      if (p.id === id) {
        const next = !p.hasPrayed;
        return {
          ...p,
          hasPrayed: next,
          prayedCount: next ? p.prayedCount + 1 : Math.max(0, p.prayedCount - 1)
        };
      }
      return p;
    }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.trim()) return;
    const item: PrayerItem = {
      id: `prayer_${Date.now()}`,
      cause: newRequest.trim(),
      authorName: currentUser?.name || 'Sanctuary Disciple',
      prayedCount: 1,
      hasPrayed: true
    };
    setPrayers([item, ...prayers]);
    setNewRequest('');
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
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">24/7 Prayer Dock</h2>
            <p className="text-xs text-slate-400 font-mono">Sacred Intercession Watch &bull; Community Petitions</p>
          </div>
        </div>
      </div>

      {/* Submit Form */}
      <form onSubmit={handleAdd} className="p-4 rounded-2xl bg-[#070C1C] border border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Post a Sacred Intercession Petition</span>
        </div>
        <textarea
          value={newRequest}
          onChange={(e) => setNewRequest(e.target.value)}
          placeholder="Enter your prayer request or praise report..."
          rows={3}
          className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:border-amber-400 focus:outline-none resize-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 cursor-pointer shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Petition</span>
          </button>
        </div>
      </form>

      {/* Prayers List */}
      <div className="space-y-3">
        {prayers.map((prayer) => (
          <div
            key={prayer.id}
            className="p-4 sm:p-5 rounded-2xl bg-[#070C1C] border border-white/10 flex items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-mono text-slate-400">
                Posted by {prayer.authorName}
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {prayer.cause}
              </p>
            </div>

            <button
              onClick={() => handlePray(prayer.id)}
              className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 text-xs font-mono transition-all cursor-pointer flex-shrink-0 ${
                prayer.hasPrayed
                  ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                  : 'bg-white/5 border-white/15 text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${prayer.hasPrayed ? 'fill-current' : ''}`} />
              <span>{prayer.prayedCount} Prayed</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerDock;
