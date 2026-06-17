import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Legacy from './components/Legacy';
import Gallery from './components/Gallery';
import BrandSlider from './components/BrandSlider';
import Guide from './components/Guide';
import PCBRepair from './components/PCBRepair';
import Installation from './components/Installation';
import ProAudio from './components/ProAudio';
import AiAdvisor from './components/AiAdvisor';
import Footer from './components/Footer';
import { LeadModal, DiagnosticModal, ImageModal } from './components/Modals';

function App() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isDiagModalOpen, setIsDiagModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <div className="antialiased flex flex-col min-h-screen text-slate-300">
      <Navbar />
      <HeroSection onOpenDiagnostic={() => setIsDiagModalOpen(true)} />
      <Legacy />
      <Gallery onImageClick={(src) => setLightboxImg(src)} />
      <BrandSlider />
      <Guide />
      <PCBRepair />
      <Installation />
      <ProAudio />
      <AiAdvisor />
      <Footer />

      {/* Floating Buttons */}
      <button 
        onClick={() => setIsLeadModalOpen(true)}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[60] bg-brandTeal text-white rounded-full p-3 sm:p-4 shadow-[0_0_25px_rgba(94,161,155,0.6)] hover:scale-110 hover:bg-brandTeal-dark transition-all duration-300 flex items-center justify-center group"
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        <span className="hidden sm:block absolute right-full mr-4 bg-brandDark-900 text-brandTeal text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-sm shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">Request Service</span>
      </button>

      <a href="https://wa.me/919964689378?text=Hello%20AHA%20Technologies!%20I%20have%20an%20inquiry%20regarding%20my%20AV%20equipment." target="_blank" rel="noopener noreferrer" className="fixed bottom-20 right-5 sm:bottom-28 sm:right-8 z-[60] bg-[#25D366] text-white rounded-full p-3 sm:p-4 shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:scale-110 hover:bg-[#20b858] transition-all duration-300 flex items-center justify-center group">
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.482-1.459-1.656-1.756-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        <span className="hidden sm:block absolute right-full mr-4 bg-brandDark-900 text-[#25D366] text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-sm shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">Chat on WhatsApp</span>
      </a>

      {/* Modals */}
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
      <DiagnosticModal isOpen={isDiagModalOpen} onClose={() => setIsDiagModalOpen(false)} />
      <ImageModal imageSrc={lightboxImg} onClose={() => setLightboxImg(null)} />
    </div>
  );
}

export default App;
