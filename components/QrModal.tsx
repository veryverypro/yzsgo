"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { WechatCTA } from "./WechatCTA";

export function useQrModal() {
  const [open, setOpen] = useState(false);
  return { open, show: () => setOpen(true), hide: () => setOpen(false) };
}

export function QrModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        <h3 className="mb-2 text-center text-lg font-semibold text-gray-900">
          加入卖家群
        </h3>
        <p className="mb-5 text-center text-sm text-gray-500">
          微信扫码，和跨境卖家一起用 AI 提效
        </p>
        <WechatCTA size="lg" />
      </div>
    </div>
  );
}
