import React from 'react';

export default function Installation() {
  return (
    <section id="installation" className="py-20 sm:py-32 bg-brandDark-900 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 sm:mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 border border-brandTeal/30 rounded-full bg-brandTeal/5">
            <span className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em]">Master Integration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight">Architectural Audio: <br/><span className="text-brandTeal">Residential & Commercial.</span></h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Procuring world-class audio equipment is merely the first step. At AHA Technologies, we bridge the complex gap between high-end electronics and architectural environments.
          </p>
        </div>

        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 border-b border-white/10 pb-4">Dedicated Home Cinemas</h3>
          
          {/* Mobile: single column stack. md+: masonry-style 2-col layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[500px]">
            <div className="rounded-xl overflow-hidden border border-white/10 group h-56 sm:h-72 md:h-full md:row-span-2 relative shadow-2xl">
              <img src="/home-theatre.jpg" alt="Reference Home Theatre" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 sm:p-6">
                <span className="text-white font-bold tracking-widest text-xs sm:text-sm">REFERENCE DOLBY ATMOS CINEMAS</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 group h-48 sm:h-64 md:h-[242px] relative shadow-2xl">
              <img src="/large-screen-with-picture-plane-it.jpg" alt="Large Screen Projection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 sm:p-6">
                <span className="text-white font-bold tracking-widest text-xs sm:text-sm">LARGE FORMAT PROJECTION</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 group h-48 sm:h-64 md:h-[242px] relative shadow-2xl">
              <img src="/home_theatre_1.jpg" alt="Luxury Architectural Integration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 sm:p-6">
                <span className="text-white font-bold tracking-widest text-xs sm:text-sm">LUXURY ARCHITECTURAL INTEGRATION</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 border-b border-white/10 pb-4">Commercial Integration & Enterprise Scale</h3>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-5xl">
            From corporate boardrooms requiring pristine speech intelligibility to vast hospitality venues needing perfectly balanced background audio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          <div className="bg-brandDark border border-white/5 rounded-xl overflow-hidden group shadow-2xl">
            <div className="h-44 sm:h-48 overflow-hidden relative">
              <img src="/magnific__talk__27829.png" alt="Corporate UC Integration" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-5 sm:p-6">
              <h4 className="text-brandTeal font-bold text-base sm:text-lg mb-2 sm:mb-3">Corporate & UC Environments</h4>
              <p className="text-slate-400 text-sm leading-relaxed">We install sophisticated beamforming microphone arrays that automatically track active speakers while rejecting HVAC noise.</p>
            </div>
          </div>
          
          <div className="bg-brandDark border border-white/5 rounded-xl overflow-hidden group shadow-2xl">
            <div className="h-44 sm:h-48 overflow-hidden relative">
              <img src="/magnific_2954100228.png" alt="Architectural Commercial Scale" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-5 sm:p-6">
              <h4 className="text-brandTeal font-bold text-base sm:text-lg mb-2 sm:mb-3">Distributed Audio & IP Scale</h4>
              <p className="text-slate-400 text-sm leading-relaxed">To overcome signal degradation over massive footprints, we deploy 70V/100V constant-voltage systems and Audio over IP.</p>
            </div>
          </div>

          <div className="bg-brandDark border border-white/5 rounded-xl overflow-hidden group shadow-2xl sm:col-span-2 lg:col-span-1">
            <div className="h-44 sm:h-48 overflow-hidden relative">
              <img src="/worker-check-speaker-factory.jpg" alt="Pre-Installation QA" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-5 sm:p-6">
              <h4 className="text-brandTeal font-bold text-base sm:text-lg mb-2 sm:mb-3">Industrial QA & Bench Testing</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Before commercial deployment, enterprise hardware undergoes rigorous bench-testing at our facility.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
