import { SurahSidebar } from "@/components/SurahSidebar";
import { IconSidebar } from "@/components/IconSidebar";
import { AyahView } from "@/components/AyahView";
import { SettingsPanel } from "@/components/SettingsPanel";
import { TopHeader } from "@/components/TopHeader";

interface Props {
  params: {
    id: string;
  };
}


export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs`);
  const result = await res.json();
  const surahs = result.success ? result.data : result;

  return surahs.map((surah: any) => ({
    id: surah.id.toString(),
  }));
}

async function getSurahData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs/${id}/ayats`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) return null;
  const result = await res.json();
  return result.success ? result.data : null;
}

export default async function SurahPage({ params }: Props) {
  const initialData = await getSurahData(params.id);

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