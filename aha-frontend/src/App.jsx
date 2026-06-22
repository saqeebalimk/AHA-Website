import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Legacy from './components/Legacy';
import Gallery from './components/Gallery';
import BrandSlider from './components/BrandSlider';
import Guide from './components/Guide';
import PCBRepair from './components/PCBRepair';
import Installation from './components/Installation';
import ProAudio from './components/ProAudio';
import Footer from './components/Footer';
import { LeadModal, DiagnosticModal, ImageModal } from './components/Modals';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, CursorGlow, ScrollProgressBar } from './components/animations/index.jsx';

function App() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isDiagModalOpen, setIsDiagModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="antialiased flex flex-col min-h-screen text-slate-300 relative bg-brandDark-900">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9998] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-20" />

      <ScrollProgressBar />
      
      <Navbar />
      <HeroSection onOpenDiagnostic={() => setIsDiagModalOpen(true)} />

      <FadeIn><Legacy /></FadeIn>
      <FadeIn><Gallery onImageClick={(src) => setLightboxImg(src)} /></FadeIn>
      <FadeIn><BrandSlider /></FadeIn>
      <FadeIn><Guide /></FadeIn>
      <FadeIn><PCBRepair /></FadeIn>
      <FadeIn><Installation /></FadeIn>
      <FadeIn><ProAudio /></FadeIn>
      <Footer />

      <AnimatePresence>
        {!(isLeadModalOpen || isDiagModalOpen) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {/* 1. Request Service — bloom pulse vibrate */}
      <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[60] flex items-center justify-center">
        <span className="absolute inset-0 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] bg-brandTeal opacity-40 scale-[1.5]" />
        <motion.button
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, -8, 8, -8, 8, 0], y: 0 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLeadModalOpen(true)}
          className="relative bg-brandTeal text-white rounded-full p-4 sm:p-5 shadow-[0_0_30px_rgba(94,161,155,1)] hover:bg-brandTeal-light hover:shadow-[0_0_50px_rgba(94,161,155,1)] transition-all flex items-center justify-center group"
        >
          <svg className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="hidden sm:block absolute right-full mr-5 bg-brandDark-900/90 backdrop-blur-md text-brandTeal text-xs font-black uppercase tracking-widest px-5 py-3 rounded shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-brandTeal/30">Request Service</span>
        </motion.button>
      </div>

      {/* 2. WhatsApp — bloom pulse vibrate */}
      <div className="fixed bottom-24 right-5 sm:bottom-32 sm:right-8 z-[60] flex items-center justify-center overflow-visible">
        <span className="absolute inset-0 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] bg-[#25D366] opacity-40 scale-[1.5]" style={{ animationDelay: '500ms' }} />
        <motion.a
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 8, -8, 0], y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', bounce: 0.5 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/919964689378?text=Hello%20AHA%20Technologies!%20I%20have%20an%20inquiry%20regarding%20my%20AV%20equipment."
          target="_blank" rel="noopener noreferrer"
          className="relative bg-[#25D366] text-white rounded-full p-4 sm:p-5 shadow-[0_0_30px_rgba(37,211,102,1)] hover:bg-[#20b858] hover:shadow-[0_0_50px_rgba(37,211,102,1)] transition-all flex items-center justify-center group"
        >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.482-1.459-1.656-1.756-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              <span className="hidden sm:block absolute right-full mr-5 bg-brandDark-900/90 backdrop-blur-md text-[#25D366] text-xs font-black uppercase tracking-widest px-5 py-3 rounded shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#25D366]/30">Chat on WhatsApp</span>
            </motion.a>
      </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
      <DiagnosticModal isOpen={isDiagModalOpen} onClose={() => setIsDiagModalOpen(false)} />
      <ImageModal imageSrc={lightboxImg} onClose={() => setLightboxImg(null)} />
    </div>
  );
}

export default App;
