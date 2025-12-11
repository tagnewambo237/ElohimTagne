'use client';

import { useTheme } from "@/components/layout/ThemeProvider";
import { Moon, Sun, Laptop } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-8 h-8" />; // Placeholder to avoid hydration mismatch

    return (
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md hover:bg-white/10 transition-colors group">
            <div className="text-foreground/70 mr-2">
                {theme === 'light' && <Sun size={14} />}
                {theme === 'dark' && <Moon size={14} />}
                {theme === 'system' && <Laptop size={14} />}
            </div>
            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                className="appearance-none bg-transparent border-none text-xs font-medium text-foreground outline-none cursor-pointer pr-6 focus:ring-0 py-0.5"
                aria-label="Select Theme"
            >
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
                <option value="system">Auto</option>
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity text-[10px]">
                ▼
            </span>
        </div>
    );
}
