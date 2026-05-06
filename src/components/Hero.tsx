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
    <section className="min-h-screen flex items-center">
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

          <div className="flex gap-4 mt-6">
            <button className="bg-green-400 text-black px-4 py-2">Projects</button>
            <button className="border border-green-400 px-4 py-2">Resume</button>
          </div>

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
    </section>
  );
}