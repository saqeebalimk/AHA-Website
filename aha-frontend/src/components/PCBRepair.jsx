import React from 'react';

export default function PCBRepair() {
  return (
    <section id="pcb-repair" className="py-20 sm:py-32 bg-brandDark relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 sm:mb-20">
          <div className="inline-block mb-4 px-4 py-1 border border-brandTeal/30 rounded-full bg-brandTeal/5">
            <span className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em]">Micro-Electronic Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 sm:mb-8">L4 & Comprehensive <br/><span className="text-brandTeal">PCB Repair Services.</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-20">
          <div className="h-48 sm:h-64 rounded-xl overflow-hidden border border-white/10 group"><img src="/close-up-hands-needle-tipped-tip-service.jpg" alt="Surgical Soldering" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
          <div className="h-48 sm:h-64 rounded-xl overflow-hidden border border-white/10 group"><img src="/high-angle-female-technician-repairing-computer-motherboard.jpg" alt="Motherboard Analysis" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
          <div className="h-48 sm:h-64 rounded-xl overflow-hidden border border-white/10 group"><img src="/computer-with-red-white-cloth-with-red-table-cloth-with-red-table-cloth-with-red-table-cloth-with-white-floral-design.jpg" alt="Bench Testing" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
          <div className="h-48 sm:h-64 rounded-xl overflow-hidden border border-white/10 group"><img src="/old-radio-parts.jpg" alt="Vintage Components" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-slate-400 space-y-8 sm:space-y-12">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Component-Level Mastery</h3>
              <p>In the modern era of consumer electronics, "repair" has unfortunately become synonymous with "replacement." When a high-end Marantz receiver or a Denon amplifier fails, most service centers will simply declare a board "dead" and quote the price of a full module replacement. At AHA Technologies, we operate at **Level 4 (L4) Service Proficiency**. This means we go deep into the microscopic architecture of the PCB to identify and replace the specific failed components.</p>
            </div>
            <div className="bg-brandDark-900 border border-brandTeal/20 p-6 sm:p-8 rounded-xl shadow-inner">
              <h4 className="text-brandTeal font-black mb-4 uppercase tracking-widest text-sm text-center">Repair Specializations</h4>
              <ul className="text-sm space-y-3 list-none p-0">
                <li className="flex items-center gap-2 text-white"><span className="w-1.5 h-1.5 bg-brandTeal rounded-full flex-shrink-0"></span> SMPS Power Units</li>
                <li className="flex items-center gap-2 text-white"><span className="w-1.5 h-1.5 bg-brandTeal rounded-full flex-shrink-0"></span> HDMI & DSP Digital Boards</li>
                <li className="flex items-center gap-2 text-white"><span className="w-1.5 h-1.5 bg-brandTeal rounded-full flex-shrink-0"></span> Speaker Crossover PCBs</li>
                <li className="flex items-center gap-2 text-white"><span className="w-1.5 h-1.5 bg-brandTeal rounded-full flex-shrink-0"></span> Discrete Class-AB Arrays</li>
                <li className="flex items-center gap-2 text-white"><span className="w-1.5 h-1.5 bg-brandTeal rounded-full flex-shrink-0"></span> Logic Control Units</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
