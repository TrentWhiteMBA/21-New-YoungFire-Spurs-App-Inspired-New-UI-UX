export interface AppTheme {
  id: string;
  name: string;
  label?: string;
  subtitle?: string;
  badge?: string;
  accentHex: string;
  cardHex: string;
  bgHex: string;
  borderHex: string;
  badgeHex?: string;
  accentText?: string;
  category?: string;
  isCustom?: boolean;
}

export const APP_THEMES: AppTheme[] = [
  {
    id: 'spurs_stealth',
    name: 'Spurs Championship Noir',
    label: 'Spurs Noir',
    subtitle: 'High-contrast black & silver championship styling',
    badge: 'Pro Heritage',
    accentHex: '#F59E0B',
    cardHex: '#0B1329',
    bgHex: '#000000',
    borderHex: '#334155',
    badgeHex: '#F59E0B',
    accentText: 'text-amber-400',
    category: 'Pro Heritage'
  },
  {
    id: 'youngfire_gold',
    name: 'YoungFire Sacred Flame',
    label: 'Sacred Gold',
    subtitle: 'Golden liturgical warmth and sacred presence',
    badge: 'Sanctuary Liturgical',
    accentHex: '#F59E0B',
    cardHex: '#140D04',
    bgHex: '#040711',
    borderHex: '#F59E0B40',
    badgeHex: '#F59E0B',
    accentText: 'text-amber-400',
    category: 'Sanctuary Liturgical'
  },
  {
    id: 'fiesta_vibes',
    name: 'San Antonio Fiesta Glow',
    label: 'Fiesta Teal',
    subtitle: 'Vibrant turquoise, peach, and Texas sky glow',
    badge: 'FIESTA',
    accentHex: '#06B6D4',
    cardHex: '#081726',
    bgHex: '#030C16',
    borderHex: '#06B6D440',
    badgeHex: '#06B6D4',
    accentText: 'text-cyan-400',
    category: 'City Celebration'
  },
  {
    id: 'pentecost_flame',
    name: 'Pentecostal Crimson Blaze',
    label: 'Crimson Blaze',
    subtitle: 'Holy Fire consecration and passionate revival',
    badge: 'Holy Fire',
    accentHex: '#EF4444',
    cardHex: '#220808',
    bgHex: '#0B0202',
    borderHex: '#EF444440',
    badgeHex: '#EF4444',
    accentText: 'text-rose-400',
    category: 'Holy Fire'
  },
  {
    id: 'shekinah_purple',
    name: 'Royal Shekinah Majesty',
    label: 'Royal Purple',
    subtitle: 'Deep royal purple and kingdom priesthood majesty',
    badge: 'Royal Priesthood',
    accentHex: '#A855F7',
    cardHex: '#1A0B2E',
    bgHex: '#090314',
    borderHex: '#A855F740',
    badgeHex: '#A855F7',
    accentText: 'text-purple-400',
    category: 'Kingdom Royalty'
  }
];

const THEMES_STORAGE_KEY = 'youngfire_app_themes_v2';

export function getStoredThemes(): AppTheme[] {
  try {
    const raw = localStorage.getItem(THEMES_STORAGE_KEY);
    if (!raw) return APP_THEMES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : APP_THEMES;
  } catch {
    return APP_THEMES;
  }
}

export function saveTheme(theme: AppTheme): AppTheme[] {
  const current = getStoredThemes();
  const index = current.findIndex(t => t.id === theme.id);
  let updated: AppTheme[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = theme;
  } else {
    updated = [...current, theme];
  }
  try {
    localStorage.setItem(THEMES_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function deleteTheme(id: string): AppTheme[] {
  const current = getStoredThemes();
  const updated = current.filter(t => t.id !== id);
  try {
    localStorage.setItem(THEMES_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function resetThemes(): AppTheme[] {
  try {
    localStorage.removeItem(THEMES_STORAGE_KEY);
  } catch {}
  return APP_THEMES;
}
