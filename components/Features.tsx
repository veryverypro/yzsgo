"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  details: string[];
  image: string;
}

const features: Feature[] = [
  {
    title: "AI 产品开发",
    description:
      "不只是选品，而是从市场洞察到供应商对接的完整产品开发流程",
    details: [
      "AI 评分算法量化每个品类机会：需求强度、竞争格局、质量缺陷三维打分",
      "深度分析竞品评论，自动提取买家痛点，找到差异化切入点",
      "精算单品利润模型：售价、货成本、头程、FBA、广告、退货一目了然",
      "一键搜索 1688 供应商，比价、起订量、评分、物流标签全覆盖",
    ],
    image: "/images/feature-selection.png",
  },
  {
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
                  <h3 className="text-2xl font-bold text-gray-900">
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
