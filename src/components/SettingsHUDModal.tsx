import React, { useState } from 'react';
import { 
  X, User, Shield, Volume2, VolumeX, Sparkles, Sliders, 
  LogOut, ShieldAlert, BookOpen, Music, Radio, Check, Flame
} from 'lucide-react';
import { AVAILABLE_LAUNCH_TRACKS } from '../data/launchTracks';

export interface CurrentUser {
  id: string;
  name: string;
  fullName?: string;
  email: string;
  phone?: string;
  role: string;
  calling?: string;
  ministryRoleId?: string;
  ministryRoleLabel?: string;
  avatar?: string;
  isAdmin?: boolean;
  birthday?: string;
  joinedAt?: string;
  churchMembership?: string;
  residence?: string;
  gender?: string;
  accountType?: string;
}

export interface SettingsHUDModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: CurrentUser | null;
  selectedTrack?: any;
  onSelectTrack?: (track: any) => void;
  appVolume?: number;
  onVolumeChange?: (vol: number) => void;
  soundEnabled?: boolean;
  onToggleSound?: (enabled: boolean) => void;
  onOpenVoiceSanctuary?: () => void;
  onOpenProgress?: () => void;
  onOpenAdminCMS?: () => void;
  onOpenWelcome?: () => void;
  onUpdateUser?: (user: any) => void;
  onLogout?: () => void;
}

export const SettingsHUDModal: React.FC<SettingsHUDModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  selectedTrack,
  onSelectTrack,
  appVolume = 0.8,
  onVolumeChange,
  soundEnabled = true,
  onToggleSound,
  onOpenVoiceSanctuary,
  onOpenProgress,
  onOpenAdminCMS,
  onOpenWelcome,
  onUpdateUser,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'audio' | 'system'>('profile');

  if (!isOpen) return null;

  const isLeader = Boolean(
    currentUser?.isAdmin ||
    currentUser?.role?.toLowerCase().includes('facilitator') ||
    currentUser?.email?.toLowerCase().includes('trent') ||
    currentUser?.email?.toLowerCase().includes('whitney')
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none font-['Outfit']">
      <div className="relative w-full max-w-lg bg-[#070C1C] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">Settings &amp; Device HUD</h3>
              <p className="text-[10px] font-mono text-slate-400">YoungFire Ministry • Joshua House of Worship</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/10 bg-black/40 p-1.5 gap-1.5 text-xs font-mono">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              activeTab === 'profile' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              activeTab === 'audio' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Audio &amp; Sound
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              activeTab === 'system' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            System
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {currentUser ? (
                <div className="p-4 rounded-2xl bg-[#0B1329] border border-amber-500/30 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-amber-400 flex items-center justify-center text-amber-400 font-bold text-lg flex-shrink-0 overflow-hidden">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      (currentUser.name || 'D').slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="truncate flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{currentUser.name}</h4>
                      {currentUser.isAdmin && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-500/30">
                          Overseer
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-amber-400 font-mono">{currentUser.calling || 'Word Disciple'}</p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">{currentUser.email}</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <p className="text-xs text-slate-300">Viewing in Sanctuary Visitor Mode</p>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">Sign in with phone or email to track your reading progress</p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {onOpenProgress && (
                  <button
                    onClick={() => { onClose(); onOpenProgress(); }}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-xs font-mono text-left cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Reading Progress</span>
                  </button>
                )}
                {onOpenWelcome && (
                  <button
                    onClick={() => { onClose(); onOpenWelcome(); }}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-xs font-mono text-left cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Welcome Portal</span>
                  </button>
                )}
              </div>

              {/* Leader CMS Trigger */}
              {isLeader && onOpenAdminCMS && (
                <button
                  onClick={() => { onClose(); onOpenAdminCMS(); }}
                  className="w-full p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-between text-xs font-mono cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="font-bold">Executive Admin CMS</span>
                  </div>
                  <span>&rarr;</span>
                </button>
              )}
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0B1329] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Master Sanctuary Volume</span>
                  <span className="text-amber-400 font-bold">{Math.round(appVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={appVolume}
                  onChange={(e) => onVolumeChange && onVolumeChange(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#0B1329] border border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white">Interactive Sound FX</h5>
                  <p className="text-[10px] text-slate-400 font-mono">Feedback chimes on navigation &amp; buttons</p>
                </div>
                <button
                  onClick={() => onToggleSound && onToggleSound(!soundEnabled)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    soundEnabled ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

              {/* Launch Tracks */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block px-1">
                  Default Sanctuary Launch Encounter
                </span>
                <div className="space-y-1.5">
                  {AVAILABLE_LAUNCH_TRACKS.map((t) => {
                    const isSelected = selectedTrack?.id === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => onSelectTrack && onSelectTrack(t)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                          isSelected ? 'bg-amber-500/20 border-amber-400 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <div className="truncate">
                          <p className="font-bold truncate">{t.title}</p>
                          <p className="text-[10px] text-slate-400 truncate">{t.artist}</p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-amber-400 flex-shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0B1329] border border-white/10 space-y-2">
                <h5 className="text-xs font-bold text-white">YoungFire Sanctuary Platform</h5>
                <p className="text-[10px] text-slate-400 font-mono">Version 1.0.2 • Built for Joshua House of Worship</p>
                <p className="text-[10px] text-amber-400 font-mono">Ephesians 4:16 • Rebuilding Better Together</p>
              </div>

              {currentUser && onLogout && (
                <button
                  onClick={() => { onClose(); onLogout(); }}
                  className="w-full p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center gap-2 text-xs font-mono cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Device</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsHUDModal;
