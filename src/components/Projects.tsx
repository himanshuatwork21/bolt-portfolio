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

  // 🔥 Dynamic filters from Sanity
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filtered =
    active === 'All'
      ? projects
      : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="// PROJECTS"
          title="Featured Projects"
          subtitle="Offensive security tools and research projects."
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-4 py-2 rounded text-sm"
              style={{
                background:
                  active === f
                    ? 'rgba(0,255,136,0.12)'
                    : 'rgba(255,255,255,0.03)',
                border:
                  active === f
                    ? '1px solid rgba(0,255,136,0.4)'
                    : '1px solid rgba(255,255,255,0.06)',
                color: active === f ? '#00ff88' : '#8ab4c8',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl overflow-hidden flex flex-col"
              style={{ border: `1px solid ${project.color}18` }}
            >
              {/* Image */}
              <div className="relative h-44">
                <img
                  src={project.image}
                  className="w-full h-full object-cover"
                />

                <span
                  className="absolute top-3 right-3 px-2 py-1 text-xs"
                  style={{
                    background: `${project.color}20`,
                    color: project.color,
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-bold">{project.title}</h3>

                <p className="text-sm text-gray-400 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-800 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-3">
                  <a
                    href={project.github}
                    target="_blank"
                    className="flex-1 text-center py-2 border text-xs"
                  >
                    <Github size={14} />
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    className="flex-1 text-center py-2 text-xs"
                    style={{
                      background: project.color,
                      color: '#000',
                    }}
                  >
                    <ExternalLink size={14} />
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