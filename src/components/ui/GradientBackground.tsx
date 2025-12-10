'use client';

import { useEffect, useRef } from 'react';

export default function GradientBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let time = 0;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        // Color palette (Dark premium)
        // Using HSLA for easier manipulation
        const colors = [
            [0, 0, 10],   // Near black
            [220, 40, 15],  // Deep Blue
            [260, 30, 15],  // Deep Purple
        ];

        const animate = () => {
            time += 0.002;
            ctx.clearRect(0, 0, width, height);

            // Create organic movement
            const gradient = ctx.createLinearGradient(0, 0, width, height);

            // Morphing calculations
            const x1 = Math.sin(time) * 0.5 + 0.5;
            const y1 = Math.cos(time * 0.8) * 0.5 + 0.5;

            // Dynamic gradient stops
            gradient.addColorStop(0, `hsla(240, 5%, 5%, 1)`); // Base

            // Moving aura
            const cx = width * x1;
            const cy = height * y1;
            const radius = Math.max(width, height) * 0.8;

            const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            radial.addColorStop(0, `hsla(220, 60%, 15%, 0.4)`);
            radial.addColorStop(1, `hsla(0, 0%, 0%, 0)`);

            ctx.fillStyle = radial;
            ctx.fillRect(0, 0, width, height);

            // Second aura
            const x2 = Math.cos(time * 0.5) * 0.5 + 0.5;
            const y2 = Math.sin(time * 0.9) * 0.5 + 0.5;
            const cx2 = width * x2;
            const cy2 = height * y2;

            const radial2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, radius * 0.8);
            radial2.addColorStop(0, `hsla(280, 50%, 12%, 0.3)`);
            radial2.addColorStop(1, `hsla(0, 0%, 0%, 0)`);

            ctx.fillStyle = radial2;
            ctx.fillRect(0, 0, width, height);

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-60"
        />
    );
}
