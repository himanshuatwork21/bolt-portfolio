import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

import SectionHeader from './SectionHeader';
import { client } from '../sanity/client';
import { projectsQuery } from '../sanity/queries';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [active, setActive] = useState('All');

  useEffect(() => {
    client.fetch(projectsQuery)
      .then(data => setProjects(data))
      .catch(console.error);
  }, []);

  // Dynamic categories from Sanity
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filtered =
    active === 'All'
      ? projects
      : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="// PROJECTS"
          title="Featured Projects"
          subtitle="Offensive security tools and research projects built for the cybersecurity community."
        />

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-4 py-2 rounded text-sm font-medium tracking-wider transition-all duration-200"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                background:
                  active === f
                    ? 'rgba(0,255,136,0.12)'
                    : 'rgba(255,255,255,0.03)',
                border:
                  active === f
                    ? '1px solid rgba(0,255,136,0.4)'
                    : '1px solid rgba(255,255,255,0.06)',
                color: active === f ? '#00ff88' : '#8ab4c8',
                boxShadow:
                  active === f
                    ? '0 0 15px rgba(0,255,136,0.1)'
                    : 'none',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass rounded-xl overflow-hidden flex flex-col cyber-card"
              style={{
                border: `1px solid ${project.color || '#00ff88'}18`,
              }}
            >
              {/* IMAGE */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: 'brightness(0.6)' }}
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 40%, #0d1f35 100%)',
                  }}
                />

                {/* CATEGORY BADGE */}
                <span
                  className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-mono-cyber"
                  style={{
                    background: `${project.color}20`,
                    border: `1px solid ${project.color}40`,
                    color: project.color,
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-orbitron text-base font-bold text-white tracking-wide">
                  {project.title}
                </h3>

                <p
                  className="text-[#8ab4c8] text-sm leading-relaxed flex-1"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {project.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags?.map((tag: string) => (
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

                {/* BUTTONS (FIXED) */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    className="flex items-center justify-center gap-2 h-10 px-4 rounded text-xs font-medium tracking-wider flex-1 transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#8ab4c8',
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    <Github size={14} />
                    Code
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    className="flex items-center justify-center gap-2 h-10 px-4 rounded text-xs font-medium tracking-wider flex-1 transition-all duration-200 hover:scale-105"
                    style={{
                      background: `${project.color}20`,
                      border: `1px solid ${project.color}40`,
                      color: project.color,
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    <ExternalLink size={14} />
                    Live
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