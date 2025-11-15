import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
    })
    .to(textRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)",
    })
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.inOut",
    }, "+=0.3");

  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div ref={textRef} className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-gradient mb-4">
          Achref Abidi
        </h1>
        <p className="text-muted-foreground text-lg">Loading Experience...</p>
      </div>

      <div className="relative w-64 md:w-96 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          ref={progressBarRef}
          className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-primary via-secondary to-accent glow"
          style={{ width: '0%' }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;
