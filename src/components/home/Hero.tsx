'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Image/Visual Reveal
        gsap.fromTo(imageRef.current,
            { scale: 1.2, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out'
            }
        );

        // Parallax on Scroll for background
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

            {/* Background Visual */}
            <div className="absolute inset-0 z-0">
                <div ref={imageRef} className="w-full h-full bg-gradient-to-b from-gray-50 to-gray-200 dark:from-neutral-900 dark:to-neutral-950" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="z-10 text-center max-w-5xl mx-auto mix-blend-difference text-white">
                <div className="mb-2">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[1.1]">
                        <TextReveal delay={0.2}>Crafting Digital</TextReveal>
                    </h1>
                </div>
                <div className="mb-6">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[1.1] text-accent/90">
                        <TextReveal delay={0.4}>Experiences.</TextReveal>
                    </h1>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="text-lg md:text-xl font-light text-gray-300 max-w-2xl leading-relaxed">
                        <TextReveal delay={0.6} duration={1}>
                            Merging design aesthetics with technical precision to create immersive web applications.
                        </TextReveal>
                    </div>
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
