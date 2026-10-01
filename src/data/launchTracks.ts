export interface LaunchTrackOption {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  category?: string;
  duration?: string;
}

export const AVAILABLE_LAUNCH_TRACKS: LaunchTrackOption[] = [
  {
    id: 'youngfire_anthem_1',
    title: 'YoungFire Sanctuary Encounter',
    artist: 'Joshua House of Worship Praise',
    audioUrl: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
    category: 'Sanctuary Worship Anthems',
    duration: '4:15'
  },
  {
    id: 'youngfire_anthem_2',
    title: 'Consecrated Fire & Intercession',
    artist: 'YoungFire Sound Collective',
    audioUrl: 'https://stream.zeno.fm/0r0xa792kwzuv',
    category: 'Prophetic Intercession',
    duration: '5:20'
  },
  {
    id: 'youngfire_anthem_3',
    title: 'Ephesians 4:16 Divine Harmony',
    artist: 'JHOW United Worship',
    audioUrl: 'https://stream.zeno.fm/cv9b0yr0kwzuv',
    category: 'Body of Christ Anthems',
    duration: '6:10'
  }
];
