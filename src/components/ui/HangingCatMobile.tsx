'use client';

import { useState, useEffect } from 'react';
import { Cat } from 'lucide-react';
import clsx from 'clsx';

export default function HangingCatMobile() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Apparition aléatoire plus fréquente
        const interval = setInterval(() => {
            if (Math.random() > 0.6) { // 40% de chance toutes les 10s
                setIsVisible(true);
                setTimeout(() => setIsVisible(false), 4000); // Reste 4s
            }
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={clsx(
                "md:hidden absolute left-full top-1/2 -translate-y-1/2 ml-2 transition-all duration-700 ease-in-out origin-left",
                isVisible ? "opacity-100 rotate-12" : "opacity-0 -rotate-12 scale-50"
            )}
        >
            <div className="relative">
                {/* Corps simplifié pour mobile */}
                <div className="text-foreground">
                    <Cat size={20} className="animate-pulse" />
                </div>

                {/* Petite bulle de dialogue */}
                <div className={clsx(
                    "absolute -right-8 -top-6 bg-accent text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap transition-opacity duration-300 delay-300 shadow-sm",
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}>
                    Meow? 😺
                    <div className="absolute bottom-0 left-0 -mb-1 ml-1 w-2 h-2 bg-accent rotate-45 transform origin-center" />
                </div>
            </div>
        </div>
    );
}
