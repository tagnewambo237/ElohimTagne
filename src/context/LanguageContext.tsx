'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/data/translations';

type Language = 'fr' | 'en';
type Translations = typeof translations.fr;

interface LanguageContextType {
    language: Language;
    t: Translations;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('fr');
    const [t, setT] = useState<Translations>(translations.fr);

    useEffect(() => {
        // Load preference from localStorage if available
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
            setLanguage(savedLang);
            setT(translations[savedLang]);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        setT(translations[lang]);
        localStorage.setItem('language', lang);
    };

    const toggleLanguage = () => {
        const newLang = language === 'fr' ? 'en' : 'fr';
        handleSetLanguage(newLang);
    };

    return (
        <LanguageContext.Provider value={{ language, t, setLanguage: handleSetLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
