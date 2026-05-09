"use client";

import { useState } from "react";
import { X, Type, Languages, ChevronDown, Settings2 } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";

export function SettingsPanel() {
  const { 
    arabicFont, 
    arabicFontSize, 
    translationFontSize, 
    updateSettings,
    isSettingsOpen,
    setSettingsOpen
  } = useSettingsStore();

  const [fontOpen, setFontOpen] = useState(true);

  const panelContent = (
    <aside className="w-80 border-l lg:border-l-0 lg:border-l border-[#1a1a1a] bg-[#0e0e0e] h-screen sticky top-0 overflow-y-auto font-sans custom-scrollbar">
      <div className="flex items-center justify-between px-6 pt-6 lg:hidden">
        <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Settings</h2>
        <button onClick={() => setSettingsOpen(false)} className="p-2 text-zinc-500 hover:text-emerald-500">
           <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6 space-y-10">
        <div className="flex rounded-xl bg-[#161616] p-1 gap-1 shadow-inner">
          {(["Translation", "Reading"] as const).map((view) => (
            <button
              key={view}
              className={`flex-1 text-[10px] py-2.5 rounded-lg font-bold uppercase tracking-[0.2em] transition-all ${
                view === "Translation"
                  ? "bg-[#222] text-emerald-500 shadow-sm"
                  : "text-zinc-600 hover:text-emerald-400"
              }`}
            >
              {view}
            </button>
          ))}
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between text-emerald-50/90 group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/5 text-emerald-500">
                <Languages className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Mushaf Mode</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div 
            onClick={() => setFontOpen(!fontOpen)}
            className="flex items-center justify-between text-emerald-50/90 group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/5 text-emerald-500">
                <Type className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Typography</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-zinc-600 transition-transform duration-300 ${fontOpen ? 'rotate-180' : ''}`} />
          </div>

          {fontOpen && (
            <div className="space-y-10 pl-1 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Arabic Size</label>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">{arabicFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={arabicFontSize}
                    onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                    className="w-full h-1 bg-[#161616] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Translation Size</label>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">{translationFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="40"
                    value={translationFontSize}
                    onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
                    className="w-full h-1 bg-[#161616] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Arabic Font Face
                </label>
                <div className="relative">
                   <select 
                     value={arabicFont}
                     onChange={(e) => updateSettings({ arabicFont: e.target.value as any })}
                     className="w-full bg-[#161616] border border-[#1a1a1a] rounded-xl px-4 py-3 text-sm text-emerald-50 appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                   >
                     <option value="amiri">Amiri</option>
                     <option value="scheherazade">Scheherazade</option>
                     <option value="changa">Changa</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-20 pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Panel */}
      <div className="hidden lg:flex">
        {panelContent}
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isSettingsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSettingsOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-80 transform transition-transform duration-300 ease-in-out ${isSettingsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {panelContent}
        </div>
      </div>
    </>
  );
}