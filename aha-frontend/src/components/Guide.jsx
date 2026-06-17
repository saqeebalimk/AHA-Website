import React from 'react';

export default function Guide() {
  return (
    <section id="guide" className="py-16 sm:py-24 bg-brandDark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">The AHA Audio Guide</h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">Master your listening experience. Whether you are building a pure stereo setup or a fully immersive home theatre, understanding the fundamentals is key to audio nirvana.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-8">
          <div className="bg-brandDark border border-white/5 p-6 sm:p-8 rounded-xl hover:border-brandTeal/50 transition-colors group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brandTeal/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 text-brandTeal group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Hi-Fi Audio Principles</h3>
            <p className="text-slate-400 text-sm leading-relaxed">"High Fidelity" (Hi-Fi) audio aims to reproduce sound exactly as the artist intended in the studio. It prioritizes a flat frequency response (no artificial bass or treble boosting), minimal distortion, and a high dynamic range.</p>
          </div>
          <div className="bg-brandDark border border-white/5 p-6 sm:p-8 rounded-xl hover:border-brandTeal/50 transition-colors group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brandTeal/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 text-brandTeal group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">The Purist Stereo (2.0 / 2.1)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">The gold standard for music listening. A 2.0 setup consists of a Left and Right speaker, creating a "phantom center" image. Adding a subwoofer (2.1) handles the ultra-low frequencies.</p>
          </div>
          <div className="bg-brandDark border border-white/5 p-6 sm:p-8 rounded-xl hover:border-brandTeal/50 transition-colors group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brandTeal/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 text-brandTeal group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Home Theatre & Dolby 5.1</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Cinematic audio surrounds you. A classic 5.1 setup includes Left, Right, and Center (LCR) speakers in front, two surround speakers behind/beside you, and one (.1) Subwoofer.</p>
          </div>
          <div className="bg-brandDark border border-white/5 p-6 sm:p-8 rounded-xl hover:border-brandTeal/50 transition-colors group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brandTeal/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 text-brandTeal group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">The 3D Atmos Experience</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Dolby Atmos moves away from "channels" to "object-based" audio, placing sounds freely in a 3D hemisphere around you. A 5.1.2 setup adds overhead/up-firing Atmos speakers for a seamless audio bubble.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
