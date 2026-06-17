import React, { useState } from 'react';

export default function HeroSection({ onOpenDiagnostic }) {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target);
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: 'Equipment & Issue:\n' + formData.get('issue')
    };

    try {
      const res = await fetch('http://localhost:8001/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 3500);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="home" className="relative pt-36 pb-16 lg:pt-56 lg:pb-32 overflow-hidden" style={{ backgroundImage: "linear-gradient(to right, rgba(17, 17, 17, 0.95) 20%, rgba(17, 17, 17, 0.7) 100%), url('/luxury-lifestyle-background-interior-exterior-152.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-brandDark-900/40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 text-center lg:text-left pt-4 lg:pt-10">
            <div className="inline-flex items-center gap-3 mb-5 px-5 py-2 border border-brandTeal/20 rounded-full bg-brandTeal/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brandTeal animate-pulse"></span>
              <span className="text-[10px] text-brandTeal font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Quality Services Assured</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-5 leading-[1.1] tracking-tight drop-shadow-lg">
              Precision Audio <br/><span className="text-brandTeal">Engineering.</span>
            </h1>
            <p className="mt-3 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-slate-300 mb-8 font-medium leading-relaxed drop-shadow-md">
              Bangalore's trusted authorized service destination for high-end Hi-Fi systems, amplifiers, and cinematic audio gear. Since 1991.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button onClick={onOpenDiagnostic} className="px-8 py-4 bg-brandTeal text-white font-black tracking-widest text-xs rounded-sm transition-all hover:bg-brandTeal-dark hover:-translate-y-1 shadow-[0_0_20px_rgba(94,161,155,0.4)]">
                VISUAL DIAGNOSTIC ✨
              </button>
              <a href="#advisor" className="px-8 py-4 border border-white/20 text-white font-black tracking-widest text-xs rounded-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                TALK TO AI ADVISOR
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="bg-brandDark-900/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">
              <div className="h-40 sm:h-48 w-full relative">
                <img src="/Gemini_Generated_Image_xi8rhuxi8rhuxi8r.png" alt="Premium Audio Service" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brandDark-900 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">Priority Service</h3>
                  <p className="text-brandTeal text-xs font-bold tracking-widest uppercase mt-1 drop-shadow-md">Master Technicians</p>
                </div>
              </div>
              
              {status !== 'success' ? (
                <div className="p-5 sm:p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <input name="name" type="text" required placeholder="Full Name" className="w-full bg-brandDark/50 border border-white/10 rounded-lg px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-brandTeal focus:bg-brandDark transition-colors" />
                    <input name="phone" type="tel" required placeholder="Phone Number" className="w-full bg-brandDark/50 border border-white/10 rounded-lg px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-brandTeal focus:bg-brandDark transition-colors" />
                    <input name="email" type="email" required placeholder="Email Address" className="w-full bg-brandDark/50 border border-white/10 rounded-lg px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-brandTeal focus:bg-brandDark transition-colors" />
                    <textarea name="issue" required rows="2" placeholder="Equipment Brand & Issue..." className="w-full bg-brandDark/50 border border-white/10 rounded-lg px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-brandTeal focus:bg-brandDark transition-colors resize-none"></textarea>
                    <button disabled={status === 'sending'} type="submit" className="w-full py-4 bg-brandTeal text-white rounded-lg font-black tracking-widest text-xs hover:bg-brandTeal-dark transition-all shadow-lg shadow-brandTeal/20 mt-2 flex justify-center items-center gap-2">
                      {status === 'sending' ? 'SENDING...' : 'REQUEST CALL BACK'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-12 px-6">
                  <div className="w-16 h-16 bg-brandTeal/20 text-brandTeal rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Request Processed!</h3>
                  <p className="text-slate-400 text-sm">We will contact you shortly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
