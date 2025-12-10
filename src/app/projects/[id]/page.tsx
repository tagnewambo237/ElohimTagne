'use client';

import { useParams } from 'next/navigation';
import { projects } from "@/data/projects";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/ui/TextReveal";
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProjectDetailsPage() {
    const params = useParams();
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const project = projects.find(p => p.id === id);
    const { t, language } = useLanguage();

    if (!project) {
        return (
            <main className="w-full min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">{t.projects_page.notFound}</h1>
                    <Link href="/projects" className="mt-4 inline-block underline">{t.projects_page.back}</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen bg-background text-foreground">
            <Header />

            <article className="pt-32 pb-24">
                {/* Hero */}
                <div className="w-full h-[60vh] md:h-[80vh] relative mb-24">
                    <Image
                        src={project.img}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                        <div className="max-w-7xl mx-auto">
                            <TextReveal className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white mb-4">
                                {project.title}
                            </TextReveal>
                            <p className="text-xl md:text-2xl font-mono text-white/80">{project.category[language]} • {project.year}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 mb-12 transition-opacity">
                        <ArrowLeft size={16} /> {t.projects_page.back}
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                        <div className="md:col-span-2">
                            <h2 className="text-2xl md:text-3xl font-medium mb-8">{t.projects_page.overview}</h2>
                            <p className="text-lg md:text-xl leading-relaxed opacity-80 mb-12">
                                {project.description[language]}
                            </p>
                            {/* <p className="text-lg md:text-xl leading-relaxed opacity-80">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p> */}
                        </div>

                        <div className="md:col-span-1">
                            <div className="border-t border-white/10 pt-8 mb-8">
                                <h3 className="text-sm uppercase tracking-widest opacity-50 mb-4">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map(tech => (
                                        <span key={tech} className="px-3 py-1 border border-white/20 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-8">
                                <h3 className="text-sm uppercase tracking-widest opacity-50 mb-4">{t.projects_page.role}</h3>
                                <p className="text-lg">Lead Developer & Designer</p>
                            </div>

                            <div className="mt-12">
                                <a href={project.link} className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform">
                                    {t.projects_page.liveSite} ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
