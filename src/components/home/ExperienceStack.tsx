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
        { period: "Depuis Juin 2024", role: "Développeur Fullstack / Intégrateur Odoo", company: "MSL-iTECH, Marrakech", desc: "Intégration d'Odoo ERP et création de modules Odoo." },
        { period: "Sept 2024 - Oct 2024", role: "Développeur Fullstack", company: "Azieleh, Yaoundé", desc: "Optimisation de l'expérience utilisateur de l'application NBIKOPAY." },
        { period: "Depuis Août 2024", role: "UX/UI Designer", company: "ONA CONSULTING, Yaoundé", desc: "Conception de maquettes (Port Autonome d’Abidjan, Destiny Life) axées sur l'UX/UI." },
        { period: "Fév 2024 - Août 2024", role: "Stage Fin d'Études (Microservices)", company: "M4M Overalls, Parc Kyriakides", desc: "Conception architecture Microservices, API Rest, et système d'évaluation multi-tenant." },
        { period: "Mai 2023 - Sept 2023", role: "Développeur Web & SEO", company: "AZIELEH, Yaoundé", desc: "Optimisation SEO et intégration de module Chatbot pour support client." },
        { period: "Sept 2022 - Oct 2024", role: "UX/UI Designer (Freelance)", company: "AfroGeek Academy, Yaoundé", desc: "Conception d'interfaces et d'expériences utilisateur pour divers projets." },
        { period: "Juil 2022 - Sept 2022", role: "UX Designer & Dev Front End", company: "Gohze, Carrefour Biyemassi", desc: "Maquette et développement Vue.js pour application de distribution de livres." },
    ];

    const experienceDataEn = [
        { period: "Since June 2024", role: "Fullstack Dev / Odoo Integrator", company: "MSL-iTECH, Marrakech", desc: "Odoo ERP integration and custom module creation." },
        { period: "Sept 2024 - Oct 2024", role: "Fullstack Developer", company: "Azieleh, Yaounde", desc: "Optimizing user experience for NBIKOPAY application." },
        { period: "Since August 2024", role: "UX/UI Designer", company: "ONA CONSULTING, Yaounde", desc: "Designing app mockups (Abidjan Port, Destiny Life) focused on UX/UI." },
        { period: "Feb 2024 - Aug 2024", role: "Final Year Intern (Microservices)", company: "M4M Overalls, Parc Kyriakides", desc: "Microservices architecture design, REST APIs, and multi-tenant evaluation system." },
        { period: "May 2023 - Sept 2023", role: "Web Developer & SEO", company: "AZIELEH, Yaounde", desc: "SEO optimization and Chatbot integration for customer support." },
        { period: "Sept 2022 - Oct 2024", role: "UX/UI Designer (Freelance)", company: "AfroGeek Academy, Yaounde", desc: "Interface and user experience design for various enterprise projects." },
        { period: "July 2022 - Sept 2022", role: "UX Designer & Front End Dev", company: "Gohze, Carrefour Biyemassi", desc: "Mockups and Vue.js development for book distribution app." },
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
        <section id="experience" className="py-16 px-6 md:px-12 bg-background relative z-10">
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
