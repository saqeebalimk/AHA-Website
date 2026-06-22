/**
 * AHA Technologies — Premium Animation Component Library V4
 * Apple × Tesla × Bang & Olufsen × ChatGPT
 */
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

// ─────────────────────────────────────────────
// FADE IN  (scroll-triggered)
// ─────────────────────────────────────────────
export const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.65, ease: 'easeOut', delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
// SLIDE UP
// ─────────────────────────────────────────────
export const SlideUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
// SLIDE LEFT / RIGHT
// ─────────────────────────────────────────────
export const SlideLeft = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideRight = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
// STAGGER CONTAINER + ITEM
// ─────────────────────────────────────────────
export const StaggerContainer = ({ children, stagger = 0.1, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{ visible: { transition: { staggerChildren: stagger } } }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 25 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
// TILT CARD  — 3-D mouse-follow tilt
// ─────────────────────────────────────────────
export const TiltCard = ({ children, className = '', intensity = 8 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(94,161,155,0.15)' }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MAGNETIC BUTTON V5  — cursor-follow magnet with hover morph
// ─────────────────────────────────────────────
export const MagneticButton = ({ children, className = '', onClick, strength = 0.35 }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };
  const handleEnter = () => setIsHover(true);
  const handleLeave = () => { setPos({ x: 0, y: 0 }); setIsHover(false); };

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      whileTap={{ scale: 0.93 }}
      onMouseMove={handleMouse}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      <div className="relative z-10">{children}</div>
    </motion.button>
  );
};

// ─────────────────────────────────────────────
// CURSOR GLOW  — large glowing custom cursor
// ─────────────────────────────────────────────
export const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setIsHovering(!!e.target.closest('button, a, [role="button"]'));
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border border-brandTeal/40 mix-blend-screen hidden lg:block"
        animate={{
          x: pos.x - (isHovering ? 28 : 20),
          y: pos.y - (isHovering ? 28 : 20),
          width: isClicking ? 28 : isHovering ? 56 : 40,
          height: isClicking ? 28 : isHovering ? 56 : 40,
          opacity: isHovering ? 0.9 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 28 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-brandTeal hidden lg:block"
        animate={{ x: pos.x - 3, y: pos.y - 3, scale: isClicking ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      />
    </>
  );
};

// ─────────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────────
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brandTeal via-purple-400 to-brandTeal z-[999] origin-left"
    />
  );
};

// ─────────────────────────────────────────────
// WAVE DIVIDER
// ─────────────────────────────────────────────
export const WaveDivider = ({ flip = false, color = '#0d1117' }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ height: 60 }}>
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
      <path
        d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
        fill={color}
      />
    </svg>
  </div>
);

// ─────────────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────────────
export const Typewriter = ({ words = [], speed = 80, pause = 1800, className = '' }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx] || '';
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setWordIdx((i) => (i + 1) % words.length); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, speed, pause]);

  return (
    <span className={className}>
      {text}
    </span>
  );
};

// ─────────────────────────────────────────────
// PARTICLE BACKGROUND  — lightweight CSS particles
// ─────────────────────────────────────────────
export const ParticleBackground = ({ count = 24 }) => {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      dur: Math.random() * 12 + 8,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brandTeal/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// FLOATING GLOW BLOB
// ─────────────────────────────────────────────
export const FloatingGlow = ({ color = 'rgba(94,161,155,0.08)', size = 400, top, left, right, bottom }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, background: color, filter: 'blur(80px)', top, left, right, bottom }}
    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// ─────────────────────────────────────────────
// CHAT MESSAGE
// ─────────────────────────────────────────────
export const ChatMessage = ({ children, role, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: role === 'user' ? 20 : -20, y: 5 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
// ACTION ICON BUTTON
// ─────────────────────────────────────────────
export const ActionIcon = ({ children, onClick, title, className = '' }) => (
  <motion.button
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.85 }}
    transition={{ duration: 0.15 }}
    onClick={onClick}
    title={title}
    className={`p-1 rounded text-slate-500 hover:text-white transition-colors ${className}`}
  >
    {children}
  </motion.button>
);

// ─────────────────────────────────────────────
// BLOOM BUTTON  — pulsing glow FAB
// ─────────────────────────────────────────────
export const BloomButton = ({ children, delay = 0, className = '', onClick }) => (
  <motion.button
    animate={{ scale: [1, 1.06, 1] }}
    transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    whileHover={{ scale: 1.12 }}
    whileTap={{ scale: 0.93 }}
    onClick={onClick}
    className={className}
  >
    {children}
  </motion.button>
);

// ─────────────────────────────────────────────
// SCALE ON HOVER
// ─────────────────────────────────────────────
export const ScaleOnHover = ({ children, scale = 1.03, className = '' }) => (
  <motion.div
    whileHover={{ scale, y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
// COUNT UP
// ─────────────────────────────────────────────
export const CountUp = ({ target, suffix = '', duration = 2000, className = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const step = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref} className={className}>{count}{suffix}</span>;
};

// ─────────────────────────────────────────────
// TEXT REVEAL  — lines staggering up (V5)
// ─────────────────────────────────────────────
export const TextReveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
// LETTER REVEAL  — individual characters (V5)
// ─────────────────────────────────────────────
export const LetterReveal = ({ text, delay = 0, className = '' }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * 0.1 },
    }),
  };
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
    hidden: { opacity: 0, y: 20 },
  };
  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block whitespace-pre">
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ─────────────────────────────────────────────
// CONFETTI SUCCESS (V5)
// ─────────────────────────────────────────────
export const ConfettiSuccess = ({ active = false }) => {
  if (!active) return null;
  const particles = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-50">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: Math.random() * 0.5 + 0.5 }}
          animate={{
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400 - 100,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.5 + Math.random(), ease: 'easeOut' }}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: ['#5ea19b', '#9333ea', '#ffffff', '#4ade80'][Math.floor(Math.random() * 4)],
          }}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// PULSE DOT (V5)
// ─────────────────────────────────────────────
export const PulseDot = ({ color = '#5ea19b', className = '' }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <motion.div
      animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      className="absolute inset-0 rounded-full"
      style={{ backgroundColor: color }}
    />
    <div className="w-3 h-3 rounded-full relative z-10" style={{ backgroundColor: color }} />
  </div>
);
