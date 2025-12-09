'use client';

import { useRef } from 'react';
import clsx from 'clsx';
import TextReveal from '@/components/ui/TextReveal';
import ParallaxImage from '@/components/ui/ParallaxImage';

const skills = {
    Techniques: ["HTML / CSS / JavaScript", "Node.js", "Angular", "Flutter", "Ionic", "WordPress", "MySQL", "MongoDB"],
    "ERP / Outils": ["Odoo", "Postman", "Git", "Trello", "VS Code", "JetBrains"],
    Design: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
};

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="about" ref={containerRef} className="py-32 px-6 md:px-12 bg-background border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">

                {/* Left: Content */}
                <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-12">
                    <div>
                        <h2 className="text-sm uppercase tracking-widest mb-8 opacity-60 text-accent">Profil Professionnel</h2>
                        <div className="text-2xl md:text-3xl font-light leading-relaxed text-foreground">
                            <TextReveal>
                                Professionnel polyvalent du numérique, avec une solide expérience en UX/UI Design, développement back-end, et intégration Odoo.
                            </TextReveal>
                            <div className="h-4" /> {/* Spacer */}
                            <TextReveal delay={0.2}>
                                Je maîtrise les architectures microservices, le SEO, et la création d’expériences intuitives.
                            </TextReveal>
                            <div className="h-4" />
                            <TextReveal delay={0.4}>
                                Je me distingue par ma capacité à allier design, développement et optimisation produit pour des solutions digitales complètes.
                            </TextReveal>
                        </div>
                        <div className="flex gap-6 mt-8 text-sm opacity-60 font-mono">
                            <span>📍 Yaoundé, Cameroun</span>
                            <span>🌐 Français (Natif) – Anglais (A2)</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {Object.entries(skills).map(([category, items]) => (
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

                    <div className="flex flex-col gap-4 mt-8 bg-gray-50 dark:bg-white/5 p-8 rounded-2xl">
                        <h3 className="text-lg font-medium">Atouts</h3>
                        <p className="opacity-70 leading-relaxed italic">
                            "Créatif, Déterminé, Passionné par la lecture et l'apprentissage continu."
                        </p>
                    </div>
                </div>

                {/* Right: Image / Visual */}
                <div className="md:col-span-12 lg:col-span-4 relative group">
                    <ParallaxImage
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
                        alt="Elohim Junior"
                        className="rounded-2xl aspect-[4/5] bg-gray-200 dark:bg-gray-800"
                        speed={1.1} // Subtle parallax
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white pointer-events-none rounded-b-2xl">
                        <p className="font-medium">Elohim Junior</p>
                        <p className="text-xs opacity-70">Tech enthusiast</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
