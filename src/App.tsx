import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import { LogoMark } from './components/Logo';
import { useScrollAnimation, useStaggerReveal, useParallax } from './hooks/useScrollAnimation';

/* ── token shorthand ─────────────────────────────────────── */
const C = {
  navy:   '#1C2B8C',
  red:    '#CC2B2B',
  gray:   '#7B8C9E',
  border: '#E2E8F4',
  surf:   '#F7F9FF',
  surf2:  '#EEF2FF',
  head:   '#1C2B8C',
  body:   '#3D4F6B',
  muted:  '#7B8C9E',
};

/* ── helpers ─────────────────────────────────────────────── */
function HeroWord({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className="hero-word">
      <span className="hero-word-inner" style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}>
        {children}
      </span>
    </span>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="font-mono-custom text-[#CC2B2B] text-[10px] tracking-[0.32em] uppercase mb-4 flex items-center gap-3">
      <div className="w-4 h-[2px] bg-[#CC2B2B] rounded-full" />
      {children}
    </div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-[#E2E8F4] my-0" />;
}

/* ── capability icons (24×24 stroke SVG) ─────────────────── */
function CapIcon({ type }: { type: string }) {
  const cls = "w-6 h-6";
  const s = { stroke: '#1C2B8C', strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'machining': return <svg viewBox="0 0 24 24" className={cls}><circle cx="12" cy="12" r="3" {...s}/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" {...s}/></svg>;
    case 'composite': return <svg viewBox="0 0 24 24" className={cls}><path d="M2 20h20M2 16l10-4 10 4M2 12l10-4 10 4M12 4l10 4" {...s}/></svg>;
    case 'assembly':  return <svg viewBox="0 0 24 24" className={cls}><rect x="3" y="3" width="6" height="6" rx="1" {...s}/><rect x="15" y="3" width="6" height="6" rx="1" {...s}/><rect x="9" y="15" width="6" height="6" rx="1" {...s}/><path d="M6 9v3h12V9M12 12v3" {...s}/></svg>;
    case 'coatings':  return <svg viewBox="0 0 24 24" className={cls}><path d="M12 22a7 7 0 0 0 7-7c0-3.87-7-13-7-13S5 11.13 5 15a7 7 0 0 0 7 7z" {...s}/><path d="M8.5 18.5a3.5 3.5 0 0 0 3.5 1.5" {...s}/></svg>;
    case 'welding':   return <svg viewBox="0 0 24 24" className={cls}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" {...s}/></svg>;
    case 'quality':   return <svg viewBox="0 0 24 24" className={cls}><path d="m9 12 2 2 4-4" {...s}/><path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3z" {...s}/></svg>;
    case 'additive':  return <svg viewBox="0 0 24 24" className={cls}><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" {...s}/></svg>;
    case 'project':   return <svg viewBox="0 0 24 24" className={cls}><rect x="3" y="4" width="18" height="18" rx="2" {...s}/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" {...s}/></svg>;
    default:          return null;
  }
}

/* ── data ────────────────────────────────────────────────── */
const capabilities = [
  { num: '01', icon: 'machining', title: 'Precision Machining',      desc: 'CNC turning and double-column machining for complex aerospace geometries at tight tolerances.' },
  { num: '02', icon: 'composite', title: 'Composite Manufacturing',  desc: 'FRP and advanced composite structures — armour-grade panels, aerospace shells, structural FRP.' },
  { num: '03', icon: 'assembly',  title: 'Assembly & Integration',   desc: 'Integrated assembly of metal and non-metal turnkey defence and aerospace products.' },
  { num: '04', icon: 'coatings',  title: 'Specialised Coatings',     desc: 'Surface treatment and stealth coating applications for defence platforms.' },
  { num: '05', icon: 'welding',   title: 'Fabrication & Welding',    desc: 'Precision sheet-metal fabrication, TIG/MMA welding, and structural manufacturing.' },
  { num: '06', icon: 'quality',   title: 'Quality & R&D',            desc: 'Engineering discipline, process development, and technology research embedded in every programme.' },
  { num: '07', icon: 'additive',  title: 'Additive Manufacturing',   desc: 'Laser processing, SLM metal printing, and digital fabrication for next-generation components.' },
  { num: '08', icon: 'project',   title: 'Project Management',       desc: 'End-to-end programme delivery from design analysis through to final integration.' },
];

const industries = [
  { title: 'Aerospace',        img: 'https://images.unsplash.com/photo-1522798120812-304f8819f4be?w=900&h=560&fit=crop&auto=format', projects: ['AMCA Mock-up Cockpit', 'LCA AF Mk2 Cockpit Shell', 'Aircraft Intake Duct'], eco: 'HAL · ADA · DRDO' },
  { title: 'Defence',          img: 'https://images.unsplash.com/photo-1630161861535-b39e5635da68?w=900&h=560&fit=crop&auto=format', projects: ['T-90 Pre-Heater System', 'Complete Hull Structure', 'Turret & Traverse Table'], eco: 'HVF · DRDO · CVRDE' },
  { title: 'Simulation',       img: 'https://images.unsplash.com/flagged/photo-1579750481098-8b3a62c9b85d?w=900&h=560&fit=crop&auto=format', projects: ['Jaguar Simulator Cockpit', 'LCA Tejas Avionics Trainer'], eco: 'HAL · ADA' },
  { title: 'Rail & Transport', img: 'https://images.unsplash.com/photo-1523667071851-4fda8c8a8dd5?w=900&h=560&fit=crop&auto=format', projects: ['Railway Wagon Hood Structure'], eco: 'BEML · RITES · Indian Railways' },
];

const machines = [
  { cat: 'LASER',    name: 'Mitsubishi ML3015SR',            spec: '3015×1525 mm · Rapid 140 m/min · ±0.01 mm accuracy' },
  { cat: 'LASER',    name: 'Mitsubishi ML3015HV',            spec: '4 kW CO₂ · 3050×1525 mm · High-volume sheet fabrication' },
  { cat: 'LASER',    name: 'Amada ORSUS 3015AJ',            spec: '3070×1550 mm · 170 m/min · AMNC 4ie controller' },
  { cat: 'CNC',      name: 'PL6050L CNC Turning Centre',    spec: '1000–2000 mm turning length · Heavy-duty aerospace' },
  { cat: 'MACHINING',name: 'Double Column Machining Centre', spec: '4000×2100 mm table · 13 t load · 6000–10000 rpm' },
  { cat: 'PUNCHING', name: 'CNC Punch Machine',             spec: '165 kN · 2500×1250 mm · 900 strokes/min' },
  { cat: 'ADDITIVE', name: 'BLT S450 Additive System',      spec: '450×450×500 mm · 500W×4–8 lasers · Ti / Al / Superalloy' },
  { cat: 'WELDING',  name: 'Panasonic YC-400TX3 TIG',       spec: 'DC TIG / MMA · HF arc start · PF > 0.9' },
];
const allFacCats = ['ALL', 'LASER', 'CNC', 'MACHINING', 'PUNCHING', 'ADDITIVE', 'WELDING'] as const;

const projects = [
  { title: 'AMCA Mock-up Cockpit Fabrication',    industry: 'Aerospace',  customer: 'ADA, Bangalore',           img: 'https://images.unsplash.com/photo-1690565243032-e90a1e4b3f9e?w=600&h=420&fit=crop&auto=format' },
  { title: 'Modular Cockpit Shell — LCA AF Mk2',  industry: 'Aerospace',  customer: 'ADA / HAL, Bangalore',     img: 'https://images.unsplash.com/photo-1522798120812-304f8819f4be?w=600&h=420&fit=crop&auto=format' },
  { title: 'Jaguar Aircraft Simulator Cockpit',   industry: 'Simulation', customer: 'HAL, Bangalore',           img: 'https://images.unsplash.com/flagged/photo-1579750481098-8b3a62c9b85d?w=600&h=420&fit=crop&auto=format' },
  { title: 'LCA Tejas Avionics Part Task Trainer',industry: 'Simulation', customer: 'HAL – LCA Unit, Bangalore',img: 'https://images.unsplash.com/photo-1552773346-ca6976a5d4ca?w=600&h=420&fit=crop&auto=format' },
  { title: 'T-90 Main Battle Tank Pre-Heater',    industry: 'Defence',    customer: 'HVF, Avadi',               img: 'https://images.unsplash.com/photo-1630161861535-b39e5635da68?w=600&h=420&fit=crop&auto=format' },
  { title: 'Aircraft Intake Duct',                industry: 'Aerospace',  customer: 'DRDO, Jodhpur',            img: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=600&h=420&fit=crop&auto=format' },
  { title: 'Complete Hull Structure',             industry: 'Defence',    customer: 'On Request',               img: 'https://images.unsplash.com/photo-1545631757-8b75025a310e?w=600&h=420&fit=crop&auto=format' },
  { title: 'Railway Wagon Hood Structure',        industry: 'Rail',       customer: 'BEML / Indian Railways',   img: 'https://images.unsplash.com/photo-1523667071851-4fda8c8a8dd5?w=600&h=420&fit=crop&auto=format' },
];
const projectFilters = ['All', 'Aerospace', 'Defence', 'Simulation', 'Rail'];
const ecosystem = [
  { abbr: 'HAL',            full: 'Hindustan Aeronautics Ltd',               sector: 'Aerospace',  color: '#003087' },
  { abbr: 'ADA',            full: 'Aeronautical Development Agency',          sector: 'Aerospace',  color: '#1C2B8C' },
  { abbr: 'DRDO',           full: 'Defence Research & Dev. Organisation',     sector: 'Defence',    color: '#4B5320' },
  { abbr: 'HVF',            full: 'Heavy Vehicles Factory, Avadi',            sector: 'Defence',    color: '#6B3A2A' },
  { abbr: 'CVRDE',          full: 'Combat Vehicles R&D Establishment',        sector: 'Defence',    color: '#4B5320' },
  { abbr: 'BEML',           full: 'Bharat Earth Movers Limited',              sector: 'Rail',       color: '#CC2B2B' },
  { abbr: 'ALSTOM',         full: 'Alstom SA',                                sector: 'Rail',       color: '#0075BE' },
  { abbr: 'BOMBARDIER',     full: 'Bombardier Transportation',                sector: 'Rail',       color: '#B40000' },
  { abbr: 'RITES',          full: 'Rail India Technical & Econ. Services',    sector: 'Rail',       color: '#004A99' },
  { abbr: 'Indian Railways', full: 'Ministry of Railways, Govt. of India',    sector: 'Rail',       color: '#1A2C78' },
  { abbr: 'ASL',            full: 'Armoured Systems Ltd',                     sector: 'Defence',    color: '#3D5A27' },
  { abbr: 'MCSRDC',         full: 'MCS Research & Dev. Centre',               sector: 'Defence',    color: '#1C2B8C' },
];

/* ── main component ─────────────────────────────────────── */
export default function App() {
  const [heroVis, setHeroVis] = useState(false);
  const heroBgRef = useParallax<HTMLDivElement>(0.18);
  useEffect(() => { const t = setTimeout(() => setHeroVis(true), 120); return () => clearTimeout(t); }, []);

  /* animation refs */
  const aboutLRef   = useScrollAnimation({ variant: 'fade-right', duration: 680 });
  const aboutRRef   = useScrollAnimation({ variant: 'fade-left',  duration: 680, delay: 80 });
  const mvRef       = useStaggerReveal(160, { variant: 'fade-up',  duration: 600 });
  const capHeadRef  = useScrollAnimation({ variant: 'fade-up' });
  const capGridRef  = useStaggerReveal(55,  { variant: 'fade-up',  duration: 520 });
  const indRef      = useStaggerReveal(90,  { variant: 'fade-up',  duration: 560 });
  const facHeadRef  = useScrollAnimation({ variant: 'fade-up' });
  const facGridRef  = useStaggerReveal(45,  { variant: 'fade-up',  duration: 480 });
  const expansionRef= useScrollAnimation({ variant: 'fade-up',    duration: 680 });
  const projHeadRef = useScrollAnimation({ variant: 'clip-left',   duration: 700 });
  const projGridRef = useStaggerReveal(65,  { variant: 'fade-up',  duration: 540 });
  const partRef     = useStaggerReveal(130, { variant: 'fade-up',  duration: 580 });
  const qualRef     = useStaggerReveal(50,  { variant: 'fade-up',  duration: 480 });
  const rdRef       = useStaggerReveal(80,  { variant: 'fade-left',duration: 500 });
  const ctaRef      = useScrollAnimation({ variant: 'scale-up',    duration: 580 });

  /* partner tab */
  type PartnerTab = 'All' | 'Aerospace' | 'Defence' | 'Rail';
  const partnerTabs: PartnerTab[] = ['All', 'Aerospace', 'Defence', 'Rail'];
  const [partnerTab, setPartnerTab] = useState<PartnerTab>('All');
  const getFilteredEcosystem = (tab: PartnerTab) =>
    tab === 'All' ? ecosystem : ecosystem.filter(e => e.sector === tab);
  const tabClass = (tab: PartnerTab) => partnerTab === tab
    ? 'bg-[#1C2B8C] text-white border-[#1C2B8C] shadow-md'
    : 'border-[#E2E8F4] text-[#7B8C9E] bg-white hover:text-[#1C2B8C] hover:border-[#1C2B8C]';

  /* filters */
  const [facFilter, setFacFilter] = useState<string>('ALL');
  const filteredMachines = facFilter === 'ALL' ? machines : machines.filter(m => m.cat === facFilter);
  const [projFilter, setProjFilter] = useState('All');
  const filteredProjects = projFilter === 'All' ? projects : projects.filter(p => p.industry === projFilter);

  /* contact form */
  const [form, setForm]       = useState({ name: '', company: '', email: '', phone: '', requirement: '', message: '' });
  const [submitted, setSubmit] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmit(true); };

  const inp = `w-full bg-white border border-[${C.border}] text-[${C.head}] text-sm px-4 py-3 rounded focus:outline-none focus:border-[${C.navy}] focus:ring-2 focus:ring-[${C.navy}]/10 transition-all placeholder:text-[${C.muted}] font-body`;

  /* ── render ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ═══ HERO ════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

        {/* Multi-sector background — four side-by-side image panels */}
        <div className="absolute inset-0 flex">

          {/* Panel 1 — Aerospace */}
          <div className="relative flex-1 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1583207062953-91712cb271a7?w=600&h=1100&fit=crop&auto=format&crop=center"
              alt="Fighter jets in formation"
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Panel label */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-5 bg-gradient-to-t from-[#050D24]/80 to-transparent">
              <div className="font-mono-custom text-white/50 text-[7px] tracking-[0.28em] uppercase">Aerospace</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-white/10 flex-shrink-0 z-10" />

          {/* Panel 2 — Defence */}
          <div className="relative flex-1 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1630161861535-b39e5635da68?w=600&h=1100&fit=crop&auto=format&crop=center"
              alt="Military armoured vehicle"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-5 bg-gradient-to-t from-[#050D24]/80 to-transparent">
              <div className="font-mono-custom text-white/50 text-[7px] tracking-[0.28em] uppercase">Defence</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-white/10 flex-shrink-0 z-10" />

          {/* Panel 3 — Simulation */}
          <div className="relative flex-1 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522798120812-304f8819f4be?w=600&h=1100&fit=crop&auto=format&crop=center"
              alt="Aircraft cockpit simulation"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-5 bg-gradient-to-t from-[#050D24]/80 to-transparent">
              <div className="font-mono-custom text-white/50 text-[7px] tracking-[0.28em] uppercase">Simulation</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-white/10 flex-shrink-0 z-10" />

          {/* Panel 4 — Rail & Transport */}
          <div className="relative flex-1 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523667071851-4fda8c8a8dd5?w=600&h=1100&fit=crop&auto=format&crop=center"
              alt="High-speed rail and transport"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-5 bg-gradient-to-t from-[#050D24]/80 to-transparent">
              <div className="font-mono-custom text-white/50 text-[7px] tracking-[0.28em] uppercase">Rail & Transport</div>
            </div>
          </div>

          {/* Unified dark overlay across all panels */}
          <div className="absolute inset-0 bg-[#050D24]/68 pointer-events-none" />
          {/* Left-heavy vignette so text reads cleanly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050D24]/60 via-[#050D24]/20 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 w-full pt-32 pb-32">
          <div className={`max-w-[640px] transition-all duration-700 ${heroVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Eyebrow */}
            <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${heroVis ? 'opacity-100' : 'opacity-0'}`}
                 style={{ transitionDelay: '150ms' }}>
              <div className={`h-[2px] bg-[#CC2B2B] rounded-full transition-all duration-700 ${heroVis ? 'w-8' : 'w-0'}`}
                   style={{ transitionDelay: '300ms' }} />
              <span className="font-mono-custom text-white/60 text-[9px] tracking-[0.3em] uppercase">
                Aerospace · Defence · Simulation · Rail & Transport
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-white leading-[1.04] mb-7"
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}>
              <HeroWord delay={200}>Engineering</HeroWord>{' '}
              <span style={{ color: '#F87171' }}><HeroWord delay={320}>Precision.</HeroWord></span>
              <br />
              <HeroWord delay={460}>Building</HeroWord>{' '}
              <HeroWord delay={570}>Mission&#8209;Critical</HeroWord>
              <br />
              <span className="text-white/50"><HeroWord delay={700}>Solutions.</HeroWord></span>
            </h1>

            {/* Sub-copy */}
            <p className={`text-white/65 text-lg leading-relaxed max-w-[500px] mb-10 transition-all duration-700 ${heroVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
               style={{ transitionDelay: '880ms' }}>
              Engineering, manufacturing and integration for India's Aerospace & Defence sectors — built on precision, reliability and deep expertise.
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-4 transition-all duration-700 ${heroVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                 style={{ transitionDelay: '1040ms' }}>
              <button
                onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#CC2B2B] text-white font-display font-bold text-[10px] tracking-widest uppercase px-8 py-4 rounded-lg hover:bg-[#A82020] hover:scale-105 transition-all duration-200 shadow-lg shadow-black/30 flex items-center gap-2">
                Explore Capabilities
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-white/30 text-white font-display font-bold text-[10px] tracking-widest uppercase px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-200 backdrop-blur-sm">
                Enquire Now
              </button>
            </div>

          </div>
        </div>

        {/* Scroll cue */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 transition-all duration-700 ${heroVis ? 'opacity-100' : 'opacity-0'}`}
             style={{ transitionDelay: '1300ms' }}>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
          <span className="font-mono-custom text-white/35 text-[8px] tracking-widest uppercase">Scroll</span>
        </div>

      </section>

      <Divider />

      {/* ═══ ABOUT ═══════════════════════════════════════════ */}
      <section id="about" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            <div ref={aboutLRef}>
              <SectionLabel>About Us</SectionLabel>
              <h2 className="font-display font-bold text-[#1C2B8C] leading-tight mb-5"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                Engineering for<br />Aerospace & Defence
              </h2>
              <div className="flex gap-2 mb-6">
                <div className="w-10 h-1 bg-[#CC2B2B] rounded-full" />
                <div className="w-4 h-1 bg-[#1C2B8C]/30 rounded-full" />
              </div>
              <div className="space-y-4 text-[#3D4F6B] text-base leading-relaxed">
                <p>
                  <strong className="text-[#1C2B8C]">Established in 2024</strong>, Sree Dakssnaa Aerospace and Defence India Pvt Ltd delivers engineering and manufacturing solutions for demanding Aerospace and Defence applications. A subsidiary of Airfloa Rail Technologies Limited.
                </p>
                <p>
                  Our capabilities span <strong className="text-[#1C2B8C]">design, development, fabrication, precision machining, welding, assembly and turnkey manufacturing</strong> of metal and non-metal products.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Precision Engineering', 'Advanced Manufacturing', 'Defence & Aerospace'].map(tag => (
                  <span key={tag} className="font-mono-custom text-[9px] tracking-widest uppercase text-[#1C2B8C] border border-[#1C2B8C]/20 bg-[#EEF2FF] px-3 py-1.5 rounded-sm">{tag}</span>
                ))}
              </div>
            </div>

            <div ref={aboutRRef} className="space-y-4">
              {[
                { name: 'D. Venkatesan',  role: 'Managing Director', bio: 'Three decades of experience in manufacturing industries. Instrumental in establishing a robust foundation ensuring the company’s competitive edge.' },
                { name: 'D. Manikandan', role: 'Director',           bio: 'Mechanical engineering graduate with over 15 years of experience making strategic and operational decisions that ensure the company meets its objectives.' },
              ].map(l => (
                <div key={l.name} className="card-reveal bg-white border border-[#E2E8F4] p-6 flex gap-5 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#EEF2FF] border border-[#1C2B8C]/20 rounded flex items-center justify-center">
                    <span className="font-display font-bold text-[#1C2B8C] text-base">{l.name.split(' ').map(w => w[0]).join('')}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#1C2B8C] text-base mb-0.5">{l.name}</h3>
                    <div className="font-mono-custom text-[#CC2B2B] text-[9px] tracking-widest uppercase mb-2 font-semibold">{l.role}</div>
                    <p className="text-[#7B8C9E] text-sm leading-relaxed">{l.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission / Vision */}
          <div ref={mvRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: 'Mission', icon: '◎', color: C.red,  bg: '#FFF5F5', border: '#FCDADA', text: 'To provide innovative and reliable Aerospace & Defence solutions that contribute to technological advancement and global security.' },
              { label: 'Vision',  icon: '◈', color: C.navy, bg: '#F0F3FF', border: '#C7D3EE', text: 'To become a leading industry player through advanced engineering, innovation and customer-focused solutions.' },
            ].map(item => (
              <div key={item.label} data-anim-child="true"
                   className="card-lift rounded-xl p-8 border"
                   style={{ background: item.bg, borderColor: item.border }}>
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ color: item.color, fontSize: '1.25rem' }}>{item.icon}</span>
                  <div className="font-mono-custom text-[9px] tracking-widest uppercase font-semibold" style={{ color: item.color }}>{item.label}</div>
                </div>
                <p className="font-display text-[#1C2B8C] text-lg leading-relaxed">"{item.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ CAPABILITIES ════════════════════════════════════ */}
      <section id="capabilities" className="py-24 bg-[#F7F9FF] scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={capHeadRef} className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <div>
              <SectionLabel>Core Capabilities</SectionLabel>
              <h2 className="font-display font-bold text-[#1C2B8C] leading-tight"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                From Engineering<br />To Execution
              </h2>
            </div>
            <p className="text-[#7B8C9E] text-sm max-w-xs leading-relaxed lg:text-right">
              Eight integrated disciplines from precision machining to advanced manufacturing.
            </p>
          </div>

          <div ref={capGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map(c => (
              <div key={c.num} data-anim-child="true"
                   className="card-lift bg-white border border-[#E2E8F4] rounded-xl p-7 cursor-default shadow-sm group">
                <div className="font-mono-custom text-[#CC2B2B] text-[10px] tracking-widest mb-4 font-bold">{c.num}</div>
                <div className="w-11 h-11 bg-[#EEF2FF] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#1C2B8C]/10 transition-colors duration-300">
                  <CapIcon type={c.icon} />
                </div>
                <h3 className="font-display font-semibold text-[#1C2B8C] text-sm mb-2 leading-snug">{c.title}</h3>
                <p className="text-[#7B8C9E] text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ INDUSTRIES ══════════════════════════════════════ */}
      <section id="industries" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <SectionLabel>Markets</SectionLabel>
          <h2 className="font-display font-bold text-[#1C2B8C] mb-14"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Industries Served
          </h2>

          <div ref={indRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {industries.map(ind => (
              <div key={ind.title} data-anim-child="true"
                   className="photo-card relative overflow-hidden rounded-xl border border-[#E2E8F4] shadow-sm cursor-default">
                <div className="aspect-[16/9] bg-[#EEF2FF]">
                  <img src={ind.img} alt={ind.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1640]/85 via-[#0C1640]/20 to-transparent" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="font-mono-custom text-[9px] tracking-widest uppercase text-white bg-[#CC2B2B] px-2.5 py-1 rounded-sm font-semibold">{ind.eco}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-bold text-white text-xl mb-2">{ind.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {ind.projects.map(p => (
                      <span key={p} className="font-mono-custom text-[9px] text-white/70 border border-white/20 px-2 py-0.5 tracking-wide rounded-sm">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ FACILITIES ══════════════════════════════════════ */}
      <section id="facilities" className="py-24 bg-[#F7F9FF] scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={facHeadRef} className="mb-12">
            <SectionLabel>Manufacturing Infrastructure</SectionLabel>
            <h2 className="font-display font-bold text-[#1C2B8C] mb-3"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
              Built for Complex Engineering
            </h2>
            <p className="text-[#7B8C9E] text-base max-w-lg">
              Our manufacturing infrastructure supports precision, scale and complex engineering requirements across 44,000 sq.ft.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-10">
            {allFacCats.map(cat => (
              <button key={cat} onClick={() => setFacFilter(cat)}
                className={`font-mono-custom text-[9px] tracking-widest uppercase px-4 py-2 border rounded transition-all duration-200 ${
                  facFilter === cat
                    ? 'bg-[#1C2B8C] text-white border-[#1C2B8C] shadow-md shadow-[#1C2B8C]/20'
                    : 'border-[#E2E8F4] text-[#7B8C9E] bg-white hover:text-[#1C2B8C] hover:border-[#1C2B8C]'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          <div ref={facGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMachines.map(m => (
              <div key={m.name} data-anim-child="true"
                   className="card-glow bg-white border border-[#E2E8F4] rounded-xl p-6 shadow-sm">
                <div className="font-mono-custom text-[10px] text-[#CC2B2B] tracking-widest uppercase mb-2 font-bold">{m.cat}</div>
                <div className="font-display font-semibold text-[#1C2B8C] text-sm mb-2 leading-snug">{m.name}</div>
                <div className="font-mono-custom text-[10px] text-[#7B8C9E] leading-relaxed">{m.spec}</div>
              </div>
            ))}
          </div>

          {/* 44K Expansion */}
          <div ref={expansionRef} className="mt-14 grid grid-cols-1 lg:grid-cols-5 overflow-hidden rounded-2xl border border-[#E2E8F4] shadow-sm">
            <div className="lg:col-span-3 bg-white p-10">
              <div className="font-mono-custom text-[#CC2B2B] text-[9px] tracking-widest uppercase mb-3 font-semibold">Planned Expansion</div>
              <h3 className="font-display font-bold text-2xl text-[#1C2B8C] mb-4">New FRP Manufacturing Facility</h3>
              <p className="text-[#3D4F6B] text-sm leading-relaxed mb-5">
                A dedicated <strong className="text-[#1C2B8C]">44,000 sq.ft facility</strong> planned exclusively for FRP and advanced composite manufacturing — targeting ballistic skirt plates, CFRP surveillance aircraft structures, and missile re-entry shells.
              </p>
              <div className="inline-flex items-center gap-2 font-mono-custom text-[9px] text-[#7B8C9E] tracking-widest uppercase border border-[#E2E8F4] bg-[#F7F9FF] px-3 py-2 rounded-sm">
                <div className="w-1.5 h-1.5 bg-[#CC2B2B] rounded-full animate-pulse-dot" />
                Planned — Not yet operational
              </div>
            </div>
            <div className="lg:col-span-2 bg-[#EEF2FF] flex flex-col items-center justify-center p-10 text-center border-t lg:border-t-0 lg:border-l border-[#E2E8F4]">
              <div className="font-display font-bold text-[#1C2B8C] leading-none mb-2" style={{ fontSize: '5rem' }}>44K</div>
              <div className="font-mono-custom text-[#7B8C9E] text-[10px] tracking-widest uppercase">Sq.Ft FRP Facility</div>
              <div className="font-mono-custom text-[#CC2B2B] text-[9px] mt-2 font-semibold">Unit-7 · Tamil Nadu</div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ PROJECTS ════════════════════════════════════════ */}
      <section id="projects" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={projHeadRef} className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <SectionLabel>Featured Projects</SectionLabel>
              <h2 className="font-display font-bold text-[#1C2B8C]"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                Engineering in Action
              </h2>
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2 flex-wrap mb-10">
            {projectFilters.map(f => (
              <button key={f} onClick={() => setProjFilter(f)}
                className={`font-mono-custom text-[9px] tracking-widest uppercase px-4 py-2 border rounded transition-all duration-200 ${
                  projFilter === f
                    ? 'bg-[#1C2B8C] text-white border-[#1C2B8C] shadow-md shadow-[#1C2B8C]/20'
                    : 'border-[#E2E8F4] text-[#7B8C9E] bg-white hover:text-[#1C2B8C] hover:border-[#1C2B8C]'
                }`}>
                {f}
              </button>
            ))}
          </div>

          <div ref={projGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map(p => (
              <div key={p.title} data-anim-child="true"
                   className="photo-card card-scale relative overflow-hidden rounded-xl border border-[#E2E8F4] shadow-sm cursor-default">
                <div className="aspect-[4/3] bg-[#EEF2FF]">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1640]/88 via-[#0C1640]/15 to-transparent" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="font-mono-custom text-[9px] tracking-widest uppercase text-white bg-[#CC2B2B] px-2.5 py-1 rounded-sm font-semibold">{p.industry}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display font-semibold text-white text-base leading-snug mb-1">{p.title}</h3>
                  <p className="font-mono-custom text-white/55 text-[10px] tracking-wider">{p.customer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ PARTNERSHIPS ════════════════════════════════════ */}
      <section id="partnerships" className="py-24 bg-[#F7F9FF] scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">

          <SectionLabel>Trusted By & Technology Partners</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <h2 className="font-display font-bold text-[#1C2B8C]"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
              Supporting India's Leading Organisations
            </h2>
            {/* Sector filter tabs */}
            <div className="flex gap-2 flex-wrap">
              {partnerTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setPartnerTab(tab)}
                  className={`font-mono-custom text-[9px] tracking-widest uppercase px-5 py-2.5 rounded-lg border transition-all duration-200 ${tabClass(tab)}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Scrolling marquee — filtered by tab */}
          <div className="relative overflow-hidden mb-4">
            {/* Edge fade left */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#F7F9FF] to-transparent pointer-events-none" />
            {/* Edge fade right */}
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#F7F9FF] to-transparent pointer-events-none" />

            <div key={partnerTab} className="marquee-track flex gap-4 w-max py-2">
              {[...getFilteredEcosystem(partnerTab), ...getFilteredEcosystem(partnerTab)].map((org, i) => (
                <div key={`${org.abbr}-${i}`}
                     className="flex-shrink-0 bg-white border border-[#E2E8F4] rounded-xl shadow-sm w-44 p-4 flex flex-col items-center gap-2 cursor-default group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  {/* Monogram logo */}
                  <div className="w-full h-14 rounded-lg flex items-center justify-center"
                       style={{ background: org.color + '12' }}>
                    <span className="font-display font-black leading-none"
                          style={{ color: org.color, fontSize: org.abbr.length > 7 ? '0.6rem' : org.abbr.length > 4 ? '0.82rem' : '1.15rem' }}>
                      {org.abbr}
                    </span>
                  </div>
                  {/* Org name */}
                  <p className="font-mono-custom text-[#7B8C9E] text-[7.5px] tracking-wide leading-tight text-center group-hover:text-[#3D4F6B] transition-colors">
                    {org.full}
                  </p>
                  {/* Sector chip */}
                  <div className="text-[6.5px] font-mono-custom tracking-widest uppercase px-2 py-0.5 rounded-full font-bold"
                       style={{ background: org.color + '15', color: org.color }}>
                    {org.sector}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[#B0BECE] text-[10px] font-mono-custom tracking-wider mb-14">
            Industry Ecosystem — not all organisations are confirmed direct customers.
          </p>

          {/* Global technology partners */}
          <div className="border-t border-[#E2E8F4] pt-12">
            <h3 className="font-display font-bold text-lg text-[#1C2B8C] mb-2">Global Technology Partnerships</h3>
            <p className="text-[#7B8C9E] text-sm mb-8">International collaborations for advanced manufacturing technology.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { partner: 'RUBTEC',         country: 'Denmark', flag: '🇩🇰', domain: 'Aluminium Wheels',             partnerColor: '#C60C30', desc: 'Strategic technology partnership for high-performance aluminium wheel manufacturing supporting rail and transportation programmes.' },
                { partner: 'VCI Composites', country: 'Canada',  flag: '🇨🇦', domain: 'Armour Grade Composite Panels', partnerColor: '#CC2B2B', desc: 'Partnership focused on armour-grade composite panel technology for defence platform protection systems.' },
              ].map(p => (
                <div key={p.partner} className="card-tilt bg-white border border-[#E2E8F4] rounded-xl overflow-hidden shadow-sm">
                  <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${p.partnerColor}, #1C2B8C)` }} />
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black font-display text-sm"
                             style={{ background: p.partnerColor + '15', color: p.partnerColor }}>
                          {p.partner.split(' ').map(w => w[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-[#1C2B8C] text-xl leading-none">{p.partner}</h3>
                          <div className="font-mono-custom text-[#7B8C9E] text-[9px] tracking-wider mt-0.5">{p.domain}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-2xl">{p.flag}</span>
                        <span className="font-mono-custom text-[#CC2B2B] text-[8px] tracking-widest uppercase font-bold">{p.country}</span>
                      </div>
                    </div>
                    <p className="text-[#3D4F6B] text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ QUALITY & R&D ═══════════════════════════════════ */}
      <section id="quality" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <SectionLabel>Our Direction</SectionLabel>
          <h2 className="font-display font-bold text-[#1C2B8C] mb-3"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Quality & Engineering Excellence
          </h2>
          <p className="text-[#7B8C9E] text-base mb-14 max-w-xl">
            Precision, process discipline and continuous technology development — embedded at the core of every programme.
          </p>

          <div ref={qualRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { num: '01', title: 'Engineering Discipline',  desc: 'Structured analysis, dimensional verification and process control from design to delivery.' },
              { num: '02', title: 'Quality Assurance',       desc: 'In-process inspection and material qualification integral to every manufacturing workflow.' },
              { num: '03', title: 'Research & Development',  desc: 'Active R&D across process improvement and advanced materials application.' },
              { num: '04', title: 'Advanced Manufacturing',  desc: 'Additive manufacturing, laser processing and composite fabrication for next-generation programmes.' },
              { num: '05', title: 'Customisation',           desc: 'Bespoke solutions to programme-specific requirements from one-off mock-ups to series production.' },
              { num: '06', title: 'Process Improvement',     desc: 'Continuous improvement reducing cycle time, improving accuracy and enhancing repeatability.' },
            ].map(p => (
              <div key={p.num} data-anim-child="true"
                   className="card-scale bg-[#F7F9FF] border border-[#E2E8F4] rounded-xl p-7">
                <div className="font-mono-custom text-[#CC2B2B] text-xs tracking-widest mb-4 font-bold">{p.num}</div>
                <h3 className="font-display font-semibold text-[#1C2B8C] text-base mb-2">{p.title}</h3>
                <p className="text-[#7B8C9E] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* R&D rows */}
          <div ref={rdRef} className="space-y-3">
            {[
              { area: 'Additive Manufacturing',          tag: 'Active',    col: C.navy, detail: 'BLT S450 SLM · Ti alloy, Aluminium alloy, Superalloy, Stainless steel · 450×450×500 mm build volume.' },
              { area: 'Advanced Composite Structures',   tag: 'Expanding', col: C.red,  detail: 'FRP / CFRP manufacturing including ballistic skirt plates, CFRP missile re-entry shells and surveillance aircraft structures.' },
              { area: 'Stealth & Surface Technology',    tag: 'Active',    col: C.navy, detail: 'Stealth paint and coating application for defence platforms requiring controlled environment processing.' },
              { area: 'High-Precision Laser Processing', tag: 'Active',    col: C.navy, detail: 'Mitsubishi ML3015SR/HV and Amada ORSUS 3015AJ — high-accuracy aerospace-grade sheet processing.' },
            ].map(item => (
              <div key={item.area} data-anim-child="true"
                   className="card-slide bg-white border border-[#E2E8F4] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm">
                <span className="font-mono-custom text-[9px] tracking-widest uppercase px-3 py-1.5 rounded font-bold flex-shrink-0"
                      style={{ color: item.col, background: item.col + '15', border: `1px solid ${item.col}30` }}>
                  {item.tag}
                </span>
                <div>
                  <h4 className="font-display font-semibold text-[#1C2B8C] text-base mb-0.5">{item.area}</h4>
                  <p className="text-[#7B8C9E] text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ CONTACT ═════════════════════════════════════════ */}
      <section id="contact" className="py-24 bg-[#F7F9FF] scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="font-display font-bold text-[#1C2B8C] mb-3"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Let's Engineer What's Next.
          </h2>
          <p className="text-[#7B8C9E] text-base mb-14 max-w-lg">
            Connect with Sree Dakssnaa Aerospace & Defence for engineering, manufacturing and project collaboration.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Info */}
            <div className="space-y-4">
              {[
                { label: 'Phone',  val: '+91 94444 31234',          sub: 'Mon–Fri, 9:00–18:00 IST', href: 'tel:+919444431234' },
                { label: 'Office', val: '127, Mettupalayam Road',   sub: 'Panruti, Sriperumbudur, Kancheepuram – 631604, Tamil Nadu, India', href: null },
              ].map(item => (
                <div key={item.label} className="card-reveal bg-white border border-[#E2E8F4] rounded-xl p-6 shadow-sm">
                  <div className="font-mono-custom text-[#CC2B2B] text-[9px] tracking-widest uppercase mb-2 font-semibold">{item.label}</div>
                  {item.href
                    ? <a href={item.href} className="font-display font-bold text-[#1C2B8C] text-lg hover:text-[#CC2B2B] transition-colors block mb-1">{item.val}</a>
                    : <div className="font-display font-semibold text-[#1C2B8C] text-sm mb-1">{item.val}</div>}
                  <div className="text-[#7B8C9E] text-xs leading-relaxed">{item.sub}</div>
                </div>
              ))}
              <div className="bg-white border border-[#E2E8F4] rounded-xl p-6 shadow-sm">
                {[['Established','2024'],['Type','Private Limited'],['Parent','Airfloa Rail Technologies Ltd'],['Location','Tamil Nadu, India']].map(([k,v]) => (
                  <div key={k} className="spec-row">
                    <span className="font-mono-custom text-[#7B8C9E] text-[9px] uppercase tracking-wider">{k}</span>
                    <span className="font-mono-custom text-[#1C2B8C] text-[10px] font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white border border-[#E2E8F4] rounded-2xl p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 bg-[#EEF2FF] border border-[#1C2B8C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#1C2B8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-[#1C2B8C] text-2xl mb-2">Enquiry Submitted</h3>
                  <p className="text-[#7B8C9E] text-sm max-w-xs">Our engineering team will review your requirement and respond within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono-custom text-[9px] text-[#7B8C9E] tracking-widest uppercase block mb-2">Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inp} />
                    </div>
                    <div>
                      <label className="font-mono-custom text-[9px] text-[#7B8C9E] tracking-widest uppercase block mb-2">Company</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Organisation" className={inp} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono-custom text-[9px] text-[#7B8C9E] tracking-widest uppercase block mb-2">Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inp} />
                    </div>
                    <div>
                      <label className="font-mono-custom text-[9px] text-[#7B8C9E] tracking-widest uppercase block mb-2">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" className={inp} />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono-custom text-[9px] text-[#7B8C9E] tracking-widest uppercase block mb-2">Requirement *</label>
                    <select name="requirement" required value={form.requirement} onChange={handleChange} className={`${inp} appearance-none cursor-pointer`}>
                      <option value="" disabled>Select requirement type</option>
                      {['Aerospace','Defence','Machining','Composites','Fabrication','Assembly','Coatings','Additive Manufacturing','Other'].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-mono-custom text-[9px] text-[#7B8C9E] tracking-widest uppercase block mb-2">Message *</label>
                    <textarea name="message" required value={form.message} onChange={handleChange} rows={4}
                      placeholder="Describe your engineering or manufacturing requirement..."
                      className={`${inp} resize-none`} />
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <p className="text-[#B0BECE] text-xs font-mono-custom">* Required fields</p>
                    <button type="submit"
                      className="bg-[#CC2B2B] text-white font-display font-bold text-xs tracking-widest uppercase px-10 py-4 rounded hover:bg-[#A82020] hover:scale-105 transition-all duration-200 shadow-md shadow-[#CC2B2B]/25">
                      Submit Enquiry →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ FINAL CTA ═══════════════════════════════════════ */}
      <section className="py-20 bg-[#EEF2FF] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#CC2B2B]/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#1C2B8C]/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        <div ref={ctaRef} className="relative max-w-[1400px] mx-auto px-6 text-center">
          <div className="font-mono-custom text-[#CC2B2B] text-[10px] tracking-[0.32em] uppercase mb-4 font-semibold">
            Engineering Today · Building for Tomorrow
          </div>
          <h2 className="font-display font-bold text-[#1C2B8C] mb-5 leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
            Ready to Engineer<br />What Comes Next?
          </h2>
          <p className="text-[#7B8C9E] text-lg mb-10 max-w-md mx-auto">
            Talk to our team about your aerospace, defence or advanced manufacturing requirement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#CC2B2B] text-white font-display font-bold text-sm tracking-widest uppercase px-10 py-4 rounded hover:bg-[#A82020] hover:scale-105 transition-all duration-200 shadow-lg shadow-[#CC2B2B]/20">
              Contact Us →
            </button>
            <button
              onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-[#1C2B8C] text-[#1C2B8C] font-display font-bold text-sm tracking-widest uppercase px-10 py-4 rounded hover:bg-[#1C2B8C] hover:text-white transition-all duration-200">
              Explore Capabilities
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════ */}
      <footer className="bg-[#F7F9FF] border-t border-[#E2E8F4] pt-14 pb-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-1">
              <div className="mb-5">
                <LogoMark height={52} />
              </div>
              <p className="text-[#7B8C9E] text-sm leading-relaxed mb-4">
                Precision engineering and advanced manufacturing for aerospace and defence. A subsidiary of Airfloa Rail Technologies Limited.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#CC2B2B] animate-pulse-dot" />
                <span className="font-mono-custom text-[9px] tracking-widest uppercase text-[#7B8C9E]">Tamil Nadu, India</span>
              </div>
            </div>
            <div>
              <h4 className="font-mono-custom text-[9px] tracking-widest uppercase text-[#1C2B8C] mb-5 font-semibold">Navigate</h4>
              <ul className="space-y-2.5">
                {[['hero','Home'],['about','About'],['capabilities','Capabilities'],['industries','Industries'],['facilities','Infrastructure'],['projects','Projects'],['contact','Contact']].map(([id,label]) => (
                  <li key={id}>
                    <button onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-[#7B8C9E] text-sm hover:text-[#1C2B8C] transition-colors duration-200 text-left">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono-custom text-[9px] tracking-widest uppercase text-[#1C2B8C] mb-5 font-semibold">Capabilities</h4>
              <ul className="space-y-2.5">
                {['Precision Machining','Composite Mfg','Fabrication & Welding','Assembly','Specialised Coatings','Additive Manufacturing'].map(c => (
                  <li key={c}>
                    <button onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-[#7B8C9E] text-sm hover:text-[#1C2B8C] transition-colors duration-200 text-left">
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono-custom text-[9px] tracking-widest uppercase text-[#1C2B8C] mb-5 font-semibold">Contact</h4>
              <address className="not-italic space-y-3 text-sm text-[#7B8C9E] leading-relaxed mb-5">
                <p>127, Mettupalayam Road,<br />Panruti, Sriperumbudur,<br />Kancheepuram – 631604,<br />Tamil Nadu, India</p>
                <a href="tel:+919444431234" className="hover:text-[#1C2B8C] transition-colors block font-semibold text-[#3D4F6B]">+91 94444 31234</a>
              </address>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#CC2B2B] text-white font-display font-bold text-[10px] tracking-widest uppercase px-5 py-2.5 rounded hover:bg-[#A82020] hover:scale-105 transition-all duration-200">
                Enquire Now
              </button>
            </div>
          </div>
          <div className="border-t border-[#E2E8F4] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B0BECE] font-mono-custom">
            <span>© {new Date().getFullYear()} Sree Dakssnaa Aerospace & Defence India Pvt Ltd. All rights reserved.</span>
            <div className="flex gap-5">
              <span className="hover:text-[#7B8C9E] cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-[#7B8C9E] cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur border-t border-[#E2E8F4] shadow-lg lg:hidden z-40">
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full flex items-center justify-center gap-2 bg-[#CC2B2B] text-white font-display font-bold text-xs tracking-widest uppercase py-4 rounded hover:bg-[#A82020] transition-colors shadow-md shadow-[#CC2B2B]/25">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Enquire With Us
        </button>
      </div>
    </div>
  );
}
