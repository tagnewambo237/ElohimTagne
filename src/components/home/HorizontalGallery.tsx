'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const works = [
    { title: "NBIKOPAY", category: "Fintech", img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2000" },
    { title: "Port Abidjan", category: "App", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000" },
    { title: "Destiny Life", category: "Mobile", img: "https://images.unsplash.com/photo-1512428559087-560fa0db7989?q=80&w=2000" },
    { title: "M4M Systems", category: "Arch", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000" },
    { title: "CryptoDash", category: "Web3", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000" },
];

export default function HorizontalGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = sliderRef.current;
        const section = sectionRef.current;

        if (!slider || !section) return;

        const getScrollAmount = () => -(slider.scrollWidth - window.innerWidth);

        const tween = gsap.to(slider, {
            x: getScrollAmount,
            ease: "none",
        });

        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${slider.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1.5, // Heavier inertia
            animation: tween,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                // Skew effect based on velocity
                const skew = self.getVelocity() / 300;
                gsap.to(slider, { skewX: skew, overwrite: 'auto', ease: 'power3.out', duration: 0.1 });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section id="work" ref={sectionRef} className="h-screen bg-foreground text-background overflow-hidden relative flex items-center">

            <div className="absolute top-12 left-6 md:left-12 z-10 mix-blend-difference text-white">
                <span className="text-sm font-mono uppercase tracking-widest opacity-60">Selected Works</span>
                <h2 className="text-4xl font-semibold mt-2">Recent Projects.</h2>
            </div>

            <div ref={sliderRef} className="flex gap-16 pl-[10vw] pr-12 w-fit">
                {works.map((work, i) => (
                    <div key={i} className="relative group w-[70vw] md:w-[600px] aspect-[4/3] md:aspect-[16/9] flex-shrink-0 bg-gray-800 rounded-3xl overflow-hidden cursor-pointer">
                        <img
                            src={work.img}
                            alt={work.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-3xl font-medium text-white mb-1">{work.title}</h3>
                            <p className="font-mono text-sm text-gray-400">{work.category}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}
