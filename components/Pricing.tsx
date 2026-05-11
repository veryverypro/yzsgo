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
