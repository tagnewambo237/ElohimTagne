'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer id="contact" className="bg-gray-900 dark:bg-gray-950 text-white py-24 px-6 md:px-12 rounded-t-[3rem] relative z-10 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[60vh]">

                <div className="flex flex-col gap-8">
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-none">
                        {t.footer.title.split(' ')[0]} <br />
                        <span className="text-gray-500 dark:text-gray-400">{t.footer.title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 mt-12">
                        <a href="mailto:juniortagne2001@gmail.com" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-gray-900 transition-all text-xl">
                            juniortagne2001@gmail.com
                        </a>
                        <a href="tel:+237694656790" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-gray-900 transition-all text-xl">
                            +237 694 656 790
                        </a>
                    </div>
                    <p className="mt-4 opacity-60">📍 {t.about.location}</p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-24">
                    <div className="flex gap-8 text-sm text-gray-400">
                        <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            &copy; 2025 Elohim Junior Tagne Wambo. <br />
                            {t.footer.rights}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-500">
                            {t.footer.crafted}
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
