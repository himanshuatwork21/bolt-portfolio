import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import SectionHeader from './SectionHeader';

const EXPERIENCES = [
  {
    role: 'Cybersecurity Intern',
    company: 'TechDefend Solutions',
    location: 'Remote',
    period: 'Jun 2024 – Present',
    type: 'Internship',
    color: '#00ff88',
    points: [
      'Conducted vulnerability assessments on web applications using OWASP testing methodology.',
      'Performed network penetration testing and documented findings with remediation steps.',
      'Assisted in red team exercises and phishing simulation campaigns.',
      'Analyzed security logs and generated incident response reports.',
    ],
  },
  {
    role: 'Freelance Security Consultant',
    company: 'Independent',
    location: 'Remote',
    period: 'Jan 2024 – May 2024',
    type: 'Freelance',
    color: '#00d4ff',
    points: [
      'Performed security audits for small businesses and startups.',
      'Identified and reported critical vulnerabilities in client web applications.',
      'Provided remediation guidance and security awareness training.',
      'Built custom security scripts and automation tools for clients.',
    ],
  },
  {
    role: 'Community Security Researcher',
    company: 'HackerOne / Bug Bounty',
    location: 'Remote',
    period: '2023 – Present',
    type: 'Bug Bounty',
    color: '#00ffcc',
    points: [
      'Discovered and reported XSS, IDOR, and SSRF vulnerabilities in public programs.',
      'Earned acknowledgment from multiple companies for responsible disclosure.',
      'Active contributor to cybersecurity forums and communities.',
      'Participated in private invite-only bug bounty programs.',
    ],
  },
  {
    role: 'CTF Team Member',
    company: 'CyberElite CTF Team',
    location: 'Online',
    period: '2022 – Present',
    type: 'Community',
    color: '#00ff88',
    points: [
      'Competed in national and international Capture The Flag competitions.',
      'Specialized in web exploitation, cryptography, and forensics challenges.',
      'Mentored junior team members on security concepts and tools.',
      'Achieved top 100 rankings on TryHackMe and Hack The Box.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <div
        className="absolute left-1/2 top-0 w-px h-full pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,255,136,0.08), transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <SectionHeader tag="// WORK_HISTORY" title="Experience" subtitle="My professional journey in cybersecurity and security research." />

        <div className="relative">
          {/* Center timeline line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(0,255,136,0.5), rgba(0,212,255,0.1))' }}
          />

          <div className="flex flex-col gap-8">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:block absolute top-6 w-3 h-3 rounded-full"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 12px ${exp.color}`,
                    [i % 2 === 0 ? 'right' : 'left']: '-2.5rem',
                    transform: 'translateX(50%)',
                  }}
                />

                <div
                  className="glass rounded-xl p-6 cyber-card"
                  style={{ border: `1px solid ${exp.color}18` }}
                >
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                    <div>
                      <h3 className="font-orbitron text-base font-bold text-white tracking-wide">{exp.role}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Briefcase size={12} style={{ color: exp.color }} />
                        <span className="text-sm font-semibold" style={{ color: exp.color, fontFamily: 'Rajdhani, sans-serif' }}>
                          {exp.company}
                        </span>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono-cyber"
                      style={{
                        background: `${exp.color}10`,
                        border: `1px solid ${exp.color}30`,
                        color: exp.color,
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-1 text-xs text-[#8ab4c8]">
                      <Calendar size={11} />
                      <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#8ab4c8]">
                      <MapPin size={11} />
                      <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>{exp.location}</span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {exp.points.map(pt => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-[#8ab4c8]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: exp.color }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
