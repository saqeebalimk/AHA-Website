import React from 'react';
import { motion } from 'framer-motion';
import { SlideRight, LetterReveal, TextReveal, StaggerContainer, StaggerItem, TiltCard, FloatingGlow } from './animations/index.jsx';

export default function PCBRepair() {
  const images = [
    { src: '/close-up-hands-needle-tipped-tip-service.jpg', title: 'Surgical Soldering' },
    { src: '/high-angle-female-technician-repairing-computer-motherboard.jpg', title: 'Logic Analysis' },
    { src: '/computer-with-red-white-cloth-with-red-table-cloth-with-red-table-cloth-with-red-table-cloth-with-white-floral-design.jpg', title: 'Bench Testing' },
    { src: '/old-radio-parts.jpg', title: 'Vintage Restoration' },
  ];

  return (
    <section id="pcb-repair" className="py-20 sm:py-32 bg-brandDark-900 relative overflow-hidden border-t border-white/5">
      <FloatingGlow color="rgba(147,51,234,0.06)" size={600} left="-10%" top="10%" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SlideRight className="mb-12 sm:mb-20">
          <div className="inline-block mb-4 px-4 py-1 border border-brandTeal/30 rounded-full bg-brandTeal/5 backdrop-blur-sm">
            <span className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em] drop-shadow">Micro-Electronic Engineering</span>
          </div>
          <div className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 sm:mb-8">
            <LetterReveal text="L4 & Comprehensive " className="inline" />
            <LetterReveal text="PCB Repair Services." delay={0.4} className="text-brandTeal inline" />
          </div>
        </SlideRight>

        <StaggerContainer stagger={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20">
          {images.map((img, i) => (
            <StaggerItem key={i}>
              <TiltCard intensity={15} className="h-48 sm:h-64 rounded-xl overflow-hidden border border-white/10 relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1]" />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-[10px] font-bold tracking-widest text-brandTeal uppercase">{img.title}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 items-start mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">Component-Level Mastery</h3>
            <TextReveal>
              <div className="text-slate-400 leading-relaxed text-sm lg:text-base space-y-4">
                <p>In the modern era of consumer electronics, "repair" has unfortunately become synonymous with "replacement." When a high-end Marantz receiver or a Denon amplifier fails, most service centers will simply declare a board "dead" and quote the price of a full module replacement. At AHA Technologies, we operate at <strong>Level 4 (L4) Service Proficiency</strong>. This means we go deep into the microscopic architecture of the PCB to identify and replace the specific failed components.</p>
                <p>Our lab is equipped with infrared BGA rework stations, high-magnification digital microscopes, and precision desoldering tools. By focusing on the root cause, we provide a repair solution that is more sustainable, cost-effective, and reliable.</p>
              </div>
            </TextReveal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-brandDark-900 border border-brandTeal/30 p-6 sm:p-8 rounded-xl shadow-[inset_0_0_20px_rgba(94,161,155,0.05)] relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-brandTeal/10 rounded-full blur-xl pointer-events-none" />
            <h4 className="text-brandTeal font-black mb-6 uppercase tracking-widest text-sm text-center border-b border-white/5 pb-4">REPAIR SPECIALIZATIONS</h4>
            <ul className="text-sm space-y-4 list-none p-0">
              {['SMPS Power Units', 'HDMI & DSP Digital Boards', 'Speaker Crossover PCBs', 'Discrete Class-AB Arrays', 'Logic Control Units'].map((spec) => (
                <li key={spec} className="flex items-center gap-3 text-slate-300 group">
                  <motion.span
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    className="w-1.5 h-1.5 bg-brandTeal rounded-full flex-shrink-0 group-hover:scale-150 group-hover:shadow-[0_0_8px_#5ea19b] transition-all"
                  />
                  <span className="font-medium group-hover:text-white transition-colors">{spec}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Text Cards Grid */}
        <StaggerContainer stagger={0.15} className="mt-16 sm:mt-24 grid md:grid-cols-2 gap-10 sm:gap-16">
          <StaggerItem>
            <div className="group cursor-default relative">
              <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 border-l-4 border-brandTeal/40 group-hover:border-brandTeal pl-4 group-hover:text-brandTeal transition-all duration-300 relative group-hover:drop-shadow-[0_0_12px_rgba(94,161,155,0.7)]">
                SMPS & Power Assembly Repair
              </h5>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed pl-5 group-hover:text-slate-300 transition-colors duration-300">
                The Switch Mode Power Supply (SMPS) is the most common point of failure. High heat, voltage spikes, and aging electrolytic capacitors lead to "no power" conditions. Our L4 technicians specialize in replacing primary-side switching transistors, PWM ICs, and high-precision optocouplers.
              </p>
            </div>
          </StaggerItem>
          
          <StaggerItem>
            <div className="group cursor-default relative">
              <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 border-l-4 border-brandTeal/40 group-hover:border-brandTeal pl-4 group-hover:text-brandTeal transition-all duration-300 relative group-hover:drop-shadow-[0_0_12px_rgba(94,161,155,0.7)]">
                Digital & DSP PCB Restoration
              </h5>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed pl-5 group-hover:text-slate-300 transition-colors duration-300">
                Digital boards hosting HDMI switchers and Surround Sound DSPs are notoriously sensitive. A "cold solder joint" on a BGA chip can cause lost audio channels. We perform surgical re-balling and reflowing of these processors.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="group cursor-default relative">
              <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 border-l-4 border-brandTeal/40 group-hover:border-brandTeal pl-4 group-hover:text-brandTeal transition-all duration-300 relative group-hover:drop-shadow-[0_0_12px_rgba(94,161,155,0.7)]">
                Speaker & Crossover Electronics
              </h5>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed pl-5 group-hover:text-slate-300 transition-colors duration-300">
                Even high-end passive speakers have PCBs inside them: the Crossover. Over time, high-wattage resistors can crack. In active speakers, we repair the internal amplification assembly PCBs.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="group cursor-default relative">
              <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 border-l-4 border-brandTeal/40 group-hover:border-brandTeal pl-4 group-hover:text-brandTeal transition-all duration-300 relative group-hover:drop-shadow-[0_0_12px_rgba(94,161,155,0.7)]">
                Amplification & Output Arrays
              </h5>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed pl-5 group-hover:text-slate-300 transition-colors duration-300">
                When an amplifier goes into "Protect Mode," it's often due to a blown output transistor or a failed DC offset circuit on the output assembly PCB. We match-pair transistors to ensure perfectly symmetrical waveforms.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
