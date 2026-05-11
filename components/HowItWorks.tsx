"use client";

import { motion } from "framer-motion";
import { ScanLine, UserPlus, MessageCircle } from "lucide-react";
import { QrModal, useQrModal } from "./QrModal";

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
  const qr = useQrModal();

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

              {i < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden translate-x-1/2 text-2xl text-brand-300 md:block">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={qr.show}
            className="rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-400"
          >
            立即扫码加入 →
          </button>
        </div>
      </div>

      <QrModal open={qr.open} onClose={qr.hide} />
    </section>
  );
}
