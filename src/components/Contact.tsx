import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        'service_r2q0kzj',     // 🔁 replace
        'template_t11nb6s',    // 🔁 replace
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'z1LQMArxH5DAwDhht'      // 🔁 replace
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('EmailJS Error:', err);
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <SectionHeader
          tag="// GET_IN_TOUCH"
          title="Contact Me"
          subtitle="Have a security question or collaboration opportunity? Let's connect!"
        />

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* NAME */}
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                className="input"
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
                className="input"
              />

              {/* MESSAGE */}
              <textarea
                placeholder="Your message..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="input resize-none"
              />

              {/* BUTTON */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Send size={14} />
                {loading ? 'Sending...' : submitted ? 'Sent ✅' : 'Send Message'}
              </motion.button>

            </form>
          </motion.div>

          {/* SOCIALS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="section-title">CONNECT WITH ME</h3>

              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-4 rounded-lg flex flex-col items-center gap-2"
                  >
                    <social.icon size={18} style={{ color: social.color }} />
                    <span className="text-xs text-white">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* QUICK INFO */}
            <div className="glass p-6 rounded-lg">
              <p className="text-sm text-white">himanshu@example.com</p>
              <p className="text-sm text-white">New Delhi, India</p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}