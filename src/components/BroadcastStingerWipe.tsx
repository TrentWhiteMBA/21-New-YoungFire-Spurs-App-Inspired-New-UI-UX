import React, { useEffect } from 'react';
import { Flame } from 'lucide-react';

interface BroadcastStingerWipeProps {
  show: boolean;
  onComplete: () => void;
  durationMs?: number;
}

export const BroadcastStingerWipe: React.FC<BroadcastStingerWipeProps> = ({
  show,
  onComplete,
  durationMs = 600
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete();
      }, durationMs);
      return () => clearTimeout(timer);
    }
  }, [show, durationMs, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Wipe Overlay Panel */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 animate-pulse opacity-95 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-3xl bg-black border-2 border-white/80 shadow-[0_0_50px_rgba(245,158,11,0.8)] flex items-center justify-center">
            <Flame className="w-12 h-12 text-amber-400 fill-amber-400 drop-shadow" />
          </div>
          <span className="text-xl font-black uppercase tracking-[0.25em] text-black font-['Anton',sans-serif]">
            YOUNG<span className="text-white">FIRE</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BroadcastStingerWipe;
