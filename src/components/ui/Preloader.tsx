'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cupRef = useRef<SVGPathElement>(null);
    const espressoRef = useRef<SVGRectElement>(null);
    const foamRef = useRef<SVGRectElement>(null);
    const steamRef = useRef<SVGGElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [complete, setComplete] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setComplete(true)
        });

        // 1. Draw the Cup outline
        if (cupRef.current) {
            const length = cupRef.current.getTotalLength();
            gsap.set(cupRef.current, { strokeDasharray: length, strokeDashoffset: length });
            tl.to(cupRef.current, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' });
        }

        // 2. Fill with espresso (double shot = plus foncé et plus intense)
        if (espressoRef.current) {
            gsap.set(espressoRef.current, { scaleY: 0 });
            tl.to(espressoRef.current, {
                scaleY: 1,
                duration: 0.8,
                ease: "power2.out",
            }, "-=0.5");
        }

        // 3. Add crema on top (mousse légère de l'expresso)
        if (foamRef.current) {
            gsap.set(foamRef.current, { scaleY: 0, opacity: 0 });
            tl.to(foamRef.current, {
                scaleY: 1,
                opacity: 1,
                duration: 0.5,
                ease: "bounce.out",
            }, "-=0.3");
        }

        // 4. Steam animation (continuous rising)
        if (steamRef.current) {
            tl.fromTo(steamRef.current.children,
                { y: 0, opacity: 0, scale: 0.8 },
                {
                    y: -30,
                    opacity: 0.6,
                    scale: 1.2,
                    duration: 1.0,
                    stagger: 0.1,
                    ease: "power1.out",
                    repeat: 1,
                    repeatDelay: 0.1
                },
                "-=0.5"
            );
        }

        // 5. Text Reveal
        tl.fromTo(textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
            "-=1.2"
        );

        // 6. Exit Animation
        tl.to([cupRef.current, espressoRef.current, foamRef.current, steamRef.current, textRef.current], {
            scale: 1.05,
            opacity: 0,
            duration: 0.4,
            delay: 0.2,
            ease: 'power2.in'
        });

        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 0.6,
            ease: 'power3.inOut'
        });

    }, []);

    if (complete) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center text-foreground overflow-hidden">

            <div className="relative w-48 h-48 mb-8">
                <svg className="w-full h-full" viewBox="0 0 100 100" overflow="visible">
                    {/* Cup Outline */}
                    <path
                        ref={cupRef}
                        d="M25 35 L30 80 Q32 90 50 90 Q68 90 70 80 L75 35 M75 45 Q85 45 85 55 Q85 65 73 65"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />

                    {/* Liquid Mask Container */}
                    <mask id="liquidMask">
                        <path d="M27 35 L30 80 Q32 90 50 90 Q68 90 70 80 L73 35 Z" fill="white" />
                    </mask>

                    {/* The Liquids */}
                    <g mask="url(#liquidMask)">
                        {/* Espresso Double Shot - Plus foncé et intense */}
                        <rect
                            ref={espressoRef}
                            x="20" y="35" width="60" height="60"
                            fill="#3D2817"
                            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
                        />
                        {/* Crema (mousse légère dorée du vrai expresso) */}
                        <rect
                            ref={foamRef}
                            x="20" y="35" width="60" height="3"
                            fill="#C8A882"
                            style={{ transformBox: "fill-box", transformOrigin: "top" }}
                        />
                    </g>

                    {/* Steam */}
                    <g ref={steamRef} className="opacity-0">
                        <path d="M35 25 Q35 15 40 10" stroke="#6F4E37" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d="M50 20 Q50 10 55 5" stroke="#6F4E37" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d="M65 25 Q65 15 70 10" stroke="#6F4E37" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </g>
                </svg>
            </div>

            {/* Funny Message */}
            <div ref={textRef} className="text-center opacity-0 px-4">
                <h2 className="text-xl md:text-2xl font-mono tracking-widest uppercase mb-2">
                    Elohim <span className="italic text-[#3D2817] dark:text-[#C8A882]">Double Expresso</span>
                </h2>
                <p className="text-sm opacity-60 font-light">
                    {t.preloader.text}
                </p>
            </div>

        </div>
    );
}
