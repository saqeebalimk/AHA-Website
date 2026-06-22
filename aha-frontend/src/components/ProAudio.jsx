import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TiltCard, FloatingGlow, LetterReveal, TextReveal, StaggerContainer, StaggerItem } from './animations/index.jsx';

export default function ProAudio() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  
  // Parallax translation for decorative text
  const xLeft = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const xRight = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section ref={containerRef} id="pro-audio" className="py-20 sm:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      <FloatingGlow color="rgba(94,161,155,0.06)" size={600} top="10%" left="-10%" />
      <FloatingGlow color="rgba(94,161,155,0.04)" size={700} bottom="-10%" right="-5%" />
      
      {/* Decorative large text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02] text-[15rem] font-black pointer-events-none whitespace-nowrap overflow-hidden leading-none tracking-tighter w-full select-none">
        <motion.span style={{ x: xRight, display: 'inline-block' }}>PRO AUDIO // AHA TECH // LEVEL 4 // MAINTENANCE // </motion.span>
      </div>
      <div className="absolute top-[60%] left-0 -translate-y-1/2 opacity-[0.015] text-[15rem] font-black pointer-events-none whitespace-nowrap overflow-hidden leading-none tracking-tighter w-full select-none">
        <motion.span style={{ x: xLeft, display: 'inline-block' }}>PRECISION ENGINEERING // SUSTAINABILITY // </motion.span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 sm:mb-32 flex flex-col items-center text-center"
        >
          <div className="inline-block mb-6 md:mb-8 px-5 py-1.5 border border-brandTeal/30 rounded-full bg-brandTeal/5 relative overflow-hidden group">
            <motion.div 
              className="absolute inset-0 bg-brandTeal/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"
              style={{ transform: 'skewX(-20deg)' }}
            />
            <span className="relative text-[10px] md:text-xs text-brandTeal font-black uppercase tracking-[0.2em] drop-shadow z-10">Maintenance Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] max-w-5xl mx-auto">
            <LetterReveal text="Pro Audio &" delay={0.1} />
            <br />
            <span className="text-brandTeal inline-block">
              <LetterReveal text="Preventive Maintenance." delay={0.4} />
            </span>
          </h2>
        </motion.div>

        {/* Box Replacement wrapped in TiltCard and StaggerContainer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <TiltCard intensity={5} className="bg-brandDark-900 border-l-[4px] border-brandTeal p-8 sm:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_0_80px_rgba(94,161,155,0.15)] transition-shadow duration-700 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 pointer-events-none z-0"
              animate={{ opacity: [0.02, 0.08, 0.02] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'radial-gradient(circle at 80% 20%, rgba(94,161,155,0.5) 0%, transparent 50%)' }}
            />
            
            <div className="relative z-10">
              <TextReveal delay={0.1}>
                <p className="text-slate-400 text-base sm:text-lg lg:text-xl leading-relaxed mb-12 lg:mb-16 w-full max-w-4xl font-medium tracking-wide">
                  Like high-performance machinery, commercial audio equipment requires rigorous, scheduled maintenance to ensure longevity and prevent catastrophic failures during critical events.
                </p>
              </TextReveal>
              
              <StaggerContainer stagger={0.2} className="grid md:grid-cols-2 gap-10 sm:gap-24">
                <StaggerItem>
                  <div className="group cursor-default">
                    <h5 className="flex items-center gap-3 text-white font-bold text-xl sm:text-2xl mb-4 group-hover:text-brandTeal transition-colors duration-300">
                      <motion.span 
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                        className="w-2 h-2 bg-brandTeal rounded-full flex-shrink-0 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(94,161,155,0.8)] transition-all duration-300" 
                      />
                      Thermal Deep Cleaning
                    </h5>
                    <p className="text-slate-400 sm:text-lg leading-relaxed pl-5 border-l border-white/5 group-hover:border-brandTeal/30 transition-colors duration-300">
                      We clear fan intakes and deep-clean heat sinks to prevent thermal-induced shutdowns.
                    </p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="group cursor-default">
                    <h5 className="flex items-center gap-3 text-white font-bold text-xl sm:text-2xl mb-4 group-hover:text-brandTeal transition-colors duration-300">
                      <motion.span 
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                        className="w-2 h-2 bg-brandTeal rounded-full flex-shrink-0 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(94,161,155,0.8)] transition-all duration-300" 
                      />
                      Impedance Sweep
                    </h5>
                    <p className="text-slate-400 sm:text-lg leading-relaxed pl-5 border-l border-white/5 group-hover:border-brandTeal/30 transition-colors duration-300">
                      Periodic testing to detect deteriorating speaker voice coils before they blow your amplifiers.
                    </p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
