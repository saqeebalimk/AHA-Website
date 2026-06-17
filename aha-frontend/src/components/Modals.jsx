import React, { useState } from 'react';

export function LeadModal({ isOpen, onClose }) {
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
        setTimeout(() => {
          setStatus('idle');
          onClose();
        }, 3500);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-brandDark-900 border border-white/10 rounded-t-2xl sm:rounded-xl shadow-2xl w-full sm:max-w-md relative z-10 overflow-hidden text-left">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        {/* Drag handle for mobile bottom sheet feel */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-white/20 rounded-full"></div>
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Priority Service</h3>
          <p className="text-slate-400 text-sm mb-5 sm:mb-6">Enter your details and issue below. Our master technicians will contact you immediately.</p>
          
          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <input name="name" type="text" required placeholder="Full Name" className="w-full bg-brandDark border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brandTeal" />
              <input name="phone" type="tel" required placeholder="Phone Number" className="w-full bg-brandDark border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brandTeal" />
              <input name="email" type="email" required placeholder="Email Address" className="w-full bg-brandDark border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brandTeal" />
              <textarea name="issue" required rows="3" placeholder="Equipment Brand & Issue..." className="w-full bg-brandDark border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brandTeal resize-none"></textarea>
              <button disabled={status === 'sending'} type="submit" className="w-full py-4 bg-brandTeal text-white rounded-lg font-black tracking-widest text-xs hover:bg-brandTeal-dark transition-all mt-2">
                {status === 'sending' ? 'SENDING...' : 'SEND REQUEST'}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-brandTeal/20 text-brandTeal rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Request Processed!</h3>
              <p className="text-slate-400 text-sm">We will get back to you shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DiagnosticModal({ isOpen, onClose }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setImageSrc(URL.createObjectURL(f));
      setResult('');
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setStatus('analyzing');
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result.split(',')[1];
      const mimeType = file.type;

      try {
        const res = await fetch('http://localhost:8001/api/diagnose/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64data, mime_type: mimeType })
        });
        const data = await res.json();
        if (data.reply) {
          setResult(data.reply);
        } else if (data.error) {
          setResult("Error: " + data.error);
        } else {
          setResult("Analysis failed.");
        }
      } catch (err) {
        setResult("Network error — please check connection.");
      }
      setStatus('done');
    };
    reader.readAsDataURL(file);
  };

  const handleContinue = () => {
    onClose();
    document.getElementById('advisor')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="bg-brandDark-900 border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg relative z-10 text-left max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </button>
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-white/20 rounded-full"></div>
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Visual Diagnostic ✨</h3>
          <p className="text-slate-400 text-xs mb-5 sm:mb-6">Upload an image of your equipment for a preliminary Gemini AI assessment.</p>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-brandTeal transition-all relative">
              <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              {!imageSrc ? (
                <div className="text-slate-500 text-xs uppercase tracking-widest font-bold">Tap to Select Image</div>
              ) : (
                <img src={imageSrc} alt="Preview" className="w-full h-28 sm:h-32 object-contain" />
              )}
            </div>
            
            <button onClick={handleAnalyze} disabled={status === 'analyzing' || !file} className="w-full py-4 bg-brandTeal text-white rounded-lg font-black tracking-widest text-xs disabled:opacity-50 hover:bg-brandTeal-dark transition-all">
              {status === 'analyzing' ? 'ANALYZING...' : 'ANALYZE NOW'}
            </button>
            
            {status === 'analyzing' && <div className="text-xs text-brandTeal mt-4 text-center">Uploading image to Gemini Vision AI...</div>}
            
            {result && (
              <div className="mt-4">
                <span className="text-brandTeal font-bold uppercase tracking-widest block mb-2 text-xs">Gemini AI Assessment:</span>
                <div className="text-slate-300 text-[13px] leading-relaxed whitespace-pre-line max-h-36 sm:max-h-40 overflow-y-auto pr-2">{result}</div>
                <p className="text-white text-xs font-bold mt-4">Contact us at +91 99646 89378 or use the Request Service button to book your lab slot.</p>
                <button onClick={handleContinue} className="w-full mt-4 bg-brandDark border border-brandTeal/30 hover:border-brandTeal text-brandTeal px-4 py-3 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 uppercase tracking-widest">
                  Continue in Chat
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImageModal({ imageSrc, onClose }) {
  if (!imageSrc) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      <button onClick={onClose} className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white hover:text-brandTeal transition-colors">
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <div className="max-w-5xl w-full flex items-center justify-center">
        <img src={imageSrc} alt="Zoomed Work" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10" />
      </div>
    </div>
  );
}
