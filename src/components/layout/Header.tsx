'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Header reveal animation
        gsap.fromTo(headerRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
        );
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // Open animation
            gsap.to(navRef.current, {
                height: '100vh',
                duration: 0.8,
                ease: 'power3.inOut',
                pointerEvents: 'all'
            });
            gsap.fromTo('.mobile-nav-item',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
            );
        } else {
            // Close animation
            gsap.to(navRef.current, {
                height: 0,
                duration: 0.8,
                ease: 'power3.inOut',
                pointerEvents: 'none'
            });
        }
    };

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white"
            >
                <Link href="/" className="text-xl font-medium tracking-tight hover:opacity-70 transition-opacity">
                    Elohim<span className="text-accent">.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative text-sm font-medium tracking-wide hover:text-accent transition-colors group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button className="md:hidden z-50 relative" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Nav Overlay */}
            <div
                ref={navRef}
                className="fixed top-0 left-0 w-full h-0 bg-black text-white z-40 overflow-hidden flex flex-col justify-center items-center pointer-events-none"
            >
                <div className="flex flex-col gap-8 text-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="mobile-nav-item text-4xl font-light tracking-tighter hover:text-accent transition-colors"
                            onClick={toggleMenu}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
