'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Code, Coffee, Moon, Music } from 'lucide-react';
import gsap from 'gsap';

const moods = [
    { icon: Code, text: "Coding", color: "text-blue-400" },
    { icon: Coffee, text: "Caffeinating", color: "text-amber-600" },
    { icon: Music, text: "Vibing", color: "text-purple-400" },
    { icon: Moon, text: "Dreaming", color: "text-indigo-400" },
    { icon: Sparkles, text: "Creating", color: "text-yellow-400" },
];

export default function MoodBadge() {
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextMood = () => {
        setIndex((prev) => (prev + 1) % moods.length);
    };

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(nextMood, 3000);
        return () => clearInterval(interval);
    }, [isHovered]);

    const CurrentIcon = moods[index].icon;

    return (
        <button
            onClick={nextMood}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 group z-20 cursor-pointer"
        >
            <div className={`p-1 rounded-full bg-gray-100 dark:bg-black/40 ${moods[index].color}`}>
                <CurrentIcon size={12} className="animate-pulse" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 w-0 overflow-hidden group-hover:w-auto group-hover:opacity-100 opacity-0 transition-all duration-500 whitespace-nowrap">
                {moods[index].text}
            </span>
            {/* Always visible dot for 'online' feel if text is hidden, but here we reveal text on hover */}
            <span className="w-2 h-2 rounded-full bg-green-500 block md:hidden"></span>
        </button>
    );
}
