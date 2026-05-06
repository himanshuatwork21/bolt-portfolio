import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import SectionHeader from './SectionHeader';

const POSTS = [
  {
    title: 'HTB Writeup: Exploiting SSTI in Flask Applications',
    excerpt: 'A deep dive into Server-Side Template Injection vulnerabilities in Python Flask apps. I walk through the exploitation chain that led to remote code execution.',
    tag: 'CTF Writeup',
    date: 'Mar 15, 2025',
    readTime: '8 min read',
    color: '#00ff88',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'OWASP Top 10: A Practical Guide for Pentesters',
    excerpt: 'Breaking down each OWASP Top 10 vulnerability with real-world examples, attack vectors, and practical exploitation techniques for web pentesters.',
    tag: 'Web Security',
    date: 'Feb 28, 2025',
    readTime: '12 min read',
    color: '#00d4ff',
    image: 'https://images.pexels.com/photos/5380641/pexels-photo-5380641.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Linux Privilege Escalation: From User to Root',
    excerpt: 'Comprehensive guide covering SUID binaries, cron jobs, path manipulation, kernel exploits, and other classic Linux privilege escalation techniques.',
    tag: 'Linux Tips',
    date: 'Feb 10, 2025',
    readTime: '10 min read',
    color: '#00ffcc',
    image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'OSINT for Penetration Testers: Passive Reconnaissance',
    excerpt: 'How I gather intelligence on targets using Shodan, Maltego, Recon-ng, and OSINT framework before even touching the target system.',
    tag: 'OSINT',
    date: 'Jan 22, 2025',
    readTime: '9 min read',
    color: '#00ff88',
    image: 'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Networking Fundamentals Every Hacker Should Know',
    excerpt: 'TCP/IP, DNS, ARP, DHCP — understanding protocols at a deep level is essential for any penetration tester. This is my comprehensive breakdown.',
    tag: 'Networking',
    date: 'Jan 8, 2025',
    readTime: '15 min read',
    color: '#00d4ff',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'My Ethical Hacking Journey: From Zero to Bug Bounty',
    excerpt: 'How I went from a complete beginner to finding my first valid vulnerability in 18 months. Resources, mindset, and the mistakes I made along the way.',
    tag: 'Journey',
    date: 'Dec 15, 2024',
    readTime: '7 min read',
    color: '#00ffcc',
    image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Blog() {
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
        <SectionHeader tag="// BLOG_POSTS" title="Blog & Writeups" subtitle="CTF writeups, security research, and hacking tutorials from my learning journey." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass rounded-xl overflow-hidden cyber-card flex flex-col cursor-pointer"
              style={{ border: `1px solid ${post.color}14` }}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: 'brightness(0.4) saturate(0.5)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 40%, #0d1f35 100%)' }}
                />
                <span
                  className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono-cyber"
                  style={{
                    background: `${post.color}18`,
                    border: `1px solid ${post.color}35`,
                    color: post.color,
                  }}
                >
                  <Tag size={9} />
                  {post.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3
                  className="font-semibold text-white text-base leading-snug group-hover:text-[#00ff88] transition-colors"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', fontWeight: 700 }}
                >
                  {post.title}
                </h3>
                <p className="text-[#8ab4c8] text-sm leading-relaxed flex-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-[#8ab4c8]">
                    <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>{post.readTime}</span>
                    </span>
                  </div>
                  <button
                    className="flex items-center gap-1 text-xs font-medium transition-all duration-200 group-hover:gap-2"
                    style={{ color: post.color, fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    Read <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
