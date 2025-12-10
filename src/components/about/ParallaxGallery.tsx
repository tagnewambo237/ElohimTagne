'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const hobbies = [
    { src: "/gallery/photo nature.JPG", title: "Photographie", col: 1 },
    { src: "/gallery/musique.JPG", title: "Musique", col: 2 },
    { src: "/gallery/coffee_time.JPG", title: "Chill", col: 3 },
    { src: "/gallery/voyage_bagangte.JPG", title: "Voyage", col: 1 },
    { src: "/gallery/game.WEBP", title: "Gaming", col: 2 },
    { src: "/gallery/pillard.JPG", title: "Sport", col: 3 },
    { src: "/gallery/voyage_plage.JPG", title: "Nature", col: 1 },
    { src: "/gallery/detente.JPG", title: "Détente", col: 2 },
    { src: "/gallery/best_cake.JPG", title: "Food", col: 3 },
    { src: "/gallery/cafe.JPG", title: "Café", col: 3 },
];

export default function ParallaxGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cols = gsap.utils.toArray('.gallery-col');
            cols.forEach((col: any, i) => {
                const speed = i % 2 === 0 ? 100 : -100;
                gsap.to(col, {
                    y: speed,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Helper to group images by column
    const getImagesByCol = (col: number) => hobbies.filter(h => h.col === col);

    return (
        <section ref={sectionRef} className="min-h-screen py-32 bg-background relative">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 text-center">
                <span className="text-sm font-mono uppercase tracking-widest opacity-60">{t.about.hobbies_label}</span>
                <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mt-4 flex justify-center">
                    <TextReveal>{t.about.hobbies_title}</TextReveal>
                </h2>
                <p className="max-w-xl mx-auto mt-6 text-xl opacity-80 font-light">
                    {t.about.hobbies_desc}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-1 flex gap-4 md:gap-8 justify-center items-start relative">
                {[1, 2, 3].map((colNum) => (
                    <div key={colNum} className="gallery-col w-1/3 flex flex-col gap-4 md:gap-8 relative will-change-transform">
                        {getImagesByCol(colNum).map((hobby, index) => (
                            <div key={index} className="relative aspect-[3/4] md:aspect-[2/3] w-full rounded-2xl overflow-hidden group">
                                <Image
                                    src={hobby.src}
                                    alt={hobby.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out filter grayscale-[50%] contrast-125 group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-medium text-lg">{hobby.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
}
