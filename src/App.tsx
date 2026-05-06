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

function App() {
  return (
    <div className="relative w-full bg-[#040a0f] text-white overflow-x-hidden">
      <ParticleBackground />
      <CyberCursor />
      <Navbar/>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Blog />
      <Certifications />
      <Contact />
      <Footer />

     
      
    </div>
  );
}

export default App;
