'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MessageCircle } from 'lucide-react';

export default function CatFloatingButton() {
    const catRef = useRef<HTMLDivElement>(null);
    const pulseRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Floating Y-axis animation
        gsap.to(catRef.current, {
            y: -8,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        // Intermittent Pulse Animation
        gsap.fromTo(pulseRef.current,
            { scale: 1, opacity: 0.4 },
            {
                scale: 1.6,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                repeat: -1,
                repeatDelay: 4 // Pulse every 4 seconds
            }
        );
    }, []);

    const whatsappUrl = "https://wa.me/237694656790";

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative flex items-center justify-center">

                {/* Intermittent Pulse Ring */}
                <div ref={pulseRef} className="absolute inset-0 rounded-full bg-foreground opacity-0" />

                {/* Speech Bubble */}
                <div className={`absolute -top-14 right-0 bg-background text-foreground border border-foreground/10 px-4 py-2 rounded-2xl rounded-br-none shadow-xl transform transition-all duration-300 origin-bottom-right whitespace-nowrap ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <p className="text-sm font-medium flex items-center gap-2">
                        WhatsApp Me!
                    </p>
                </div>

                {/* Cat Container - Adaptive Black/White */}
                <div ref={catRef} className="w-16 h-16 bg-foreground text-background border-2 border-background/20 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">

                    {/* Cute Cat SVG */}
                    <svg viewBox="0 0 100 100" className="w-10 h-10 fill-background absolute bottom-0 translate-y-1">
                        <path d="M50 30 C30 30 15 45 15 65 C15 85 30 95 50 95 C70 95 85 85 85 65 C85 45 70 30 50 30 Z" />
                        <path d="M25 40 L15 15 L45 35 Z" />
                        <path d="M75 40 L85 15 L55 35 Z" />

                        {/* Eyes - Reverse color (Foreground) to show up on the cat (Background color) */}
                        <circle cx="35" cy="55" r="5" className="fill-foreground" />
                        <circle cx="65" cy="55" r="5" className="fill-foreground" />

                        {/* Nose */}
                        <polygon points="45,68 55,68 50,75" fill="pink" />
                    </svg>

                    {/* Notification Icon */}
                    <div className="absolute top-0 right-0 bg-red-500 p-1 rounded-full border border-background">
                        <MessageCircle size={10} className="text-white" />
                    </div>
                </div>
            </div>
        </a>
    );
}
