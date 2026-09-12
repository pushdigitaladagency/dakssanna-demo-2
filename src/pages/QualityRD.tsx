import { Link } from 'react-router';
import { useScrollAnimation, useStaggerReveal } from '../hooks/useScrollAnimation';

const pillars = [
  {
    num: '01',
    title: 'Engineering Discipline',
    desc: 'Every programme is approached with engineering rigour — structured analysis, dimensional verification and process control embedded from design to delivery.',
  },
  {
    num: '02',
    title: 'Quality Assurance',
    desc: 'In-process inspection, dimensional verification and material qualification are integral to our manufacturing workflow, not supplementary activities.',
  },
  {
    num: '03',
    title: 'Research & Development',
    desc: 'Active R&D capability focused on process improvement, advanced materials application and technology development for aerospace and defence programmes.',
  },
  {
    num: '04',
    title: 'Advanced Manufacturing Technology',
    desc: 'Investment in additive manufacturing, laser processing and composite fabrication enables our team to engage with next-generation programme requirements.',
  },
  {
    num: '05',
    title: 'Customisation',
    desc: 'Capacity to develop bespoke solutions to programme-specific requirements — from one-off structural mock-ups to series manufacturing of complex assemblies.',
  },
  {
    num: '06',
    title: 'Process Improvement',
    desc: 'Continuous improvement methodology applied to manufacturing processes, reducing cycle time, improving dimensional accuracy and enhancing repeatability.',
  },
];

export default function QualityRD() {
  const heroRef   = useScrollAnimation({ variant: 'fade-up' });
  const pillarsRef = useStaggerReveal(55, { variant: 'fade-up', duration: 500 });
  const rdRef     = useStaggerReveal(100, { variant: 'fade-left', duration: 550 });
  return (
    <div className="min-h-screen bg-[#071A33] pt-20">
      <div className="relative py-20 bg-[#151A21] grid-overlay-fine overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Engineering Excellence</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-tight">
            Quality &<br />Research & Development
          </h1>
          <p className="text-white/50 text-base mt-4 max-w-xl">
            Precision, process discipline and continuous technology development — embedded at the core of every programme.
          </p>
        </div>
      </div>

      {/* Core competencies statement */}
      <section className="py-20 bg-[#071A33]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Our Approach</div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
                Quality Is An Engineering<br />Discipline — Not A Department
              </h2>
            </div>
            <div className="text-white/60 text-base leading-relaxed space-y-4">
              <p>
                At Sree Dakssnaa, quality assurance and research & development are not support functions —
                they are integrated engineering capabilities that shape how every programme is structured, executed and delivered.
              </p>
              <p>
                Our core competencies in aerospace engineering, military systems integration and advanced technology development
                are underpinned by a team with deep manufacturing expertise and a commitment to process discipline.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1D6FA5]/10">
            {pillars.map(p => (
              <div key={p.num} className="bg-[#071A33] border border-[#1D6FA5]/15 p-8">
                <div className="font-mono-custom text-[#F5B72C]/40 text-xs tracking-widest mb-4">{p.num}</div>
                <h3 className="font-display font-semibold text-white text-base mb-3">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Focus Areas */}
      <section className="py-20 bg-[#0A1929] grid-overlay-fine">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Technology Development</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-12">R&D Focus Areas</h2>

          <div className="space-y-6">
            {[
              {
                area: 'Additive Manufacturing',
                detail: 'BLT S450 selective laser melting system enables production of complex metal components from titanium alloy, aluminium alloy, superalloy, stainless steel, high-strength steel and tool steel.',
                maturity: 'Active Capability',
              },
              {
                area: 'Advanced Composite Structures',
                detail: 'R&D into FRP, CFRP and armour-grade composite manufacturing, including ballistic skirt plates, CFRP shells for missile re-entry components and surveillance aircraft structures.',
                maturity: 'Active / Expanding',
              },
              {
                area: 'Stealth & Surface Technology',
                detail: 'Research into stealth paint and coating application methodologies for defence platforms, requiring controlled environment processing and specialist application techniques.',
                maturity: 'Active Capability',
              },
              {
                area: 'High-Precision Laser Processing',
                detail: 'Multi-machine laser cutting capability including Mitsubishi and Amada systems, enabling high-accuracy sheet metal processing for aerospace-grade components.',
                maturity: 'Active Capability',
              },
            ].map(item => (
              <div key={item.area} className="border border-[#1D6FA5]/20 bg-[#071A33] p-8 flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <span className={`font-mono-custom text-[9px] tracking-widest uppercase px-3 py-1.5 border ${item.maturity.includes('Expanding') ? 'border-[#F5B72C]/40 text-[#F5B72C]' : 'border-[#1D6FA5]/40 text-[#1D6FA5]'}`}>
                    {item.maturity}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2">{item.area}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification note */}
      <section className="py-16 bg-[#071A33]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="border border-[#1D6FA5]/20 bg-[#0A1929] p-8">
            <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-4">Quality Standards</div>
            <p className="text-white/60 text-sm leading-relaxed">
              Certification and quality standard details are available on request. As an organisation established in 2024 with a programme
              portfolio that includes defence and aerospace work for organisations such as HAL, ADA and DRDO,
              programme-specific quality and inspection requirements are applied in line with customer and programme standards.
              Contact our team for quality documentation specific to your requirement.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0B4F8A]">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">Discuss Your Technical Requirement</h3>
            <p className="text-white/60 text-sm mt-1">Our engineering team will assess your quality and development needs.</p>
          </div>
          <Link to="/contact" className="bg-[#F5B72C] text-[#071A33] font-display font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber-300 transition-colors flex-shrink-0">
            Enquire With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
