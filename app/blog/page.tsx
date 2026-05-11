import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "博客 - 鸭嘴售",
  description: "跨境电商卖家干货，AI 工具使用指南，达人建联、视频营销最新攻略。",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-32">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">博客</h1>
        <p className="mb-12 text-gray-500">跨境卖家干货、AI 工具指南、达人营销攻略</p>

        {posts.length === 0 ? (
          <p className="text-gray-400">暂无文章，敬请期待。</p>
        ) : (
          <ul className="space-y-10">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-gray-100 pb-10">
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="mb-2 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-brand-600">
                    {post.title}
                  </h2>
                </Link>
                {post.description && (
                  <p className="mb-3 text-gray-600 leading-relaxed">
                    {post.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  {post.date && (
                    <span className="text-sm text-gray-400">{post.date}</span>
                  )}
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-50 px-3 py-0.5 text-xs font-medium text-brand-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
