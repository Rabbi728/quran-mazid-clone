"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useParams, useRouter } from "next/navigation";

interface Surah {
    id: number;
    name: string;
    transliteration: string;
    translation: string;
    type: string;
    total_verses: number;
}

type Tab = "Surah" | "Juz" | "Page";

export function SurahSidebar() {
  const { isSurahSidebarOpen, setSurahSidebarOpen, setSelectedSurahId } = useSettingsStore();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Surah");
  const [search, setSearch] = useState("");
  
  const params = useParams();
  const router = useRouter();
  
  const currentSurahId = params.id ? parseInt(params.id as string) : 1;

  useEffect(() => {
    async function getSurahs() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs`, {
          cache: "force-cache",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch surahs");
        }

        const result = await res.json();
        const data = result.success ? result.data : result;
        setSurahs(data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      }
    }
    getSurahs();
  }, []);

  const handleSurahClick = (id: number) => {
    setSelectedSurahId(id);
    setSurahSidebarOpen(false); // Close drawer on selection
    router.push(`/${id}`);
  };

  const filtered = surahs.filter(
    (s) =>
      s.transliteration.toLowerCase().includes(search.toLowerCase()) ||
      s.translation.toLowerCase().includes(search.toLowerCase()) ||
      s.name.includes(search)
  );

  const sidebarContent = (
    <aside className={`w-80 border-r border-[#1a1a1a] bg-[#050505] flex flex-col flex-shrink-0 overflow-hidden h-full`}>
      <div className="flex items-center justify-between px-5 pt-6 lg:hidden">
        <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Surahs</h2>
        <button onClick={() => setSurahSidebarOpen(false)} className="p-2 text-zinc-500 hover:text-emerald-500">
           <X className="h-5 w-5" />
        </button>
      </div>

      <div className="px-5 pt-6 pb-4">
        <div className="flex rounded-xl bg-[#161616] p-1 gap-1">
          {(["Surah", "Juz", "Page"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-[10px] py-2 rounded-lg font-bold uppercase tracking-[0.2em] transition-all ${
                activeTab === tab
                  ? "bg-[#222] text-emerald-500 shadow-sm"
                  : "text-zinc-600 hover:text-emerald-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-700" />
          <input
            type="text"
            placeholder="Search Surah"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-[#1a1a1a] bg-[#161616] text-emerald-50 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-6 custom-scrollbar">
        {filtered.map((surah) => (
          <button
            key={surah.id}
            onClick={() => handleSurahClick(surah.id)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all group ${
              currentSurahId === surah.id
                ? "bg-emerald-500/5 border border-emerald-500/10"
                : "hover:bg-[#161616] border border-transparent"
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-lg rotate-45 text-[10px] font-bold transition-all ${
                currentSurahId === surah.id
                  ? "bg-[#44633f] text-white"
                  : "bg-[#1a1a1a] text-zinc-600 group-hover:bg-[#222]"
              }`}
            >
              <span className="-rotate-45">{surah.id}</span>
            </div>
            <div className="flex-1 min-w-0 ml-1">
              <p className="text-[0.95rem] font-bold truncate transition-colors text-gray-300">
                {surah.transliteration}
              </p>
              <p className="truncate uppercase tracking-tight font-medium mt-0.5 text-[0.7rem] text-gray-400">
                {surah.translation}
              </p>
            </div>
            <span className="text-lg font-arabic transition-all text-gray-300">
              {surah.name}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        {sidebarContent}
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isSurahSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSurahSidebarOpen(false)} />
        <div className={`absolute left-0 top-0 bottom-0 w-80 transform transition-transform duration-300 ease-in-out ${isSurahSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {sidebarContent}
        </div>
      </div>
    </>
  );
}