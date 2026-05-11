"use client";

import Image from "next/image";
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
  details: string[];
  image: string;
}

const features: Feature[] = [
  {
    icon: Search,
    title: "AI 选品分析",
    description:
      "市场趋势、竞品评论、关键词提取、热卖品监控，告诉你\u201c卖什么能赚\u201d",
    details: [
      "自动抓取各平台热卖数据，发现蓝海品类",
      "批量分析竞品评论，提取使用场景和关键词",
      "实时监控竞品价格变动，降价超 10% 自动预警",
    ],
    image: "/images/feature-selection.png",
  },
  {
    icon: PackagePlus,
    title: "AI 上架",
    description:
      "采集\u2192AI 生成商品图\u2192多语言 Listing\u2192多店铺发布，晚上跑完早上验收",
    details: [
      "AI 一键生成白底图、场景图、多角度展示图",
      "自动翻译优化多语言 Listing，告别机翻",
      "多平台多店铺批量发布，效率提升 10 倍",
    ],
    image: "/images/feature-listing.png",
  },
  {
    icon: MessageSquare,
    title: "达人建联",
    description: "批量邀约、自动回复、样品跟踪，达人合作全流程 AI 搞定",
    details: [
      "AI 批量筛选匹配达人，精准邀约",
      "自动回复达人消息，7\u00d724 不漏回",
      "样品物流跟踪，自动催促内容发布",
    ],
    image: "/images/feature-influencer.png",
  },
  {
    icon: Video,
    title: "AI 视频生成 & 剪辑",
    description: "从商品图一键生成推广视频，或上传素材 AI 自动剪辑成片",
    details: [
      "商品图自动生成短视频，适配各平台尺寸",
      "上传素材 AI 智能剪辑，自动配乐加字幕",
      "批量生成多版本素材，A/B 测试投放效果",
    ],
    image: "/images/feature-video.png",
  },
  {
    icon: TrendingUp,
    title: "广告投放助手",
    description: "智能建议出价、自动排除低效素材、投放数据一目了然",
    details: [
      "AI 智能建议出价策略，优化 ROI",
      "自动排除跑不动的素材，聚焦高转化内容",
      "多平台广告数据聚合，一个面板全掌控",
    ],
    image: "/images/feature-ads.png",
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            AI 帮你搞定跨境全链路
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            基于真实跨境卖家痛点打造，不是花架子
          </p>
        </motion.div>

        <div className="mt-20 space-y-28">
          {features.map((feature, i) => {
            const isReversed = i % 2 === 1;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid items-center gap-12 md:grid-cols-2 ${
                  isReversed ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`overflow-hidden rounded-2xl shadow-lg ${
                    isReversed ? "[direction:ltr]" : ""
                  }`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={800}
                    height={450}
                    className="w-full transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className={isReversed ? "[direction:ltr]" : ""}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                    <feature.icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-gray-500">
                    {feature.description}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {feature.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-sm text-gray-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
