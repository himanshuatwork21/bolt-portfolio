import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Shield, Wifi, Lock, Search, Package } from 'lucide-react';
import SectionHeader from './SectionHeader';

const PROJECTS = [
  {
    icon: Wifi,
    title: 'PortHawk Scanner',
    description: 'A fast, multi-threaded port scanner built in Python with banner grabbing, service detection, and exportable JSON reports. Supports stealth SYN scans.',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Python', 'Socket', 'Threading', 'Nmap', 'JSON'],
    color: '#00ff88',
    github: '#',
    demo: '#',
    category: 'Network',
  },
  {
    icon: Shield,
    title: 'VulnScan Pro',
    description: 'Automated web vulnerability scanner that detects XSS, SQLi, CSRF, and misconfigured headers. Generates detailed HTML reports with severity ratings.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Python', 'Requests', 'BeautifulSoup', 'OWASP', 'HTML'],
    color: '#00d4ff',
    github: '#',
    demo: '#',
    category: 'Web Security',
  },
  {
    icon: Lock,
    title: 'PassGuard Analyzer',
    description: 'Advanced password strength analyzer with entropy calculation, common pattern detection, breach database checking via HaveIBeenPwned API.',
    image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Python', 'Flask', 'API', 'Cryptography', 'React'],
    color: '#00ffcc',
    github: '#',
    demo: '#',
    category: 'Crypto',
  },
  {
    icon: Search,
    title: 'OSINT Toolkit',
    description: 'Comprehensive OSINT framework for footprinting domains, IPs, emails, and social profiles. Aggregates data from Shodan, VirusTotal, and WHOIS.',
    image: 'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Python', 'Shodan API', 'Recon', 'WHOIS', 'Maltego'],
    color: '#00ff88',
    github: '#',
    demo: '#',
    category: 'OSINT',
  },
  {
    icon: Package,
    title: 'PacketSpy Sniffer',
    description: 'Real-time network packet analyzer with protocol dissection, traffic visualization, and anomaly detection using ML-based behavioral analysis.',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Python', 'Scapy', 'Tkinter', 'ML', 'Wireshark'],
    color: '#00d4ff',
    github: '#',
    demo: '#',
    category: 'Network',
  },
  {
    icon: Shield,
    title: 'CipherVault',
    description: 'Secure file encryption tool supporting AES-256, RSA, and ChaCha20. Features key management, secure deletion, and steganography modules.',
    image: 'https://images.pexels.com/photos/7412069/pexels-photo-7412069.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Python', 'AES-256', 'RSA', 'ChaCha20', 'PyCryptodome'],
    color: '#00ffcc',
    github: '#',
    demo: '#',
    category: 'Crypto',
  },
];

const FILTERS = ['All', 'Network', 'Web Security', 'OSINT', 'Crypto'];

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div
        className="absolute right-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader tag="// PROJECTS" title="Featured Projects" subtitle="Offensive security tools and research projects built for the cybersecurity community." />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-4 py-2 rounded text-sm font-medium tracking-wider transition-all duration-200"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                background: active === f ? 'rgba(0,255,136,0.12)' : 'rgba(255,255,255,0.03)',
                border: active === f ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(255,255,255,0.06)',
                color: active === f ? '#00ff88' : '#8ab4c8',
                boxShadow: active === f ? '0 0 15px rgba(0,255,136,0.1)' : 'none',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass rounded-xl overflow-hidden cyber-card flex flex-col"
              style={{ border: `1px solid ${project.color}18` }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: 'brightness(0.5) saturate(0.6)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to bottom, transparent 40%, #0d1f35 100%)` }}
                />
                <div
                  className="absolute top-3 left-3 w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  <project.icon size={16} style={{ color: project.color }} />
                </div>
                <span
                  className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-mono-cyber"
                  style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-orbitron text-base font-bold text-white tracking-wide">{project.title}</h3>
                <p className="text-[#8ab4c8] text-sm leading-relaxed flex-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs font-mono-cyber"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#8ab4c8',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 px-4 py-2 rounded text-xs font-medium tracking-wider flex-1 justify-center transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#8ab4c8',
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  >
                    <Github size={13} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 px-4 py-2 rounded text-xs font-medium tracking-wider flex-1 justify-center transition-all duration-200 hover:scale-105"
                    style={{
                      background: `${project.color}10`,
                      border: `1px solid ${project.color}35`,
                      color: project.color,
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
