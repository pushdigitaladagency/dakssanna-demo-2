import React from 'react';
import { LogoMark } from './Logo';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Footer() {
  const footerRef = useScrollAnimation({ variant: 'fade-up', duration: 700, threshold: 0.05 });

  return (
    <footer className="bg-[#0D1230] border-t border-[#1C2B8C]/30 pt-16 pb-8">
      <div ref={footerRef as unknown as React.RefObject<HTMLDivElement>} className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <LogoMark height={48} />
              <div>
                <div className="font-display font-bold text-white text-base leading-tight">SREE DAKSSNAA</div>
                <div className="font-mono-custom text-[#8AABF0] text-[8px] tracking-[0.2em] uppercase leading-tight">
                  Aerospace & Defence<br />India Pvt. Ltd.
                </div>
              </div>
            </div>
            <p className="text-white/45 text-sm leading-relaxed mb-4">
              Precision engineering and advanced manufacturing for aerospace and defence applications.
              A subsidiary of Airfloa Rail Technologies Limited.
            </p>
            <div className="flex items-center gap-2 text-[#8AABF0]">
              <div className="w-2 h-2 rounded-full bg-[#3D58D8] animate-pulse-blue" />
              <span className="font-mono-custom text-[10px] tracking-widest uppercase">Tamil Nadu, India</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-[#8AABF0] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'About', id: 'about' },
                { label: 'Capabilities', id: 'capabilities' },
                { label: 'Infrastructure', id: 'facilities' },
                { label: 'Projects', id: 'projects' },
                { label: 'Partners', id: 'partnerships' },
                { label: 'Contact', id: 'contact' },
              ].map(l => (
                <li key={l.label}>
                  <button onClick={() => scrollTo(l.id)} className="text-white/45 text-sm hover:text-[#E84D1E] transition-colors duration-200">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-[#8AABF0] mb-5">Capabilities</h4>
            <ul className="space-y-3">
              {['Precision Machining', 'Composite Manufacturing', 'Fabrication & Welding', 'Assembly', 'Specialised Coatings', 'Additive Manufacturing'].map(c => (
                <li key={c}>
                  <button onClick={() => scrollTo('capabilities')} className="text-white/45 text-sm hover:text-[#E84D1E] transition-colors duration-200 text-left">{c}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-[#8AABF0] mb-5">Contact</h4>
            <address className="not-italic space-y-3 text-sm text-white/45 leading-relaxed">
              <p>127, Mettupalayam Road,<br />Panruti, Sriperumbudur,<br />Kancheepuram – 631604,<br />Tamil Nadu, India</p>
              <a href="tel:+919444431234" className="hover:text-[#E84D1E] transition-colors block">+91 94444 31234</a>
            </address>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-block mt-5 border border-[#E84D1E] text-[#E84D1E] font-display font-semibold text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#E84D1E] hover:text-[#07102E] hover:scale-105 transition-all duration-200"
            >
              Start A Conversation
            </button>
          </div>
        </div>

        <div className="border-t border-[#1C2B8C]/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 font-mono-custom">
          <span>© {new Date().getFullYear()} Sree Dakssnaa Aerospace & Defence India Pvt Ltd. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-white/60 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
