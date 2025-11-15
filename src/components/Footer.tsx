import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative py-12 border-t border-border/30">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Navigation Links */}
          <nav className="flex gap-8">
            <a
              href="#about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">
              © 2025 Achref Abidi. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="text-primary hover:text-secondary transition-colors text-sm mt-2"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
