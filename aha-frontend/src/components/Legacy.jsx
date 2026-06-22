import React from 'react';
import { motion } from 'framer-motion';
import { SlideLeft, SlideRight, CountUp, TextReveal } from './animations/index.jsx';

export default function Legacy() {
  return (
    <section id="legacy" className="py-16 sm:py-24 bg-brandDark-900 border-b border-white/5 relative overflow-hidden">
      {/* Absolute background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-brandTeal/5 via-brandDark-900 to-brandDark-900 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT IMAGE / PARALLAX */}
          <SlideLeft className="lg:col-span-5 relative pb-8 lg:pb-0">
            <motion.div
              whileHover={{ scale: 1.03, rotateY: -2, z: 20 }}
              className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10 transform-[preserve-3d]"
            >
              <img
                src="/audio_brands_2.png"
                alt="AHA Technologies Heritage"
                className="w-full h-auto object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
            </motion.div>

          </SlideLeft>

          {/* RIGHT TEXT */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <TextReveal delay={0.15}>
              <div className="inline-block px-4 py-1 border border-brandTeal/30 rounded-full bg-brandTeal/5">
                <span className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em] drop-shadow-sm">Our History & Commitment</span>
              </div>
            </TextReveal>
            
            <TextReveal delay={0.25}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                A Legacy of Sound <br />
                <span className="text-brandTeal">Since 1991.</span>
              </h2>
            </TextReveal>
            
            <div className="prose prose-invert prose-lg text-slate-400 max-w-none space-y-4 sm:space-y-5 text-sm leading-relaxed">
              <TextReveal delay={0.35}><p>Bangalore has always been the technological heartbeat of India, and for over three decades, AHA Technologies has been the trusted guardian of its high-fidelity sound. Our journey began in 1991, during an era when premium audio systems were prized possessions and deep technical expertise was a rare, highly sought-after craft. Long before the formal registration of our company in 2008, our founding engineers were deeply entrenched in the AV industry, mastering the complexities of pure analog systems and adapting to the earliest waves of digital integration.</p></TextReveal>
              <TextReveal delay={0.45}><p>AHA Technologies wasn't simply built on a business model; it was forged from an uncompromising passion for sonic perfection. We formally stepped into the corporate landscape in 2008 to better structure our services for a rapidly growing roster of institutional and premium residential clients. However, our roots remain firmly planted in the meticulous, "hands-on" engineering ethos of the early 90s. Today, we stand as a beacon of reliability and precision in an industry that is too often plagued by temporary fixes, board-swapping mentalities, and generic, unverified parts.</p></TextReveal>
              <TextReveal delay={0.55}><p>What truly sets us apart is our <strong>Collective Expertise</strong>. The combined technical knowledge of our bench staff exceeds 50 years—a half-century of troubleshooting, restoring, and optimizing some of the world's most sophisticated audio equipment. This isn't just experience; it's a deep-seated institutional memory. It allows us to solve intricate electronic problems where others only see dead ends. From vintage tube amplifiers requiring delicate bias adjustments to modern 8K HDMI processors needing BGA reflows, our team inherently understands the DNA of sound.</p></TextReveal>
              
              <TextReveal delay={0.65}><p className="pt-2">At the absolute core of AHA Technologies are three non-negotiable pillars:</p></TextReveal>
              
              <ul className="space-y-4 list-none p-0 mt-6 border-l-2 border-brandTeal/30 pl-4">
                {[
                  { n: '01', title: 'Uncompromising Service Quality', text: 'We specialize in complex Level 4 PCB repair, ensuring that we fix the root cause of an issue at the micro-component level rather than burdening the customer with expensive, unnecessary full-board replacements.' },
                  { n: '02', title: 'Genuineness Guaranteed', text: 'Every capacitor, transistor, and logic chip we utilize is sourced through authorized, verified channels. We firmly believe that an audio unit is only as strong as its weakest internal link.' },
                  { n: '03', title: 'Pioneering After-Sales Support', text: "Our relationship with a client does not end when a repaired unit is delivered. We provide comprehensive ongoing support and acoustic consultation, ensuring your investment continues to perform at factory specifications for years to come." },
                ].map((li, i) => (
                  <motion.li
                    key={li.n}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex gap-3 sm:gap-4 items-start group"
                  >
                    <span className="text-brandTeal font-bold mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">{li.n}.</span>
                    <span><strong className="text-slate-200">{li.title}:</strong> {li.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
