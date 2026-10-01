export interface BroadcastMeetingPayload {
  id: string;
  title: string;
  themeVerse?: string;
  dateStr: string;
  timeStr: string;
  dateTime?: string;
  flyerUrl: string;
  zoomUrl: string;
  zoomMeetingId: string;
  zoomPasscode: string;
  meetingId?: string;
  passcode?: string;
  targetAudience?: string;
  isLive: boolean;
  notes?: string;
  hostLeader?: string;
}

const DEFAULT_MEETING: BroadcastMeetingPayload = {
  id: 'meeting_youngfire_relaunch',
  title: 'YoungFire Special Ministry Encounter & Zoom Huddle',
  themeVerse: 'Ephesians 4:16 — Rebuilding Better Together',
  dateStr: 'Monday, Oct 5, 2026',
  timeStr: '7:00 PM CST',
  dateTime: 'Monday, Oct 5 • 7:00 PM CST',
  flyerUrl: '/youngfire_zoom_flyer.png',
  zoomUrl: 'https://us05web.zoom.us/j/8785161298?pwd=e0zBTD2QHIHfx0AzjzXG7EHQno9Oig.1&omn=85728476365',
  zoomMeetingId: '878 516 1298',
  zoomPasscode: 'FIRE2026',
  meetingId: '878 516 1298',
  passcode: 'FIRE2026',
  targetAudience: 'All Young Adults, Leaders & Intercessors',
  isLive: true,
  hostLeader: 'Lead Facilitators Trent & Whitney White',
  notes: 'Join our special ministry zoom launch and kingdom brotherhood / sisterhood fellowship.'
};

const BROADCAST_STORAGE_KEY = 'youngfire_broadcast_meeting_v2';
const BEACON_DISMISSED_KEY = 'youngfire_beacon_dismissed_v2';

export function getBroadcastMeeting(): BroadcastMeetingPayload {
  try {
    const raw = localStorage.getItem(BROADCAST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_MEETING;
  } catch {
    return DEFAULT_MEETING;
  }
}

export function saveBroadcastMeeting(payload: Partial<BroadcastMeetingPayload>): BroadcastMeetingPayload {
  const current = getBroadcastMeeting();
  const updated = { ...current, ...payload };
  try {
    localStorage.setItem(BROADCAST_STORAGE_KEY, JSON.stringify(updated));
    localStorage.removeItem(BEACON_DISMISSED_KEY); // Re-show beacon when updated
  } catch {}
  return updated;
}

export function deactivateBroadcastMeeting(): BroadcastMeetingPayload {
  return saveBroadcastMeeting({ isLive: false });
}

export function getActiveFlyerUrl(): string {
  const meeting = getBroadcastMeeting();
  return meeting.flyerUrl || '/youngfire_zoom_flyer.png';
}

export function setActiveFlyer(url: string): void {
  saveBroadcastMeeting({ flyerUrl: url });
}

export function isBeaconBannerVisible(customMeeting?: BroadcastMeetingPayload): boolean {
  try {
    const dismissed = localStorage.getItem(BEACON_DISMISSED_KEY);
    const meeting = customMeeting || getBroadcastMeeting();
    return Boolean(meeting.isLive && !dismissed);
  } catch {
    return true;
  }
}

export function dismissBeaconBanner(): void {
  try {
    localStorage.setItem(BEACON_DISMISSED_KEY, 'true');
  } catch {}
}

export async function compressImageFile(file: File, maxWidth = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) return resolve('');
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(src);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = src;
    };
    reader.readAsDataURL(file);
  });
}

export function downloadFlyer(url: string, filename = 'YoungFire_Ministry_Flyer.png'): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
