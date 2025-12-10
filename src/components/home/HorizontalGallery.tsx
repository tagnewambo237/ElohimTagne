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

        const ctx = gsap.context(() => {
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
                    const skew = self.getVelocity() / 300;
                    gsap.to(slider, { skewX: skew, overwrite: 'auto', ease: 'power3.out', duration: 0.1 });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={sectionRef} className="h-screen bg-gray-900 dark:bg-gray-950 text-white overflow-hidden relative flex items-center">

            <div className="absolute top-12 left-6 md:left-12 z-10">
                <span className="text-sm font-mono uppercase tracking-widest opacity-60">{t.gallery.label}</span>
                <h2 className="text-4xl font-semibold mt-2">{t.gallery.title}</h2>
            </div>

            <div ref={sliderRef} className="flex gap-16 pl-[10vw] pr-12 w-fit">
                {projects.map((work, i) => (
                    <Link key={work.id} href={`/projects/${work.id}`} className="relative group w-[70vw] md:w-[600px] aspect-[4/3] md:aspect-[16/9] flex-shrink-0 bg-gray-800 rounded-3xl overflow-hidden cursor-pointer block">
                        <Image
                            src={work.img}
                            alt={work.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-3xl font-medium text-white mb-1">{work.title}</h3>
                            <p className="font-mono text-sm text-gray-400">{work.category[language]}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </section>
    );
}
