"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WechatCTA } from "./WechatCTA";

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-950 px-6 py-12 md:py-16">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.1),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <FloatingOrb className="left-[10%] top-[20%] h-72 w-72 bg-brand-500" delay={0} />
      <FloatingOrb className="right-[15%] top-[60%] h-56 w-56 bg-brand-400" delay={2} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          {/* Left: Text + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
              </span>
              AI 驱动的跨境电商运营平台
            </motion.div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              你的 AI
              <br />
              <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent">
                首席运营官
              </span>
            </h1>

            <p className="mt-4 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
              从选品到上架，从达人建联到广告投放
              <br />
              告诉 AI 你想卖什么，剩下的交给鸭嘴售
            </p>

            {/* Platform badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">支持平台</span>
              {["Amazon", "TikTok Shop", "Temu", "SHEIN"].map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-gray-700/50 bg-gray-800/50 px-3 py-1 text-xs font-medium text-gray-300"
                >
                  {platform}
                </span>
              ))}
            </div>

            {/* WeChat CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-5 rounded-2xl border border-gray-700/50 bg-gray-800/60 p-4 backdrop-blur-sm"
            >
              <WechatCTA className="[&_p]:text-gray-400" />
            </motion.div>
          </motion.div>

          {/* Right: Product screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-brand-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 shadow-2xl shadow-brand-500/10">
              <Image
                src="/images/product-screenshot.png"
                alt="鸭嘴售 AI COO 产品界面"
                width={1200}
                height={800}
                className="w-full"
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-950/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
