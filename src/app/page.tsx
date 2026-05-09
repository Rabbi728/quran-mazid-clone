import { SurahSidebar } from "@/components/SurahSidebar";
import { IconSidebar } from "@/components/IconSidebar";
import { AyahView } from "@/components/AyahView";
import { SettingsPanel } from "@/components/SettingsPanel";
import { TopHeader } from "@/components/TopHeader";

async function getSurahData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs/${id}/ayats`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) return null;
  const result = await res.json();
  return result.success ? result.data : null;
}

export default async function Home() {
  const initialData = await getSurahData("1");

  return (
    <div className="flex min-h-screen bg-[#090909]">  
      <IconSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <TopHeader />
        <div className="flex flex-1 min-h-0">
          <SurahSidebar />
          <AyahView initialData={initialData} />
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
}