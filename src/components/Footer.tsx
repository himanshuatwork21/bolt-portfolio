import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronUp } from 'lucide-react';
import { client } from '../sanityClient';
import { footerQuery } from '../queries';

const iconMap: any = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

export default function Footer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(footerQuery).then(setData);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!data) return null;

  return (
    <footer className="relative py-12 border-t border-white/5 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">

          {/* LOGO */}
          <motion.div className="flex items-center gap-2">
            <span className="font-orbitron text-sm font-bold text-white tracking-widest">
              {data.logoText?.split('.')[0]}
              <span className="text-[#00ff88]">.{data.logoText?.split('.')[1]}</span>
            </span>
            <span className="text-xs text-[#8ab4c8] font-mono-cyber">
              {data.tagline}
            </span>
          </motion.div>

          {/* STATS */}
          <div className="flex items-center gap-6">
            {data.stats?.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <p className="font-orbitron text-sm font-bold gradient-text">
                  {stat.value}
                </p>
                <p className="text-xs text-[#8ab4c8]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-3">
            {data.socials?.map((social: any, i: number) => {
              const Icon = iconMap[social.platform.toLowerCase()] || Github;

              return (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded border flex items-center justify-center"
                  style={{
                    borderColor: social.color,
                    color: social.color,
                  }}
                >
                  <Icon size={14} />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-[#8ab4c8]">
            {data.copyright}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded text-xs"
            style={{
              background: 'rgba(0,255,136,0.1)',
              border: '1px solid rgba(0,255,136,0.3)',
              color: '#00ff88',
            }}
          >
            Back to Top
            <ChevronUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}