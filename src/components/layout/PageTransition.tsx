'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const maskRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const mask = maskRef.current;
        if (!mask) return;

        const tl = gsap.timeline({
            onComplete: () => {
                ScrollTrigger.refresh();
            }
        });

        tl.fromTo(mask,
            { scaleY: 1, transformOrigin: 'bottom' },
            {
                scaleY: 0,
                duration: 0.8,
                ease: 'power3.inOut',
                delay: 0.1
            }
        );

    }, [pathname]);

    return (
        <>
            <div
                ref={maskRef}
                className="fixed inset-0 z-[100] bg-foreground pointer-events-none origin-bottom"
            />
            {children}
        </>
    );
}
