'use client';

import { Coffee } from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CoffeeAccent() {
    const steamRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Subtle steam animation
        gsap.to(steamRef.current, {
            y: -15,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: "power1.inOut",
            stagger: 0.5
        });
    }, []);

    return (
        <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <div className="relative">
                <Coffee size={20} className="text-[#8B4513] dark:text-[#C4A484]" />
                {/* Steam particles */}
                <div ref={steamRef} className="absolute -top-2 left-1 w-1 h-3 bg-gray-400 rounded-full blur-[1px] opacity-0"></div>
                <div ref={steamRef} className="absolute -top-3 left-3 w-1 h-2 bg-gray-400 rounded-full blur-[1px] opacity-0 delay-300"></div>
            </div>
            <span className="text-sm font-mono tracking-widest uppercase italic text-[#6F4E37] dark:text-[#E0C097]">
                Fueled by Coffee & Code
            </span>
        </div>
    );
}
