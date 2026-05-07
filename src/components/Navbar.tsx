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
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [active, setActive] =
    useState('home');

  /*
    SCROLL DETECTION
  */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 50
      );

      const scrollPosition =
        window.scrollY + 300;

      let currentSection =
        'home';

      NAV_ITEMS.forEach((item) => {
        const id =
          item.href.replace(
            '#',
            ''
          );

        const section =
          document.getElementById(
            id
          );

        if (section) {
          const sectionTop =
            section.offsetTop;

          if (
            scrollPosition >=
            sectionTop
          ) {
            currentSection =
              id;
          }
        }
      });

      /*
        LAST SECTION FIX
        (CONTACT)
      */
      if (
        window.innerHeight +
          window.scrollY >=
        document.body
          .offsetHeight -
          100
      ) {
        currentSection =
          'contact';
      }

      setActive(
        currentSection
      );
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);

  /*
    SMOOTH SCROLL
  */
  const handleNav = (
    href: string
  ) => {
    setMenuOpen(false);

    document
      .querySelector(href)
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 backdrop-blur-xl border-b border-[#00ff88]/10 shadow-2xl shadow-black/30'
            : 'py-5 bg-transparent'
        }`}
        style={{
          background: scrolled
            ? 'rgba(4,10,15,0.82)'
            : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() =>
              handleNav(
                '#home'
              )
            }
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl border border-[#00ff88]/25 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#00ff88]">
              <div className="absolute inset-0 bg-[#00ff88]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <Shield
                size={18}
                className="text-[#00ff88] relative z-10"
              />
            </div>

            <span className="hidden sm:block font-orbitron text-sm font-bold text-white tracking-widest">
              HB
              <span className="text-[#00ff88]">
                .
              </span>
            </span>
          </button>

          {/* DESKTOP NAV */}
          <ul className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map(
              (item) => {
                const isActive =
                  active ===
                  item.href.replace(
                    '#',
                    ''
                  );

                return (
                  <li
                    key={
                      item.href
                    }
                  >
                    <button
                      onClick={() =>
                        handleNav(
                          item.href
                        )
                      }
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium tracking-wider transition-all duration-300 overflow-hidden ${
                        isActive
                          ? 'text-[#00ff88]'
                          : 'text-[#8ab4c8] hover:text-white'
                      }`}
                      style={{
                        fontFamily:
                          'Rajdhani, sans-serif',
                      }}
                    >
                      {/* ACTIVE BACKGROUND */}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-active-pill"
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 28,
                          }}
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background:
                              'rgba(0,255,136,0.08)',
                            border:
                              '1px solid rgba(0,255,136,0.25)',
                            boxShadow:
                              '0 0 20px rgba(0,255,136,0.12)',
                          }}
                        />
                      )}

                      <span className="relative z-10">
                        {
                          item.label
                        }
                      </span>
                    </button>
                  </li>
                );
              }
            )}
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            className="lg:hidden w-10 h-10 rounded-xl border border-[#00ff88]/25 flex items-center justify-center text-[#00ff88] transition-all duration-300 hover:border-[#00ff88]"
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed top-[72px] left-0 right-0 z-40 lg:hidden px-4"
          >
            <div className="rounded-2xl overflow-hidden border border-[#00ff88]/10 backdrop-blur-2xl bg-[#050b10]/95 shadow-2xl">
              <ul className="flex flex-col p-4 gap-2">
                {NAV_ITEMS.map(
                  (item) => {
                    const isActive =
                      active ===
                      item.href.replace(
                        '#',
                        ''
                      );

                    return (
                      <li
                        key={
                          item.href
                        }
                      >
                        <button
                          onClick={() =>
                            handleNav(
                              item.href
                            )
                          }
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ${
                            isActive
                              ? 'text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20'
                              : 'text-[#8ab4c8] hover:text-white hover:bg-white/5'
                          }`}
                          style={{
                            fontFamily:
                              'Rajdhani, sans-serif',
                          }}
                        >
                          {
                            item.label
                          }
                        </button>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}