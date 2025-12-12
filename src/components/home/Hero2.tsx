'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

const floaters = [
    {
        id: 1,
        title: "Frontend Architect",
        subtitle: "Next.js & React",
        icon: "✨",
        position: "top-[15%] left-[5%] md:left-[8%]",
        delay: 0,
        speed: 0.5
    },
    {
        id: 2,
        title: "Odoo Expert",
        subtitle: "Business Solutions",
        icon: "💼",
        position: "top-[25%] right-[5%] md:right-[12%]",
        delay: 0.2,
        speed: 0.3
    },
    {
        id: 3,
        title: "UI/UX",
        subtitle: "Pixel Perfect",
        icon: "🎨",
        position: "bottom-[25%] left-[5%] md:left-[12%]",
        delay: 0.4,
        speed: 0.6
    },
    {
        id: 4,
        title: "Mobile Native",
        subtitle: "Flutter & Ionic",
        icon: "📱",
        position: "bottom-[35%] right-[5%] md:right-[10%]",
        delay: 0.1,
        speed: 0.4
    },
];

export default function Hero2() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-black overflow-hidden pt-20"
        >

            {/* Soft Side Fades (Masking) */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-r from-stone-50 via-transparent to-stone-50 dark:from-black dark:via-transparent dark:to-black w-full h-full" />

            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-20 animate-pulse-slow">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
            </div>

            {/* Floating Elements with Parallax */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                {floaters.map((item, i) => (
                    <Floater
                        key={item.id}
                        item={item}
                        // Alternating start positions for variety
                        y={i % 2 === 0 ? y1 : y2}
                    />
                ))}
            </div>

            {/* Central Content */}
            <div className="relative z-30 text-center px-6 max-w-5xl mx-auto flex flex-col items-center gap-8">

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-sm mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-medium tracking-wide uppercase text-stone-600 dark:text-stone-300">
                        Available for freelance & contracts
                    </span>
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-stone-900 dark:text-stone-50 leading-[0.9] md:leading-[0.9]">
                    I build <span className="text-accent/90 italic font-serif">digital</span> <br />
                    <span className="relative inline-block">
                        masterpieces.
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 59.5886 -1.13961 106.883 2.9463C154.177 7.03221 198.001 3.49997 198.001 3.49997" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                    </span>
                </h1>

                <p className="text-xl md:text-2xl font-light text-stone-500 dark:text-stone-400 max-w-2xl leading-relaxed mt-4">
                    Hi, I'm <span className="font-medium text-stone-800 dark:text-stone-200">Elohim Junior</span>.
                    I blend technical precision with artistic vision to create web & mobile apps that stand out.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 mt-8">
                    <Link
                        href="#work"
                        className="group relative px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-black rounded-full text-lg font-medium transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
                    >
                        Explore my work
                        <span className="absolute inset-0 rounded-full border border-white/20 dark:border-black/10" />
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-4 bg-transparent border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 rounded-full text-lg font-medium transition-all hover:bg-stone-100 dark:hover:bg-stone-900 hover:border-stone-400"
                    >
                        Let's talk
                    </Link>
                </div>

                {/* Scrolldown hint */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute -bottom-32 md:-bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 dark:text-stone-500"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </motion.div>
            </div>

        </section>
    );
}

function Floater({ item, y }: { item: any, y: any }) {
    return (
        <motion.div
            style={{ y }}
            className={`absolute ${item.position} hidden md:flex items-center gap-3 p-4 pr-6
                bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl
                border border-stone-200/50 dark:border-stone-800/50
                rounded-2xl shadow-sm hover:shadow-md transition-all duration-500
                group cursor-default
            `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: item.delay }}
        >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">{item.icon}</span>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-stone-800 dark:text-stone-100">{item.title}</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400">{item.subtitle}</span>
            </div>
        </motion.div>
    );
}
