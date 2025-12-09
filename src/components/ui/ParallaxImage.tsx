'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number; // 1 = normal scroll, > 1 = faster (parallax effect), < 1 = slower
}

export default function ParallaxImage({ src, alt, className, speed = 1.2 }: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const img = imgRef.current;

        if (!container || !img) return;

        gsap.fromTo(img,
            {
                yPercent: -10 * speed
            },
            {
                yPercent: 10 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            }
        );
    }, [speed]);

    return (
        <div ref={containerRef} className={clsx("overflow-hidden relative", className)}>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="w-full h-[120%] object-cover absolute top-[-10%] left-0"
            />
        </div>
    );
}
