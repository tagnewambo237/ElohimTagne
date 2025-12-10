'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/ui/TextReveal";
import { projects } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import CoffeeAccent from "@/components/ui/CoffeeAccent";
import { useLanguage } from '@/context/LanguageContext';

export default function ProjectsPage() {
    const { t, language } = useLanguage();

    return (
        <main className="w-full min-h-screen bg-background text-foreground">
            <Header />

            <section className="pt-48 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
                <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div>
                        <span className="font-mono text-sm tracking-widest uppercase opacity-60">{t.projects_page.label}</span>
                        <TextReveal className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mt-4">
                            {t.projects_page.title}
                        </TextReveal>
                    </div>
                    <div className="pb-4">
                        <CoffeeAccent />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
                    {projects.map((project, index) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className={`group block w-full ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-900 mb-6 border border-white/10">
                                <Image
                                    src={project.img}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            <div className="flex justify-between items-start border-b border-white/10 pb-4 group-hover:border-white/50 transition-colors">
                                <div>
                                    <h3 className="text-3xl font-medium mb-1">{project.title}</h3>
                                    <p className="text-sm font-mono opacity-60">{project.category[language]}</p>
                                </div>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    {t.projects_page.view} ↗
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
