import React from 'react';
import { X, BookOpen, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { BIBLE_BOOKS } from '../data/bibleBooks';

interface ReadingProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToBook: (bookId: string) => void;
}

export const ReadingProgressModal: React.FC<ReadingProgressModalProps> = ({
  isOpen,
  onClose,
  onNavigateToBook
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none font-['Outfit']">
      <div className="relative w-full max-w-2xl bg-[#070C1C] border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white">
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">66-Book Reading Progress</h3>
              <p className="text-[10px] font-mono text-slate-400">Track and jump into any testament or book</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2.5 flex-1">
          {BIBLE_BOOKS.map((book) => (
            <button
              key={book.id}
              onClick={() => {
                onNavigateToBook(book.id);
                onClose();
              }}
              className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-400/40 text-left transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="truncate">
                <h5 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                  {book.name}
                </h5>
                <p className="text-[10px] text-slate-400 font-mono">{book.chaptersCount} Ch &bull; {book.testament}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingProgressModal;
