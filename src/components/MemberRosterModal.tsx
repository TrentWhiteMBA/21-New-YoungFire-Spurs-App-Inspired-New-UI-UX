import React, { useState, useEffect } from 'react';
import { X, Users, Search, Plus, Mail, Phone, MapPin, Shield, CheckCircle2 } from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';

export interface RosterMember {
  id: string;
  fullName: string;
  name?: string;
  role: string;
  ministryRole?: string;
  calling: string;
  group: string;
  gender?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  churchMembership: string;
  residence: string;
  accountType?: string;
  isAdmin?: boolean;
  prayerRequests?: string;
  notes?: string;
}

interface MemberRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: CurrentUser | null;
}

export const MemberRosterModal: React.FC<MemberRosterModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [members, setMembers] = useState<RosterMember[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetch('/api/roster')
        .then(res => res.json())
        .then(data => {
          if (data && Array.isArray(data.members)) {
            setMembers(data.members);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = members.filter(m =>
    m.fullName.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    (m.email && m.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none font-['Outfit']">
      <div className="relative w-full max-w-2xl bg-[#070C1C] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">Sanctuary Member Roster</h3>
              <p className="text-[10px] font-mono text-slate-400">Joshua House of Worship Directory</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search disciples by name, role, calling..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Members List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filtered.map((member) => (
            <div
              key={member.id}
              className="p-3.5 rounded-2xl bg-[#0B1329] border border-white/10 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-amber-400 flex items-center justify-center text-amber-400 font-bold overflow-hidden flex-shrink-0">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.fullName} className="w-full h-full object-cover" />
                  ) : (
                    member.fullName.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{member.fullName}</h4>
                    {member.isAdmin && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-500/30">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-amber-400 font-mono">{member.calling || member.role}</p>
                  {member.email && (
                    <p className="text-[9px] text-slate-400 font-mono">{member.email}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberRosterModal;
