import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-brandDark-900 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-10">
          <img src="/logo.png" alt="AHA Technologies Logo" className="h-16 object-contain opacity-50" />
        </div>
        <div className="flex justify-center gap-6 mb-16 flex-wrap">
          <a href="#home" className="text-[10px] font-black text-slate-400 hover:text-brandTeal tracking-[0.2em] transition-colors">HOME</a>
          <a href="#legacy" className="text-[10px] font-black text-slate-400 hover:text-brandTeal tracking-[0.2em] transition-colors">OUR LEGACY</a>
          <a href="#gallery" className="text-[10px] font-black text-slate-400 hover:text-brandTeal tracking-[0.2em] transition-colors">GALLERY</a>
          <a href="#pcb-repair" className="text-[10px] font-black text-slate-400 hover:text-brandTeal tracking-[0.2em] transition-colors">L4 PCB REPAIR</a>
          <a href="#installation" className="text-[10px] font-black text-slate-400 hover:text-brandTeal tracking-[0.2em] transition-colors">INSTALLATION</a>
          <a href="#pro-audio" className="text-[10px] font-black text-slate-400 hover:text-brandTeal tracking-[0.2em] transition-colors">PRO AUDIO</a>
        </div>
        <div className="text-center text-[10px] text-slate-600 font-bold tracking-widest uppercase">
          &copy; 2026 AHA Technologies Bangalore. All Rights Reserved. Est 1991.
        </div>
      </div>
    </footer>
  );
}
