'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function HangingCat() {
    const catRef = useRef<HTMLDivElement>(null);
    const tailRef = useRef<SVGPathElement>(null);
    const leftEyeRef = useRef<SVGEllipseElement>(null);
    const rightEyeRef = useRef<SVGEllipseElement>(null);
    const leftPawRef = useRef<SVGGElement>(null);
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

        // Eye Blinking Animation
        const blink = () => {
            if (leftEyeRef.current && rightEyeRef.current) {
                const tl = gsap.timeline({
                    onComplete: () => {
                        // Random delay between blinks (2-4 seconds)
                        gsap.delayedCall(gsap.utils.random(2, 4), blink);
                    }
                });

                tl.to([leftEyeRef.current, rightEyeRef.current], {
                    attr: { ry: 0.5 },
                    duration: 0.1,
                    ease: "power2.in"
                })
                .to([leftEyeRef.current, rightEyeRef.current], {
                    attr: { ry: 5 },
                    duration: 0.1,
                    ease: "power2.out"
                });
            }
        };

        // Start blinking after 1 second
        gsap.delayedCall(1, blink);

        // Paw Wave Animation with body swing (physics!)
        const wave = () => {
            if (leftPawRef.current && catRef.current) {
                const tl = gsap.timeline({
                    onComplete: () => {
                        // Random delay between waves (4-8 seconds)
                        gsap.delayedCall(gsap.utils.random(4, 8), wave);
                    }
                });

                // Le corps se balance à cause du mouvement de la patte (action-réaction)
                // La patte se détache du bouton et bouge de gauche à droite horizontalement

                // La patte se détache légèrement vers le bas
                tl.to(leftPawRef.current, {
                    y: 8,
                    duration: 0.2,
                    ease: "power2.out"
                }, 0)

                // Mouvement vers la gauche
                .to(catRef.current, {
                    rotation: 6,
                    transformOrigin: "center top",
                    duration: 0.3,
                    ease: "power2.out"
                })
                .to(leftPawRef.current, {
                    x: -15,
                    y: 12,
                    duration: 0.3,
                    ease: "power2.out"
                }, "<")

                // Premier mouvement de coucou vers la droite
                .to(catRef.current, {
                    rotation: -6,
                    duration: 0.25,
                    ease: "power2.inOut"
                })
                .to(leftPawRef.current, {
                    x: 15,
                    y: 12,
                    duration: 0.25,
                    ease: "power2.inOut"
                }, "<")

                // Retour vers la gauche
                .to(catRef.current, {
                    rotation: 6,
                    duration: 0.25,
                    ease: "power2.inOut"
                })
                .to(leftPawRef.current, {
                    x: -15,
                    y: 12,
                    duration: 0.25,
                    ease: "power2.inOut"
                }, "<")

                // Vers la droite
                .to(catRef.current, {
                    rotation: -6,
                    duration: 0.25,
                    ease: "power2.inOut"
                })
                .to(leftPawRef.current, {
                    x: 15,
                    y: 12,
                    duration: 0.25,
                    ease: "power2.inOut"
                }, "<")

                // Retour vers la gauche
                .to(catRef.current, {
                    rotation: 6,
                    duration: 0.25,
                    ease: "power2.inOut"
                })
                .to(leftPawRef.current, {
                    x: -15,
                    y: 12,
                    duration: 0.25,
                    ease: "power2.inOut"
                }, "<")

                // Position normale - le chat se stabilise
                .to(catRef.current, {
                    rotation: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                })
                .to(leftPawRef.current, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                }, "<");
            }
        };

        // Start waving after 2 seconds (pour voir plus vite)
        gsap.delayedCall(2, wave);
    }, []);

    useEffect(() => {
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
                    {/* Left Paw - with wave animation */}
                    <g ref={leftPawRef}>
                        <ellipse cx="32" cy="8" rx="8" ry="10" />
                        <ellipse cx="30" cy="12" rx="3" ry="3" fill="currentColor" opacity="0.3" />
                        <ellipse cx="34" cy="12" rx="3" ry="3" fill="currentColor" opacity="0.3" />
                    </g>

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
                    <ellipse ref={leftEyeRef} cx="42" cy="42" rx="4" ry="5" fill="white" className="dark:fill-stone-900" />
                    <ellipse ref={rightEyeRef} cx="58" cy="42" rx="4" ry="5" fill="white" className="dark:fill-stone-900" />

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
