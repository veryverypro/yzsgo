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
        <div className="grid gap-16 md:grid-cols-2">
          <div id="footer-cta" className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold">立即加入卖家群</h2>
            <p className="mt-4 text-gray-400">
              扫码加微信，和 1000+ 跨境卖家一起用 AI 提效
            </p>
            <div className="mt-8">
              <WechatCTA size="lg" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">常见问题</h3>
            <div className="mt-6">
              {faqs.map((faq) => (
                <FaqAccordion key={faq.question} faq={faq} />
              ))}
            </div>
          </div>
        </div>

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
