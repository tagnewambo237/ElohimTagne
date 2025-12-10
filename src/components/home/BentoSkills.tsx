'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Layout, Smartphone, Globe, Cloud, Layers, Cpu, Server, Terminal, Figma, Github } from 'lucide-react';
import AvailabilityStatus from '../ui/AvailabilityStatus';

gsap.registerPlugin(ScrollTrigger);

const skillData = [
    { title: "Frontend", icon: Layout, desc: "React, Next.js, Tailwind", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" },
    { title: "Backend", icon: Server, desc: "Node.js, Express, NestJS", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" },
    { title: "Mobile", icon: Smartphone, desc: "Flutter, React Native, Ionic", color: "bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400" },
    { title: "Design", icon: Figma, desc: "Figma, Adobe XD, UI/UX", color: "bg-violet-100 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400" },
    { title: "Database", icon: Database, desc: "MySQL, MongoDB, PostgreSQL", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" },
    { title: "DevOps", icon: Cloud, desc: "Docker, AWS, CI/CD", color: "bg-sky-100 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400" },
    { title: "Tools", icon: Terminal, desc: "Git, VS Code, Postman", color: "bg-stone-100 text-stone-600 dark:bg-stone-900/20 dark:text-stone-400" },
    { title: "CMS/ERP", icon: Layers, desc: "Odoo, WordPress", color: "bg-teal-100 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400" },
];

export default function BentoSkills() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const items = gsap.utils.toArray('.bento-item');

        gsap.fromTo(items,
            { y: 100, opacity: 0, scale: 0.8 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 bg-background relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center md:text-left">
                    <span className="text-sm font-mono uppercase tracking-widest opacity-60">Expertise</span>
                    <h2 className="text-4xl md:text-6xl font-semibold mt-4 tracking-tight">
                        Arsenal <span className="text-accent italic">Digital.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {/* Large Card - Intro or main skill */}
                    <div className="bento-item col-span-2 row-span-2 rounded-3xl p-8 bg-[var(--card-bg)] border border-[var(--card-border)] relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                        {/* Subtle animated background grid */}
                        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
                            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        />

                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:rotate-12 transform origin-top-right">
                            <Code2 size={120} />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-end">
                            <h3 className="text-3xl font-medium mb-2">Développement Fullstack</h3>
                            <p className="opacity-60 text-lg">
                                Création d'applications scalables, du frontend pixel-perfect au backend robuste.
                            </p>
                        </div>
                    </div>

                    {/* Small Cards */}
                    {skillData.map((skill, i) => (
                        <div
                            key={i}
                            className="bento-item col-span-1 rounded-3xl p-6 bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between aspect-square relative"
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${skill.color} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
                                <skill.icon size={24} />
                            </div>
                            <div>
                                <h4 className="font-medium text-lg leading-tight mb-1 group-hover:text-accent transition-colors">{skill.title}</h4>
                                <p className="text-xs opacity-50 font-mono leading-tight">{skill.desc}</p>
                            </div>
                        </div>
                    ))}

                    {/* Wide Card */}
                    <div className="bento-item col-span-2 rounded-3xl p-8 bg-foreground text-background relative overflow-hidden flex items-center justify-between group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-medium mb-1">Activité Github</h3>
                            <p className="opacity-60">Contributeur Open Source</p>
                        </div>
                        <div className="relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                            <Github size={48} className="opacity-80" />
                        </div>
                        {/* Decorative Background */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    </div>

                    {/* Availability/Locations Card */}
                    <div className="bento-item col-span-2 rounded-3xl p-6 bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex items-center justify-center">
                        <AvailabilityStatus />
                    </div>

                </div>
            </div>
        </section>
    );
}
