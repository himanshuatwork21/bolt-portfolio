import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Badge as BadgeIcon } from 'lucide-react';
import SectionHeader from './SectionHeader';

import { client } from '../sanity/client';
import { certificationQuery } from '../sanity/queries';

export default function Certifications() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(certificationQuery)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="text-white p-10">Loading...</div>;

  return (
    <section id="certifications" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="// CERTIFICATIONS_BADGES"
          title="Certifications & Achievements"
          subtitle="Verified credentials & milestones"
        />

        <div className="grid lg:grid-cols-2 gap-12">

          {/* 🔥 CERTIFICATIONS */}
          <div>
            <h3 className="font-orbitron text-xs text-[#00ff88] tracking-widest mb-6">
              PROFESSIONAL CERTIFICATIONS
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {data.certifications?.map((cert: any, i: number) => (
                <motion.a
                  key={i}
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-lg overflow-hidden group cursor-pointer"
                  style={{ border: `1px solid ${cert.color}20` }}
                >
                  {/* IMAGE */}
                  <div className="h-32 overflow-hidden">
                    <img
                      src={cert.imageUrl}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-3">
                    <p className="text-white text-sm font-semibold">
                      {cert.name}
                    </p>

                    <p className="text-xs mt-1" style={{ color: cert.color }}>
                      {cert.issuer} • {cert.year}
                    </p>

                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <ExternalLink size={12} />
                      Verify
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* 🔥 ACHIEVEMENTS */}
          <div>
            <h3 className="font-orbitron text-xs text-[#00ff88] tracking-widest mb-6">
              ACHIEVEMENTS & BADGES
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {data.achievements?.map((ach: any, i: number) => (
                <motion.a
                  key={i}
                  href={ach.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-lg p-4 text-center cursor-pointer"
                  style={{ border: `1px solid ${ach.color}20` }}
                >
                  <BadgeIcon size={18} style={{ color: ach.color }} />

                  <p className="text-white text-xs mt-2 font-semibold">
                    {ach.badge}
                  </p>

                  <p className="text-xs mt-1" style={{ color: ach.color }}>
                    {ach.title}
                  </p>

                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Verify
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}