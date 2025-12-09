'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export default function TextReveal({ children, className, delay = 0, duration = 0.8 }: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const words = containerRef.current?.querySelectorAll('.word');
        if (!words) return;

        gsap.fromTo(words,
            { y: '100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                duration: duration,
                stagger: 0.02,
                ease: 'power3.out',
                delay: delay,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, [delay, duration]);

    // Split text into words
    const words = children.split(' ');

    return (
        <div ref={containerRef} className={clsx("leading-tight", className)}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0">
                    <span className="word inline-block transform translate-y-full opacity-0">
                        {word}
                    </span>
                </span>
            ))}
        </div>
    );
}
