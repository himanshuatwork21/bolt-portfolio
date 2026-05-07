import { useEffect, useState } from 'react';

import ParticleBackground from './components/ParticleBackground';
import CyberCursor from './components/CyberCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Blog from './components/Blog';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { client } from './sanity/client';
import { footerQuery } from './sanity/queries';

function App() {
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    client
      .fetch(footerQuery)
      .then((data) => {
        console.log('Footer Data:', data);
        setFooterData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative w-full bg-[#040a0f] text-white overflow-x-hidden">
      <ParticleBackground />

      <CyberCursor />

      <Navbar />

      <Hero />

      <About />

      <Skills />

      <Projects />

      <Experience />

      <Education />

      <Blog />

      <Certifications />

      <Contact />

      {footerData && <Footer data={footerData} />}
    </div>
  );
}

export default App;