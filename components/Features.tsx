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
      "市场趋势、竞品评论、关键词提取、热卖品监控，告诉你\u201c卖什么能赚\u201d",
  },
  {
    icon: PackagePlus,
    title: "AI 上架",
    description:
      "采集\u2192AI 生成商品图\u2192多语言 Listing\u2192多店铺发布，晚上跑完早上验收",
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
