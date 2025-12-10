'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import clsx from 'clsx';
import TextReveal from '../ui/TextReveal';

gsap.registerPlugin(ScrollTrigger);

const hobbies = [
    { src: "/gallery/photo nature.JPG", title: "Photographie", col: 1 },
    { src: "/gallery/musique.JPG", title: "Musique", col: 2 },
    { src: "/gallery/voyage_plage.JPG", title: "Voyage", col: 3 },
    { src: "/gallery/detente.JPG", title: "Détente", col: 1 },
    { src: "/gallery/game.WEBP", title: "Gaming", col: 2 },
    { src: "/gallery/coffee_time.JPG", title: "Pause Café", col: 3 },
    { src: "/gallery/pillard.JPG", title: "Billard", col: 1 },
    { src: "/gallery/best_cake.JPG", title: "Gourmandise", col: 2 },
    { src: "/gallery/voyage_bagangte.JPG", title: "Exploration", col: 3 },
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
                    <TextReveal>Vie Offline.</TextReveal>
                </h2>
                <p className="mt-6 text-xl opacity-70 max-w-2xl">
                    Quand je ne suis pas en train de coder, j'explore le monde à travers un objectif, des touches de piano ou une manette.
                    Voici un aperçu de mon univers.
                </p>
            </div>

            <div className="min-h-screen flex gap-4 md:gap-8 justify-center items-start relative px-1">

                {/* Column 1 */}
                <div ref={col1Ref} className="w-1/3 flex flex-col gap-4 md:gap-8 mt-0">
                    {hobbies.filter(h => h.col === 1).map((hobby, i) => (
                        <GalleryItem key={i} hobby={hobby} />
                    ))}
                </div>

                {/* Column 2 */}
                <div ref={col2Ref} className="w-1/3 flex flex-col gap-4 md:gap-8 mt-16 md:mt-32">
                    {hobbies.filter(h => h.col === 2).map((hobby, i) => (
                        <GalleryItem key={i} hobby={hobby} />
                    ))}
                </div>

                {/* Column 3 */}
                <div ref={col3Ref} className="w-1/3 flex flex-col gap-4 md:gap-8 mt-8 md:mt-16">
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
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out filter grayscale-[50%] contrast-125 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-medium text-lg md:text-2xl tracking-widest uppercase bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                    {hobby.title}
                </span>
            </div>
        </div>
    );
}
