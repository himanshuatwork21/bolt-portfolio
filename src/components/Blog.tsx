import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import SectionHeader from './SectionHeader';

import { client } from '../sanity/client';
import { blogQuery } from '../sanity/queries';

const FALLBACK_POSTS = [];

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    client
      .fetch(blogQuery)
      .then(data => setPosts(data))
      .catch(() => setPosts(FALLBACK_POSTS));
  }, []);

  return (
    <section id="blog" className="relative py-24 overflow-hidden">
      <div
        className="absolute left-0 top-1/3 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="// BLOG_POSTS"
          title="Blog & Writeups"
          subtitle="CTF writeups, security research, and hacking tutorials."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass rounded-xl overflow-hidden cyber-card flex flex-col cursor-pointer hover:scale-[1.02] transition-all"
              style={{ border: `1px solid ${post.color}14` }}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: 'brightness(0.4) saturate(0.5)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1f35]" />

                <span
                  className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                  style={{
                    background: `${post.color}18`,
                    border: `1px solid ${post.color}35`,
                    color: post.color,
                  }}
                >
                  <Tag size={10} />
                  {post.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-white font-semibold group-hover:text-[#00ff88] transition">
                  {post.title}
                </h3>

                <p className="text-[#8ab4c8] text-sm flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-[#8ab4c8]">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                  </div>

                  <span
                    className="flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all"
                    style={{ color: post.color }}
                  >
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}