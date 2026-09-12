import { useState } from 'react';
import { Link } from 'react-router';
import { useScrollAnimation, useStaggerReveal } from '../hooks/useScrollAnimation';

const allProjects = [
  {
    title: 'Mock-up Cockpit for AMCA',
    industry: 'Aerospace',
    customer: 'ADA',
    desc: 'Full-scale mock-up cockpit fabrication for the Advanced Medium Combat Aircraft programme — a structurally representative assembly for fit and function validation.',
    technical: 'Sheet metal fabrication, composite structure, ergonomic cockpit layout',
    img: 'https://images.unsplash.com/photo-1569154941061-e231b4aa8eda?w=700&h=500&fit=crop&auto=format',
    filters: ['Aerospace', 'Structures'],
  },
  {
    title: 'Modular Cockpit Shell — LCA AF Mk2',
    industry: 'Aerospace',
    customer: 'ADA / HAL',
    desc: 'Modular cockpit shell assembly for the LCA Tejas Air Force Mk2 variant, produced to programme-specific structural and dimensional requirements.',
    technical: 'Structural fabrication, composites, assembly integration',
    img: 'https://images.unsplash.com/photo-1486611367184-6bd4b46cbc8b?w=700&h=500&fit=crop&auto=format',
    filters: ['Aerospace', 'Structures', 'Composites'],
  },
  {
    title: 'Full-Scale Fighter Cockpit Shell — Jaguar Simulator',
    industry: 'Simulation',
    customer: 'HAL',
    desc: 'Full-scale fighter aircraft cockpit shell fabricated for a Jaguar flight simulator, representative of the operational aircraft cockpit geometry.',
    technical: 'High-fidelity structural fabrication, cockpit geometry replication, assembly',
    img: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=700&h=500&fit=crop&auto=format',
    filters: ['Simulation', 'Structures', 'Aerospace'],
  },
  {
    title: 'LCA Tejas Avionics Part Task Trainer',
    industry: 'Simulation',
    customer: 'HAL / ADA',
    desc: 'Structural assembly for an LCA Tejas avionics part task trainer, used for aircrew familiarisation and avionics systems training.',
    technical: 'Precision fabrication, avionics integration structure, composite panels',
    img: 'https://images.unsplash.com/photo-1544983572-34ba24a3b2a7?w=700&h=500&fit=crop&auto=format',
    filters: ['Simulation', 'Aerospace'],
  },
  {
    title: 'Aircraft Intake Duct',
    industry: 'Aerospace',
    customer: 'On Request',
    desc: 'Precision-fabricated aircraft intake duct component, manufactured to aerodynamic and structural specification for integration into an airframe programme.',
    technical: 'Sheet metal forming, precision fabrication, aero surface finish',
    img: 'https://images.unsplash.com/photo-1569154941061-e231b4aa8eda?w=700&h=500&fit=crop&auto=format',
    filters: ['Aerospace', 'Engineering'],
  },
  {
    title: 'Stealth Paint / Coating Application',
    industry: 'Defence',
    customer: 'On Request',
    desc: 'Specialist stealth paint and coating application for defence platforms, requiring controlled environment application and precision surface preparation.',
    technical: 'Surface preparation, stealth coating application, quality validation',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=500&fit=crop&auto=format',
    filters: ['Defence', 'Engineering'],
  },
  {
    title: 'T-90 Pre-Heater / Main Battle Tank',
    industry: 'Defence',
    customer: 'HVF Chennai',
    desc: 'Pre-heater system and associated fabricated components for the T-90 main battle tank, supporting Indian Army platform maintenance and production.',
    technical: 'Precision machining, sheet metal fabrication, assembly',
    img: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=700&h=500&fit=crop&auto=format',
    filters: ['Defence'],
  },
  {
    title: 'Complete Hull Structure',
    industry: 'Defence',
    customer: 'On Request',
    desc: 'Manufacturing of a complete hull structure for a defence vehicle programme, involving structural fabrication, welding and dimensional verification.',
    technical: 'Structural fabrication, welding, dimensional control, assembly',
    img: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=700&h=500&fit=crop&auto=format',
    filters: ['Defence', 'Structures'],
  },
  {
    title: 'Turret Structure with Traverse Table & Hatches',
    industry: 'Defence',
    customer: 'On Request',
    desc: 'Fabricated turret structure including traverse table mechanism and hatch assemblies for an armoured vehicle programme.',
    technical: 'Structural fabrication, mechanism assembly, hatch integration',
    img: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=700&h=500&fit=crop&auto=format',
    filters: ['Defence', 'Structures'],
  },
  {
    title: 'Railway Wagon Hood Structure',
    industry: 'Rail',
    customer: 'BEML / Indian Railways',
    desc: 'Hood structure fabrication for railway wagons, drawing on the group\'s established heritage in rolling stock interior and structural manufacturing.',
    technical: 'Sheet metal fabrication, structural welding, assembly',
    img: 'https://images.unsplash.com/photo-1474487548417-781cb6d646b3?w=700&h=500&fit=crop&auto=format',
    filters: ['Rail', 'Structures'],
  },
];

const filterOptions = ['All', 'Aerospace', 'Defence', 'Rail', 'Simulation', 'Structures', 'Composites', 'Engineering'];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const heroRef  = useScrollAnimation({ variant: 'fade-up' });
  const gridRef  = useStaggerReveal(70, { variant: 'fade-up', duration: 550 });

  const filtered = filter === 'All' ? allProjects : allProjects.filter(p => p.filters.includes(filter));

  return (
    <div className="min-h-screen bg-[#071A33] pt-20">
      <div className="relative py-20 bg-[#151A21] grid-overlay-fine">
        <div ref={heroRef} className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Portfolio</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white">Engineering In Action</h1>
          <p className="text-white/50 text-base mt-4 max-w-xl">
            Delivered programmes spanning aerospace structures, defence platforms, simulation systems and rail.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#1D6FA5]/15 bg-[#0A1929] sticky top-[64px] z-30">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {filterOptions.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 font-mono-custom text-[9px] tracking-widest uppercase px-4 py-2 border transition-all ${filter === f ? 'bg-[#F5B72C] text-[#071A33] border-[#F5B72C]' : 'border-[#1D6FA5]/30 text-white/50 hover:text-white hover:border-[#F5B72C]/40'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.title} data-anim-child="true" className="project-card hover-lift border border-[#1D6FA5]/20 bg-[#0A1929] overflow-hidden group relative hover:border-[#F5B72C]/30 transition-colors">
                <div className="aspect-[16/10] overflow-hidden bg-[#0B4F8A]/10">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.filters.map(f => (
                      <span key={f} className="font-mono-custom text-[9px] text-[#F5B72C]/70 tracking-widest uppercase border border-[#F5B72C]/20 px-2 py-0.5">{f}</span>
                    ))}
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2 leading-snug">{p.title}</h3>
                  <div className="font-mono-custom text-[10px] text-[#F5B72C]/60 tracking-wider mb-4">{p.customer}</div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="border-t border-[#1D6FA5]/15 pt-4">
                    <div className="font-mono-custom text-[9px] text-white/30 tracking-wider uppercase mb-1">Technical</div>
                    <div className="font-mono-custom text-[10px] text-white/40">{p.technical}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/30 font-display">No projects in this category.</div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#0B4F8A]">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">Have a similar requirement?</h3>
            <p className="text-white/60 text-sm mt-1">Tell us about your programme and we'll assess our fit.</p>
          </div>
          <Link to="/contact" className="bg-[#F5B72C] text-[#071A33] font-display font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber-300 transition-colors flex-shrink-0">
            Enquire With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
