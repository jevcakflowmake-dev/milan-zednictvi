'use client';
import { useEffect, useRef } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouse = { x: 0, y: 0 };
    const follower = { x: 0, y: 0 };
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      follower.x += (mouse.x - follower.x) * 0.12;
      follower.y += (mouse.y - follower.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 6}px, ${mouse.y - 6}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${follower.x - 20}px, ${follower.y - 20}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-3 w-3 rounded-full bg-accent"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997] h-10 w-10 rounded-full border border-accent/50"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
