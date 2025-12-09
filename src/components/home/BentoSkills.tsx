'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Layout, Smartphone, Globe, Cloud, Layers, Cpu, Server, Terminal, Figma, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillData = [
    { title: "Frontend", icon: Layout, desc: "React, Next.js, Tailwind", color: "bg-blue-500/10 text-blue-500" },
    { title: "Backend", icon: Server, desc: "Node.js, Express, NestJS", color: "bg-green-500/10 text-green-500" },
    { title: "Mobile", icon: Smartphone, desc: "Flutter, React Native, Ionic", color: "bg-purple-500/10 text-purple-500" },
    { title: "Design", icon: Figma, desc: "Figma, Adobe XD, UI/UX", color: "bg-pink-500/10 text-pink-500" },
    { title: "Database", icon: Database, desc: "MySQL, MongoDB, PostgreSQL", color: "bg-yellow-500/10 text-yellow-500" },
    { title: "DevOps", icon: Cloud, desc: "Docker, AWS, CI/CD", color: "bg-orange-500/10 text-orange-500" },
    { title: "Tools", icon: Terminal, desc: "Git, VS Code, Postman", color: "bg-gray-500/10 text-gray-500" },
    { title: "CMS/ERP", icon: Layers, desc: "Odoo, WordPress", color: "bg-teal-500/10 text-teal-500" },
];

export default function BentoSkills() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const items = gsap.utils.toArray('.bento-item');

        gsap.fromTo(items,
            { y: 50, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
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
                        Digital <span className="text-accent italic">Arsenal.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {/* Large Card - Intro or main skill */}
                    <div className="bento-item col-span-2 row-span-2 rounded-3xl p-8 bg-[var(--card-bg)] border border-[var(--card-border)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Code2 size={120} />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-end">
                            <h3 className="text-3xl font-medium mb-2">Fullstack Development</h3>
                            <p className="opacity-60 text-lg">
                                Building scalable applications from pixel-perfect frontends to robust backends.
                            </p>
                        </div>
                    </div>

                    {/* Small Cards */}
                    {skillData.map((skill, i) => (
                        <div
                            key={i}
                            className="bento-item col-span-1 rounded-3xl p-6 bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-accent/30 transition-colors group flex flex-col justify-between aspect-square"
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${skill.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <skill.icon size={24} />
                            </div>
                            <div>
                                <h4 className="font-medium text-lg leading-tight mb-1">{skill.title}</h4>
                                <p className="text-xs opacity-50 font-mono leading-tight">{skill.desc}</p>
                            </div>
                        </div>
                    ))}

                    {/* Wide Card */}
                    <div className="bento-item col-span-2 rounded-3xl p-8 bg-foreground text-background relative overflow-hidden flex items-center justify-between group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-medium mb-1">Github Activity</h3>
                            <p className="opacity-60">Open Source Contributor</p>
                        </div>
                        <div className="relative z-10">
                            <Github size={48} className="opacity-80" />
                        </div>
                        {/* Decorative Background */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
