'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-24 px-6 md:px-12 rounded-t-[3rem] relative z-10 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[60vh]">

                <div className="flex flex-col gap-8">
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-none">
                        Let's work <br />
                        <span className="text-gray-500">together.</span>
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 mt-12">
                        <a href="mailto:hello@elohim.dev" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all text-xl">
                            hello@elohim.dev
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-24">
                    <div className="flex gap-8 text-sm text-gray-400">
                        <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-white transition-colors">Github</Link>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right">
                        <p className="text-sm text-gray-500">
                            &copy; 2025 Elohim. <br />
                            All Rights Reserved.
                        </p>
                        <p className="text-xs text-gray-600">
                            Crafted with Next.js, Tailwind, & GSAP.
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
