'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

const images = [
  { seed: 'brick11', label: 'Zdění příček', aspect: 'aspect-[4/3]' },
  { seed: 'brick22', label: 'Omítky', aspect: 'aspect-square' },
  { seed: 'brick33', label: 'Rekonstrukce fasády', aspect: 'aspect-[4/3]' },
  { seed: 'brick44', label: 'Betonové základy', aspect: 'aspect-square' },
  { seed: 'brick55', label: 'Nosné zdivo', aspect: 'aspect-[4/3]' },
  { seed: 'brick66', label: 'Zateplení ETICS', aspect: 'aspect-square' },
];

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        y: 60,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="galerie" className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted font-body mb-4">
              Naše práce
            </p>
            <h2 className="text-h2 font-display text-ink">Galerie</h2>
          </div>
          <p className="text-sm text-muted font-body max-w-xs md:text-right">
            Ukázky dokončených projektů. Fotografie průběžně doplňujeme.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img.seed}
              className={`gallery-item group relative ${img.aspect} overflow-hidden`}
            >
              <Image
                src={`https://picsum.photos/seed/${img.seed}/600/450`}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/50 transition-colors duration-500" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <div className="border-l-2 border-accent pl-3">
                  <p className="text-xs text-muted/70 uppercase tracking-[0.12em] font-body mb-0.5">
                    Projekt
                  </p>
                  <p className="text-sm text-ink font-display">{img.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
