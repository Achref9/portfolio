import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
      .fromTo(
        formRef.current?.querySelectorAll('.form-input') || [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .fromTo(
        iconsRef.current?.children || [],
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast.success('Message sent successfully! I\'ll get back to you soon.');
    
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-light mb-16 text-center">
          Get In <span className="text-gradient">Touch</span>
        </h2>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-2xl p-8 mb-12">
            <div className="form-input mb-6">
              <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-muted/50 border-border/50 focus:border-primary focus:ring-primary focus:glow transition-all"
                placeholder="Your name"
              />
            </div>

            <div className="form-input mb-6">
              <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-muted/50 border-border/50 focus:border-primary focus:ring-primary focus:glow transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-input mb-8">
              <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="bg-muted/50 border-border/50 focus:border-primary focus:ring-primary focus:glow transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow hover:glow-lg hover:scale-105 transition-all duration-300"
            >
              Send Message
            </Button>
          </form>

          {/* Social Links */}
          <div ref={iconsRef} className="flex justify-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass w-14 h-14 rounded-full flex items-center justify-center hover:glow hover:scale-110 transition-all duration-300 group"
            >
              <GithubLogo size={24} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass w-14 h-14 rounded-full flex items-center justify-center hover:glow hover:scale-110 transition-all duration-300 group"
            >
              <LinkedinLogo size={24} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:abidi.achref030@gmail.com"
              className="glass w-14 h-14 rounded-full flex items-center justify-center hover:glow hover:scale-110 transition-all duration-300 group"
            >
              <EnvelopeSimple size={24} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Contact;
