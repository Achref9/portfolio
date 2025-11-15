import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { ArrowUpRight } from '@phosphor-icons/react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'University Management System',
    description: 'Scalable system built with TypeScript following SOLID principles.',
    image: project1,
    tech: ['TypeScript', 'Node.js', 'Tailwind', 'Supabase'],
    link: 'https://github.com',
  },
  {
    title: 'Project Management System',
    description: 'MERN application with authentication and user roles.',
    image: project2,
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    link: 'https://github.com',
  },
  {
    title: 'Mental Health App',
    description: 'Mobile app with meditation, mood tracking, and AI chatbot.',
    image: project3,
    tech: ['Flutter', 'NLP', 'TensorFlow', 'Firebase'],
    link: 'https://github.com',
  },
  {
    title: 'GitSync Manager',
    description: 'Unified dashboard for managing private GitHub repositories.',
    image: project4,
    tech: ['React', 'Node.js', 'Express', 'GitHub API'],
    link: 'https://github.com',
  },
  {
    title: 'VR Interior Design',
    description: 'Immersive VR solution for architects on Meta Quest 3.',
    image: project5,
    tech: ['Unity', 'C#', 'Blender', 'Meta Quest SDK'],
    link: 'https://github.com',
  },
  {
    title: 'Arabic Morphosyntactic Analyzer',
    description: 'LLM model for analyzing diacritized Arabic sentences.',
    image: project6,
    tech: ['Python', 'LLM', 'NLP'],
    link: 'https://github.com',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      const cards = scrollContainerRef.current?.querySelectorAll('.project-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-light mb-16 text-center">
          Featured <span className="text-gradient">Projects</span>
        </h2>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible"
          style={{ scrollbarWidth: 'none' }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card min-w-[85vw] md:min-w-0 snap-center group"
            >
              <div className="glass rounded-2xl overflow-hidden hover:glow transition-all duration-500 hover:scale-105">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-light mb-3 text-gradient">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-muted rounded-full text-muted-foreground border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full group/btn border-primary/30 hover:bg-primary/10 hover:border-primary"
                    asChild
                  >
                   
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Projects;
