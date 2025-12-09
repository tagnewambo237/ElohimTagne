'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Magnetic from "@/components/ui/Magnetic";

const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial reveal
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.5 }
        );
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);

        if (!isOpen) {
            gsap.to(menuRef.current, {
                clipPath: "circle(150% at 95% 5%)",
                duration: 0.8,
                ease: "power3.inOut",
                pointerEvents: 'all'
            });

            gsap.fromTo('.mobile-link',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2, ease: "power3.out" }
            );
        } else {
            gsap.to(menuRef.current, {
                clipPath: "circle(0% at 95% 5%)",
                duration: 0.8,
                ease: "power3.inOut",
                pointerEvents: 'none'
            });
        }
    };

    return (
        <>
            <header className="fixed top-6 left-0 w-full z-50 px-6 flex justify-center pointer-events-none">

                {/* Dynamic Island Nav */}
                <div
                    ref={navRef}
                    className="pointer-events-auto bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-black/5"
                >
                    <Link href="/" className="font-semibold tracking-tight text-foreground/90 hover:text-foreground transition-colors mix-blend-difference">
                        ELOHIM<span className="text-accent text-xs align-top">®</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Magnetic key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors relative group px-2 py-1"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-foreground/80 transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2 rounded-full" />
                                </Link>
                            </Magnetic>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <ThemeToggle />
                        <button
                            onClick={toggleMenu}
                            className="md:hidden w-10 h-10 flex items-center justify-center bg-foreground text-background rounded-full"
                        >
                            {isOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                        <Magnetic>
                            <a
                                href="#contact"
                                className="hidden md:flex items-center gap-2 bg-foreground text-background px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform active:scale-95"
                            >
                                Let's Talk <ArrowUpRight size={14} />
                            </a>
                        </Magnetic>
                    </div>
                </div>

            </header>

            {/* Fullscreen Mobile Menu */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-40 bg-foreground text-background pt-32 px-6"
                style={{ clipPath: "circle(0% at 95% 5%)" }} // Start closed
            >
                <div className="flex flex-col gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={toggleMenu}
                            className="mobile-link text-5xl font-medium tracking-tight hover:italic transition-all border-b border-white/10 pb-6 flex justify-between group"
                        >
                            {item.name}
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-2xl">↗</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
