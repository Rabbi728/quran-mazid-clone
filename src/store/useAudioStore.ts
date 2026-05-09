import { create } from "zustand";

interface AudioState {
    currentAyah: { surahId: number; verse: number; totalVerses: number; surahName: string } | null;
    isPlaying: boolean;
    duration: number;
    currentTime: number;
    setPlaying: (isPlaying: boolean) => void;
    playAyah: (surahId: number, verse: number, totalVerses: number, surahName: string) => void;
    updateProgress: (currentTime: number, duration: number) => void;
    stop: () => void;
    nextAyah: () => void;
    prevAyah: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
    currentAyah: null,
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    setPlaying: (isPlaying) => set({ isPlaying }),
    playAyah: (surahId, verse, totalVerses, surahName) => set({ 
        currentAyah: { surahId, verse, totalVerses, surahName }, 
        isPlaying: true,
        currentTime: 0 
    }),
    updateProgress: (currentTime, duration) => set({ currentTime, duration }),
    stop: () => set({ currentAyah: null, isPlaying: false, currentTime: 0, duration: 0 }),
    nextAyah: () => {
        const state = get();
        if (state.currentAyah && state.currentAyah.verse < state.currentAyah.totalVerses) {
            set({ 
                currentAyah: { ...state.currentAyah, verse: state.currentAyah.verse + 1 },
                isPlaying: true,
                currentTime: 0
            });
        }
    },
    prevAyah: () => {
        const state = get();
        if (state.currentAyah && state.currentAyah.verse > 1) {
            set({ 
                currentAyah: { ...state.currentAyah, verse: state.currentAyah.verse - 1 },
                isPlaying: true,
                currentTime: 0
            });
        }
    }
}));
