'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import clsx from 'clsx';
import TextReveal from '../ui/TextReveal';

gsap.registerPlugin(ScrollTrigger);

const hobbies = [
    { src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000", title: "Photography", col: 1 },
    { src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000", title: "Music", col: 2 },
    { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000", title: "Nature", col: 3 },
    { src: "https://images.unsplash.com/photo-1502014822147-1aed80671e0a?q=80&w=1000", title: "Travel", col: 1 },
    { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000", title: "Gaming", col: 2 },
    { src: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1000", title: "Design", col: 3 },
    { src: "https://images.unsplash.com/photo-1514525253440-b393452e2729?q=80&w=1000", title: "Clubbing", col: 1 },
    { src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000", title: "Streaming", col: 2 },
    { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000", title: "Events", col: 3 },
];

export default function ParallaxGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const col1Ref = useRef<HTMLDivElement>(null);
    const col2Ref = useRef<HTMLDivElement>(null);
    const col3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            tl.to(col1Ref.current, { y: -150, ease: "none" }, 0);
            tl.to(col2Ref.current, { y: 150, ease: "none" }, 0);
            tl.to(col3Ref.current, { y: -150, ease: "none" }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 w-full overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto mb-24">
                <span className="text-sm font-mono uppercase tracking-widest opacity-60">Lifestyle</span>
                <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mt-4">
                    <TextReveal>Life Offline.</TextReveal>
                </h2>
                <p className="mt-6 text-xl opacity-70 max-w-2xl">
                    When I'm not pushing pixels, I'm exploring the world through a lens, keys, or controller.
                    Here's a glimpse into my playground.
                </p>
            </div>

            <div className="h-[120vh] md:h-[150vh] overflow-hidden flex gap-4 md:gap-8 justify-center items-start relative">

                {/* Column 1 */}
                <div ref={col1Ref} className="w-1/3 flex flex-col gap-4 md:gap-8 -mt-24">
                    {hobbies.filter(h => h.col === 1).map((hobby, i) => (
                        <GalleryItem key={i} hobby={hobby} />
                    ))}
                </div>

                {/* Column 2 - Reverse Scroll */}
                <div ref={col2Ref} className="w-1/3 flex flex-col gap-4 md:gap-8 -mt-0">
                    {hobbies.filter(h => h.col === 2).map((hobby, i) => (
                        <GalleryItem key={i} hobby={hobby} />
                    ))}
                </div>

                {/* Column 3 */}
                <div ref={col3Ref} className="w-1/3 flex flex-col gap-4 md:gap-8 -mt-32">
                    {hobbies.filter(h => h.col === 3).map((hobby, i) => (
                        <GalleryItem key={i} hobby={hobby} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function GalleryItem({ hobby }: { hobby: { src: string, title: string } }) {
    return (
        <div className="relative group w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-none">
            <Image
                src={hobby.src}
                alt={hobby.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-medium text-lg md:text-2xl tracking-widest uppercase bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                    {hobby.title}
                </span>
            </div>
        </div>
    );
}
