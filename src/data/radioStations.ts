export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  streamUrl: string;
  accentColor: string;
  location?: string;
  description?: string;
  logo?: string;
}

export const GOSPEL_STATIONS: RadioStation[] = [
  {
    id: 'worship-lift',
    name: 'YoungFire Contemporary Worship',
    genre: 'Contemporary Christian & Praise',
    streamUrl: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
    accentColor: '#F59E0B',
    location: 'San Antonio, TX',
    description: 'Non-stop holy encounter, contemporary worship, and young adult anthems.'
  },
  {
    id: 'gospel-fire',
    name: 'Sanctuary High Praise FM',
    genre: 'Traditional & Urban Gospel',
    streamUrl: 'https://stream.zeno.fm/0r0xa792kwzuv',
    accentColor: '#EF4444',
    location: 'Texas Sanctuary Network',
    description: 'High-energy choir hymns, powerful testimonies, and authentic gospel fire.'
  },
  {
    id: 'prophetic-intercession',
    name: '24/7 Secret Place Prayer Beats',
    genre: 'Instrumental Soaking & Prayer',
    streamUrl: 'https://stream.zeno.fm/cv9b0yr0kwzuv',
    accentColor: '#8B5CF6',
    location: 'Intercession Watch Tower',
    description: 'Calming instrumental soaking sounds, prophetic violin, and sacred prayer atmosphere.'
  },
  {
    id: 'kingdom-youth',
    name: 'YoungFire Global Hype & Beats',
    genre: 'Christian Hip-Hop & Afrobeats',
    streamUrl: 'https://stream.zeno.fm/w062c9y4kwzuv',
    accentColor: '#06B6D4',
    location: 'Youth Consecration Station',
    description: 'Urban praise, holy hip-hop, and gospel afrobeat rhythms for young kingdom disicples.'
  }
];
