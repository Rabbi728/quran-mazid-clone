"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSettingsStore } from '@/store/useSettingsStore';
import { getArabicFontClass } from '@/app/fonts';
import { Search, X, Loader2, BookOpen } from 'lucide-react';
import { useParams } from 'next/navigation';

interface SearchResult {
    chapter: number;
    verse: number;
    text: string;
    translation: string;
    transliteration: string;
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const { arabicFont } = useSettingsStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const params = useParams();
    const currentSurahId = params.id ? parseInt(params.id as string) : null;
    const arabicFontClass = getArabicFontClass(arabicFont);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                if (data.success) {
                    setResults(data.data);
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    if (!isOpen) return null;

    const handleResultClick = (result: SearchResult) => {
        onClose();
        if (currentSurahId === result.chapter) {
            setTimeout(() => {
                const element = document.getElementById(result.verse.toString());
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" onClick={onClose} />
            
            <div className="relative w-full max-w-2xl bg-[#0e0e0e] border border-[#1a1a1a] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300">
                <div className="p-4 border-b border-[#1a1a1a] flex items-center gap-4">
                    <Search className="h-5 w-5 text-zinc-500" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for ayats, translations..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-emerald-50 placeholder:text-zinc-600 text-lg py-2"
                    />
                    {loading ? (
                        <Loader2 className="h-5 w-5 text-emerald-500 animate-spin" />
                    ) : (
                        <button onClick={onClose} className="p-2 hover:bg-[#1a1a1a] rounded-xl transition-colors">
                            <X className="h-5 w-5 text-zinc-500" />
                        </button>
                    )}
                </div>

                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {query.trim() === "" ? (
                        <div className="p-20 text-center space-y-4">
                            <div className="w-16 h-16 bg-[#161616] rounded-2xl flex items-center justify-center mx-auto">
                                <Search className="h-8 w-8 text-zinc-700" />
                            </div>
                            <p className="text-zinc-500 text-sm font-medium">Search the entire Quran in seconds</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="p-2 space-y-1">
                            {results.map((result, idx) => (
                                <Link 
                                    key={idx}
                                    href={`/${result.chapter}#${result.verse}`}
                                    onClick={() => handleResultClick(result)}
                                    className="flex flex-col p-5 hover:bg-emerald-500/[0.03] rounded-2xl transition-all border border-transparent hover:border-emerald-500/10 group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                                                Surah {result.chapter}:{result.verse}
                                            </span>
                                        </div>
                                        <p className={`text-right text-xl text-emerald-50/90 leading-loose ${arabicFontClass}`} dir="rtl">
                                            {result.text}
                                        </p>
                                    </div>
                                    <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 line-clamp-2">
                                        {result.translation}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : !loading ? (
                        <div className="p-20 text-center space-y-4">
                            <div className="w-16 h-16 bg-[#161616] rounded-2xl flex items-center justify-center mx-auto">
                                <BookOpen className="h-8 w-8 text-zinc-700" />
                            </div>
                            <p className="text-zinc-500 text-sm font-medium">No results found for "{query}"</p>
                        </div>
                    ) : null}
                </div>

                <div className="p-4 bg-[#0a0a0a] border-t border-[#1a1a1a] flex justify-between items-center px-6">
                    <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5">
                            <kbd className="px-2 py-0.5 rounded bg-[#161616] text-[10px] text-zinc-500 font-sans border border-[#222]">ESC</kbd>
                            <span className="text-[10px] text-zinc-600">to close</span>
                         </div>
                    </div>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Search Quran</p>
                </div>
            </div>
        </div>
    );
}
