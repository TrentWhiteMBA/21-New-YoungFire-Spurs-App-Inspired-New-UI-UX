import React, { useState } from 'react';
import { useFanDeckPhotos } from '../data/appCoverAssets';
import { AppTheme } from '../data/appThemes';
import { AppStyleSwitcher } from './AppStyleSwitcher';
import { RotatingUCollageFanDeck } from './RotatingUCollageFanDeck';
import { SanAntonioVectorMap } from './SanAntonioVectorMap';
import { 
  Flame, Calendar, Clock, MapPin, Users, Heart, 
  Send, CheckCircle2, ArrowRight, ExternalLink, Globe,
  Video, Sparkles, Shield, ChevronDown, X, LogIn, UserPlus, 
  Compass, Radio, Download
} from 'lucide-react';

interface WelcomeSanctuaryProps {
  onEnterSanctuary: () => void;
  onOpenRoster?: () => void;
  onClose?: () => void;
  isAuthenticated?: boolean;
  onRegister?: () => void;
  onSignIn?: () => void;
  onExploreGuest?: () => void;
  onToggleRadio?: () => void;
  isRadioPlaying?: boolean;
  onOpenThemeModal?: () => void;
  activeTheme?: AppTheme;
}

interface SanctuaryGathering {
  id: string;
  title: string;
  category: string;
  emblem: string;
  dateStr: string;
  fullDate: string;
  timeStr: string;
  timeCST: string;
  location: string;
  shortLabel: string;
  badgeColor: string;
  zoomAvailable: boolean;
}

const UPCOMING_GATHERINGS: SanctuaryGathering[] = [
  { 
    id: 'monday_small_group', 
    title: 'YOUNGFIRE SMALL GROUP HUDDLE',
    category: 'Small Group Discipleship',
    emblem: '🔥', 
    dateStr: 'OCT 5',
    fullDate: 'Monday, Oct 5',
    timeStr: '7:00 pm',
    timeCST: '7:00 PM - 8:30 PM CST',
    location: 'Joshua House of Worship • San Antonio, TX',
    shortLabel: 'SMALL GROUP',
    badgeColor: 'from-amber-600 to-orange-600 border-amber-400',
    zoomAvailable: true
  },
  { 
    id: 'open_bible_thursday', 
    title: 'OPEN BIBLE THURSDAYS',
    category: 'All-Day Expository Study & Altar',
    emblem: '📖', 
    dateStr: 'OCT 8',
    fullDate: 'Thursday, Oct 8',
    timeStr: 'All Day',
    timeCST: 'All Day (No Set Time)',
    location: 'Sanctuary Main Hall • San Antonio, TX',
    shortLabel: 'OPEN BIBLE',
    badgeColor: 'from-blue-600 to-indigo-600 border-cyan-400',
    zoomAvailable: true
  },
  { 
    id: 'sunday_worship', 
    title: 'SUNDAY CORPORATE WORSHIP',
    category: 'Congregational Worship & Word',
    emblem: '🕊️', 
    dateStr: 'OCT 11',
    fullDate: 'Sunday, Oct 11',
    timeStr: '11:00 am',
    timeCST: '11:00 AM CST',
    location: 'Joshua House of Worship • San Antonio, TX',
    shortLabel: 'SUNDAY WORSHIP',
    badgeColor: 'from-purple-600 to-violet-600 border-purple-400',
    zoomAvailable: true
  }
];

export const WelcomeSanctuary: React.FC<WelcomeSanctuaryProps> = ({
  onEnterSanctuary,
  onOpenRoster,
  onClose,
  isAuthenticated = false,
  onRegister,
  onSignIn,
  onExploreGuest,
  onToggleRadio,
  isRadioPlaying = false,
  onOpenThemeModal,
  activeTheme
}) => {
  // Gathering Selection state
  const [selectedGatheringId, setSelectedGatheringId] = useState<string>('monday_small_group');
  const currentGathering = UPCOMING_GATHERINGS.find(g => g.id === selectedGatheringId) || UPCOMING_GATHERINGS[0];

  // Dynamic fan deck photos
  const [fanDeckPhotos] = useFanDeckPhotos();
  const photos = fanDeckPhotos && fanDeckPhotos.length >= 5 
    ? fanDeckPhotos 
    : ['/image_4.png', '/image_6.png', '/image_5.png', '/image_7.png', '/image_2.png'];

  // Connect Card Form State
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [prayerNeed, setPrayerNeed] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadershipImgLoaded, setLeadershipImgLoaded] = useState(false);

  // Self-contained radio audio fallback if no parent callback
  const [localAudioPlaying, setLocalAudioPlaying] = useState(false);
  const localAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleRadioClick = () => {
    if (onToggleRadio) {
      onToggleRadio();
    } else {
      if (!localAudioRef.current) {
        localAudioRef.current = new Audio('https://stream.zeno.fm/f3wvbbqmdg8uv');
      }
      if (localAudioPlaying) {
        localAudioRef.current.pause();
        setLocalAudioPlaying(false);
      } else {
        localAudioRef.current.play().then(() => setLocalAudioPlaying(true)).catch(() => {});
      }
    }
  };

  const isRadioActive = isRadioPlaying || localAudioPlaying;

  const handleSubmitConnectCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    setIsSubmitting(true);
    const cardData = {
      id: `card_${Date.now()}`,
      name: name.trim(),
      contact: contact.trim(),
      prayerNeed: prayerNeed.trim(),
      createdAt: new Date().toISOString()
    };

    // Save to local storage for instant offline resilience
    try {
      const existing = JSON.parse(localStorage.getItem('youngfire_connect_cards') || '[]');
      existing.unshift(cardData);
      localStorage.setItem('youngfire_connect_cards', JSON.stringify(existing));
    } catch {}

    // Save to server/Firestore proxy
    try {
      await fetch('/api/connect-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData)
      });
    } catch {}

    setIsSubmitting(false);
    setSubmitted(true);
  };

  // 1-Tap Calendar Subscription (.ics generation for selected gathering)
  const handleDownloadICS = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isAllDay = currentGathering.id === 'open_bible_thursday';
    const dtStart = isAllDay ? 'DTSTART;VALUE=DATE:20261008' : (currentGathering.id === 'sunday_worship' ? 'DTSTART:20261011T110000' : 'DTSTART:20261005T190000');
    const dtEnd = isAllDay ? 'DTEND;VALUE=DATE:20261009' : (currentGathering.id === 'sunday_worship' ? 'DTEND:20261011T130000' : 'DTEND:20261005T203000');
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//YoungFire Ministry//Sanctuary Gathering//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${currentGathering.title}`,
      `DESCRIPTION:${currentGathering.category}. ${currentGathering.timeCST}. YoungFire Sanctuary Fellowship.`,
      `LOCATION:${currentGathering.location}`,
      dtStart,
      dtEnd,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentGathering.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Google Calendar direct 1-tap link
  const handleOpenGoogleCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isAllDay = currentGathering.id === 'open_bible_thursday';
    const dates = isAllDay ? '20261008/20261009' : (currentGathering.id === 'sunday_worship' ? '20261011T110000/20261011T130000' : '20261005T190000/20261005T203000');
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(currentGathering.title)}&dates=${dates}&details=${encodeURIComponent(currentGathering.category + ' • ' + currentGathering.timeCST)}&location=${encodeURIComponent(currentGathering.location)}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#040711] text-white select-none pb-28 relative">
      {/* Signature San Antonio City Vector Map Basemap (Spurs App 1:1 Match) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <SanAntonioVectorMap maskId="welcomeSaVectorMask" className="w-full h-full object-cover" opacity={0.92} />
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* 1. TOP SPURS-STYLE HEADER BAR (Clean, Centered Logo with Dropdown Chevron & Pill RADIO Button) */}
        {/* ========================================================================= */}
        <div className="px-4 pt-3 pb-2 flex items-center justify-between">
          {/* Left: JHOW Emblem Badge or Close */}
          <div className="w-16 flex items-center">
            {onClose ? (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-900/80 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                title="Close Welcome Portal"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 border border-amber-300/40">
                <Flame className="w-4 h-4 text-slate-950 fill-current" />
              </div>
            )}
          </div>

          {/* Center: YoungFire / Spurs Consecrated Emblem with Dropdown Chevron */}
          <div 
            onClick={onOpenThemeModal}
            className="flex flex-col items-center justify-center cursor-pointer group"
            title="San Antonio YoungFire Sanctuary"
          >
            <div className="flex items-center gap-1.5">
              <h1 className="font-['Outfit'] font-black text-lg sm:text-xl tracking-[0.18em] text-white flex items-center gap-1 group-hover:text-amber-300 transition-colors uppercase">
                <span>YOUNGFIRE</span>
              </h1>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:translate-y-0.5 group-hover:text-amber-400 transition-all" />
            </div>
            
            {/* Subtitle brand matching "Frost" in reference */}
            <div className="flex items-center gap-1 text-[11px] font-mono tracking-widest text-slate-400 uppercase">
              <span>Joshua House</span>
            </div>
          </div>

          {/* Right: Pill RADIO button (1:1 with reference screenshot top-right [ RADIO ]) */}
          <div className="w-16 flex justify-end">
            <button
              onClick={handleRadioClick}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-widest transition-all cursor-pointer border flex items-center gap-1.5 ${
                isRadioActive
                  ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)] animate-pulse'
                  : 'bg-black/60 border-white/35 text-slate-200 hover:border-white hover:text-white'
              }`}
              title="24/7 Gospel Radio Live"
              aria-label="Toggle 24/7 Gospel Radio"
            >
              <Radio className={`w-3 h-3 ${isRadioActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>RADIO</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. "SWITCH YOUR APP STYLE" BANNER */}
        {/* ========================================================================= */}
        <div className="px-4 pt-1 pb-2">
          <AppStyleSwitcher 
            onOpenThemeModal={onOpenThemeModal || (() => {})} 
            activeTheme={activeTheme} 
          />
        </div>

        {/* ========================================================================= */}
        {/* 3. MINI HORIZONTAL GATHERINGS & COHORTS ROW */}
        {/* ========================================================================= */}
        <div className="w-full px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
          {UPCOMING_GATHERINGS.map((gathering) => {
            const isSelected = gathering.id === selectedGatheringId;
            return (
              <button
                key={gathering.id}
                onClick={() => setSelectedGatheringId(gathering.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full transition-all cursor-pointer border text-left ${
                  isSelected 
                    ? 'bg-amber-500/25 border-amber-400 text-white shadow-[0_0_12px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50' 
                    : 'bg-black/60 border-white/20 text-slate-300 hover:border-white/40 hover:text-white'
                }`}
                title={gathering.title}
              >
                <span className="text-xs">{gathering.emblem}</span>
                <span className="font-mono text-[10px] tracking-wider text-amber-300 font-bold">{gathering.dateStr}</span>
                <span className="font-['Outfit'] text-[11px] tracking-wider text-white uppercase font-bold">{gathering.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 4. U-SHAPED ROTATING COLLAGE FAN DECK (1:1 Spurs App Match) */}
        {/* ========================================================================= */}
        <div className="-my-2">
          <RotatingUCollageFanDeck 
            photos={photos} 
            autoRotateIntervalMs={2000}
          />
        </div>

        {/* ========================================================================= */}
        {/* 5. FRAMELESS, FLOATING FELLOWSHIP GATHERING ANNOUNCEMENT */}
        {/* ========================================================================= */}
        <div className="w-full pt-2 pb-5 px-4 flex flex-col items-center justify-center text-center select-none">
          {/* Line 1 (Top): Date in crisp font-mono tracking */}
          <span className="font-mono text-xs tracking-[0.2em] text-slate-300 mb-1 drop-shadow uppercase font-bold">
            {currentGathering.fullDate}
          </span>

          {/* Line 2: Gathering Title */}
          <h3 className="font-['Outfit'] font-black text-sm sm:text-base tracking-wider text-white mb-3 drop-shadow-md uppercase">
            {currentGathering.title}
          </h3>

          {/* Line 3 (Centered Row): Sanctuary Crest, Large Gathering Time, YoungFire Flame */}
          <div className="w-full max-w-sm mx-auto flex items-center justify-between px-3 sm:px-6">
            {/* Left: Joshua House Sanctuary seal */}
            <div className="flex flex-col items-center">
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-black border-2 border-slate-300/70 flex items-center justify-center shadow-2xl ring-2 ring-white/10 hover:border-white transition-all cursor-pointer group"
                title="Joshua House Sanctuary"
              >
                <span className="font-['Outfit'] font-black text-sm sm:text-base tracking-wider text-white group-hover:scale-110 transition-transform">
                  JHOW
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-wider text-slate-400 mt-1.5 uppercase font-medium">
                SANCTUARY
              </span>
            </div>

            {/* Center: Large gathering time */}
            <div className="flex flex-col items-center px-2">
              <div className="font-['Outfit'] font-black text-3xl sm:text-4xl text-white tracking-normal drop-shadow-lg leading-none">
                {currentGathering.timeStr}
              </div>
              <p className="font-mono text-[10px] text-slate-400 mt-1 max-w-[200px] leading-tight text-center">
                {currentGathering.location}
              </p>
              <button
                onClick={onEnterSanctuary}
                className="mt-2.5 font-['Outfit'] font-bold text-xs tracking-[0.25em] text-white underline underline-offset-4 hover:text-amber-400 transition-colors cursor-pointer py-1 px-2"
                title="Preview Gathering Agenda & Details"
              >
                PREVIEW
              </button>
            </div>

            {/* Right: YoungFire Flame seal */}
            <div className="flex flex-col items-center">
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-black border-2 border-amber-400/80 flex items-center justify-center shadow-2xl ring-2 ring-amber-500/20 hover:border-amber-400 transition-all cursor-pointer group"
                title="YoungFire Discipleship"
              >
                <Flame className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 fill-amber-500/30 group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-amber-400/90 mt-1.5 uppercase font-medium">
                FELLOWSHIP
              </span>
            </div>
          </div>

          {/* 1-Tap Calendar Reminder actions */}
          <div className="flex items-center justify-center gap-3 mt-3 pt-1 text-[10px] font-mono text-slate-400">
            <button
              onClick={handleOpenGoogleCalendar}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ExternalLink className="w-3 h-3 text-cyan-400" />
              <span>Google Cal</span>
            </button>
            <span className="text-white/20">&bull;</span>
            <button
              onClick={handleDownloadICS}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-amber-400" />
              <span>Apple/iCal (.ics)</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. DUAL ACTION TILES (1:1 with MANAGE YOUR TICKETS / GET YOUR TICKETS in Spurs App) */}
        {/* ========================================================================= */}
        <div className="px-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Tile 1: ENTER SANCTUARY • 1-TAP ACCESS */}
            <button
              onClick={onEnterSanctuary}
              className="p-4 rounded-2xl bg-[#080E1F]/95 backdrop-blur-xl border border-white/20 hover:border-amber-400/60 transition-all group flex items-center justify-between text-left shadow-2xl shadow-black/90 hover:shadow-amber-500/10 cursor-pointer active:scale-98"
              title="Enter Sanctuary • 1-Tap Access"
            >
              <div className="flex flex-col gap-1 pr-2">
                <span className="font-['Outfit'] font-black text-base sm:text-lg leading-tight text-white group-hover:text-amber-300 transition-colors uppercase">
                  ENTER SANCTUARY
                </span>
                <span className="font-mono text-[11px] leading-tight text-slate-400 group-hover:text-slate-300 transition-colors uppercase font-bold">
                  1-TAP ACCESS
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-black border border-white/20 flex items-center justify-center text-white transition-all flex-shrink-0">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Tile 2: SIGN IN / REGISTER • DISCIPLE PORTAL */}
            <button
              onClick={isAuthenticated ? onEnterSanctuary : (onSignIn || onEnterSanctuary)}
              className="p-4 rounded-2xl bg-[#080E1F]/95 backdrop-blur-xl border border-white/20 hover:border-orange-400/60 transition-all group flex items-center justify-between text-left shadow-2xl shadow-black/90 hover:shadow-orange-500/10 cursor-pointer active:scale-98"
              title="Sign In or Register Disciple"
            >
              <div className="flex flex-col gap-1 pr-2">
                <span className="font-['Outfit'] font-black text-base sm:text-lg leading-tight text-white group-hover:text-orange-300 transition-colors uppercase">
                  {isAuthenticated ? 'MY DISCIPLE' : 'SIGN IN'}
                </span>
                <span className="font-mono text-[11px] leading-tight text-slate-400 group-hover:text-slate-300 transition-colors uppercase font-bold">
                  {isAuthenticated ? 'SESSION ACTIVE' : 'OR REGISTER'}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-orange-400 group-hover:text-black border border-white/20 flex items-center justify-center text-white transition-all flex-shrink-0">
                {isAuthenticated ? (
                  <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                ) : (
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
              </div>
            </button>
          </div>

          {/* Secondary Quick Action Row: Guest Explorer & Member Roster */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {onExploreGuest && !isAuthenticated && (
              <button
                onClick={onExploreGuest}
                className="py-2.5 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-slate-300 hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Explore as Guest</span>
              </button>
            )}
            {onRegister && !isAuthenticated && (
              <button
                onClick={onRegister}
                className="py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                <span>Register Disciple</span>
              </button>
            )}
            {onOpenRoster && (
              <button
                onClick={onOpenRoster}
                className={`py-2.5 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-slate-300 hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
                  isAuthenticated ? 'col-span-2' : ''
                }`}
              >
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Sanctuary Roster</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. DISCIPLESHIP RHYTHM & CORE VALUES */}
        {/* ========================================================================= */}
        <div className="px-4 space-y-4 mt-6">
          <div className="bg-[#0B1329] border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-black font-['Outfit'] uppercase text-white tracking-wide">
                  YoungFire Discipleship Rhythm
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold border border-amber-500/40">
                EPHESIANS 4:16
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Small Groups Monday */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-orange-500/40 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-mono text-[10px] font-bold border border-orange-500/40">
                    Bi-Weekly Mondays
                  </span>
                  <span className="text-xs font-mono font-bold text-orange-400">7:00 PM CST</span>
                </div>
                <h4 className="text-sm font-bold text-white font-['Outfit'] uppercase">
                  YoungFire Small Groups
                </h4>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Living room fellowship, discipleship cohorts, and dinner. Meeting <strong>every other Monday at 7:00 PM CST</strong>.
                </p>
              </div>

              {/* Open Bible Thursdays */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/40 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/40">
                    Weekly Thursdays
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">All Day</span>
                </div>
                <h4 className="text-sm font-bold text-white font-['Outfit'] uppercase">
                  Open Bible Thursdays
                </h4>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Spontaneous expository study and hermeneutics across all 66 books. <strong>All day open scripture encounter with no set time</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 8. LEADERSHIP & MINISTRY ROOTS (/image_7.png) */}
          {/* ========================================================================= */}
          <div className="bg-[#0B1329] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
              <Users className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-base sm:text-lg font-black font-['Outfit'] uppercase text-white tracking-wide">
                  Leadership & Ministry Roots
                </h3>
                <p className="text-[11px] font-mono text-slate-400">
                  Joshua House of Worship &bull; Rooted in discipleship and servant leadership
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Leadership Monolith Card with /image_7.png */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl">
                {!leadershipImgLoaded && (
                  <div className="absolute inset-0 bg-slate-900 animate-pulse z-0" />
                )}
                <img
                  src="/image_7.png"
                  alt="Lead Facilitator Trent D. White & Lead Facilitator Whitney White"
                  onLoad={() => setLeadershipImgLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    leadershipImgLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ objectPosition: 'center 20%' }}
                />
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(4,7,17,0.1) 0%, rgba(4,7,17,0.75) 65%, #040711 100%)'
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                    LEADERSHIP ROOTS
                  </span>
                  <p className="text-sm font-bold text-white font-['Outfit'] drop-shadow">
                    Lead Facilitator Trent D. White &amp; Lead Facilitator Whitney White
                  </p>
                </div>
              </div>

              {/* Leadership Narrative */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lead Facilitators Trent & Whitney White</span>
                </div>

                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  YoungFire was birthed out of a burden to see young adults rooted in the living Word of God. Under the spiritual covering of Joshua House of Worship, Lead Facilitator Trent D. White &amp; Lead Facilitator Whitney White walk alongside believers in intentional discipleship, transparent community, and practical exposition.
                </p>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Foundational Creed:</span>
                  <p className="text-xs font-serif italic text-slate-200">
                    "Till we all come in the unity of the faith, and of the knowledge of the Son of God, unto a perfect man, unto the measure of the stature of the fulness of Christ." &mdash; Ephesians 4:13
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 9. DIGITAL CONNECT CARD */}
          {/* ========================================================================= */}
          <div className="bg-[#0B1329] border-2 border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base sm:text-lg font-black font-['Outfit'] uppercase text-white tracking-wide">
                    Digital Connect Card
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Connect with YoungFire facilitators and submit prayer requests
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold border border-amber-500/40">
                Confidential
              </span>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white font-['Outfit'] uppercase">
                  Welcome to the Family!
                </h4>
                <p className="text-xs text-slate-200 font-serif max-w-md mx-auto">
                  Thank you for filling out the connect card. Lead Facilitator Trent D. White &amp; Lead Facilitator Whitney White have received your information and are covering your requests in prayer.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitConnectCard} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Johnathan Davis"
                      className="w-full bg-[#070C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Email or Phone Number</label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. (210) 555-0199 or email@domain.com"
                      className="w-full bg-[#070C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">How can we pray for you? (Optional)</label>
                  <textarea
                    rows={3}
                    value={prayerNeed}
                    onChange={(e) => setPrayerNeed(e.target.value)}
                    placeholder="Share any prayer requests, spiritual questions, or life transitions..."
                    className="w-full bg-[#070C1C] border border-white/15 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-serif leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    Joshua House of Worship &bull; YoungFire Ministry
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Connect Card'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 10. OFFICIAL MINISTRY CONNECTIONS (JHOW, YOUTUBE, FACEBOOK) */}
          {/* ========================================================================= */}
          <div className="bg-[#0B1329] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base sm:text-lg font-black font-['Outfit'] uppercase text-white tracking-wide">
                Official Ministry Connections
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* JHOW Official Website */}
              <a
                href="https://www.joshuahouseofworship.org"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 hover:border-cyan-400/50 flex flex-col justify-between gap-3 group transition-all"
              >
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">
                    JHOW Main Website
                  </h4>
                  <p className="text-[11px] text-slate-400 font-serif">
                    Official church home, statement of faith, and giving.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              {/* YouTube Broadcasts */}
              <a
                href="https://www.youtube.com/@JoshuaHouseOfWorshipSanAntonio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 hover:border-rose-400/50 flex flex-col justify-between gap-3 group transition-all"
              >
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-rose-300">
                    YouTube Broadcasts
                  </h4>
                  <p className="text-[11px] text-slate-400 font-serif">
                    Live sermon streams, worship anthems, and archives.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-rose-400">
                  <span>Watch Channel</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              {/* Facebook Community */}
              <a
                href="https://www.facebook.com/JoshuaHouseofWorshipSanAntonio/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 hover:border-blue-400/50 flex flex-col justify-between gap-3 group transition-all"
              >
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-300">
                    Facebook Community
                  </h4>
                  <p className="text-[11px] text-slate-400 font-serif">
                    Church announcements, service updates, and photos.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-blue-400">
                  <span>Follow Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            </div>
          </div>

          {/* Bottom Banner Button */}
          <div className="text-center pt-2">
            <button
              onClick={onEnterSanctuary}
              className="w-full max-w-md mx-auto py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-black text-sm font-['Outfit'] uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-98 cursor-pointer transition-all"
            >
              <span>Enter Discipleship Sanctuary</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSanctuary;
