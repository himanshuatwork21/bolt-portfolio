import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Badge as BadgeIcon } from 'lucide-react';
import SectionHeader from './SectionHeader';

import { client } from '../sanity/client';
import { certificationQuery } from '../sanity/queries';

export default function Certifications() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client
      .fetch(certificationQuery)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data)
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );

  return (
    <section
      id="certifications"
      className="relative pt-24 pb-10 overflow-hidden"
    >
      {/* GRID */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* SOFT GLOW */}
      <div
        className="absolute right-0 top-1/3 w-72 h-72 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="// CERTIFICATIONS_BADGES"
          title="Certifications & Achievements"
          subtitle="Verified credentials & milestones"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* CERTIFICATIONS */}
          <div>
            <h3 className="font-orbitron text-xs text-[#00ff88] tracking-widest mb-6">
              PROFESSIONAL CERTIFICATIONS
            </h3>

            <div className="grid sm:grid-cols-2 gap-5">
              {data.certifications?.map(
                (cert: any, i: number) => (
                  <motion.a
                    key={i}
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.08,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                    className="group rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      background:
                        'rgba(255,255,255,0.03)',
                      border: `1px solid ${cert.color}18`,
                      backdropFilter: 'blur(14px)',
                    }}
                  >
                    {/* IMAGE */}
                    <div className="h-36 overflow-hidden">
                      <img
                        src={cert.imageUrl}
                        alt={cert.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-4">
                      <p className="text-white text-sm font-semibold leading-relaxed">
                        {cert.name}
                      </p>

                      <p
                        className="text-xs mt-2"
                        style={{
                          color: cert.color,
                        }}
                      >
                        {cert.issuer} • {cert.year}
                      </p>

                      <div className="flex items-center gap-1 mt-3 text-xs text-[#8ab4c8]">
                        <ExternalLink size={12} />
                        Verify Credential
                      </div>
                    </div>
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div>
            <h3 className="font-orbitron text-xs text-[#00ff88] tracking-widest mb-6">
              ACHIEVEMENTS & BADGES
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {data.achievements?.map(
                (ach: any, i: number) => (
                  <motion.a
                    key={i}
                    href={ach.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.08,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                    className="rounded-2xl p-5 text-center transition-all duration-300"
                    style={{
                      background:
                        'rgba(255,255,255,0.03)',
                      border: `1px solid ${ach.color}18`,
                      backdropFilter: 'blur(14px)',
                    }}
                  >
                    <div
                      className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3"
                      style={{
                        background: `${ach.color}15`,
                        border: `1px solid ${ach.color}30`,
                      }}
                    >
                      <BadgeIcon
                        size={22}
                        style={{
                          color: ach.color,
                        }}
                      />
                    </div>

                    <p className="text-white text-sm font-semibold">
                      {ach.badge}
                    </p>

                    <p
                      className="text-xs mt-2"
                      style={{
                        color: ach.color,
                      }}
                    >
                      {ach.title}
                    </p>

                    <span className="text-[11px] text-[#8ab4c8] mt-3 block">
                      Verify Badge
                    </span>
                  </motion.a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}