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
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
            <button
                onClick={() => setTheme("light")}
                className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                aria-label="Light Mode"
            >
                <Sun size={14} />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-2 rounded-full transition-all ${theme === 'system' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                aria-label="System Mode"
            >
                <Laptop size={14} />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                aria-label="Dark Mode"
            >
                <Moon size={14} />
            </button>
        </div>
    );
}
