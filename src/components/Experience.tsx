import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import SectionHeader from './SectionHeader';

import { client } from '../sanity/client';
import { experienceQuery } from '../sanity/queries';

export default function Experience() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(experienceQuery)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return <div className="text-white p-10">Loading Experience...</div>;
  }

  return (
    <section id="experience" className="relative py-24 overflow-hidden">

      {/* Background line */}
      <div
        className="absolute left-1/2 top-0 w-px h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,255,136,0.08), transparent)'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        <SectionHeader
          tag="// WORK_HISTORY"
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="relative">

          {/* Center timeline line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,255,136,0.5), rgba(0,212,255,0.1))'
            }}
          />

          <div className="flex flex-col gap-8">

            {data.experiences?.map((exp: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                }`}
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
                  className="glass rounded-xl p-6"
                  style={{ border: `1px solid ${exp.color}30` }}
                >

                  {/* Header */}
                  <div className="flex justify-between flex-wrap gap-3 mb-4">

                    <div>
                      <h3 className="text-white font-bold">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-1 mt-1">
                        <Briefcase size={12} style={{ color: exp.color }} />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: exp.color }}
                        >
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        background: `${exp.color}20`,
                        border: `1px solid ${exp.color}`,
                        color: exp.color,
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex gap-4 mb-4 text-xs text-[#8ab4c8]">
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      {exp.period}
                    </div>

                    <div className="flex items-center gap-1">
                      <MapPin size={11} />
                      {exp.location}
                    </div>
                  </div>

                  {/* Points */}
                  <ul className="flex flex-col gap-2">
                    {exp.points?.map((pt: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-sm text-[#8ab4c8]">
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full"
                          style={{ background: exp.color }}
                        />
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