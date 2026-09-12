import { useState, useEffect, useRef } from 'react';
import { LogoMark } from './Logo';

const links = [
  { id: 'hero',          label: 'Home' },
  { id: 'about',         label: 'About' },
  { id: 'capabilities',  label: 'Capabilities' },
  { id: 'industries',    label: 'Industries' },
  { id: 'facilities',    label: 'Facilities' },
  { id: 'projects',      label: 'Projects' },
  { id: 'partnerships',  label: 'Partnerships' },
  { id: 'quality',       label: 'Quality & R&D' },
  { id: 'contact',       label: 'Contact' },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [activeId, setActiveId]   = useState('hero');
  const progressRef               = useRef<HTMLDivElement>(null);

  /* scroll progress + active section spy */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      if (progressRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct   = total > 0 ? window.scrollY / total : 0;
        progressRef.current.style.transform = `scaleX(${pct})`;
      }

      /* which section is in view? */
      const midY = window.scrollY + window.innerHeight * 0.35;
      let current = 'hero';
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= midY) current = l.id;
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleLink = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollTo(id), open ? 350 : 0);
  };

  return (
    <>
      {/* scroll progress bar */}
      <div ref={progressRef} className="scroll-progress-bar" />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/98 backdrop-blur-md border-b border-[#DDE3F8] py-2 shadow-sm' : 'bg-white/95 backdrop-blur-sm border-b border-[#E2E8F4] py-3'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => handleLink('hero')} className="group transition-transform duration-300 hover:scale-[1.03]">
            <LogoMark height={scrolled ? 48 : 58} />
          </button>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-5">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => handleLink(l.id)}
                className={`nav-link font-display text-[10px] font-medium tracking-widest uppercase transition-colors duration-200 pb-0.5 ${
                  activeId === l.id
                    ? 'text-[#CC2B2B] active font-semibold'
                    : 'text-[#3D4F6B] hover:text-[#1C2B8C]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLink('contact')}
              className="hidden lg:inline-flex items-center font-display font-bold text-[10px] tracking-widest uppercase px-5 py-2.5 hover:scale-105 transition-all duration-200 bg-[#CC2B2B] text-white hover:bg-[#A82020] rounded"
            >
              Enquire With Us
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="xl:hidden flex flex-col gap-1.5 p-2"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span className={`block h-px transition-all duration-400 origin-center bg-[#1C2B8C] ${open ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
              <span className={`block h-px transition-all duration-200 bg-[#1C2B8C] ${open ? 'w-0 opacity-0' : 'w-5'}`} />
              <span className={`block h-px transition-all duration-400 origin-center bg-[#1C2B8C] ${open ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-4'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <div className={`fixed inset-0 z-40 xl:hidden transition-all duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-white/98 backdrop-blur-xl blueprint-grid">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
            <LogoMark height={300} />
          </div>
          <div className="relative flex flex-col items-center justify-center h-full gap-4 pt-20">
            {links.map((l, i) => (
              <button
                key={l.id}
                onClick={() => handleLink(l.id)}
                className={`font-display text-2xl font-semibold tracking-widest uppercase transition-all duration-300 ${
                  activeId === l.id ? 'text-[#CC2B2B]' : 'text-[#3D4F6B] hover:text-[#1C2B8C]'
                } ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: open ? `${i * 45 + 80}ms` : '0ms' }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleLink('contact')}
              className={`mt-4 bg-[#CC2B2B] text-white font-display font-bold text-sm tracking-widest uppercase px-10 py-4 rounded hover:bg-[#A82020] transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: open ? `${links.length * 45 + 120}ms` : '0ms' }}
            >
              Enquire With Us
            </button>
            <a
              href="tel:+919444431234"
              className={`font-mono-custom text-[#7B8C9E] text-xs tracking-widest transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: open ? `${links.length * 45 + 200}ms` : '0ms' }}
            >
              +91 94444 31234
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
