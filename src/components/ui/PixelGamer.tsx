'use client';

import { useEffect, useRef } from 'react';

export default function PixelGamer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frame = 0;
        const pixelSize = 4;

        // Simple 8x8 Pixel Character Sprite Maps
        const idle = [
            "  XXXX  ",
            " XXXXXX ",
            "XX VV XX",
            "XX VV XX",
            " XXXXXX ",
            "  XXXX  ",
            " X XX X ",
            "X      X"
        ];

        const blink = [
            "  XXXX  ",
            " XXXXXX ",
            "XX -- XX",
            "XX -- XX",
            " XXXXXX ",
            "  XXXX  ",
            " X XX X ",
            "X      X"
        ];

        const drawSprite = (sprite: string[], offsetX: number, offsetY: number) => {
            sprite.forEach((row, y) => {
                row.split('').forEach((char, x) => {
                    if (char !== ' ') {
                        ctx.fillStyle = char === 'V' ? '#3b82f6' : (char === '-' ? '#3b82f6' : '#ffffff'); // Eyes blue, body white
                        ctx.fillRect((offsetX + x) * pixelSize, (offsetY + y) * pixelSize, pixelSize, pixelSize);
                    }
                });
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw character
            const isBlinking = Math.floor(frame / 60) % 5 === 0 && frame % 60 < 10; // Blink every 5s approx
            drawSprite(isBlinking ? blink : idle, 10, 10);

            // Draw floating "Zzz" or hearts occasionally
            if (Math.floor(frame / 120) % 2 === 0) {
                ctx.font = "10px monospace";
                ctx.fillStyle = "#fbbf24";
                ctx.fillText("♥", 60, 20 + Math.sin(frame * 0.1) * 5);
            }

            frame++;
            requestAnimationFrame(animate);
        };

        animate();

    }, []);

    return (
        <div className="flex items-center gap-4">
            <canvas ref={canvasRef} width={80} height={60} className="image-pixelated" />
            <div>
                <div className="text-xs font-mono uppercase tracking-widest opacity-50 mb-1">Current Status</div>
                <div className="font-bold text-lg text-accent">Level 24</div>

                {/* XP Bar */}
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 animate-[width_3s_ease-in-out_infinite] w-[85%] rounded-full"></div>
                </div>
                <div className="text-[10px] font-mono opacity-40 mt-1 text-right">8,402 / 10,000 XP</div>
            </div>
        </div>
    );
}
