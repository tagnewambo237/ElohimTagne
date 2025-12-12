'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSticky() {
    const componentRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    const content = [
        {
            id: 1,
            title: t.features.f1_title,
            description: t.features.f1_desc,
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670"
        },
        {
            id: 2,
            title: t.features.f2_title,
            description: t.features.f2_desc,
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670"
        },
        {
            id: 3,
            title: t.features.f3_title,
            description: t.features.f3_desc,
            image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2670"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const texts = gsap.utils.toArray('.feature-text-block');
            const images = gsap.utils.toArray('.feature-image-block');

            ScrollTrigger.create({
                trigger: componentRef.current,
                start: "top top",
                end: `+=${content.length * 100}%`,
                pin: true,
                scrub: 1, // Add some lag for smoothness
                snap: 1 / (content.length - 1),
                animation: gsap.timeline()
                    .to(texts, { yPercent: -100 * (content.length - 1), ease: 'power1.inOut' }, 0) // Smoother ease
                    .to(images, { yPercent: -100 * (content.length - 1), ease: 'power1.inOut' }, 0)
            });

        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative bg-stone-900 dark:bg-black text-stone-50">
            <div ref={componentRef} className="h-[100dvh] w-full flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-6 md:px-12 h-[85dvh] items-center">

                    {/* Left Col: Text Mask */}
                    {/* On mobile: 35vh height. On desktop: 64 (16rem = 256px) or larger? Let's use responsive fixed heights matching animations */}
                    {/* We need consistent height for the translation to work properly. Let's use calc or vh. */}
                    <div className="h-[35dvh] md:h-96 overflow-hidden relative border-l-2 border-white/20 pl-6 md:pl-8 flex flex-col justify-center order-2 md:order-1">
                        <div className="h-full">
                            {content.map((item) => (
                                <div key={item.id} className="feature-text-block h-[35dvh] md:h-96 flex flex-col justify-center">
                                    <h3 className="text-3xl md:text-6xl font-bold tracking-tighter mb-3 md:mb-4 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-lg md:text-xl opacity-70 font-light max-w-md leading-relaxed line-clamp-4 md:line-clamp-none">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Col: Image Mask */}
                    <div className="h-[40dvh] md:h-[60vh] w-full overflow-hidden rounded-3xl relative shadow-2xl shadow-black/20 dark:shadow-white/5 order-1 md:order-2">
                        <div className="h-full">
                            {content.map((item) => (
                                <div key={item.id} className="feature-image-block h-full w-full relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover scale-105"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-multiply opacity-60" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
