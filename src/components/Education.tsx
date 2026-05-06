import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar } from 'lucide-react';
import SectionHeader from './SectionHeader';

const EDUCATION = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'National Institute of Technology',
    period: '2021 – 2025',
    grade: 'CGPA: 8.4 / 10',
    desc: 'Specialization in Information Security and Network Systems. Active member of the cybersecurity club and competitive programming team.',
    color: '#00ff88',
    icon: GraduationCap,
  },
  {
    degree: 'Higher Secondary (Science)',
    institution: 'Delhi Public School',
    period: '2019 – 2021',
    grade: '93.4%',
    desc: 'Completed senior secondary education with a focus on Mathematics, Physics, and Computer Science.',
    color: '#00d4ff',
    icon: BookOpen,
  },
];

const COURSES = [
  { name: 'Google Cybersecurity Professional Certificate', platform: 'Coursera', year: '2024', color: '#00ff88' },
  { name: 'The Complete Ethical Hacking Course', platform: 'Udemy', year: '2023', color: '#00d4ff' },
  { name: 'Penetration Testing with Kali Linux', platform: 'Offensive Security', year: '2024', color: '#00ffcc' },
  { name: 'Network Security Fundamentals', platform: 'Cisco NetAcad', year: '2023', color: '#00ff88' },
  { name: 'Python for Cybersecurity', platform: 'Coursera', year: '2023', color: '#00d4ff' },
  { name: 'TryHackMe - Jr Penetration Tester', platform: 'TryHackMe', year: '2023', color: '#00ffcc' },
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader tag="// ACADEMIC_BACKGROUND" title="Education" subtitle="Academic foundation complemented by continuous self-learning in cybersecurity." />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formal Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-orbitron text-xs text-[#00ff88] tracking-widest mb-6"
            >
              FORMAL EDUCATION
            </motion.h3>
            <div className="relative">
              <div
                className="absolute left-4 top-2 bottom-2 w-px"
                style={{ background: 'linear-gradient(to bottom, #00ff88, rgba(0,255,136,0.1))' }}
              />
              <div className="flex flex-col gap-6 pl-12">
                {EDUCATION.map((edu, i) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    <div
                      className="absolute -left-[34px] top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: edu.color,
                        background: '#040a0f',
                        boxShadow: `0 0 12px ${edu.color}60`,
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: edu.color }} />
                    </div>

                    <div
                      className="glass rounded-xl p-5 cyber-card"
                      style={{ border: `1px solid ${edu.color}18` }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <edu.icon size={16} style={{ color: edu.color }} />
                        <h4 className="font-orbitron text-sm font-bold text-white">{edu.degree}</h4>
                      </div>
                      <p className="font-semibold mb-3 text-sm" style={{ color: edu.color, fontFamily: 'Rajdhani, sans-serif' }}>
                        {edu.institution}
                      </p>
                      <div className="flex gap-4 mb-3">
                        <div className="flex items-center gap-1 text-xs text-[#8ab4c8]">
                          <Calendar size={11} />
                          <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>{edu.period}</span>
                        </div>
                        <span
                          className="px-2 py-0.5 rounded text-xs font-mono-cyber"
                          style={{ background: `${edu.color}10`, border: `1px solid ${edu.color}30`, color: edu.color }}
                        >
                          {edu.grade}
                        </span>
                      </div>
                      <p className="text-[#8ab4c8] text-sm leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{edu.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Online Courses */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-orbitron text-xs text-[#00ff88] tracking-widest mb-6"
            >
              ONLINE LEARNING
            </motion.h3>
            <div className="flex flex-col gap-4">
              {COURSES.map((course, i) => (
                <motion.div
                  key={course.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass rounded-xl p-4 cyber-card flex items-center gap-4"
                  style={{ border: `1px solid ${course.color}12` }}
                >
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center font-orbitron font-bold text-xs"
                    style={{
                      background: `${course.color}10`,
                      border: `1px solid ${course.color}30`,
                      color: course.color,
                    }}
                  >
                    {course.year.slice(2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{course.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: course.color, fontFamily: 'Rajdhani, sans-serif' }}>{course.platform}</p>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: course.color, boxShadow: `0 0 6px ${course.color}` }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
