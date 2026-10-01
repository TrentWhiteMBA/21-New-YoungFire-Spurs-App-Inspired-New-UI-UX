import React, { useState, useEffect } from 'react';
import { X, Video, ExternalLink, Copy, Check, Shield } from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';

interface ZoomMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: CurrentUser | null;
}

export const ZoomMeetingModal: React.FC<ZoomMeetingModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [copied, setCopied] = useState(false);
  const [zoomConfig, setZoomConfig] = useState({
    meetingId: "878 516 1298",
    passcode: "FIRE2026",
    inviteLink: "https://us05web.zoom.us/j/8785161298?pwd=e0zBTD2QHIHfx0AzjzXG7EHQno9Oig.1&omn=85728476365"
  });

  useEffect(() => {
    if (isOpen) {
      fetch('/api/zoom')
        .then(res => res.json())
        .then(data => {
          if (data && data.zoom) {
            setZoomConfig(prev => ({ ...prev, ...data.zoom }));
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(zoomConfig.inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none font-['Outfit']">
      <div className="relative w-full max-w-md bg-[#070C1C] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Zoom Sanctuary Portal</h3>
              <p className="text-[10px] font-mono text-slate-400">Live Virtual Encounter &amp; Fellowship</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-white/10 text-xs font-mono">
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-slate-400">Meeting ID:</span>
            <span className="text-white font-bold">{zoomConfig.meetingId}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">Passcode:</span>
            <span className="text-amber-400 font-bold">{zoomConfig.passcode}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <a
            href={zoomConfig.inviteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Launch Zoom Meeting</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Zoom Invite Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoomMeetingModal;
