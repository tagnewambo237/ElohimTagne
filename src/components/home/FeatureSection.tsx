'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const content = [
    {
        title: "Strategic Vision",
        description: "Every project begins with a deep understanding of the problem space. We define clear goals and metrics to ensure success.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"
    },
    {
        title: "Design Precision",
        description: "Visuals that breathe. Typography that speaks. We craft interfaces that are not just seen, but felt.",
        image: "https://images.unsplash.com/photo-1486406163833-26a835b11684?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Technical Excellence",
        description: "Built on modern, scalable foundations. Performance is not an afterthought, it's a core feature.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
    }
];

export default function FeatureSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const items = gsap.utils.toArray('.feature-item');

            // Pinning the section
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=200%", // Scroll distance
                pin: true,
                scrub: true,
                // markers: true, // For debugging
                animation: gsap.timeline()
                    .to(items, {
                        yPercent: -100 * (items.length - 1),
                        ease: "none",
                        stagger: 0.5 // Overlap control
                    })
            });

            // Text Syncing - simple approach: 
            // We can also animate the text opacity based on the scroll progress of the images
            // But for a simpler "slide up" effect, we can sync them.

            // Better approach for independent syncing:
            // Loop through content and trigger text changes

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="h-screen w-full bg-foreground text-background flex items-center justify-center overflow-hidden relative">
            {/* Container */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 px-6 md:px-12 h-[80vh] items-center">

                {/* Left: Text - We will animate this manually or let it be pinned */}
                <div ref={leftColRef} className="flex flex-col justify-center h-full relative overflow-hidden">
                    {/* We stack text absolutely and fade in/out based on scroll? 
                 Or simpler: The left side moves naturally, right side is the focus. 
                 User request: "Text is on left and when smooth scroll... text and image changing"
                 Let's do a synced scroll.
              */}

                    <div className="relative w-full h-64">
                        {content.map((item, i) => (
                            <div key={i} className="feature-text absolute top-0 left-0 w-full transition-opacity duration-500 flex flex-col justify-center">
                                {/* We will control opacity via scroll trigger manually in a more complex setup, 
                             but for this "slide" request, let's treat the whole container as a slider.
                         */}
                            </div>
                        ))}

                        {/* Alternative Approach: Sticky Left, Scrolling Right */}
                        <div className="space-y-32">
                            {/* This inner content needs to scroll SYNCED with right side */}
                        </div>
                    </div>

                    {/* REVISED APPROACH FOR FLUIDITY: 
                  Actually, let's stick to the classic "Sticky Parent" pattern. 
                  Parent is tall. Sticky container inside.
              */}
                </div>

                {/* Right: Images */}
                <div ref={rightColRef} className="h-full w-full relative overflow-hidden rounded-2xl">
                    {/* Images here */}
                </div>
            </div>
        </section>
    );
}
// Rewriting the component entirely for the specific "Sticky Scroll" effect requested.
