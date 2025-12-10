'use client';

import { useRef, useEffect, ReactElement, cloneElement } from 'react';
import gsap from 'gsap';

interface MagneticProps {
    children: ReactElement;
    strength?: number; // Attraction strength, default ~0.5
}

export default function Magnetic({ children, strength = 0.5 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            gsap.to(el, {
                x: x * strength,
                y: y * strength,
                duration: 1,
                ease: "power4.out"
            });
        };

        const mouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        };

        el.addEventListener("mousemove", mouseMove);
        el.addEventListener("mouseleave", mouseLeave);

        return () => {
            el.removeEventListener("mousemove", mouseMove);
            el.removeEventListener("mouseleave", mouseLeave);
        };
    }, [strength]);

    return cloneElement(children, { ref, 'data-magnetic': 'true' } as any) ;
}
