import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Index;
