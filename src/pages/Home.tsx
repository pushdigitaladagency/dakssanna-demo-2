import { Link } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation, useStaggerReveal, useParallax } from '../hooks/useScrollAnimation';
import { LogoMark } from '../components/Logo';

/* ── tiny hero word-reveal helper ─────────────────────── */
function HeroWord({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className="hero-word">
      <span
        className="hero-word-inner"
        style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
      >
        {children}
      </span>
    </span>
  );
}

/* ── engineering grid SVG ticker in hero ──────────────── */
function EngrLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* animated horizontal rule */}
      <line
        className="line-draw-stroke anim-in"
        x1="0" y1="200" x2="700" y2="200"
        stroke="#1D6FA5" strokeWidth="0.6" strokeDasharray="5 7" opacity="0.45"
        style={{ strokeDashoffset: 1200, transition: 'stroke-dashoffset 2s 0.3s ease' }}
      />
      <line
        className="line-draw-stroke anim-in"
        x1="0" y1="201" x2="450" y2="201"
        stroke="#F5B72C" strokeWidth="0.3" strokeDasharray="3 9" opacity="0.3"
        style={{ strokeDashoffset: 900, transition: 'stroke-dashoffset 2.4s 0.5s ease' }}
      />
      {/* vertical rule */}
      <line
        className="line-draw-stroke anim-in"
        x1="220" y1="0" x2="220" y2="900"
        stroke="#1D6FA5" strokeWidth="0.4" strokeDasharray="4 6" opacity="0.2"
        style={{ strokeDashoffset: 1800, transition: 'stroke-dashoffset 2.5s 0.2s ease' }}
      />
      {/* cross-hair nodes */}
      <circle cx="220" cy="200" r="3" fill="#F5B72C" opacity="0.7" />
      <circle cx="220" cy="200" r="60" stroke="#1D6FA5" strokeWidth="0.4" fill="none" opacity="0.2" />
      <circle cx="220" cy="200" r="100" stroke="#1D6FA5" strokeWidth="0.25" fill="none" opacity="0.12" strokeDasharray="6 8" />
      {/* far right subtle diagonal */}
      <line x1="900" y1="0" x2="1440" y2="500" stroke="#1D6FA5" strokeWidth="0.3" opacity="0.1" />
      <line x1="1100" y1="300" x2="1440" y2="700" stroke="#F5B72C" strokeWidth="0.2" opacity="0.12" />
    </svg>
  );
}

/* ── capability data ──────────────────────────────────── */
const capabilities = [
  { num: '01', title: 'Precision Machining', desc: 'CNC turning and high-performance double column machining for complex aerospace geometries.' },
  { num: '02', title: 'Composite Manufacturing', desc: 'FRP and advanced composite structures including armour-grade panels and aerospace shells.' },
  { num: '03', title: 'Assembly', desc: 'Integrated assembly of metal and non-metal turnkey defence and aerospace products.' },
  { num: '04', title: 'Coatings', desc: 'Specialist surface treatment and stealth coating applications for defence platforms.' },
  { num: '05', title: 'Fabrication', desc: 'Precision sheet metal fabrication, welding, and structural manufacturing.' },
  { num: '06', title: 'Quality & R&D', desc: 'Engineering discipline, process development, and technology research at the core of every programme.' },
  { num: '07', title: 'Advanced Manufacturing', desc: 'Laser processing, additive manufacturing, and digital fabrication for next-generation components.' },
  { num: '08', title: 'Project Management', desc: 'End-to-end programme delivery from design analysis through to final integration.' },
];

const machines = [
  { label: 'Laser Processing', spec: 'Mitsubishi ML3015SR / ML3015HV · Amada ORSUS 3015AJ' },
  { label: 'CNC Turning', spec: 'PL6050L · 1000 / 1500 / 2000 mm range' },
  { label: 'Punch Machines', spec: '165 kN · 2500×1250 mm · 900 strokes/min' },
  { label: 'Double Column Machining', spec: '4000×2100 mm table · 13t load · 22/26 kW' },
  { label: 'Additive Manufacturing', spec: 'BLT S450 · Ti / Al / Superalloy / Steel' },
  { label: 'Fabrication', spec: 'TIG / MIG welding · Amada HRB press brake' },
  { label: 'Composite Manufacturing', spec: 'FRP / CFRP · Armour-grade panel layup' },
];

const projects = [
  { title: 'Mock-up Cockpit — AMCA', industry: 'Aerospace', customer: 'ADA', img: 'https://images.unsplash.com/photo-1569154941061-e231b4aa8eda?w=600&h=400&fit=crop&auto=format' },
  { title: 'LCA AF Mk2 Cockpit Shell', industry: 'Aerospace', customer: 'ADA / HAL', img: 'https://images.unsplash.com/photo-1486611367184-6bd4b46cbc8b?w=600&h=400&fit=crop&auto=format' },
  { title: 'Jaguar Simulator Cockpit', industry: 'Simulation', customer: 'HAL', img: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=600&h=400&fit=crop&auto=format' },
  { title: 'T-90 Pre-Heater System', industry: 'Defence', customer: 'HVF Chennai', img: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=600&h=400&fit=crop&auto=format' },
  { title: 'Railway Wagon Hood Structure', industry: 'Rail', customer: 'BEML / Indian Railways', img: 'https://images.unsplash.com/photo-1474487548417-781cb6d646b3?w=600&h=400&fit=crop&auto=format' },
  { title: 'Aircraft Intake Duct', industry: 'Aerospace', customer: 'On Request', img: 'https://images.unsplash.com/photo-1544983572-34ba24a3b2a7?w=600&h=400&fit=crop&auto=format' },
];

const ecosystem = ['HAL', 'ADA', 'DRDO', 'BEML', 'ALSTOM', 'BOMBARDIER', 'RITES', 'INDIAN RAILWAYS', 'MCSRDC', 'ASL', 'HVF', 'MSC'];

export default function Home() {
  /* parallax hero bg */
  const heroBgRef = useParallax<HTMLDivElement>(0.25);

  /* section animations */
  const introRef    = useScrollAnimation({ variant: 'fade-right', duration: 700 });
  const introTxtRef = useScrollAnimation({ variant: 'fade-left', duration: 700, delay: 120 });
  const capHeadRef  = useScrollAnimation({ variant: 'fade-up' });
  const capGridRef  = useStaggerReveal<HTMLDivElement>(65, { variant: 'fade-up', duration: 550 });
  const whyHeadRef  = useScrollAnimation({ variant: 'fade-up' });
  const whyGridRef  = useStaggerReveal<HTMLDivElement>(70, { variant: 'scale-up', duration: 500 });
  const machRef     = useStaggerReveal<HTMLDivElement>(55, { variant: 'fade-up', duration: 500 });
  const projHeadRef = useScrollAnimation({ variant: 'clip-left', duration: 800 });
  const projGridRef = useStaggerReveal<HTMLDivElement>(80, { variant: 'fade-up', duration: 600 });
  const ecoRef      = useStaggerReveal<HTMLDivElement>(40, { variant: 'scale-up', duration: 400 });
  const partRef     = useStaggerReveal<HTMLDivElement>(120, { variant: 'fade-up', duration: 600 });
  const expansionRef= useScrollAnimation({ variant: 'fade-right', duration: 700 });
  const expansion2Ref = useScrollAnimation({ variant: 'fade-left', duration: 700, delay: 100 });
  const missionRef  = useStaggerReveal<HTMLDivElement>(200, { variant: 'fade-up', duration: 700 });
  const ctaRef      = useScrollAnimation({ variant: 'scale-up', duration: 600 });

  /* ── hero line count-up ─ */
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#071A33]">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        {/* Parallax BG */}
        <div ref={heroBgRef} className="parallax-layer absolute inset-0 scale-110">
          <img
            src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1920&h=1080&fit=crop&auto=format"
            alt="Aerospace manufacturing facility"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/97 via-[#071A33]/82 to-[#071A33]/35" />
        <div className="absolute inset-0 grid-overlay" />

        {/* Engineering SVG lines */}
        <EngrLines />

        {/* Rotating ring decoration */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <svg viewBox="0 0 320 320" className="w-64 h-64 animate-spin-slow opacity-10">
            <circle cx="160" cy="160" r="155" stroke="#1D6FA5" strokeWidth="0.6" fill="none" strokeDasharray="10 6" />
            <circle cx="160" cy="160" r="120" stroke="#F5B72C" strokeWidth="0.4" fill="none" strokeDasharray="4 8" />
            <circle cx="160" cy="160" r="80" stroke="#1D6FA5" strokeWidth="0.5" fill="none" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <LogoMark height={80} className="opacity-20 animate-float" />
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 w-full">
          {/* Label */}
          <div
            className={`font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.35em] uppercase mb-8 flex items-center gap-3 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className={`h-px bg-[#F5B72C] transition-all duration-800 ${heroVisible ? 'w-8' : 'w-0'}`} style={{ transitionDelay: '400ms' }} />
            Aerospace&nbsp;/&nbsp;Defence&nbsp;/&nbsp;Advanced Manufacturing
          </div>

          {/* Headline — word-by-word reveal */}
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[0.88] text-white mb-8 max-w-5xl space-x-3">
            <HeroWord delay={300}>Engineering</HeroWord>{' '}
            <br className="hidden md:block" />
            <span className="text-[#F5B72C]">
              <HeroWord delay={450}>The&nbsp;Future</HeroWord>
            </span>{' '}
            <HeroWord delay={580}>Of</HeroWord>{' '}
            <br />
            <HeroWord delay={700}>Aerospace</HeroWord>{' '}
            <span className="text-white/40">&amp;</span>{' '}
            <HeroWord delay={820}>Defence</HeroWord>
          </h1>

          <p
            className={`text-white/55 text-base md:text-lg max-w-xl mb-10 leading-relaxed transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '1000ms' }}
          >
            Sree Dakssnaa Aerospace & Defence India Pvt Ltd delivers engineered manufacturing solutions
            across aerospace and defence — combining advanced manufacturing, precision engineering,
            fabrication, composites, assembly and technology development.
          </p>

          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '1150ms' }}
          >
            <Link
              to="/capabilities"
              className="bg-[#0B4F8A] text-white font-display font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#1D6FA5] hover:scale-105 transition-all duration-200"
            >
              Explore Capabilities
            </Link>
            <Link
              to="/contact"
              className="border border-white/25 text-white font-display font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:border-[#F5B72C] hover:text-[#F5B72C] hover:scale-105 transition-all duration-200"
            >
              Start A Conversation
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
          <div className="w-px h-14 bg-gradient-to-b from-[#F5B72C] to-transparent animate-pulse-amber" />
          <span className="font-mono-custom text-[#F5B72C]/40 text-[8px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-lr' }}>Scroll</span>
        </div>
      </section>

      {/* ── ENGINEERED FOR COMPLEXITY ─────────────────────── */}
      <section className="py-28 bg-[#071A33]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={introRef as React.RefObject<HTMLDivElement>}>
              <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Company</div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-0">
                Engineered<br /><span className="text-[#1D6FA5]">For Complexity</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#F5B72C] mt-6 mb-8 animate-hero-line" style={{ animationFillMode: 'both' }} />

              {/* Decorative engineering SVG */}
              <svg viewBox="0 0 280 80" className="w-full opacity-30">
                <line x1="0" y1="40" x2="280" y2="40" stroke="#1D6FA5" strokeWidth="0.5" strokeDasharray="5 7" />
                <circle cx="40" cy="40" r="3" fill="#F5B72C" />
                <circle cx="140" cy="40" r="2" fill="#1D6FA5" />
                <circle cx="240" cy="40" r="3" fill="#F5B72C" />
                <rect x="36" y="10" width="8" height="60" fill="none" stroke="#1D6FA5" strokeWidth="0.4" />
                <rect x="136" y="20" width="8" height="40" fill="none" stroke="#1D6FA5" strokeWidth="0.4" />
              </svg>
            </div>

            <div ref={introTxtRef as React.RefObject<HTMLDivElement>} className="space-y-5 text-white/60 text-base leading-relaxed">
              <p>
                <strong className="text-white">Established in 2024</strong>, Sree Dakssnaa Aerospace and Defence India Pvt Ltd
                is a precision engineering and manufacturing company focused on the aerospace and defence sectors.
              </p>
              <p>
                As a subsidiary of Airfloa Rail Technologies Limited, the company leverages nearly three decades
                of industry expertise — spanning design, analysis, development, fabrication, machining, welding and
                assembly of metal and non-metal turnkey products.
              </p>
              <p>
                Our differentiators are a highly skilled team, a strong focus on research and development,
                strategic global partnerships, and a commitment to innovation, customisation and customer satisfaction.
              </p>
              <Link to="/about" className="inline-flex items-center gap-3 text-[#F5B72C] font-display text-xs font-semibold tracking-widest uppercase mt-2 hover:gap-6 transition-all duration-300">
                About The Company <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FROM ENGINEERING TO EXECUTION ─────────────────── */}
      <section className="py-28 bg-[#0A1929] grid-overlay-fine">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={capHeadRef as React.RefObject<HTMLDivElement>} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Capabilities</div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
                From Engineering<br />To Execution
              </h2>
            </div>
            <Link to="/capabilities" className="text-[#F5B72C] font-display font-semibold text-xs tracking-widest uppercase border-b border-[#F5B72C]/30 pb-1 hover:border-[#F5B72C] transition-all self-start lg:self-auto">
              Full Capability Overview →
            </Link>
          </div>

          <div ref={capGridRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1D6FA5]/10">
            {capabilities.map((c) => (
              <Link
                key={c.num}
                to="/capabilities"
                data-anim-child="true"
                className="cap-card hover-lift block border border-[#1D6FA5]/20 bg-[#071A33] p-8 h-full"
              >
                <div className="font-mono-custom text-[#F5B72C]/50 text-xs tracking-widest mb-4">{c.num}</div>
                <h3 className="font-display font-semibold text-white text-base mb-3 leading-snug">{c.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{c.desc}</p>
                <span className="cap-arrow font-mono-custom text-white/35 text-sm">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SREE DAKSSNAA ─────────────────────────────── */}
      <section className="py-28 bg-[#071A33]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={whyHeadRef as React.RefObject<HTMLDivElement>} className="mb-16">
            <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Why Us</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">The Sree Dakssnaa<br />Advantage</h2>
          </div>

          <div ref={whyGridRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1D6FA5]/10">
            {[
              { title: 'Aerospace Engineering', desc: 'Core competencies in aerospace engineering and military systems integration, backed by group heritage spanning three decades.' },
              { title: 'Advanced Technology', desc: 'Technology development capability encompassing additive manufacturing, laser processing and composite fabrication.' },
              { title: 'Strategic Partnerships', desc: 'Global partnerships with RUBTEC Denmark and VCI Composites Canada, extending material science capability.' },
              { title: 'Skilled Team', desc: 'Led by a Managing Director with three decades of manufacturing experience and a Director with 15+ years in aerospace.' },
              { title: 'Research & Development', desc: 'Strong focus on R&D, process improvement and technology development embedded in every programme.' },
              { title: 'Mission Focus', desc: 'Serving HAL, ADA, DRDO and the broader Indian aerospace and defence ecosystem with engineering-led solutions.' },
            ].map((item) => (
              <div key={item.title} data-anim-child="true" className="hover-lift bg-[#071A33] border border-[#1D6FA5]/20 p-8">
                <div className="w-8 h-0.5 bg-[#F5B72C] mb-5" />
                <h3 className="font-display font-semibold text-white text-lg mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANCED MANUFACTURING ───────────────────────── */}
      <section className="py-28 bg-[#151A21]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={whyHeadRef as React.RefObject<HTMLDivElement>} className="mb-14">
            <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Facilities</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">Advanced Manufacturing</h2>
            <p className="text-white/50 text-base max-w-xl">A digital manufacturing facility equipped with precision Japanese, German and Chinese CNC systems.</p>
          </div>

          <div ref={machRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {machines.map((m, i) => (
              <div
                key={m.label}
                data-anim-child="true"
                className="hover-lift border border-[#1D6FA5]/25 bg-[#071A33]/60 p-6 hover:border-[#F5B72C]/50 transition-colors"
              >
                <div className="font-mono-custom text-[10px] text-[#F5B72C]/60 tracking-widest uppercase mb-3">{String(i + 1).padStart(2, '0')}</div>
                <div className="font-display font-semibold text-white text-sm mb-2">{m.label}</div>
                <div className="font-mono-custom text-[10px] text-white/35 leading-relaxed">{m.spec}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/facilities" className="inline-flex items-center gap-3 border border-[#0B4F8A] text-white font-display font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#0B4F8A] hover:scale-105 transition-all duration-200">
              View Full Facility
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────── */}
      <section className="py-28 bg-[#071A33]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={projHeadRef as React.RefObject<HTMLDivElement>} className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Portfolio</div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white">Engineering In Action</h2>
            </div>
            <Link to="/projects" className="text-[#F5B72C] font-display font-semibold text-xs tracking-widest uppercase border-b border-[#F5B72C]/30 pb-1 hover:border-[#F5B72C] transition-all self-start lg:self-auto">
              View All Projects →
            </Link>
          </div>

          <div ref={projGridRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <Link
                key={p.title}
                to="/projects"
                data-anim-child="true"
                className="project-card hover-lift relative block overflow-hidden bg-[#151A21] group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#0B4F8A]/20">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/92 via-[#071A33]/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex gap-2 mb-2">
                    <span className="font-mono-custom text-[9px] text-[#F5B72C] tracking-widest uppercase border border-[#F5B72C]/30 px-2 py-0.5">{p.industry}</span>
                  </div>
                  <h3 className="font-display font-semibold text-white text-base leading-snug mb-1">{p.title}</h3>
                  <p className="font-mono-custom text-white/40 text-[10px] tracking-wider">{p.customer}</p>
                </div>
                <div className="project-overlay absolute inset-0 border-2 border-[#F5B72C]/25 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOMERS / ECOSYSTEM ────────────────────────── */}
      <section className="py-20 bg-[#0A1929] border-y border-[#1D6FA5]/15">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Industry Ecosystem</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Trusted Across Critical Industries</h2>
            <p className="text-white/35 text-sm mt-2 font-mono-custom tracking-wider">Customers / Industry Ecosystem</p>
          </div>

          {/* Marquee */}
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#0A1929] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#0A1929] to-transparent pointer-events-none" />
            <div className="marquee-track flex gap-4 w-max">
              {[...ecosystem, ...ecosystem].map((org, i) => (
                <div
                  key={`${org}-${i}`}
                  className="flex-shrink-0 border border-[#1D6FA5]/25 bg-[#071A33]/60 px-6 py-4 font-display font-semibold text-sm text-white/50 hover:text-white hover:border-[#F5B72C]/40 transition-all cursor-default"
                >
                  {org}
                </div>
              ))}
            </div>
          </div>

          <div ref={ecoRef as React.RefObject<HTMLDivElement>} className="mt-8 flex flex-wrap justify-center gap-3">
            {ecosystem.map(org => (
              <div key={org} data-anim-child="true" className="hover-lift border border-[#1D6FA5]/20 bg-[#071A33]/50 px-5 py-3 font-display font-semibold text-sm text-white/55 hover:text-white hover:border-[#F5B72C]/30 transition-all">
                {org}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIPS ────────────────────────────────── */}
      <section className="py-28 bg-[#071A33]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Global Alliances</div>
          <h2 className="font-display font-bold text-4xl text-white mb-14">Strategic Partnerships</h2>
          <div ref={partRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { partner: 'RUBTEC', country: 'Denmark', domain: 'Aluminium Wheels', desc: 'Strategic technology partnership for high-performance aluminium wheel manufacturing.' },
              { partner: 'VCI Composites', country: 'Canada', domain: 'Armour Grade Composite Panels', desc: 'Partnership focused on armour-grade composite panel technology for defence applications.' },
            ].map(p => (
              <div key={p.partner} data-anim-child="true" className="hover-lift border border-[#1D6FA5]/25 bg-[#0A1929] p-10 border-amber-accent hover:border-[#F5B72C]/40 transition-all">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="font-display font-bold text-white text-2xl">{p.partner}</h3>
                    <span className="font-mono-custom text-[#F5B72C] text-[10px] tracking-widest uppercase">{p.country}</span>
                  </div>
                  <div className="font-mono-custom text-[10px] text-white/30 tracking-wider text-right">{p.domain}</div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITY EXPANSION ─────────────────────────── */}
      <section className="py-28 bg-[#151A21] grid-overlay">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={expansionRef as React.RefObject<HTMLDivElement>}>
              <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Future Ready</div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
                Expanding Our<br />Engineering Frontier
              </h2>
              <div className="w-16 h-0.5 bg-[#F5B72C] mb-8" />
              <p className="text-white/55 text-base leading-relaxed mb-6">
                A dedicated <strong className="text-white">44,000 sq.ft facility (Unit-7)</strong> is planned exclusively for
                Fibre Reinforced Polymer (FRP) and advanced composite manufacturing — expanding capability into critical defence programmes.
              </p>
              <ul className="space-y-2 mb-8">
                {['Ballistic Skirt Plates for Battle Tanks', 'CFRP Foot Rest & Consoles for Surveillance Aircraft', 'CFRP Shells for Missile Re-Entry Components'].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/55">
                    <span className="text-[#F5B72C] mt-0.5 flex-shrink-0">—</span>{item}
                  </li>
                ))}
              </ul>
              <div className="inline-flex items-center gap-2 font-mono-custom text-[10px] text-[#F5B72C]/60 tracking-widest uppercase border border-[#F5B72C]/20 px-4 py-2">
                <div className="w-1.5 h-1.5 bg-[#F5B72C]/40 rounded-full animate-pulse-amber" />
                Capability Expansion — Not Yet Operational
              </div>
            </div>

            <div ref={expansion2Ref as React.RefObject<HTMLDivElement>} className="relative">
              <div className="border border-[#1D6FA5]/30 p-1 bg-[#0A1929]">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&h=500&fit=crop&auto=format"
                  alt="Advanced composite manufacturing"
                  className="w-full aspect-[7/5] object-cover opacity-55"
                />
                <div className="absolute inset-0 grid-overlay-fine pointer-events-none" />
              </div>
              <div className="absolute -bottom-5 -right-5 border border-[#F5B72C]/30 p-5 bg-[#071A33]">
                <div className="font-mono-custom text-[#F5B72C] text-3xl font-bold leading-none">44K</div>
                <div className="font-mono-custom text-white/40 text-[9px] tracking-widest uppercase mt-1">Sq.Ft FRP Facility</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────────────────── */}
      <section className="py-28 bg-[#071A33] relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-8" />
          <div className="absolute inset-0 bg-[#071A33]/85" />
          <div className="absolute inset-0 grid-overlay" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6">
          <div ref={missionRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div data-anim-child="true" className="border-l-2 border-[#F5B72C] pl-8">
              <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Mission</div>
              <p className="font-display text-xl md:text-2xl text-white leading-relaxed font-medium">
                "Our company's mission is to provide innovative and reliable defense and aerospace solutions
                that contribute to global security and technological advancement."
              </p>
            </div>
            <div data-anim-child="true" className="border-l-2 border-[#1D6FA5] pl-8">
              <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Vision</div>
              <p className="font-display text-xl md:text-2xl text-white leading-relaxed font-medium">
                "The vision is to become a leading player in the industry by delivering cutting-edge products
                and services."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="py-28 bg-[#0B4F8A] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        {/* Decorative rotating ring */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 500 500" className="w-96 h-96 animate-spin-slow">
            <circle cx="250" cy="250" r="245" stroke="#F7F9FC" strokeWidth="0.5" fill="none" strokeDasharray="8 6" />
            <circle cx="250" cy="250" r="180" stroke="#F5B72C" strokeWidth="0.4" fill="none" strokeDasharray="4 8" />
          </svg>
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 text-center">
          <div ref={ctaRef as React.RefObject<HTMLDivElement>}>
            <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-6">Engage</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Ready To Engineer<br />What Comes Next?
            </h2>
            <p className="text-white/65 text-lg mb-10 max-w-lg mx-auto">
              Talk to our engineering team about your aerospace, defence or advanced manufacturing requirement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-[#F5B72C] text-[#071A33] font-display font-bold text-sm tracking-widest uppercase px-10 py-4 hover:bg-amber-300 hover:scale-105 transition-all duration-200"
              >
                Start A Conversation
              </Link>
              <Link
                to="/capabilities"
                className="border border-white/35 text-white font-display font-semibold text-sm tracking-widest uppercase px-10 py-4 hover:border-white hover:bg-white/10 hover:scale-105 transition-all duration-200"
              >
                Explore Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
