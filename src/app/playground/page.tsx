'use client';

import { useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/ui/TextReveal";
import SnakeGame from "@/components/game/SnakeGame";
import CoffeeDuel from "@/components/game/CoffeeDuel";
import { useLanguage } from '@/context/LanguageContext';
import CoffeeAccent from "@/components/ui/CoffeeAccent";
import clsx from 'clsx';
import { Gamepad2, Hand } from 'lucide-react';

export default function PlaygroundPage() {
    const { t } = useLanguage();
    const [activeGame, setActiveGame] = useState<'snake' | 'duel'>('snake');

    return (
        <main className="w-full min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            <section className="flex-grow pt-32 md:pt-48 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col items-center">
                <div className="text-center mb-12">
                    <span className="font-mono text-sm tracking-widest uppercase opacity-60 mb-4 block">Playground</span>
                    <TextReveal className="text-5xl md:text-7xl font-semibold tracking-tighter mb-4 justify-center flex">
                        {activeGame === 'snake' ? t.game.title : "Chifoumi"}
                    </TextReveal>
                    <p className="text-xl md:text-2xl opacity-60 font-light max-w-2xl mx-auto mb-8">
                        {activeGame === 'snake' ? t.game.subtitle : "Pierre, Feuille, Ciseaux."}
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-xl mx-auto backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                        <p className="font-mono text-sm md:text-base italic opacity-80 leading-relaxed">
                            "{t.game.message}"
                        </p>
                        <span className="block mt-2 text-xs font-bold uppercase tracking-widest text-accent">- Elohim</span>
                    </div>
                </div>

                {/* Game Switcher */}
                <div className="flex gap-4 mb-12 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                    <button
                        onClick={() => setActiveGame('snake')}
                        className={clsx(
                            "flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all",
                            activeGame === 'snake' ? "bg-accent text-white shadow-lg shadow-accent/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <Gamepad2 size={18} /> Code Snake
                    </button>
                    <button
                        onClick={() => setActiveGame('duel')}
                        className={clsx(
                            "flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all",
                            activeGame === 'duel' ? "bg-accent text-white shadow-lg shadow-accent/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                        )}
                    >
                        <Hand size={18} /> Chifoumi
                    </button>
                </div>

                <div className="w-full mb-12">
                    {activeGame === 'snake' ? <SnakeGame /> : <CoffeeDuel />}
                </div>

                <div className="py-12">
                    <CoffeeAccent />
                </div>
            </section>

            <Footer />
        </main>
    );
}
