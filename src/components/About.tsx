import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Terminal,
  Globe,
  Cpu,
  Target,
  Flag
} from 'lucide-react';

import SectionHeader from './SectionHeader';
import { client } from '../sanity/client';
import { aboutQuery } from '../sanity/queries';


// 🔥 ICON MAPPING (important)
const ICONS: any = {
  shield: Shield,
  terminal: Terminal,
  globe: Globe,
  cpu: Cpu,
  target: Target,
  flag: Flag,
};

export default function About() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(aboutQuery)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="text-white p-10">Loading...</div>;

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="// ABOUT_ME"
          title="About Me"
          subtitle="Cybersecurity enthusiast driven by curiosity"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT */}
          <div className="flex flex-col gap-6">

            {/* BIO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-6"
            >
              <p className="text-[#8ab4c8] mb-4">
                {data.intro}
              </p>
              <p className="text-[#8ab4c8]">
                {data.details}
              </p>
            </motion.div>

            {/* FACTS */}
            <div className="grid grid-cols-2 gap-4">
              {data.facts?.map((fact: any, i: number) => {
                const Icon = ICONS[fact.icon] || Shield;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="glass rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={16} className="text-[#00ff88]" />
                      <span className="text-white text-sm font-semibold">
                        {fact.label}
                      </span>
                    </div>

                    <p className="text-[#8ab4c8] text-xs">
                      {fact.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT TIMELINE */}
          <div>
            <h3 className="text-[#00ff88] mb-6">MY JOURNEY</h3>

            <div className="flex flex-col gap-6">
              {data.timeline?.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="glass rounded-xl p-5"
                >
                  <span className="text-[#00ff88] text-xs">
                    {item.year}
                  </span>

                  <h4 className="text-white font-semibold mt-1">
                    {item.title}
                  </h4>

                  <p className="text-[#8ab4c8] text-sm mt-1">
                    {item.desc}
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