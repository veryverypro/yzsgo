# 鸭嘴售落地页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page landing page for 鸭嘴售 (yzsgo.com), a Chinese-market brand for Optima AI targeting cross-border e-commerce sellers, with WeChat QR code as the primary CTA.

**Architecture:** Next.js 15 App Router with static generation (SSG). Single page composed of 7 section components (Nav, Hero, Features, HowItWorks, Cases, Pricing, Footer). Tailwind CSS v4 for styling, Framer Motion for scroll animations, Lucide React for icons. Deploy to Vercel via `ai.yzsgo.com`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React

**Spec:** `docs/superpowers/specs/2026-05-11-yzsgo-landing-page-design.md`

---

## File Structure

```
yzsgo/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, SEO
│   ├── page.tsx                # Home page: composes all sections
│   └── globals.css             # Tailwind v4 entry + CSS variables (brand colors)
├── components/
│   ├── Nav.tsx                 # Sticky nav: logo + anchor links + WeChat CTA
│   ├── Hero.tsx                # Hero: headline, subtitle, product screenshot, WeChat QR
│   ├── Features.tsx            # 5 feature cards with Lucide icons
│   ├── HowItWorks.tsx          # 3-step flow: scan → signup → chat
│   ├── Cases.tsx               # 3 merchant case studies with data
│   ├── Pricing.tsx             # 3-tier pricing table (Free/Pro/Enterprise)
│   ├── Footer.tsx              # Large WeChat QR + FAQ + legal info
│   └── WechatCTA.tsx           # Reusable WeChat QR + text component
├── public/
│   └── images/
│       └── wechat-qr-placeholder.svg   # Placeholder QR for development
├── tailwind.config.ts          # Brand color tokens
├── next.config.ts              # Static export config
├── package.json
└── tsconfig.json
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/verypro/yzsgo
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes
```

This will scaffold the project with App Router, TypeScript, Tailwind CSS, and ESLint. Since the directory already has files (docs/), it will create around them.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/verypro/yzsgo
npm install framer-motion lucide-react
```

- [ ] **Step 3: Configure brand colors in `tailwind.config.ts`**

Replace the content of `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",   // Primary: bright teal
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        accent: {
          400: "#fbbf24",   // Bright yellow for CTA
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Set up `app/globals.css`**

Replace the content of `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-white text-gray-800 antialiased;
  }
}
```

- [ ] **Step 5: Set up `app/layout.tsx` with metadata and fonts**

Replace the content of `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Create minimal `app/page.tsx`**

Replace the content of `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <h1>鸭嘴售</h1>
    </main>
  );
}
```

- [ ] **Step 7: Verify dev server runs**

```bash
cd /Users/verypro/yzsgo
npm run dev
```

Expected: Dev server starts at `http://localhost:3000`, page shows "鸭嘴售".

- [ ] **Step 8: Commit**

```bash
cd /Users/verypro/yzsgo
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind and brand config"
```

---

## Task 2: WechatCTA Reusable Component

**Files:**
- Create: `components/WechatCTA.tsx`
- Create: `public/images/wechat-qr-placeholder.svg`

- [ ] **Step 1: Create placeholder QR SVG**

Create `public/images/wechat-qr-placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="12" fill="#f3f4f6"/>
  <text x="100" y="95" text-anchor="middle" font-size="14" fill="#9ca3af" font-family="sans-serif">微信二维码</text>
  <text x="100" y="115" text-anchor="middle" font-size="12" fill="#9ca3af" font-family="sans-serif">占位图</text>
</svg>
```

- [ ] **Step 2: Create `WechatCTA` component**

Create `components/WechatCTA.tsx`:

```tsx
import Image from "next/image";

interface WechatCTAProps {
  size?: "sm" | "lg";
  className?: string;
}

export function WechatCTA({ size = "sm", className = "" }: WechatCTAProps) {
  const imgSize = size === "lg" ? 200 : 140;

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <Image
        src="/images/wechat-qr-placeholder.svg"
        alt="扫码加入鸭嘴售卖家群"
        width={imgSize}
        height={imgSize}
        className="rounded-xl shadow-md"
      />
      <p className="text-sm text-gray-500">扫码加入卖家群</p>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/verypro/yzsgo
git add components/WechatCTA.tsx public/images/wechat-qr-placeholder.svg
git commit -m "feat: add reusable WechatCTA component with placeholder QR"
```

---

## Task 3: Nav Component

**Files:**
- Create: `components/Nav.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `Nav` component**

Create `components/Nav.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "功能", href: "#features" },
  { label: "案例", href: "#cases" },
  { label: "定价", href: "#pricing" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="text-xl font-bold text-brand-600">
          鸭嘴售
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 transition-colors hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#footer-cta"
            className="rounded-full bg-accent-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-600"
          >
            加入卖家群
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-gray-600"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#footer-cta"
            className="mt-2 block rounded-full bg-accent-500 px-5 py-2 text-center text-sm font-medium text-white"
            onClick={() => setMobileOpen(false)}
          >
            加入卖家群
          </a>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Add Nav to page**

Replace `app/page.tsx`:

```tsx
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-20">
        <h1>鸭嘴售</h1>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
cd /Users/verypro/yzsgo && npm run dev
```

Expected: Sticky nav at top with logo, links, and yellow CTA button. Mobile hamburger menu works on small screens.

- [ ] **Step 4: Commit**

```bash
cd /Users/verypro/yzsgo
git add components/Nav.tsx app/page.tsx
git commit -m "feat: add sticky Nav with mobile menu and anchor links"
```

---

## Task 4: Hero Section

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `Hero` component**

Create `components/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { WechatCTA } from "./WechatCTA";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              你的 AI
              <br />
              <span className="text-brand-500">首席运营官</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 md:text-xl">
              从选品到上架，从达人建联到广告投放——
              <br className="hidden md:block" />
              告诉 AI 你想卖什么，剩下的交给鸭嘴售
            </p>
            <div className="mt-8">
              <WechatCTA />
            </div>
          </motion.div>

          {/* Right: product screenshot placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="flex h-80 w-full max-w-md items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 shadow-lg md:h-96">
              <p className="text-gray-400">产品对话界面截图</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to page**

Update `app/page.tsx`:

```tsx
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: Hero section with headline "你的 AI 首席运营官", subtitle, WeChat QR on left, product screenshot placeholder on right. Fade-in animation on load.

- [ ] **Step 4: Commit**

```bash
cd /Users/verypro/yzsgo
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with headline, CTA, and product screenshot"
```

---

## Task 5: Features Section

**Files:**
- Create: `components/Features.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `Features` component**

Create `components/Features.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import {
  Search,
  PackagePlus,
  MessageSquare,
  Video,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Search,
    title: "AI 选品分析",
    description:
      "市场趋势、竞品评论、关键词提取、热卖品监控，告诉你"卖什么能赚"",
  },
  {
    icon: PackagePlus,
    title: "AI 上架",
    description:
      "采集→AI 生成商品图→多语言 Listing→多店铺发布，晚上跑完早上验收",
  },
  {
    icon: MessageSquare,
    title: "达人建联",
    description: "批量邀约、自动回复、样品跟踪，达人合作全流程 AI 搞定",
  },
  {
    icon: Video,
    title: "AI 视频生成 & 剪辑",
    description:
      "从商品图一键生成推广视频，或上传素材 AI 自动剪辑成片",
  },
  {
    icon: TrendingUp,
    title: "广告投放助手",
    description: "智能建议出价、自动排除低效素材、投放数据一目了然",
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 md:text-4xl">
          AI 帮你搞定跨境全链路
        </h2>
        <p className="mt-4 text-center text-lg text-gray-500">
          基于真实跨境卖家痛点打造，不是花架子
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                <feature.icon className="h-6 w-6 text-brand-500" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Features to page**

Update `app/page.tsx`:

```tsx
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
        <Features />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: 5 feature cards in a grid (3 cols on desktop, 2 on tablet, 1 on mobile). Each card has a teal icon, title, and description. Cards fade in on scroll.

- [ ] **Step 4: Commit**

```bash
cd /Users/verypro/yzsgo
git add components/Features.tsx app/page.tsx
git commit -m "feat: add Features section with 5 capability cards"
```

---

## Task 6: HowItWorks Section

**Files:**
- Create: `components/HowItWorks.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `HowItWorks` component**

Create `components/HowItWorks.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ScanLine, UserPlus, MessageCircle } from "lucide-react";
import { WechatCTA } from "./WechatCTA";

const steps = [
  {
    icon: ScanLine,
    number: "01",
    title: "扫码进群",
    description: "微信扫码加入鸭嘴售卖家交流群，获取一手资讯",
  },
  {
    icon: UserPlus,
    number: "02",
    title: "开通账号",
    description: "群内指引注册，免费开通鸭嘴售账号",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "对话开店",
    description: "告诉 AI 你想卖什么，5 分钟完成第一个商品上架",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 md:text-4xl">
          三步开始
        </h2>
        <p className="mt-4 text-center text-lg text-gray-500">
          简单到不需要教程
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 shadow-lg shadow-brand-500/20">
                <step.icon className="h-7 w-7 text-white" />
              </div>
              <span className="mt-4 block text-sm font-bold text-brand-400">
                {step.number}
              </span>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-500">{step.description}</p>

              {/* Connector arrow (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden translate-x-1/2 text-2xl text-brand-300 md:block">
                  &rarr;
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA after steps */}
        <div className="mt-12 flex justify-center">
          <WechatCTA />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add HowItWorks to page**

Update `app/page.tsx`:

```tsx
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: 3 steps in a horizontal row (vertical on mobile) with numbered icons, arrow connectors, and a WeChat QR CTA below. This is the 2nd CTA placement on the page.

- [ ] **Step 4: Commit**

```bash
cd /Users/verypro/yzsgo
git add components/HowItWorks.tsx app/page.tsx
git commit -m "feat: add HowItWorks 3-step section with WeChat CTA"
```

---

## Task 7: Cases Section

**Files:**
- Create: `components/Cases.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `Cases` component**

Create `components/Cases.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

interface CaseStudy {
  platform: string;
  platformColor: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
}

const cases: CaseStudy[] = [
  {
    platform: "Temu",
    platformColor: "bg-orange-100 text-orange-700",
    title: "铺货卖家的效率革命",
    metric: "15→200",
    metricLabel: "条/天上架量",
    description:
      "原来一天手动上架 15 条，现在 AI 自动采集、生成商品图、翻译优化、批量发布，晚上跑完早上验收。",
  },
  {
    platform: "Amazon",
    platformColor: "bg-yellow-100 text-yellow-700",
    title: "数据驱动的选品突破",
    metric: "3x",
    metricLabel: "选品命中率提升",
    description:
      "AI 批量分析竞品评论，自动提取使用场景和关键词，精准定位蓝海品类，告别盲目铺货。",
  },
  {
    platform: "TikTok",
    platformColor: "bg-pink-100 text-pink-700",
    title: "达人建联效率飞跃",
    metric: "3x",
    metricLabel: "邀约转化率提升",
    description:
      "AI 自动回复达人消息、跟踪样品物流、催促内容发布，人工只需审核最终合作。",
  },
];

export function Cases() {
  return (
    <section id="cases" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 md:text-4xl">
          卖家都在用
        </h2>
        <p className="mt-4 text-center text-lg text-gray-500">
          真实场景，真实提效
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="p-8">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${c.platformColor}`}
                >
                  {c.platform}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {c.title}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-brand-500">
                    {c.metric}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {c.metricLabel}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-gray-500">
                  {c.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Cases to page**

Update `app/page.tsx`:

```tsx
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Cases } from "@/components/Cases";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <Cases />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: 3 case study cards with platform badge, bold metric number, and description. Cards fade in on scroll.

- [ ] **Step 4: Commit**

```bash
cd /Users/verypro/yzsgo
git add components/Cases.tsx app/page.tsx
git commit -m "feat: add Cases section with 3 merchant stories"
```

---

## Task 8: Pricing Section

**Files:**
- Create: `components/Pricing.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `Pricing` component**

Create `components/Pricing.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

const tiers: PricingTier[] = [
  {
    name: "Free",
    price: "¥0",
    period: "",
    description: "零成本上手体验",
    features: [
      "基础 AI 对话",
      "每日有限 AI 额度",
      "单店铺管理",
      "社群支持",
    ],
    highlighted: false,
    cta: "免费开始",
  },
  {
    name: "Pro",
    price: "¥199",
    period: "/月",
    description: "专业卖家首选",
    features: [
      "完整 AI 功能",
      "更多 AI 额度",
      "多店铺管理",
      "AI 选品分析",
      "AI 商品图生成",
      "AI 视频生成",
      "优先支持",
    ],
    highlighted: true,
    cta: "立即升级",
  },
  {
    name: "Enterprise",
    price: "¥699",
    period: "/月",
    description: "团队协作与定制",
    features: [
      "无限 AI 额度",
      "Pro 所有功能",
      "团队协作",
      "专属客户经理",
      "定制化开发",
      "API 接入",
    ],
    highlighted: false,
    cta: "联系我们",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 md:text-4xl">
          简单透明的定价
        </h2>
        <p className="mt-4 text-center text-lg text-gray-500">
          先免费用，好用再付费
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-brand-500 bg-white shadow-lg shadow-brand-500/10"
                  : "border-gray-200 bg-white"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-medium text-white">
                  最受欢迎
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{tier.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">
                  {tier.price}
                </span>
                <span className="text-gray-500">{tier.period}</span>
              </div>
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#footer-cta"
                className={`mt-8 block rounded-full py-3 text-center text-sm font-medium transition-colors ${
                  tier.highlighted
                    ? "bg-brand-500 text-white hover:bg-brand-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Pricing to page**

Update `app/page.tsx`:

```tsx
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Cases } from "@/components/Cases";
import { Pricing } from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <Cases />
        <Pricing />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: 3-column pricing table. Pro tier is highlighted with "最受欢迎" badge and brand-colored border. All CTA buttons link to footer WeChat QR.

- [ ] **Step 4: Commit**

```bash
cd /Users/verypro/yzsgo
git add components/Pricing.tsx app/page.tsx
git commit -m "feat: add Pricing section with 3-tier comparison"
```

---

## Task 9: Footer with FAQ

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `Footer` component**

Create `components/Footer.tsx`:

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WechatCTA } from "./WechatCTA";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "鸭嘴售是什么？",
    answer:
      "鸭嘴售（谐音鸭嘴兽）是 AI 驱动的跨境电商运营平台，帮你从选品、上架、达人建联到广告投放全流程提效。",
  },
  {
    question: "支持哪些平台？",
    answer:
      "目前支持 Amazon、TikTok Shop、Temu、SHEIN 等主流跨境电商平台，更多平台持续接入中。",
  },
  {
    question: "需要有电商经验吗？",
    answer:
      "不需要。AI 会引导你完成全流程，从零开始也能 5 分钟上架第一个商品。",
  },
  {
    question: "数据安全吗？",
    answer:
      "绝对安全。我们不接管你的广告后台，不存储你的平台密码，所有操作透明可控。",
  },
];

function FaqAccordion({ faq }: { faq: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-900">{faq.question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-4 leading-relaxed text-gray-500">{faq.answer}</p>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        {/* CTA + FAQ grid */}
        <div className="grid gap-16 md:grid-cols-2">
          {/* WeChat CTA */}
          <div id="footer-cta" className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold">立即加入卖家群</h2>
            <p className="mt-4 text-gray-400">
              扫码加微信，和 1000+ 跨境卖家一起用 AI 提效
            </p>
            <div className="mt-8">
              <WechatCTA size="lg" />
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-xl font-semibold">常见问题</h3>
            <div className="mt-6">
              {faqs.map((faq) => (
                <FaqAccordion key={faq.question} faq={faq} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} 鸭嘴售 All rights reserved.</p>
          <p className="mt-1">
            <span className="text-gray-600">ICP 备案号：</span>
            <span>待备案</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to page**

Update `app/page.tsx`:

```tsx
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Cases } from "@/components/Cases";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <Cases />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: Dark footer with large WeChat QR on left, FAQ accordion on right. FAQ items expand/collapse on click. Bottom bar shows copyright and ICP placeholder. This is the 3rd CTA placement.

- [ ] **Step 4: Commit**

```bash
cd /Users/verypro/yzsgo
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add Footer with FAQ accordion and WeChat CTA"
```

---

## Task 10: Polish and Build Verification

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Verify full page flow in browser**

```bash
cd /Users/verypro/yzsgo && npm run dev
```

Check the full page top to bottom:
1. Nav is sticky, links scroll to correct sections
2. Hero fade-in animation works
3. Features cards render correctly with icons
4. HowItWorks 3 steps with connectors
5. Cases cards with platform badges and metrics
6. Pricing 3-tier with Pro highlighted
7. Footer QR + FAQ + copyright
8. Mobile responsive: check at 375px width

- [ ] **Step 2: Run production build**

```bash
cd /Users/verypro/yzsgo
npm run build
```

Expected: Build succeeds with no errors. All pages statically generated.

- [ ] **Step 3: Test production build locally**

```bash
cd /Users/verypro/yzsgo
npm run start
```

Expected: Production server starts, page loads correctly at `http://localhost:3000`.

- [ ] **Step 4: Commit any fixes**

```bash
cd /Users/verypro/yzsgo
git add -A
git commit -m "fix: polish and verify production build"
```

Only commit if there were fixes needed. Skip if build passed clean.

---

## Task 11: Vercel Deployment Setup

**Files:** None (external configuration)

- [ ] **Step 1: Create GitHub repository**

```bash
cd /Users/verypro/yzsgo
gh repo create yzsgo --public --source=. --push
```

- [ ] **Step 2: Connect to Vercel**

```bash
cd /Users/verypro/yzsgo
npx vercel --yes
```

Follow prompts to link the project to your Vercel account.

- [ ] **Step 3: Add custom domain in Vercel**

```bash
npx vercel domains add ai.yzsgo.com
```

- [ ] **Step 4: Configure DNS at Aliyun**

In Aliyun DNS console, add:
- `ai` → CNAME → `cname.vercel-dns.com`

- [ ] **Step 5: Verify deployment**

Wait for DNS propagation (usually a few minutes), then visit `https://ai.yzsgo.com`.

Expected: Landing page loads with SSL certificate.

- [ ] **Step 6: Commit Vercel config if generated**

```bash
cd /Users/verypro/yzsgo
git add -A
git commit -m "chore: add Vercel project config"
```
