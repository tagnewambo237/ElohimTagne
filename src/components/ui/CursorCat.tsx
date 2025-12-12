'use client';

import { useEffect, useRef, useState } from 'react';

const phrases = [
    "☕ Un café et je code le monde !",
    "🎮 Pause gaming ? Jamais entendu parler...",
    "😸 Miaou ! (Ça veut dire 'debug en cours')",
    "📚 Je lis des mangas pour 'la recherche UX'",
    "💻 404: Motivation not found... jk, café is loading...",
    "🐱 Ce code a besoin de plus de caféine",
    "🎯 Bug fixé ! ...ou pas. On verra demain.",
    "✨ Ctrl+S est ma religion",
    "🍜 Pause ramen = Productivité x10",
    "😼 Je ne dors pas, je compile",
];

export default function CursorCat({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [currentPhrase, setCurrentPhrase] = useState("");
    const [showBubble, setShowBubble] = useState(false);

    // We use a ref to access the shake/particles logic from the event handlers
    // without re-binding listeners on every render.
    const physicsRef = useRef({
        shake: 0,
        wavePhase: 0,
        particles: [] as Particle[]
    });

    // Helper to add particles
    const addParticles = (width: number, height: number) => {
        const cx = width / 2;
        const cy = height / 2 - 15;
        for (let i = 0; i < 8; i++) {
            physicsRef.current.particles.push(new Particle(cx, cy));
        }
    };

    // Initial phrase
    useEffect(() => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentPhrase(randomPhrase);
    }, []);

    class Particle {
        x: number; y: number;
        vx: number; vy: number;
        life: number; size: number;

        constructor(x: number, y: number) {
            this.x = x; this.y = y;
            const angle = (Math.random() * Math.PI) + Math.PI;
            const speed = Math.random() * 8 + 2;
            this.vx = (Math.random() - 0.5) * speed;
            this.vy = -(Math.random() * speed * 0.8);
            this.life = 1.0;
            this.size = Math.random() * 2 + 1.5;
        }

        update() {
            this.vy += 0.5; this.x += this.vx; this.y += this.vy; this.life -= 0.025;
        }

        draw(c: CanvasRenderingContext2D) {
            c.globalAlpha = this.life; c.fillStyle = '#451a03'; c.beginPath();
            c.arc(this.x, this.y, this.size, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1.0;
        }
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        let width = 0, height = 0;
        let scale = 1;
        let frame = 0;

        // Mouse tracking for eyes
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const rect = parent.getBoundingClientRect();
                scale = window.devicePixelRatio || 1;
                width = rect.width; height = rect.height;
                canvas.width = width * scale; canvas.height = height * scale;
                ctx.scale(scale, scale);
            }
        };
        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            const cx = width / 2; const cy = height / 2 + 12; const s = width / 100;
            const physics = physicsRef.current;

            let shakeX = 0; let shakeY = 0;
            if (physics.shake > 0) {
                shakeX = (Math.random() - 0.5) * physics.shake;
                shakeY = (Math.random() - 0.5) * physics.shake;
                physics.shake *= 0.92; if (physics.shake < 0.5) physics.shake = 0;
            }

            ctx.save();
            ctx.translate(shakeX, shakeY);

            // --- 1. CUP HANDLE ---
            ctx.beginPath();
            const handleStartX = cx + 22 * s; const handleStartY = cy - 10 * s;
            ctx.moveTo(handleStartX, handleStartY);
            ctx.bezierCurveTo(cx + 45 * s, handleStartY - 5 * s, cx + 45 * s, cy + 25 * s, handleStartX + 2 * s, cy + 20 * s);
            ctx.lineWidth = 6 * s; ctx.strokeStyle = '#f59e0b'; ctx.lineCap = 'round'; ctx.stroke();

            // --- 2. BACK CUP ---
            ctx.fillStyle = '#fef3c7'; ctx.beginPath();
            ctx.ellipse(cx, cy - 20 * s, 26 * s, 8 * s, 0, 0, Math.PI * 2);
            ctx.fill(); ctx.lineWidth = 1 * s; ctx.strokeStyle = '#d97706'; ctx.stroke();

            // --- 3. LIQUID ---
            physics.wavePhase += 0.2; const liquidY = cy - 18 * s; ctx.fillStyle = '#451a03';
            ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy - 20 * s, 24 * s, 6 * s, 0, 0, Math.PI * 2); ctx.clip();
            ctx.beginPath(); ctx.moveTo(cx - 30 * s, liquidY);
            for (let i = -30 * s; i <= 30 * s; i += 2) {
                const amp = 1 * s + (physics.shake * 0.15);
                const dy = Math.sin((i * 0.15) + physics.wavePhase) * amp;
                ctx.lineTo(cx + i, liquidY + dy);
            }
            ctx.lineTo(cx + 30 * s, liquidY + 50 * s); ctx.lineTo(cx - 30 * s, liquidY + 50 * s);
            ctx.fill(); ctx.restore();

            // --- 4. CAT (NOIR ET PETITS YEUX) ---
            const catY = liquidY - 2 * s + Math.sin(frame * 0.08) * (1.5 * s);
            const catColor = '#262626';

            // Ears
            ctx.fillStyle = catColor;
            ctx.beginPath();
            ctx.moveTo(cx - 10 * s, catY - 12 * s); ctx.lineTo(cx - 16 * s, catY - 24 * s); ctx.lineTo(cx - 4 * s, catY - 16 * s);
            ctx.moveTo(cx + 10 * s, catY - 12 * s); ctx.lineTo(cx + 16 * s, catY - 24 * s); ctx.lineTo(cx + 4 * s, catY - 16 * s);
            ctx.fill();

            // Head
            ctx.beginPath();
            ctx.arc(cx, catY - 10 * s, 15 * s, 0, Math.PI * 2);
            ctx.fill();

            // Face Details
            if (physics.shake > 2) {
                // Scared face
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.5 * s;
                ctx.beginPath();
                ctx.moveTo(cx - 8 * s, catY - 10 * s); ctx.lineTo(cx - 5 * s, catY - 8.5 * s);
                ctx.moveTo(cx - 8 * s, catY - 7 * s); ctx.lineTo(cx - 5 * s, catY - 8.5 * s);
                ctx.moveTo(cx + 8 * s, catY - 10 * s); ctx.lineTo(cx + 5 * s, catY - 8.5 * s);
                ctx.moveTo(cx + 8 * s, catY - 7 * s); ctx.lineTo(cx + 5 * s, catY - 8.5 * s);
                ctx.stroke();
            } else {
                // Eye Tracking Logic
                // Get canvas position relative to viewport
                const rect = canvas.getBoundingClientRect();
                const canvasCenterX = rect.left + rect.width / 2;
                const canvasCenterY = rect.top + rect.height / 2;

                const angle = Math.atan2(mouseY - canvasCenterY, mouseX - canvasCenterX);
                // Limit the pupil movement distance
                const eyeRadius = 3.5 * s; // Bigger eyes
                const pupilRadius = 1.5 * s;
                const maxOffset = 1.5 * s;

                // Calculate pupil offset
                // We use a bit of smoothing or just direct tracking. Direct is snappier for "following".
                const pupilX = Math.cos(angle) * maxOffset;
                const pupilY = Math.sin(angle) * maxOffset;

                // Sclera (White part, bigger)
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                // Left Eye
                ctx.arc(cx - 6 * s, catY - 10 * s, eyeRadius, 0, Math.PI * 2);
                // Right Eye
                ctx.arc(cx + 6 * s, catY - 10 * s, eyeRadius, 0, Math.PI * 2);
                ctx.fill();

                // Pupils (Black, following cursor)
                ctx.fillStyle = '#171717'; // Almost black
                ctx.beginPath();
                // Left Pupil
                ctx.arc(cx - 6 * s + pupilX, catY - 10 * s + pupilY, pupilRadius, 0, Math.PI * 2);
                // Right Pupil
                ctx.arc(cx + 6 * s + pupilX, catY - 10 * s + pupilY, pupilRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // --- 5. FRONT CUP ---
            ctx.fillStyle = '#fef3c7'; ctx.beginPath();
            ctx.moveTo(cx - 26 * s, cy - 20 * s);
            ctx.bezierCurveTo(cx - 22 * s, cy + 30 * s, cx + 22 * s, cy + 30 * s, cx + 26 * s, cy - 20 * s);
            ctx.fill(); ctx.lineWidth = 1.5 * s; ctx.strokeStyle = '#d97706'; ctx.stroke();
            ctx.beginPath(); ctx.ellipse(cx, cy - 20 * s, 26 * s, 8 * s, 0, Math.PI, Math.PI, false);
            ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2 * s; ctx.stroke();

            // --- 6. JS BADGE ---
            ctx.save(); ctx.translate(cx, cy + 5 * s); ctx.rotate(-0.1);
            ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(0, 0, 9 * s, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#78350f'; ctx.font = `bold ${10 * s}px monospace`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('JS', 0, 1 * s); ctx.restore();

            // --- 7. PAWS ---
            ctx.fillStyle = catColor;
            ctx.beginPath(); ctx.ellipse(cx - 12 * s, cy - 18 * s, 4 * s, 4 * s, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(cx + 12 * s, cy - 18 * s, 4 * s, 4 * s, 0, 0, Math.PI * 2); ctx.fill();

            ctx.restore();

            // --- 8. PARTICLES ---
            for (let i = physics.particles.length - 1; i >= 0; i--) {
                const p = physics.particles[i]; p.update(); p.draw(ctx);
                if (p.life <= 0) physics.particles.splice(i, 1);
            }
            frame++; requestAnimationFrame(draw);
        };

        const animId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleMouseEnter = () => {
        // Just show bubble, no shake
        setShowBubble(true);
        // Optionally change phrase on hover too? User said "le texte s'affiche quand on hover"
        // Let's keep the current phrase (maybe randomly set on mount) to avoid too much flickering text
        // or we could change it if it was hidden.
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentPhrase(randomPhrase);
    };

    const handleMouseLeave = () => {
        setShowBubble(false);
    };

    const handleClick = () => {
        // Shake on click
        physicsRef.current.shake = 25;

        // Add particles
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            // We need logical width/height used in draw. 
            // In draw(), width/height comes from rect. 
            // We'll just pass the rect dimensions to a helper which creates particles at center
            addParticles(rect.width, rect.height);
        }

        // Also ensure bubble is shown (user said "et affichera le texte")
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentPhrase(randomPhrase);
        setShowBubble(true);
    };

    return (
        <div
            ref={containerRef}
            className={`flex flex-col items-center justify-center relative ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div className={`absolute -top-16 z-10 w-48 text-center bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 text-xs font-bold px-3 py-2 rounded-xl shadow-xl border border-stone-100 dark:border-stone-700 transition-all duration-300 transform origin-bottom pointer-events-none ${showBubble ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-2'}`}>
                {currentPhrase}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-stone-800 border-b border-r border-stone-100 dark:border-stone-700 rotate-45"></div>
            </div>
            <div className="w-24 h-24 cursor-pointer relative transition-transform active:scale-95" title="Click to shake!">
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>
        </div>
    );
}