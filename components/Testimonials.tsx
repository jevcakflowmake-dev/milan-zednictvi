'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Milan odvedl skvělou práci při rekonstrukci naší koupelny. Precizní, spolehlivý a vždy přesně na čas. Výsledek předčil naše očekávání — jednoznačně doporučuji.',
    author: 'Jan Kovář',
    location: 'Brno-Lesná',
    rating: 5,
  },
  {
    quote:
      'Rekonstrukci fasády dokončil v termínu a za dohodnutou cenu. Komunikoval otevřeně po celou dobu projektu a vždy našel řešení, když se objevil problém.',
    author: 'Petra Marková',
    location: 'Brno-Slatina',
    rating: 5,
  },
  {
    quote:
      'S Milanem spolupracujeme opakovaně na různých developerských projektech. Jeho práce je konzistentně na nejvyšší úrovni a termíny vždy dodržuje.',
    author: 'Stavební firma Novák s.r.o.',
    location: 'Brno',
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        y: 50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reference"
      className="py-28 md:py-36"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 80% 50%, rgba(212,107,47,0.06), transparent 70%),
          #1A1714
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.18em] text-muted font-body mb-4">
            Co říkají klienti
          </p>
          <h2 className="text-h2 font-display text-ink">Reference</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="testimonial-card border border-muted/15 p-8 flex flex-col justify-between hover:border-muted/35 transition-colors duration-300"
            >
              {/* Stars */}
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote mark */}
                <p className="font-display text-6xl text-accent/20 leading-none mb-2 select-none">
                  "
                </p>

                <p className="text-sm text-muted font-body leading-relaxed mb-6">
                  {t.quote}
                </p>
              </div>

              {/* Author */}
              <div className="border-t border-muted/15 pt-5">
                <p className="text-sm font-display text-ink">{t.author}</p>
                <p className="text-xs text-muted font-body mt-1">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
