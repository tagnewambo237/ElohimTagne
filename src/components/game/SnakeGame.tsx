'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Coffee, Bug, RefreshCw, Trophy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import clsx from 'clsx';

// Game Constants
const GRID_SIZE = 20;
const INITIAL_Speed = 150;
const SPEED_INCREMENT = 2; // Speed up slightly every food
const MIN_SPEED = 60;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function SnakeGame() {
    const { t } = useLanguage();
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Point>({ x: 15, y: 15 });
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(INITIAL_Speed);

    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const directionRef = useRef<Direction>('RIGHT'); // Ref to prevent multiple input changes per tick

    // Initialize High Score
    useEffect(() => {
        const saved = localStorage.getItem('snakeHighScore');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    // Generate random food not on snake
    const generateFood = useCallback((): Point => {
        let newFood: Point = { x: 0, y: 0 };
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
            // Check if on snake
            const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
            if (!onSnake) break;
        }
        return newFood;
    }, [snake]);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(generateFood());
        setDirection('RIGHT');
        directionRef.current = 'RIGHT';
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        setSpeed(INITIAL_Speed);
    };

    const endGame = () => {
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snakeHighScore', score.toString());
        }
    };

    // Game Tick
    const moveSnake = useCallback(() => {
        if (gameOver || !isPlaying) return;

        setSnake(prevSnake => {
            const head = prevSnake[0];
            const newHead = { ...head };

            switch (directionRef.current) {
                case 'UP': newHead.y -= 1; break;
                case 'DOWN': newHead.y += 1; break;
                case 'LEFT': newHead.x -= 1; break;
                case 'RIGHT': newHead.x += 1; break;
            }

            // Wall Collision
            if (
                newHead.x < 0 ||
                newHead.x >= GRID_SIZE ||
                newHead.y < 0 ||
                newHead.y >= GRID_SIZE
            ) {
                endGame();
                return prevSnake;
            }

            // Self Collision
            if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                endGame();
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Eat Food
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(s => s + 1);
                setFood(generateFood());
                setSpeed(s => Math.max(MIN_SPEED, s - SPEED_INCREMENT));
                // Don't pop tail
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [food, gameOver, isPlaying, generateFood]);

    // Game Loop
    useEffect(() => {
        if (isPlaying && !gameOver) {
            gameLoopRef.current = setInterval(moveSnake, speed);
        } else {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [isPlaying, gameOver, moveSnake, speed]);

    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent scrolling with arrows if playing
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && isPlaying) {
                e.preventDefault();
            }

            if (!isPlaying) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (directionRef.current !== 'DOWN') changeDirection('UP');
                    break;
                case 'ArrowDown':
                    if (directionRef.current !== 'UP') changeDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (directionRef.current !== 'RIGHT') changeDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (directionRef.current !== 'LEFT') changeDirection('RIGHT');
                    break;
            }
        };

        const changeDirection = (newDir: Direction) => {
            setDirection(newDir);
            directionRef.current = newDir;
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying]);

    // Touch Handling (Swipe)
    const touchStart = useRef<{ x: number, y: number } | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        // Prevent default touch behavior (scrolling) inside the game area
        // e.preventDefault(); // React synthetic events might not support this directly cleanly here without passive false
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart.current || !isPlaying) return;

        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };

        const dx = touchEnd.x - touchStart.current.x;
        const dy = touchEnd.y - touchStart.current.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal
            if (Math.abs(dx) > 30) { // Threshold
                if (dx > 0 && directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
                else if (dx < 0 && directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
                setDirection(directionRef.current);
            }
        } else {
            // Vertical
            if (Math.abs(dy) > 30) {
                if (dy > 0 && directionRef.current !== 'UP') directionRef.current = 'DOWN';
                else if (dy < 0 && directionRef.current !== 'DOWN') directionRef.current = 'UP';
                setDirection(directionRef.current);
            }
        }
        touchStart.current = null;
    };


    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-8 border border-white/10 rounded-3xl backdrop-blur-md bg-stone-900/40 shadow-2xl relative overflow-hidden">

            {/* Retro Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-3xl rounded-full pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between w-full mb-8 relative z-10">
                <div className="flex flex-col">
                    <span className="text-xs font-mono opacity-50 uppercase tracking-widest mb-1">{t.game.score}</span>
                    <span className="text-4xl font-bold font-mono text-accent drop-shadow-[0_0_10px_rgba(var(--accent),0.5)]">{score}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs font-mono opacity-50 uppercase tracking-widest mb-1">{t.game.highScore}</span>
                    <div className="flex items-center gap-2 text-stone-300">
                        <Trophy size={16} className="text-yellow-500" />
                        <span className="text-xl font-bold font-mono">{highScore}</span>
                    </div>
                </div>
            </div>

            {/* Game Board */}
            <div
                className="relative bg-black/80 rounded-xl overflow-hidden border border-white/10 shadow-[inner_0_0_40px_rgba(0,0,0,0.8)]"
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    aspectRatio: '1/1',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Grid Pattern Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                        backgroundSize: '5% 5%'
                    }}
                />

                {/* Overlay Game Over / Start */}
                {(!isPlaying || gameOver) && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-[4px]">
                        {gameOver && (
                            <div className="mb-6 text-center animate-in zoom-in duration-300">
                                <Bug className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                                <h3 className="text-3xl font-bold text-red-500 uppercase tracking-widest drop-shadow-md">{t.game.gameOver}</h3>
                            </div>
                        )}

                        <button
                            onClick={resetGame}
                            className="group relative bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-full font-bold tracking-wide flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(var(--accent),0.4)]"
                        >
                            {gameOver ? <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" /> : null}
                            {gameOver ? t.game.restart : t.game.start}

                            {/* Simple glow effect on button */}
                            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 animate-pulse" />
                        </button>
                    </div>
                )}

                {/* Grid Cells */}
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnakeHead = snake[0].x === x && snake[0].y === y;
                    const isSnakeBody = snake.some((s, idx) => idx !== 0 && s.x === x && s.y === y);
                    const isFood = food.x === x && food.y === y;

                    return (
                        <div
                            key={i}
                            className={clsx(
                                "relative w-full h-full flex items-center justify-center",
                                isSnakeHead && "z-10",
                            )}
                        >
                            {isSnakeHead && (
                                <div className="w-[90%] h-[90%] bg-accent rounded-sm shadow-[0_0_15px_rgba(var(--accent),0.8)] animate-pulse" />
                            )}
                            {isSnakeBody && (
                                <div className="w-[85%] h-[85%] bg-stone-400/80 rounded-[2px]" />
                            )}
                            {isFood && (
                                <Coffee size={16} className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)] animate-bounce" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Instructions */}
            <div className="mt-8 flex gap-6 text-sm opacity-50 font-mono relative z-10">
                <span className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white/10 rounded border border-white/5 shadow-sm">↑↓←→</kbd> to move
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px]">👆</span> Swipe
                </span>
            </div>
        </div>
    );
}
