import { useState } from 'react';
import { Link } from 'react-router';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const tabs = ['LASER', 'CNC', 'PUNCHING', 'MACHINING', 'WELDING', 'ADDITIVE', 'COMPOSITES'] as const;
type Tab = typeof tabs[number];

const machineData: Record<Tab, Array<{ name: string; desc: string; specs: [string, string][]; img: string }>> = {
  LASER: [
    {
      name: 'Mitsubishi ML3015SR',
      desc: 'High-speed, high-precision fiber laser cutting system with flying optics and automatic pallet changer.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Model', 'ML3015SR'],
        ['Drive System', 'Flying optics (3-axis beam travel)'],
        ['Control System', 'X-Y-Z simultaneous 3 axis'],
        ['Workpiece Dimensions', '3015 × 1525 mm'],
        ['Stroke X-axis', '3100 mm'],
        ['Stroke Y-axis', '1565 mm'],
        ['Stroke Z-axis', '150 mm'],
        ['Rapid Feed Rate (XY)', 'Max. 140 m/min (combined)'],
        ['Positioning Accuracy XY', '0.01/500 mm'],
        ['Repeatability XY', '±0.01 mm'],
        ['Table Pass Height', '880 mm'],
        ['Footprint', '12500 × 5150 mm'],
        ['Machine Weight', '7500 kg (excl. oscillator)'],
        ['Applicable Oscillator', 'ML32XP'],
      ],
    },
    {
      name: 'Mitsubishi ML3015HV',
      desc: 'Heavy-duty CNC CO₂ laser cutting system built for high-precision sheet metal fabrication.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Type', 'Heavy-duty CNC CO₂ Laser'],
        ['Laser Resonator', '4 kW CO₂'],
        ['Working Area', '3,050 × 1,525 mm'],
        ['Application', 'High-precision sheet metal fabrication'],
        ['Volume', 'High-volume metal cutting'],
      ],
    },
    {
      name: 'Amada ORSUS 3015AJ',
      desc: 'New concept high-speed, high-productivity fibre laser machine with AMNC 4ie controller.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Model', 'ORSUS-3015AJe'],
        ['Registered Model', 'OR3015AJE'],
        ['Axis Travel X×Y×Z', '3070 × 1550 × 100 mm'],
        ['Max Processing Dims X×Y', '3070 × 1550 mm'],
        ['Max Workpiece Mass', '920 kg'],
        ['NC Controller', 'AMNC 4ie'],
        ['Oscillator Options', 'FL-3000U / FL-6000U / FL-8000U'],
        ['Rapid Traverse X×Y', '170 m/min (composite)'],
        ['Least Input Increment', '0.001 mm'],
        ['Axis Control', 'X,Y: Rack & Pinion · Z: Ball Screw'],
      ],
    },
  ],
  CNC: [
    {
      name: 'PL6050L CNC Turning Centre',
      desc: 'High-capacity CNC turning centre for large-diameter rotational components used in aerospace and defence.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Model', 'PL6050L'],
        ['Type', 'Turning Centre'],
        ['Turning Lengths', '1000 mm / 1500 mm / 2000 mm'],
        ['Application', 'Large-diameter aerospace/defence components'],
      ],
    },
  ],
  PUNCHING: [
    {
      name: 'CNC Punch Machine',
      desc: 'High-speed CNC punch press for sheet metal perforation, forming and marking operations.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Width', '6540 mm'],
        ['Depth', '7237 mm'],
        ['Height', '2155 mm'],
        ['Max Stroke Rate (Punching, 1mm)', '900 strokes/min'],
        ['Max Stroke Rate (Marking)', '1600 strokes/min'],
        ['Punching Range X Axis', '2500 mm'],
        ['Punching Range Y Axis', '1250 mm'],
        ['Max Sheet Thickness', '6.4 mm'],
        ['Max Workpiece Weight', '150 kg'],
        ['Max Punching Force', '165 kN'],
      ],
    },
  ],
  MACHINING: [
    {
      name: 'High Performance Double Column Machining Centre',
      desc: 'Large-capacity double column machining centre for aerospace structures and defence platform components requiring high-precision multi-axis machining.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Table Size', '4000 × 2100 mm'],
        ['Maximum Load', '13 tons'],
        ['X Axis Travel', '4200 mm'],
        ['Y Axis Travel', '2300 mm'],
        ['Z Axis Travel', '1000 mm'],
        ['Spindle Motor (Mitsubishi)', '22/26 kW'],
        ['Speed', '6,000 (8,000, 10,000) rpm'],
        ['Taper', 'BBT-50'],
        ['Rapid Rate (Mitsubishi)', '15/15/12 m/min'],
        ['Cutting Feed Rate', '1 – 10,000 mm/min'],
      ],
    },
  ],
  WELDING: [
    {
      name: 'Panasonic YC-400TX3 TIG Welding',
      desc: 'Industrial inverter TIG welding system for precision aerospace and defence fabrication.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Power Saving', '30–70%'],
        ['Power Factor (PF)', 'More Than 0.9'],
        ['Arc Start', 'H.F. Arc Starting with Pulse Control'],
        ['Process', 'DC TIG / MMA'],
        ['Materials', 'Mild Steel, Stainless Steel, Copper, Titanium'],
        ['Protection', 'Low Voltage, High Voltage, Single Phase, Surge Voltage'],
      ],
    },
    {
      name: 'TIG-250PA AC/DC TIG Welding',
      desc: 'Multi-process TIG welding unit for thin and medium gauge aerospace and defence work.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Type', 'AC/DC TIG'],
        ['Application', 'All electronics welding'],
        ['Process', 'TIG / MMA'],
        ['Arc', 'H.F. Arc Start with Pulse Control'],
        ['Materials', 'Mild Steel, Stainless Steel, Copper, Titanium'],
      ],
    },
    {
      name: 'Amada HRB Press Brake',
      desc: 'Next-generation press brake with AMNC 3i controller supporting IoT-enabled bending processes.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Model', 'HRB Series (HRB 1363)'],
        ['Controller', 'AMNC 3i'],
        ['IoT', "AMADA V-factory supported"],
        ['Application', 'Precision sheet metal bending'],
      ],
    },
  ],
  ADDITIVE: [
    {
      name: 'BLT S450 Additive Manufacturing System',
      desc: 'Industrial selective laser melting system for high-density metal component production from titanium, aluminium, superalloy and steel.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Model', 'BLT S450'],
        ['Process', 'Selective Laser Melting (SLM)'],
        ['Build Dimension', '450 × 450 × 500 mm (W×D×H)'],
        ['Laser Power', '500W×4 / 500W×6 / 500W×8'],
        ['Building Speed', '100 / 150 / 200 cm³/h'],
        ['Materials — Titanium Alloy', 'Supported'],
        ['Materials — Aluminium Alloy', 'Supported'],
        ['Materials — Superalloy', 'Supported'],
        ['Materials — Stainless Steel', 'Supported'],
        ['Materials — High-strength Steel', 'Supported'],
        ['Materials — Tool Steel', 'Supported'],
      ],
    },
  ],
  COMPOSITES: [
    {
      name: 'Composite Manufacturing Facility',
      desc: 'Dedicated composite manufacturing capability for FRP, CFRP and armour-grade panel production. Future 44,000 sq.ft Unit-7 planned exclusively for FRP.',
      img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop&auto=format',
      specs: [
        ['Current Capability', 'FRP / CFRP composite layup'],
        ['Partnership', 'VCI Composites, Canada — Armour-grade composite panels'],
        ['Planned Expansion', '44,000 sq.ft dedicated FRP facility (Unit-7)'],
        ['Target Applications', 'DRDO, CABS, CVRDE & HAL programmes'],
        ['Planned Products', 'Ballistic Skirt Plates, CFRP Footrests, Missile Re-entry Shells'],
        ['Status', 'Expansion under planning — not yet operational'],
      ],
    },
  ],
};

export default function Facilities() {
  const [activeTab, setActiveTab] = useState<Tab>('LASER');
  const [expandedMachine, setExpandedMachine] = useState<string | null>(null);
  const heroRef = useScrollAnimation({ variant: 'fade-up' });

  return (
    <div className="min-h-screen bg-[#071A33] pt-20">
      <div className="relative py-20 bg-[#151A21] grid-overlay-fine overflow-hidden">
        <div ref={heroRef} className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Manufacturing</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-tight">
            Our Facilities
          </h1>
          <p className="text-white/50 text-base mt-4 max-w-xl">
            A digital manufacturing facility equipped with precision German, Japanese and Chinese industrial systems.
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="sticky top-[64px] z-30 bg-[#0A1929] border-b border-[#1D6FA5]/20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setExpandedMachine(null); }}
                className={`flex-shrink-0 font-mono-custom text-[10px] tracking-widest uppercase px-6 py-4 border-b-2 transition-all ${activeTab === tab ? 'border-[#F5B72C] text-[#F5B72C]' : 'border-transparent text-white/40 hover:text-white/70'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Machine cards */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="space-y-6">
            {machineData[activeTab].map(machine => (
              <div key={machine.name} className="border border-[#1D6FA5]/25 bg-[#0A1929] overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-1 bg-[#071A33]/60 relative overflow-hidden">
                    <div className="aspect-[4/3] lg:h-full bg-[#0B4F8A]/10">
                      <div className="absolute inset-0 grid-overlay-fine flex items-center justify-center">
                        <div className="text-center px-8">
                          <div className="w-16 h-16 mx-auto mb-4 border border-[#1D6FA5]/40 flex items-center justify-center">
                            <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#1D6FA5]" fill="none" stroke="currentColor" strokeWidth="1">
                              <rect x="5" y="10" width="30" height="20" />
                              <line x1="5" y1="20" x2="35" y2="20" />
                              <circle cx="20" cy="10" r="3" />
                            </svg>
                          </div>
                          <div className="font-mono-custom text-[9px] text-white/30 tracking-widest uppercase">Equipment</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 p-8">
                    <h3 className="font-display font-bold text-white text-xl mb-2">{machine.name}</h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-6">{machine.desc}</p>
                    <button
                      onClick={() => setExpandedMachine(expandedMachine === machine.name ? null : machine.name)}
                      className="font-mono-custom text-[10px] text-[#F5B72C] tracking-widest uppercase border border-[#F5B72C]/30 px-4 py-2 hover:bg-[#F5B72C]/10 transition-colors"
                    >
                      {expandedMachine === machine.name ? 'Hide Specifications' : 'View Specifications'}
                    </button>
                  </div>
                </div>

                {/* Spec panel */}
                <div className={`overflow-hidden transition-all duration-500 ${expandedMachine === machine.name ? 'max-h-[800px]' : 'max-h-0'}`}>
                  <div className="border-t border-[#1D6FA5]/15 p-8">
                    <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-6">Technical Specifications</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                      {machine.specs.map(([key, val]) => (
                        <div key={key} className="spec-row">
                          <span className="font-mono-custom text-white/40 text-[10px] uppercase tracking-wider">{key}</span>
                          <span className="font-mono-custom text-white text-[11px]">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0B4F8A]">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">Discuss Your Manufacturing Requirement</h3>
            <p className="text-white/60 text-sm mt-1">Our team will assess the best capability fit for your programme.</p>
          </div>
          <Link to="/contact" className="bg-[#F5B72C] text-[#071A33] font-display font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-amber-300 transition-colors flex-shrink-0">
            Enquire With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
