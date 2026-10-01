import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

interface RotatingUCollageFanDeckProps {
  photos?: string[];
  className?: string;
  onPhotoClick?: (index: number) => void;
  autoRotateIntervalMs?: number;
}

const DEFAULT_PHOTOS = [
  '/image_4.png', // Authentic Pulpit / Sanctuary Proclamation
  '/image_5.png', // Sisterhood & Creative Fellowship
  '/image_6.png', // Men On Fire Discipleship Huddle
  '/image_7.png', // Lead Facilitators Trent & Whitney White
  '/image_2.png', // Sanctuary Community & Outreach
];

/**
 * Clock Circular Carousel (1:1 Spurs App Match from IMG_3481.PNG)
 * - Cards are spaced out across the full viewport width (~360px - 440px)
 * - Cards rotate in a circle, but only the lower half of the circle is visible
 * - Sits on a large circular trajectory: cards descend from top-left, reach lowest point at center (upright & prominent), then ascend and exit top-right
 * - Center card features the signature overlapping circular emblem medallion at its bottom
 * - Smooth transition animations and tap-to-focus
 */
export const RotatingUCollageFanDeck: React.FC<RotatingUCollageFanDeckProps> = ({
  photos = DEFAULT_PHOTOS,
  className = '',
  onPhotoClick,
  autoRotateIntervalMs = 2200
}) => {
  // Ensure at least 5 photos by looping
  const displayPhotos = photos.length >= 5 ? photos : [...photos, ...DEFAULT_PHOTOS].slice(0, 5);
  const totalCount = displayPhotos.length;

  // Active rotation offset (increments every interval like a clock wheel)
  const [rotationOffset, setRotationOffset] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotationOffset((prev) => (prev + 1) % totalCount);
    }, autoRotateIntervalMs);

    return () => clearInterval(timer);
  }, [totalCount, autoRotateIntervalMs]);

  // Geometric coordinates along the lower half of the circle (1:1 Spurs App Match)
  // Spaced out horizontally: Slot 0 & 4 are pushed out to ±165px; Slot 1 & 3 are at ±88px; Slot 2 is at center (0px)
  // Y-coordinates dip downward at the center (lower arc of circle):
  // Center is lowest (+20px); side cards curve upward (-12px and -38px)
  const CIRCLE_SLOTS = [
    { x: -168, y: -38, rotate: -25, scale: 0.84, zIndex: 10, opacity: 0.85, isVisible: true },
    { x: -88,  y: -12, rotate: -12, scale: 0.96, zIndex: 20, opacity: 0.95, isVisible: true },
    { x: 0,    y: 20,  rotate: 0,   scale: 1.15, zIndex: 40, opacity: 1.0,  isVisible: true }, // Center (lowest point of lower circle)
    { x: 88,   y: -12, rotate: 12,  scale: 0.96, zIndex: 20, opacity: 0.95, isVisible: true },
    { x: 168,  y: -38, rotate: 25,  scale: 0.84, zIndex: 10, opacity: 0.85, isVisible: true },
  ];

  return (
    <div className={`relative w-full py-6 flex flex-col items-center justify-center select-none overflow-hidden ${className}`}>
      {/* 3D Perspective Stage for the Lower Circle Arc (Spans wide enough for spaced out cards) */}
      <div className="relative w-full max-w-sm sm:max-w-md h-48 sm:h-52 flex items-center justify-center [perspective:1200px]">
        {displayPhotos.map((photo, origIndex) => {
          // Calculate relative slot position for this photo
          const relativePos = (origIndex - rotationOffset + totalCount * 10) % totalCount;
          
          // Only the 5 slots along the lower half of the circle are visible
          if (relativePos >= 5) {
            // Hidden in upper half of the circle
            return (
              <div
                key={`${origIndex}-${photo}`}
                className="absolute opacity-0 pointer-events-none transition-all duration-700 ease-out"
                style={{
                  transform: 'translateY(-120px) scale(0.5)',
                  zIndex: 0
                }}
              />
            );
          }

          const slot = CIRCLE_SLOTS[relativePos];
          const isCenter = relativePos === 2;

          return (
            <div
              key={`${origIndex}-${photo}`}
              onClick={() => {
                // If clicked, shift so this photo moves to center (slot 2)
                const shiftNeeded = (relativePos - 2 + totalCount) % totalCount;
                setRotationOffset((prev) => (prev + shiftNeeded) % totalCount);
                if (onPhotoClick) onPhotoClick(origIndex);
              }}
              className={`absolute w-24 sm:w-28 h-36 sm:h-42 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer group border ${
                isCenter
                  ? 'border-white/90 ring-2 ring-white/70 shadow-[0_15px_35px_rgba(0,0,0,0.85)]'
                  : 'border-white/30 hover:border-white/60 shadow-[0_10px_25px_rgba(0,0,0,0.8)]'
              }`}
              style={{
                transform: `translateX(${slot.x}px) translateY(${slot.y}px) rotate(${slot.rotate}deg) scale(${slot.scale})`,
                zIndex: slot.zIndex,
                opacity: slot.opacity,
              }}
              title="Click photo to rotate into center focus"
            >
              <img
                src={photo}
                alt={`Sanctuary Fellowship Photo ${origIndex + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div 
                className={`absolute inset-0 transition-opacity ${
                  isCenter 
                    ? 'bg-gradient-to-t from-black/50 via-transparent to-black/10' 
                    : 'bg-black/30 group-hover:bg-black/10'
                }`} 
              />
            </div>
          );
        })}

        {/* ========================================================================= */}
        {/* SIGNATURE OVERLAPPING CENTER CIRCULAR BADGE (1:1 Spurs App Match from IMG_3481.PNG) */}
        {/* Sits right over the lower center of the active center card */}
        {/* ========================================================================= */}
        <div 
          className="absolute z-50 pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: 'translateY(64px)', // Overlaps bottom edge of center card
          }}
        >
          <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#000000] border-2 border-white/80 p-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.95)] flex items-center justify-center ring-2 ring-black">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-900 to-black border border-white/25 flex flex-col items-center justify-center text-center">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400/30 drop-shadow" />
              <span className="text-[7px] font-mono tracking-widest text-slate-300 uppercase font-black -mt-0.5">
                JHOW
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatingUCollageFanDeck;
