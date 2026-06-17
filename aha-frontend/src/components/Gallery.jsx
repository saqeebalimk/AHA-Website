import React from 'react';

const images = [
  'IMG-20251018-WA0021.jpg', 'IMG-20251021-WA0021.jpg', 'IMG-20251021-WA0022.jpg',
  'IMG-20251031-WA0025.jpg', 'IMG-20251031-WA0026.jpg', 'IMG-20251110-WA0013.jpg',
  'IMG-20251203-WA0023.jpg', 'IMG-20251203-WA0025.jpg', 'IMG-20251203-WA0026.jpg',
  'IMG-20251203-WA0028.jpg'
];

export default function Gallery({ onImageClick }) {
  return (
    <section id="gallery" className="py-24 bg-brandDark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-brandTeal/30 rounded-full bg-brandTeal/5">
            <span className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em]">Work in Progress</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Technical Showcase</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto italic">Inside the lab: A glimpse into our daily commitment to precision, genuine component usage, and micro-electronic mastery.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map(img => (
            <div key={img} className="gallery-item aspect-square cursor-pointer" onClick={() => onImageClick(`/${img}`)}>
              <img src={`/${img}`} className="w-full h-full object-cover" alt="Gallery Work" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
