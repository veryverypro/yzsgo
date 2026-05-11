# 博客功能设计文档

> 日期：2026-05-11

## 概述

为 yzsgo.com 添加博客功能，用于 SEO 内容营销。MDX 文件存放在仓库中，Next.js App Router 静态生成，零外部依赖。

## 路由结构

```
/blog              → 文章列表页
/blog/[slug]       → 文章详情页
```

## 内容结构

```
content/blog/
├── 2026-05-12-ai-cross-border-tools.mdx
├── 2026-05-15-ai-listing-guide.mdx
└── ...
```

每篇文章 frontmatter：

```yaml
---
title: "文章标题"
description: "SEO 描述"
date: "2026-05-12"
tags: ["标签1", "标签2"]
image: "/images/blog/cover.png"  # 可选封面图
---
```

## 列表页 `/blog`

- 按日期倒序排列
- 每篇显示：标题、描述、日期、标签
- 暂不做分页（文章少时不需要）
- Nav 增加"博客"锚点链接

## 详情页 `/blog/[slug]`

- MDX 内容渲染，支持自定义组件
- 底部显示微信 CTA 按钮（复用 QrModal）
- SEO：自动从 frontmatter 生成 title/description/OG 标签
- 返回博客列表的面包屑导航

## 技术选型

- `gray-matter`：解析 frontmatter
- `next-mdx-remote`：服务端渲染 MDX
- 全部静态生成（SSG），`generateStaticParams` 预生成所有文章路径
- Lighthouse 目标 95+

## 样式

- 文章内容区域使用 `prose` 排版（Tailwind Typography 插件 或手写 prose 样式）
- 代码块高亮（V1 可选）
- 与落地页整体风格一致

## Nav 更新

导航栏增加"博客"链接，指向 `/blog`

## 预写种子文章

根据 SEO 调研的蓝海关键词，预写 2 篇：

1. **《跨境电商网红开发：AI 如何帮你高效找到合适的 KOL》**
   - 目标关键词：跨境 KOL 营销工具、网红开发工具
   - 内容方向：达人建联痛点 → AI 解决方案 → 鸭嘴售功能介绍

2. **《从商品图到推广视频：AI 视频生成实战指南》**
   - 目标关键词：AI 产品视频生成跨境、跨境电商视频自动生成工具
   - 内容方向：为什么需要视频 → AI 生成 vs 人工 → 实操步骤
