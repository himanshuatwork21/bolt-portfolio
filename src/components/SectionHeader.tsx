import { motion } from 'framer-motion';

interface Props {
  tag: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ tag, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00ff88]" />
        <span className="font-mono-cyber text-[#00ff88] text-xs tracking-widest">{tag}</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00ff88]" />
      </div>
      <h2 className="section-title text-white mb-4">
        {title.split(' ').map((word, i) => (
          <span key={i}>
            {i > 0 && ' '}
            {i === 0 ? <span className="gradient-text">{word}</span> : word}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="text-[#8ab4c8] max-w-xl mx-auto text-base" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
          {subtitle}
        </p>
      )}
      <div className="flex justify-center mt-4 gap-1">
        <div className="w-8 h-0.5 bg-[#00ff88] rounded" />
        <div className="w-2 h-0.5 bg-[#00ff88]/50 rounded" />
        <div className="w-1 h-0.5 bg-[#00ff88]/25 rounded" />
      </div>
    </motion.div>
  );
}
