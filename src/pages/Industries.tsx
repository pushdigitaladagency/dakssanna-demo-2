import { Link } from 'react-router';

const industries = [
  {
    id: 'aerospace',
    title: 'Aerospace',
    label: 'Fixed-Wing & Rotary',
    img: 'https://images.unsplash.com/photo-1569154941061-e231b4aa8eda?w=800&h=500&fit=crop&auto=format',
    desc: 'Precision-engineered aerospace structures and components including cockpit shells, intake ducts, aircraft skins and composite assemblies for India\'s indigenous aviation programmes.',
    capabilities: ['Cockpit structure fabrication', 'Composite panel manufacturing', 'Intake duct fabrication', 'Aircraft structural assemblies'],
    customers: ['HAL', 'ADA', 'DRDO'],
    projects: ['Mock-up cockpit for AMCA', 'Modular cockpit shell for LCA AF Mk2', 'Aircraft intake duct'],
  },
  {
    id: 'defence',
    title: 'Defence',
    label: 'Land & Armoured Platforms',
    img: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&h=500&fit=crop&auto=format',
    desc: 'Defence manufacturing encompassing armoured vehicle structures, hull systems, turret assemblies and stealth coating applications for Indian Army programmes.',
    capabilities: ['Hull structure manufacturing', 'Turret and traverse table assembly', 'Stealth paint / coating application', 'Armour composite panel integration'],
    customers: ['HVF Chennai', 'DRDO', 'CVRDE'],
    projects: ['T90 pre-heater / main battle tank', 'Complete hull structure', 'Turret structure with traverse table & hatches', 'Stealth paint / coating'],
  },
  {
    id: 'simulation',
    title: 'Simulation',
    label: 'Flight Simulators & Trainers',
    img: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&h=500&fit=crop&auto=format',
    desc: 'High-fidelity cockpit and airframe structures for flight simulation and avionics training systems used by the Indian Air Force and defence research programmes.',
    capabilities: ['Full-scale cockpit shell fabrication', 'Avionics part task trainer structures', 'Composite simulation structures'],
    customers: ['HAL', 'ADA'],
    projects: ['Full-scale fighter aircraft cockpit shell for Jaguar simulator', 'LCA Tejas avionics part task trainer'],
  },
  {
    id: 'rail',
    title: 'Rail & Transportation',
    label: 'Rolling Stock',
    img: 'https://images.unsplash.com/photo-1474487548417-781cb6d646b3?w=800&h=500&fit=crop&auto=format',
    desc: 'Structural fabrication and component manufacturing for the rail and transportation sector, drawing on the group\'s deep heritage in rolling stock and interior systems.',
    capabilities: ['Wagon structural fabrication', 'Rolling stock interior systems', 'Sheet metal fabrication for rail', 'Assembly and integration'],
    customers: ['BEML', 'Indian Railways', 'RITES', 'ALSTOM', 'BOMBARDIER'],
    projects: ['Railway wagon hood structure'],
  },
];

export default function Industries() {
  return (
    <div className="min-h-screen bg-[#071A33] pt-20">
      <div className="relative py-20 bg-[#151A21] grid-overlay-fine">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Markets</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white">Industries Served</h1>
          <p className="text-white/50 text-base mt-4 max-w-xl">
            Delivering engineered manufacturing solutions across aerospace, defence, simulation and rail.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 space-y-20">
          {industries.map((ind, i) => (
            <div key={ind.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {i % 2 === 0 ? (
                <>
                  <div className="relative">
                    <img src={ind.img} alt={ind.title} className="w-full aspect-[16/10] object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 font-mono-custom text-[10px] text-[#F5B72C] tracking-widest uppercase border border-[#F5B72C]/30 px-3 py-1.5 bg-[#071A33]/80">
                      {ind.label}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">0{i + 1}</div>
                    <h2 className="font-display font-bold text-4xl text-white mb-5">{ind.title}</h2>
                    <p className="text-white/60 text-base leading-relaxed mb-8">{ind.desc}</p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div>
                        <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">Capabilities</div>
                        <ul className="space-y-1.5">
                          {ind.capabilities.map(c => <li key={c} className="text-white/50 text-xs flex gap-2"><span className="text-[#F5B72C]">—</span>{c}</li>)}
                        </ul>
                      </div>
                      <div>
                        <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">Industry Ecosystem</div>
                        <ul className="space-y-1.5">
                          {ind.customers.map(c => <li key={c} className="text-white/50 text-xs font-mono-custom">{c}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">Relevant Projects</div>
                      <div className="space-y-2">
                        {ind.projects.map(p => (
                          <div key={p} className="border border-[#1D6FA5]/20 px-4 py-2 text-white/55 text-xs font-mono-custom">{p}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">0{i + 1}</div>
                    <h2 className="font-display font-bold text-4xl text-white mb-5">{ind.title}</h2>
                    <p className="text-white/60 text-base leading-relaxed mb-8">{ind.desc}</p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div>
                        <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">Capabilities</div>
                        <ul className="space-y-1.5">
                          {ind.capabilities.map(c => <li key={c} className="text-white/50 text-xs flex gap-2"><span className="text-[#F5B72C]">—</span>{c}</li>)}
                        </ul>
                      </div>
                      <div>
                        <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">Industry Ecosystem</div>
                        <ul className="space-y-1.5">
                          {ind.customers.map(c => <li key={c} className="text-white/50 text-xs font-mono-custom">{c}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">Relevant Projects</div>
                      <div className="space-y-2">
                        {ind.projects.map(p => (
                          <div key={p} className="border border-[#1D6FA5]/20 px-4 py-2 text-white/55 text-xs font-mono-custom">{p}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img src={ind.img} alt={ind.title} className="w-full aspect-[16/10] object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 font-mono-custom text-[10px] text-[#F5B72C] tracking-widest uppercase border border-[#F5B72C]/30 px-3 py-1.5 bg-[#071A33]/80">
                      {ind.label}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#151A21]">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">Does your programme fit our capability?</h3>
            <p className="text-white/60 text-sm mt-1">Talk to our engineers about your requirement.</p>
          </div>
          <Link to="/contact" className="bg-[#F5B72C] text-[#071A33] font-display font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber-300 transition-colors flex-shrink-0">
            Start A Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
