import React, { useState, useEffect } from 'react';
import { Users, Shield, Heart, Mail, Phone, BookOpen, Flame, Sparkles, MapPin } from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';

interface SanctuaryTeamHubProps {
  currentUser?: CurrentUser | null;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
  onNavigate?: (tab: string, subView?: any) => void;
}

interface TeamMember {
  id: string;
  fullName: string;
  role: string;
  calling: string;
  group: string;
  email?: string;
  residence: string;
  avatar?: string;
  isAdmin?: boolean;
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: 'roster_lead_trent',
    fullName: 'Lead Facilitator Trent D. White',
    role: 'Lead Facilitator',
    calling: 'Sanctuary Leadership & Overseer',
    group: 'YoungFire',
    residence: 'San Antonio, TX',
    email: 'trentwhite0308@gmail.com',
    avatar: '/image_4.png',
    isAdmin: true
  },
  {
    id: 'roster_lead_whitney',
    fullName: 'Lead Facilitator Whitney White',
    role: 'Lead Facilitator',
    calling: 'Sanctuary Leadership & Overseer',
    group: 'YoungFire',
    residence: 'San Antonio, TX',
    email: 'whitneywhite@jhow.org',
    avatar: '/image_2.png',
    isAdmin: true
  },
  {
    id: 'roster_intercessor_1',
    fullName: 'David Alcantara',
    role: 'Intercessor',
    calling: 'Sacred Wall Watchman',
    group: 'Men on Fire',
    residence: 'San Antonio, TX'
  },
  {
    id: 'roster_sister_1',
    fullName: 'Gabriella Morales',
    role: 'Worship Psalmist',
    calling: 'Praise & Creative Arts',
    group: 'Women Ignited',
    residence: 'San Antonio, TX'
  }
];

export const SanctuaryTeamHub: React.FC<SanctuaryTeamHubProps> = ({
  currentUser,
  onNavigateToScripture,
  onNavigate
}) => {
  const [members, setMembers] = useState<TeamMember[]>(DEFAULT_MEMBERS);

  useEffect(() => {
    fetch('/api/roster')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.members) && data.members.length > 0) {
          setMembers(data.members);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 text-white font-['Outfit'] select-none">
      {/* Header */}
      <div className="p-5 rounded-3xl bg-[#070C1C] border border-amber-500/30 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">Sanctuary Team &amp; Roster Hub</h2>
          <p className="text-xs text-slate-400 font-mono">Joshua House of Worship • Fellowship Shepherds &amp; Leaders</p>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-4 rounded-2xl bg-[#070C1C] border border-white/10 hover:border-amber-400/40 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-amber-400/50 flex items-center justify-center text-amber-400 font-bold overflow-hidden flex-shrink-0">
              {member.avatar ? (
                <img src={member.avatar} alt={member.fullName} className="w-full h-full object-cover" />
              ) : (
                member.fullName.slice(0, 2).toUpperCase()
              )}
            </div>

            <div className="truncate flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                  {member.fullName}
                </h4>
                {member.isAdmin && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-500/30">
                    Overseer
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-400 font-mono truncate">{member.calling}</p>
              <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>{member.residence}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SanctuaryTeamHub;
