import React, { useState, useEffect } from 'react';
import { Calendar, Video, Clock, MapPin, Users, ChevronRight, Flame, Plus } from 'lucide-react';

interface SanctuaryScheduleViewProps {
  onOpenZoom: () => void;
  onNavigate: (tab: string, subView?: any) => void;
}

interface SanctuaryEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  isZoom: boolean;
}

const DEFAULT_EVENTS: SanctuaryEvent[] = [
  {
    id: 'evt_monday_huddle',
    title: 'YoungFire Weekly Word Encounter & Small Group',
    type: 'Small Group',
    date: 'Monday, Oct 5, 2026',
    time: '7:00 PM CST',
    location: 'Joshua House of Worship (San Antonio, TX)',
    description: 'Weekly discipleship check-in, authentic sword study, and youth fellowship.',
    isZoom: true
  },
  {
    id: 'evt_men_fire',
    title: 'Men on Fire Brotherhood Huddle',
    type: 'Men Discipleship',
    date: 'Wednesday, Oct 7, 2026',
    time: '7:30 PM CST',
    location: 'Main Sanctuary & Living Room Cohort',
    description: 'Brotherhood accountability, spiritual warfare, and prayer mantle.',
    isZoom: true
  },
  {
    id: 'evt_women_ignited',
    title: 'Women Ignited Sisterhood Fellowship',
    type: 'Women Discipleship',
    date: 'Thursday, Oct 8, 2026',
    time: '7:00 PM CST',
    location: 'Grace Fellowship Hall',
    description: 'Sisterhood prayer, heart consecration, and creative ministry study.',
    isZoom: true
  },
  {
    id: 'evt_sunday_encounter',
    title: 'Sunday Worship Encounter & Holy Word',
    type: 'Sanctuary Gathering',
    date: 'Sunday, Oct 11, 2026',
    time: '10:30 AM CST',
    location: 'Joshua House of Worship',
    description: 'Corporate worship, dynamic truth proclamation, and divine visitation.',
    isZoom: true
  }
];

export const SanctuaryScheduleView: React.FC<SanctuaryScheduleViewProps> = ({
  onOpenZoom,
  onNavigate
}) => {
  const [events, setEvents] = useState<SanctuaryEvent[]>(DEFAULT_EVENTS);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.events) && data.events.length > 0) {
          setEvents(data.events);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 text-white font-['Outfit'] select-none">
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-black border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Sanctuary Calendar</h2>
          </div>
          <p className="text-xs text-slate-300 font-mono">Joshua House of Worship • Fellowship Gathering Times</p>
        </div>

        <button
          onClick={onOpenZoom}
          className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
        >
          <Video className="w-4 h-4" />
          <span>Launch Zoom Sanctuary</span>
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-4 sm:p-5 rounded-2xl bg-[#070C1C] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase">
                  {evt.type}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {evt.date} • {evt.time}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {evt.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {evt.description}
              </p>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{evt.location}</span>
              </div>
            </div>

            {evt.isZoom && (
              <button
                onClick={onOpenZoom}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-slate-200 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors flex-shrink-0"
              >
                <Video className="w-3.5 h-3.5 text-cyan-400" />
                <span>Join Zoom</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SanctuaryScheduleView;
