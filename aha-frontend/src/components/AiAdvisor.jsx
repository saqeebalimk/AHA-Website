import React from 'react';

export default function AiAdvisor() {
  const [messages, setMessages] = React.useState([
    { role: 'bot', text: 'Welcome to the AHA Tech Lab. I have 50 years of collective expertise behind me. How can I help with your AV equipment today?' }
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sessionId, setSessionId] = React.useState('session_' + Math.random().toString(36).substr(2, 9));
  const chatEndRef = React.useRef(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const speak = (text) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const clean = text.replace(/\[ACTION:.*?\]/g, '').replace(/\[QUICK:.*?\]/g, '');
      const utt = new SpeechSynthesisUtterance(clean);
      utt.rate = 0.95;
      utt.pitch = 0.85;
      utt.volume = 1.0;
      window.speechSynthesis.speak(utt);
    } catch (e) {}
  };

  const handleSend = async (textOverride) => {
    const text = textOverride || input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8001/api/chat/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, text })
      });
      const data = await response.json();
      setLoading(false);
      
      const reply = data.error ? "System error occurred." : data.reply;
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      speak(reply);
    } catch {
      setLoading(false);
      const reply = "I am currently disconnected from the network.";
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      speak(reply);
    }
  };

  const parseReply = (text) => {
    let html = text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
    
    html = html.replace(/\[ACTION:WA_BUTTON:(.+?)\]/g, (_, link) => {
      return `<a href="${link}" target="_blank" class="mt-4 block text-center bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all decoration-none">Confirm on WhatsApp ➔</a>`;
    });

    const parts = html.split(/\[QUICK:(.+?)\]/);
    if (parts.length > 1) {
      return { html: parts[0], quicks: parts[1].split('|') };
    }
    return { html, quicks: [] };
  };

  const restartChat = () => {
    setSessionId('session_' + Math.random().toString(36).substr(2, 9));
    setMessages([{ role: 'bot', text: 'Conversation restarted! Welcome back. How can I help today? \n\n[QUICK:Book Service|PCB Repair|Home Theatres]' }]);
  };

  return (
    <section id="advisor" className="py-16 sm:py-24 bg-brandDark-900 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">AHA Voice Advisor ✨</h2>
          <p className="text-slate-400 text-sm sm:text-base">Ask our AI lead engineer about your equipment issues. Voice responses enabled.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-brandDark border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[420px] sm:h-[500px] shadow-2xl">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-brandDark-900">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest uppercase">AHA Tech Advisor · Online</span>
            </div>
            <button onClick={restartChat} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-brandTeal transition-colors tracking-widest uppercase">
              Restart
            </button>
          </div>

          <div className="flex-1 p-4 sm:p-6 overflow-y-auto chat-scroll space-y-4">
            {messages.map((m, i) => {
              const { html, quicks } = parseReply(m.text);
              return (
                <div key={i} className={`flex gap-2 sm:gap-4 mb-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'bot' && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brandTeal flex-shrink-0 flex items-center justify-center text-white text-[10px] sm:text-xs font-black mt-1">AHA</div>
                  )}
                  <div className={m.role === 'user' ? 'bg-brandTeal text-white rounded-2xl rounded-tr-none p-3 sm:p-5 max-w-[75%] text-sm leading-relaxed' : 'bg-gray-800 border border-white/5 text-slate-300 rounded-2xl rounded-tl-none p-3 sm:p-5 max-w-[80%] sm:max-w-sm text-sm leading-relaxed'}>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                    {quicks.length > 0 && (
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                        {quicks.map((q, idx) => (
                          <button key={idx} onClick={() => handleSend(q)} className="bg-brandDark-900 border border-brandTeal/30 hover:border-brandTeal hover:bg-brandTeal/10 text-brandTeal px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap">
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-brandTeal rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-brandTeal rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1.5 h-1.5 bg-brandTeal rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 sm:p-4 bg-brandDark border-t border-white/10 flex gap-2 sm:gap-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="flex-1 min-w-0 bg-brandDark-900 border border-white/10 rounded-xl px-3 sm:px-6 py-3 sm:py-4 text-white text-sm focus:outline-none focus:border-brandTeal transition-all"
              placeholder="Ask about Amp repair, Home Theatre..."
            />
            <button type="submit" className="flex-shrink-0 px-4 sm:px-8 py-3 sm:py-4 bg-brandTeal text-white rounded-xl font-black tracking-widest text-xs hover:bg-brandTeal-dark transition-all">
              SEND
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
