'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Data mapping from user provided CV
const experiences = [
    {
        id: 1,
        role: "UX/UI Designer | Backend Developer",
        company: "M4M Overalls, Parc Kyriakidès",
        period: "Depuis octobre 2024",
        description: "Conception et développement de solutions backend et design d'interfaces utilisateur.",
        tags: ["UX/UI", "Backend", "Design"]
    },
    {
        id: 2,
        role: "Intégrateur Odoo (Freelance)",
        company: "MSL-iTECH, Marrakech",
        period: "Depuis septembre 2024",
        description: "Intégration d'Odoo ERP et création de modules personnalisés pour des besoins spécifiques.",
        tags: ["Odoo", "ERP", "Python"]
    },
    {
        id: 3,
        role: "Développeur Fullstack",
        company: "Azieleh, Yaoundé",
        period: "Septembre – Octobre 2024",
        description: "Optimisation de l'expérience utilisateur de l'application NBIKOPAY.",
        tags: ["Fullstack", "NBIKOPAY", "Optimisation"]
    },
    {
        id: 4,
        role: "UX/UI Designer",
        company: "ONA CONSULTING, Yaoundé",
        period: "Depuis août 2024",
        description: "Design de maquettes : Maquette mobile pour la gestion d’incidents (Port Autonome d’Abidjan) et maquettes UX/UI pour Destiny Life.",
        tags: ["Figma", "Prototyping", "Mobile"]
    },
    {
        id: 5,
        role: "Projet Ingénieur – Système d’évaluation (Microservices)",
        company: "M4M Overalls",
        period: "Février – Août 2024",
        description: "Analyse, conception et implémentation d'une architecture microservices. Mise en place d'API REST.",
        tags: ["Microservices", "API REST", "Architecture"]
    },
    {
        id: 6,
        role: "Optimisation SEO & Chatbot",
        company: "Azieleh, Yaoundé",
        period: "Mai – Septembre 2023",
        description: "Optimisation SEO complète et intégration d'un module de réponses automatiques.",
        tags: ["SEO", "Automation", "Support"]
    },
    {
        id: 7,
        role: "UX/UI Designer (Freelance)",
        company: "AfroGeek Academy",
        period: "Sept 2022 – Oct 2024",
        description: "Conception d'interfaces et expériences utilisateurs pour divers projets.",
        tags: ["Freelance", "Training", "UI Design"]
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const items = gsap.utils.toArray('.experience-item');

        items.forEach((item: any) => {
            gsap.fromTo(item,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, []);

    return (
        <section id="experience" ref={containerRef} className="py-32 px-6 md:px-12 bg-gray-50 dark:bg-black/50">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-20 text-center">Parcours Professionnel</h2>

                <div className="relative border-l border-gray-200 dark:border-gray-800 ml-4 md:ml-0 space-y-16">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="experience-item relative pl-12 md:pl-24 group">
                            {/* Dot */}
                            <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-accent border-4 border-white dark:border-black shadow-lg transition-transform group-hover:scale-150"></div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                                {/* Date Col */}
                                <div className="md:col-span-1">
                                    <span className="text-sm font-mono opacity-60 uppercase tracking-wider py-1 inline-block border border-gray-200 dark:border-gray-800 px-3 rounded-full bg-background">
                                        {exp.period}
                                    </span>
                                </div>

                                {/* Content Col */}
                                <div className="md:col-span-3">
                                    <h3 className="text-xl md:text-2xl font-semibold mb-1 group-hover:text-accent transition-colors">{exp.role}</h3>
                                    <h4 className="text-lg opacity-80 mb-4">{exp.company}</h4>
                                    <p className="opacity-60 leading-relaxed mb-6 max-w-2xl">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tags.map(tag => (
                                            <span key={tag} className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-white/10 text-foreground/80">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
