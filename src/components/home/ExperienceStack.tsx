'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceStack() {
    const listRef = useRef<HTMLUListElement>(null);
    const { t, language } = useLanguage();

    const experienceDataFr = [
        { period: "2024 - Présent", role: "UX/UI Designer & Backend Dev", company: "M4M Overalls", desc: "Conception d'architectures backend et design d'interfaces utilisateur centrées sur l'humain." },
        { period: "2024 - Présent", role: "Intégrateur Odoo", company: "MSL-iTECH", desc: "Développement de modules personnalisés et stratégies d'intégration ERP." },
        { period: "2024", role: "Développeur Fullstack", company: "Azieleh", desc: "Optimisation de l'expérience utilisateur et des performances de NBIKOPAY." },
        { period: "2024", role: "UX/UI Designer", company: "ONA CONSULTING", desc: "Prototypage de solutions mobiles pour le Port Autonome d'Abidjan." },
        { period: "2022 - 2024", role: "Designer Freelance", company: "AfroGeek Academy", desc: "Mentorat et conception de produits numériques." },
    ];

    const experienceDataEn = [
        { period: "2024 - Present", role: "UX/UI Designer & Backend Dev", company: "M4M Overalls", desc: "Designing backend architectures and human-centric user interfaces." },
        { period: "2024 - Present", role: "Odoo Integrator", company: "MSL-iTECH", desc: "Custom module development and ERP integration strategies." },
        { period: "2024", role: "Fullstack Developer", company: "Azieleh", desc: "Optimizing user experience and performance for NBIKOPAY." },
        { period: "2024", role: "UX/UI Designer", company: "ONA CONSULTING", desc: "Prototyping mobile solutions for the Autonomous Port of Abidjan." },
        { period: "2022 - 2024", role: "Freelance Designer", company: "AfroGeek Academy", desc: "Mentoring and designing digital products." },
    ];

    const experienceData = language === 'fr' ? experienceDataFr : experienceDataEn;

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
    }, [language]);

    return (
        <section id="experience" className="py-32 px-6 md:px-12 bg-background relative z-10">
            <div className="max-w-3xl mx-auto">
                <div className="mb-20">
                    <span className="text-sm font-mono uppercase tracking-widest opacity-60">{t.experience.label}</span>
                    <h2 className="text-4xl md:text-6xl font-semibold mt-4 tracking-tight">{t.experience.title}</h2>
                </div>

                <ul ref={listRef} className="space-y-4 md:space-y-0 relative">
                    {experienceData.map((exp, i) => (
                        <li key={i} className="exp-card group relative pl-8 md:pl-0 border-l-2 md:border-l-0 border-gray-200 dark:border-white/10 md:border-none pb-12 md:pb-0 last:pb-0">

                            {/* Timeline dot for mobile */}
                            <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-accent md:hidden border border-background"></div>

                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between md:py-8 md:border-t md:border-gray-200 md:dark:border-white/10 group-hover:bg-gray-50/50 dark:group-hover:bg-white/5 transition-colors md:px-6 rounded-2xl">
                                <span className="text-sm font-mono text-gray-500 w-32 shrink-0 mb-2 md:mb-0">{exp.period}</span>

                                <div className="flex-1 md:px-8">
                                    <h3 className="text-xl md:text-2xl font-medium">{exp.role}</h3>
                                    <p className="text-accent text-sm mb-2">{exp.company}</p>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                                        {exp.desc}
                                    </p>
                                </div>

                                <div className="hidden md:block w-8 opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                                    ↗
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
