'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { MagneticButton } from './MagneticButton';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(['.hero-label', '.hero-sub', '.hero-ctas', '.hero-scroll'], {
        opacity: 0,
        y: 24,
      });
      gsap.set('.hero-line', { y: '115%' });
      if (imageWrapRef.current) {
        gsap.set(imageWrapRef.current, { clipPath: 'inset(0 100% 0 0)' });
      }

      // Animate in sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });

      tl.to('.hero-label', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero-line', { y: '0%', duration: 1.0, stagger: 0.1 }, '-=0.3')
        .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('.hero-scroll', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .to(
          imageWrapRef.current,
          { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power2.inOut' },
          '-=1.0'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 65% 55% at 15% 35%, rgba(212,107,47,0.13), transparent 65%),
          radial-gradient(ellipse 50% 40% at 85% 65%, rgba(240,235,224,0.03), transparent 65%),
          #1A1714
        `,
      }}
    >
      {/* Decorative horizontal line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-muted/8 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Left — copy */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <p className="hero-label mb-6 text-xs uppercase tracking-[0.18em] text-muted font-body">
              Milan Zednictví s.r.o. — Brno &amp; okolí
            </p>

            <h1 className="text-hero font-display text-ink mb-8">
              <span className="block overflow-hidden">
                <span className="hero-line inline-block">Zdivo,</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line inline-block">na které</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line inline-block text-accent">spoléháte.</span>
              </span>
            </h1>

            <p className="hero-sub text-lead text-muted max-w-md mb-10 font-body">
              Profesionální zednické práce s 15letou praxí. Zdění, omítky,
              rekonstrukce a betonářské práce — vždy v termínu a za dohodnutou cenu.
            </p>

            <div className="hero-ctas flex flex-wrap gap-4">
              <MagneticButton
                href="#kontakt"
                className="inline-flex items-center gap-2 bg-accent text-bg px-8 py-4 font-body font-medium text-sm hover:bg-ink hover:text-bg transition-colors duration-300"
              >
                Poptat práci ↗
              </MagneticButton>
              <MagneticButton
                href="#galerie"
                className="inline-flex items-center gap-2 border border-muted/40 text-muted px-8 py-4 font-body font-medium text-sm hover:border-ink hover:text-ink transition-colors duration-300"
              >
                Naše práce ↓
              </MagneticButton>
            </div>

            <div className="hero-scroll mt-16 hidden lg:flex items-center gap-3 text-muted/40 text-xs uppercase tracking-[0.15em] font-body">
              <ArrowDown size={13} className="animate-bounce" />
              <span>Skrolujte dolů</span>
            </div>
          </div>

          {/* Right — image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none lg:w-[85%]">
              {/* Glow behind image */}
              <div className="absolute -inset-8 rounded-none bg-accent/8 blur-3xl" />

              <div
                ref={imageWrapRef}
                className="relative aspect-[4/5] overflow-hidden"
                style={{ clipPath: 'inset(0 0 0 0)' }}
              >
                <Image
                  src="https://picsum.photos/seed/mason1/600/750"
                  alt="Zednické práce — Milan Zednictví"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute bottom-6 left-6 border-l-2 border-accent bg-bg/80 backdrop-blur-sm px-4 py-3">
                  <p className="text-[10px] text-muted uppercase tracking-[0.12em] font-body mb-0.5">
                    Est. 2009
                  </p>
                  <p className="text-sm text-ink font-display font-medium">
                    Brno &amp; okolí
                  </p>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-accent/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
