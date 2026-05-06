import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import SectionHeader from './SectionHeader';

import { client } from '../sanity/client';
import { educationQuery } from '../sanity/queries';

export default function Education() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(educationQuery)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="text-white p-10">Loading...</div>;

  return (
    <section id="education" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="// ACADEMIC_BACKGROUND"
          title="Education"
          subtitle="Academic foundation + continuous learning"
        />

        <div className="grid lg:grid-cols-2 gap-12">

          {/* FORMAL EDUCATION */}
          <div>
            <h3 className="font-orbitron text-xs text-[#00ff88] tracking-widest mb-6">
              FORMAL EDUCATION
            </h3>

            <div className="flex flex-col gap-6">
              {data.formal?.map((edu: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="glass rounded-xl p-5"
                  style={{ border: `1px solid ${edu.color}18` }}
                >
                  <h4 className="text-white font-bold">{edu.degree}</h4>
                  <p style={{ color: edu.color }}>{edu.institution}</p>

                  <div className="flex gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {edu.period}
                    </span>
                    <span>{edu.grade}</span>
                  </div>

                  <p className="text-gray-400 mt-2">{edu.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 🔥 DYNAMIC SECTIONS */}
          <div className="flex flex-col gap-10">
            {data.sections?.map((section: any, idx: number) => (
              <div key={idx}>
                <h3 className="font-orbitron text-xs text-[#00ff88] tracking-widest mb-6">
                  {section.title}
                </h3>

                <div className="flex flex-col gap-4">
                  {section.items?.map((item: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="glass rounded-xl p-4 flex items-center gap-4"
                      style={{ border: `1px solid ${item.color}12` }}
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-xs font-bold"
                        style={{
                          background: `${item.color}10`,
                          border: `1px solid ${item.color}30`,
                          color: item.color,
                        }}
                      >
                        {item.year?.slice(2)}
                      </div>

                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold">
                          {item.name}
                        </p>
                        <p className="text-xs" style={{ color: item.color }}>
                          {item.platform}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}