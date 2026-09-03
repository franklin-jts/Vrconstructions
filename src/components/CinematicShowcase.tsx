import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceScene {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

const services: ServiceScene[] = [
  { id: 'residential', title: 'Residential Construction', subtitle: 'Luxury homes built with precision', icon: '🏠' },
  { id: 'commercial', title: 'Commercial Construction', subtitle: 'Multi-storey commercial excellence', icon: '🏢' },
  { id: 'warehouse', title: 'Warehouse Construction', subtitle: 'Industrial-scale engineering', icon: '🏭' },
  { id: 'renovation', title: 'Renovation', subtitle: 'Transform any space completely', icon: '🔨' },
  { id: 'electrical', title: 'Electrical Works', subtitle: 'Wiring, panels & safety systems', icon: '⚡' },
  { id: 'plumbing', title: 'Plumbing Works', subtitle: 'Pipes, fixtures & water systems', icon: '🔧' },
  { id: 'tiles', title: 'Tiles Laying', subtitle: 'Marble, granite & ceramic perfection', icon: '🧱' },
  { id: 'carpentry', title: 'Carpentry Works', subtitle: 'Custom woodwork & finishing', icon: '🪚' },
  { id: 'fabrication', title: 'Fabrication Works', subtitle: 'MS, SS & aluminium structures', icon: '⚙️' },
  { id: 'falseceiling', title: 'False Ceiling', subtitle: 'Gypsum, POP & decorative systems', icon: '🔲' },
  { id: 'painting', title: 'Painting', subtitle: 'Interior & exterior finishing', icon: '🎨' },
  { id: 'interior', title: 'Interior Works', subtitle: 'Kitchens, wardrobes & more', icon: '🛋️' },
  { id: 'waterproofing', title: 'Waterproofing', subtitle: 'Roof, basement & terrace protection', icon: '🛡️' },
];

/** Animated SVG mini-scenes for each service type */
const MiniScene: React.FC<{ type: string; active: boolean }> = ({ type, active }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !active) return;
    const svg = svgRef.current;

    // Animate all elements with class "build-part" — staggered reveal
    const parts = svg.querySelectorAll('.build-part');
    parts.forEach((part, i) => {
      gsap.fromTo(part,
        { opacity: 0, y: 15, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5,
          delay: i * 0.12,
          ease: 'power2.out',
        }
      );
    });

    // Animate fill heights
    const fills = svg.querySelectorAll('.animate-fill');
    fills.forEach((fill) => {
      gsap.fromTo(fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          transformOrigin: 'bottom',
        }
      );
    });

    // Glow pulse on active elements
    const glows = svg.querySelectorAll('.glow-pulse');
    glows.forEach((glow) => {
      gsap.to(glow, {
        opacity: 0.6,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });
  }, [active]);

  const scenes: Record<string, JSX.Element> = {
    residential: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        {/* Ground */}
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Foundation */}
        <rect className="build-part animate-fill" x="40" y="108" width="120" height="14" fill="#4a5058" rx="1" />
        {/* House walls */}
        <rect className="build-part animate-fill" x="50" y="60" width="100" height="50" fill="#3a3f47" rx="1" />
        {/* Roof */}
        <polygon className="build-part" points="40,62 100,25 160,62" fill="#F5A623" />
        <polygon className="build-part" points="45,62 100,30 155,62" fill="#D4912A" />
        {/* Windows */}
        <rect className="build-part" x="60" y="70" width="22" height="18" fill="#1a2535" rx="1" />
        <rect className="build-part" x="118" y="70" width="22" height="18" fill="#1a2535" rx="1" />
        <line className="build-part" x1="71" y1="70" x2="71" y2="88" stroke="#2a3040" strokeWidth="0.5" />
        <line className="build-part" x1="129" y1="70" x2="129" y2="88" stroke="#2a3040" strokeWidth="0.5" />
        {/* Door */}
        <rect className="build-part" x="88" y="82" width="24" height="28" fill="#1a2535" rx="1" />
        <circle className="build-part glow-pulse" cx="107" cy="96" r="2" fill="#F5A623" />
        {/* Chimney */}
        <rect className="build-part" x="120" y="30" width="12" height="15" fill="#5a6068" />
        {/* Landscaping */}
        <circle className="build-part" cx="30" cy="105" r="12" fill="#2d4a2d" opacity="0.6" />
        <circle className="build-part" cx="175" cy="108" r="9" fill="#2d4a2d" opacity="0.5" />
        <rect className="build-part" x="28" y="105" width="4" height="18" fill="#5a4030" />
      </svg>
    ),
    commercial: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Building base */}
        <rect className="build-part animate-fill" x="40" y="20" width="120" height="102" fill="#3a3f47" rx="2" />
        {/* Glass facade */}
        {[30, 50, 70, 90].map((y, i) => (
          <g key={i}>
            <rect className="build-part" x="48" y={y} width="20" height="14" fill="#1a2535" rx="0.5" />
            <rect className="build-part" x="74" y={y} width="20" height="14" fill="#1a2535" rx="0.5" />
            <rect className="build-part" x="100" y={y} width="20" height="14" fill="#1a2535" rx="0.5" />
            <rect className="build-part" x="126" y={y} width="20" height="14" fill="#1a2535" rx="0.5" />
          </g>
        ))}
        {/* Column lines */}
        {[68, 94, 120, 146].map((x, i) => (
          <line key={i} className="build-part" x1={x} y1="20" x2={x} y2="122" stroke="#5a6068" strokeWidth="1" />
        ))}
        {/* Entrance */}
        <rect className="build-part" x="80" y="100" width="40" height="22" fill="#1a2535" rx="1" />
        <rect className="build-part glow-pulse" x="82" y="102" width="36" height="2" fill="#F5A623" opacity="0.4" />
        {/* Roof equipment */}
        <rect className="build-part" x="60" y="14" width="15" height="8" fill="#4a5058" rx="1" />
        <rect className="build-part" x="125" y="16" width="10" height="6" fill="#444950" rx="1" />
      </svg>
    ),
    warehouse: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Steel frame */}
        <rect className="build-part animate-fill" x="30" y="50" width="140" height="72" fill="#3a3f47" rx="1" />
        {/* Roof truss */}
        <polygon className="build-part" points="25,52 100,20 175,52" fill="#5a6068" />
        <line className="build-part" x1="60" y1="52" x2="100" y2="28" stroke="#6e7681" strokeWidth="1" />
        <line className="build-part" x1="140" y1="52" x2="100" y2="28" stroke="#6e7681" strokeWidth="1" />
        {/* Steel columns */}
        {[30, 70, 110, 150].map((x, i) => (
          <rect key={i} className="build-part" x={x} y="50" width="4" height="72" fill="#6e7681" />
       ))}
        {/* Loading bay */}
        <rect className="build-part" x="35" y="80" width="50" height="42" fill="#2a2f38" rx="1" />
        <rect className="build-part" x="37" y="82" width="46" height="3" fill="#F5A623" opacity="0.5" />
        {/* Shutter door */}
        {[88, 94, 100, 106, 112].map((y, i) => (
          <line key={i} className="build-part" x1="95" y1={y} x2="155" y2={y} stroke="#4a5058" strokeWidth="0.8" />
        ))}
        <rect className="build-part" x="95" y="80" width="60" height="42" fill="none" stroke="#5a6068" strokeWidth="1" rx="1" />
      </svg>
    ),
    renovation: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Old house (faded) */}
        <rect className="build-part" x="50" y="55" width="100" height="67" fill="#333840" rx="1" opacity="0.4" />
        {/* New walls */}
        <rect className="build-part animate-fill" x="50" y="55" width="100" height="67" fill="#4a5058" rx="1" />
        {/* New roof */}
        <polygon className="build-part" points="40,57 100,20 160,57" fill="#F5A623" />
        {/* New windows */}
        <rect className="build-part" x="58" y="65" width="30" height="22" fill="#1a2535" rx="1" />
        <rect className="build-part" x="112" y="65" width="30" height="22" fill="#1a2535" rx="1" />
        {/* New door */}
        <rect className="build-part" x="88" y="90" width="24" height="32" fill="#1a2535" rx="1" />
        <circle className="build-part glow-pulse" cx="107" cy="106" r="2" fill="#F5A623" />
        {/* Paint roller effect */}
        <rect className="build-part" x="52" y="57" width="3" height="63" fill="#F5A623" opacity="0.3" />
        {/* Sparkle effects */}
        <circle className="build-part glow-pulse" cx="70" cy="45" r="2" fill="#FFD700" opacity="0.5" />
        <circle className="build-part glow-pulse" cx="130" cy="40" r="1.5" fill="#FFD700" opacity="0.4" />
      </svg>
    ),
    electrical: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Wall cutaway */}
        <rect className="build-part" x="30" y="20" width="140" height="100" fill="#3a3f47" rx="2" />
        <rect className="build-part" x="35" y="25" width="130" height="90" fill="#2a2f38" rx="1" />
        {/* Wiring paths */}
        <path className="build-part" d="M60,35 L60,80 L100,80" stroke="#F5A623" strokeWidth="2" fill="none" />
        <path className="build-part" d="M100,35 L100,60 L140,60" stroke="#F5A623" strokeWidth="2" fill="none" />
        <path className="build-part" d="M60,80 L60,105" stroke="#F5A623" strokeWidth="2" fill="none" />
        {/* Distribution board */}
        <rect className="build-part" x="50" y="30" width="25" height="35" fill="#4a5058" rx="2" />
        <rect className="build-part glow-pulse" x="53" y="33" width="8" height="4" fill="#34C759" rx="1" />
        <rect className="build-part glow-pulse" x="53" y="40" width="8" height="4" fill="#F5A623" rx="1" />
        <rect className="build-part" x="53" y="47" width="8" height="4" fill="#FF3B30" rx="1" />
        {/* Switches */}
        <rect className="build-part" x="120" y="55" width="18" height="12" fill="#555" rx="2" />
        <circle className="build-part glow-pulse" cx="129" cy="61" r="3" fill="#F5A623" />
        {/* Light fixture */}
        <rect className="build-part" x="85" y="22" width="30" height="6" fill="#6e7681" rx="2" />
        <circle className="build-part glow-pulse" cx="100" cy="32" r="8" fill="#F5A623" opacity="0.15" />
        <circle className="build-part" cx="100" cy="32" r="4" fill="#FFD700" opacity="0.6" />
      </svg>
    ),
    plumbing: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Building section */}
        <rect className="build-part" x="30" y="20" width="140" height="100" fill="#3a3f47" rx="2" />
        <rect className="build-part" x="35" y="25" width="130" height="90" fill="#2a2f38" rx="1" />
        {/* Water pipes (blue) */}
        <path className="build-part" d="M50,30 L50,90 L80,90 L80,110" stroke="#4A90D9" strokeWidth="3" fill="none" />
        <path className="build-part" d="M50,30 L50,30" stroke="#4A90D9" strokeWidth="3" fill="none" />
        {/* Drain pipes (grey) */}
        <path className="build-part" d="M120,25 L120,95 L150,95 L150,110" stroke="#6e7681" strokeWidth="3" fill="none" />
        {/* Bathroom fixture */}
        <rect className="build-part" x="90" y="70" width="40" height="25" fill="#e8e8e8" rx="8" opacity="0.3" />
        <ellipse className="build-part" cx="110" cy="80" rx="15" ry="8" fill="#ddd" opacity="0.2" />
        {/* Faucet */}
        <rect className="build-part" x="105" y="62" width="3" height="12" fill="#aaa" rx="1" />
        <rect className="build-part" x="102" y="60" width="10" height="4" fill="#aaa" rx="1" />
        {/* Water flow */}
        <circle className="build-part glow-pulse" cx="106" cy="75" r="2" fill="#4A90D9" opacity="0.5" />
        {/* Valve */}
        <circle className="build-part" cx="50" cy="60" r="5" fill="#F5A623" />
        <rect className="build-part" x="47" y="56" width="6" height="2" fill="#D4912A" />
      </svg>
    ),
    tiles: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Floor */}
        <rect className="build-part" x="20" y="100" width="160" height="22" fill="#3a3f47" rx="1" />
        {/* Wall */}
        <rect className="build-part" x="20" y="20" width="8" height="100" fill="#4a5058" />
        {/* Floor tiles */}
        {[30, 52, 74, 96, 118, 140, 162].map((x, i) => (
          <rect key={i} className="build-part" x={x} y="102" width="18" height="18" fill={i % 2 === 0 ? '#5a6068' : '#4a5058'} rx="0.5" />
        ))}
        {/* Wall tiles */}
        {[28, 50, 72, 94].map((y, i) => (
          <g key={i}>
            <rect className="build-part" x="22" y={y} width="30" height="18" fill={i % 2 === 0 ? '#6e7681' : '#5a6068'} rx="0.5" />
            <rect className="build-part" x="56" y={y} width="30" height="18" fill={i % 2 === 0 ? '#5a6068' : '#6e7681'} rx="0.5" />
          </g>
        ))}
        {/* Grout lines */}
        <line className="build-part" x1="22" y1="46" x2="86" y2="46" stroke="#3a3f47" strokeWidth="0.5" />
        <line className="build-part" x1="22" y1="68" x2="86" y2="68" stroke="#3a3f47" strokeWidth="0.5" />
        <line className="build-part" x1="22" y1="90" x2="86" y2="90" stroke="#3a3f47" strokeWidth="0.5" />
        {/* Tile being placed */}
        <rect className="build-part glow-pulse" x="90" y="102" width="18" height="18" fill="#F5A623" rx="0.5" opacity="0.6" />
        {/* Trowel */}
        <rect className="build-part" x="115" y="95" width="25" height="3" fill="#888" rx="1" transform="rotate(-15, 127, 96)" />
      </svg>
    ),
    carpentry: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Cabinet frame */}
        <rect className="build-part animate-fill" x="40" y="30" width="50" height="90" fill="#8B7355" rx="2" />
        <rect className="build-part animate-fill" x="95" y="30" width="50" height="90" fill="#7A6548" rx="2" />
        {/* Cabinet doors */}
        <rect className="build-part" x="43" y="35" width="20" height="38" fill="#9B8365" rx="1" />
        <rect className="build-part" x="67" y="35" width="20" height="38" fill="#9B8365" rx="1" />
        <rect className="build-part" x="98" y="35" width="20" height="38" fill="#8B7355" rx="1" />
        <rect className="build-part" x="122" y="35" width="20" height="38" fill="#8B7355" rx="1" />
        {/* Handles */}
        <rect className="build-part glow-pulse" x="61" y="50" width="2" height="10" fill="#F5A623" rx="1" />
        <rect className="build-part glow-pulse" x="116" y="50" width="2" height="10" fill="#F5A623" rx="1" />
        {/* Drawers */}
        <rect className="build-part" x="43" y="78" width="44" height="18" fill="#9B8365" rx="1" />
        <rect className="build-part" x="98" y="78" width="44" height="18" fill="#8B7355" rx="1" />
        <rect className="build-part" x="43" y="100" width="44" height="16" fill="#9B8365" rx="1" />
        <rect className="build-part" x="98" y="100" width="44" height="16" fill="#8B7355" rx="1" />
        {/* Wood grain texture */}
        <line className="build-part" x1="50" y1="40" x2="50" y2="68" stroke="#7A6548" strokeWidth="0.3" opacity="0.4" />
        <line className="build-part" x1="110" y1="40" x2="110" y2="68" stroke="#6A5538" strokeWidth="0.3" opacity="0.4" />
        {/* Saw */}
        <rect className="build-part" x="160" y="85" width="30" height="4" fill="#888" rx="1" />
        <rect className="build-part" x="155" y="82" width="8" height="10" fill="#8B7355" rx="1" />
      </svg>
    ),
    fabrication: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Gate frame */}
        <rect className="build-part animate-fill" x="40" y="25" width="8" height="95" fill="#6e7681" />
        <rect className="build-part animate-fill" x="152" y="25" width="8" height="95" fill="#6e7681" />
        <rect className="build-part" x="40" y="22" width="120" height="6" fill="#7a8290" rx="1" />
        {/* Gate bars */}
        {[58, 72, 86, 100, 114, 128, 142].map((x, i) => (
          <rect key={i} className="build-part" x={x} y="30" width="3" height="88" fill="#5a6068" />
        ))}
        {/* Decorative top */}
        <polygon className="build-part" points="40,24 100,8 160,24" fill="#F5A623" opacity="0.6" />
        {/* Railing section */}
        <rect className="build-part" x="10" y="90" width="30" height="3" fill="#7a8290" />
        {[15, 25, 35].map((x, i) => (
          <rect key={i} className="build-part" x={x} y="70" width="2" height="23" fill="#6e7681" />
        ))}
        {/* Welding sparks */}
        <circle className="build-part glow-pulse" cx="45" cy="60" r="3" fill="#FFD700" opacity="0.6" />
        <circle className="build-part glow-pulse" cx="48" cy="55" r="1.5" fill="#FFA500" opacity="0.5" />
      </svg>
    ),
    falseceiling: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Room walls */}
        <rect className="build-part" x="20" y="20" width="160" height="100" fill="#3a3f47" rx="1" />
        {/* Ceiling grid */}
        {[30, 55, 80, 105, 130, 155].map((x, i) => (
          <line key={i} className="build-part" x1={x} y1="25" x2={x} y2="50" stroke="#5a6068" strokeWidth="0.5" />
        ))}
        <line className="build-part" x1="20" y1="37" x2="180" y2="37" stroke="#5a6068" strokeWidth="0.5" />
        {/* Ceiling panels */}
        {[25, 50, 75, 100, 125, 150].map((x, i) => (
          <rect key={i} className="build-part" x={x} y="28" width="22" height="8" fill="#e8e8e8" opacity="0.15" rx="0.5" />
        ))}
        {/* Recessed lights */}
        {[45, 90, 135].map((x, i) => (
          <circle key={i} className="build-part glow-pulse" cx={x} cy="45" r="4" fill="#F5A623" opacity="0.3" />
        ))}
        {/* Pendant light */}
        <rect className="build-part" x="97" y="50" width="1" height="15" fill="#888" />
        <rect className="build-part" x="92" y="64" width="11" height="6" fill="#F5A623" rx="2" />
        <circle className="build-part glow-pulse" cx="97" cy="73" r="6" fill="#F5A623" opacity="0.15" />
        {/* Floor */}
        <rect className="build-part" x="20" y="100" width="160" height="20" fill="#2a2f38" />
      </svg>
    ),
    painting: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Unfinished wall (left) */}
        <rect className="build-part" x="20" y="25" width="80" height="95" fill="#4a5058" rx="1" />
        {/* Painted wall (right) */}
        <rect className="build-part animate-fill" x="105" y="25" width="75" height="95" fill="#F5A623" rx="1" opacity="0.7" />
        {/* Paint divider line */}
        <line className="build-part" x1="102" y1="25" x2="102" y2="120" stroke="#fff" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        {/* Paint roller */}
        <rect className="build-part" x="95" y="40" width="14" height="25" fill="#e8e8e8" rx="3" />
        <rect className="build-part" x="100" y="28" width="4" height="15" fill="#888" />
        <rect className="build-part" x="97" y="22" width="10" height="8" fill="#666" rx="1" />
        {/* Paint drips */}
        <circle className="build-part glow-pulse" cx="108" cy="68" r="2" fill="#F5A623" opacity="0.6" />
        <circle className="build-part glow-pulse" cx="112" cy="80" r="1.5" fill="#F5A623" opacity="0.4" />
        {/* Color swatches */}
        <rect className="build-part" x="30" y="35" width="15" height="15" fill="#F5A623" rx="2" />
        <rect className="build-part" x="50" y="35" width="15" height="15" fill="#fff" rx="2" opacity="0.8" />
        <rect className="build-part" x="70" y="35" width="15" height="15" fill="#4A90D9" rx="2" opacity="0.7" />
        {/* Brush strokes on left wall */}
        <rect className="build-part" x="25" y="70" width="70" height="4" fill="#F5A623" opacity="0.2" rx="1" />
        <rect className="build-part" x="25" y="80" width="50" height="4" fill="#F5A623" opacity="0.15" rx="1" />
      </svg>
    ),
    interior: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Room */}
        <rect className="build-part" x="15" y="15" width="170" height="105" fill="#2a2f38" rx="1" />
        {/* Kitchen counter */}
        <rect className="build-part animate-fill" x="20" y="70" width="80" height="50" fill="#5a6068" rx="2" />
        <rect className="build-part" x="20" y="67" width="80" height="5" fill="#7a8290" rx="1" />
        {/* Wall cabinets */}
        <rect className="build-part animate-fill" x="25" y="25" width="30" height="35" fill="#8B7355" rx="2" />
        <rect className="build-part animate-fill" x="60" y="25" width="30" height="35" fill="#7A6548" rx="2" />
        {/* Cabinet handles */}
        <rect className="build-part glow-pulse" x="50" y="38" width="2" height="8" fill="#F5A623" rx="1" />
        <rect className="build-part glow-pulse" x="85" y="38" width="2" height="8" fill="#F5A623" rx="1" />
        {/* Sink */}
        <ellipse className="build-part" cx="55" cy="72" rx="12" ry="4" fill="#6e7681" />
        <rect className="build-part" x="53" y="62" width="4" height="10" fill="#aaa" rx="1" />
        {/* TV cabinet (right side) */}
        <rect className="build-part animate-fill" x="115" y="60" width="70" height="60" fill="#4a5058" rx="2" />
        <rect className="build-part" x="125" y="25" width="50" height="30" fill="#1a1a1a" rx="2" />
        <rect className="build-part glow-pulse" x="127" y="27" width="46" height="26" fill="#1a2535" rx="1" />
        {/* Floor */}
        <rect className="build-part" x="15" y="110" width="170" height="10" fill="#3a3f47" />
      </svg>
    ),
    waterproofing: (
      <svg viewBox="0 0 200 140" ref={svgRef}>
        <rect className="build-part" x="0" y="120" width="200" height="20" fill="#2a2f38" rx="2" />
        {/* Roof section */}
        <rect className="build-part animate-fill" x="20" y="40" width="160" height="80" fill="#3a3f47" rx="2" />
        {/* Waterproofing layers */}
        <rect className="build-part" x="25" y="45" width="150" height="8" fill="#1a2535" rx="1" />
        <rect className="build-part" x="25" y="55" width="150" height="6" fill="#4A90D9" opacity="0.4" rx="1" />
        <rect className="build-part" x="25" y="63" width="150" height="8" fill="#2a2f38" rx="1" />
        {/* Layer labels */}
        <text className="build-part" x="30" y="51" fill="#8b8d91" fontSize="5" fontFamily="monospace">MEMBRANE</text>
        <text className="build-part" x="30" y="60" fill="#4A90D9" fontSize="5" fontFamily="monospace" opacity="0.7">SEALANT</text>
        <text className="build-part" x="30" y="69" fill="#8b8d91" fontSize="5" fontFamily="monospace">PRIMER</text>
        {/* Water drops being repelled */}
        <circle className="build-part glow-pulse" cx="80" cy="35" r="3" fill="#4A90D9" opacity="0.4" />
        <circle className="build-part glow-pulse" cx="120" cy="32" r="2" fill="#4A90D9" opacity="0.3" />
        <circle className="build-part glow-pulse" cx="100" cy="30" r="2.5" fill="#4A90D9" opacity="0.35" />
        {/* Shield icon */}
        <path className="build-part" d="M100,80 L80,90 L80,105 Q80,115 100,120 Q120,115 120,105 L120,90 Z" fill="#F5A623" opacity="0.3" />
        <text className="build-part" x="95" y="105" fill="#F5A623" fontSize="12">✓</text>
        {/* Finished surface */}
        <rect className="build-part" x="25" y="75" width="150" height="40" fill="#4a5058" rx="1" />
      </svg>
    ),
  };

  return scenes[type] || scenes.residential;
};

const CinematicShowcase: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate through services
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, []);

  const handleServiceClick = (index: number) => {
    setActiveService(index);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3000);
  };

  // GSAP reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      }
    );
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div ref={sectionRef} className="cinema-showcase">
      <div className="container">
        {/* Header */}
        <div className="cinema-header">
          <span className="section-tag">Our Expertise</span>
          <h2>Construction Services</h2>
          <div className="section-line" />
          <p>Every service crafted with precision — watch each one come to life</p>
        </div>

        {/* Main display */}
        <div className="cinema-display">
          {/* Service list (left) */}
          <div className="cinema-list">
            {services.map((s, i) => (
              <button
                key={s.id}
                className={`cinema-list-item ${i === activeService ? 'active' : ''}`}
                onClick={() => handleServiceClick(i)}
              >
                <span className="cinema-list-icon">{s.icon}</span>
                <div className="cinema-list-text">
                  <span className="cinema-list-title">{s.title}</span>
                  <span className="cinema-list-sub">{s.subtitle}</span>
                </div>
                {i === activeService && <i className="fa fa-chevron-right"></i>}
              </button>
            ))}
          </div>

          {/* Scene display (right) */}
          <div className="cinema-scene">
            <div className="cinema-scene-frame">
              <MiniScene type={services[activeService].id} active={true} />
            </div>
            <div className="cinema-scene-info">
              <h3>{services[activeService].title}</h3>
              <p>{services[activeService].subtitle}</p>
            </div>
            {/* Progress dots */}
            <div className="cinema-dots">
              {services.map((_, i) => (
                <button
                  key={i}
                  className={`cinema-dot ${i === activeService ? 'active' : ''}`}
                  onClick={() => handleServiceClick(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicShowcase;
