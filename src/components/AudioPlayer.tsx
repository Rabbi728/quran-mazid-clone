"use client";

import { useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, X, MoreHorizontal } from "lucide-react";
import { useAudioStore } from "@/store/useAudioStore";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { 
    currentAyah, 
    isPlaying, 
    currentTime, 
    duration, 
    setPlaying, 
    updateProgress, 
    stop, 
    nextAyah, 
    prevAyah 
  } = useAudioStore();

  useEffect(() => {
    if (!currentAyah) return;

    const surahStr = currentAyah.surahId.toString().padStart(3, '0');
    const verseStr = currentAyah.verse.toString().padStart(3, '0');
    const url = `https://raw.githubusercontent.com/semarketir/quranjson/master/source/audio/${surahStr}/${verseStr}.mp3`;

    if (audioRef.current) {
      audioRef.current.src = url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
    }
  }, [currentAyah]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      updateProgress(audioRef.current.currentTime, audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    if (currentAyah && currentAyah.verse < currentAyah.totalVerses) {
        nextAyah();
    } else {
        setPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentAyah) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-[#1a1a1a] shadow-[0_-10px_40px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom duration-300">

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-800 cursor-pointer group">
        <div 
          className="h-full bg-emerald-500 relative transition-all duration-200" 
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        >
          <div className="absolute right-[-4px] top-[-3px] h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleEnded}
      />
      
      <div className="max-w-screen-2xl mx-auto flex items-center px-6 py-5">
        <div className="flex-1 flex items-center">
          <p className="text-emerald-500/80 font-bold text-sm tracking-tight">
            {currentAyah.surahName} : {currentAyah.verse}
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center gap-6">
          <button 
            onClick={prevAyah}
            disabled={currentAyah.verse === 1}
            className="text-zinc-500 hover:text-emerald-500 disabled:opacity-20 transition-colors"
          >
            <SkipBack className="h-5 w-5 fill-current" />
          </button>
          
          <button 
            onClick={() => setPlaying(!isPlaying)}
            className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center text-black border-[3px] border-[#0a0a0a] ring-1 ring-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current ml-0.5" />
            )}
          </button>

          <button 
            onClick={nextAyah}
            disabled={currentAyah.verse === currentAyah.totalVerses}
            className="text-zinc-500 hover:text-emerald-500 disabled:opacity-20 transition-colors"
          >
            <SkipForward className="h-5 w-5 fill-current" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-end gap-6">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 tabular-nums font-medium">
            <span>{formatTime(currentTime)}</span>
            <span className="opacity-30">/</span>
            <span>{formatTime(duration)}</span>
          </div>

          <button className="text-zinc-600 hover:text-zinc-400 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>

          <button 
            onClick={stop}
            className="text-zinc-600 hover:text-red-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
