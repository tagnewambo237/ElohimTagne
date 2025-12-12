'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGalleryMobile() {
    const { t, language } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter or slice projects if needed, or show all
    const displayProjects = projects;

    useEffect(() => {
        // We will add a subtle parallax effect to the images based on scroll
        const cards = document.querySelectorAll('.mobile-project-card');

        cards.forEach((card) => {
            const image = card.querySelector('.project-image');

            gsap.to(image, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom", // when top of card hits bottom of viewport
                    end: "bottom top",   // when bottom of card hits top of viewport
                    scrub: true
                }
            });
        });

    }, []);

    return (
        <section className="py-24 bg-stone-900 dark:bg-black text-white md:hidden">
            <div className="px-6 mb-12">
                <span className="text-sm font-mono uppercase tracking-widest opacity-60 text-accent">{t.gallery.label}</span>
                <h2 className="text-4xl font-semibold mt-3 tracking-tight">{t.gallery.title}</h2>
                <p className="mt-4 text-white/60 text-lg font-light leading-relaxed">
                    Une sélection de projets conçus avec passion.
                </p>
            </div>

            <div className="flex flex-col gap-8 px-4">
                {displayProjects.map((work, i) => (
                    <Link
                        key={work.id}
                        href={`/projects/${work.id}`}
                        className="mobile-project-card sticky top-24 block w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group"
                    >
                        {/* Parallax Image Container */}
                        <div className="relative w-full h-[120%] -mt-[10%]">
                            <Image
                                src={work.img}
                                alt={work.title}
                                fill
                                className="project-image object-cover"
                                priority={i < 2}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="inline-block px-3 py-1 mb-3 text-xs font-mono uppercase tracking-wider bg-accent/90 text-white rounded-full backdrop-blur-md">
                                {work.category[language]}
                            </span>
                            <h3 className="text-3xl font-bold leading-none mb-2 text-white">
                                {work.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-white/70 font-mono opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                <span>Voir le projet</span>
                                <span>→</span>
                            </div>
                        </div>

                        {/* Number */}
                        <div className="absolute top-6 right-6 font-mono text-6xl text-white/5 font-bold z-0 pointer-events-none">
                            {String(i + 1).padStart(2, '0')}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Bottom Spacer */}
            <div className="h-24"></div>
        </section>
    );
}
