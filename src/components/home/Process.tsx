'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { id: '01', title: 'Discovery', description: 'Understanding your vision, goals, and target audience to lay a solid foundation.' },
    { id: '02', title: 'Design', description: 'Crafting the visual identity and user interface with a focus on aesthetics and usability.' },
    { id: '03', title: 'Development', description: 'Bringing the design to life with clean, efficient, and scalable code.' },
    { id: '04', title: 'Refinement', description: 'Polishing animations, optimizing performance, and ensuring a flawless experience.' }
];

export default function Process() {
    const lineRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Line animation
        gsap.fromTo(lineRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                transformOrigin: 'top',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: true
                }
            }
        );

        // Steps animation
        const stepElements = document.querySelectorAll('.process-step');
        stepElements.forEach((step) => {
            gsap.fromTo(step,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: step,
                        start: "top 80%",
                    }
                }
            );
        });

    }, []);

    return (
        <section id="process" ref={containerRef} className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">

                <div className="md:w-1/3">
                    <h2 className="text-sm uppercase tracking-widest mb-8 opacity-60">Process</h2>
                    <h3 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight sticky top-32">
                        How I bring ideas to life.
                    </h3>
                </div>

                <div className="md:w-2/3 relative pl-8 md:pl-16">
                    {/* Thread Line */}
                    <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-gray-200 dark:bg-gray-800">
                        <div ref={lineRef} className="w-full h-full bg-accent"></div>
                    </div>

                    <div className="flex flex-col gap-24">
                        {steps.map((step) => (
                            <div key={step.id} className="process-step relative">
                                <span className="absolute -left-[4.5rem] md:-left-[6.5rem] top-0 text-sm font-mono opacity-40 bg-background py-1">
                                    {step.id}
                                </span>
                                <h4 className="text-2xl md:text-3xl font-medium mb-4">{step.title}</h4>
                                <p className="text-lg opacity-70 leading-relaxed max-w-lg">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
