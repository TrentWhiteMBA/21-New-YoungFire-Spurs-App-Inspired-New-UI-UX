import React, { useState, useEffect } from 'react';
import { Compass, Search, BookOpen, Layers, MapPin, ArrowRight, X } from 'lucide-react';
import { BIBLE_BOOKS, getBookById } from '../data/bibleBooks';

interface ImperialAtlasProps {
  onBack?: () => void;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
}

interface AtlasRegion {
  id: string;
  name: string;
  modernLocation: string;
  historicalEra: string;
  description: string;
  keyScriptures: Array<{ bookId: string; chapter: number; verse?: number; label: string }>;
  latitude: number;
  longitude: number;
}

const ATLAS_REGIONS: AtlasRegion[] = [
  {
    id: 'jerusalem',
    name: 'Jerusalem (Mount Zion)',
    modernLocation: 'Jerusalem, Israel',
    historicalEra: 'United Monarchy & Apostolic Age',
    description: 'The holy city of David, site of Solomon’s Temple, the Crucifixion, Resurrection, and Pentecost visitation.',
    keyScriptures: [
      { bookId: 'PSA', chapter: 122, verse: 6, label: 'Psalm 122:6' },
      { bookId: 'ACT', chapter: 2, verse: 1, label: 'Acts 2:1' }
    ],
    latitude: 31.7683,
    longitude: 35.2137
  },
  {
    id: 'antioch',
    name: 'Antioch of Syria',
    modernLocation: 'Antakya, Turkey',
    historicalEra: 'Early Church Missionary Launch',
    description: 'The missionary cradle where disciples were first called Christians and Paul was commissioned.',
    keyScriptures: [
      { bookId: 'ACT', chapter: 11, verse: 26, label: 'Acts 11:26' },
      { bookId: 'ACT', chapter: 13, verse: 1, label: 'Acts 13:1' }
    ],
    latitude: 36.2021,
    longitude: 36.1606
  },
  {
    id: 'ephesus',
    name: 'Ephesus (Asia Minor)',
    modernLocation: 'Selçuk, Turkey',
    historicalEra: 'Pauline Revival & Apostolic Hub',
    description: 'Ancient commercial and theological capital where the church of Ephesus was founded and Ephesians was written.',
    keyScriptures: [
      { bookId: 'EPH', chapter: 4, verse: 16, label: 'Ephesians 4:16' },
      { bookId: 'REV', chapter: 2, verse: 1, label: 'Revelation 2:1' }
    ],
    latitude: 37.9497,
    longitude: 27.3639
  },
  {
    id: 'rome',
    name: 'Rome (Imperial Capital)',
    modernLocation: 'Rome, Italy',
    historicalEra: 'Caesarean Empire & Roman Prison Epistles',
    description: 'The center of the Roman Empire where Paul preached boldly in chains and the Epistle to the Romans was penned.',
    keyScriptures: [
      { bookId: 'ROM', chapter: 1, verse: 16, label: 'Romans 1:16' },
      { bookId: 'ACT', chapter: 28, verse: 30, label: 'Acts 28:30' }
    ],
    latitude: 41.9028,
    longitude: 12.4964
  }
];

export const ImperialAtlas: React.FC<ImperialAtlasProps> = ({
  onBack,
  onNavigateToScripture
}) => {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<AtlasRegion>(ATLAS_REGIONS[0]);

  const filtered = ATLAS_REGIONS.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.modernLocation.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-[#040711] text-white rounded-3xl border border-white/10 space-y-5 select-none font-['Outfit']">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-white">Imperial Scripture Atlas</h3>
            <p className="text-xs text-slate-400 font-mono">66-Book Geographic &amp; Theological Mapping</p>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="text-xs font-mono text-amber-400 hover:underline uppercase tracking-wider"
          >
            &larr; Back to Sanctuary
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search biblical regions, cities, and apostolic journeys..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:border-cyan-400 focus:outline-none"
        />
      </div>

      {/* Main Atlas Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Regions List */}
        <div className="space-y-2 md:col-span-1 max-h-96 overflow-y-auto pr-1">
          {filtered.map((region) => {
            const isSelected = selectedRegion.id === region.id;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400 text-white ring-1 ring-cyan-400'
                    : 'bg-[#070C1C] border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold font-mono">{region.name}</h4>
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{region.modernLocation}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Region Detail */}
        <div className="md:col-span-2 p-5 rounded-2xl bg-[#070C1C] border border-cyan-500/30 space-y-4">
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
              {selectedRegion.historicalEra}
            </span>
            <h3 className="text-xl font-bold text-white mt-1.5">{selectedRegion.name}</h3>
            <p className="text-xs text-amber-400 font-mono mt-0.5">{selectedRegion.modernLocation}</p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedRegion.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Key Scripture Coordinates:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedRegion.keyScriptures.map((ks, i) => (
                <button
                  key={i}
                  onClick={() => onNavigateToScripture && onNavigateToScripture(ks.bookId, ks.chapter, ks.verse)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-slate-200 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{ks.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImperialAtlas;
