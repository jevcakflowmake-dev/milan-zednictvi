'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Layers, Paintbrush, Wrench, Cuboid } from 'lucide-react';

const services = [
  {
    number: '01',
    Icon: Layers,
    title: 'Zdění',
    desc: 'Zděné konstrukce z cihel, tvárnic i pórobetonu. Příčky, nosné stěny, překlady a komíny — vše dle projektové dokumentace.',
  },
  {
    number: '02',
    Icon: Paintbrush,
    title: 'Omítky & fasády',
    desc: 'Vnitřní i vnější omítky, štukatérské práce, zateplovací systémy ETICS a fasádní povrchové úpravy.',
  },
  {
    number: '03',
    Icon: Wrench,
    title: 'Rekonstrukce',
    desc: 'Přestavby, bourací práce a renovace starších objektů. Pracujeme s respektem k charakteru budovy i k požadavkům NPÚ.',
  },
  {
    number: '04',
    Icon: Cuboid,
    title: 'Betonářské práce',
    desc: 'Základy, podkladní betony, věnce a monolitické stropy. Bednění, výztuž i betonáž vlastními silami.',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.13,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sluzby" className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-muted/15 pb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted font-body mb-4">
              Co umíme
            </p>
            <h2 className="text-h2 font-display text-ink">Naše služby</h2>
          </div>
          <p className="text-lead text-muted max-w-sm font-body md:text-right">
            Od malých oprav po komplexní novostavby — pokrýváme celé spektrum zednických prací.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {services.map((s, i) => (
            <div
              key={s.number}
              className={`service-card group p-8 border-t border-muted/15 flex flex-col gap-6 hover:bg-muted/5 transition-colors duration-300 ${
                i < 3 ? 'lg:border-r lg:border-r-muted/15' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl font-display text-muted/30 leading-none select-none">
                  {s.number}
                </span>
                <s.Icon
                  size={20}
                  className="text-accent mt-1 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-h3 font-display text-ink mb-3">{s.title}</h3>
                <p className="text-sm text-muted font-body leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
