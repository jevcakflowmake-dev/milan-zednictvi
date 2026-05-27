'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

const schema = z.object({
  name: z.string().min(2, 'Zadejte jméno (min. 2 znaky)'),
  email: z.string().email('Zadejte platný e-mail'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Zpráva musí mít alespoň 10 znaků'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { Icon: Phone, label: 'Telefon', value: '+420 777 123 456', href: 'tel:+420777123456' },
  { Icon: Mail, label: 'E-mail', value: 'milan@zednictvi-brno.cz', href: 'mailto:milan@zednictvi-brno.cz' },
  { Icon: MapPin, label: 'Oblast působení', value: 'Brno & Jihomoravský kraj', href: null },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-el', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      className="py-28 md:py-36 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 20% 50%, rgba(212,107,47,0.09), transparent 65%),
          #1A1714
        `,
      }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-muted/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — info */}
          <div>
            <p className="contact-el text-xs uppercase tracking-[0.18em] text-muted font-body mb-5">
              Nezávazná poptávka
            </p>
            <h2 className="contact-el text-h2 font-display text-ink mb-7">
              Napište mi
            </h2>
            <p className="contact-el text-lead text-muted font-body mb-12 max-w-sm">
              Popište projekt, přiložte fotku nebo rozměry — do 24 hodin se ozveme
              a domluvíme prohlídku zdarma.
            </p>

            <ul className="space-y-6">
              {contactInfo.map(({ Icon, label, value, href }) => (
                <li key={label} className="contact-el flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 border border-muted/20 flex items-center justify-center">
                    <Icon size={15} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-body uppercase tracking-[0.1em] mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-ink font-body hover:text-accent transition-colors duration-200"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-ink font-body">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="contact-el">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-4 border border-muted/15 p-12">
                <CheckCircle size={40} className="text-accent" />
                <h3 className="text-h3 font-display text-ink">Odesláno!</h3>
                <p className="text-sm text-muted font-body">
                  Děkujeme. Ozvu se do 24 hodin.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-xs text-muted font-body border-b border-muted/30 hover:text-ink hover:border-ink transition-colors pb-0.5"
                >
                  Odeslat další poptávku
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-xs text-muted font-body uppercase tracking-[0.12em] mb-2">
                    Jméno *
                  </label>
                  <input
                    {...register('name')}
                    placeholder="Jan Novák"
                    className="w-full bg-transparent border border-muted/25 px-4 py-3.5 text-sm text-ink font-body placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-200"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-accent font-body">{errors.name.message}</p>
                  )}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-muted font-body uppercase tracking-[0.12em] mb-2">
                      E-mail *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="jan@email.cz"
                      className="w-full bg-transparent border border-muted/25 px-4 py-3.5 text-sm text-ink font-body placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-200"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-accent font-body">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-muted font-body uppercase tracking-[0.12em] mb-2">
                      Telefon
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+420 777 000 000"
                      className="w-full bg-transparent border border-muted/25 px-4 py-3.5 text-sm text-ink font-body placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-muted font-body uppercase tracking-[0.12em] mb-2">
                    Popis projektu *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Stručně popište, co potřebujete — typ prací, lokalita, přibližný rozsah..."
                    className="w-full bg-transparent border border-muted/25 px-4 py-3.5 text-sm text-ink font-body placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-accent font-body">{errors.message.message}</p>
                  )}
                </div>

                {/* Error state */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-xs text-accent font-body">
                    <AlertCircle size={13} />
                    Nepodařilo se odeslat. Zkuste to prosím znovu.
                  </div>
                )}

                <MagneticButton
                  type="submit"
                  className={`w-full py-4 text-sm font-body font-medium text-center transition-colors duration-300 ${
                    status === 'loading'
                      ? 'bg-muted/30 text-muted cursor-not-allowed'
                      : 'bg-accent text-bg hover:bg-ink hover:text-bg'
                  }`}
                >
                  {status === 'loading' ? 'Odesílám...' : 'Odeslat poptávku'}
                </MagneticButton>

                <p className="text-xs text-muted/50 font-body">
                  * Povinné pole. Data nejsou sdílena třetím stranám.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
