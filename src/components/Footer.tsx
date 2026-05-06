import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronUp } from 'lucide-react';

const ICON_MAP: any = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

export default function Footer({ data }: any) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!data) return null;

  const [name, domain] = data.brand?.split('.') || ['Himanshu', 'dev'];

  return (
    <footer className="relative py-12 border-t border-white/5 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #040a0f 0%, #030608 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* LEFT (Brand) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="font-orbitron text-sm font-bold text-white tracking-widest">
              {name}
              <span className="text-[#00ff88]">.{domain}</span>
            </span>
            <span className="text-xs text-[#8ab4c8] font-mono-cyber">
              // {data.subtitle}
            </span>
          </motion.div>

          {/* CENTER (Stats) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            {data.stats?.map((stat: any, i: number) => (
              <div key={i} className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-orbitron text-sm font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p
                    className="text-xs text-[#8ab4c8]"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {stat.label}
                  </p>
                </div>

                {i !== data.stats.length - 1 && (
                  <div className="w-px h-8 bg-white/10" />
                )}
              </div>
            ))}
          </motion.div>

          {/* RIGHT (Socials) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {data.socials?.map((social: any, i: number) => {
              const Icon = ICON_MAP[social.name?.toLowerCase()] || Github;

              return (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded border transition-all duration-200"
                  style={{
                    borderColor: '#00ff88',
                    color: '#00ff88',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 0 15px #00ff8840`;
                    e.currentTarget.style.background = `#00ff8810`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icon size={14} />
                </motion.a>
              );
            })}
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
            <p
              className="text-xs text-[#8ab4c8]"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              © {new Date().getFullYear()} {data.brand}. All rights reserved.
            </p>
            <p
              className="text-xs text-[#8ab4c8]/50 mt-1"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
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
          >
            Back to Top
            <ChevronUp size={12} />
          </motion.button>
        </motion.div>

      </div>
    </footer>
  );
}