'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Trophy, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

type Choice = 'ROCK' | 'PAPER' | 'SCISSORS';
type GameResult = 'WIN' | 'LOSE' | 'DRAW' | null;

const CHOICES: { id: Choice; emoji: string; label: string; beats: Choice }[] = [
    { id: 'ROCK', emoji: '✊', label: 'Pierre', beats: 'SCISSORS' },
    { id: 'PAPER', emoji: '✋', label: 'Feuille', beats: 'ROCK' },
    { id: 'SCISSORS', emoji: '✌️', label: 'Ciseaux', beats: 'PAPER' },
];

export default function CoffeeDuel() {
    const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
    const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
    const [result, setResult] = useState<GameResult>(null);
    const [score, setScore] = useState({ player: 0, computer: 0 });
    const [isRevealing, setIsRevealing] = useState(false);
    const [streak, setStreak] = useState(0);

    const getComputerChoice = (): Choice => {
        const choices: Choice[] = ['ROCK', 'PAPER', 'SCISSORS'];
        return choices[Math.floor(Math.random() * choices.length)];
    };

    const determineWinner = (player: Choice, computer: Choice): GameResult => {
        if (player === computer) return 'DRAW';
        const playerData = CHOICES.find(c => c.id === player);
        if (playerData?.beats === computer) return 'WIN';
        return 'LOSE';
    };

    const playRound = (choice: Choice) => {
        if (isRevealing) return;

        setPlayerChoice(choice);
        setIsRevealing(true);

        // Simulate suspense
        setTimeout(() => {
            const aiChoice = getComputerChoice();
            setComputerChoice(aiChoice);

            const roundResult = determineWinner(choice, aiChoice);
            setResult(roundResult);

            if (roundResult === 'WIN') {
                setScore(prev => ({ ...prev, player: prev.player + 1 }));
                setStreak(prev => prev + 1);
            } else if (roundResult === 'LOSE') {
                setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
                setStreak(0);
            }

            setIsRevealing(false);
        }, 800);
    };

    const resetGame = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
    };

    const getChoiceData = (choice: Choice | null) => CHOICES.find(c => c.id === choice);

    return (
        <div className="w-full max-w-2xl mx-auto p-1 relative">
            <div className="relative bg-neutral-900 border-2 border-white/20 text-white overflow-hidden shadow-2xl rounded-2xl flex flex-col">

                {/* Header: Score */}
                <div className="relative z-10 flex justify-between items-center p-6 border-b border-white/10">
                    <div className="text-center">
                        <span className="text-xs uppercase tracking-widest opacity-60 block mb-1">Toi</span>
                        <span className="text-4xl font-black text-accent">{score.player}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-lg font-bold uppercase tracking-widest">Chifoumi</h2>
                        {streak > 1 && (
                            <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                                <Trophy size={12} /> {streak} wins
                            </div>
                        )}
                    </div>

                    <div className="text-center">
                        <span className="text-xs uppercase tracking-widest opacity-60 block mb-1">Ordi</span>
                        <span className="text-4xl font-black text-red-500">{score.computer}</span>
                    </div>
                </div>

                {/* Battle Arena */}
                <div className="flex-1 p-8 flex flex-col items-center justify-center min-h-[250px] relative">

                    {/* Idle State */}
                    {!playerChoice && !isRevealing && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <Hand size={48} className="mx-auto mb-4 opacity-30" />
                            <p className="text-lg opacity-60">Fais ton choix !</p>
                        </motion.div>
                    )}

                    {/* Revealing State */}
                    {isRevealing && (
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="text-8xl"
                        >
                            🤜🤛
                        </motion.div>
                    )}

                    {/* Result Display */}
                    <AnimatePresence>
                        {result && !isRevealing && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="text-center"
                            >
                                {/* Choices Display */}
                                <div className="flex items-center justify-center gap-8 mb-6">
                                    <div className="flex flex-col items-center">
                                        <span className="text-6xl mb-2">{getChoiceData(playerChoice)?.emoji}</span>
                                        <span className="text-xs uppercase tracking-widest opacity-60">Toi</span>
                                    </div>
                                    <span className="text-2xl font-black opacity-30">VS</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-6xl mb-2">{getChoiceData(computerChoice)?.emoji}</span>
                                        <span className="text-xs uppercase tracking-widest opacity-60">Ordi</span>
                                    </div>
                                </div>

                                {/* Result Text */}
                                <h3 className={clsx(
                                    "text-4xl font-black uppercase tracking-tighter italic",
                                    result === 'WIN' && "text-accent",
                                    result === 'LOSE' && "text-red-500",
                                    result === 'DRAW' && "text-white/50"
                                )}>
                                    {result === 'WIN' && "Gagné ! 🎉"}
                                    {result === 'LOSE' && "Perdu ! 💀"}
                                    {result === 'DRAW' && "Égalité !"}
                                </h3>

                                <button
                                    onClick={resetGame}
                                    className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium flex items-center gap-2 mx-auto transition-all"
                                >
                                    <RefreshCw size={14} /> Rejouer
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Choice Buttons */}
                <div className="p-6 border-t border-white/10 bg-black/30">
                    <div className="grid grid-cols-3 gap-4">
                        {CHOICES.map((choice) => (
                            <button
                                key={choice.id}
                                onClick={() => playRound(choice.id)}
                                disabled={isRevealing || result !== null}
                                className={clsx(
                                    "p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all",
                                    "hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed",
                                    playerChoice === choice.id
                                        ? "bg-accent/20 border-accent"
                                        : "bg-white/5 border-white/10 hover:border-white/30"
                                )}
                            >
                                <span className="text-4xl mb-2">{choice.emoji}</span>
                                <span className="text-xs uppercase tracking-widest font-bold">{choice.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
