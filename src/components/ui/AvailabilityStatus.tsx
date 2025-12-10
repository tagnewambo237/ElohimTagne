'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Clock, MapPin } from 'lucide-react';

export default function AvailabilityStatus() {
    const [time, setTime] = useState<Date | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!time) return null;

    // Hardcoded for Yaoundé (GMT+1)
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Douala',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const timeString = formatter.format(time);
    const hour = parseInt(new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Douala',
        hour: 'numeric',
        hour12: false
    }).format(time));

    const isWorkingHours = hour >= 9 && hour < 18;
    const isSleeping = hour >= 0 && hour < 6;

    return (
        <div
            className="w-full h-full flex items-center justify-between gap-6 cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-3 w-3">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isWorkingHours ? 'bg-green-400' : 'bg-orange-400'}`}></span>
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${isWorkingHours ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest opacity-60">
                        {isWorkingHours ? 'Available Now' : (isSleeping ? 'Currently Sleeping' : 'Away / Resting')}
                    </span>
                </div>

                <h3 className="text-3xl font-bold font-mono tracking-tight flex items-center gap-2">
                    {timeString}
                    <span className="text-sm font-normal opacity-40 ml-1">GMT+1</span>
                </h3>

                <div className="flex items-center gap-2 mt-2 opacity-50 text-xs">
                    <MapPin size={12} />
                    <span>Yaoundé, Cameroon</span>
                </div>
            </div>

            {/* Interactive Cute Visual */}
            <div className="relative w-24 h-24 flex items-center justify-center">
                <div className={`transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : 'scale-100'}`}>
                    {isSleeping ? (
                        <div className="text-6xl animate-pulse">
                            😴
                            <span className="absolute -top-2 right-0 text-xl animate-bounce">z</span>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="text-6xl">
                                {isWorkingHours ? '👨🏾‍💻' : '🎮'}
                            </div>
                            {/* Speech Bubble on Hover */}
                            <div className={`absolute -top-10 -right-12 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                {isWorkingHours ? "Let's build!" : "Recharging..."}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
