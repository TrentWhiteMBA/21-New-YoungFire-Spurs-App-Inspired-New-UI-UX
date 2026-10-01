import React, { useState } from 'react';
import { X, Mic, MicOff, Volume2, Sparkles } from 'lucide-react';

interface LiveVoiceSanctuaryProps {
  isOpen: boolean;
  onClose: () => void;
  onAudioDucking?: (duck: boolean) => void;
}

export const LiveVoiceSanctuary: React.FC<LiveVoiceSanctuaryProps> = ({
  isOpen,
  onClose
}) => {
  const [isListening, setIsListening] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none font-['Outfit']">
      <div className="relative w-full max-w-md bg-[#070C1C] border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 text-white text-center">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-bold">Live Voice Sanctuary</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-6 flex flex-col items-center gap-4">
          <button
            onClick={() => setIsListening(!isListening)}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xl ${
              isListening
                ? 'bg-purple-600 text-white shadow-[0_0_40px_rgba(168,85,247,0.7)] animate-pulse'
                : 'bg-white/5 border border-white/20 text-slate-400 hover:text-white'
            }`}
          >
            {isListening ? <Mic className="w-10 h-10" /> : <MicOff className="w-10 h-10" />}
          </button>

          <div>
            <h4 className="text-sm font-bold text-white">
              {isListening ? 'Sanctuary AI Listening...' : 'Tap Mic to Start Voice Prayer'}
            </h4>
            <p className="text-xs text-slate-400 font-mono mt-1">Real-time scriptural guidance &amp; encouragement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveVoiceSanctuary;
