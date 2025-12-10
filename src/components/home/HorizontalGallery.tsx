'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const { t, language } = useLanguage();

    useEffect(() => {
        const slider = sliderRef.current;
        const section = sectionRef.current;

        if (!slider || !section) return;

        let ctx = gsap.context(() => {
            const slides = gsap.utils.toArray<HTMLElement>('.gallery-item');
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
                scrub: 1.5,
                animation: tween,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Skew effect
                    const skew = self.getVelocity() / 300;
                    gsap.to(slider, { skewX: skew, overwrite: 'auto', ease: 'power3.out', duration: 0.1 });

                    // Scale effect based on center position
                    slides.forEach((slide) => {
                        const box = slide.getBoundingClientRect();
                        const centerPosition = box.left + box.width / 2;
                        const screenCenter = window.innerWidth / 2;
                        const distance = Math.abs(screenCenter - centerPosition);
                        const maxDistance = window.innerWidth / 2;

                        // Calculate scale: 1 at center, smaller at edges
                        let scale = 1;
                        if (distance < maxDistance) {
                            // normalize distance: 0 at center, 1 at edge
                            const progress = 1 - (distance / maxDistance);
                            // Interpolate between 0.85 and 1.1 opacity/scale
                            scale = 0.85 + (0.25 * Math.pow(progress, 2)); // Ease in
                        } else {
                            scale = 0.85;
                        }

                        gsap.to(slide, {
                            scale: scale,
                            opacity: distance < 300 ? 1 : 0.5, // Highlight center item
                            overwrite: 'auto',
                            duration: 0.2
                        });
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [language]); // Add dependency on language if needed, or empty

    return (
        <section id="work" ref={sectionRef} className="h-screen bg-gray-900 dark:bg-gray-950 text-white overflow-hidden relative flex items-center">

            <div className="absolute top-12 left-6 md:left-12 z-10">
                <span className="text-sm font-mono uppercase tracking-widest opacity-60">{t.gallery.label}</span>
                <h2 className="text-4xl font-semibold mt-2">{t.gallery.title}</h2>
            </div>

            <div ref={sliderRef} className="flex gap-8 md:gap-16 pl-[50vw] pr-[50vw] w-fit items-center">
                {projects.map((work, i) => (
                    <Link
                        key={work.id}
                        href={`/projects/${work.id}`}
                        className="gallery-item relative group w-[70vw] md:w-[600px] aspect-[4/3] md:aspect-[16/9] flex-shrink-0 bg-gray-800 rounded-3xl overflow-hidden cursor-pointer block transform-gpu active:scale-95 transition-all"
                    >
                        <Image
                            src={work.img}
                            alt={work.title}
                            fill
                            className="object-cover opacity-80 transition-all duration-700 ease-out"
                        />
                        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-2xl md:text-3xl font-medium text-white mb-1">{work.title}</h3>
                            <p className="font-mono text-sm text-gray-400">{work.category[language]}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </section>
    );
}
