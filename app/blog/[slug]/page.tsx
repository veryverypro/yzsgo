import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { Nav } from "@/components/Nav";
import { BlogCTA } from "@/components/BlogCTA";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} - 鸭嘴售`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-32">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="transition-colors hover:text-brand-600">
            首页
          </Link>
          <span>/</span>
          <Link href="/blog" className="transition-colors hover:text-brand-600">
            博客
          </Link>
          <span>/</span>
          <span className="text-gray-600">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-50 px-3 py-0.5 text-xs font-medium text-brand-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-snug text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg text-gray-500 leading-relaxed">
              {post.description}
            </p>
          )}
          {post.date && (
            <p className="mt-4 text-sm text-gray-400">{post.date}</p>
          )}
        </header>

        {/* Article body */}
        <article className="blog-prose">
          <MDXRemote source={post.content} />
        </article>

        {/* CTA */}
        <BlogCTA />
      </main>
    </>
  );
}
