'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const phrases = [
    "☕ Un café et je code le monde !",
    "🎮 Pause gaming ? Jamais entendu parler...",
    "😸 Miaou ! (Ça veut dire 'debug en cours')",
    "📚 Je lis des mangas pour 'la recherche UX'",
    "💻 404: Motivation not found... jk, café incoming!",
    "🐱 Ce code a besoin de plus de caféine",
    "🎯 Bug fixé ! ...ou pas. On verra demain.",
    "✨ Ctrl+S est ma religion",
    "🍜 Pause ramen = Productivité x10",
    "😼 Je ne dors pas, je compile",
];

export default function CursorCat() {
    const containerRef = useRef<HTMLDivElement>(null);
    const eyesRef = useRef<SVGGElement>(null);
    const [showBubble, setShowBubble] = useState(false);
    const [currentPhrase, setCurrentPhrase] = useState('');

    const handleClick = () => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentPhrase(randomPhrase);
        setShowBubble(true);

        // Bounce animation on click
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                scale: 1.1,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: "power2.out"
            });
        }

        // Hide bubble after 3 seconds
        setTimeout(() => {
            setShowBubble(false);
        }, 3000);
    };

    const handleMouseEnter = () => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentPhrase(randomPhrase);
        setShowBubble(true);
    };

    const handleMouseLeave = () => {
        setShowBubble(false);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Idle floating animation
        gsap.to(container, {
            y: -3,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        const handleMouseMove = (e: MouseEvent) => {
            if (!eyesRef.current || !container) return;

            const rekt = container.getBoundingClientRect();
            const centerX = rekt.left + rekt.width / 2;
            const centerY = rekt.top + rekt.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            // === EYES TRACKING ===
            const eyeLimit = 3;
            const eyeX = Math.max(-eyeLimit, Math.min(eyeLimit, deltaX / 30));
            const eyeY = Math.max(-eyeLimit, Math.min(eyeLimit, deltaY / 30));

            gsap.to('.cursor-cat-pupil', {
                x: eyeX,
                y: eyeY,
                duration: 0.2,
                ease: "power2.out"
            });

            // === PHYSICS-BASED TILT ===
            const tiltLimit = 8;
            const tiltX = Math.max(-tiltLimit, Math.min(tiltLimit, deltaX / 40));
            const tiltY = Math.max(-tiltLimit, Math.min(tiltLimit, deltaY / 60));

            gsap.to(container, {
                rotationY: tiltX,
                rotationX: -tiltY * 0.5,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)",
                overwrite: 'auto'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute -top-14 -right-6 z-20">
            {/* Speech Bubble */}
            <div
                className={`absolute bottom-24 -left-36 w-56 bg-white dark:bg-stone-800 text-foreground text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg border border-stone-200 dark:border-white/10 transition-all duration-300 ${showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
            >
                {currentPhrase}
                {/* Bubble tail pointing to cat */}
                <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white dark:border-t-stone-800"></div>
            </div>

            {/* Cat Container */}
            <div
                ref={containerRef}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-20 h-20 cursor-pointer hover:scale-105 transition-transform"
                style={{ transformStyle: 'preserve-3d', perspective: '200px' }}
            >
                <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-lg">

                    {/* ===== MUG ===== */}
                    <g>
                        <path
                            d="M62 48 C70 48 72 58 62 58"
                            fill="none"
                            stroke="#D97706"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                        <rect x="18" y="40" width="46" height="32" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
                        <ellipse cx="41" cy="42" rx="20" ry="4" fill="#78350F" />
                        <line x1="24" y1="64" x2="58" y2="64" stroke="#D97706" strokeWidth="1.5" opacity="0.4" />
                    </g>

                    {/* ===== CAT ===== */}
                    <g>
                        <ellipse cx="41" cy="50" rx="14" ry="10" fill="#4B3F35" />
                        <ellipse cx="41" cy="28" rx="16" ry="14" fill="#4B3F35" />
                        <path d="M28 22 L22 6 L36 18 Z" fill="#4B3F35" />
                        <path d="M54 22 L60 6 L46 18 Z" fill="#4B3F35" />
                        <path d="M29 20 L25 10 L34 17 Z" fill="#FECACA" />
                        <path d="M53 20 L57 10 L48 17 Z" fill="#FECACA" />

                        <g ref={eyesRef}>
                            <ellipse cx="34" cy="27" rx="5" ry="5.5" fill="white" />
                            <ellipse cx="48" cy="27" rx="5" ry="5.5" fill="white" />
                            <ellipse cx="35" cy="27" rx="2.5" ry="3" fill="#1C1917" className="cursor-cat-pupil" />
                            <ellipse cx="49" cy="27" rx="2.5" ry="3" fill="#1C1917" className="cursor-cat-pupil" />
                            <circle cx="36" cy="25.5" r="1.2" fill="white" className="cursor-cat-pupil" />
                            <circle cx="50" cy="25.5" r="1.2" fill="white" className="cursor-cat-pupil" />
                        </g>

                        <ellipse cx="41" cy="33" rx="2" ry="1.5" fill="#FECACA" />
                        <path d="M41 34 L41 36 M38 37 Q41 39 44 37" stroke="#FECACA" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                        <g stroke="#A8A29E" strokeWidth="0.8" strokeLinecap="round">
                            <line x1="26" y1="30" x2="18" y2="28" />
                            <line x1="26" y1="33" x2="18" y2="34" />
                            <line x1="56" y1="30" x2="64" y2="28" />
                            <line x1="56" y1="33" x2="64" y2="34" />
                        </g>

                        <ellipse cx="30" cy="42" rx="5" ry="4" fill="#4B3F35" />
                        <ellipse cx="52" cy="42" rx="5" ry="4" fill="#4B3F35" />
                        <ellipse cx="30" cy="43" rx="2" ry="1.5" fill="#FECACA" opacity="0.6" />
                        <ellipse cx="52" cy="43" rx="2" ry="1.5" fill="#FECACA" opacity="0.6" />
                    </g>

                    {/* ===== STEAM ===== */}
                    <g opacity="0.5">
                        <path d="M35 10 Q38 5 35 0" stroke="#A8A29E" strokeWidth="1.5" strokeLinecap="round" fill="none">
                            <animate attributeName="d" values="M35 10 Q38 5 35 0;M35 10 Q32 5 35 0;M35 10 Q38 5 35 0" dur="2s" repeatCount="indefinite" />
                        </path>
                        <path d="M47 8 Q50 3 47 -2" stroke="#A8A29E" strokeWidth="1.5" strokeLinecap="round" fill="none">
                            <animate attributeName="d" values="M47 8 Q50 3 47 -2;M47 8 Q44 3 47 -2;M47 8 Q50 3 47 -2" dur="2.5s" repeatCount="indefinite" />
                        </path>
                    </g>

                </svg>
            </div>
        </div>
    );
}
