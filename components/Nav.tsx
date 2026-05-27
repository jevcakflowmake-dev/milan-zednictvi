'use client';
import { useEffect, useState } from 'react';
import { MagneticButton } from './MagneticButton';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Služby', href: '#sluzby' },
  { label: 'O mně', href: '#o-mne' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Reference', href: '#reference' },
  { label: 'FAQ', href: '#faq' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg/95 backdrop-blur-md border-b border-muted/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          className="font-display font-semibold text-ink text-xl tracking-tight"
        >
          Milan<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted hover:text-ink transition-colors duration-300 relative group font-body"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <MagneticButton
          href="#kontakt"
          className="hidden md:inline-flex items-center gap-2 bg-accent text-bg px-6 py-2.5 text-sm font-body font-medium hover:bg-ink hover:text-bg transition-colors duration-300"
        >
          Poptat práci
        </MagneticButton>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-ink p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-bg/98 backdrop-blur-sm border-t border-muted/20 px-6 py-8 flex flex-col gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg text-ink font-body"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="inline-block bg-accent text-bg px-6 py-3 text-sm font-body font-medium text-center"
            onClick={() => setOpen(false)}
          >
            Poptat práci
          </a>
        </div>
      )}
    </header>
  );
}
