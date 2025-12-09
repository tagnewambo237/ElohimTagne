'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const projects = [
    {
        id: 1,
        title: "Luminous",
        category: "Web Experience",
        year: "2025",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        slug: "luminous"
    },
    {
        id: 2,
        title: "Nebula",
        category: "Creative Coding",
        year: "2024",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
        slug: "nebula"
    },
    {
        id: 3,
        title: "Chronos",
        category: "Mobile App",
        year: "2024",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        slug: "chronos"
    },
    {
        id: 4,
        title: "Aether",
        category: "WebGL Interface",
        year: "2023",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
        slug: "aether"
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
                    duration: 0.5,
                    ease: 'power3.out'
                });
                gsap.to(cursorLabelRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.4,
                    ease: 'power3.out'
                });
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [activeProject]);

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 bg-background relative z-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-sm uppercase tracking-widest mb-16 opacity-60">Selected Works</h2>

                <div className="flex flex-col">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/work/${project.slug}`}
                            className="group relative border-t border-gray-200 dark:border-gray-800 py-12 flex justify-between items-center transition-all hover:px-4"
                            onMouseEnter={() => setActiveProject(project.id)}
                            onMouseLeave={() => setActiveProject(null)}
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 transition-all duration-300 group-hover:-translate-x-2">
                                <h3 className="text-3xl md:text-5xl font-medium tracking-tight group-hover:text-accent transition-colors">
                                    {project.title}
                                </h3>
                                <span className="text-sm md:text-base opacity-60 font-mono">{project.category}</span>
                            </div>

                            <span className="text-sm font-mono opacity-40 group-hover:opacity-100 transition-opacity">
                                {project.year}
                            </span>
                        </Link>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-800" />
                </div>
            </div>

            {/* Floating Image Preview */}
            <div
                ref={cursorImageRef}
                className="fixed top-0 left-0 w-[400px] h-[250px] pointer-events-none z-20 overflow-hidden rounded-lg opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"
                style={{
                    opacity: activeProject ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${activeProject ? 1 : 0.8})`,
                    transition: 'opacity 0.3s, transform 0.3s'
                }}
            >
                {projects.map((project) => (
                    <img
                        key={project.id}
                        src={project.image}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${activeProject === project.id ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>

            {/* View Label */}
            <div
                ref={cursorLabelRef}
                className="fixed top-0 left-0 w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center pointer-events-none z-30 opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:flex mix-blend-difference"
                style={{
                    opacity: activeProject ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${activeProject ? 1 : 0})`,
                    transition: 'opacity 0.3s, transform 0.3s'
                }}
            >
                <span className="text-xs font-medium">View</span>
            </div>

        </section>
    );
}
