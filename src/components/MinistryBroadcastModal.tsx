import React from 'react';
import { X, Calendar, Download, ExternalLink, Video, Clock } from 'lucide-react';
import { BroadcastMeetingPayload, downloadFlyer } from '../data/broadcastMeetingData';

interface MinistryBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  meeting?: BroadcastMeetingPayload;
}

export const MinistryBroadcastModal: React.FC<MinistryBroadcastModalProps> = ({
  isOpen,
  onClose,
  meeting
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none font-['Outfit']">
      <div className="relative w-full max-w-lg bg-[#070C1C] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">
              Sanctuary Encounter Beacon
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              {meeting?.title || 'Special Ministry Zoom Encounter'}
            </h3>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Flyer Preview */}
        {meeting?.flyerUrl && (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
            <img src={meeting.flyerUrl} alt="Meeting Flyer" className="w-full h-full object-contain" />
          </div>
        )}

        <div className="space-y-2 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{meeting?.dateStr}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{meeting?.timeStr}</span>
          </div>
        </div>

        {meeting?.zoomUrl && (
          <div className="flex gap-2 pt-2">
            <a
              href={meeting.zoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow"
            >
              <Video className="w-4 h-4" />
              <span>Launch Zoom</span>
            </a>
            {meeting.flyerUrl && (
              <button
                onClick={() => downloadFlyer(meeting.flyerUrl)}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-slate-200 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Flyer</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MinistryBroadcastModal;
