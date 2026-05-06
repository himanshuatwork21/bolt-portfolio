import { motion } from 'framer-motion';
import { Award, Badge as BadgeIcon } from 'lucide-react';
import SectionHeader from './SectionHeader';

const CERTIFICATIONS = [
  { name: 'TryHackMe - Jr Penetration Tester', issuer: 'TryHackMe', year: '2024', color: '#00ff88', icon: Award },
  { name: 'Google Cybersecurity Professional', issuer: 'Google / Coursera', year: '2024', color: '#00d4ff', icon: Award },
  { name: 'Cisco - Introduction to Cybersecurity', issuer: 'Cisco NetAcad', year: '2023', color: '#00ffcc', icon: Award },
  { name: 'Hack The Box - Penetration Tester', issuer: 'Hack The Box', year: '2024', color: '#00ff88', icon: Award },
];

const ACHIEVEMENTS = [
  { badge: 'TryHackMe Top 10%', title: 'Elite Tier', color: '#00ff88' },
  { badge: 'HTB Hacker', title: 'Rank 2500+', color: '#00d4ff' },
  { badge: 'Bug Bounty', title: '15 Vulnerabilities', color: '#00ffcc' },
  { badge: 'CTF Winner', title: 'NIT Cyber Cup', color: '#00ff88' },
  { badge: 'Security Research', title: '5 Publications', color: '#00d4ff' },
  { badge: 'Community Leader', title: 'CyberElite CTF', color: '#00ffcc' },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader tag="// CERTIFICATIONS_BADGES" title="Certifications & Achievements" subtitle="Recognized credentials and milestone achievements in cybersecurity." />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-orbitron text-xs text-[#00ff88] tracking-widest mb-6"
            >
              PROFESSIONAL CERTIFICATIONS
            </motion.h3>
            <div className="flex flex-col gap-3">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass rounded-lg p-4 cyber-card flex items-start gap-4"
                  style={{ border: `1px solid ${cert.color}15` }}
                >
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      background: `${cert.color}12`,
                      border: `1px solid ${cert.color}25`,
                    }}
                  >
                    <cert.icon size={16} style={{ color: cert.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {cert.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: cert.color, fontFamily: 'Rajdhani, sans-serif' }}>
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-orbitron text-xs text-[#00ff88] tracking-widest mb-6"
            >
              ACHIEVEMENTS & BADGES
            </motion.h3>
            <div className="grid grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((ach, i) => (
                <motion.div
                  key={ach.badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass rounded-lg p-4 cyber-card text-center"
                  style={{
                    border: `1px solid ${ach.color}20`,
                    background: `linear-gradient(135deg, rgba(${parseInt(ach.color.slice(1, 3), 16)},${parseInt(ach.color.slice(3, 5), 16)},${parseInt(ach.color.slice(5, 7), 16)},0.04), rgba(13,31,53,0.8))`,
                  }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <BadgeIcon size={18} style={{ color: ach.color }} />
                  </div>
                  <p className="text-white text-xs font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {ach.badge}
                  </p>
                  <p className="text-xs mt-1" style={{ color: ach.color, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                    {ach.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
