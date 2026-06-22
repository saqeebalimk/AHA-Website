import React from 'react';
import { motion } from 'framer-motion';
import { TiltCard, StaggerContainer, StaggerItem, FloatingGlow, LetterReveal, TextReveal } from './animations/index.jsx';

const cards = [
  {
    title: 'Corporate & UC Environments',
    img: '/magnific__talk__27829.png',
    alt: 'Corporate UC Integration',
    desc: 'We install sophisticated beamforming microphone arrays that automatically track active speakers while rejecting HVAC noise.',
  },
  {
    title: 'Distributed Audio & IP Scale',
    img: '/magnific_2954100228.png',
    alt: 'Architectural Commercial Scale',
    desc: 'To overcome signal degradation over massive footprints, we deploy 70V/100V constant-voltage systems and Audio over IP.',
  },
  {
    title: 'Industrial QA & Bench Testing',
    img: '/worker-check-speaker-factory.jpg',
    alt: 'Pre-Installation QA',
    desc: 'Before commercial deployment, enterprise hardware undergoes rigorous bench-testing at our facility.',
    extra: 'sm:col-span-2 lg:col-span-1',
  },
];

export default function Installation() {
  return (
    <section id="installation" className="py-20 sm:py-32 bg-brandDark-900 border-t border-white/5 relative overflow-hidden">
      <FloatingGlow color="rgba(94,161,155,0.05)" size={500} top="20%" right="-10%" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-20 text-center max-w-4xl mx-auto"
        >
          <div className="inline-block mb-4 px-4 py-1 border border-brandTeal/30 rounded-full bg-brandTeal/5">
            <span className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em]">Master Integration</span>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight">
            <LetterReveal text="Architectural Audio: " className="block" />
            <LetterReveal text="Residential & Commercial." delay={0.5} className="text-brandTeal block" />
          </div>
          <TextReveal delay={0.3}>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-4xl mx-auto">
              Procuring world-class audio equipment is merely the first step. At AHA Technologies, we bridge the complex gap between high-end electronics and architectural environments for both premium residences and large-scale commercial spaces.
            </p>
          </TextReveal>
        </motion.div>

        {/* Cinema masonry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16 sm:mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 border-b border-white/10 pb-4">Dedicated Home Cinemas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[500px]">
            {[
              { src: '/home-theatre.jpg', label: 'REFERENCE DOLBY ATMOS CINEMAS', span: 'md:row-span-2', h: 'h-56 sm:h-72 md:h-full' },
              { src: '/large-screen-with-picture-plane-it.jpg', label: 'LARGE FORMAT PROJECTION', span: '', h: 'h-48 sm:h-64 md:h-[242px]' },
              { src: '/home_theatre_1.jpg', label: 'LUXURY ARCHITECTURAL INTEGRATION', span: '', h: 'h-48 sm:h-64 md:h-[242px]' },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`rounded-xl overflow-hidden border border-white/10 group ${img.h} ${img.span} relative shadow-2xl`}
              >
                <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 sm:p-6">
                  <span className="text-white font-bold tracking-widest text-xs sm:text-sm">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commercial section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mt-16 sm:mt-24 mb-8 sm:mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 border-b border-white/10 pb-4">Commercial Integration & Enterprise Scale</h3>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-5xl">
            From corporate boardrooms requiring pristine speech intelligibility to vast hospitality venues needing perfectly balanced background audio.
          </p>
        </motion.div>

        {/* TILT CARDS */}
        <StaggerContainer stagger={0.13} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {cards.map((card, idx) => (
            <StaggerItem key={card.title}>
              <TiltCard className={`bg-brandDark border border-white/5 rounded-xl overflow-hidden shadow-2xl h-full ${card.extra || ''} group relative hover:border-brandTeal/30 hover:shadow-[0_0_60px_rgba(94,161,155,0.18)] transition-all duration-500`}>
                {/* Ambient glow across whole card */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-0"
                  animate={{ opacity: [0.03, 0.1, 0.03] }}
                  transition={{ duration: 4 + idx, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.8 }}
                  style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(94,161,155,0.5) 0%, transparent 65%)' }}
                />
                <div className="h-44 sm:h-52 overflow-hidden relative">
                  <motion.img
                    src={card.img}
                    alt={card.alt}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-[filter] duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Glow border overlay on hover */}
                  <motion.div
                    className="absolute inset-0 border-2 border-brandTeal/0 rounded-t-xl"
                    whileHover={{ borderColor: 'rgba(94,161,155,0.5)' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-5 sm:p-6 relative z-10">
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                    className="text-brandTeal font-bold text-base sm:text-lg mb-2 sm:mb-3 group-hover:drop-shadow-[0_0_8px_rgba(94,161,155,0.6)] transition-all"
                  >
                    {card.title}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="text-slate-400 text-sm leading-relaxed"
                  >
                    {card.desc}
                  </motion.p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
