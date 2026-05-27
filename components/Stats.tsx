'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const stats = [
  { value: 15, suffix: '+', label: 'Let praxe', desc: 'v oboru zednictví' },
  { value: 250, suffix: '+', label: 'Dokončených projektů', desc: 'v Brně a okolí' },
  { value: 98, suffix: '%', label: 'Spokojených klientů', desc: 'podle zpětné vazby' },
];

function CounterUp({
  to,
  suffix,
  duration = 2.2,
}: {
  to: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: to,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        once: true,
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent =
            Math.floor(obj.val).toLocaleString('cs-CZ') + suffix;
        }
      },
    });
  }, [to, suffix, duration]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,107,47,0.07), transparent 70%),
          #1A1714
        `,
      }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-muted/25 to-transparent" />
      {/* Bottom border */}
      <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-muted/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-xs uppercase tracking-[0.18em] text-muted font-body text-center mb-16">
          Čísla mluví za vše
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-muted/15">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-item flex flex-col items-center text-center py-12 md:py-0 md:px-12"
            >
              <div className="font-display text-ink leading-none mb-3"
                style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}
              >
                <CounterUp to={s.value} suffix={s.suffix} />
              </div>
              <p className="text-base font-display text-ink/80 mb-1">{s.label}</p>
              <p className="text-xs text-muted font-body uppercase tracking-[0.12em]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
