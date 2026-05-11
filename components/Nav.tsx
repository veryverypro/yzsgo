"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { QrModal, useQrModal } from "./QrModal";

const navLinks = [
  { label: "功能", href: "/#features" },
  { label: "案例", href: "/#cases" },
  { label: "定价", href: "/#pricing" },
  { label: "博客", href: "/blog" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const qr = useQrModal();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 text-xl font-bold text-brand-600">
            <Image src="/images/logo.png" alt="鸭嘴售" width={32} height={32} />
            鸭嘴售
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 transition-colors hover:text-brand-600"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={qr.show}
              className="rounded-full bg-accent-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-600"
            >
              加入卖家群
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-600"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); qr.show(); }}
              className="mt-2 block w-full rounded-full bg-accent-500 px-5 py-2 text-center text-sm font-medium text-white"
            >
              加入卖家群
            </button>
          </div>
        )}
      </nav>

      <QrModal open={qr.open} onClose={qr.hide} />
    </>
  );
}
