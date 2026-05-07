import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import SectionHeader from './SectionHeader';

import { client } from '../sanity/client';
import { blogQuery } from '../sanity/queries';

interface BlogPost {
  title?: string;
  excerpt?: string;
  tag?: string;
  date?: string;
  readTime?: string;
  color?: string;
  link?: string;
  imageUrl?: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(blogQuery)
      .then((data) => {
        console.log('BLOG DATA:', data);

        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]);
        }
      })
      .catch((err) => {
        console.error('BLOG FETCH ERROR:', err);
        setPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="relative py-24 overflow-hidden">
      <div
        className="absolute left-0 top-1/3 w-80 h-80 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="// BLOG_POSTS"
          title="Blog & Writeups"
          subtitle="CTF writeups, security research, and hacking tutorials."
        />

        {loading ? (
          <div className="text-center text-[#8ab4c8] py-10">
            Loading blogs...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-[#8ab4c8] py-10">
            No blog posts found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.a
                key={i}
                href={post.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group glass rounded-xl overflow-hidden cyber-card flex flex-col hover:scale-[1.02] transition-all duration-300"
                style={{
                  border: `1px solid ${post.color || '#00ff88'}14`,
                }}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-[#071018]">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title || 'Blog image'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{
                        filter: 'brightness(0.4) saturate(0.5)',
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8ab4c8] text-sm">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1f35]" />

                  <span
                    className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                    style={{
                      background: `${post.color || '#00ff88'}18`,
                      border: `1px solid ${post.color || '#00ff88'}35`,
                      color: post.color || '#00ff88',
                    }}
                  >
                    <Tag size={10} />
                    {post.tag || 'Blog'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3
                    className="text-white font-semibold leading-snug group-hover:text-[#00ff88] transition-colors"
                    style={{
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    {post.title || 'Untitled Blog'}
                  </h3>

                  <p
                    className="text-[#8ab4c8] text-sm leading-relaxed flex-1"
                    style={{
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    {post.excerpt || 'No description available.'}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-3 text-xs text-[#8ab4c8]">
                      <span>{post.date || 'No Date'}</span>

                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        <span>{post.readTime || '0 min'}</span>
                      </span>
                    </div>

                    <span
                      className="flex items-center gap-1 text-xs font-medium transition-all duration-200 group-hover:gap-2"
                      style={{
                        color: post.color || '#00ff88',
                      }}
                    >
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}