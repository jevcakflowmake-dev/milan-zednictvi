'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const highlights = [
  '15 let praxe v oboru',
  'Záruky 5 let na všechny práce',
  'Vždy pevná cena bez překvapení',
  'Komunikace po celou dobu projektu',
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip reveal
      if (imgRef.current) {
        gsap.from(imgRef.current, {
          scrollTrigger: { trigger: imgRef.current, start: 'top 80%' },
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.3,
          ease: 'power2.inOut',
        });
      }

      // Text elements
      gsap.from('.about-text-el', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="o-mne" className="py-28 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image column */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Decorative frame */}
            <div className="absolute -top-6 -left-6 w-full h-full border border-accent/15 hidden lg:block" />

            <div
              ref={imgRef}
              className="relative w-full max-w-sm aspect-[3/4] overflow-hidden"
              style={{ clipPath: 'inset(0 0 0 0)' }}
            >
              <Image
                src="https://picsum.photos/seed/worker22/480/640"
                alt="Milan — majitel firmy"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
            </div>

            {/* Year badge */}
            <div className="absolute -bottom-6 -right-4 lg:right-0 bg-accent text-bg px-5 py-4 hidden sm:block">
              <p className="font-display text-3xl font-semibold leading-none">15+</p>
              <p className="text-xs font-body mt-1 opacity-80">let praxe</p>
            </div>
          </div>

          {/* Text column */}
          <div>
            <p className="about-text-el text-xs uppercase tracking-[0.18em] text-muted font-body mb-5">
              O mně
            </p>
            <h2 className="about-text-el text-h2 font-display text-ink mb-7">
              Zednictví je<br />moje řemeslo
            </h2>
            <p className="about-text-el text-lead text-muted font-body mb-5">
              Jmenuji se Milan Novák a s kladívkem v ruce trávím každý pracovní den od roku 2009.
              Vyučil jsem se v Brně a od té doby realizuji projekty všech velikostí — od opravy
              prasklé omítky až po novostavby rodinných domů.
            </p>
            <p className="about-text-el text-sm text-muted/80 font-body leading-relaxed mb-10">
              Věřím v poctivou práci a přímou komunikaci. Každý projekt beru jako svůj vlastní —
              přijdu, podívám se, poradím a odvedu práci, za kterou se nestydím. Moje reference
              mluví za mě.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-10">
              {highlights.map((h) => (
                <li key={h} className="about-text-el flex items-center gap-3 text-sm text-muted font-body">
                  <CheckCircle size={15} className="text-accent flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <a
              href="#kontakt"
              className="about-text-el inline-block border border-accent text-accent px-8 py-3.5 text-sm font-body font-medium hover:bg-accent hover:text-bg transition-colors duration-300"
            >
              Napište mi ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
