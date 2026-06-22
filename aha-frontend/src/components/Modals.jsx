import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfettiSuccess } from './animations/index.jsx';

export function LeadModal({ isOpen, onClose }) {
  const [status, setStatus] = useState('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target);
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const email = formData.get('email') || '';
    const brandAndModel = formData.get('brandAndModel') || '';
    const issue = formData.get('issue') || '';
    
    const msg = `Hello AHA Technologies!\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nBrand & Model: ${brandAndModel}\nIssue: ${issue}`;
    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919964689378&text=${encodedMsg}`;

    setTimeout(() => {
      setStatus('success');
      window.open(whatsappUrl, '_blank');
      setTimeout(() => {
        setStatus('idle');
        e.target.reset();
        onClose();
      }, 2000);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onMouseMove={handleMouseMove}
            className="bg-brandDark-900/90 backdrop-blur-xl border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-[0_0_80px_rgba(94,161,155,0.15)] w-full sm:max-w-md relative z-10 overflow-hidden text-left group"
          >
            {/* Fluid mouse-tracking shadow */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(94,161,155,0.15), transparent 40%)`
              }}
            />

            <ConfettiSuccess active={status === 'success'} />

            <button onClick={onClose} type="button" className="absolute top-4 right-4 text-slate-400 hover:text-brandTeal hover:scale-125 transition-all z-20 hover:rotate-90">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="flex justify-center pt-3 pb-1 sm:hidden"><div className="w-10 h-1 bg-white/20 rounded-full"></div></div>
            
            <div className="p-6 sm:p-8 relative z-10">
              <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">Priority Service <span className="text-brandTeal">⚡</span></motion.h3>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-400 text-sm mb-6">Enter your details and issue below. Our master technicians will contact you immediately.</motion.p>
              
              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.form key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSubmit} className="space-y-4">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><motion.input whileFocus={{ borderColor: 'rgba(94,161,155,0.8)', boxShadow: '0 0 0 3px rgba(94,161,155,0.15)', scale: 1.02 }} name="name" type="text" required placeholder="Full Name" className="w-full bg-black/40 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none transition-all placeholder-slate-500 shadow-inner" /></motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}><motion.input whileFocus={{ borderColor: 'rgba(94,161,155,0.8)', boxShadow: '0 0 0 3px rgba(94,161,155,0.15)', scale: 1.02 }} name="phone" type="tel" required placeholder="Phone Number" className="w-full bg-black/40 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none transition-all placeholder-slate-500 shadow-inner" /></motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}><motion.input whileFocus={{ borderColor: 'rgba(94,161,155,0.8)', boxShadow: '0 0 0 3px rgba(94,161,155,0.15)', scale: 1.02 }} name="email" type="email" required placeholder="Email Address" className="w-full bg-black/40 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none transition-all placeholder-slate-500 shadow-inner" /></motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}><motion.input whileFocus={{ borderColor: 'rgba(94,161,155,0.8)', boxShadow: '0 0 0 3px rgba(94,161,155,0.15)', scale: 1.02 }} name="brandAndModel" type="text" placeholder="Brand & Model" className="w-full bg-black/40 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none transition-all placeholder-slate-500 shadow-inner" /></motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}><motion.textarea whileFocus={{ borderColor: 'rgba(94,161,155,0.8)', boxShadow: '0 0 0 3px rgba(94,161,155,0.15)', scale: 1.02 }} name="issue" required rows="3" placeholder="Equipment Brand & Issue..." className="w-full bg-black/40 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all resize-none placeholder-slate-500 shadow-inner"></motion.textarea></motion.div>
                    
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                      <motion.button 
                        disabled={status === 'sending'} 
                        type="submit" 
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(94,161,155,0.6)' }} 
                        whileTap={{ scale: 0.92 }}
                        className="w-full py-4 bg-brandTeal text-white rounded-xl font-black tracking-widest text-xs hover:bg-brandTeal-dark hover:tracking-[0.25em] transition-all mt-4 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {status === 'sending' ? (
                            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>PROCESSING...</motion.span>
                          ) : (
                            <>SEND REQUEST <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }} transition={{ duration: 0.5 }} className="w-20 h-20 bg-brandTeal/20 text-brandTeal rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(94,161,155,0.3)]">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    </motion.div>
                    <h3 className="text-3xl font-black text-white mb-2">Processed!</h3>
                    <p className="text-slate-400 text-sm">We will contact you shortly.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function DiagnosticModal({ isOpen, onClose }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setImageSrc(URL.createObjectURL(f));
      setStatus('idle');
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setStatus('uploading');
    
    // Simulate upload delay for manual review queue
    setTimeout(() => {
      setStatus('done');
    }, 2500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setImageSrc(null);
      setFile(null);
      setStatus('idle');
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleClose} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-brandDark-900/90 backdrop-blur-xl border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-[0_0_80px_rgba(94,161,155,0.15)] w-full sm:max-w-lg relative z-10 text-left max-h-[90vh] overflow-y-auto"
          >
            <button onClick={handleClose} className="absolute top-5 right-5 text-slate-500 hover:text-white z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
            <div className="flex justify-center pt-3 pb-1 sm:hidden"><div className="w-10 h-1 bg-white/20 rounded-full"></div></div>
            
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Initial Visual Inspection</h3>
              <p className="text-slate-400 text-sm mb-6">Upload an image of your equipment and our engineers will review it manually for diagnosis.</p>
              
              <div className="space-y-5">
                <motion.div whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(94,161,155,0.15)' }} whileTap={{ scale: 0.98 }} className="border-2 border-dashed border-white/10 rounded-2xl p-6 sm:p-8 text-center cursor-pointer hover:border-brandTeal hover:bg-brandTeal/5 transition-all relative overflow-hidden">
                  <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                  {!imageSrc ? (
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-brandTeal text-xs uppercase tracking-widest font-bold">Tap to Select Image</motion.div>
                  ) : (
                    <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={imageSrc} alt="Preview" className="w-full h-40 sm:h-48 object-contain rounded-lg shadow-lg hover:scale-110 transition-transform duration-500" />
                  )}
                </motion.div>
                
                <AnimatePresence mode="wait">
                  {status !== 'done' ? (
                    <motion.button 
                      key="uploadBtn"
                      initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}
                      onClick={handleUpload} 
                      disabled={status === 'uploading' || !file} 
                      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(94,161,155,0.6)' }} whileTap={{ scale: 0.92 }}
                      className="w-full py-4 bg-brandTeal text-white rounded-xl font-black tracking-widest text-xs disabled:opacity-50 hover:bg-brandTeal-dark hover:tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(94,161,155,0.3)] disabled:shadow-none group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === 'uploading' ? (
                          <>
                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full block" />
                            UPLOADING...
                          </>
                        ) : 'SUBMIT FOR REVIEW'}
                      </span>
                    </motion.button>
                  ) : (
                    <motion.div 
                      key="successAlert"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-brandTeal/10 border border-brandTeal/30 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-3"
                    >
                      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }} transition={{ duration: 0.5 }} className="w-12 h-12 bg-brandTeal/20 text-brandTeal rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(94,161,155,0.3)]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                      </motion.div>
                      <h4 className="text-brandTeal font-bold uppercase tracking-widest text-xs">Image Received Successfully</h4>
                      <p className="text-slate-300 text-sm">Our engineers will inspect the image and contact you shortly with an Initial Visual Inspection report.</p>
                      <button onClick={handleClose} className="w-full mt-2 bg-brandDark border border-white/10 hover:border-white/30 px-4 py-3 rounded-lg font-bold text-xs uppercase text-slate-300 hover:text-white transition-colors">Close</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ImageModal({ imageSrc, onClose }) {
  return (
    <AnimatePresence>
      {imageSrc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="max-w-6xl w-full flex items-center justify-center relative z-10 pointer-events-none"
          >
            <button onClick={onClose} className="absolute -top-12 right-0 sm:top-0 sm:-right-16 text-slate-400 hover:text-white transition-colors pointer-events-auto bg-black/50 p-2 rounded-full backdrop-blur">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <img src={imageSrc} alt="Zoomed Work" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-auto" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
