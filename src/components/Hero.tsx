import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, Code2 } from 'lucide-react';

const TYPING_STRINGS = [
  'Ethical Hacker',
  'Pentester',
  'OSINT Researcher',
  'Security Analyst',
  'CTF Player',
];

function useTypingEffect(strings: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState('');
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setStrIdx(s => (s + 1) % strings.length);
    }

    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, strIdx, strings, speed, pause]);

  return text;
}

function ProfileShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      el.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
    };
    const onLeave = () => {
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex items-center justify-center relative"
    >
      <div
        ref={containerRef}
        className="relative w-72 h-72 md:w-96 md:h-96 float-anim"
        style={{ transition: 'transform 0.2s ease', transformStyle: 'preserve-3d' }}
      >
        {/* Outer rotating ring 1 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(0,255,136,0.15)',
            animation: 'rotateRing 12s linear infinite',
          }}
        >
          {[0, 90, 180, 270].map(angle => (
            <div
              key={angle}
              className="absolute w-2 h-2 rounded-full bg-[#00ff88]"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translateX(50%) translateX(calc(50% - 4px)) translateY(-50%)`,
                boxShadow: '0 0 8px #00ff88',
                marginLeft: '-4px',
                marginTop: '-4px',
              }}
            />
          ))}
        </div>

        {/* Outer ring 2 */}
        <div
          className="absolute rounded-full"
          style={{
            inset: '-20px',
            border: '1px dashed rgba(0,212,255,0.15)',
            animation: 'rotateRingReverse 18s linear infinite',
          }}
        >
          {[45, 135, 225, 315].map(angle => (
            <div
              key={angle}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translateX(calc(50% + 10px)) translateY(-50%)`,
                boxShadow: '0 0 6px #00d4ff',
                marginLeft: '-3px',
                marginTop: '-3px',
              }}
            />
          ))}
        </div>

        {/* Ambient glow blob */}
        <div
          className="absolute inset-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'glowPulse 3s ease-in-out infinite',
          }}
        />

        {/* Profile image frame */}
        <div
          className="absolute inset-8 rounded-full overflow-hidden"
          style={{
            border: '2px solid rgba(0,255,136,0.4)',
            boxShadow:
              '0 0 20px rgba(0,255,136,0.3), 0 0 40px rgba(0,255,136,0.1), 0 0 60px rgba(0,212,255,0.05), inset 0 0 20px rgba(0,255,136,0.05)',
          }}
        >
          {/* Glassmorphism overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,136,0.05) 0%, transparent 50%, rgba(0,212,255,0.05) 100%)',
            }}
          />
          <img
            src="https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Himanshu Barman"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.9) saturate(0.8) contrast(1.1)' }}
          />
          {/* Scan line effect */}
          <div
            className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.4), transparent)',
              animation: 'scanLine 3s linear infinite',
            }}
          />
        </div>

        {/* Corner decorations */}
        {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-4 h-4`}
            style={{
              borderTop: i < 2 ? '2px solid rgba(0,255,136,0.6)' : 'none',
              borderBottom: i >= 2 ? '2px solid rgba(0,255,136,0.6)' : 'none',
              borderLeft: i % 2 === 0 ? '2px solid rgba(0,255,136,0.6)' : 'none',
              borderRight: i % 2 === 1 ? '2px solid rgba(0,255,136,0.6)' : 'none',
            }}
          />
        ))}

        {/* Status badge */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass px-4 py-1.5 rounded-full flex items-center gap-2 whitespace-nowrap"
          style={{ border: '1px solid rgba(0,255,136,0.3)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
          <span className="text-xs font-mono-cyber text-[#00ff88] tracking-widest">AVAILABLE FOR HIRE</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const typedText = useTypingEffect(TYPING_STRINGS);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center cyber-grid overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#040a0f] via-[#040a0f] to-[#051520] pointer-events-none" />
      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-12 bg-gradient-to-r from-[#00ff88] to-transparent" />
              <span className="font-mono-cyber text-[#00ff88] text-sm tracking-widest">
                &gt; SECURITY_PROFESSIONAL.exe
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
            >
              Himanshu
              <br />
              <span className="gradient-text">Barman</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#8ab4c8] text-base md:text-lg leading-relaxed max-w-lg"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
            >
              Aspiring Penetration Tester &nbsp;|&nbsp; Cybersecurity Enthusiast &nbsp;|&nbsp; Security Researcher
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 h-10"
            >
              <span className="text-[#8ab4c8] font-mono-cyber text-sm">&gt;</span>
              <span
                className="text-xl font-semibold text-[#00ff88]"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {typedText}
              </span>
              <span
                className="text-[#00ff88] text-xl"
                style={{ animation: 'blink 1s ease-in-out infinite' }}
              >
                |
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm tracking-wider transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
                  color: '#040a0f',
                  fontFamily: 'Rajdhani, sans-serif',
                  boxShadow: '0 4px 20px rgba(0,255,136,0.3)',
                }}
              >
                <Code2 size={16} />
                View Projects
              </a>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm tracking-wider text-[#00ff88] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00ff88]/10"
                style={{
                  border: '1px solid rgba(0,255,136,0.4)',
                  fontFamily: 'Rajdhani, sans-serif',
                }}
              >
                <Download size={16} />
                Download Resume
              </button>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm tracking-wider text-[#00d4ff] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00d4ff]/10"
                style={{
                  border: '1px solid rgba(0,212,255,0.3)',
                  fontFamily: 'Rajdhani, sans-serif',
                }}
              >
                <Mail size={16} />
                Contact Me
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {[
                { val: '50+', label: 'CTF Challenges' },
                { val: '10+', label: 'Projects Built' },
                { val: '5+', label: 'Certifications' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-orbitron text-2xl font-bold gradient-text">{stat.val}</span>
                  <span className="text-xs text-[#8ab4c8] tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right */}
          <div className="order-1 md:order-2">
            <ProfileShowcase />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-mono-cyber text-[#8ab4c8] text-xs tracking-widest">SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={20} className="text-[#00ff88]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
