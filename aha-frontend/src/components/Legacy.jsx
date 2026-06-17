import React from 'react';

export default function Legacy() {
  return (
    <section id="legacy" className="py-16 sm:py-24 bg-brandDark-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image col — relative so the badge is constrained inside it */}
          <div className="lg:col-span-5 relative pb-8 lg:pb-0">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-10">
              <img src="/audio_brands_2.png" alt="AHA Technologies Heritage" className="w-full h-auto object-cover hover:scale-105 transition-all duration-700" />
            </div>
            {/* Badge — absolute inside the relative parent, offset so it stays visible */}
            <div className="absolute bottom-0 right-0 sm:-bottom-2 sm:-right-2 bg-brandTeal p-5 sm:p-8 rounded-xl shadow-2xl border-4 border-brandDark-900 z-20">
              <div className="text-white text-center">
                <span className="block text-3xl sm:text-4xl font-black">50+</span>
                <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-1">Combined Years <br/>Expertise</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-block px-4 py-1 border border-brandTeal/30 rounded-full bg-brandTeal/5">
              <span className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em]">Our History & Commitment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">A Legacy of Sound <br/><span className="text-brandTeal">Since 1991.</span></h2>
            
            <div className="prose prose-invert prose-lg text-slate-400 max-w-none space-y-4 sm:space-y-5 text-sm leading-relaxed">
              <p>
                Bangalore has always been the technological heartbeat of India, and for over three decades, AHA Technologies has been the trusted guardian of its high-fidelity sound. Our journey began in 1991...
              </p>
              <p>
                AHA Technologies wasn't simply built on a business model; it was forged from an uncompromising passion for sonic perfection...
              </p>
              <p>
                What truly sets us apart is our <strong>Collective Expertise</strong>. The combined technical knowledge of our bench staff exceeds 50 years...
              </p>
              <p>
                At the absolute core of AHA Technologies are three non-negotiable pillars:
              </p>
              <ul className="space-y-3 list-none p-0 mt-4">
                <li className="flex gap-3 sm:gap-4 items-start">
                  <span className="text-brandTeal font-bold mt-0.5 flex-shrink-0">01.</span>
                  <span><strong>Uncompromising Service Quality:</strong> We specialize in complex Level 4 PCB repair...</span>
                </li>
                <li className="flex gap-3 sm:gap-4 items-start">
                  <span className="text-brandTeal font-bold mt-0.5 flex-shrink-0">02.</span>
                  <span><strong>Genuineness Guaranteed:</strong> Every capacitor, transistor, and logic chip we utilize is sourced through authorized...</span>
                </li>
                <li className="flex gap-3 sm:gap-4 items-start">
                  <span className="text-brandTeal font-bold mt-0.5 flex-shrink-0">03.</span>
                  <span><strong>Pioneering After-Sales Support:</strong> Our relationship doesn't end when a repaired unit is delivered...</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
