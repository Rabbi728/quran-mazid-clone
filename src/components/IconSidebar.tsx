import { BookOpen, Home, Users, Send, Bookmark, LayoutGrid } from "lucide-react";

const iconItems = [
  { src: '/home.svg', label: "Home" },
  { src: '/read.svg', label: "Read"  },
  { src: '/ayat.svg', label: "Ayat" },
  { src: '/bookmark.svg', label: "Bookmarks" },
  { src: '/others.svg', label: "More" },
];

export function IconSidebar() {
  return (
    <aside className="hidden lg:flex w-[3.6rem] border-r border-[#1a1a1a] bg-[#0e0e0e] flex-col items-center h-screen sticky top-0 shrink-0">
      <div className="w-10 h-10 rounded-xl bg-[#44633f] flex items-center justify-center mt-3 mb-8 shadow-sm">
        <img src="/quran.svg" alt="Quran" className="brightness-0 invert" />
      </div>

      <div className="flex flex-col items-center gap-6 flex-1 justify-center">
        {iconItems.map((item) => (
          <button
            key={item.label}
            title={item.label}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-600 hover:text-primary hover:bg-primary/5 transition-all group"
          >
            <img 
              src={item.src} 
              alt={item.label} 
              className="h-5 w-5 transition-transform group-hover:scale-110 invert opacity-70 group-hover:opacity-100" 
            />
          </button>
        ))}
      </div>
      
      <div className="mb-8">
         <div className="w-10 h-10 rounded-full bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-zinc-600">
           AZ
         </div>
      </div>
    </aside>
  );
}