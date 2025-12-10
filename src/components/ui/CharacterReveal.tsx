'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface CharacterRevealProps {
    children: string;
    className?: string;
    delay?: number;
    stagger?: number;
}

export default function CharacterReveal({ children, className, delay = 0, stagger = 0.03 }: CharacterRevealProps) {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const target = textRef.current;
        if (!target) return;

        // Split text using SplitType for robust character splitting (handles kerning/ligatures better than manual split)
        // Since we didn't install split-type, we will implement a manual resilient split or check if I can install it.
        // The prompt says "create new component", I will use manual splitting to avoid new dependency issues or install it if I could.
        // Let's stick to a robust manual split for now to be safe without npm installs.

        const chars = target.querySelectorAll('.char');

        gsap.fromTo(chars,
            {
                y: '110%',
                opacity: 0,
                rotateZ: 5 // sLight rotation for "Split Reveal" feel
            },
            {
                y: '0%',
                opacity: 1,
                rotateZ: 0,
                duration: 1,
                ease: 'power4.out',
                stagger: stagger,
                delay: delay,
                scrollTrigger: {
                    trigger: target,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    }, [delay, stagger]);

    // Manual character splitting
    const characters = children.split('');

    return (
        <div
            ref={textRef}
            className={clsx("overflow-hidden leading-tight inline-block", className)}
            aria-label={children} // Accessibility
        >
            {characters.map((char, index) => (
                <span key={index} className="inline-block overflow-hidden align-top">
                    {/* Handle spaces */}
                    {char === ' ' ? (
                        <span className="inline-block w-[0.2em]">&nbsp;</span>
                    ) : (
                        <span className="char inline-block transform origin-bottom-left will-change-transform">
                            {char}
                        </span>
                    )}
                </span>
            ))}
        </div>
    );
}
