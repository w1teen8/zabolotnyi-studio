import Cursor from './components/Cursor/Cursor';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import Stats from './components/Stats/Stats';
import Portfolio from './components/Portfolio/Portfolio';
import WhyUs from './components/WhyUs/WhyUs';
import Process from './components/Process/Process';
import Pricing from './components/Pricing/Pricing';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  useSmoothScroll();

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Portfolio />
        <WhyUs />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
