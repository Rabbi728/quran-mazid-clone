"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Copy, Bookmark, MoreHorizontal } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useAudioStore } from "@/store/useAudioStore";
import { getArabicFontClass } from "@/app/fonts";
import { useParams } from "next/navigation";

interface Ayah {
  verse: number;
  chapter: number;
  text: string;
  transliteration: string;
  translation: string;
}

interface SurahData {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  ayats: Ayah[];
}

interface AyahViewProps {
  initialData?: SurahData | null;
}

export function AyahView({ initialData }: AyahViewProps) {
  const { arabicFont, arabicFontSize, translationFontSize, setSelectedSurahId } = useSettingsStore();
  const { currentAyah, isPlaying, playAyah, setPlaying } = useAudioStore();
  const [surahData, setSurahData] = useState<SurahData | null>(initialData || null);
  const [loading, setLoading] = useState(false);
  
  const params = useParams();
  const surahIdFromUrl = params.id ? parseInt(params.id as string) : 1;

  const arabicFontClass = getArabicFontClass(arabicFont);

  useEffect(() => {
    async function fetchAyahs() {
      if (!surahIdFromUrl) return;
      

      setSelectedSurahId(surahIdFromUrl);
      

      if (surahData?.id === surahIdFromUrl) return;

      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs/${surahIdFromUrl}/ayats`);
        if (!res.ok) throw new Error("Failed to fetch ayahs");
        const result = await res.json();
        if (result.success) {
          setSurahData(result.data);
        }
      } catch (error) {
        console.error("Error fetching ayahs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAyahs();
  }, [surahIdFromUrl, setSelectedSurahId, surahData?.id]);

  const toArabicDigits = (n: number | string) =>
    String(n).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

  if (loading && !surahData) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen bg-[#090909]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!surahData) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen bg-[#090909] text-zinc-500">
        Select a surah to view ayahs
      </div>
    );
  }

  const handlePlayAyah = (verse: number) => {
    if (currentAyah?.surahId === surahData.id && currentAyah?.verse === verse) {
        setPlaying(!isPlaying);
    } else {
        playAyah(surahData.id, verse, surahData.total_verses, surahData.transliteration);
    }
  };

  return (
    <div className={`flex-1 min-w-0 overflow-y-auto h-screen bg-[#090909] custom-scrollbar ${currentAyah ? 'pb-32' : ''}`}>

      <div className="relative py-14 border-b border-[#1a1a1a] flex flex-col items-center justify-center text-center px-10">

        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:block">
           <img 
             src={surahData.type.toLowerCase().includes('medinan') ? "/madinah.webp" : "/makkah.webp"} 
             alt={surahData.type} 
             className="h-[100px] w-auto object-contain invert sepia hue-rotate-[179deg] mix-blend-difference" 
           />
        </div>


        <div className="z-10">
          <h2 className="text-3xl font-bold text-emerald-50 mb-2">Surah {surahData.transliteration}</h2>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-medium">
            Ayah-{surahData.total_verses}, {surahData.type}
          </p>
        </div>


        {![1, 9].includes(surahData.id) && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-60">
            <img src="/bismillah.svg" alt="Bismillah" className="h-[60px] w-auto invert brightness-200" />
          </div>
        )}
      </div>


      <div className="max-w-6xl mx-auto px-10 py-12">
        {surahData.ayats.map((ayah) => {
          const isCurrentAyah = currentAyah?.surahId === surahData.id && currentAyah?.verse === ayah.verse;
          return (
            <div 
                key={ayah.verse} 
                id={ayah.verse.toString()}
                className={`py-14 border-b border-[#1a1a1a] last:border-0 transition-colors duration-500 ${isCurrentAyah ? 'bg-emerald-500/[0.03]' : ''}`}
            >
              <div className="flex items-start gap-12">

                <div className="flex flex-col items-center gap-6 pt-1 w-12 shrink-0">
                  <span className={`text-sm font-bold tracking-tighter transition-colors ${isCurrentAyah ? 'text-emerald-400' : 'text-emerald-500'}`} style={{ fontFamily: 'AyatNo, sans-serif' }}>
                    {surahData.id}:{ayah.verse}
                  </span>
                  <div className="flex flex-col gap-6 text-zinc-600">
                    <button 
                      onClick={() => handlePlayAyah(ayah.verse)}
                      className={`transition-all ${isCurrentAyah && isPlaying ? 'text-emerald-500 scale-110' : 'hover:text-emerald-500'}`} 
                      title={isCurrentAyah && isPlaying ? "Pause" : "Play"}
                    >
                      {isCurrentAyah && isPlaying ? <Pause className="h-[18px] w-[18px]" /> : <Play className="h-[18px] w-[18px]" />}
                    </button>
                    <button className="hover:text-emerald-500 transition-colors" title="Copy">
                      <Copy className="h-[18px] w-[18px]" />
                    </button>
                    <button className="hover:text-emerald-500 transition-colors" title="Bookmark">
                      <Bookmark className="h-[18px] w-[18px]" />
                    </button>
                    <button className="hover:text-emerald-500 transition-colors" title="More">
                      <MoreHorizontal className="h-[18px] w-[18px]" />
                    </button>
                  </div>
                </div>


                <div className="flex-1 space-y-12">

                  <div className="flex flex-col items-end">
                    <p
                      className={`text-right leading-[2.5] text-emerald-50/95 tracking-normal transition-colors ${arabicFontClass} ${isCurrentAyah ? 'text-emerald-50' : ''}`}
                      style={{
                        fontSize: `${arabicFontSize}px`,
                        lineHeight: '2.5'
                      }}
                      dir="rtl"
                    >
                      {ayah.text}
                      <span className={`text-[1.4em] mr-6 inline-block align-middle select-none transition-colors ${isCurrentAyah ? 'text-emerald-400' : 'text-gray-300'}`} style={{ fontFamily: 'AyatNo, sans-serif' }}>
                        {toArabicDigits(ayah.verse)}
                      </span>
                    </p>
                  </div>


                  <div className="space-y-4">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-700 uppercase">
                      Sahih International
                    </p>
                    <p
                      className={`leading-[1.8] font-normal transition-colors ${isCurrentAyah ? 'text-zinc-200' : 'text-zinc-400'}`}
                      style={{ fontSize: `${translationFontSize}px` }}
                    >
                      {ayah.translation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}