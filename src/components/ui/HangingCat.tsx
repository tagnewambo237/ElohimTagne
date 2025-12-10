'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function HangingCat() {
    const catRef = useRef<HTMLDivElement>(null);
    const tailRef = useRef<SVGPathElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Idle Tail Animation
        if (tailRef.current) {
            gsap.to(tailRef.current, {
                rotation: 15,
                transformOrigin: "top center",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;

            // If scrolled down and currently visible, jump away
            if (scrollY > 50 && isVisible) {
                setIsVisible(false);
                // Jump up and hide
                gsap.to(catRef.current, {
                    y: -100,
                    opacity: 0,
                    duration: 0.5,
                    ease: "back.in(1.7)"
                });
            }
            // If back at top and hidden, peek back in
            else if (scrollY < 50 && !isVisible) {
                setIsVisible(true);
                // Drop down
                gsap.to(catRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "bounce.out",
                    delay: 0.2
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    return (
        <div
            ref={catRef}
            className="absolute -bottom-16 right-20 w-16 h-20 z-[-1] pointer-events-none hidden md:block"
        >
            <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg">
                {/* Paws holding on top */}
                <g className="fill-stone-800 dark:fill-stone-200">
                    {/* Left Paw */}
                    <ellipse cx="32" cy="8" rx="8" ry="10" />
                    <ellipse cx="30" cy="12" rx="3" ry="3" fill="currentColor" opacity="0.3" />
                    <ellipse cx="34" cy="12" rx="3" ry="3" fill="currentColor" opacity="0.3" />

                    {/* Right Paw */}
                    <ellipse cx="68" cy="8" rx="8" ry="10" />
                    <ellipse cx="66" cy="12" rx="3" ry="3" fill="currentColor" opacity="0.3" />
                    <ellipse cx="70" cy="12" rx="3" ry="3" fill="currentColor" opacity="0.3" />
                </g>

                {/* Main Body */}
                <g className="fill-stone-800 dark:fill-stone-200">
                    {/* Head with ears */}
                    <ellipse cx="50" cy="45" rx="22" ry="20" />

                    {/* Pointed Ears */}
                    <path d="M32 35 L28 20 L38 30 Z" />
                    <path d="M68 35 L72 20 L62 30 Z" />

                    {/* Inner Ear */}
                    <path d="M33 32 L30 24 L37 30 Z" fill="#FCA5A5" opacity="0.4" />
                    <path d="M67 32 L70 24 L63 30 Z" fill="#FCA5A5" opacity="0.4" />

                    {/* Body */}
                    <ellipse cx="50" cy="80" rx="20" ry="28" />

                    {/* Dangling Legs */}
                    <ellipse cx="42" cy="108" rx="5" ry="12" />
                    <ellipse cx="58" cy="108" rx="5" ry="12" />

                    {/* Paw pads on legs */}
                    <ellipse cx="42" cy="115" rx="4" ry="5" fill="currentColor" opacity="0.3" />
                    <ellipse cx="58" cy="115" rx="4" ry="5" fill="currentColor" opacity="0.3" />
                </g>

                {/* Cute Face */}
                <g>
                    {/* Big adorable eyes */}
                    <ellipse cx="42" cy="42" rx="4" ry="5" fill="white" className="dark:fill-stone-900" />
                    <ellipse cx="58" cy="42" rx="4" ry="5" fill="white" className="dark:fill-stone-900" />

                    {/* Eye sparkles */}
                    <circle cx="43" cy="41" r="1.5" fill="white" className="dark:fill-stone-800" />
                    <circle cx="59" cy="41" r="1.5" fill="white" className="dark:fill-stone-800" />

                    {/* Blushing cheeks */}
                    <ellipse cx="32" cy="48" rx="5" ry="4" fill="#FCA5A5" opacity="0.6" />
                    <ellipse cx="68" cy="48" rx="5" ry="4" fill="#FCA5A5" opacity="0.6" />

                    {/* Tiny nose */}
                    <path d="M48 48 L50 50 L52 48 Z" fill="#FCA5A5" />

                    {/* Cute W-shaped mouth */}
                    <path
                        d="M50 50 L48 52 M50 50 L52 52"
                        stroke="white"
                        className="dark:stroke-stone-900"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                    />

                    {/* Whiskers */}
                    <line x1="25" y1="45" x2="35" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                    <line x1="25" y1="48" x2="35" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                    <line x1="75" y1="45" x2="65" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                    <line x1="75" y1="48" x2="65" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                </g>

                {/* Curly Tail */}
                <path
                    ref={tailRef}
                    d="M65 85 Q75 95 72 108 Q70 118 65 120"
                    stroke="currentColor"
                    className="stroke-stone-800 dark:stroke-stone-200"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
        </div>
    );
}
