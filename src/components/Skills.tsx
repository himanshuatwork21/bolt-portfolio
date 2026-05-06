import { motion } from 'framer-motion';
import { Shield, Wifi, Code, Wrench, Monitor } from 'lucide-react';
import SectionHeader from './SectionHeader';

const SKILL_CATEGORIES = [
  {
    icon: Shield,
    label: 'Cybersecurity',
    color: '#00ff88',
    skills: [
      { name: 'Penetration Testing', level: 80 },
      { name: 'Web Application Security', level: 75 },
      { name: 'OSINT', level: 85 },
      { name: 'Vulnerability Assessment', level: 78 },
      { name: 'Social Engineering', level: 70 },
    ],
  },
  {
    icon: Wifi,
    label: 'Networking',
    color: '#00d4ff',
    skills: [
      { name: 'TCP/IP', level: 82 },
      { name: 'Wireshark', level: 76 },
      { name: 'Nmap', level: 88 },
      { name: 'Firewall Config', level: 72 },
      { name: 'VPN & Tunneling', level: 68 },
    ],
  },
  {
    icon: Code,
    label: 'Programming',
    color: '#00ffcc',
    skills: [
      { name: 'Python', level: 80 },
      { name: 'Bash Scripting', level: 85 },
      { name: 'JavaScript', level: 65 },
      { name: 'SQL', level: 70 },
      { name: 'PowerShell', level: 60 },
    ],
  },
  {
    icon: Wrench,
    label: 'Security Tools',
    color: '#00ff88',
    skills: [
      { name: 'Burp Suite', level: 82 },
      { name: 'Metasploit', level: 75 },
      { name: 'Nikto', level: 78 },
      { name: 'Hydra', level: 72 },
      { name: 'SQLMap', level: 70 },
    ],
  },
  {
    icon: Monitor,
    label: 'Operating Systems',
    color: '#00d4ff',
    skills: [
      { name: 'Kali Linux', level: 88 },
      { name: 'Ubuntu/Debian', level: 85 },
      { name: 'Parrot OS', level: 80 },
      { name: 'Windows', level: 75 },
      { name: 'Windows Server', level: 60 },
    ],
  },
];

const TOOL_BADGES = [
  'Nmap', 'Burp Suite', 'Wireshark', 'Metasploit', 'Nikto', 'Hydra',
  'SQLMap', 'John the Ripper', 'Aircrack-ng', 'OWASP ZAP', 'Shodan',
  'Maltego', 'Gobuster', 'ffuf', 'Hashcat', 'CrackMapExec',
];

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[#e8f4f8] text-sm font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{name}</span>
        <span className="font-mono-cyber text-xs" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div
        className="absolute left-0 top-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader tag="// SKILL_SET" title="Technical Skills" subtitle="A comprehensive overview of my cybersecurity toolkit and technical expertise." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-6 cyber-card"
              style={{ border: `1px solid ${cat.color}18` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${cat.color}10`,
                    border: `1px solid ${cat.color}30`,
                    boxShadow: `0 0 12px ${cat.color}15`,
                  }}
                >
                  <cat.icon size={18} style={{ color: cat.color }} />
                </div>
                <h3 className="font-orbitron text-sm font-bold text-white tracking-wider">{cat.label}</h3>
              </div>
              <div className="flex flex-col gap-4">
                {cat.skills.map(skill => (
                  <SkillBar key={skill.name} {...skill} color={cat.color} />
                ))}
              </div>
            </motion.div>
          ))}

          {/* Tools badge card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass rounded-xl p-6"
            style={{ border: '1px solid rgba(0,255,136,0.08)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}
              >
                <Wrench size={18} className="text-[#00d4ff]" />
              </div>
              <h3 className="font-orbitron text-sm font-bold text-white tracking-wider">Hacking Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {TOOL_BADGES.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="px-3 py-1 rounded text-xs font-mono-cyber transition-all duration-200 cursor-default hover:scale-105"
                  style={{
                    background: 'rgba(0,255,136,0.06)',
                    border: '1px solid rgba(0,255,136,0.2)',
                    color: '#00ff88',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.background = 'rgba(0,255,136,0.15)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 10px rgba(0,255,136,0.2)';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.background = 'rgba(0,255,136,0.06)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
