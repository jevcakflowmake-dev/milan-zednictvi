'use client';
import { useRef, useEffect, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
}

export function MagneticButton({ children, className = '', onClick, href, type = 'button' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      const radius = 80;

      if (dist < radius) {
        const f = (radius - dist) / radius;
        el.style.transform = `translate(${x * f * 0.35}px, ${y * f * 0.35}px)`;
      } else {
        el.style.transform = 'translate(0, 0)';
      }
    };

    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const cls = `inline-block transition-transform duration-200 ease-out ${className}`;

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        style={{ willChange: 'transform' }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={cls}
      style={{ willChange: 'transform' }}
    >
      {children}
    </button>
  );
}
