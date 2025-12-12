'use client';

import { useRef } from 'react';
import clsx from 'clsx';
import TextReveal from '@/components/ui/TextReveal';
import ParallaxImage from '@/components/ui/ParallaxImage';
import CursorCat from '@/components/ui/CursorCat';

import { useLanguage } from '@/context/LanguageContext';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { language } = useLanguage();

    const skills = {
        fr: {
            Techniques: ["HTML / CSS / JavaScript", "Node.js", "Angular", "Flutter", "Ionic", "WordPress", "MySQL", "MongoDB"],
            "ERP / Outils": ["Odoo", "Postman", "Git", "Trello", "VS Code", "JetBrains"],
            Design: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
        },
        en: {
            Technical: ["HTML / CSS / JavaScript", "Node.js", "Angular", "Flutter", "Ionic", "WordPress", "MySQL", "MongoDB"],
            "ERP / Tools": ["Odoo", "Postman", "Git", "Trello", "VS Code", "JetBrains"],
            Design: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
        }
    };

    const content = {
        fr: {
            title: "Profil Professionnel",
            text1: "Professionnel polyvalent du numérique, avec une solide expérience en UX/UI Design, développement back-end, et intégration Odoo.",
            text2: "Je maîtrise les architectures microservices, le SEO, et la création d’expériences intuitives.",
            text3: "Je me distingue par ma capacité à allier design, développement et optimisation produit pour des solutions digitales complètes.",
            location: "📍 Yaoundé, Cameroun",
            languages: "🌐 Français (Natif) – Anglais",
            strengthsTitle: "Atouts",
            strengthsText: '"Créatif, Déterminé, Passionné par la lecture et l\'apprentissage continu."',
        },
        en: {
            title: "Professional Profile",
            text1: "Versatile digital professional with solid experience in UX/UI Design, back-end development, and Odoo integration.",
            text2: "I master microservices architectures, SEO, and the creation of intuitive experiences.",
            text3: "I stand out for my ability to combine design, development, and product optimization for complete digital solutions.",
            location: "📍 Yaoundé, Cameroon",
            languages: "🌐 French (Native) – English",
            strengthsTitle: "Strengths",
            strengthsText: '"Creative, Determined, Passionate about reading and continuous learning."',
        }
    };

    const t = language === 'fr' ? content.fr : content.en;
    const activeSkills = language === 'fr' ? skills.fr : skills.en;

    return (
        <section id="about" ref={containerRef} className="py-16 px-6 md:px-12 bg-background border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">

                {/* Left: Content */}
                <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-12">
                    <div>
                        <h2 className="text-sm uppercase tracking-widest mb-8 opacity-60 text-accent">{t.title}</h2>
                        <div className="text-2xl md:text-3xl font-light leading-relaxed text-foreground">
                            <TextReveal>
                                {t.text1}
                            </TextReveal>
                            <div className="h-4" /> {/* Spacer */}
                            <TextReveal delay={0.2}>
                                {t.text2}
                            </TextReveal>
                            <div className="h-4" />
                            <TextReveal delay={0.4}>
                                {t.text3}
                            </TextReveal>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-6 mt-8 text-sm opacity-60 font-mono">
                            <span className="flex items-center gap-2">
                                {t.location}
                            </span>
                            <span className="flex items-center gap-2">
                                {t.languages}
                            </span>
                            {/* <span className="flex items-center gap-2 text-accent/80" title="Level 24">
                                ✨ Lv. 24
                            </span> */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {Object.entries(activeSkills).map(([category, items]) => (
                            <div key={category}>
                                <h3 className="text-lg font-medium mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">{category}</h3>
                                <div className="flex flex-col gap-2">
                                    {items.map(skill => (
                                        <span key={skill} className="text-sm opacity-70 hover:opacity-100 hover:translate-x-1 transition-all duration-300 cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 mt-8 bg-gray-50 dark:bg-white/5 p-8 rounded-2xl relative overflow-hidden group">
                        {/* Subtle background decoration */}
                        <div className="absolute top-[-10px] right-[-10px] text-6xl opacity-5 rotate-12 group-hover:opacity-10 transition-opacity select-none">
                            ☕️
                        </div>

                        <h3 className="text-lg font-medium flex items-center gap-2">
                            {t.strengthsTitle}
                        </h3>
                        <p className="opacity-70 leading-relaxed italic relative z-10">
                            {t.strengthsText}
                        </p>
                    </div>
                </div>

                {/* Right: Image / Visual */}
                <div className="md:col-span-12 lg:col-span-4 relative group">
                    <CursorCat className="absolute -right-36 top-10 z-20 hidden lg:flex" />
                    <ParallaxImage
                        src="/Elohim.jpeg?q=80&w=2574&auto=format&fit=crop"
                        alt="Elohim Junior"
                        className="rounded-2xl aspect-[4/5] bg-gray-200 dark:bg-gray-800 grayscale hover:grayscale-0 transition-all duration-500"
                        speed={1.1} // Subtle parallax
                    />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white pointer-events-none rounded-b-2xl">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="font-medium text-lg">Elohim Junior</p>
                                <p className="text-sm opacity-80 font-mono flex items-center gap-2">
                                    Tech enthusiast <span className="opacity-50">|</span> 🎮 <span className="opacity-50">|</span> ☕️
                                </p>
                            </div>
                            <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                👾
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
