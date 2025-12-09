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

        const onHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for interactive elements or magnetic
            const interactive = target.closest('a, button, input, textarea, .interactive');
            const magnetic = target.closest('[data-magnetic]');

            if (magnetic) {
                gsap.to(outline, {
                    scale: 2.5,
                    backgroundColor: 'transparent',
                    borderWidth: '1px',
                    borderColor: 'var(--accent)',
                    duration: 0.3
                });
                gsap.to(dot, {
                    scale: 0,
                    duration: 0.3
                });
            } else if (interactive) {
                gsap.to(outline, {
                    scale: 1.5,
                    backgroundColor: 'rgba(134, 134, 139, 0.1)',
                    borderColor: 'var(--muted)',
                    borderWidth: '1px',
                    duration: 0.3
                });
                gsap.to(dot, {
                    scale: 1,
                    duration: 0.3
                });
            } else {
                gsap.to(outline, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'var(--muted)',
                    borderWidth: '1px',
                    duration: 0.3
                });
                gsap.to(dot, {
                    scale: 1,
                    duration: 0.3
                });
            }
        };

        // Instead of mouseenter/leave on elements, we use mouseover on window for delegation
        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', onHover);
        // window.addEventListener('mouseout', onHover); // Mouseover bubbles, so it catches entry.

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', onHover);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot fixed pointer-events-none z-[9999] hidden md:block" />
            <div ref={outlineRef} className="cursor-outline fixed pointer-events-none z-[9999] hidden md:block" />
        </>
    );
}
