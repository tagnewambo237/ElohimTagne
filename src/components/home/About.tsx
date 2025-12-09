'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    "Next.js", "React", "TypeScript", "Three.js", "GSAP", "Node.js", "Astro", "TailwindCSS"
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Text Reveal
        const words = textRef.current?.innerText.split(" ");
        if (textRef.current) {
            textRef.current.innerHTML = words!.map(word => `<span class="inline-block opacity-0 translate-y-4 project-text-reveal">${word}</span>`).join(" ");
        }

        gsap.to(".project-text-reveal", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom bottom",
            },
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.8,
            ease: "power3.out"
        });

    }, []);

    return (
        <section id="about" ref={containerRef} className="py-32 px-6 md:px-12 bg-background">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                {/* Left: Image / Visual */}
                <div className="relative group overflow-hidden rounded-2xl aspect-[3/4] md:aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
                        alt="Portrait"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* Right: Content */}
                <div className="flex flex-col gap-12 pt-8">
                    <div>
                        <h2 className="text-sm uppercase tracking-widest mb-8 opacity-60">About Me</h2>
                        <p
                            ref={textRef}
                            className="text-2xl md:text-4xl font-light leading-snug"
                        >
                            I am a multidisciplinary creative developer based in Paris, obsessed with crafting polished digital experiences. I bridge the gap between design and engineering, ensuring every pixel and interaction serves a purpose.
                        </p>
                    </div>

                    <div ref={skillsRef}>
                        <h3 className="text-lg font-medium mb-6">Technologies</h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.map(skill => (
                                <span key={skill} className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 text-sm hover:bg-foreground hover:text-background transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-8">
                        <h3 className="text-lg font-medium">Philosophy</h3>
                        <p className="opacity-70 leading-relaxed">
                            "Simplicity is the ultimate sophistication." <br />
                            I believe in clutter-free designs that guide the user intuitively. My work is driven by a desire to make the web more beautiful and functional.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
