import React, { useState, useEffect } from 'react';
import target3 from './assets/Target Reticle/target_3.png';
import target10 from './assets/Target Reticle/target_10.png';

export function TrackingMissiles() {
  const [targets, setTargets] = useState([
    { id: 1, x: 20, y: 30, active: true },
    { id: 2, x: 80, y: 70, active: true }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTargets(prev => prev.map(t => ({
        ...t,
        x: Math.min(95, Math.max(5, t.x + (Math.random() * 20 - 10))),
        y: Math.min(95, Math.max(5, t.y + (Math.random() * 20 - 10))),
        active: Math.random() > 0.1
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tracking-missiles-layer" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9990 }}>
      {targets.map(t => (
        <div 
          key={t.id} 
          className={\missile-tracker \\} 
          style={{ left: \\%\, top: \\%\ }}
        >
          <img src={t.id === 1 ? target3 : target10} alt="" />
          <div className="tracker-info">
            <span className="coord">X:\ Y:\</span>
            <span className="status">\</span>
            <div className="tracker-more-info">
              <div>HOSTILE DETECTED</div>
              <div>DIST: \m</div>
              <div>THREAT LVL: HIGH</div>
              <div style={{ color: 'var(--sun)', marginTop: '4px' }}>[CLICK TO INTERCEPT]</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
