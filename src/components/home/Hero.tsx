'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';
import MoodBadge from '@/components/ui/MoodBadge';
import { Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [showCoffee, setShowCoffee] = useState(false);
    const { t } = useLanguage();

    const handleDownload = () => {
        setShowCoffee(true);
        setTimeout(() => setShowCoffee(false), 3000);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
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
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden px-6">

            {/* Background Visual */}
            {/* Background Visual */}
            <div className="absolute inset-0 z-0">
                <div ref={imageRef} className="w-full h-full bg-background relative">
                    {/* Warm ambient glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                </div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="z-10 text-center max-w-5xl mx-auto">
                {/* Photo */}
                <div className="mb-6 flex justify-center relative">
                    {/* Soft Glow behind photo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />

                    <div className="w-28 h-28 md:w-36 md:h-36 relative border border-white/20 dark:border-white/10 shadow-2xl rounded-full">
                        <img
                            src="/Profile.png"
                            alt="Elohim TAGNE"
                            className="w-full h-full object-cover object-top rounded-full"
                        />
                        <MoodBadge />
                    </div>
                </div>

                {/* Nom */}
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[1.1] mb-6">
                    <span className="inline-block text-gray-900 dark:text-white"><TextReveal delay={0.2}>{t.hero.greeting}</TextReveal></span>
                    {' '}
                    <span className="inline-block text-accent"><TextReveal delay={0.3}>{t.hero.surname}</TextReveal></span>
                </h1>

                {/* Sous-titre */}
                <div className="mt-8 flex justify-center">
                    <div className="text-lg md:text-xl font-light text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                        <TextReveal delay={0.6} duration={1}>
                            {t.hero.role}
                        </TextReveal>
                    </div>
                </div>

                {/* CV Button */}
                <a
                    href="/cv/CV_2025-08-27_Elohim Junior_TAGNE WAMBO.pdf"
                    download="CV_Elohim_TAGNE.pdf"
                    onClick={handleDownload}
                    className="mt-8 px-8 py-3 rounded-full border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition-all inline-flex items-center gap-3 text-sm tracking-widest uppercase font-medium group"
                >
                    <span>{t.hero.downloadCv}</span>
                    <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-600 dark:text-white">
                <span className="text-xs uppercase tracking-widest opacity-60">{t.hero.scroll}</span>
                <div className="w-[1px] h-12 bg-gray-300 dark:bg-white/20 overflow-hidden">
                    <div className="w-full h-full bg-gray-600 dark:bg-white animate-scroll-down"></div>
                </div>
            </div>

            {/* Subtle Coffee Toast */}
            {showCoffee && (
                <div className="fixed bottom-10 left-10 z-[9999] pointer-events-none flex flex-col items-center animate-bounce">
                    <span className="text-4xl filter drop-shadow-lg">☕️</span>
                    <span className="mt-2 bg-white dark:bg-stone-900 px-3 py-1 rounded-lg shadow-xl text-xs font-mono border border-gray-200 dark:border-white/10 text-stone-600 dark:text-stone-300 whitespace-nowrap">
                        Merci pour l'intérêt !
                    </span>
                </div>
            )}
        </section>
    );
}
