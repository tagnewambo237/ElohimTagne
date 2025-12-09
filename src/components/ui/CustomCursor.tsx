'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;

        if (!dot || !outline) return;

        gsap.set(dot, { xPercent: -50, yPercent: -50 });
        gsap.set(outline, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            // Immediate move for dot
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            // Laggy move for outline
            gsap.to(outline, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power2.out'
            });
        };

        // Add hover states for interactive elements
        const handleMouseEnter = () => {
            gsap.to(outline, {
                scale: 1.5,
                backgroundColor: 'rgba(134, 134, 139, 0.1)',
                duration: 0.3
            });
        };

        const handleMouseLeave = () => {
            gsap.to(outline, {
                scale: 1,
                backgroundColor: 'transparent',
                duration: 0.3
            });
        };

        window.addEventListener('mousemove', moveCursor);

        // Select all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .interactive');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // MutationObserver to attach listeners to new elements (simplified for now)

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot fixed pointer-events-none z-[9999] hidden md:block" />
            <div ref={outlineRef} className="cursor-outline fixed pointer-events-none z-[9999] hidden md:block" />
        </>
    );
}
