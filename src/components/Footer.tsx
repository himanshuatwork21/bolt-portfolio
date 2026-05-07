// Footer.tsx

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ChevronUp,
} from 'lucide-react';

import { client } from '../sanity/client';
import { footerQuery } from '../sanity/queries';

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export default function Footer() {
  const [footer, setFooter] = useState<any>(null);

  useEffect(() => {
    client
      .fetch(footerQuery)
      .then((data) => {
        setFooter(data);
      })
      .catch((err) => {
        console.error('Footer fetch error:', err);
      });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!footer) return null;

  return (
    <footer className="relative py-12 border-t border-white/5 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #040a0f 0%, #030608 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="font-orbitron text-sm font-bold text-white tracking-widest">
              {footer.logoText}
            </span>

            <span className="text-xs text-[#8ab4c8] font-mono-cyber">
              {footer.tagline}
            </span>
          </motion.div>

          {/* CENTER */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 flex-wrap justify-center"
          >
            {footer.stats?.map((stat: any, i: number) => (
              <div
                key={i}
                className="text-center"
              >
                <p className="font-orbitron text-sm font-bold gradient-text">
                  {stat.value}
                </p>

                <p
                  className="text-xs text-[#8ab4c8]"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {footer.socials?.map((social: any, i: number) => {
              const Icon = iconMap[social.icon?.toLowerCase()];

              return (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded border transition-all duration-200 flex items-center justify-center"
                  style={{
                    borderColor: social.color,
                    color: social.color,
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.currentTarget as HTMLElement
                    ).style.boxShadow = `0 0 15px ${social.color}40`;

                    (
                      e.currentTarget as HTMLElement
                    ).style.background = `${social.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLElement
                    ).style.boxShadow = 'none';

                    (
                      e.currentTarget as HTMLElement
                    ).style.background = 'transparent';
                  }}
                >
                  {Icon && <Icon size={14} />}
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
        >
          <div className="text-center sm:text-left">
            <p
              className="text-xs text-[#8ab4c8]"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
              }}
            >
              {footer.copyright}
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
            onMouseEnter={(e) => {
              (
                e.currentTarget as HTMLElement
              ).style.background = 'rgba(0,255,136,0.2)';

              (
                e.currentTarget as HTMLElement
              ).style.boxShadow =
                '0 0 20px rgba(0,255,136,0.2)';
            }}
            onMouseLeave={(e) => {
              (
                e.currentTarget as HTMLElement
              ).style.background = 'rgba(0,255,136,0.1)';

              (
                e.currentTarget as HTMLElement
              ).style.boxShadow = 'none';
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