import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        {/* Animated hard hat icon */}
        <div className="loading-icon">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <ellipse cx="40" cy="50" rx="30" ry="8" fill="#F5A623" />
            <path d="M15 50 Q15 25 40 20 Q65 25 65 50" fill="#F5A623" />
            <rect x="38" y="15" width="4" height="8" fill="#D4912A" rx="2" />
            <rect x="10" y="48" width="60" height="4" fill="#D4912A" rx="2" />
          </svg>
        </div>

        <div className="loading-text">
          <span className="loading-brand">VR</span>
          <span className="loading-brand-accent">CONSTRUCTION</span>
        </div>

        {/* Construction progress bar */}
        <div className="loading-bar-container">
          <div className="loading-bar-track">
            <div
              className="loading-bar-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
            <div
              className="loading-bar-truck"
              style={{ left: `${Math.min(progress, 97)}%` }}
            >
              <svg viewBox="0 0 30 16" width="30" height="16">
                <rect x="0" y="4" width="18" height="10" fill="#F5A623" rx="2" />
                <rect x="18" y="6" width="10" height="8" fill="#D4912A" rx="1" />
                <circle cx="7" cy="15" r="2.5" fill="#333" />
                <circle cx="23" cy="15" r="2.5" fill="#333" />
                <rect x="26" y="8" width="3" height="4" fill="#666" rx="1" />
              </svg>
            </div>
          </div>
          <span className="loading-percent">{Math.min(Math.round(progress), 100)}%</span>
        </div>

        <p className="loading-subtitle">Building your experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
