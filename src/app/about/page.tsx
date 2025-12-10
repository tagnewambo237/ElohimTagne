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
                    Creative Developer.
                </TextReveal>

                <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl group">
                            <Image
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
                                alt="Profile"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <PeekabooCat />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col gap-8 text-xl md:text-2xl font-light opacity-90 leading-relaxed">
                        <TextReveal duration={1} delay={0.2}>
                            I craft digital experiences that blend aesthetic elegance with technical precision.
                        </TextReveal>
                        <p className="opacity-80">
                            Based in Yaoundé, I specialize in building performant, accessible, and beautiful web applications.
                            My approach works at the intersection of design and engineering, ensuring that every interaction
                            feels natural and every pixel serves a purpose.
                        </p>
                        <p className="opacity-80">
                            With a background in full-stack development and a passion for motion design, I bring a unique
                            perspective to every project. I believe that the best software doesn't just work well—it feels right.
                        </p>

                        <div className="mt-12 grid grid-cols-2 gap-8 text-sm uppercase tracking-widest font-mono border-t border-white/10 pt-8">
                            <div>
                                <h3 className="opacity-50 mb-4">Services</h3>
                                <ul className="flex flex-col gap-2">
                                    <li>Web Development</li>
                                    <li>UI/UX Design</li>
                                    <li>Creative Coding</li>
                                    <li>Mobile Apps</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="opacity-50 mb-4">Tech Stack</h3>
                                <ul className="flex flex-col gap-2">
                                    <li>Next.js / React</li>
                                    <li>TypeScript</li>
                                    <li>GSAP / WebGL</li>
                                    <li>Node.js</li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
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
