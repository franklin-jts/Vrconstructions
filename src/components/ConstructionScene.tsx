import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Animated construction scene — crane lifting beam, workers building,
 * welding sparks, blinking lights. Pure SVG + GSAP, no external assets.
 */
const ConstructionScene: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;

    // Crane arm sway
    const craneArm = svg.querySelector('#crane-arm');
    if (craneArm) {
      gsap.to(craneArm, {
        rotation: 3,
        transformOrigin: '100% 50%',
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Worker 1 — hammering arm
    const arm1 = svg.querySelector('#worker1-arm');
    if (arm1) {
      gsap.to(arm1, {
        rotation: -25,
        transformOrigin: '50% 0%',
        duration: 0.4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Worker 2 — welding
    const weldGlow = svg.querySelector('#weld-glow');
    if (weldGlow) {
      gsap.to(weldGlow, {
        opacity: 0.9,
        duration: 0.15,
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.1,
      });
    }

    // Welding sparks
    const sparks = svg.querySelectorAll('.weld-spark');
    sparks.forEach((spark, i) => {
      gsap.fromTo(spark,
        { opacity: 0, x: 0, y: 0, scale: 0 },
        {
          opacity: 1,
          x: (i % 2 === 0 ? 1 : -1) * (8 + Math.random() * 12),
          y: -(5 + Math.random() * 15),
          scale: 1,
          duration: 0.3 + Math.random() * 0.3,
          delay: i * 0.08,
          ease: 'power2.out',
          repeat: -1,
          repeatDelay: 0.2 + Math.random() * 0.4,
        }
      );
    });

    // Worker 3 — carrying beam (swaying)
    const worker3 = svg.querySelector('#worker3');
    if (worker3) {
      gsap.to(worker3, {
        x: 2,
        y: -1,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Warning light blink
    const warnLight = svg.querySelector('#crane-light');
    if (warnLight) {
      gsap.to(warnLight, {
        opacity: 0.2,
        duration: 0.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Dust particles
    const dusts = svg.querySelectorAll('.dust-particle');
    dusts.forEach((d, i) => {
      gsap.fromTo(d,
        { opacity: 0, y: 0 },
        {
          opacity: 0.3,
          y: -(10 + Math.random() * 20),
          x: (Math.random() - 0.5) * 20,
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 3,
          ease: 'power1.out',
          repeat: -1,
          repeatDelay: Math.random() * 2,
        }
      );
    });

    // Hanging cable swing
    const cable = svg.querySelector('#crane-cable');
    if (cable) {
      gsap.to(cable, {
        rotation: 4,
        transformOrigin: '50% 0%',
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Steel beam on cable — swing
    const beam = svg.querySelector('#hanging-beam');
    if (beam) {
      gsap.to(beam, {
        rotation: 3,
        transformOrigin: '50% 0%',
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  // Building floors controlled by scroll progress
  const floors = 8;
  const visibleFloors = Math.floor(progress * floors);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 450"
      className="construction-svg"
      aria-label="Animated construction scene showing workers building a structure"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1117" />
          <stop offset="100%" stopColor="#161b22" />
        </linearGradient>
        <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d333b" />
          <stop offset="100%" stopColor="#1a1d23" />
        </linearGradient>
        <linearGradient id="steel-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6e7681" />
          <stop offset="100%" stopColor="#484f58" />
        </linearGradient>
        <linearGradient id="crane-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#D4912A" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="soft-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="800" height="450" fill="url(#sky-grad)" />

      {/* Stars / city lights in background */}
      {[
        [50, 60], [120, 40], [200, 80], [320, 30], [450, 55], [580, 35], [680, 70], [750, 45],
        [90, 95], [260, 100], [400, 90], [530, 110], [650, 85], [730, 105],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1} fill="#F5A623" opacity={0.2 + (i % 3) * 0.15} />
      ))}

      {/* Ground */}
      <rect x="0" y="390" width="800" height="60" fill="url(#ground-grad)" />
      <rect x="0" y="388" width="800" height="3" fill="#F5A623" opacity="0.15" />

      {/* Ground texture lines */}
      {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720].map((x, i) => (
        <line key={i} x1={x} y1="395" x2={x + 40} y2="395" stroke="#333" strokeWidth="0.5" />
      ))}

      {/* ===== BUILDING (scroll-driven) ===== */}
      <g id="building-group" filter="url(#soft-shadow)">
        {/* Foundation */}
        <rect x="200" y="370" width="200" height="20" fill="#3d444d" rx="2" />
        <rect x="195" y="365" width="210" height="8" fill="#484f58" rx="1" />

        {/* Building floors — appear based on scroll progress */}
        {Array.from({ length: floors }, (_, i) => {
          const floorY = 365 - (i + 1) * 35;
          const isVisible = i < visibleFloors;
          return (
            <g key={i} opacity={isVisible ? 1 : 0.05} style={{ transition: 'opacity 0.6s ease' }}>
              {/* Floor slab */}
              <rect x="205" y={floorY} width="190" height="4" fill="#484f58" rx="1" />
              {/* Left column */}
              <rect x="205" y={floorY - 31} width="6" height="31" fill="url(#steel-grad)" />
              {/* Right column */}
              <rect x="389" y={floorY - 31} width="6" height="31" fill="url(#steel-grad)" />
              {/* Mid columns */}
              <rect x="270" y={floorY - 31} width="4" height="31" fill="#484f58" />
              <rect x="325" y={floorY - 31} width="4" height="31" fill="#484f58" />
              {/* Windows */}
              <rect x="220" y={floorY - 26} width="22" height="20" fill="#0d1117" stroke="#F5A623" strokeWidth="0.5" opacity="0.6" rx="1" />
              <rect x="252" y={floorY - 26} width="22" height="20" fill="#0d1117" stroke="#F5A623" strokeWidth="0.5" opacity="0.6" rx="1" />
              <rect x="288" y={floorY - 26} width="22" height="20" fill="#0d1117" stroke="#F5A623" strokeWidth="0.5" opacity="0.6" rx="1" />
              <rect x="330" y={floorY - 26} width="22" height="20" fill="#0d1117" stroke="#F5A623" strokeWidth="0.5" opacity="0.6" rx="1" />
              <rect x="362" y={floorY - 26} width="22" height="20" fill="#0d1117" stroke="#F5A623" strokeWidth="0.5" opacity="0.6" rx="1" />
              {/* Lit windows (random) */}
              {i % 2 === 0 && (
                <rect x="222" y={floorY - 24} width="18" height="16" fill="#F5A623" opacity="0.08" rx="1" />
              )}
              {i % 3 === 1 && (
                <rect x="332" y={floorY - 24} width="18" height="16" fill="#F5A623" opacity="0.06" rx="1" />
              )}
            </g>
          );
        })}

        {/* Roof (appears when mostly built) */}
        {visibleFloors >= 7 && (
          <g opacity={visibleFloors >= 7 ? 1 : 0} style={{ transition: 'opacity 0.8s ease' }}>
            <polygon points="195,35 400,35 380,15 220,15" fill="#484f58" />
            <rect x="220" y="12" width="160" height="5" fill="#6e7681" />
          </g>
        )}
      </g>

      {/* ===== CRANE ===== */}
      <g id="crane-group">
        {/* Crane mast */}
        <rect x="560" y="50" width="10" height="340" fill="url(#crane-grad)" />
        <rect x="555" y="50" width="20" height="8" fill="#D4912A" />
        {/* Crane base */}
        <rect x="545" y="375" width="40" height="15" fill="#D4912A" rx="2" />

        {/* Warning light */}
        <circle id="crane-light" cx="565" cy="48" r="5" fill="#FF3B30" filter="url(#glow)" />

        {/* Crane arm (rotates) */}
        <g id="crane-arm" style={{ transformOrigin: '565px 55px' }}>
          <rect x="350" y="52" width="215" height="6" fill="url(#crane-grad)" />
          {/* Arm lattice */}
          {[0, 30, 60, 90, 120, 150, 180].map((offset, i) => (
            <line key={i} x1={365 + offset} y1="52" x2={375 + offset} y2="58" stroke="#D4912A" strokeWidth="1" opacity="0.5" />
          ))}
          {/* Counter weight */}
          <rect x="540" y="58" width="30" height="20" fill="#555" rx="2" />
        </g>

        {/* Cable */}
        <g id="crane-cable" style={{ transformOrigin: '420px 58px' }}>
          <line x1="420" y1="58" x2="420" y2="130" stroke="#888" strokeWidth="1" />
          {/* Hanging beam */}
          <g id="hanging-beam" style={{ transformOrigin: '420px 130px' }}>
            <rect x="395" y="128" width="50" height="8" fill="#F5A623" rx="1" />
            <line x1="395" y1="132" x2="390" y2="132" stroke="#888" strokeWidth="0.5" />
            <line x1="445" y1="132" x2="450" y2="132" stroke="#888" strokeWidth="0.5" />
          </g>
        </g>
      </g>

      {/* ===== WORKERS ===== */}
      {/* Worker 1 — hammering (near building) */}
      <g id="worker1" transform="translate(170, 345)">
        {/* Hard hat */}
        <ellipse cx="10" cy="-28" rx="8" ry="5" fill="#F5A623" />
        {/* Head */}
        <rect x="4" y="-23" width="12" height="10" fill="#D2A679" rx="3" />
        {/* Body */}
        <rect x="2" y="-13" width="16" height="18" fill="#F5A623" rx="2" />
        {/* Safety vest stripe */}
        <rect x="2" y="-8" width="16" height="2" fill="#ccc" opacity="0.6" />
        {/* Legs */}
        <rect x="3" y="5" width="5" height="14" fill="#3d444d" rx="1" />
        <rect x="11" y="5" width="5" height="14" fill="#3d444d" rx="1" />
        {/* Hammer arm (animated) */}
        <g id="worker1-arm" style={{ transformOrigin: '16px -10px' }}>
          <rect x="14" y="-12" width="4" height="14" fill="#D2A679" rx="2" />
          {/* Hammer */}
          <rect x="13" y="1" width="6" height="3" fill="#666" rx="1" />
          <rect x="15" y="-2" width="2" height="5" fill="#888" />
        </g>
        {/* Boots */}
        <rect x="1" y="17" width="7" height="3" fill="#333" rx="1" />
        <rect x="11" y="17" width="7" height="3" fill="#333" rx="1" />
      </g>

      {/* Worker 2 — welding (right side of building) */}
      <g id="worker2" transform="translate(420, 348)">
        {/* Hard hat */}
        <ellipse cx="8" cy="-26" rx="7" ry="4.5" fill="#F5A623" />
        {/* Head with welding mask */}
        <rect x="2" y="-22" width="12" height="9" fill="#555" rx="2" />
        <rect x="12" y="-20" width="3" height="5" fill="#333" rx="1" />
        {/* Body */}
        <rect x="0" y="-13" width="16" height="16" fill="#6e7681" rx="2" />
        <rect x="0" y="-8" width="16" height="2" fill="#F5A623" opacity="0.6" />
        {/* Legs */}
        <rect x="1" y="3" width="5" height="12" fill="#3d444d" rx="1" />
        <rect x="9" y="3" width="5" height="12" fill="#3d444d" rx="1" />
        {/* Welding arm */}
        <rect x="14" y="-10" width="10" height="3" fill="#D2A679" rx="1" />
        {/* Welding glow */}
        <circle id="weld-glow" cx="25" cy="-8" r="8" fill="#F5A623" opacity="0.4" filter="url(#glow)" />
        {/* Sparks */}
        {Array.from({ length: 6 }, (_, i) => (
          <circle
            key={i}
            className="weld-spark"
            cx="25"
            cy="-8"
            r={1 + Math.random()}
            fill="#F5A623"
            opacity="0"
          />
        ))}
        {/* Boots */}
        <rect x="0" y="14" width="6" height="3" fill="#333" rx="1" />
        <rect x="9" y="14" width="6" height="3" fill="#333" rx="1" />
      </g>

      {/* Worker 3 — carrying material (walking) */}
      <g id="worker3" transform="translate(500, 355)">
        {/* Hard hat */}
        <ellipse cx="8" cy="-24" rx="7" ry="4.5" fill="#F5A623" />
        {/* Head */}
        <rect x="2" y="-20" width="12" height="9" fill="#D2A679" rx="3" />
        {/* Body */}
        <rect x="0" y="-11" width="16" height="15" fill="#F5A623" rx="2" />
        <rect x="0" y="-6" width="16" height="2" fill="#ccc" opacity="0.5" />
        {/* Legs */}
        <rect x="1" y="4" width="5" height="12" fill="#3d444d" rx="1" />
        <rect x="9" y="4" width="5" height="12" fill="#3d444d" rx="1" />
        {/* Carrying plank on shoulder */}
        <rect x="-10" y="-14" width="36" height="3" fill="#8B6914" rx="1" opacity="0.8" />
        {/* Arms */}
        <rect x="-5" y="-12" width="3" height="8" fill="#D2A679" rx="1" />
        <rect x="14" y="-12" width="3" height="8" fill="#D2A679" rx="1" />
        {/* Boots */}
        <rect x="0" y="15" width="6" height="3" fill="#333" rx="1" />
        <rect x="9" y="15" width="6" height="3" fill="#333" rx="1" />
      </g>

      {/* Worker 4 — operating (near crane base) */}
      <g transform="translate(530, 365)">
        <ellipse cx="6" cy="-18" rx="5.5" ry="3.5" fill="#F5A623" />
        <rect x="1" y="-14" width="10" height="7" fill="#D2A679" rx="2" />
        <rect x="0" y="-7" width="12" height="12" fill="#4a5568" rx="2" />
        <rect x="1" y="5" width="4" height="10" fill="#3d444d" rx="1" />
        <rect x="7" y="5" width="4" height="10" fill="#3d444d" rx="1" />
        <rect x="0" y="14" width="5" height="2.5" fill="#333" rx="1" />
        <rect x="7" y="14" width="5" height="2.5" fill="#333" rx="1" />
      </g>

      {/* Dust particles */}
      {[
        [180, 370], [210, 365], [350, 368], [400, 360], [450, 372], [510, 366],
      ].map(([x, y], i) => (
        <circle key={i} className="dust-particle" cx={x} cy={y} r="1.5" fill="#8B8D91" opacity="0" />
      ))}

      {/* Foreground debris/construction materials */}
      <rect x="100" y="385" width="30" height="5" fill="#484f58" rx="1" />
      <rect x="640" y="387" width="25" height="4" fill="#484f58" rx="1" />
      <circle cx="150" cy="388" r="3" fill="#3d444d" />
      <circle cx="680" cy="386" r="2.5" fill="#3d444d" />

      {/* Caution tape near building */}
      <rect x="185" y="380" width="230" height="2" fill="#F5A623" opacity="0.15" strokeDasharray="8 4" />
    </svg>
  );
};

export default ConstructionScene;
