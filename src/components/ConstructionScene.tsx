import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Realistic construction scene — builds floor by floor as user scrolls.
 * progress 0 = empty ground, progress 1 = fully built.
 */
const ConstructionScene: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;

    // Crane arm sway — slow, heavy movement
    const craneArm = svg.querySelector('#crane-arm');
    if (craneArm) {
      gsap.to(craneArm, {
        rotation: 2.5,
        transformOrigin: '680px 80px',
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Cable swing
    const cableGroup = svg.querySelector('#cable-group');
    if (cableGroup) {
      gsap.to(cableGroup, {
        rotation: 3,
        transformOrigin: '520px 82px',
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Worker 1 — hammering
    const hammer = svg.querySelector('#w1-hammer');
    if (hammer) {
      gsap.to(hammer, {
        rotation: -30,
        transformOrigin: '0% 100%',
        duration: 0.35,
        ease: 'power2.in',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.3,
      });
    }

    // Welding glow pulse
    const weldGlow = svg.querySelector('#weld-glow');
    if (weldGlow) {
      gsap.to(weldGlow, {
        opacity: 0.8,
        r: 12,
        duration: 0.12,
        ease: 'none',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.08,
      });
    }

    // Welding sparks
    const sparks = svg.querySelectorAll('.spark');
    sparks.forEach((spark, i) => {
      const angle = (i / sparks.length) * Math.PI * 2;
      const dist = 8 + Math.random() * 15;
      gsap.fromTo(spark,
        { opacity: 0, x: 0, y: 0 },
        {
          opacity: 0.9,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 10,
          duration: 0.25 + Math.random() * 0.2,
          delay: i * 0.06,
          ease: 'power2.out',
          repeat: -1,
          repeatDelay: 0.15 + Math.random() * 0.3,
        }
      );
    });

    // Worker 3 — walking bob
    const walker = svg.querySelector('#w3-group');
    if (walker) {
      gsap.to(walker, {
        y: -2,
        duration: 0.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Crane warning light blink
    const light = svg.querySelector('#crane-warning');
    if (light) {
      gsap.to(light, {
        opacity: 0.15,
        duration: 0.4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Pulley wheel rotation
    const pulley = svg.querySelector('#pulley-wheel');
    if (pulley) {
      gsap.to(pulley, {
        rotation: 360,
        transformOrigin: 'center',
        duration: 2,
        ease: 'none',
        repeat: -1,
      });
    }

    // Dust particles
    const dusts = svg.querySelectorAll('.dust');
    dusts.forEach((d, i) => {
      gsap.fromTo(d,
        { opacity: 0, y: 0, x: 0 },
        {
          opacity: 0.25,
          y: -(8 + Math.random() * 15),
          x: (Math.random() - 0.5) * 12,
          duration: 2.5 + Math.random() * 2,
          delay: Math.random() * 4,
          ease: 'power1.out',
          repeat: -1,
          repeatDelay: Math.random() * 3,
        }
      );
    });

    // City lights twinkle
    const cityLights = svg.querySelectorAll('.city-light');
    cityLights.forEach((cl, i) => {
      gsap.to(cl, {
        opacity: 0.1 + Math.random() * 0.3,
        duration: 1.5 + Math.random() * 2,
        delay: i * 0.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    // Steel beam sway on hook
    const beam = svg.querySelector('#hook-beam');
    if (beam) {
      gsap.to(beam, {
        rotation: 2,
        transformOrigin: '50% 0%',
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Scaffolding subtle sway
    const scaffold = svg.querySelector('#scaffold');
    if (scaffold) {
      gsap.to(scaffold, {
        x: 0.5,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  // === PROGRESSIVE REVEAL ===
  // Map progress to construction stages:
  // 0.00 - 0.05: Just ground + materials (empty site)
  // 0.05 - 0.15: Crane + scaffolding appear
  // 0.10 - 0.15: Foundation appears
  // 0.15 - 0.85: Floors build one by one (10 floors)
  // 0.80 - 0.90: Workers appear progressively
  // 0.85 - 0.95: Roof appears
  // 0.95 - 1.00: Full scene complete

  const craneOpacity = Math.min(progress / 0.12, 1);
  const scaffoldOpacity = Math.min(Math.max((progress - 0.05) / 0.1, 0), 1);
  const foundationOpacity = Math.min(Math.max((progress - 0.08) / 0.07, 0), 1);
  const barriersOpacity = Math.min(progress / 0.08, 1);
  const materialsOpacity = Math.min(progress / 0.06, 1);

  // Workers appear progressively as building grows
  const worker1Opacity = Math.min(Math.max((progress - 0.2) / 0.1, 0), 1); // foreman
  const worker2Opacity = Math.min(Math.max((progress - 0.35) / 0.1, 0), 1); // welder
  const worker3Opacity = Math.min(Math.max((progress - 0.5) / 0.1, 0), 1); // carrier
  const worker4Opacity = Math.min(Math.max((progress - 0.15) / 0.1, 0), 1); // operator

  const totalFloors = 10;
  // Floors start building at 12% and complete at 88%
  const floorProgress = Math.max(0, Math.min((progress - 0.12) / 0.76, 1));
  const visibleFloors = Math.floor(floorProgress * totalFloors);

  // Roof appears after all floors
  const roofOpacity = Math.min(Math.max((progress - 0.88) / 0.08, 0), 1);

  // Site lighting grows as construction progresses
  const siteLightOpacity = 0.3 + progress * 0.5;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 900 520"
      className="construction-svg"
      aria-label="Animated construction scene — building assembles as you scroll"
      style={{ width: '100%', height: 'auto' }}
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080c14" />
          <stop offset="40%" stopColor="#0d1520" />
          <stop offset="100%" stopColor="#141e2a" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2f38" />
          <stop offset="40%" stopColor="#1e2229" />
          <stop offset="100%" stopColor="#15181e" />
        </linearGradient>
        <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5a6068" />
          <stop offset="50%" stopColor="#7a8290" />
          <stop offset="100%" stopColor="#5a6068" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#1a2535" />
          <stop offset="50%" stopColor="#0f1822" />
          <stop offset="100%" stopColor="#1a2535" />
        </linearGradient>
        <linearGradient id="crane-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#c98a18" />
        </linearGradient>
        <radialGradient id="site-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(245,166,35,0.15)" />
          <stop offset="100%" stopColor="rgba(245,166,35,0)" />
        </radialGradient>
        <filter id="weld-filter">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
        </filter>
        <filter id="ambient"><feGaussianBlur stdDeviation="6" /></filter>
        <pattern id="concrete" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#3a3f47" />
          <circle cx="1" cy="1" r="0.3" fill="#333840" opacity="0.5" />
          <circle cx="3" cy="3" r="0.2" fill="#444950" opacity="0.4" />
        </pattern>
      </defs>

      {/* SKY */}
      <rect width="900" height="520" fill="url(#sky)" />

      {/* Distant city skyline */}
      <g opacity="0.12">
        <rect x="20" y="180" width="18" height="80" fill="#2a3040" rx="1" />
        <rect x="45" y="160" width="14" height="100" fill="#252b38" rx="1" />
        <rect x="65" y="200" width="20" height="60" fill="#2a3040" rx="1" />
        <rect x="92" y="140" width="12" height="120" fill="#1e2430" rx="1" />
        <rect x="110" y="175" width="16" height="85" fill="#252b38" rx="1" />
        <rect x="135" y="195" width="22" height="65" fill="#2a3040" rx="1" />
        <rect x="165" y="155" width="10" height="105" fill="#1e2430" rx="1" />
        <rect x="185" y="185" width="18" height="75" fill="#252b38" rx="1" />
        <rect x="700" y="170" width="15" height="90" fill="#252b38" rx="1" />
        <rect x="722" y="150" width="20" height="110" fill="#2a3040" rx="1" />
        <rect x="750" y="180" width="12" height="80" fill="#1e2430" rx="1" />
        <rect x="770" y="160" width="18" height="100" fill="#252b38" rx="1" />
        <rect x="800" y="190" width="14" height="70" fill="#2a3040" rx="1" />
        <rect x="825" y="145" width="16" height="115" fill="#1e2430" rx="1" />
        <rect x="850" y="175" width="20" height="85" fill="#252b38" rx="1" />
        <rect x="878" y="195" width="12" height="65" fill="#2a3040" rx="1" />
      </g>

      {/* City window lights */}
      {[
        [25, 195], [30, 210], [50, 175], [50, 190], [72, 215], [98, 165], [98, 180],
        [116, 190], [140, 210], [170, 170], [190, 200],
        [705, 185], [710, 200], [730, 165], [730, 180], [755, 195],
        [778, 175], [778, 190], [808, 205], [832, 160], [858, 190],
      ].map(([x, y], i) => (
        <rect key={i} className="city-light" x={x} y={y} width="3" height="3" fill="#F5A623" opacity="0.2" rx="0.5" />
      ))}

      {/* Stars */}
      {[
        [80, 40], [150, 25], [220, 55], [310, 15], [400, 45], [480, 30],
        [560, 50], [640, 20], [720, 40], [800, 35], [860, 55], [120, 70],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.8" fill="#fff" opacity={0.15 + (i % 4) * 0.1} />
      ))}

      {/* GROUND — always visible */}
      <rect x="0" y="440" width="900" height="80" fill="url(#ground)" />
      <line x1="0" y1="440" x2="900" y2="440" stroke="#F5A623" strokeWidth="1" opacity="0.12" />
      <rect x="0" y="440" width="900" height="2" fill="#22272e" />

      {/* Road markings */}
      <line x1="0" y1="465" x2="900" y2="465" stroke="#333" strokeWidth="0.5" strokeDasharray="20 15" opacity="0.3" />

      {/* CONSTRUCTION SITE LIGHTING — grows with progress */}
      <g opacity={siteLightOpacity}>
        <ellipse cx="350" cy="440" rx="200" ry="30" fill="url(#site-glow)" />
        <ellipse cx="250" cy="442" rx="40" ry="8" fill="rgba(245,166,35,0.06)" />
        <ellipse cx="450" cy="442" rx="35" ry="7" fill="rgba(245,166,35,0.05)" />
      </g>

      {/* CONSTRUCTION BARRIERS — appear early */}
      <g opacity={barriersOpacity} style={{ transition: 'opacity 0.6s ease' }}>
        <g transform="translate(80, 430)">
          <rect x="0" y="0" width="60" height="3" fill="#F5A623" rx="1" />
          <rect x="0" y="3" width="60" height="7" fill="#e8e8e8" />
          <rect x="5" y="10" width="3" height="25" fill="#888" />
          <rect x="52" y="10" width="3" height="25" fill="#888" />
        </g>
        <g transform="translate(560, 432)">
          <rect x="0" y="0" width="50" height="3" fill="#F5A623" rx="1" />
          <rect x="0" y="3" width="50" height="6" fill="#e8e8e8" />
          <rect x="4" y="9" width="3" height="20" fill="#888" />
          <rect x="43" y="9" width="3" height="20" fill="#888" />
        </g>
      </g>

      {/* CONSTRUCTION MATERIALS — appear first */}
      <g opacity={materialsOpacity} style={{ transition: 'opacity 0.6s ease' }}>
        <g transform="translate(100, 435)">
          <rect x="0" y="0" width="50" height="4" fill="#6e7681" rx="1" />
          <rect x="2" y="-4" width="48" height="4" fill="#7a8290" rx="1" />
          <rect x="-1" y="-8" width="46" height="4" fill="#6e7681" rx="1" />
        </g>
        <rect x="150" y="432" width="15" height="10" fill="#4a5058" rx="1" />
        <rect x="168" y="434" width="12" height="8" fill="#444950" rx="1" />
        <ellipse cx="620" cy="440" rx="20" ry="6" fill="#5a5040" opacity="0.6" />
        <g transform="translate(680, 436)">
          <line x1="0" y1="0" x2="35" y2="0" stroke="#888" strokeWidth="1.5" />
          <line x1="0" y1="3" x2="35" y2="3" stroke="#888" strokeWidth="1.5" />
          <line x1="0" y1="6" x2="35" y2="6" stroke="#888" strokeWidth="1.5" />
          <line x1="0" y1="9" x2="35" y2="9" stroke="#888" strokeWidth="1.5" />
          <rect x="0" y="-2" width="2" height="14" fill="#777" rx="0.5" />
          <rect x="17" y="-2" width="2" height="14" fill="#777" rx="0.5" />
          <rect x="33" y="-2" width="2" height="14" fill="#777" rx="0.5" />
        </g>
      </g>

      {/* SCAFFOLDING — appears after crane */}
      <g id="scaffold" opacity={scaffoldOpacity * 0.6} style={{ transition: 'opacity 0.8s ease' }}>
        <line x1="175" y1="130" x2="175" y2="440" stroke="#6e7681" strokeWidth="2" />
        <line x1="225" y1="130" x2="225" y2="440" stroke="#6e7681" strokeWidth="2" />
        {[180, 220, 260, 300, 340, 380, 420].map((y, i) => (
          <line key={i} x1="175" y1={y} x2="225" y2={y} stroke="#5a6068" strokeWidth="1" />
        ))}
        <line x1="175" y1="180" x2="225" y2="220" stroke="#4a5058" strokeWidth="0.7" />
        <line x1="175" y1="220" x2="225" y2="180" stroke="#4a5058" strokeWidth="0.7" />
        <line x1="175" y1="300" x2="225" y2="340" stroke="#4a5058" strokeWidth="0.7" />
        <line x1="175" y1="340" x2="225" y2="300" stroke="#4a5058" strokeWidth="0.7" />
        <rect x="173" y="218" width="54" height="3" fill="#555" rx="0.5" />
        <rect x="173" y="338" width="54" height="3" fill="#555" rx="0.5" />
        <rect x="175" y="132" width="50" height="88" fill="none" stroke="#F5A623" strokeWidth="0.3" strokeDasharray="4 4" opacity="0.3" />
      </g>

      {/* ===== BUILDING (scroll-driven progressive build) ===== */}
      <g id="building">
        {/* Foundation — appears at ~10% scroll */}
        <g opacity={foundationOpacity} style={{ transition: 'opacity 0.8s ease' }}>
          <rect x="240" y="415" width="220" height="25" fill="url(#concrete)" />
          <rect x="235" y="410" width="230" height="8" fill="#4a5058" rx="1" />
          <line x1="240" y1="420" x2="460" y2="420" stroke="#3a3f47" strokeWidth="0.5" />
          <line x1="240" y1="430" x2="460" y2="430" stroke="#3a3f47" strokeWidth="0.5" />
        </g>

        {/* Building floors — one by one as scroll increases */}
        {Array.from({ length: totalFloors }, (_, i) => {
          const floorY = 408 - (i + 1) * 32;
          const visible = i < visibleFloors;
          return (
            <g key={i} opacity={visible ? 1 : 0.02} style={{ transition: 'opacity 1s ease' }}>
              {/* Floor slab */}
              <rect x="240" y={floorY} width="220" height="5" fill="#4a5058" />
              <rect x="240" y={floorY + 5} width="220" height="1" fill="#3a3f47" />

              {/* Structural columns */}
              <rect x="240" y={floorY - 27} width="5" height="27" fill="url(#steel)" />
              <rect x="455" y={floorY - 27} width="5" height="27" fill="url(#steel)" />
              <rect x="310" y={floorY - 27} width="3" height="27" fill="#5a6068" />
              <rect x="390" y={floorY - 27} width="3" height="27" fill="#5a6068" />

              {/* Glass windows */}
              {[255, 285, 325, 355, 400, 430].map((wx, wi) => (
                <g key={wi}>
                  <rect x={wx} y={floorY - 24} width="24" height="20" fill="url(#glass)" rx="0.5" />
                  <rect x={wx} y={floorY - 24} width="24" height="20" fill="none" stroke="#3a4050" strokeWidth="0.5" rx="0.5" />
                  <rect x={wx + 2} y={floorY - 22} width="8" height="6" fill="rgba(255,255,255,0.03)" rx="0.5" />
                  <line x1={wx + 12} y1={floorY - 24} x2={wx + 12} y2={floorY - 4} stroke="#2a3040" strokeWidth="0.5" />
                </g>
              ))}

              {/* Interior lights (some windows lit) */}
              {i % 3 === 0 && (
                <rect x="327" y={floorY - 22} width="20" height="16" fill="rgba(245,166,35,0.06)" rx="0.5" />
              )}
              {i % 4 === 1 && (
                <rect x="257" y={floorY - 22} width="20" height="16" fill="rgba(245,166,35,0.04)" rx="0.5" />
              )}
              {i % 5 === 3 && (
                <rect x="402" y={floorY - 22} width="20" height="16" fill="rgba(245,166,35,0.05)" rx="0.5" />
              )}

              {/* Floor number */}
              {visible && (
                <text x="232" y={floorY + 3} fill="#3a3f47" fontSize="5" fontFamily="monospace">
                  {(i + 1).toString().padStart(2, '0')}
                </text>
              )}
            </g>
          );
        })}

        {/* Roof — appears when building is nearly complete */}
        <g opacity={roofOpacity} style={{ transition: 'opacity 1s ease' }}>
          <rect x="238" y="75" width="224" height="6" fill="#5a6068" />
          <rect x="280" y="65" width="20" height="10" fill="#4a5058" rx="1" />
          <rect x="380" y="68" width="15" height="7" fill="#444950" rx="1" />
          <line x1="400" y1="68" x2="400" y2="50" stroke="#6e7681" strokeWidth="1.5" />
          <circle cx="400" cy="48" r="2" fill="#F5A623" opacity="0.6" />
        </g>
      </g>

      {/* ===== CRANE — appears early, stays ===== */}
      <g id="crane" opacity={craneOpacity} style={{ transition: 'opacity 1s ease' }}>
        {/* Mast — lattice structure */}
        <g>
          <rect x="675" y="80" width="10" height="360" fill="url(#crane-body)" />
          {[120, 160, 200, 240, 280, 320, 360, 400].map((y, i) => (
            <g key={i}>
              <line x1="675" y1={y} x2="685" y2={y + 20} stroke="#c98a18" strokeWidth="0.8" opacity="0.5" />
              <line x1="685" y1={y} x2="675" y2={y + 20} stroke="#c98a18" strokeWidth="0.8" opacity="0.5" />
            </g>
          ))}
          {[100, 180, 260, 340].map((y, i) => (
            <rect key={i} x="673" y={y} width="14" height="4" fill="#D4912A" rx="1" />
          ))}
        </g>

        {/* Crane cab */}
        <rect x="670" y="380" width="22" height="20" fill="#D4912A" rx="2" />
        <rect x="672" y="383" width="8" height="8" fill="#1a2535" rx="1" />
        <rect x="682" y="383" width="8" height="8" fill="#1a2535" rx="1" />

        {/* Crane base */}
        <rect x="665" y="420" width="32" height="20" fill="#D4912A" rx="2" />
        <rect x="660" y="438" width="42" height="6" fill="#888" rx="1" />

        {/* Warning light */}
        <circle id="crane-warning" cx="680" cy="78" r="4" fill="#FF3B30" opacity="0.7" />
        <circle cx="680" cy="78" r="10" fill="#FF3B30" opacity="0.08" filter="url(#ambient)" />

        {/* Crane arm (jib) */}
        <g id="crane-arm">
          <rect x="380" y="77" width="300" height="7" fill="url(#crane-body)" />
          {[0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275].map((offset, i) => (
            <g key={i} opacity="0.4">
              <line x1={385 + offset} y1="77" x2={395 + offset} y2="84" stroke="#c98a18" strokeWidth="0.6" />
              <line x1={395 + offset} y1="77" x2={385 + offset} y2="84" stroke="#c98a18" strokeWidth="0.6" />
            </g>
          ))}
          {/* Counter-jib */}
          <rect x="685" y="78" width="60" height="5" fill="url(#crane-body)" />
          <rect x="730" y="83" width="20" height="15" fill="#555" rx="2" />
          <rect x="732" y="85" width="16" height="4" fill="#666" rx="1" />
          <rect x="732" y="91" width="16" height="4" fill="#666" rx="1" />
        </g>

        {/* Cable & hook */}
        <g id="cable-group">
          <line x1="520" y1="84" x2="520" y2="170" stroke="#888" strokeWidth="1" />
          <g id="pulley-wheel">
            <circle cx="520" cy="84" r="4" fill="#555" stroke="#777" strokeWidth="1" />
            <circle cx="520" cy="84" r="1.5" fill="#888" />
          </g>
          <path d="M517,170 Q517,182 520,185 Q523,182 523,170" fill="none" stroke="#aaa" strokeWidth="1.5" />
          <circle cx="520" cy="168" r="2" fill="#888" />
          <g id="hook-beam" style={{ transformOrigin: '520px 175px' }}>
            <rect x="490" y="173" width="60" height="6" fill="#F5A623" rx="1" />
            <line x1="490" y1="176" x2="550" y2="176" stroke="#c98a18" strokeWidth="0.5" />
            <rect x="488" y="173" width="3" height="6" fill="#D4912A" rx="1" />
            <rect x="549" y="173" width="3" height="6" fill="#D4912A" rx="1" />
          </g>
        </g>
      </g>

      {/* ===== WORKERS — appear progressively ===== */}

      {/* Worker 1 — Foreman (pointing) */}
      <g transform="translate(195, 400)" filter="url(#shadow)" opacity={worker1Opacity} style={{ transition: 'opacity 0.8s ease' }}>
        <ellipse cx="10" cy="-32" rx="9" ry="5" fill="#F5A623" />
        <rect x="3" y="-28" width="14" height="3" fill="#c98a18" rx="1" />
        <rect x="4" y="-25" width="12" height="10" fill="#c4a07a" rx="4" />
        <rect x="2" y="-15" width="16" height="20" fill="#F5A623" rx="2" />
        <rect x="2" y="-10" width="16" height="2" fill="#fff" opacity="0.4" />
        <rect x="2" y="-4" width="16" height="2" fill="#fff" opacity="0.3" />
        <rect x="-4" y="-14" width="5" height="12" fill="#c4a07a" rx="2" />
        <rect x="15" y="-16" width="5" height="14" fill="#c4a07a" rx="2" transform="rotate(-20, 17, -16)" />
        <rect x="3" y="5" width="6" height="16" fill="#3a4050" rx="1" />
        <rect x="11" y="5" width="6" height="16" fill="#3a4050" rx="1" />
        <rect x="2" y="19" width="8" height="4" fill="#2a2a2a" rx="1.5" />
        <rect x="10" y="19" width="8" height="4" fill="#2a2a2a" rx="1.5" />
      </g>

      {/* Worker 2 — Welder */}
      <g transform="translate(460, 402)" filter="url(#shadow)" opacity={worker2Opacity} style={{ transition: 'opacity 0.8s ease' }}>
        <ellipse cx="9" cy="-30" rx="8" ry="4.5" fill="#F5A623" />
        <rect x="3" y="-26" width="12" height="9" fill="#444" rx="2" />
        <rect x="12" y="-24" width="4" height="5" fill="#1a1a1a" rx="1" />
        <rect x="1" y="-17" width="16" height="18" fill="#6e7681" rx="2" />
        <rect x="1" y="-10" width="16" height="2" fill="#F5A623" opacity="0.4" />
        <rect x="15" y="-14" width="14" height="4" fill="#c4a07a" rx="2" />
        <rect x="28" y="-15" width="3" height="6" fill="#555" rx="1" />
        <circle id="weld-glow" cx="30" cy="-9" r="8" fill="#F5A623" opacity="0.4" filter="url(#weld-filter)" />
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={i} className="spark" cx="30" cy="-9" r={0.8 + Math.random() * 0.8} fill="#FFD700" opacity="0" />
        ))}
        <rect x="2" y="1" width="5" height="14" fill="#3a4050" rx="1" />
        <rect x="10" y="1" width="5" height="14" fill="#3a4050" rx="1" />
        <rect x="1" y="13" width="7" height="4" fill="#2a2a2a" rx="1.5" />
        <rect x="9" y="13" width="7" height="4" fill="#2a2a2a" rx="1.5" />
      </g>

      {/* Worker 3 — Carrier */}
      <g id="w3-group" transform="translate(520, 408)" filter="url(#shadow)" opacity={worker3Opacity} style={{ transition: 'opacity 0.8s ease' }}>
        <ellipse cx="8" cy="-26" rx="7" ry="4" fill="#F5A623" />
        <rect x="3" y="-22" width="10" height="8" fill="#c4a07a" rx="3" />
        <rect x="1" y="-14" width="14" height="16" fill="#F5A623" rx="2" />
        <rect x="1" y="-8" width="14" height="2" fill="#fff" opacity="0.3" />
        <rect x="-3" y="-12" width="4" height="10" fill="#c4a07a" rx="2" />
        <rect x="14" y="-12" width="4" height="10" fill="#c4a07a" rx="2" />
        <rect x="-12" y="-18" width="40" height="3" fill="#8B7355" rx="1" />
        <rect x="-12" y="-18" width="40" height="1" fill="#9B8365" rx="0.5" opacity="0.4" />
        <rect x="2" y="2" width="4" height="12" fill="#3a4050" rx="1" />
        <rect x="9" y="2" width="4" height="12" fill="#3a4050" rx="1" />
        <rect x="1" y="12" width="6" height="3" fill="#2a2a2a" rx="1.5" />
        <rect x="8" y="12" width="6" height="3" fill="#2a2a2a" rx="1.5" />
      </g>

      {/* Worker 4 — Crane operator */}
      <g transform="translate(655, 398)" filter="url(#shadow)" opacity={worker4Opacity} style={{ transition: 'opacity 0.8s ease' }}>
        <ellipse cx="7" cy="-22" rx="6" ry="3.5" fill="#F5A623" />
        <rect x="2" y="-18" width="10" height="7" fill="#c4a07a" rx="2.5" />
        <rect x="0" y="-11" width="14" height="14" fill="#4a5568" rx="2" />
        <rect x="1" y="3" width="4" height="11" fill="#3a4050" rx="1" />
        <rect x="8" y="3" width="4" height="11" fill="#3a4050" rx="1" />
        <rect x="0" y="12" width="5" height="3" fill="#2a2a2a" rx="1" />
        <rect x="8" y="12" width="5" height="3" fill="#2a2a2a" rx="1" />
      </g>

      {/* Dust particles */}
      {[190, 260, 350, 420, 480, 550].map((x, i) => (
        <circle key={i} className="dust" cx={x} cy={438} r="1.2" fill="#8b8d91" opacity="0" />
      ))}

      {/* Puddle reflection */}
      <ellipse cx="350" cy="455" rx="25" ry="3" fill="rgba(245,166,35,0.04)" />
    </svg>
  );
};

export default ConstructionScene;
