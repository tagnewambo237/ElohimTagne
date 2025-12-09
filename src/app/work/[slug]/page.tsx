'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Correct import for Next.js 15 client components? Actually useParams is from next/navigation
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const projectsData: Record<string, any> = {
    luminous: {
        title: "Luminous",
        category: "Web Experience",
        year: "2025",
        description: "A digital journey through light and shadow. Luminous explores the relationship between user interaction and procedural lighting effects in a web environment.",
        images: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop"
        ],
        role: "Design & Development",
        stack: "Next.js, WebGL, GSAP"
    },
    nebula: {
        title: "Nebula",
        category: "Creative Coding",
        year: "2024",
        description: "An generative art piece that simulates the birth of stars. Users can interact with the particle system to influence the formation of celestial bodies.",
        images: [
            "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop"
        ],
        role: "Creative Development",
        stack: "Three.js, GLSL, React"
    },
    chronos: {
        title: "Chronos",
        category: "Mobile App",
        year: "2024",
        description: "A time management application that rethinks how we perceive our daily schedules. Using a circular interface to represent the cyclical nature of time.",
        images: [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512428559087-560fa0db7989?q=80&w=2670&auto=format&fit=crop"
        ],
        role: "UX/UI Design",
        stack: "React Native, Reanimated"
    },
    aether: {
        title: "Aether",
        category: "WebGL Interface",
        year: "2023",
        description: "A conceptual interface for a decentralized cloud storage platform. The visualization represents data nodes as floating ethereal crystals.",
        images: [
            "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop"
        ],
        role: "Frontend Development",
        stack: "Vue, Nuxt, OGL"
    }
};

export default function ProjectPage() {
    const params = useParams();
    const slug = params.slug as string;
    const project = projectsData[slug];

    const headerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!project) return;

        const tl = gsap.timeline();

        tl.fromTo(headerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        );

        const imageElements = imagesRef.current?.querySelectorAll('.project-image');
        if (imageElements) {
            tl.fromTo(imageElements,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
                "-=0.5"
            );
        }

    }, [project]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl">Project not found</h1>
                <Link href="/" className="underline ml-4">Go Back</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Navigation */}
            <div className="fixed top-0 left-0 p-6 z-50 mix-blend-difference text-white">
                <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium">Back</span>
                </Link>
            </div>

            <header ref={headerRef} className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col gap-8 mb-16">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                        <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter">{project.title}</h1>
                        <span className="text-sm font-mono opacity-60">{project.year}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                        <div className="col-span-1 md:col-span-2">
                            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90">
                                {project.description}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 text-sm font-mono opacity-70">
                            <div className="flex flex-col">
                                <span className="uppercase tracking-wider text-xs opacity-50 mb-1">Role</span>
                                <span>{project.role}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="uppercase tracking-wider text-xs opacity-50 mb-1">Stack</span>
                                <span>{project.stack}</span>
                            </div>
                            <div className="mt-4">
                                <Link href="#" className="flex items-center gap-2 pb-1 border-b border-gray-200 hover:border-black dark:hover:border-white transition-colors w-max">
                                    Live Site <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div ref={imagesRef} className="px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-8 md:gap-16">
                {project.images.map((img: string, i: number) => (
                    <div key={i} className="project-image w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                        <img
                            src={img}
                            alt={`${project.title} - View ${i + 1}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                    </div>
                ))}
            </div>

            {/* Next Project (Simple Logic) */}
            <div className="mt-32 text-center">
                <Link href="/" className="text-xl md:text-3xl font-medium hover:text-accent transition-colors">
                    Next Project &rarr;
                </Link>
            </div>

        </div>
    );
}
