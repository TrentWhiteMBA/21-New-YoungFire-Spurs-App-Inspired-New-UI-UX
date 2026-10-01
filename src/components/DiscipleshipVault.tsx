import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Flame, ArrowLeft, ChevronRight, Sparkles, Award } from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';

interface DiscipleshipVaultProps {
  currentUser?: CurrentUser | null;
  onBack: () => void;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
}

interface DiscipleshipLesson {
  id: string;
  sessionNumber: number;
  title: string;
  themeVerse: string;
  bookId: string;
  chapter: number;
  verse?: number;
  description: string;
  completed: boolean;
}

const DEFAULT_LESSONS: DiscipleshipLesson[] = [
  {
    id: 'disc_1',
    sessionNumber: 1,
    title: 'The Foundation of Covenant Discipleship',
    themeVerse: 'Ephesians 4:16',
    bookId: 'EPH',
    chapter: 4,
    verse: 16,
    description: 'Understanding what it means to be fitly joined together and supplying grace in the body of Christ.',
    completed: true
  },
  {
    id: 'disc_2',
    sessionNumber: 2,
    title: 'Wielding the Sword of the Spirit',
    themeVerse: 'Hebrews 4:12',
    bookId: 'HEB',
    chapter: 4,
    verse: 12,
    description: 'Daily immersion in the living, active Word of God to pierce every distraction and doubt.',
    completed: true
  },
  {
    id: 'disc_3',
    sessionNumber: 3,
    title: 'The Secret Place & Intercession',
    themeVerse: 'Matthew 6:6',
    bookId: 'MAT',
    chapter: 6,
    verse: 6,
    description: 'Building an unbroken altar of communion in prayer away from the noise of the world.',
    completed: false
  },
  {
    id: 'disc_4',
    sessionNumber: 4,
    title: 'Walking in Holy Consecration',
    themeVerse: 'Romans 12:1-2',
    bookId: 'ROM',
    chapter: 12,
    verse: 1,
    description: 'Presenting your body as a living sacrifice, transformed by the renewing of your mind.',
    completed: false
  }
];

export const DiscipleshipVault: React.FC<DiscipleshipVaultProps> = ({
  currentUser,
  onBack,
  onNavigateToScripture
}) => {
  const [lessons, setLessons] = useState<DiscipleshipLesson[]>(DEFAULT_LESSONS);

  const toggleLesson = (id: string) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, completed: !l.completed } : l));
  };

  const completedCount = lessons.filter(l => l.completed).length;

  return (
    <div className="space-y-6 text-white font-['Outfit'] select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">My Discipleship Vault</h2>
            <p className="text-xs text-slate-400 font-mono">12 Authentic Sessions &bull; Sword Check-In Tracker</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono">
          <Award className="w-4 h-4" />
          <span>{completedCount} / {lessons.length} Completed</span>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`p-5 rounded-2xl border transition-all ${
              lesson.completed 
                ? 'bg-[#061224] border-emerald-500/30' 
                : 'bg-[#070C1C] border-white/10 hover:border-amber-400/30'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-400 font-bold">
                    SESSION {lesson.sessionNumber}
                  </span>
                  {onNavigateToScripture && (
                    <button
                      onClick={() => onNavigateToScripture(lesson.bookId, lesson.chapter, lesson.verse)}
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{lesson.themeVerse}</span>
                    </button>
                  )}
                </div>

                <h3 className="text-base font-bold text-white">{lesson.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{lesson.description}</p>
              </div>

              <button
                onClick={() => toggleLesson(lesson.id)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex-shrink-0 ${
                  lesson.completed
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                    : 'bg-white/5 border-white/15 text-slate-500 hover:text-slate-300'
                }`}
                title={lesson.completed ? 'Mark Incomplete' : 'Mark Completed'}
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscipleshipVault;
