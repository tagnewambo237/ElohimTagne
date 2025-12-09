'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
    { period: "2024 - Present", role: "UX/UI Designer & Backend Dev", company: "M4M Overalls", desc: "Crafting backend architectures and designing user-centric interfaces." },
    { period: "2024 - Present", role: "Odoo Integrator", company: "MSL-iTECH", desc: "Custom module development and ERP integration strategies." },
    { period: "2024", role: "Fullstack Developer", company: "Azieleh", desc: "Optimizing NBIKOPAY user experience and performance." },
    { period: "2024", role: "UX/UI Designer", company: "ONA CONSULTING", desc: "Prototyping mobile solutions for Port Autonome d'Abidjan." },
    { period: "2022 - 2024", role: "Freelance Designer", company: "AfroGeek Academy", desc: "Mentoring and designing digital products." },
];

export default function ExperienceStack() {
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        // Simple entry animation
        const items = gsap.utils.toArray('.exp-card');

        items.forEach((item: any) => {
            gsap.fromTo(item,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                    }
                }
            );
        });
    }, []);

    return (
        <section id="experience" className="py-32 px-6 md:px-12 bg-background relative z-10">
            <div className="max-w-3xl mx-auto">
                <div className="mb-20">
                    <span className="text-sm font-mono uppercase tracking-widest opacity-60">Journey</span>
                    <h2 className="text-4xl md:text-6xl font-semibold mt-4 tracking-tight">Experience.</h2>
                </div>

                <ul ref={listRef} className="space-y-4 md:space-y-0 relative">
                    {experienceData.map((exp, i) => (
                        <li
                            key={i}
                            className="exp-card sticky top-32 bg-[var(--card-bg)] border border-[var(--card-border)] p-8 md:p-12 rounded-3xl shadow-xl shadow-black/5 dark:shadow-white/5 transition-all mb-4 md:mb-12 origin-top"
                            style={{
                                zIndex: i + 1,
                                // Add subtle visual separation logic if needed via CSS or leave as sticky default
                            }}
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <span className="text-sm font-mono opacity-50 py-1 px-3 border border-[var(--card-border)] rounded-full w-max bg-background/50 backdrop-blur-sm">
                                    {exp.period}
                                </span>
                                <div className="md:w-3/4">
                                    <h3 className="text-3xl font-medium mb-2">{exp.role}</h3>
                                    <h4 className="text-lg opacity-60 mb-4">{exp.company}</h4>
                                    <p className="opacity-80 leading-relaxed text-lg font-light">
                                        {exp.desc}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
