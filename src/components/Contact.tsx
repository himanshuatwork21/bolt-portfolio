import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { client, writeClient } from '../sanity/client';
import { socialQuery, contactInfoQuery } from '../sanity/queries';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const [socials, setSocials] = useState<any[]>([]);
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    client.fetch(socialQuery).then(setSocials);
    client.fetch(contactInfoQuery).then(setInfo);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await writeClient.create({
        _type: 'contactMessage',
        ...formData,
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Error sending message');
    }
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader title="Contact Me" tag="// GET_IN_TOUCH" />

        <div className="grid md:grid-cols-2 gap-12">

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="p-3 bg-black/20 border rounded"
            />

            <input
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="p-3 bg-black/20 border rounded"
            />

            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="p-3 bg-black/20 border rounded"
            />

            <button className="bg-green-400 p-3 flex items-center justify-center gap-2">
              <Send size={14} />
              {submitted ? 'Sent!' : 'Send Message'}
            </button>
          </form>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6">

            {/* SOCIALS */}
            <div>
              <h3 className="text-green-400 mb-3">CONNECT WITH ME</h3>

              <div className="grid grid-cols-2 gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    className="p-4 border rounded flex flex-col items-center gap-2"
                  >
                    <img src={s.iconUrl} className="w-8 h-8" />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* QUICK INFO */}
            {info && (
              <div className="p-6 border rounded">
                <p>Email: {info.email}</p>
                <p>Location: {info.location}</p>
                <p>{info.availability}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}