import Image from "next/image";

interface WechatCTAProps {
  size?: "sm" | "lg";
  className?: string;
}

export function WechatCTA({ size = "sm", className = "" }: WechatCTAProps) {
  const imgSize = size === "lg" ? 200 : 140;

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <Image
        src="/images/wechat-qr-placeholder.svg"
        alt="扫码加入鸭嘴售卖家群"
        width={imgSize}
        height={imgSize}
        className="rounded-xl shadow-md"
      />
      <p className="text-sm text-gray-500">扫码加入卖家群</p>
    </div>
  );
}
