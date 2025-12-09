'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setComplete(true)
        });

        // Initial state
        gsap.set(containerRef.current, { opacity: 1 });

        // Animate circle drawing
        if (circleRef.current) {
            const length = circleRef.current.getTotalLength();
            gsap.set(circleRef.current, { strokeDasharray: length, strokeDashoffset: length });

            tl.to(circleRef.current, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.inOut'
            });
        }

        // Expand and fade out
        tl.to(svgRef.current, {
            scale: 1.5,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.in',
            delay: 0.2
        }, "-=0.2");

        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut'
        }, "-=0.6");

    }, []);

    if (complete) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
            <svg ref={svgRef} className="w-32 h-32 md:w-48 md:h-48" viewBox="0 0 100 100">
                <circle
                    ref={circleRef}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-foreground"
                />
                {/* Decorative inner lines representing 'generative' art */}
                <path
                    className="opacity-0 animate-fade-in"
                    d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M78 22 L22 78"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    style={{ animation: 'fadeIn 1s ease-out 0.5s forwards' }}
                />
            </svg>
        </div>
    );
}
