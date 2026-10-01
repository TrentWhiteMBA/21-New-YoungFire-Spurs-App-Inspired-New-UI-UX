import React from 'react';
import { 
  Flame, 
  BookOpen, 
  Compass, 
  Tv, 
  Radio, 
  PenTool, 
  Heart, 
  Settings, 
  ShieldAlert, 
  Sparkles,
  Users
} from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';

interface SlidingNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, subView?: any) => void;
  onOpenSettingsModal: () => void;
  onOpenNotesModal: () => void;
  onOpenThemeModal: () => void;
  onOpenWelcomeModal: () => void;
  currentUser?: CurrentUser | null;
}

export const SlidingNavDrawer: React.FC<SlidingNavDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSettingsModal,
  onOpenNotesModal,
  onOpenThemeModal,
  onOpenWelcomeModal,
  currentUser
}) => {
  if (!isOpen) return null;

  const isLeader = Boolean(
    currentUser?.isAdmin ||
    currentUser?.role?.toLowerCase().includes('facilitator') ||
    currentUser?.email?.toLowerCase().includes('trent') ||
    currentUser?.email?.toLowerCase().includes('whitney')
  );

  const menuItems = [
    {
      id: 'fellowship',
      label: 'Sanctuary Fellowship Hub',
      icon: Users,
      action: () => { onNavigate('fellowship'); onClose(); }
    },
    {
      id: 'word-bible',
      label: '66-Book Scripture Reader',
      icon: BookOpen,
      action: () => { onNavigate('word', 'bible'); onClose(); }
    },
    {
      id: 'word-atlas',
      label: 'Imperial Scripture Atlas',
      icon: Compass,
      action: () => { onNavigate('word', 'atlas'); onClose(); }
    },
    {
      id: 'tv',
      label: 'Worship Sanctuary TV & Vault',
      icon: Tv,
      action: () => { onNavigate('tv'); onClose(); }
    },
    {
      id: 'radio',
      label: '24/7 Gospel Radio Player',
      icon: Radio,
      action: () => { onNavigate('radio'); onClose(); }
    },
    {
      id: 'prayer',
      label: 'Prayer Dock & Intercession',
      icon: Heart,
      action: () => { onNavigate('prayer_dock'); onClose(); }
    },
    {
      id: 'notes',
      label: 'Study Notes HUD',
      icon: PenTool,
      action: () => { onOpenNotesModal(); onClose(); }
    },
    {
      id: 'welcome',
      label: 'Welcome Sanctuary Portal',
      icon: Sparkles,
      action: () => { onOpenWelcomeModal(); onClose(); }
    },
    {
      id: 'settings',
      label: 'Settings & Device Profile',
      icon: Settings,
      action: () => { onOpenSettingsModal(); onClose(); }
    },
  ];

  return (
    <div className="fixed inset-0 z-40 text-white flex select-none overflow-hidden font-['Outfit'] pointer-events-none">
      
      {/* 1. SLIDING RIGHT DRAWER CONTENT (Occupies right 75% of viewport with pitch-black obsidian background) */}
      <div className="ml-auto w-[75%] sm:w-[65%] max-w-md h-full bg-[#000000] flex flex-col justify-between py-8 px-6 sm:px-8 relative z-10 overflow-y-auto no-scrollbar pointer-events-auto">
        
        {/* Top Centered Brand Insignia (YoungFire Holy Flame badge with gold metallic rim glow) */}
        <div className="flex flex-col items-center text-center space-y-2 pt-1 pb-3 relative z-20">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)] border border-amber-300/40 ring-2 ring-amber-400/30">
            <Flame className="w-7 h-7 text-black fill-current drop-shadow" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black uppercase tracking-[0.25em] text-white font-['Anton',sans-serif] leading-tight">
              YOUNG<span className="text-amber-400">FIRE</span>
            </h3>
            <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-slate-400 mt-0.5">
              JOSHUA HOUSE OF WORSHIP &bull; EST. 2026
            </p>
          </div>
        </div>

        {/* Vertical Left-Aligned Menu Options (Matches Reference Pro Screenshot) */}
        <nav className="space-y-3.5 my-auto py-2 relative z-20">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full flex items-center gap-3.5 text-left text-slate-200 hover:text-white group cursor-pointer transition-colors py-0.5"
              >
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide font-['Barlow_Condensed',sans-serif] uppercase truncate">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Facilitators Executive Admin CMS (Gated to Trent & Whitney) */}
          {isLeader && (
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('yf_open_admin_cms'));
                onClose();
              }}
              className="w-full flex items-center gap-3.5 text-left text-amber-300 hover:text-amber-200 group cursor-pointer transition-colors pt-2.5 border-t border-white/10"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold tracking-wider font-['Barlow_Condensed',sans-serif] uppercase truncate">
                Executive Admin CMS
              </span>
            </button>
          )}
        </nav>

        {/* Bottom Leadership Sign-Off & Close Action */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500 relative z-20">
          <span className="truncate">Lead Facilitators Trent &amp; Whitney</span>
          <button 
            onClick={onClose}
            className="text-amber-400 hover:underline uppercase tracking-wider cursor-pointer ml-2 flex-shrink-0"
          >
            Close &larr;
          </button>
        </div>

        {/* 2. ARTISTIC HIGH-CONTRAST MONOCHROME ILLUSTRATION (Bottom Right Corner Behind Menu) */}
        <div 
          className="absolute right-0 bottom-0 w-64 sm:w-80 h-72 sm:h-96 pointer-events-none opacity-40 z-0 overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 85% at 85% 85%, black 40%, rgba(0,0,0,0.5) 65%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 85% 85%, black 40%, rgba(0,0,0,0.5) 65%, transparent 100%)',
          }}
        >
          <img
            src="/image_4.png"
            alt="Anointed Hands Lifting Scripture"
            className="w-full h-full object-contain object-bottom filter grayscale contrast-125 brightness-105"
          />
          {/* Deep black gradient fade dissolving into the floor and left canvas */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-black" />
        </div>

      </div>

    </div>
  );
};

export default SlidingNavDrawer;
