'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/ui/TextReveal";
import ParallaxGallery from "@/components/about/ParallaxGallery";
import CoffeeAccent from "@/components/ui/CoffeeAccent";
import PeekabooCat from "@/components/ui/PeekabooCat";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="w-full min-h-screen bg-background text-foreground overflow-hidden">
            <Header />

            <section className="pt-48 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
                <TextReveal className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-12">
                    Elohim Junior.
                </TextReveal>

                <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl group border border-stone-200 dark:border-stone-800 shadow-2xl">
                            <Image
                                src="/Profile.png"
                                alt="Elohim Junior"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <PeekabooCat />
                        </div>
                        <div className="flex gap-6 mt-6 text-sm opacity-60 font-mono justify-center md:justify-start">
                            <span>📍 Yaoundé, Cameroun</span>
                            <span>🌐 Français (Natif) – Anglais (A2)</span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col gap-8 text-xl md:text-2xl font-light opacity-90 leading-relaxed text-stone-600 dark:text-stone-300">
                        <TextReveal duration={1} delay={0.2}>
                            Professionnel polyvalent du numérique, je navigue entre UX/UI Design, développement Back-end et intégration Odoo.
                        </TextReveal>
                        <p className="opacity-80 text-lg">
                            Basé à Yaoundé, je maîtrise les architectures microservices, le SEO, et la création d’expériences intuitives.
                            Mon approche consiste à allier design, technicité et optimisation produit pour offrir des solutions digitales complètes et performantes.
                        </p>
                        <p className="opacity-80 text-lg italic border-l-2 border-accent pl-4">
                            "Créatif, Déterminé, Passionné par la lecture et l'apprentissage continu."
                        </p>

                        <div className="mt-12 grid grid-cols-2 gap-8 text-sm font-mono border-t border-stone-200 dark:border-stone-800 pt-8">
                            <div>
                                <h3 className="uppercase tracking-widest opacity-50 mb-4 text-accent">Techniques</h3>
                                <ul className="flex flex-col gap-2 opacity-80">
                                    <li>Node.js / Angular</li>
                                    <li>Flutter / Ionic</li>
                                    <li>HTML / CSS / JS</li>
                                    <li>WordPress / Odoo</li>
                                    <li>MySQL / MongoDB</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="uppercase tracking-widest opacity-50 mb-4 text-accent">Outils & Design</h3>
                                <ul className="flex flex-col gap-2 opacity-80">
                                    <li>Git / Postman</li>
                                    <li>Figma / Adobe XD</li>
                                    <li>Photoshop / Illustrator</li>
                                    <li>VS Code / JetBrains</li>
                                    <li>Trello</li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
                            <CoffeeAccent />
                        </div>
                    </div>
                </div>
            </section>

            <ParallaxGallery />

            <Footer />
        </main>
    );
}
