import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { href: '#home', label: 'HOME', id: 'home' },
    { href: '#legacy', label: 'OUR LEGACY', id: 'legacy' },
    { href: '#gallery', label: 'GALLERY', id: 'gallery' },
    { href: '#pcb-repair', label: 'L4 PCB REPAIR', id: 'pcb-repair' },
    { href: '#installation', label: 'INSTALLATION', id: 'installation' },
    { href: '#pro-audio', label: 'PRO AUDIO', id: 'pro-audio' },
  ];

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      // Scroll direction check: > 60px distance to prevent jitters on small scrolls
      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY) setScrollDirection('down');
        else if (currentScrollY < lastScrollY) setScrollDirection('up');
      } else {
        setScrollDirection('up'); // Always show at top
      }
      lastScrollY = currentScrollY;
      setScrolled(currentScrollY > 60);
    };

    // Active section detection via IntersectionObserver
    const sectionIds = navLinks.map(l => l.id);
    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach(o => o.disconnect());
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: scrollDirection === 'down' ? -150 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed w-full z-50 top-0 transition-colors duration-500 ${
        scrolled
          ? 'bg-brandDark-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-16 sm:h-20' : 'h-20 sm:h-28'}`}>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center h-full py-2 sm:py-4">
            <a href="#" className="group h-full flex items-center">
              <motion.img
                src="/logo.png"
                alt="AHA Technologies"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2 }}
                className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-10 sm:h-14' : 'h-14 sm:h-20'}`}
              />
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden xl:flex space-x-1 items-center">
            {navLinks.map(({ href, label, id }, i) => (
              <motion.a
                key={href}
                href={href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2, color: '#5ea19b' }}
                className="relative px-3 py-2 text-[11px] font-bold tracking-widest transition-colors group cursor-pointer"
                style={{ color: activeSection === id ? '#5ea19b' : '#cbd5e1' }}
              >
                {label}
                {/* Active underline */}
                <motion.span
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-brandTeal rounded-full"
                  initial={false}
                  animate={{ scaleX: activeSection === id ? 1 : 0, opacity: activeSection === id ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                />
                {/* Hover underline */}
                <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-brandTeal/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                {/* Active glow dot */}
                {activeSection === id && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brandTeal shadow-[0_0_6px_#5ea19b]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="xl:hidden bg-brandDark-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map(({ href, label, id }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-bold tracking-widest text-sm py-3 border-b border-white/5 transition-colors ${
                    activeSection === id ? 'text-brandTeal' : 'text-slate-300 hover:text-brandTeal'
                  }`}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
