import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, Code2 } from 'lucide-react';

import { client } from '../sanity/client';
import { heroQuery } from '../sanity/queries';

const FALLBACK_STRINGS = [
  'Ethical Hacker',
  'Pentester',
  'OSINT Researcher',
];

function useTypingEffect(strings: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState('');
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!strings || strings.length === 0) return;

    const current = strings[strIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setStrIdx(s => (s + 1) % strings.length);
    }

    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, strIdx, strings]);

  return text;
}

function ProfileShowcase({ imageUrl, size }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeMap: any = {
    small: 'w-56 h-56 md:w-72 md:h-72',
    medium: 'w-72 h-72 md:w-96 md:h-96',
    large: 'w-80 h-80 md:w-[420px] md:h-[420px]',
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
      el.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <motion.div className="flex justify-center">
      <div
        ref={containerRef}
        className={`relative ${sizeMap[size || 'medium']} float-anim`}
      >
        <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-[#00ff88]">
          <img
            src={imageUrl}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    client.fetch(heroQuery)
      .then(setHeroData)
      .catch(console.error);
  }, []);

  const typedText = useTypingEffect(
    heroData?.typingStrings || FALLBACK_STRINGS
  );

  if (!heroData) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 w-full px-6">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-bold">
            {heroData.name}
            <br />
            <span className="text-green-400">{heroData.highlight}</span>
          </h1>

          <p className="mt-4 text-gray-400">
            {heroData.description}
          </p>

          <div className="mt-4 text-green-400 text-xl">
            {typedText} |
          </div>

          {/* 🔥 STATIC BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-6">

            {/* Projects */}
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm tracking-wider transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
                color: '#040a0f',
                boxShadow: '0 4px 20px rgba(0,255,136,0.3)',
              }}
            >
              <Code2 size={16} />
              Projects
            </a>

            {/* Resume */}
            <a
              href="/resume.pdf" // 👉 replace with your file
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm tracking-wider text-[#00ff88] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00ff88]/10"
              style={{
                border: '1px solid rgba(0,255,136,0.4)',
              }}
            >
              <Download size={16} />
              Resume
            </a>

            {/* Contact */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm tracking-wider text-[#00d4ff] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00d4ff]/10"
              style={{
                border: '1px solid rgba(0,212,255,0.3)',
              }}
            >
              <Mail size={16} />
              Contact Me
            </a>

          </div>

          {/* STATS */}
          <div className="flex gap-6 mt-6">
            {heroData.stats?.map((stat: any) => (
              <div key={stat.label}>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <ProfileShowcase
          imageUrl={heroData.imageUrl}
          size={heroData.profileSize}
        />

      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() =>
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <ChevronDown className="text-green-400 animate-bounce" />
      </div>
    </section>
  );
}