// Contact.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MessageSquare } from 'lucide-react';
import SectionHeader from './SectionHeader';

import { client } from '../sanity/sanityClient';
import {
  contactPageQuery,
  socialLinksQuery,
  quickInfoQuery,
} from '../sanity/queries';

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  telegram: MessageSquare,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const [socials, setSocials] = useState<any[]>([]);
  const [quickInfo, setQuickInfo] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    client.fetch(contactPageQuery).then(setPageData);
    client.fetch(socialLinksQuery).then(setSocials);
    client.fetch(quickInfoQuery).then(setQuickInfo);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await client.create({
        _type: 'contactMessage',
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });

      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
        });

        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to send message');
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      <div
        className="absolute left-1/4 top-1/2 w-96 h-96 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <SectionHeader
          tag="// GET_IN_TOUCH"
          title={pageData?.title || 'Contact Me'}
          subtitle={
            pageData?.subtitle ||
            "Have a security question or collaboration opportunity? Let's connect!"
          }
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
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
                <label className="block text-sm font-semibold text-white mb-2">
                  Name
                </label>

                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Message
                </label>

                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  placeholder="Your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm mt-2"
                style={{
                  background:
                    'linear-gradient(135deg, #00ff88, #00d4ff)',
                  color: '#040a0f',
                }}
              >
                <Send size={14} />
                {submitted ? 'Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* Socials */}
            <div>
              <h3 className="font-orbitron text-sm text-[#00ff88] tracking-widest mb-4">
                CONNECT WITH ME
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {socials.map((social: any, i: number) => {
                  const Icon = iconMap[social.icon];

                  return (
                    <motion.a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.08,
                      }}
                      className="glass rounded-lg p-4 cyber-card flex flex-col items-center gap-2 group"
                      style={{
                        border: `1px solid ${social.color}15`,
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: `${social.color}12`,
                          border: `1px solid ${social.color}25`,
                        }}
                      >
                        {Icon && (
                          <Icon
                            size={18}
                            style={{ color: social.color }}
                          />
                        )}
                      </div>

                      <span className="text-xs font-semibold text-white">
                        {social.label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Quick Info */}
            <div>
              <h3 className="font-orbitron text-sm text-[#00ff88] tracking-widest mb-4">
                QUICK INFO
              </h3>

              <div
                className="glass rounded-lg p-6"
                style={{
                  border: '1px solid rgba(0,255,136,0.1)',
                }}
              >
                <div className="space-y-4">
                  {quickInfo.map((item: any, i: number) => (
                    <div key={i}>
                      <p className="text-xs text-[#8ab4c8] mb-1">
                        {item.label}
                      </p>

                      <p className="text-white text-sm font-semibold">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}