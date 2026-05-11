"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WechatCTA } from "./WechatCTA";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src="/images/product-screenshot.png"
              alt="鸭嘴售 AI COO 产品界面"
              width={600}
              height={400}
              className="w-full rounded-2xl shadow-lg"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
