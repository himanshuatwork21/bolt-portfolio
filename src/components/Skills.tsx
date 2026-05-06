import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Wifi, Code, Wrench, Monitor } from 'lucide-react';
import SectionHeader from './SectionHeader';

import { client } from '../sanity/client';
import { skillsQuery } from '../sanity/queries';

/* ICON MAP (string → component) */
const ICON_MAP: any = {
  Shield,
  Wifi,
  Code,
  Wrench,
  Monitor,
};

function SkillBar({ name, level, color }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between">
        <span className="text-[#e8f4f8] text-sm">{name}</span>
        <span className="text-xs" style={{ color }}>{level}%</span>
      </div>

      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1 }}
          className="h-full rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(skillsQuery)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="text-white p-10">Loading Skills...</div>;

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeader
          tag="// SKILL_SET"
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          {/* Categories */}
          {data.categories?.map((cat: any, i: number) => {
            const Icon = ICON_MAP[cat.icon] || Shield;

            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6"
                style={{ border: `1px solid ${cat.color}30` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg"
                    style={{
                      background: `${cat.color}20`,
                      border: `1px solid ${cat.color}`,
                    }}
                  >
                    <Icon size={18} style={{ color: cat.color }} />
                  </div>

                  <h3 className="text-white font-bold">
                    {cat.label}
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  {cat.skills.map((skill: any) => (
                    <SkillBar
                      key={skill.name}
                      {...skill}
                      color={cat.color}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* TOOLS */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Tools</h3>

            <div className="flex flex-wrap gap-2">
              {data.tools?.map((tool: string, i: number) => (
                <span
                  key={tool}
                  className="px-3 py-1 text-xs rounded"
                  style={{
                    background: 'rgba(0,255,136,0.1)',
                    border: '1px solid rgba(0,255,136,0.3)',
                    color: '#00ff88',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}