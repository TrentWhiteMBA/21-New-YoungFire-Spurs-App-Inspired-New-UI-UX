import React from 'react';
import { X, Palette, Check, Sparkles } from 'lucide-react';
import { APP_THEMES, AppTheme, getStoredThemes } from '../data/appThemes';
import { CurrentUser } from './SettingsHUDModal';

export { APP_THEMES };

interface ThemeHUDModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onSelectTheme: (id: string) => void;
  currentUser?: CurrentUser | null;
}

export const ThemeHUDModal: React.FC<ThemeHUDModalProps> = ({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme
}) => {
  if (!isOpen) return null;

  const themes = getStoredThemes();

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none font-['Outfit']">
      <div className="relative w-full max-w-md bg-[#070C1C] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">Liturgical App Theme HUD</h3>
              <p className="text-[10px] font-mono text-slate-400">Spurs Championship &amp; Sacred Colors</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3">
          {themes.map((theme) => {
            const isSelected = theme.id === currentThemeId;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme.id);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/15 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-400'
                    : 'border-white/10 bg-black/40 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl border flex items-center justify-center shadow"
                    style={{ backgroundColor: theme.cardHex, borderColor: theme.borderHex }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: theme.accentHex }} 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{theme.name}</h4>
                      {theme.category && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                          {theme.category}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                      Accent: <span style={{ color: theme.accentHex }}>{theme.accentHex}</span> • Canvas: {theme.bgHex}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemeHUDModal;
