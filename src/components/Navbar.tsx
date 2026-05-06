import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Blog', href: '#blog' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Badges', href: '#badges' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map(n => n.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-dark py-3 shadow-lg shadow-black/50' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNav('#home')} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded border border-[#00ff88]/40 flex items-center justify-center group-hover:border-[#00ff88] transition-colors glow-pulse">
              <Shield size={18} className="text-[#00ff88]" />
            </div>
            <span className="font-orbitron text-sm font-bold text-white tracking-widest hidden sm:block">
              HB<span className="text-[#00ff88]">.</span>
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <button
                  onClick={() => handleNav(item.href)}
                  className={`relative px-3 py-2 text-sm font-rajdhani font-medium tracking-wider transition-all duration-200 group ${
                    active === item.href.slice(1)
                      ? 'text-[#00ff88]'
                      : 'text-[#8ab4c8] hover:text-white'
                  }`}
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {active === item.href.slice(1) && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded"
                      style={{
                        background: 'rgba(0,255,136,0.06)',
                        border: '1px solid rgba(0,255,136,0.2)',
                      }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded border border-[#00ff88]/30 text-[#00ff88] hover:border-[#00ff88] transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 glass-dark border-b border-[#00ff88]/10 lg:hidden"
          >
            <ul className="flex flex-col py-4 px-6 gap-1">
              {NAV_ITEMS.map(item => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className={`w-full text-left px-4 py-3 text-sm tracking-wider rounded transition-colors ${
                      active === item.href.slice(1)
                        ? 'text-[#00ff88] bg-[#00ff88]/5 border border-[#00ff88]/20'
                        : 'text-[#8ab4c8] hover:text-white hover:bg-white/5'
                    }`}
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
