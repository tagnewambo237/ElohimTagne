'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Lottie from 'lottie-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Preloader() {
    const mainContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [complete, setComplete] = useState(false);
    const [animationData, setAnimationData] = useState<object | null>(null);
    const { t } = useLanguage();

    // Charger l'animation Lottie locale
    useEffect(() => {
        fetch('/coffee-love.json')
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(err => console.error('Failed to load Lottie animation:', err));
    }, []);

    // Animation GSAP
    useEffect(() => {
        if (!animationData) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => setComplete(true),
            });

            // Initial states - tout caché
            gsap.set(contentRef.current, { opacity: 0, scale: 0.8, y: 30 });
            gsap.set(textRef.current, { opacity: 0, y: 20 });
            gsap.set(progressRef.current, { scaleX: 0 });

            // 1. Fade in du contenu avec rebond
            tl.to(contentRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            });

            // 2. Texte apparaît
            tl.to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.4");

            // 3. Barre de progression
            tl.to(progressRef.current, {
                scaleX: 1,
                duration: 2.5,
                ease: "power1.inOut"
            }, "-=0.3");

            // 4. Pause pour apprécier l'animation
            tl.to({}, { duration: 0.5 });

            // 5. Sortie élégante - contraction
            tl.to([contentRef.current, textRef.current], {
                scale: 0.95,
                duration: 0.2,
                ease: "power2.in"
            });

            // 6. Expulsion vers le haut
            tl.to([contentRef.current, textRef.current], {
                opacity: 0,
                y: -60,
                scale: 0.8,
                duration: 0.4,
                ease: "power3.in"
            });

            // 7. Le rideau disparaît
            tl.to(mainContainerRef.current, {
                yPercent: -100,
                duration: 0.6,
                ease: 'expo.inOut'
            }, "-=0.2");

        }, mainContainerRef);

        return () => ctx.revert();
    }, [animationData]);

    if (complete) return null;

    return (
        <div 
            ref={mainContainerRef} 
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center text-foreground overflow-hidden"
        >
            {/* Contenu principal */}
            <div ref={contentRef} className="flex flex-col items-center opacity-0">
                
                {/* Animation Lottie */}
                <div className="w-48 h-48 md:w-56 md:h-56 mb-2">
                    {animationData ? (
                        <Lottie 
                            animationData={animationData}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        // Spinner pendant le chargement
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-12 h-12 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
                        </div>
                    )}
                </div>

            </div>

            {/* Texte */}
            <div ref={textRef} className="text-center px-4 mt-2 opacity-0">
                <h2 className="text-lg md:text-xl font-mono tracking-[0.25em] uppercase mb-2">
                    <span className="text-foreground font-medium">Elohim</span>
                    <span className="italic font-serif text-accent"> TAGNE</span>
                </h2>
                <p className="text-xs md:text-sm opacity-50 font-light tracking-wide max-w-xs">
                    {t.preloader.text}
                </p>

                {/* Barre de progression */}
                <div className="mt-6 w-44 h-[2px] bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mx-auto">
                    <div 
                        ref={progressRef} 
                        className="h-full bg-accent rounded-full origin-left"
                    />
                </div>
            </div>

        </div>
    );
}