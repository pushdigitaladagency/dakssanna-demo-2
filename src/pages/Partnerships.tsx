import { Link } from 'react-router';
import { useScrollAnimation, useStaggerReveal } from '../hooks/useScrollAnimation';

export default function Partnerships() {
  const heroRef    = useScrollAnimation({ variant: 'fade-up' });
  const globalRef  = useScrollAnimation({ variant: 'scale-up', delay: 100 });
  const cardsRef   = useStaggerReveal(160, { variant: 'fade-up', duration: 600 });
  const ecoRef     = useStaggerReveal(40, { variant: 'scale-up', duration: 400 });
  return (
    <div className="min-h-screen bg-[#071A33] pt-20">
      <div className="relative py-20 bg-[#151A21] grid-overlay-fine overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Global Alliances</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-tight">
            Partnerships &<br />Alliances
          </h1>
          <p className="text-white/50 text-base mt-4 max-w-xl">
            Strategic technology partnerships extending our materials and manufacturing capability globally.
          </p>
        </div>
      </div>

      {/* Global visual */}
      <section className="py-20 bg-[#071A33]">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* SVG world connection */}
          <div className="relative border border-[#1D6FA5]/20 bg-[#0A1929] p-10 mb-16 overflow-hidden">
            <div className="absolute inset-0 grid-overlay-fine" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center">
                <div className="font-display font-bold text-white text-xl">Tamil Nadu</div>
                <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-widest uppercase mt-1">India · Manufacturing Hub</div>
                <div className="w-3 h-3 bg-[#F5B72C] rounded-full mx-auto mt-4 animate-pulse-amber" />
              </div>

              <div className="flex-1 hidden md:flex items-center justify-center">
                <svg viewBox="0 0 400 60" className="w-full max-w-sm" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <marker id="arrowL" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6" fill="none" stroke="#F5B72C" strokeWidth="1" />
                    </marker>
                    <marker id="arrowR" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                      <path d="M6,0 L0,3 L6,6" fill="none" stroke="#F5B72C" strokeWidth="1" />
                    </marker>
                  </defs>
                  <path d="M20,30 C100,5 300,5 380,30" stroke="#1D6FA5" strokeWidth="0.8" fill="none" strokeDasharray="6 4" />
                  <circle cx="20" cy="30" r="3" fill="#F5B72C" />
                  <circle cx="380" cy="30" r="3" fill="#F5B72C" />
                  <text x="200" y="20" textAnchor="middle" fill="#F5B72C" fontSize="8" fontFamily="monospace" letterSpacing="2">TECHNOLOGY PARTNERSHIP</text>
                </svg>
              </div>

              <div className="flex flex-col gap-6 items-center md:items-end">
                <div className="text-center md:text-right">
                  <div className="font-display font-bold text-white text-lg">Denmark</div>
                  <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mt-0.5">RUBTEC</div>
                </div>
                <div className="text-center md:text-right">
                  <div className="font-display font-bold text-white text-lg">Canada</div>
                  <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mt-0.5">VCI Composites</div>
                </div>
              </div>
            </div>
          </div>

          {/* Partner detail cards */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  partner: 'RUBTEC',
                  country: 'Denmark',
                  flag: 'DK',
                  domain: 'Aluminium Wheels',
                  focus: 'Advanced aluminium wheel manufacturing for rail and transportation applications.',
                  context: 'RUBTEC, Denmark is a strategic technology partner bringing specialised capability in aluminium wheel manufacturing. This partnership extends the group\'s materials expertise and supports delivery of high-performance aluminium components for rail and transportation programmes.',
                  tags: ['Aluminium', 'Rail', 'Transportation', 'Wheels'],
                },
                {
                  partner: 'VCI Composites',
                  country: 'Canada',
                  flag: 'CA',
                  domain: 'Armour Grade Composite Panels',
                  focus: 'Armour-grade composite panel technology for defence platform protection systems.',
                  context: 'VCI Composites, Canada is a global leader in armour-grade composite panel technology. This strategic partnership enables Sree Dakssnaa to integrate advanced protection materials into defence platform programmes, supporting Indian Army and DRDO requirements for lightweight armour solutions.',
                  tags: ['Composites', 'Armour', 'Defence', 'CFRP', 'Panels'],
                },
              ].map(p => (
                <div key={p.partner} className="border border-[#1D6FA5]/25 bg-[#0A1929] p-10 border-amber-accent">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="font-display font-bold text-white text-3xl">{p.partner}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-mono-custom text-[#F5B72C] text-[10px] tracking-widest uppercase">{p.country}</span>
                        <span className="text-[#1D6FA5]/60">·</span>
                        <span className="font-mono-custom text-white/40 text-[10px] tracking-wider">{p.domain}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 border border-[#1D6FA5]/30 flex items-center justify-center bg-[#071A33]">
                      <span className="font-mono-custom text-[#F5B72C] text-xs">{p.flag}</span>
                    </div>
                  </div>

                  <p className="text-white/60 text-base font-display font-medium mb-5">{p.focus}</p>
                  <p className="text-white/45 text-sm leading-relaxed mb-6">{p.context}</p>

                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="font-mono-custom text-[9px] text-white/40 border border-[#1D6FA5]/20 px-2 py-1 tracking-wider uppercase">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Orders in Hand context */}
      <section className="py-20 bg-[#151A21]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Industry Ecosystem</div>
          <h2 className="font-display font-bold text-3xl text-white mb-10">Industry Ecosystem</h2>
          <p className="text-white/55 text-base mb-8 max-w-2xl">
            Sree Dakssnaa operates within India's premier aerospace and defence ecosystem, working alongside
            and in support of the country's leading defence research, manufacturing and procurement organisations.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['HAL · Bangalore', 'ADA · Bangalore', 'MCSRDC · Bangalore', 'MSC / DRDO · Pune', 'ASL / DRDO · Hyderabad', 'HVF · Chennai'].map(org => (
              <div key={org} className="border border-[#1D6FA5]/20 bg-[#071A33] p-4 text-center">
                <div className="font-mono-custom text-white/60 text-[10px] tracking-wider">{org}</div>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs font-mono-custom mt-4 tracking-wider">
            * Organisation names reflect the broader industry ecosystem and expected OEM engagements. Specific contractual relationships available on enquiry.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#0B4F8A]">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">Interested in a partnership?</h3>
            <p className="text-white/60 text-sm mt-1">Reach out to discuss strategic collaboration opportunities.</p>
          </div>
          <Link to="/contact" className="bg-[#F5B72C] text-[#071A33] font-display font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber-300 transition-colors flex-shrink-0">
            Start A Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
