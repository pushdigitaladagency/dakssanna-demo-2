import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', requirement: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full bg-[#071A33] border border-[#1D6FA5]/30 text-white font-body text-sm px-4 py-3 focus:outline-none focus:border-[#F5B72C] transition-colors placeholder:text-white/25";

  return (
    <div className="min-h-screen bg-[#071A33] pt-20">
      <div className="relative py-20 bg-[#151A21] grid-overlay-fine">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="font-mono-custom text-[#F5B72C] text-[10px] tracking-[0.3em] uppercase mb-4">Contact</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white">Start A Conversation</h1>
          <p className="text-white/50 text-base mt-4 max-w-xl">
            Talk to our engineering team about your aerospace, defence or advanced manufacturing requirement.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact info */}
            <div className="lg:col-span-1 space-y-8">
              {[
                {
                  label: 'Call Us',
                  action: 'tel:+919444313234',
                  primary: '+91 9444313234',
                  secondary: 'Mon–Fri, 9:00–18:00 IST',
                },
                {
                  label: 'Send Enquiry',
                  action: null,
                  primary: 'Use the form',
                  secondary: 'We respond within 1 business day',
                },
                {
                  label: 'Visit Us',
                  action: 'https://maps.google.com/?q=Sriperumbudur,Kancheepuram',
                  primary: '127, Mettupalayam Road',
                  secondary: 'Panruti, Sriperumbudur, Kancheepuram – 631604, Tamil Nadu, India',
                },
              ].map(item => (
                <div key={item.label} className="border border-[#1D6FA5]/20 bg-[#0A1929] p-6">
                  <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">{item.label}</div>
                  {item.action ? (
                    <a href={item.action} className="font-display font-semibold text-white text-base hover:text-[#F5B72C] transition-colors block mb-1">{item.primary}</a>
                  ) : (
                    <div className="font-display font-semibold text-white text-base mb-1">{item.primary}</div>
                  )}
                  <div className="text-white/45 text-xs leading-relaxed">{item.secondary}</div>
                </div>
              ))}

              <div className="border border-[#1D6FA5]/20 bg-[#0A1929] p-6">
                <div className="font-mono-custom text-[#F5B72C] text-[9px] tracking-widest uppercase mb-3">Corporate Details</div>
                <div className="space-y-2 text-sm">
                  <div className="spec-row">
                    <span className="font-mono-custom text-white/40 text-[9px] uppercase tracking-wider">Company</span>
                    <span className="text-white text-xs">Sree Dakssnaa A&D India Pvt Ltd</span>
                  </div>
                  <div className="spec-row">
                    <span className="font-mono-custom text-white/40 text-[9px] uppercase tracking-wider">Type</span>
                    <span className="text-white text-xs">Private Limited</span>
                  </div>
                  <div className="spec-row">
                    <span className="font-mono-custom text-white/40 text-[9px] uppercase tracking-wider">Est.</span>
                    <span className="text-white text-xs">2024</span>
                  </div>
                  <div className="spec-row">
                    <span className="font-mono-custom text-white/40 text-[9px] uppercase tracking-wider">Parent</span>
                    <span className="text-white text-xs">Airfloa Rail Technologies Ltd</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="border border-[#F5B72C]/30 bg-[#0A1929] p-12 text-center">
                  <div className="w-16 h-16 border border-[#F5B72C] flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#F5B72C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl mb-3">Enquiry Submitted</h3>
                  <p className="text-white/55 text-sm max-w-sm mx-auto">
                    Thank you for your enquiry. Our engineering team will review your requirement and respond within 1 business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono-custom text-[9px] text-white/40 tracking-widest uppercase block mb-2">Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
                    </div>
                    <div>
                      <label className="font-mono-custom text-[9px] text-white/40 tracking-widest uppercase block mb-2">Company</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Organisation / company" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono-custom text-[9px] text-white/40 tracking-widest uppercase block mb-2">Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="font-mono-custom text-[9px] text-white/40 tracking-widest uppercase block mb-2">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono-custom text-[9px] text-white/40 tracking-widest uppercase block mb-2">Requirement Type *</label>
                    <select name="requirement" required value={form.requirement} onChange={handleChange} className={`${inputClass} appearance-none`}>
                      <option value="" disabled>Select requirement category</option>
                      {['Aerospace', 'Defence', 'Machining', 'Composites', 'Fabrication', 'Assembly', 'Coatings', 'Advanced Manufacturing', 'Other'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-mono-custom text-[9px] text-white/40 tracking-widest uppercase block mb-2">Your Requirement *</label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Describe your engineering or manufacturing requirement..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-white/30 text-xs font-mono-custom">* Required fields</p>
                    <button
                      type="submit"
                      className="bg-[#F5B72C] text-[#071A33] font-display font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-amber-300 transition-colors"
                    >
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-64 bg-[#0A1929] border-t border-[#1D6FA5]/15 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay flex items-center justify-center">
          <div className="text-center">
            <div className="font-display font-semibold text-white text-sm mb-1">Sriperumbudur, Kancheepuram, Tamil Nadu</div>
            <a
              href="https://maps.google.com/?q=Sriperumbudur+Kancheepuram+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-custom text-[#F5B72C] text-[10px] tracking-widest uppercase border border-[#F5B72C]/30 px-4 py-2 hover:bg-[#F5B72C]/10 transition-colors inline-block mt-3"
            >
              View Location →
            </a>
          </div>
        </div>
        {/* Grid coordinate decorators */}
        <div className="absolute top-4 left-4 font-mono-custom text-[9px] text-[#1D6FA5]/40 tracking-wider">12.7397° N, 79.9662° E</div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#071A33]/95 backdrop-blur-md border-t border-[#1D6FA5]/20 lg:hidden z-40">
        <a href="tel:+919444313234" className="flex items-center justify-center gap-3 bg-[#F5B72C] text-[#071A33] font-display font-bold text-xs tracking-widest uppercase py-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Call Us Now
        </a>
      </div>
    </div>
  );
}
