// Contact.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

import SectionHeader from './SectionHeader';

import { client } from '../sanity/client';

import {
  contactPageQuery,
  socialLinksQuery,
  quickInfoQuery,
} from '../sanity/queries';

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

    client.fetch(socialLinksQuery).then((data) => {
      console.log('SOCIALS:', data);
      setSocials(data);
    });

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
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Glow */}
      <div
        className="absolute left-1/4 top-1/2 w-96 h-96 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <SectionHeader
          tag="// GET_IN_TOUCH"
          title={pageData?.title || 'Contact Me'}
          subtitle={
            pageData?.subtitle ||
            "Have a security question or collaboration opportunity? Let's connect!"
          }
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT - FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(0,255,136,0.12)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* NAME */}
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all focus:border-[#00ff88]"
                />
              </div>

              {/* EMAIL */}
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all focus:border-[#00ff88]"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Message
                </label>

                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  placeholder="Your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm resize-none outline-none transition-all focus:border-[#00ff88]"
                />
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm mt-2 transition-all duration-300"
                style={{
                  background:
                    'linear-gradient(135deg, #00ff88, #00d4ff)',
                  color: '#040a0f',
                  boxShadow:
                    '0 0 25px rgba(0,255,136,0.25)',
                }}
              >
                <Send size={16} />

                {submitted
                  ? 'Sent Successfully!'
                  : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* SOCIALS */}
            <div>
              <h3 className="font-orbitron text-sm text-[#00ff88] tracking-widest mb-5">
                CONNECT WITH ME
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {socials.map((social: any, i: number) => (
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
                    whileHover={{
                      y: -4,
                      scale: 1.03,
                    }}
                    className="relative overflow-hidden rounded-2xl p-5 flex flex-col items-center gap-3 group transition-all duration-300"
                    style={{
                      background:
                        'rgba(255,255,255,0.03)',
                      border: `1px solid ${social.color}25`,
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${social.color}15 0%, transparent 70%)`,
                      }}
                    />

                    {/* Icon Box */}
                    <div
                      className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${social.color}15`,
                        border: `1px solid ${social.color}40`,
                        boxShadow: `0 0 25px ${social.color}20`,
                      }}
                    >
                      {social.iconUrl && (
                        <img
                          src={social.iconUrl}
                          alt={social.label}
                          className="w-9 h-9 object-contain transition-all duration-300 group-hover:scale-110"
                        />
                      )}
                    </div>

                    {/* Label */}
                    <span className="relative z-10 text-sm font-semibold text-white tracking-wide group-hover:text-[#00ff88] transition-colors duration-300">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* QUICK INFO */}
            <div>
              <h3 className="font-orbitron text-sm text-[#00ff88] tracking-widest mb-4">
                QUICK INFO
              </h3>

              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border:
                    '1px solid rgba(0,255,136,0.12)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <div className="space-y-5">
                  {quickInfo.map((item: any, i: number) => (
                    <div key={i}>
                      <p className="text-xs text-[#8ab4c8] mb-1 uppercase tracking-wider">
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