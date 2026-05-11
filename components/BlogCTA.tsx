"use client";

import { QrModal, useQrModal } from "./QrModal";

export function BlogCTA() {
  const qr = useQrModal();

  return (
    <>
      <div className="mt-16 rounded-2xl border border-brand-100 bg-brand-50 p-8 text-center">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          还有更多干货等你来
        </h3>
        <p className="mb-6 text-gray-600">
          加入鸭嘴售卖家群，和数千名跨境卖家一起用 AI 提效，获取独家运营技巧。
        </p>
        <button
          onClick={qr.show}
          className="rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          加入卖家群，获取更多干货
        </button>
      </div>
      <QrModal open={qr.open} onClose={qr.hide} />
    </>
  );
}
