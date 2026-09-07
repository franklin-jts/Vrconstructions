import React from 'react';

interface Props {
  progress: number; // 0 to 1
}

const FLOORS = 10;

const ConstructionBuildSection: React.FC<Props> = ({ progress }) => {
  const visibleFloors = Math.floor(progress * FLOORS);
  const craneHeight = 30 + progress * 330;
  const jibWidth = Math.min(progress * 250, 250);
  const counterJibWidth = Math.min(progress * 80, 80);
  const cableHeight = Math.min(progress * 120, 120);
  const showCrane = progress > 0.05;
  const showMaterials = progress > 0.02;
  const showWorker1 = progress > 0.15;
  const showWorker2 = progress > 0.35;
  const showSparks = progress > 0.35 && progress < 0.9;
  const showBuilding = progress > 0.08;

  const buildingHeight = visibleFloors * 36;

  return (
    <section className="construction-animation-section">
      <div className="container">
        <div className="section-header gsap-reveal">
          <span className="section-tag">Watch Us Build</span>
          <h2>From Ground to Sky</h2>
          <div className="section-line" />
        </div>

        <div className="construction-scene">
          {/* Ground */}
          <div className="cs-ground" />

          {/* Materials */}
          <div className={`cs-materials ${showMaterials ? 'visible' : ''}`}>
            <div className="cs-material-block" />
            <div className="cs-material-block" style={{ height: 20 }} />
            <div className="cs-material-beam" />
            <div className="cs-material-beam" style={{ width: 30 }} />
          </div>

          {/* Crane */}
          <div className={`cs-crane ${showCrane ? 'visible' : ''}`}>
            <div className="cs-crane-mast" style={{ height: craneHeight }} />
            <div
              className="cs-crane-jib"
              style={{ width: jibWidth, top: `-${0}px` }}
            />
            <div
              className="cs-crane-counter-jib"
              style={{ width: counterJibWidth, top: `-${0}px` }}
            />
            <div
              className="cs-crane-cable"
              style={{ height: cableHeight, top: 6 }}
            />
            {cableHeight > 20 && (
              <>
                <div className="cs-crane-hook" />
                <div className="cs-crane-beam" />
              </>
            )}
            <div className="cs-crane-light" />
          </div>

          {/* Building */}
          <div
            className="cs-building"
            style={{ height: showBuilding ? buildingHeight : 0 }}
          >
            <div className="cs-building-structure">
              {Array.from({ length: FLOORS }).map((_, i) => {
                const floorIndex = FLOORS - 1 - i;
                const isVisible = floorIndex < visibleFloors;
                const isLit = i % 3 === 0;
                return (
                  <div
                    key={i}
                    className={`cs-building-floor floor-structure ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${i * 0.05}s` }}
                  >
                    {[1, 2, 3, 4].map((w) => (
                      <div key={w} className={`cs-window ${isLit && w === 2 ? 'lit' : ''}`}>
                        <div className="cs-window-glass" />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Worker 1 — left side */}
          <div
            className={`cs-worker ${showWorker1 ? 'visible' : ''}`}
            style={{ left: 80 }}
          >
            <div className="cs-worker-helmet" />
            <div className="cs-worker-head" />
            <div className="cs-worker-body" />
          </div>

          {/* Worker 2 — right side (welder) */}
          <div
            className={`cs-worker ${showWorker2 ? 'visible' : ''}`}
            style={{ right: 80 }}
          >
            <div className="cs-worker-helmet" />
            <div className="cs-worker-head" />
            <div className="cs-worker-body" />
          </div>

          {/* Sparks */}
          <div
            className={`cs-sparks ${showSparks ? 'visible' : ''}`}
            style={{ right: 90 }}
          >
            <div className="cs-spark" />
            <div className="cs-spark" />
            <div className="cs-spark" />
            <div className="cs-spark" />
          </div>
        </div>

        {/* Progress */}
        <div className="cs-progress-label">
          <span>Construction Progress: {Math.round(progress * 100)}%</span>
          <div className="cs-progress-bar-bg">
            <div className="cs-progress-bar-fill" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionBuildSection;
