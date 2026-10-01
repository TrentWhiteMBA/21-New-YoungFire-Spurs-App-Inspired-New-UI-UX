import { BookmarkedVerse, HighlightColor } from '../types/scripture';

export interface HighlightColorItem {
  id: HighlightColor;
  label: string;
  name?: string;
  dotColor?: string;
  bg: string;
  text: string;
  border: string;
}

export const HIGHLIGHT_COLORS: HighlightColorItem[] = [
  { id: 'amber', label: 'Gold / Glory', name: 'Gold / Glory', dotColor: 'bg-amber-400', bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-400' },
  { id: 'emerald', label: 'Growth / Life', name: 'Growth / Life', dotColor: 'bg-emerald-400', bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-400' },
  { id: 'cyan', label: 'Living Water', name: 'Living Water', dotColor: 'bg-cyan-400', bg: 'bg-cyan-500/20', text: 'text-cyan-300', border: 'border-cyan-400' },
  { id: 'rose', label: 'Sacrifice / Love', name: 'Sacrifice / Love', dotColor: 'bg-rose-400', bg: 'bg-rose-500/20', text: 'text-rose-300', border: 'border-rose-400' },
  { id: 'purple', label: 'Kingdom / Royalty', name: 'Kingdom / Royalty', dotColor: 'bg-purple-400', bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-400' }
];

const BOOKMARKS_STORAGE_KEY = 'youngfire_scripture_bookmarks_v1';

export function getStoredBookmarks(): BookmarkedVerse[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBookmark(bookmark: BookmarkedVerse): BookmarkedVerse[] {
  const current = getStoredBookmarks();
  const filtered = current.filter(b => b.id !== bookmark.id);
  const updated = [bookmark, ...filtered];
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function deleteBookmark(bookmarkId: string): BookmarkedVerse[] {
  const current = getStoredBookmarks();
  const updated = current.filter(b => b.id !== bookmarkId);
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}
