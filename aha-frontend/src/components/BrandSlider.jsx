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
          {slides.map((logo, index) => (
            <div key={index} className="slide opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-500 hover:drop-shadow-[0_0_15px_rgba(94,161,155,0.5)]">
              <img src={`/${logo}`} alt="Brand Logo" onError={(e) => e.target.style.display = 'none'} className="filter grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
