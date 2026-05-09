import type { Metadata } from "next";
import "./globals.css";
import { AudioPlayer } from "@/components/AudioPlayer";

export const metadata: Metadata = {
  title: "Al-Quran Al-Kareem",
  description: "A professional and clean Quran reading experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#090909] text-emerald-50">
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
