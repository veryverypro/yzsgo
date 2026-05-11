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
    metric: "15\u2192200",
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
