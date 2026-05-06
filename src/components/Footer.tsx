import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-12 border-t border-white/5 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #040a0f 0%, #030608 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="font-orbitron text-sm font-bold text-white tracking-widest">
              Himanshu<span className="text-[#00ff88]">.dev</span>
            </span>
            <span className="text-xs text-[#8ab4c8] font-mono-cyber">// cybersecurity</span>
          </motion.div>

          {/* Center - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <div className="text-center">
              <p className="font-orbitron text-sm font-bold gradient-text">100+</p>
              <p className="text-xs text-[#8ab4c8]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>CTF Challenges</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="font-orbitron text-sm font-bold gradient-text">15+</p>
              <p className="text-xs text-[#8ab4c8]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Vulnerabilities Found</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="font-orbitron text-sm font-bold gradient-text">10+</p>
              <p className="text-xs text-[#8ab4c8]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Projects Built</p>
            </div>
          </motion.div>

          {/* Right - Socials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {[
              { icon: Github, url: '#', color: '#00ff88' },
              { icon: Linkedin, url: '#', color: '#00d4ff' },
              { icon: Mail, url: 'mailto:himanshu@example.com', color: '#00ffcc' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded border transition-all duration-200"
                style={{
                  borderColor: social.color,
                  color: social.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${social.color}40`;
                  (e.currentTarget as HTMLElement).style.background = `${social.color}10`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <social.icon size={14} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
        >
          <div className="text-center sm:text-left">
            <p className="text-xs text-[#8ab4c8] font-mono-cyber" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              © 2025 Himanshu Barman. All rights reserved.
            </p>
            <p className="text-xs text-[#8ab4c8]/50 mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Designed & Built with React, Tailwind, and Framer Motion
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold tracking-widest transition-all duration-200"
            style={{
              background: 'rgba(0,255,136,0.1)',
              border: '1px solid rgba(0,255,136,0.3)',
              color: '#00ff88',
              fontFamily: 'Rajdhani, sans-serif',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.2)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,255,136,0.2)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.1)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Back to Top
            <ChevronUp size={12} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
