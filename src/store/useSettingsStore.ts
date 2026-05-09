import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ArabicFont } from "@/app/fonts";

interface SettingsState {
    arabicFont: ArabicFont;
    arabicFontSize: number;
    translationFontSize: number;
    transliterationFontSize: number;
    isSurahSidebarOpen: boolean;
    isSettingsOpen: boolean;
    selectedSurahId: number;
    updateSettings: (settings: Partial<Omit<SettingsState, "updateSettings" | "setSelectedSurahId" | "setSurahSidebarOpen" | "setSettingsOpen">>) => void;
    setSelectedSurahId: (id: number) => void;
    setSurahSidebarOpen: (isOpen: boolean) => void;
    setSettingsOpen: (isOpen: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            arabicFont: "amiri",
            arabicFontSize: 40,
            translationFontSize: 18,
            transliterationFontSize: 14,
            isSurahSidebarOpen: false,
            isSettingsOpen: false,
            selectedSurahId: 1,
            updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
            setSurahSidebarOpen: (isOpen) => set({ isSurahSidebarOpen: isOpen }),
            setSettingsOpen: (isOpen) => set({ isSettingsOpen: isOpen }),
            setSelectedSurahId: (id) => set({ selectedSurahId: id }),
        }),
        {
            name: "quran-settings",
            partialize: (state) => ({
                arabicFont: state.arabicFont,
                arabicFontSize: state.arabicFontSize,
                translationFontSize: state.translationFontSize,
                transliterationFontSize: state.transliterationFontSize,
            }),
        }
    )
);
