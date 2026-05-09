"use client";

import { Search, Menu, Settings2 } from "lucide-react";
import { useState } from "react";
import SearchModal from "./SearchModal";
import { useSettingsStore } from "@/store/useSettingsStore";

export function TopHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setSurahSidebarOpen, setSettingsOpen } = useSettingsStore();

  return (
    <>
      <div className="flex items-center justify-between px-4 lg:px-8 py-3 border-b border-[#1a1a1a] bg-[#090909] shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSurahSidebarOpen(true)}
            className="lg:hidden p-2 text-zinc-400 hover:text-emerald-500 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-lg lg:text-xl font-bold text-gray-300 font-sans leading-none">Quran Mazid</h1>
            <p className="hidden xs:block text-[9px] lg:text-[10px] text-gray-400 font-medium mt-1">Read, Study, and Learn the Quran</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-400 hover:text-gray-300 transition-colors p-2 hover:bg-[#111] rounded-xl"
          >
            <Search className="h-5 w-5" />
          </button>

          <button 
            onClick={() => setSettingsOpen(true)}
            className="lg:hidden text-gray-400 hover:text-gray-300 transition-colors p-2 hover:bg-[#111] rounded-xl"
          >
            <Settings2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}