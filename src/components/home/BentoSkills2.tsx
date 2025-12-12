'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import AvailabilityStatus from '../ui/AvailabilityStatus';

gsap.registerPlugin(ScrollTrigger);

export default function BentoSkills2() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.bento-card');

            gsap.fromTo(cards,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Card style classes for consistency
    const cardLight = "bg-white border-stone-200/60";
    const cardDark = "dark:bg-stone-900 dark:border-stone-700";
    const textTitleLight = "text-stone-800";
    const textTitleDark = "dark:text-stone-100";
    const textDescLight = "text-stone-500";
    const textDescDark = "dark:text-stone-400";

    return (
        <section ref={containerRef} className="py-24 px-6 md:px-12 bg-stone-100 dark:bg-black relative z-10 w-full overflow-hidden">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-16 text-center">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 dark:text-stone-500">Ce que je fais</span>
                    <h2 className="text-4xl md:text-5xl font-serif italic mt-3 tracking-tight text-stone-800 dark:text-stone-100">
                        Mon expertise
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-12 gap-4 md:gap-5">

                    {/* Card 1: Large - Full Stack (Left) */}
                    <div className={`bento-card col-span-12 md:col-span-5 row-span-2 ${cardLight} ${cardDark} rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group border shadow-sm transition-colors hover:border-amber-200/50 dark:hover:border-amber-800/30 min-h-[400px]`}>
                        
                        {/* Illustration: The Abstract Stack */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-90 pointer-events-none">
                            <div className="relative w-64 h-64">
                                {/* Base Glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/50 to-transparent dark:from-amber-900/20 rounded-full blur-3xl" />
                                
                                {/* Floating Stack Layers */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-24">
                                    {/* Bottom Layer (Database/Infra) */}
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-700 dark:to-stone-800 border border-stone-200 dark:border-stone-600 rounded-xl transform rotate-[-6deg] translate-y-4 group-hover:translate-y-6 transition-transform duration-700 ease-out shadow-lg" />
                                    
                                    {/* Middle Layer (Logic/Server) */}
                                    <div className="absolute inset-x-2 bottom-4 h-16 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-500 rounded-xl transform rotate-[2deg] group-hover:rotate-[4deg] transition-transform duration-700 ease-out shadow-xl z-10 flex items-center justify-center">
                                        <div className="w-8 h-1 bg-stone-200 dark:bg-stone-500 rounded-full" />
                                    </div>
                                    
                                    {/* Top Layer (Client/UI) */}
                                    <div className="absolute inset-x-[-10px] bottom-10 h-16 bg-gradient-to-br from-amber-50 to-white dark:from-stone-600 dark:to-stone-700 border border-amber-100 dark:border-stone-500 rounded-xl transform rotate-[-3deg] -translate-y-2 group-hover:-translate-y-4 transition-transform duration-700 ease-out shadow-2xl z-20 overflow-hidden">
                                         <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-amber-400" />
                                         <div className="absolute top-3 left-8 w-12 h-2 rounded-full bg-stone-100 dark:bg-stone-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mt-[220px] relative z-30">
                            <h3 className={`text-2xl font-serif italic ${textTitleLight} ${textTitleDark} mb-2`}>Full Stack</h3>
                            <p className={`${textDescLight} ${textDescDark} text-sm leading-relaxed max-w-[90%]`}>
                                Node.js, React, Next.js — des architectures robustes pour des applications web performantes.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Top Right - UI/UX */}
                    <div className={`bento-card col-span-12 md:col-span-7 ${cardLight} ${cardDark} rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group border shadow-sm`}>
                        {/* Illustration: Geometric Bauhaus/Fluidity */}
                        <div className="w-32 h-32 relative flex-shrink-0 flex items-center justify-center">
                            {/* Circle */}
                            <div className="absolute w-20 h-20 rounded-full border border-stone-300 dark:border-stone-500 group-hover:scale-110 transition-transform duration-700" />
                            {/* Square glass */}
                            <div className="absolute w-16 h-16 bg-gradient-to-br from-violet-100/50 to-purple-100/50 dark:from-violet-800/30 dark:to-purple-800/30 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-2xl rotate-12 translate-x-4 group-hover:rotate-45 transition-transform duration-700" />
                            {/* Accent Dot */}
                            <div className="absolute w-4 h-4 bg-stone-800 dark:bg-stone-200 rounded-full -translate-x-6 -translate-y-4 shadow-lg group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className={`text-xl font-serif italic ${textTitleLight} ${textTitleDark} mb-1`}>UI / UX Design</h3>
                            <p className={`${textDescLight} ${textDescDark} text-sm leading-relaxed`}>
                                Des interfaces élégantes et intuitives, conçues avec Figma pour une expérience utilisateur fluide.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Middle Right - Mobile */}
                    <div className={`bento-card col-span-6 md:col-span-4 ${cardLight} ${cardDark} rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group border shadow-sm min-h-[200px]`}>
                        
                        {/* Illustration: Minimalist Device */}
                        <div className="absolute -right-4 top-4 opacity-100">
                             <div className="relative w-24 h-40 bg-stone-100 dark:bg-stone-700 rounded-[1.5rem] border-4 border-stone-200 dark:border-stone-600 shadow-lg transform rotate-[-10deg] translate-x-2 group-hover:rotate-0 group-hover:translate-x-0 transition-all duration-500 ease-out">
                                {/* Screen content */}
                                <div className="absolute inset-1 bg-white dark:bg-stone-800 rounded-[1.2rem] overflow-hidden">
                                    <div className="w-full h-24 bg-gradient-to-b from-rose-50 to-transparent dark:from-rose-900/30" />
                                    {/* Floating UI Elements */}
                                    <div className="absolute top-6 left-3 right-3 h-2 bg-stone-100 dark:bg-stone-700 rounded-full" />
                                    <div className="absolute top-10 left-3 w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800/50" />
                                    <div className="absolute top-12 left-14 right-3 h-2 bg-stone-100 dark:bg-stone-700 rounded-full" />
                                </div>
                             </div>
                        </div>

                        <div className="relative z-10 mt-28">
                            <h3 className={`text-lg font-serif italic ${textTitleLight} ${textTitleDark} mb-1`}>Mobile</h3>
                            <p className={`${textDescLight} ${textDescDark} text-xs`}>Flutter & Ionic</p>
                        </div>
                    </div>

                    {/* Card 4: Bottom Right Small - Odoo */}
                    <div className="bento-card col-span-6 md:col-span-3 bg-amber-50 dark:bg-amber-950 rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group border border-amber-100 dark:border-amber-800 shadow-sm min-h-[200px]">
                        {/* Illustration: The "Business Block" */}
                        <div className="w-12 h-12 relative">
                             <div className="absolute inset-0 bg-amber-400/20 dark:bg-amber-500/30 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                             <div className="absolute inset-0 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-700 rounded-xl flex items-center justify-center shadow-sm">
                                <span className="font-serif italic font-bold text-amber-600 dark:text-amber-400 text-xl">O</span>
                             </div>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-serif italic text-stone-800 dark:text-amber-50 mb-1">Odoo Expert</h3>
                            <p className="text-stone-600 dark:text-amber-200/70 text-xs">ERP & Business</p>
                        </div>
                    </div>

                    {/* Card 5: Wide Bottom - Database & Tools */}
                    <div className="bento-card col-span-12 md:col-span-7 bg-stone-800 dark:bg-stone-950 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group border border-stone-700 shadow-sm">
                         {/* Subtle Grid Background */}
                         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#555 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-serif italic text-stone-100 mb-1">Backend & Données</h3>
                            <p className="text-stone-400 text-sm leading-relaxed">
                                MySQL, MongoDB, PostgreSQL — des bases solides.
                            </p>
                        </div>
                        
                        {/* Illustration: Data Stream / Cylinders */}
                        <div className="flex gap-4 relative z-10">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="relative group/db">
                                    <div className={`w-12 h-16 rounded-xl border border-stone-600 bg-stone-700 flex flex-col items-center justify-evenly transition-transform duration-500 ${i === 2 ? '-translate-y-3' : ''} group-hover:translate-y-0`}>
                                        <div className={`w-8 h-1.5 rounded-full ${i === 1 ? 'bg-emerald-400' : i === 2 ? 'bg-sky-400' : 'bg-purple-400'}`} />
                                        <div className="w-8 h-1 rounded-full bg-stone-600" />
                                        <div className="w-8 h-1 rounded-full bg-stone-600" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card 6: Small Bottom Right - Availability */}
                    <div className={`bento-card col-span-12 md:col-span-5 ${cardLight} ${cardDark} rounded-[2rem] p-8 flex items-center justify-center gap-6 relative overflow-hidden group border shadow-sm`}>
                        <AvailabilityStatus />
                    </div>

                </div>
            </div>
        </section>
    );
}