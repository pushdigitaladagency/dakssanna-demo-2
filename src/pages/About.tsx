import { Link } from 'react-router';
import { useScrollAnimation, useStaggerReveal } from '../hooks/useScrollAnimation';

export default function About() {
  const heroRef      = useScrollAnimation({ variant: 'fade-up', duration: 700 });
  const overviewL    = useScrollAnimation({ variant: 'fade-right', duration: 650 });
  const overviewR    = useScrollAnimation({ variant: 'fade-left', duration: 650, delay: 100 });
  const mvRef        = useStaggerReveal(150, { variant: 'scale-up', duration: 600 });
  const compRef      = useStaggerReveal(65, { variant: 'fade-up', duration: 550 });
  const leaderRef    = useStaggerReveal(160, { variant: 'fade-up', duration: 600 });
  const groupRef     = useScrollAnimation({ variant: 'clip-up', duration: 800 });

  return (
    <div className="min-h-screen bg-[#071A33] pt-20">
      {/* Page hero */}
      <div className="relative py-24 overflow-hidden bg-[#151A21] grid-overlay-fine">
        <div ref={heroRef as React.RefObject<HTMLDivElement>} className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">About Us</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-tight max-w-3xl">
            Precision Engineering.<br /><span className="text-[#1D6FA5]">Indian Excellence.</span>
          </h1>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div ref={overviewL as React.RefObject<HTMLDivElement>} className="lg:col-span-2">
              <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Overview</div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">Company Overview</h2>
              <div className="space-y-1">
                {[
                  ['Established', '2024'],
                  ['Sector', 'Aerospace & Defence'],
                  ['Parent Company', 'Airfloa Rail Technologies'],
                  ['Location', 'Tamil Nadu, India'],
                  ['Shareholding', 'Airflow 99% · D. Manikandan 1%'],
                ].map(([k, v]) => (
                  <div key={k} className="spec-row">
                    <span className="font-mono-custom text-white/40 text-[10px] uppercase tracking-wider">{k}</span>
                    <span className="font-mono-custom text-white text-[11px]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div ref={overviewR as React.RefObject<HTMLDivElement>} className="lg:col-span-3 space-y-5 text-white/60 text-base leading-relaxed">
              <p>
                <strong className="text-white">Sree Dakssnaa Aerospace and Defence India Pvt Ltd</strong>, established in 2024,
                focuses on delivering innovative solutions in the Defence and Aerospace sectors. As a subsidiary of Airflow
                Equipment's India Pvt Ltd, we leverage nearly three decades of industry expertise to drive our mission forward.
              </p>
              <p>
                Our parent company M/s Airflow has been a pioneer in Rolling Stock — Interior Furnishing & Car Body, Defence
                and Aerospace — integrating design, analysis, development, fabrication, machining, welding and assembly of metal
                and non-metal turnkey products.
              </p>
              <p>
                Our core competencies span aerospace engineering, military systems integration, and advanced technology development.
                We prioritize innovation, customization, and customer satisfaction to stand out in a demanding market.
              </p>
              <Link to="/about" className="inline-flex items-center gap-3 text-[#F5B72C] font-display text-xs font-semibold tracking-widest uppercase mt-2 hover:gap-6 transition-all duration-300">
                View Capabilities <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#151A21]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-12">Mission & Vision</div>
          <div ref={mvRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div data-anim-child="true" className="hover-lift border border-[#1D6FA5]/30 p-10 h-full border-amber-accent">
              <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-5">Mission</div>
              <p className="font-display text-xl text-white leading-relaxed font-medium">
                "Our company's mission is to provide innovative and reliable defense and aerospace solutions that contribute
                to global security and technological advancement."
              </p>
            </div>
            <div data-anim-child="true" className="hover-lift border border-[#1D6FA5]/30 p-10 h-full">
              <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-5">Vision</div>
              <p className="font-display text-xl text-white leading-relaxed font-medium">
                "The vision is to become a leading player in the industry by delivering cutting-edge products and services."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-24 bg-[#071A33]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Expertise</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-12">Core Competencies</h2>
          <div ref={compRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Aerospace Engineering', desc: 'Design, analysis, and manufacturing of aerospace structures and components.' },
              { title: 'Military Systems Integration', desc: 'Integration of defence systems spanning structures, simulators and vehicle platforms.' },
              { title: 'Advanced Technology Development', desc: 'R&D-led technology development including additive manufacturing and advanced composites.' },
              { title: 'Precision Machining', desc: 'CNC turning, laser processing and double column machining for complex geometries.' },
              { title: 'Composite Manufacturing', desc: 'FRP, CFRP and armour-grade composite panel manufacturing for defence applications.' },
              { title: 'Strategic Partnerships', desc: 'Global technology partnerships with RUBTEC Denmark and VCI Composites Canada.' },
            ].map(c => (
              <div key={c.title} data-anim-child="true" className="hover-lift border border-[#1D6FA5]/20 bg-[#0A1929] p-8">
                <div className="w-6 h-0.5 bg-[#F5B72C] mb-4" />
                <h3 className="font-display font-semibold text-white text-base mb-3">{c.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 border border-[#1D6FA5]/20 bg-[#0A1929] p-6 text-white/55 text-sm leading-relaxed">
            <strong className="text-[#F5B72C] font-mono-custom text-[10px] tracking-widest uppercase">Key Differentiators: </strong>
            Our key differentiators include a highly skilled and experienced team, a strong focus on research and development,
            and strategic partnerships with industry leaders. We prioritize innovation, customization, and customer satisfaction.
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-[#0A1929] grid-overlay-fine">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Leadership</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-12">Management Team</h2>
          <div ref={leaderRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'D. Venkatesan', role: 'Managing Director',
                bio: 'With three decades of experience in manufacturing industries, D. Venkatesan leads the team with strength and integrity. He has been instrumental in establishing a robust foundation for the company, ensuring its competitive edge in the market.',
              },
              {
                name: 'D. Manikandan', role: 'Director',
                bio: 'A mechanical engineering graduate with over 15 years of experience, D. Manikandan spearheads all new initiatives of Airflow. He makes significant strategic and operational decisions that ensure the company meets its objectives.',
              },
            ].map(l => (
              <div key={l.name} data-anim-child="true" className="hover-lift border border-[#1D6FA5]/25 bg-[#071A33] p-10 flex gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-[#0B4F8A]/30 border border-[#1D6FA5]/30 flex items-center justify-center">
                  <span className="font-display font-bold text-[#F5B72C] text-xl">{l.name.split(' ').map(w => w[0]).join('')}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-xl mb-1">{l.name}</h3>
                  <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-widest uppercase mb-4">{l.role}</div>
                  <p className="text-white/55 text-sm leading-relaxed">{l.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Relationship */}
      <section className="py-24 bg-[#071A33]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Group</div>
          <h2 className="font-display font-bold text-3xl text-white mb-10">Group Relationship</h2>
          <div ref={groupRef as React.RefObject<HTMLDivElement>} className="border border-[#1D6FA5]/25 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="hover-lift border border-[#0B4F8A]/40 bg-[#0B4F8A]/10 p-6 text-center">
              <div className="font-display font-bold text-white text-lg mb-1">Airfloa Rail Technologies Ltd</div>
              <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase">Parent / Holding Company</div>
              <div className="font-mono-custom text-white/40 text-[10px] mt-2">99% Shareholding</div>
            </div>
            <div className="text-center text-[#F5B72C] text-3xl font-display">→</div>
            <div className="hover-lift border border-[#F5B72C]/30 bg-[#F5B72C]/5 p-6 text-center">
              <div className="font-display font-bold text-white text-lg mb-1">Sree Dakssnaa Aerospace & Defence India Pvt Ltd</div>
              <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase">Subsidiary</div>
              <div className="font-mono-custom text-white/40 text-[10px] mt-2">Aerospace & Defence Focus</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0B4F8A]">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white">Ready to work with us?</h3>
          <Link to="/contact" className="bg-[#F5B72C] text-[#071A33] font-display font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber-300 hover:scale-105 transition-all flex-shrink-0">
            Enquire With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
