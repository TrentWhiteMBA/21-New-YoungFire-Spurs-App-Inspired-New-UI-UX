import React from 'react';
import { Cloud, CheckCircle2, AlertCircle } from 'lucide-react';
import { hasFirebaseEnvVars } from '../firebase/config';

interface FirebaseStatusBadgeProps {
  variant?: 'compact' | 'full';
  showDetails?: boolean;
  className?: string;
}

export const FirebaseStatusBadge: React.FC<FirebaseStatusBadgeProps> = ({
  variant = 'compact',
  showDetails = false,
  className = ''
}) => {
  const isConnected = hasFirebaseEnvVars;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono select-none ${
      isConnected 
        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
        : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
    } ${className}`}>
      <div className="flex items-center gap-1.5">
        <Cloud className="w-3.5 h-3.5" />
        <span className="font-bold">
          {isConnected ? 'Firebase Sync: Connected' : 'Local Storage Mode'}
        </span>
      </div>
      {showDetails && (
        <span className="text-[10px] text-slate-400 border-l border-white/10 pl-2">
          {isConnected ? 'Real-Time Firestore Active' : 'Offline / Standalone Device'}
        </span>
      )}
    </div>
  );
};

export default FirebaseStatusBadge;
