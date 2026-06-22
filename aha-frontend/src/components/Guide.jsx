import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal, LetterReveal, StaggerContainer, StaggerItem, TiltCard } from './animations/index.jsx';

const cardGlow = (color, delay = 0) => (
  <motion.div
    className="absolute inset-0 pointer-events-none rounded-3xl"
    animate={{
      opacity: [0.04, 0.14, 0.04],
      scale: [1, 1.05, 1],
    }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{
      background: `radial-gradient(ellipse at 30% 30%, ${color} 0%, transparent 70%)`,
    }}
  />
);

export default function Guide() {
  return (
    <section id="guide" className="py-16 sm:py-24 bg-brandDark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <LetterReveal text="The AHA Audio Guide" className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6" />
          <TextReveal delay={0.3}>
            <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">Master your listening experience. Whether you are building a pure stereo setup or a fully immersive home theatre, understanding the fundamentals is key to audio nirvana.</p>
          </TextReveal>
        </div>

        <StaggerContainer stagger={0.15} className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          <StaggerItem>
            <TiltCard intensity={5} className="bg-brandDark-900/80 backdrop-blur-md border border-white/5 p-8 sm:p-10 rounded-3xl hover:border-brandTeal/40 hover:shadow-[0_0_60px_rgba(94,161,155,0.2)] transition-all group h-full overflow-hidden relative">
              {cardGlow('rgba(94,161,155,0.5)', 0)}
              <div className="relative z-10">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }} className="w-2 h-2 rounded-full bg-brandTeal mb-6 shadow-[0_0_12px_#5ea19b]" />
                <motion.h3 initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-xl sm:text-2xl font-bold text-white mb-3">Hi-Fi Audio Principles</motion.h3>
                <TextReveal delay={0.1}><p className="text-slate-400 text-sm leading-relaxed">"High Fidelity" (Hi-Fi) audio aims to reproduce sound exactly as the artist intended in the studio. It prioritizes a flat frequency response (no artificial bass or treble boosting), minimal distortion, and a high dynamic range.</p></TextReveal>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem>
            <TiltCard intensity={5} className="bg-brandDark-900/80 backdrop-blur-md border border-white/5 p-8 sm:p-10 rounded-3xl hover:border-purple-500/40 hover:shadow-[0_0_60px_rgba(147,51,234,0.2)] transition-all group h-full overflow-hidden relative">
              {cardGlow('rgba(147,51,234,0.5)', 1)}
              <div className="relative z-10">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, delay: 0.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-purple-500 mb-6 shadow-[0_0_12px_#9333ea]" />
                <motion.h3 initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-xl sm:text-2xl font-bold text-white mb-3">The Purist Stereo (2.0 / 2.1)</motion.h3>
                <TextReveal delay={0.1}><p className="text-slate-400 text-sm leading-relaxed">The gold standard for music listening. A 2.0 setup consists of a Left and Right speaker, creating a "phantom center" image. Adding a subwoofer (2.1) handles the ultra-low frequencies.</p></TextReveal>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem>
            <TiltCard intensity={5} className="bg-brandDark-900/80 backdrop-blur-md border border-white/5 p-8 sm:p-10 rounded-3xl hover:border-brandTeal/40 hover:shadow-[0_0_60px_rgba(94,161,155,0.2)] transition-all group h-full overflow-hidden relative">
              {cardGlow('rgba(94,161,155,0.5)', 0.5)}
              <div className="relative z-10">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, delay: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-brandTeal mb-6 shadow-[0_0_12px_#5ea19b]" />
                <motion.h3 initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-xl sm:text-2xl font-bold text-white mb-3">Home Theatre &amp; Dolby 5.1</motion.h3>
                <TextReveal delay={0.1}><p className="text-slate-400 text-sm leading-relaxed">Cinematic audio surrounds you. A classic 5.1 setup includes Left, Right, and Center (LCR) speakers in front, two surround speakers behind/beside you, and one (.1) Subwoofer.</p></TextReveal>
              </div>
            </TiltCard>
          </StaggerItem>

          <StaggerItem>
            <TiltCard intensity={5} className="bg-brandDark-900/80 backdrop-blur-md border border-white/5 p-8 sm:p-10 rounded-3xl hover:border-purple-500/40 hover:shadow-[0_0_60px_rgba(147,51,234,0.2)] transition-all group h-full overflow-hidden relative">
              {cardGlow('rgba(147,51,234,0.5)', 1.5)}
              <div className="relative z-10">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, delay: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-purple-500 mb-6 shadow-[0_0_12px_#9333ea]" />
                <motion.h3 initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-xl sm:text-2xl font-bold text-white mb-3">The 3D Atmos Experience</motion.h3>
                <TextReveal delay={0.1}><p className="text-slate-400 text-sm leading-relaxed">Dolby Atmos moves away from "channels" to "object-based" audio, placing sounds freely in a 3D hemisphere around you. A 5.1.2 setup adds overhead/up-firing Atmos speakers for a seamless audio bubble.</p></TextReveal>
              </div>
            </TiltCard>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
