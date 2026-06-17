import React from 'react';

const logos = [
  'accuphase-logo.svg', 'b-w-logo-new.svg', 'denon.svg',
  'dynaudio-1.svg', 'jbl-logo.svg', 'marantz-logo.svg', 'yamaha-purple.svg', 'logo.png'
];

export default function BrandSlider() {
  const slides = [...logos, ...logos, ...logos];

  return (
    <section id="brands" className="border-y border-white/5">
      <div className="bg-brandDark-900 pt-10 pb-4 text-center">
        <h2 className="text-[10px] font-black text-brandTeal uppercase tracking-[0.4em]">Official Service Partners</h2>
      </div>
      <div className="slider-container border-b border-white/5">
        <div className="slider-track" id="track">
          {slides.map((logo, index) => (
            <div key={index} className="slide">
              <img src={`/${logo}`} alt="Brand Logo" onError={(e) => e.target.style.display = 'none'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
