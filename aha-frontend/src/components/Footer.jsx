import React from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem, SlideUp } from './animations/index.jsx';

export default function Footer() {
  const links = [
    { name: 'HOME', href: '#home' },
    { name: 'OUR LEGACY', href: '#legacy' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'L4 PCB REPAIR', href: '#pcb-repair' },
    { name: 'INSTALLATION', href: '#installation' },
    { name: 'PRO AUDIO', href: '#pro-audio' }
  ];

  return (
    <footer className="bg-brandDark-900 pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-brandTeal/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-brandTeal/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} 
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <motion.img 
            whileHover={{ scale: 1.05, opacity: 1 }}
            src="/logo.png" 
            alt="AHA Technologies Logo" 
            className="h-16 object-contain opacity-50 transition-all duration-700" 
          />
        </motion.div>
        
        <StaggerContainer stagger={0.05} className="flex justify-center gap-6 mb-16 flex-wrap">
          {links.map((link) => (
            <StaggerItem key={link.name}>
              <a href={link.href} className="text-[10px] font-black text-slate-400 hover:text-brandTeal hover:drop-shadow-[0_0_8px_rgba(94,161,155,0.8)] tracking-[0.2em] transition-all duration-300">
                {link.name}
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <SlideUp delay={0.4}>
          <div className="text-center text-[10px] text-slate-600 font-bold tracking-widest uppercase">
            &copy; 2026 AHA Technologies Bangalore. All Rights Reserved. Est 1991.
          </div>
        </SlideUp>
      </div>
    </footer>
  );
}
