'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import TextReveal from '../ui/TextReveal';
import { ArrowUpRight, Sparkles } from 'lucide-react';

// Updated projects based on user CV
const projects = [
    {
        id: 1,
        title: "NBIKOPAY",
        category: "Fintech App",
        year: "2024",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2670&auto=format&fit=crop",
        slug: "nbikopay"
    },
    {
        id: 2,
        title: "Port Autonome",
        category: "Management",
        year: "2024",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
        slug: "port-abidjan"
    },
    {
        id: 3,
        title: "Destiny Life",
        category: "Mobile UX/UI",
        year: "2024",
        image: "https://images.unsplash.com/photo-1512428559087-560fa0db7989?q=80&w=2670&auto=format&fit=crop",
        slug: "destiny-life"
    },
    {
        id: 4,
        title: "System Eval",
        category: "Architecture",
        year: "2024",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        slug: "microservices"
    }
];

export default function Projects() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorLabelRef = useRef<HTMLDivElement>(null);
    const cursorImageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Move cursor visual
        const moveCursor = (e: MouseEvent) => {
            if (activeProject !== null && cursorImageRef.current) {
                gsap.to(cursorImageRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.8, // Dofter lag
                    ease: 'power3.out'
                });
                gsap.to(cursorLabelRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [activeProject]);

    return (
        <section id="work" ref={containerRef} className="py-48 px-6 md:px-12 bg-background relative z-10 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-24">
                    <div>
                        <span className="text-xs font-mono uppercase tracking-[0.2em] opacity-50 block mb-4">Projets Sélectionnés</span>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight">
                            <TextReveal>Artisanat Digital.</TextReveal>
                        </h2>
                    </div>
                    <div className="hidden md:block">
                        <Sparkles className="w-8 h-8 opacity-20 animate-pulse text-accent" />
                    </div>
                </div>

                <div className="flex flex-col">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`#`}
                            className="group relative border-t border-black/5 dark:border-white/5 py-16 flex justify-between items-center transition-all duration-500 hover:px-8 cursor-none"
                            onMouseEnter={() => setActiveProject(project.id)}
                            onMouseLeave={() => setActiveProject(null)}
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 z-20">
                                <h3 className="text-3xl md:text-5xl font-light tracking-tight group-hover:italic transition-all duration-300">
                                    {project.title}
                                </h3>
                                <span className="text-xs md:text-sm uppercase tracking-widest opacity-40 font-mono group-hover:text-accent transition-colors">
                                    {project.category}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 z-20">
                                <span className="text-sm font-mono opacity-30 group-hover:opacity-100 transition-opacity">
                                    {project.year}
                                </span>
                                <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent" />
                            </div>

                            {/* Soft Hover Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-stone-50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Link>
                    ))}
                    <div className="border-t border-black/5 dark:border-white/5" />
                </div>
            </div>

            {/* Floating Image Preview - Softer & Cuter */}
            <div
                ref={cursorImageRef}
                className="fixed top-0 left-0 w-[450px] aspect-[16/10] pointer-events-none z-[60] overflow-hidden rounded-[2rem] opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-2xl shadow-accent/10"
                style={{
                    opacity: activeProject ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${activeProject ? 1 : 0.8}) rotate(${activeProject ? -2 : 0}deg)`,
                    transition: 'opacity 0.4s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                {projects.map((project) => (
                    <img
                        key={project.id}
                        src={project.image}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activeProject === project.id ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>

            {/* View Label - Cute Touch */}
            <div
                ref={cursorLabelRef}
                className="fixed top-0 left-0 w-24 h-24 bg-white dark:bg-black text-black dark:text-white rounded-full flex flex-col items-center justify-center pointer-events-none z-[70] opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:flex border border-black/10 dark:border-white/10 shadow-xl backdrop-blur-md"
                style={{
                    opacity: activeProject ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${activeProject ? 1 : 0})`,
                    transition: 'opacity 0.3s, transform 0.3s'
                }}
            >
                <span className="text-xs font-semibold tracking-widest uppercase mb-1">Voir</span>
                <span className="text-xl animate-bounce">✿</span>
            </div>

        </section>
    );
}
