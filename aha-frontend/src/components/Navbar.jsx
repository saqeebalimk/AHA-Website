import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'HOME' },
    { href: '#legacy', label: 'OUR LEGACY' },
    { href: '#gallery', label: 'GALLERY' },
    { href: '#pcb-repair', label: 'L4 PCB REPAIR' },
    { href: '#installation', label: 'INSTALLATION' },
    { href: '#pro-audio', label: 'PRO AUDIO' },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 bg-brandDark-900/95 backdrop-blur-md border-b border-white/5 ${scrolled ? 'shadow-xl' : ''}`} id="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-16 sm:h-20' : 'h-20 sm:h-28'}`} id="nav-container">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center h-full py-2 sm:py-4">
            <a href="#" className="group h-full flex items-center">
              <img
                src="/logo.png"
                alt="AHA Technologies Logo"
                className={`w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] ${scrolled ? 'h-10 sm:h-14' : 'h-14 sm:h-20'}`}
              />
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden xl:flex space-x-6 items-center">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className="text-[11px] font-bold tracking-widest text-slate-300 hover:text-brandTeal transition-colors">{label}</a>
            ))}
            <a href="#advisor" className="text-[11px] font-bold tracking-widest text-brandTeal flex items-center gap-1">AI ADVISOR ✨</a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-brandDark border-b border-white/10">
          <div className="px-5 py-5 space-y-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-brandTeal font-bold tracking-widest text-sm py-2.5 border-b border-white/5 transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#advisor"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-brandTeal font-bold tracking-widest text-sm py-2.5"
            >
              AI ADVISOR ✨
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
