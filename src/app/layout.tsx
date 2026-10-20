import type { Metadata } from "next";
import { Crimson_Pro, Atkinson_Hyperlegible, JetBrains_Mono, Noto_Serif_SC, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-serif-cn",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-sans-cn",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "天津市武清区小学英语 4-6 年级知识点调研与素材包",
  description: "人教精通版 6 册 36 单元全维度知识点 + 21 主题 500 词词汇表 + 180 题配套习题",
  keywords: ["小学英语", "人教精通版", "天津武清", "知识点调研", "词汇总表", "习题集"],
  authors: [{ name: "机构备课素材包" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${crimsonPro.variable} ${atkinsonHyperlegible.variable} ${jetbrainsMono.variable} ${notoSerifSC.variable} ${notoSansSC.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
