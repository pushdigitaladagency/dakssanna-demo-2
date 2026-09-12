import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link } from 'react-router';

const caps = [
  {
    num: '01', id: 'machining', title: 'Machining',
    overview: 'Precision machining capability spanning CNC turning and high-performance double column machining centres, enabling complex aerospace and defence components.',
    applications: ['Aerospace structural components', 'Defence platform parts', 'Rotational components', 'Large structural assemblies'],
    processes: ['CNC Turning (PL6050L)', 'Double Column Machining', 'Multi-axis positioning', 'High-tolerance finishing'],
    equipment: 'PL6050L CNC Turning Centre (1000/1500/2000mm) · High Performance Double Column Machining Centres (4000×2100mm table, 13t load capacity, 22/26kW Mitsubishi spindle)',
  },
  {
    num: '02', id: 'composites', title: 'Composites',
    overview: 'Advanced composite and FRP manufacturing capability for aerospace structures, defence platforms and armour-grade panel applications.',
    applications: ['Cockpit shells and structures', 'Armour-grade panels', 'Missile re-entry shells', 'Aircraft fairings and skins'],
    processes: ['Fibre Reinforced Polymer (FRP) layup', 'Carbon Fibre (CFRP) manufacturing', 'Armour composite bonding', 'Autoclave and vacuum infusion'],
    equipment: 'Dedicated composite manufacturing facility · Partnership with VCI Composites Canada for armour-grade panel technology',
  },
  {
    num: '03', id: 'fabrication', title: 'Fabrication',
    overview: 'Sheet metal fabrication, forming and structural fabrication using advanced laser, punch and press brake technology.',
    applications: ['Structural enclosures', 'Sheet metal panels', 'Defence vehicle structures', 'Rail wagon structures'],
    processes: ['Laser cutting', 'CNC punching', 'Press brake forming', 'Structural fabrication'],
    equipment: 'Mitsubishi ML3015SR · Mitsubishi ML3015HV · Amada ORSUS 3015AJ · Punch Machines · Amada HRB Press Brake',
  },
  {
    num: '04', id: 'assembly', title: 'Assembly',
    overview: 'Integrated assembly of metal and non-metal turnkey products for aerospace, defence and rail applications.',
    applications: ['Cockpit simulator assembly', 'Defence vehicle hull assembly', 'Rail interior assembly', 'Avionics trainer assembly'],
    processes: ['Structural assembly', 'Mechanical integration', 'Quality verification at assembly', 'Sub-assembly and final assembly'],
    equipment: 'Dedicated assembly bays · Welding and joining equipment',
  },
  {
    num: '05', id: 'coatings', title: 'Coatings',
    overview: 'Specialist surface treatment and coating capability including stealth paint applications for defence platforms.',
    applications: ['Stealth coatings for aircraft', 'Protective surface treatment', 'Corrosion protection', 'Defence platform coatings'],
    processes: ['Stealth paint application', 'Surface preparation', 'Primer and topcoat systems', 'Quality inspection'],
    equipment: 'Coating application facility · Surface treatment equipment',
  },
  {
    num: '06', id: 'quality-rd', title: 'Quality & R&D',
    overview: 'Engineering discipline and research & development capability embedded across all programmes, driving process improvement and technology development.',
    applications: ['Aerospace quality assurance', 'Defence programme validation', 'Process development', 'Technology research'],
    processes: ['In-process inspection', 'Dimensional verification', 'Material qualification', 'Process development and improvement'],
    equipment: 'Quality inspection equipment · R&D resources',
  },
  {
    num: '07', id: 'advanced-manufacturing', title: 'Advanced Manufacturing',
    overview: 'Laser processing, additive manufacturing and digital fabrication for next-generation aerospace and defence components.',
    applications: ['Complex metal 3D printed parts', 'High-speed laser cutting', 'Rapid prototyping', 'Production additive manufacturing'],
    processes: ['Selective Laser Melting (SLM)', 'CO2 laser cutting', 'Fibre laser cutting', 'Digital fabrication'],
    equipment: 'BLT S450 Additive Manufacturing System · Mitsubishi ML3015SR · Amada ORSUS 3015AJ',
  },
  {
    num: '08', id: 'project-management', title: 'Project Management',
    overview: 'End-to-end programme delivery from engineering design and analysis through to manufacturing and final integration.',
    applications: ['Defence system programme management', 'Aerospace sub-system delivery', 'Multi-discipline programme coordination'],
    processes: ['Design and analysis coordination', 'Schedule and resource management', 'Customer interface management', 'Delivery and integration'],
    equipment: 'Experienced programme management team · Group engineering resource',
  },
];

export default function Capabilities() {
  const [active, setActive] = useState<string | null>(null);
  const heroRef = useScrollAnimation({ variant: 'fade-up' });
  const ctaRef = useScrollAnimation({ variant: 'fade-up', delay: 100 });

  return (
    <div className="min-h-screen bg-[#071A33] pt-20">
      <div className="relative py-20 bg-[#151A21] grid-overlay-fine overflow-hidden">
        <div ref={heroRef} className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">What We Do</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-tight">
            Our Capabilities
          </h1>
          <p className="text-white/50 text-base mt-4 max-w-xl">
            Eight integrated manufacturing and engineering disciplines — from machining to composites to advanced manufacturing.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          {caps.map((c, i) => (
            <div key={c.id} className="border-b border-[#1D6FA5]/15 last:border-0">
              <button
                onClick={() => setActive(active === c.id ? null : c.id)}
                className="w-full flex items-center justify-between py-8 text-left group"
              >
                <div className="flex items-center gap-8">
                  <span className="font-mono-custom text-[#F5B72C]/40 text-sm w-8">{c.num}</span>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-white group-hover:text-[#F5B72C] transition-colors">{c.title}</h2>
                </div>
                <span className={`font-mono-custom text-[#F5B72C] text-xl transition-transform duration-300 ${active === c.id ? 'rotate-45' : ''}`}>+</span>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${active === c.id ? 'max-h-[600px] mb-8' : 'max-h-0'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8 pl-16">
                  <div className="lg:col-span-1">
                    <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">Overview</div>
                    <p className="text-white/60 text-sm leading-relaxed">{c.overview}</p>
                  </div>
                  <div>
                    <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">Applications</div>
                    <ul className="space-y-2">
                      {c.applications.map(a => (
                        <li key={a} className="flex items-start gap-2 text-sm text-white/55">
                          <span className="text-[#F5B72C] mt-0.5">—</span>{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">Equipment / Processes</div>
                    <p className="text-white/50 text-xs leading-relaxed font-mono-custom">{c.equipment}</p>
                    <div className="mt-4">
                      {c.processes.map(p => (
                        <span key={p} className="inline-block text-[9px] font-mono-custom text-white/40 border border-[#1D6FA5]/25 px-2 py-1 mr-2 mb-2 tracking-wider">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#0B4F8A]">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">Discuss Your Requirement</h3>
            <p className="text-white/60 text-sm mt-1">Our engineering team is ready to evaluate your programme.</p>
          </div>
          <Link to="/contact" className="bg-[#F5B72C] text-[#071A33] font-display font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber-300 transition-colors flex-shrink-0">
            Enquire With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
