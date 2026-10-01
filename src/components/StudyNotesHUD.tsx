import React, { useState, useEffect } from 'react';
import { X, PenTool, Save, Trash2, Plus, BookOpen, Calendar } from 'lucide-react';

interface StudyNote {
  id: string;
  title: string;
  content: string;
  passage?: string;
  timestamp: number;
}

interface StudyNotesHUDProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
  prefill?: { passage?: string; title?: string } | null;
}

const STORAGE_KEY = 'youngfire_study_notes_v1';

export const StudyNotesHUD: React.FC<StudyNotesHUDProps> = ({
  isOpen,
  onClose,
  onNavigateToScripture,
  prefill
}) => {
  const [notes, setNotes] = useState<StudyNote[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [activeNote, setActiveNote] = useState<StudyNote>({
    id: `note_${Date.now()}`,
    title: prefill?.title || 'Personal Revelation & Study',
    content: '',
    passage: prefill?.passage || '',
    timestamp: Date.now()
  });

  useEffect(() => {
    if (prefill) {
      setActiveNote({
        id: `note_${Date.now()}`,
        title: prefill.title || 'Scripture Revelation',
        content: '',
        passage: prefill.passage || '',
        timestamp: Date.now()
      });
    }
  }, [prefill]);

  const handleSave = () => {
    const updated = [activeNote, ...notes.filter(n => n.id !== activeNote.id)];
    setNotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  const handleDelete = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none font-['Outfit']">
      <div className="relative w-full max-w-xl bg-[#070C1C] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white">
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Study Notes &amp; Revelation HUD</h3>
              <p className="text-[10px] font-mono text-slate-400">Spiritual Journal &bull; Sacred Check-Ins</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3 flex-1 overflow-y-auto">
          <input
            type="text"
            value={activeNote.title}
            onChange={(e) => setActiveNote({ ...activeNote, title: e.target.value })}
            placeholder="Note title..."
            className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white font-bold text-sm focus:border-amber-400 focus:outline-none"
          />

          {activeNote.passage && (
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Reference: {activeNote.passage}</span>
            </div>
          )}

          <textarea
            value={activeNote.content}
            onChange={(e) => setActiveNote({ ...activeNote, content: e.target.value })}
            placeholder="Record spiritual insights, prayers, reflections..."
            rows={8}
            className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:border-amber-400 focus:outline-none resize-none"
          />

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setActiveNote({ id: `note_${Date.now()}`, title: 'New Revelation', content: '', timestamp: Date.now() })}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300"
            >
              + New Note
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 shadow"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Note</span>
            </button>
          </div>

          {notes.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-white/10">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Previous Entries</span>
              {notes.map(n => (
                <div key={n.id} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                  <div onClick={() => setActiveNote(n)} className="cursor-pointer truncate flex-1">
                    <h5 className="font-bold text-white truncate">{n.title}</h5>
                    <p className="text-[10px] text-slate-400 font-mono">{new Date(n.timestamp).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleDelete(n.id)} className="p-1 text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyNotesHUD;
