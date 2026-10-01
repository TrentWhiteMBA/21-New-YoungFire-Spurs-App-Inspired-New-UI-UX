export type Testament = 'OT' | 'NT';

export interface BibleVerse {
  verse: number;
  text: string;
}

export interface BibleChapter {
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleBook {
  id: string;
  name: string;
  testament: Testament;
  category: string;
  section?: string;
  chaptersCount: number;
  totalChapters?: number;
  abbreviation: string;
  description?: string;
  purpose?: string;
}

export type HighlightColor = 'amber' | 'emerald' | 'cyan' | 'rose' | 'purple';

export interface BookmarkedVerse {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  timestamp: number;
  color?: HighlightColor;
  highlightColor?: HighlightColor;
  note?: string;
  translation?: string;
  savedAt?: string | number;
}
