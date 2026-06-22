import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StaggerContainer, StaggerItem, TiltCard, TextReveal } from './animations/index.jsx';

export default function Gallery({ onImageClick }) {
  const images = [
    { src: '/gallery_restoration.png', label: 'PREMIUM RESTORATION', sub: 'Vintage McIntosh Validation' },
    { src: '/gallery_component.png', label: 'COMPONENT LEVEL REPAIR', sub: 'Microscopic Solder Tracing' },
    { src: '/gallery_calibration.png', label: 'MARANTZ CALIBRATION', sub: 'Acoustic Room Tuning' }
  ];

  return (
    <section id="gallery" className="py-20 sm:py-32 bg-brandDark-900 border-t border-white/5 relative overflow-hidden">
      {/* Decorative V5 Parallax Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 sm:mb-24 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            className="inline-block mb-6 px-5 py-1.5 border border-brandTeal/30 rounded-full bg-brandTeal/5 backdrop-blur-md"
          >
            <h2 className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em] m-0 drop-shadow-[0_0_10px_rgba(94,161,155,0.8)]">L4 PCB Repair</h2>
          </motion.div>
          <TextReveal>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Precision Diagnostics & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandTeal to-purple-400">Component Repair</span>
            </h3>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              We don't just replace boards. Our Class-100 cleanroom engineers diagnose and repair high-end AV equipment down to the individual micro-component level.
            </p>
          </TextReveal>
        </div>

        <StaggerContainer stagger={0.2} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {images.map((img, i) => (
            <StaggerItem key={i}>
              <TiltCard intensity={12} className="group cursor-url('/search.svg'), auto rounded-2xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-500 hover:shadow-[0_0_40px_rgba(94,161,155,0.2)] hover:border-brandTeal/40 h-72 sm:h-80 md:h-[420px]">
                {/* Image zoom & brightness on hover */}
                <img 
                  src={img.src} 
                  alt={img.label} 
                  className="w-full h-full object-cover scale-100 group-hover:scale-[1.15] brightness-75 group-hover:brightness-110 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]" 
                  loading="lazy" 
                  onClick={() => onImageClick(img.src)}
                />
                
                {/* V5 Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                {/* Content sliding up */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 pointer-events-none">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out"
                  >
                    <div className="h-[2px] w-8 bg-brandTeal mb-4 shadow-[0_0_10px_rgba(94,161,155,0.8)]" />
                    <h4 className="text-white font-black tracking-widest text-sm sm:text-base drop-shadow-md mb-1 uppercase">
                      {img.label}
                    </h4>
                    <p className="text-brandTeal font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {img.sub}
                    </p>
                  </motion.div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
