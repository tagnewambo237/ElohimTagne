'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleLinesRef = useRef<(HTMLHeadingElement | null)[]>([]);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Text Reveal
        tl.fromTo(titleLinesRef.current,
            { y: 100, opacity: 0, rotateX: -20 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.2
            }
        );

        // Image/Visual Reveal
        tl.fromTo(imageRef.current,
            { scale: 1.2, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out'
            },
            "-=1"
        );

        // Parallax on Scroll
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: 100,
                opacity: 0.5,
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden px-6">

            {/* Background Visual (can be replaced with WebGL later) */}
            <div className="absolute inset-0 z-0">
                <div ref={imageRef} className="w-full h-full bg-gradient-to-b from-gray-50 to-gray-200 dark:from-neutral-900 dark:to-neutral-950" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="z-10 text-center max-w-5xl mx-auto mix-blend-difference text-white">
                <div className="overflow-hidden mb-2">
                    <h1
                        ref={(el) => { if (el) titleLinesRef.current[0] = el; }}
                        className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[1.1]"
                    >
                        Crafting Digital
                    </h1>
                </div>
                <div className="overflow-hidden mb-6">
                    <h1
                        ref={(el) => { if (el) titleLinesRef.current[1] = el; }}
                        className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[1.1] text-accent/90"
                    >
                        Experiences.
                    </h1>
                </div>

                <div className="overflow-hidden mt-8 flex justify-center">
                    <p
                        ref={(el) => { if (el) titleLinesRef.current[2] = el as any; }}
                        className="text-lg md:text-xl font-light text-gray-300 max-w-2xl leading-relaxed"
                    >
                        Merging design aesthetics with technical precision to create immersive web applications.
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 mix-blend-difference text-white">
                <span className="text-xs uppercase tracking-widest opacity-60">Scroll</span>
                <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
                    <div className="w-full h-full bg-white animate-scroll-down"></div>
                </div>
            </div>
        </section>
    );
}
