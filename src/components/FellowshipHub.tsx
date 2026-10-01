import React, { useState } from 'react';
import { 
  Users, Flame, Video, Radio, BookOpen, Heart, 
  ChevronRight, Calendar, Sparkles, MessageSquare, ArrowLeft
} from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';

interface FellowshipHubProps {
  onNavigate: (dest: string, subView?: any) => void;
  onBack: () => void;
  initialDrillDown?: string | null;
  currentUser?: CurrentUser | null;
}

interface HubCohort {
  id: string;
  title: string;
  category: string;
  tagline: string;
  dest: string;
  accent: string;
  icon: any;
}

const FELLOWSHIP_COHORTS: HubCohort[] = [
  {
    id: 'men',
    title: 'Men on Fire Brotherhood Hub',
    category: 'Brotherhood Discipleship',
    tagline: 'Authentic men huddling in the Word, prayer, and kingdom strength.',
    dest: 'men',
    accent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    icon: Flame
  },
  {
    id: 'women',
    title: 'Women Ignited Sisterhood Hub',
    category: 'Sisterhood Fellowship',
    tagline: 'Consecrated sisterhood, creative ministry, and spiritual life.',
    dest: 'women',
    accent: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    icon: Heart
  },
  {
    id: 'discipleship',
    title: 'My Discipleship Vault',
    category: 'Sword Check-In & Study',
    tagline: '12 authentic discipleship sessions and personal spiritual growth.',
    dest: 'discipleship',
    accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    icon: BookOpen
  },
  {
    id: 'prayer_dock',
    title: '24/7 Prayer Dock',
    category: 'Intercession & Petitions',
    tagline: 'Sacred intercession watch and community prayer petitions.',
    dest: 'prayer_dock',
    accent: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    icon: Sparkles
  },
  {
    id: 'tv',
    title: 'Kingdom Video Vault & Worship TV',
    category: 'Sermons & Praise Media',
    tagline: 'Over 200 JHOW sermons, BibleProject sessions, and worship encounters.',
    dest: 'tv',
    accent: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    icon: Video
  },
  {
    id: 'radio',
    title: '24/7 Gospel Radio Ecosystem',
    category: 'Global Praise Stations',
    tagline: '8 live stations delivering nonstop praise, soaking, and urban worship.',
    dest: 'radio',
    accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    icon: Radio
  }
];

export const FellowshipHub: React.FC<FellowshipHubProps> = ({
  onNavigate,
  onBack,
  initialDrillDown,
  currentUser
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
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Sanctuary Fellowship Hubs</h2>
            <p className="text-xs text-slate-400 font-mono">12 Ministry Centers • Joshua House of Worship</p>
          </div>
        </div>
      </div>

      {/* Cohorts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FELLOWSHIP_COHORTS.map((cohort) => {
          const Icon = cohort.icon;
          return (
            <button
              key={cohort.id}
              onClick={() => onNavigate(cohort.dest)}
              className="p-5 rounded-3xl bg-[#070C1C] border border-white/10 hover:border-amber-400/40 text-left transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${cohort.accent}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  {cohort.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {cohort.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {cohort.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FellowshipHub;
