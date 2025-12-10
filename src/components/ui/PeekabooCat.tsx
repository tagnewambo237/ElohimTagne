'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PeekabooCat() {
    const catRef = useRef<HTMLDivElement>(null);
    const eyesRef = useRef<SVGGElement>(null);

    useEffect(() => {
        // Blinking animation
        const blink = gsap.timeline({ repeat: -1, repeatDelay: 3 });
        blink.to('.cat-eye', { scaleY: 0.1, duration: 0.1 })
            .to('.cat-eye', { scaleY: 1, duration: 0.1 });

        // Subtle independent motion
        gsap.to(catRef.current, {
            y: 2,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }, []);

    // Eye tracking logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!eyesRef.current) return;
            const rekt = eyesRef.current.getBoundingClientRect();
            const anchorX = rekt.left + rekt.width / 2;
            const anchorY = rekt.top + rekt.height / 2;
            const angleDeg = (Math.atan2(e.clientY - anchorY, e.clientX - anchorX) * 180) / Math.PI;

            // Limit movement
            const x = (e.clientX - anchorX) / 20;
            const y = (e.clientY - anchorY) / 20;

            gsap.to('.cat-pupil', {
                x: Math.max(-3, Math.min(3, x)),
                y: Math.max(-2, Math.min(2, y)),
                duration: 0.2
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={catRef}
            className="absolute -top-12 -right-4 w-24 h-24 z-20 pointer-events-none transform rotate-12 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110"
        >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                {/* Paws holding the frame */}
                <path d="M20 95 Q30 85 40 95" stroke="white" strokeWidth="8" strokeLinecap="round" />
                <path d="M60 95 Q70 85 80 95" stroke="white" strokeWidth="8" strokeLinecap="round" />

                {/* Head */}
                <path d="M50 35 C30 35 15 50 15 70 C15 90 30 95 50 95 C70 95 85 90 85 70 C85 50 70 35 50 35 Z" fill="#333" />

                {/* Ears */}
                <path d="M25 45 L15 20 L45 40 Z" fill="#333" />
                <path d="M75 45 L85 20 L55 40 Z" fill="#333" />
                <path d="M25 42 L18 25 L40 38 Z" fill="#pink" className="text-pink-300 fill-current opacity-60" />
                <path d="M75 42 L82 25 L60 38 Z" fill="#pink" className="text-pink-300 fill-current opacity-60" />

                {/* Face Container for Eyes */}
                <g ref={eyesRef}>
                    {/* Left Eye */}
                    <circle cx="35" cy="60" r="8" fill="white" className="cat-eye" />
                    <circle cx="35" cy="60" r="3" fill="black" className="cat-pupil" />

                    {/* Right Eye */}
                    <circle cx="65" cy="60" r="8" fill="white" className="cat-eye" />
                    <circle cx="65" cy="60" r="3" fill="black" className="cat-pupil" />
                </g>

                {/* Nose & Mouth */}
                <polygon points="45,72 55,72 50,78" fill="pink" />
                <path d="M40 82 Q50 85 60 82" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />

                {/* Whiskers */}
                <line x1="20" y1="70" x2="5" y2="65" stroke="white" strokeWidth="1.5" opacity="0.6" />
                <line x1="20" y1="75" x2="5" y2="80" stroke="white" strokeWidth="1.5" opacity="0.6" />
                <line x1="80" y1="70" x2="95" y2="65" stroke="white" strokeWidth="1.5" opacity="0.6" />
                <line x1="80" y1="75" x2="95" y2="80" stroke="white" strokeWidth="1.5" opacity="0.6" />
            </svg>

            {/* Thought Bubble on Hover */}
            <div className="absolute -top-8 -left-12 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
                He's busy coding! 🐟
            </div>
        </div>
    );
}
