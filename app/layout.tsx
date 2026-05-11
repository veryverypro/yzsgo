import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "鸭嘴售 - 你的 AI 首席运营官",
  description:
    "鸭嘴售（谐音鸭嘴兽）是 AI 驱动的跨境电商运营平台。从选品到上架，从达人建联到广告投放，AI 帮你卖全球。支持 Amazon、TikTok Shop、Temu、SHEIN 等主流跨境平台。",
  keywords: [
    "鸭嘴售",
    "鸭嘴兽",
    "鸭嘴兽 AI",
    "AI 跨境电商",
    "AI 选品",
    "AI 上架",
    "跨境电商工具",
    "AI 首席运营官",
  ],
  openGraph: {
    title: "鸭嘴售 - 你的 AI 首席运营官",
    description: "AI 驱动的跨境电商运营平台，从选品到上架，AI 帮你卖全球",
    url: "https://ai.yzsgo.com",
    siteName: "鸭嘴售",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">{children}</body>
    </html>
  );
}
