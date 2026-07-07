import React from 'react';
import { TextReveal } from './animations/index.jsx';

const logos = [
  'accuphase-logo.svg', 'b-w-logo-new.svg', 'denon.svg',
  'dynaudio-1.svg', 'jbl-logo.svg', 'marantz-logo.svg', 'yamaha-purple.svg', 'logo.png'
];

export default function BrandSlider() {
  const slides = [...logos, ...logos, ...logos];

  return (
    <section id="brands" className="border-y border-white/5 relative bg-brandDark-900">
      {/* Subtle overlay glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-brandDark-900 via-transparent to-brandDark-900 z-10 pointer-events-none" />
      
      <div className="pt-10 pb-4 text-center relative z-20">
        <TextReveal delay={0.2} className="inline-block">
          <h2 className="text-[10px] font-black text-brandTeal uppercase tracking-[0.4em]">Official Service Partners</h2>
        </TextReveal>
      </div>
      <div className="slider-container border-b border-white/5 group relative z-0">
        <div className="slider-track group-hover:[animation-play-state:paused]" id="track">
          {slides.map((logo, index) => {
            const needsWhiteBg = logo === 'b-w-logo-new.svg' || logo === 'denon.svg';
            return (
              <div key={index} className="slide hover:scale-110 transition-all duration-500 hover:drop-shadow-[0_0_15px_rgba(94,161,155,0.5)]">
                <img 
                  src={`/${logo}?v=4`} 
                  alt="Brand Logo" 
                  onError={(e) => e.target.style.display = 'none'} 
                  className={`transition-all duration-500 ${needsWhiteBg ? 'bg-white p-3 rounded-lg object-contain' : ''}`} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
