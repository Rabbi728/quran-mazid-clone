"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSettingsStore } from "@/store/useSettingsStore";
import { getArabicFontClass } from "@/app/fonts";

export default function Ayats({ surahData, id }: { surahData: any, id: string }) {
    const {
        arabicFont,
        arabicFontSize,
        translationFontSize,
        transliterationFontSize,
        toggleSidebar
    } = useSettingsStore();

    const arabicFontClass = getArabicFontClass(arabicFont);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <div className="bg-emerald-700 text-white shadow-lg sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-bold hidden sm:block">All Surahs</span>
                    </Link>

                    <div className="text-center font-sans">
                        <h1 className="text-xl font-bold">{surahData.transliteration}</h1>
                        <p className="text-[10px] uppercase opacity-70 font-bold tracking-widest">Surah {id} • {surahData.total_verses} Verses</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-2xl font-amiri hidden sm:block">{surahData.name}</div>
                        <button
                            onClick={toggleSidebar}
                            className="p-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-inner"
                            title="Page Settings"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {id !== "9" && (
                    <div className="mb-12 py-12 text-center">
                        <div className="flex flex-col items-center gap-6">
                            <div className="text-emerald-700/20">
                                <svg width="60" height="30" viewBox="0 0 100 50" fill="currentColor">
                                    <path d="M50 0 C60 20 100 25 50 50 C0 25 40 20 50 0 Z" />
                                </svg>
                            </div>

                            <div className="space-y-4">
                                <h2
                                    className={`leading-relaxed text-slate-800 ${arabicFontClass}`}
                                    style={{ fontSize: `${arabicFontSize * 1.1}px`, direction: 'rtl' }}
                                >
                                    بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                                </h2>

                                <div className="space-y-1 font-sans">
                                    <p className="text-emerald-700 font-bold italic text-sm tracking-wide"
                                        style={{ fontSize: `${transliterationFontSize}px` }}
                                    >
                                        Bismillaahir Rahmaanir Raheem
                                    </p>
                                    <p
                                        className="text-slate-500 text-sm font-medium"
                                        style={{ fontSize: `${translationFontSize}px` }}
                                    >
                                        In the name of Allah, the Entirely Merciful, the Especially Merciful.
                                    </p>
                                </div>
                            </div>

                            <div className="text-emerald-700/20 rotate-180">
                                <svg width="60" height="30" viewBox="0 0 100 50" fill="currentColor">
                                    <path d="M50 0 C60 20 100 25 50 50 C0 25 40 20 50 0 Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-6 pb-20">
                    {surahData.ayats.map((ayat: any) => (
                        <div 
                            key={ayat.verse} 
                            id={`verse-${ayat.verse}`} 
                            className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all group overflow-hidden relative scroll-mt-24"
                        >
                            <div className="flex flex-col items-end w-full">
                                <div className="w-full flex justify-between items-start mb-10">
                                    <div className="bg-slate-50 text-slate-400 px-3 py-1 rounded-xl text-[10px] font-bold border border-slate-100 uppercase tracking-widest group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-all font-sans">
                                        {ayat.chapter}:{ayat.verse}
                                    </div>
                                    <p
                                        className={`leading-[2] text-slate-900 pr-2 text-right ${arabicFontClass}`}
                                        dir="rtl"
                                        style={{ fontSize: `${arabicFontSize}px` }}
                                    >
                                        {ayat.text}
                                    </p>
                                </div>

                                <div className="w-full space-y-5 pt-8 border-t border-slate-50 font-sans">
                                    <p className="text-emerald-700 font-bold italic text-sm tracking-wide" style={{ fontSize: `${transliterationFontSize}px` }}>{ayat.transliteration}</p>
                                    <p
                                        className="text-slate-700 leading-relaxed font-medium"
                                        style={{ fontSize: `${translationFontSize}px` }}
                                    >
                                        {ayat.translation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4 font-sans">
                    {parseInt(id) > 1 && <Link 
                        href={`/surah/${parseInt(id) - 1}`}
                        className={`w-full sm:flex-1 px-8 py-5 bg-white text-slate-600 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm text-center ${parseInt(id) <= 1 ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        Previous Surah
                    </Link>}
                    {parseInt(id) < 114 && <Link 
                        href={`/surah/${parseInt(id) + 1}`}
                        className={`w-full sm:flex-1 px-8 py-5 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-700/20 active:scale-95 text-center ${parseInt(id) >= 114 ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        Next Surah
                    </Link>}
                </div>
            </main>

            <footer className="py-16 text-center text-slate-300 text-[10px] font-bold tracking-[0.3em] uppercase font-sans">
                End of Reading
            </footer>
        </div>
    );
}
