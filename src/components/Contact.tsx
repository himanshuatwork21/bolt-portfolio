import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MessageSquare } from 'lucide-react';
import SectionHeader from './SectionHeader';

const SOCIALS = [
  { icon: Github, label: 'GitHub', url: '#', color: '#00ff88' },
  { icon: Linkedin, label: 'LinkedIn', url: '#', color: '#00d4ff' },
  { icon: Mail, label: 'Email', url: 'mailto:himanshu@example.com', color: '#00ffcc' },
  { icon: MessageSquare, label: 'Telegram', url: '#', color: '#00ff88' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div
        className="absolute left-1/4 top-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <SectionHeader tag="// GET_IN_TOUCH" title="Contact Me" subtitle="Have a security question or collaboration opportunity? Let's connect!" />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-xl p-8"
            style={{ border: '1px solid rgba(0,255,136,0.1)' }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-white mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-[#8ab4c8]/50 transition-all duration-200"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-[#8ab4c8]/50 transition-all duration-200"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message here..."
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-[#8ab4c8]/50 resize-none transition-all duration-200"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold tracking-wider transition-all duration-300 text-sm mt-2"
                style={{
                  background: submitted
                    ? 'linear-gradient(135deg, #00ff88, #00d4ff)'
                    : 'linear-gradient(135deg, #00ff88, #00d4ff)',
                  color: '#040a0f',
                  fontFamily: 'Rajdhani, sans-serif',
                  boxShadow: '0 4px 20px rgba(0,255,136,0.3)',
                }}
              >
                <Send size={14} />
                {submitted ? 'Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="font-orbitron text-sm text-[#00ff88] tracking-widest mb-4">
                CONNECT WITH ME
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="glass rounded-lg p-4 cyber-card flex flex-col items-center gap-2 group"
                    style={{ border: `1px solid ${social.color}15` }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${social.color}12`,
                        border: `1px solid ${social.color}25`,
                      }}
                    >
                      <social.icon size={18} style={{ color: social.color }} />
                    </div>
                    <span
                      className="text-xs font-semibold text-white group-hover:text-[#00ff88] transition-colors"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-orbitron text-sm text-[#00ff88] tracking-widest mb-4">
                QUICK INFO
              </h3>
              <div className="glass rounded-lg p-6" style={{ border: '1px solid rgba(0,255,136,0.1)' }}>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-[#8ab4c8] mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      Email
                    </p>
                    <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      himanshu@example.com
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8ab4c8] mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      Location
                    </p>
                    <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      New Delhi, India
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8ab4c8] mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      Availability
                    </p>
                    <p className="text-white text-sm font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                      Open to opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
