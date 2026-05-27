const links = [
  { label: 'Služby', href: '#sluzby' },
  { label: 'O mně', href: '#o-mne' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Reference', href: '#reference' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
];

export function Footer() {
  return (
    <footer className="border-t border-muted/15 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <a href="#" className="font-display text-2xl font-semibold text-ink tracking-tight mb-4 inline-block">
              Milan<span className="text-accent">.</span>
            </a>
            <p className="text-sm text-muted font-body leading-relaxed max-w-xs mt-3">
              Spolehlivé zednické práce v Brně a okolí. Zdění, omítky, rekonstrukce
              a betonáž s 15letou praxí.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted font-body mb-5">
              Navigace
            </p>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted hover:text-ink transition-colors duration-200 font-body"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted font-body mb-5">
              Kontakt
            </p>
            <ul className="space-y-3 text-sm font-body">
              <li>
                <a
                  href="tel:+420777123456"
                  className="text-muted hover:text-ink transition-colors duration-200"
                >
                  +420 777 123 456
                </a>
              </li>
              <li>
                <a
                  href="mailto:milan@zednictvi-brno.cz"
                  className="text-muted hover:text-ink transition-colors duration-200"
                >
                  milan@zednictvi-brno.cz
                </a>
              </li>
              <li className="text-muted">Brno &amp; Jihomoravský kraj</li>
              <li className="text-muted">IČO: 123 45 678</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-muted/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/50 font-body">
            © {new Date().getFullYear()} Milan Zednictví s.r.o. Všechna práva vyhrazena.
          </p>
          <p className="text-xs text-muted/40 font-body">
            Profesionální zednické práce v Brně
          </p>
        </div>
      </div>
    </footer>
  );
}
