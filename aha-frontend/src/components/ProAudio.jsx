import React from 'react';

export default function ProAudio() {
  return (
    <section id="pro-audio" className="py-20 sm:py-32 bg-brandDark border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-20">
          <div className="inline-block mb-4 px-4 py-1 border border-brandTeal/30 rounded-full bg-brandTeal/5">
            <span className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em]">Maintenance Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight">Pro Audio &<br/><span className="text-brandTeal">Preventive Maintenance.</span></h2>
        </div>

        <div className="bg-brandDark-900 border-l-4 border-brandTeal p-6 sm:p-10 md:p-16 rounded-sm shadow-2xl">
          <p className="mb-8 sm:mb-10 text-slate-400 leading-relaxed max-w-4xl text-sm sm:text-base">Like high-performance machinery, commercial audio equipment requires rigorous, scheduled maintenance to ensure longevity and prevent catastrophic failures during critical events.</p>
          
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3">
              <h5 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-brandTeal rounded-full flex-shrink-0"></span> Thermal Deep Cleaning
              </h5>
              <p className="text-slate-400 text-sm">We clear fan intakes and deep-clean heat sinks to prevent thermal-induced shutdowns.</p>
            </div>
            <div className="space-y-3">
              <h5 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-brandTeal rounded-full flex-shrink-0"></span> Impedance Sweep
              </h5>
              <p className="text-slate-400 text-sm">Periodic testing to detect deteriorating speaker voice coils before they blow your amplifiers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
