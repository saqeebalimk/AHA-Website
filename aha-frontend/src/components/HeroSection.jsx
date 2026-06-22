import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { LetterReveal, TextReveal, MagneticButton, ParticleBackground, FloatingGlow, SlideUp } from './animations/index.jsx';

export default function HeroSection({ onOpenDiagnostic }) {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target);
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const email = formData.get('email') || '';
    const brandAndModel = formData.get('brandAndModel') || '';
    const issue = formData.get('issue') || '';
    
    const msg = `Hello AHA Technologies!\n\nHero Priority Service Lead:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nBrand & Model: ${brandAndModel}\nIssue: ${issue}`;
    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919964689378&text=${encodedMsg}`;

    setTimeout(() => {
      setStatus('success');
      window.open(whatsappUrl, '_blank');
      setTimeout(() => {
        setStatus('idle');
        e.target.reset();
      }, 2000);
    }, 600);
  };

  return (
    <section
      id="home"
      className="relative pt-36 pb-16 lg:pt-56 lg:pb-32 overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to right, rgba(17,17,17,0.97) 20%, rgba(17,17,17,0.75) 100%), url('/luxury-lifestyle-background-interior-exterior-152.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-brandDark-900/40" />

      {/* Floating glow blobs */}
      <FloatingGlow color="rgba(94,161,155,0.06)" size={500} top="-10%" left="-5%" />
      <FloatingGlow color="rgba(147,51,234,0.05)" size={400} top="30%" right="-8%" />

      {/* Particles */}
      <ParticleBackground count={30} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* LEFT — hero copy */}
          <div className="lg:col-span-7 text-center lg:text-left pt-4 lg:pt-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-5 px-5 py-2 border border-brandTeal/20 rounded-full bg-brandTeal/10 backdrop-blur-sm"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-brandTeal block"
              />
              <span className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Quality Services Assured</span>
            </motion.div>

            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-5 leading-[1.08] tracking-tight">
              <LetterReveal text="Precision Audio" className="text-brandTeal block" />
              <LetterReveal text="Engineering." delay={0.6} className="text-white block mt-1" />
            </div>

            {/* Subtext */}
            <TextReveal delay={1.2} className="mt-4 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-slate-300 mb-8 font-medium leading-relaxed">
              Bangalore's trusted authorized service destination for high-end Hi-Fi systems, amplifiers, and cinematic audio gear. Since 1991.
            </TextReveal>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex justify-center lg:justify-start"
            >
              <motion.a
                href="tel:+919964689378"
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-brandTeal/50 bg-brandTeal/20 text-white font-black tracking-widest text-xs rounded-sm transition-all flex items-center justify-center gap-2 backdrop-blur-sm shadow-[0_0_20px_rgba(94,161,155,0.3)] hover:shadow-[0_0_35px_rgba(94,161,155,0.6)]"
              >
                CALL NOW
              </motion.a>
            </motion.div>


          </div>

          {/* RIGHT — booking form */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-brandDark-900/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(94,161,155,0.12),0_0_40px_rgba(0,0,0,0.6)] overflow-hidden relative group"
            >
              {/* Animated ambient glow across whole card */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                animate={{ opacity: [0.04, 0.1, 0.04] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'radial-gradient(ellipse at top right, rgba(94,161,155,0.6) 0%, transparent 65%)' }}
              />
              {/* Mouse-tracking glow overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'radial-gradient(300px circle at 80% 20%, rgba(94,161,155,0.1), transparent 60%)' }}
              />

              <div className="h-40 sm:h-48 w-full relative">
                <img src="/Gemini_Generated_Image_xi8rhuxi8rhuxi8r.png" alt="Premium Audio Service" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brandDark-900 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white">Priority Service</h3>
                  <p className="text-brandTeal text-xs font-bold tracking-widest uppercase mt-1">Master Technicians</p>
                </div>
              </div>

              {status !== 'success' ? (
                <div className="p-5 sm:p-6 md:p-8 relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {[{ name: 'name', type: 'text', label: 'Full Name' }, { name: 'phone', type: 'tel', label: 'Phone Number' }, { name: 'email', type: 'email', label: 'Email Address' }, { name: 'brandAndModel', type: 'text', label: 'Brand & Model' }].map(({ name, type, label }, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <motion.input
                          name={name}
                          type={type}
                          required
                          placeholder={label}
                          whileFocus={{ borderColor: 'rgba(94,161,155,0.9)', boxShadow: '0 0 0 3px rgba(94,161,155,0.15), 0 0 20px rgba(94,161,155,0.1)' }}
                          whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
                          className="w-full bg-brandDark/50 border border-white/10 rounded-lg px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none transition-all placeholder-slate-500"
                        />
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.textarea
                        name="issue"
                        required
                        rows="3"
                        placeholder="Detailed Issue Description..."
                        whileFocus={{ borderColor: 'rgba(94,161,155,0.9)', boxShadow: '0 0 0 3px rgba(94,161,155,0.15), 0 0 20px rgba(94,161,155,0.1)' }}
                        whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
                        className="w-full bg-brandDark/50 border border-white/10 rounded-lg px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none transition-all resize-none placeholder-slate-500"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.button
                        disabled={status === 'sending'}
                        type="submit"
                        whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(94,161,155,0.55)' }}
                        whileTap={{ scale: 0.96 }}
                        className="w-full py-4 bg-brandTeal text-white rounded-lg font-black tracking-widest text-xs hover:bg-brandTeal-dark transition-all shadow-lg shadow-brandTeal/20 mt-2 flex justify-center items-center gap-2 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative z-10 flex items-center gap-2">
                          {status === 'sending' ? (
                            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>SENDING…</motion.span>
                          ) : (
                            <>REQUEST CALL BACK <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-6"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-brandTeal/20 text-brandTeal rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </motion.div>
                  <h3 className="text-2xl font-black text-white mb-2">Request Processed!</h3>
                  <p className="text-slate-400 text-sm">We will contact you shortly.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
