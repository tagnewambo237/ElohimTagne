'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-sm font-medium"
            aria-label="Toggle language"
        >
            <Globe className="w-3.5 h-3.5 opacity-60" />
            <span className="relative top-[1px]">{language.toUpperCase()}</span>
        </button>
    );
}
