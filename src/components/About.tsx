import { motion } from 'framer-motion';
import { Shield, Terminal, Globe, Cpu, Target, Flag } from 'lucide-react';
import SectionHeader from './SectionHeader';

const FACTS = [
  { icon: Shield, label: 'Ethical Hacking', desc: 'Passionate about offensive security and responsible disclosure.' },
  { icon: Terminal, label: 'Linux & Scripting', desc: 'Proficient in Bash, Python, and command-line security tooling.' },
  { icon: Globe, label: 'Networking', desc: 'Deep understanding of TCP/IP, protocols, and network analysis.' },
  { icon: Cpu, label: 'Security Tools', desc: 'Hands-on with Nmap, Burp Suite, Metasploit, Wireshark and more.' },
  { icon: Target, label: 'CTF Competitions', desc: 'Active participant in Capture The Flag events on TryHackMe & HTB.' },
  { icon: Flag, label: 'OSINT Research', desc: 'Skilled in open-source intelligence gathering and analysis.' },
];

const TIMELINE = [
  { year: '2022', title: 'Started Cybersecurity Journey', desc: 'Began learning ethical hacking through online platforms and self-study.' },
  { year: '2023', title: 'First CTF Victory', desc: 'Completed first TryHackMe learning path, solved 50+ CTF challenges.' },
  { year: '2024', title: 'Security Internship', desc: 'Worked as a cybersecurity intern, conducting vulnerability assessments.' },
  { year: '2025', title: 'Active Researcher', desc: 'Pursuing CEH certification and contributing to bug bounty programs.' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader tag="// ABOUT_ME" title="About Me" subtitle="Cybersecurity enthusiast driven by curiosity, learning, and the art of ethical hacking." />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Bio + Cards */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-xl p-6"
              style={{ border: '1px solid rgba(0,255,136,0.1)' }}
            >
              <p className="text-[#8ab4c8] leading-relaxed text-base mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                I'm <span className="text-[#00ff88] font-semibold">Himanshu Barman</span>, an aspiring penetration tester and cybersecurity enthusiast. My journey into security began with a fascination for how systems work — and how they break.
              </p>
              <p className="text-[#8ab4c8] leading-relaxed text-base" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                I specialize in <span className="text-[#00d4ff]">web application security</span>, <span className="text-[#00d4ff]">network penetration testing</span>, and <span className="text-[#00d4ff]">OSINT research</span>. I believe in responsible disclosure and building a safer digital world through ethical hacking.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {FACTS.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass rounded-xl p-4 cyber-card"
                  style={{ border: '1px solid rgba(0,255,136,0.08)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center"
                      style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)' }}
                    >
                      <fact.icon size={15} className="text-[#00ff88]" />
                    </div>
                    <span className="text-white text-sm font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {fact.label}
                    </span>
                  </div>
                  <p className="text-[#8ab4c8] text-xs leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {fact.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="flex flex-col gap-2">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-orbitron text-sm text-[#00ff88] tracking-widest mb-6"
            >
              MY JOURNEY
            </motion.h3>
            <div className="relative">
              <div
                className="absolute left-4 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, #00ff88, rgba(0,255,136,0.1))' }}
              />
              <div className="flex flex-col gap-6 pl-12">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    {/* Dot */}
                    <div
                      className="absolute -left-[34px] top-2 w-4 h-4 rounded-full border-2 border-[#00ff88]"
                      style={{
                        background: '#040a0f',
                        boxShadow: '0 0 10px rgba(0,255,136,0.5)',
                        animation: 'timelinePulse 2s ease-in-out infinite',
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                    <div
                      className="glass rounded-xl p-5 cyber-card"
                      style={{ border: '1px solid rgba(0,255,136,0.1)' }}
                    >
                      <span className="font-mono-cyber text-[#00ff88] text-xs tracking-widest">{item.year}</span>
                      <h4 className="text-white font-semibold mt-1 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem' }}>
                        {item.title}
                      </h4>
                      <p className="text-[#8ab4c8] text-sm leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes timelinePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
