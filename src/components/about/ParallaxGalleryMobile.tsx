'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import TextReveal from "@/components/ui/TextReveal";

const hobbies = [
    { src: "/gallery/photo nature.JPG", title: "Photographie" },
    { src: "/gallery/musique.JPG", title: "Musique" },
    { src: "/gallery/coffee_time.JPG", title: "Chill" },
    { src: "/gallery/voyage_bagangte.JPG", title: "Voyage" },
    { src: "/gallery/game.WEBP", title: "Gaming" },
    { src: "/gallery/pillard.JPG", title: "Sport" },
    { src: "/gallery/voyage_plage.JPG", title: "Nature" },
    { src: "/gallery/detente.JPG", title: "Détente" },
    { src: "/gallery/best_cake.JPG", title: "Food" },
    { src: "/gallery/cafe.JPG", title: "Café" },
];

export default function ParallaxGalleryMobile() {
    const { t } = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);
    const isInteracting = useRef(false);
    const autoScrollSpeed = 1; // Pixels per frame

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationFrameId: number;
        let lastScrollLeft = container.scrollLeft;

        // Auto-scroll loop
        const scrollLoop = () => {
            if (!isInteracting.current && container) {
                // If we reach the end, maybe reset or bounce? For now, let's just loop or stop.
                // Looping content is complex without duplication.
                // Let's implement a gentle continuous scroll and bounce back or similar.
                // Actually, for a gallery like this, a slow forward drift is nice until end.

                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
                    // Reset to start for infinite feel or just stop? 
                    // Let's stop to not be annoying, or maybe reverse?
                    // User asked for "immersive auto/manual mix".
                    // Let's just drift slowly.
                } else {
                    container.scrollLeft += autoScrollSpeed;
                }
            }
            animationFrameId = requestAnimationFrame(scrollLoop);
        };

        // However, standard auto-scroll interferes with snap-x.
        // A better approach for "immersive mix" is to use a timer to snap to next slide if idle.
        // OR, use a very slow gentle move that doesn't fight the user.
        // Let's try a periodic "drift" or "snap next" if idle.

        // Re-reading user request: "scroll automatique ? genre un melange de manuel et automatique immersif"
        // Interpretation: It slowly moves, but if I touch it, I take control. When I release, it might resume or wait.

        // Implementation:
        // Use a timer to scroll to next item every X seconds if no interaction.
        // OR better: Continuous slow scroll (marquee style) that pauses on touch.
        // But with snap-x, continuous scroll is jerky.

        // Let's remove snap-x for the auto-scroll mode and only apply it when touched? No, that's messy.
        // Let's try: Auto-advance to next slide every 3 seconds if not interacting.

        const advanceSlide = () => {
            if (!container || isInteracting.current) return;

            const cardWidth = window.innerWidth * 0.85 + 16; // 85vw + gap
            const currentScroll = container.scrollLeft;
            const nextScroll = Math.ceil((currentScroll + 10) / cardWidth) * cardWidth;

            if (nextScroll < container.scrollWidth) {
                container.scrollTo({ left: nextScroll, behavior: 'smooth' });
            } else {
                container.scrollTo({ left: 0, behavior: 'smooth' }); // Loop back
            }
        };

        const intervalId = setInterval(advanceSlide, 4000); // Change slide every 4 seconds

        const handleTouchStart = () => { isInteracting.current = true; };
        const handleTouchEnd = () => {
            // Resume auto-scroll after a delay
            setTimeout(() => { isInteracting.current = false; }, 3000);
        };

        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
        container.addEventListener('scroll', () => {
            // Detect manual scroll?
        });

        return () => {
            clearInterval(intervalId);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <section className="py-24 bg-background md:hidden border-t border-stone-200 dark:border-white/5">
            <div className="px-6 mb-10">
                <span className="text-sm font-mono uppercase tracking-widest opacity-60">{t.about.hobbies_label}</span>
                <h2 className="text-4xl font-semibold tracking-tighter mt-4">
                    <TextReveal>{t.about.hobbies_title}</TextReveal>
                </h2>
                <p className="mt-4 text-lg opacity-80 font-light leading-relaxed">
                    {t.about.hobbies_desc}
                </p>
            </div>

            {/* Horizontal Immersive Scroll */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory px-6 gap-4 pb-12 scrollbar-none"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {hobbies.map((hobby, index) => (
                    <div
                        key={index}
                        className="snap-center shrink-0 w-[85vw] h-[65vh] relative rounded-3xl overflow-hidden shadow-xl shadow-stone-500/10 dark:shadow-black/40 border border-white/10"
                    >
                        <Image
                            src={hobby.src}
                            alt={hobby.title}
                            fill
                            className="object-cover"
                            sizes="85vw"
                            priority={index < 2}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Floating Title */}
                        <div className="absolute bottom-8 left-8">
                            <span className="text-white/60 text-sm font-mono uppercase tracking-wider mb-1 block">Inspiration</span>
                            <h3 className="text-white text-3xl font-medium tracking-tight">
                                {hobby.title}
                            </h3>
                        </div>

                        {/* Pagination / Index Indicator */}
                        <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-md text-white text-xs font-mono px-3 py-1 rounded-full border border-white/10">
                            {String(index + 1).padStart(2, '0')} / {hobbies.length}
                        </div>
                    </div>
                ))}

                {/* Spacer for end of scroll */}
                <div className="w-2 shrink-0" />
            </div>
        </section>
    );
}
