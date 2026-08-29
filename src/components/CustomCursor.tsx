import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .btn, [role="tab"], .service-card, .gal-item')) {
        setHovering(true);
      }
    };

    const handleOut = () => setHovering(false);

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovering ? 'cursor-hover' : ''}`}
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${hovering ? 'dot-hover' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
