'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'V jakých lokalitách pracujete?',
    a: 'Primárně působíme v Brně a Jihomoravském kraji — Brno-město, Brno-venkov, Blansko, Vyškov. Na větší projekty vyjíždíme po celé České republice.',
  },
  {
    q: 'Jak dlouho trvá standardní rekonstrukce?',
    a: 'Záleží na rozsahu. Menší práce (oprava omítky, příčka) zvládáme za 1–5 dní. Rozsáhlejší rekonstrukce trvají typicky 2–8 týdnů. Vždy vám sdělíme reálný termín předem.',
  },
  {
    q: 'Nabízíte záruky na provedené práce?',
    a: 'Ano. Na veškeré zednické práce poskytujeme záruky 5 let v souladu s občanským zákoníkem. Na materiál platí záruky výrobce.',
  },
  {
    q: 'Jak probíhá nezávazná konzultace a nacenění?',
    a: 'Po vyplnění poptávkového formuláře vás kontaktuji do 24 hodin. Domluvíme prohlídku na místě (zdarma), kde posoudím rozsah prací a do týdne připravím detailní cenovou nabídku — bez závazků.',
  },
  {
    q: 'Pracujete i na historických a chráněných objektech?',
    a: 'Ano, máme zkušenosti s rekonstrukcemi historických budov a respektujeme požadavky Národního památkového ústavu. Rádi poradíme, jaké materiály a postupy jsou pro daný objekt vhodné.',
  },
  {
    q: 'Je možné platit po etapách?',
    a: 'Ano. Na platebních podmínkách se vždy domluvíme individuálně. Standardně pracujeme se zálohou 30 % před zahájením a závěrečnou platbou po předání hotového díla.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        y: 40,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left label */}
          <div className="lg:col-span-1">
            <p className="text-xs uppercase tracking-[0.18em] text-muted font-body mb-4">
              Časté dotazy
            </p>
            <h2 className="text-h2 font-display text-ink mb-6">FAQ</h2>
            <p className="text-sm text-muted font-body leading-relaxed">
              Nenašli jste odpověď? Napište nebo zavolejte — rádi poradíme.
            </p>
            <a
              href="#kontakt"
              className="inline-block mt-6 text-sm text-accent font-body border-b border-accent/40 hover:border-accent transition-colors duration-200 pb-0.5"
            >
              Napsat dotaz ↗
            </a>
          </div>

          {/* Right accordion */}
          <div className="lg:col-span-2">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item border-t border-muted/15 last:border-b">
                <button
                  className="w-full flex items-center justify-between gap-4 py-6 text-left font-body"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-sm md:text-base text-ink pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 text-muted">
                    {open === i ? (
                      <Minus size={16} className="text-accent" />
                    ) : (
                      <Plus size={16} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-sm text-muted font-body leading-relaxed pb-6 pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
