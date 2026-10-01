import React from 'react';

interface SanAntonioVectorMapProps {
  className?: string;
  opacity?: number;
  maskId?: string;
  show3dDepth?: boolean;
}

/**
 * High-Density Monochrome San Antonio Satellite Vector Basemap (1:1 Spurs App Match)
 * - Ultra-detailed zoomed-in city street grid with inner neighborhood streets
 * - Major highways, frontage roads, cloverleaf interchanges, diagonal arterials
 * - Crisp, high-contrast black-and-white satellite presentation
 */
export const SanAntonioVectorMap: React.FC<SanAntonioVectorMapProps> = ({
  className = "w-full h-full object-cover",
  opacity = 0.95,
  maskId = "saVectorRadialMask",
  show3dDepth = false
}) => {
  return (
    <div 
      className="fixed inset-0 w-screen h-screen pointer-events-none select-none z-0 overflow-hidden bg-[#000000]"
      style={{
        perspective: show3dDepth ? '1200px' : 'none',
      }}
    >
      <div 
        className="w-full h-full"
        style={{
          transform: show3dDepth ? 'rotateX(6deg) scale(1.04)' : 'none',
          transformOrigin: '50% 45%',
          transition: 'transform 0.4s ease-out'
        }}
      >
        <svg 
          viewBox="0 0 2400 1600" 
          className={`${className} pointer-events-none select-none`}
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity }}
        >
          <defs>
            {/* Soft subtle radial vignette ensuring streets are visible everywhere with seamless edge feather */}
            <radialGradient id={maskId} cx="50%" cy="48%" r="75%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
            </radialGradient>
            
            <mask id={`mask_${maskId}`}>
              <rect width="2400" height="1600" fill={`url(#${maskId})`} />
            </mask>

            {/* Pattern for high-density micro urban blocks (spacing 14px) */}
            <pattern id="urbanSubdivisionGrid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="0.8" />
              <path d="M 14 0 L 14 28 M 0 14 L 28 14" fill="none" stroke="rgba(255, 255, 255, 0.11)" strokeWidth="0.6" strokeDasharray="6 3" />
            </pattern>

            {/* Pattern for angled downtown blocks */}
            <pattern id="downtownAngledGrid" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(24)">
              <path d="M 22 0 L 0 0 0 22" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.1" />
              <line x1="11" y1="0" x2="11" y2="22" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="0.75" />
            </pattern>
          </defs>

          <g mask={`url(#mask_${maskId})`}>
            {/* Deep black canvas */}
            <rect width="2400" height="1600" fill="#000000" />

            {/* 1. ULTRA-DENSE CITYWIDE RESIDENTIAL STREET FILL */}
            <rect width="2400" height="1600" fill="url(#urbanSubdivisionGrid)" />

            {/* 2. DOWNTOWN HIGH-DENSITY ANGLED STREET BLOCKS */}
            <g transform="translate(1200, 820) rotate(22) translate(-1200, -820)">
              <rect x="960" y="580" width="520" height="480" fill="url(#downtownAngledGrid)" />
              {/* Perimeter Downtown Border */}
              <rect x="960" y="580" width="520" height="480" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.6" />
            </g>

            {/* 3. ADDITIONAL RESIDENTIAL STREETS & LOCAL ARTERIES (Tight 14px grid overlays) */}
            <g stroke="rgba(255, 255, 255, 0.19)" strokeWidth="0.9">
              {/* Northwest Urban Neighborhoods */}
              {Array.from({ length: 45 }).map((_, i) => (
                <line key={`nw-v-${i}`} x1={80 + i * 22} y1="60" x2={80 + i * 22} y2="720" />
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <line key={`nw-h-${i}`} x1="80" y1={60 + i * 22} x2="1070" y2={60 + i * 22} />
              ))}

              {/* Northeast Urban Neighborhoods */}
              {Array.from({ length: 48 }).map((_, i) => (
                <line key={`ne-v-${i}`} x1={1320 + i * 22} y1="60" x2={1320 + i * 22} y2="720" />
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <line key={`ne-h-${i}`} x1="1320" y1={60 + i * 22} x2="2360" y2={60 + i * 22} />
              ))}

              {/* Southwest Subdivisions */}
              {Array.from({ length: 45 }).map((_, i) => (
                <line key={`sw-v-${i}`} x1={80 + i * 22} y1="920" x2={80 + i * 22} y2="1540" />
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <line key={`sw-h-${i}`} x1="80" y1={920 + i * 22} x2="1070" y2={920 + i * 22} />
              ))}

              {/* Southeast Subdivisions */}
              {Array.from({ length: 48 }).map((_, i) => (
                <line key={`se-v-${i}`} x1={1320 + i * 22} y1="920" x2={1320 + i * 22} y2="1540" />
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <line key={`se-h-${i}`} x1="1320" y1={920 + i * 22} x2="2360" y2={920 + i * 22} />
              ))}
            </g>

            {/* 4. SAN ANTONIO RIVER MEANDER & WATER CHANNELS */}
            <path
              d="M 1240 300 Q 1280 480 1220 620 T 1180 740 T 1235 830 T 1195 940 T 1150 1120 T 1205 1300 T 1140 1580"
              fill="none"
              stroke="rgba(255, 255, 255, 0.28)"
              strokeWidth="3.2"
              strokeDasharray="8 4"
            />
            {/* San Pedro Creek & Olmos Creek Tributaries */}
            <path
              d="M 1120 340 Q 1160 560 1115 720 T 1090 890 T 1130 1180"
              fill="none"
              stroke="rgba(255, 255, 255, 0.20)"
              strokeWidth="2.0"
              strokeDasharray="6 3"
            />

            {/* 5. SECONDARY THOROUGHFARES & MAJOR CITY BOULEVARDS */}
            <g stroke="rgba(255, 255, 255, 0.32)" strokeWidth="1.8" fill="none">
              {/* East-West Major Boulevards */}
              <line x1="80" y1="240" x2="2320" y2="240" />
              <line x1="80" y1="420" x2="2320" y2="420" />
              <line x1="80" y1="600" x2="2320" y2="600" />
              <line x1="80" y1="780" x2="2320" y2="780" />
              <line x1="80" y1="960" x2="2320" y2="960" />
              <line x1="80" y1="1140" x2="2320" y2="1140" />
              <line x1="80" y1="1320" x2="2320" y2="1320" />
              <line x1="80" y1="1480" x2="2320" y2="1480" />

              {/* North-South Major Boulevards (San Pedro, Blanco, Broadway, Zarzamora, New Braunfels, Walters) */}
              <line x1="420" y1="40" x2="420" y2="1560" />
              <line x1="680" y1="40" x2="680" y2="1560" />
              <line x1="940" y1="40" x2="940" y2="1560" />
              <line x1="1080" y1="40" x2="1080" y2="1560" />
              <line x1="1320" y1="40" x2="1320" y2="1560" />
              <line x1="1460" y1="40" x2="1460" y2="1560" />
              <line x1="1720" y1="40" x2="1720" y2="1560" />
              <line x1="1980" y1="40" x2="1980" y2="1560" />

              {/* Diagonal Corridors (Fredericksburg, Bandera, Culebra, Nacogdoches, Pleasanton) */}
              <line x1="100" y1="180" x2="1180" y2="800" strokeWidth="2.2" />
              <line x1="120" y1="440" x2="1160" y2="810" strokeWidth="2.2" />
              <line x1="80" y1="700" x2="1150" y2="830" strokeWidth="2.2" />
              <line x1="80" y1="980" x2="1160" y2="850" strokeWidth="2.2" />
              <line x1="2320" y1="200" x2="1240" y2="790" strokeWidth="2.2" />
              <line x1="2350" y1="520" x2="1250" y2="820" strokeWidth="2.2" />
              <line x1="2300" y1="940" x2="1240" y2="860" strokeWidth="2.2" />
              <line x1="1840" y1="1560" x2="1220" y2="870" strokeWidth="2.2" />
              <line x1="560" y1="1560" x2="1180" y2="860" strokeWidth="2.2" />
            </g>

            {/* 6. PRIMARY HIGHWAY NETWORKS (LOOP 410, LOOP 1604, I-35, I-10, US-281, US-90, HWY 151) */}
            {/* Frontage Roads (Parallel thin silver lines) */}
            <g stroke="rgba(255, 255, 255, 0.28)" strokeWidth="1.4" fill="none">
              {/* Loop 410 Outer Frontage */}
              <ellipse cx="1200" cy="820" rx="634" ry="454" />
              {/* Loop 410 Inner Frontage */}
              <ellipse cx="1200" cy="820" rx="606" ry="426" />

              {/* Loop 1604 Outer Frontage */}
              <ellipse cx="1200" cy="820" rx="1035" ry="735" strokeDasharray="16 8" />
              {/* Loop 1604 Inner Frontage */}
              <ellipse cx="1200" cy="820" rx="1005" ry="705" strokeDasharray="16 8" />

              {/* I-35 Frontage Road Pair */}
              <path d="M 2355 65 L 1755 425 L 1245 745 L 1165 805 L 785 1105 L 105 1505" />
              <path d="M 2345 95 L 1745 455 L 1235 775 L 1155 835 L 775 1135 L 95 1535" />

              {/* I-10 Frontage Road Pair */}
              <path d="M 75 105 L 675 445 L 1175 755 L 1225 805 L 1775 1125 L 2345 1465" />
              <path d="M 85 135 L 685 475 L 1185 785 L 1235 835 L 1785 1155 L 2355 1495" />

              {/* US-281 / I-37 Frontage Roads */}
              <path d="M 1195 20 L 1195 730 L 1225 800 L 1260 930 L 1370 1570" />
              <path d="M 1215 20 L 1215 730 L 1245 800 L 1280 930 L 1390 1570" />
            </g>

            {/* Main Expressways (Thick, Bold White/Silver Highways matching Spurs App) */}
            <g stroke="rgba(255, 255, 255, 0.65)" strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* LOOP 410 (Connally Loop - Inner Highway Beltway) */}
              <ellipse cx="1200" cy="820" rx="620" ry="440" strokeWidth="4.2" />

              {/* LOOP 1604 (Anderson Loop - Outer Beltway) */}
              <ellipse cx="1200" cy="820" rx="1020" ry="720" strokeWidth="3.4" strokeDasharray="20 10" />

              {/* INTERSTATE 35 (Northeast to Southwest Diagonal Spine) */}
              <path d="M 2350 80 L 1750 440 L 1240 760 L 1160 820 L 780 1120 L 100 1520" strokeWidth="4.6" />

              {/* INTERSTATE 10 (Northwest to Southeast Diagonal Spine) */}
              <path d="M 80 120 L 680 460 L 1180 770 L 1230 820 L 1780 1140 L 2350 1480" strokeWidth="4.6" />

              {/* US-281 / INTERSTATE 37 (North-South Expressway) */}
              <path d="M 1205 20 L 1205 740 L 1235 810 L 1270 940 L 1380 1580" strokeWidth="4.2" />

              {/* US-90 WEST (West Expressway) */}
              <path d="M 1160 820 L 780 890 L 50 960" strokeWidth="3.8" />

              {/* STATE HIGHWAY 151 (SeaWorld Expressway) */}
              <path d="M 1140 790 L 750 720 L 70 690" strokeWidth="3.4" />

              {/* WURZBACH PARKWAY ARC */}
              <path d="M 640 370 Q 1200 480 1760 370" strokeWidth="3.2" strokeDasharray="14 6" />

              {/* MILITARY DRIVE ARC */}
              <path d="M 620 1220 Q 1200 1130 1780 1220" strokeWidth="3.2" strokeDasharray="14 6" />

              {/* DOWNTOWN INNER FREEWAY LOOP (Central Interchange Core) */}
              <path 
                d="M 1120 740 C 1180 715 1240 715 1275 750 C 1295 790 1265 850 1210 860 C 1145 855 1110 800 1120 740 Z" 
                strokeWidth="4.8" 
              />
            </g>

            {/* 7. HIGHWAY INTERCHANGES & RAMPS (Cloverleaf Loops at major junctions) */}
            <g stroke="rgba(255, 255, 255, 0.45)" strokeWidth="2.2" fill="none">
              {/* I-10 & Loop 410 Interchange (NW) */}
              <circle cx="760" cy="510" r="34" strokeDasharray="8 4" />
              <circle cx="760" cy="510" r="18" />

              {/* US-281 & Loop 410 Interchange (North Central) */}
              <circle cx="1205" cy="480" r="34" strokeDasharray="8 4" />
              <circle cx="1205" cy="480" r="18" />

              {/* I-35 & Loop 410 Interchange (NE) */}
              <circle cx="1660" cy="520" r="34" strokeDasharray="8 4" />
              <circle cx="1660" cy="520" r="18" />

              {/* I-35 & Loop 410 Interchange (SW) */}
              <circle cx="750" cy="1100" r="34" strokeDasharray="8 4" />
              <circle cx="750" cy="1100" r="18" />

              {/* I-37 & Loop 410 Interchange (SE) */}
              <circle cx="1320" cy="1170" r="34" strokeDasharray="8 4" />
              <circle cx="1320" cy="1170" r="18" />
            </g>

            {/* 8. DOWNTOWN SAN ANTONIO CONSECRATED BEACON (Alamo Plaza / City Center) */}
            <circle cx="1200" cy="800" r="56" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.6" strokeDasharray="6 4" />
            <circle cx="1200" cy="800" r="28" fill="none" stroke="rgba(255, 255, 255, 0.50)" strokeWidth="2.2" />
            <circle cx="1200" cy="800" r="8" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Subtle edge vignette preserving sharp street visibility across the entire mobile screen */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 35%, rgba(0, 0, 0, 0.35) 75%, rgba(0, 0, 0, 0.85) 100%)'
        }}
      />
    </div>
  );
};

export default SanAntonioVectorMap;
