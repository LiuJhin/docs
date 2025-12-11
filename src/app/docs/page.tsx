// src/app/docs/page.tsx
import MarkdownViewer from "@/components/MarkdownViewer";

const content = `
# 开始使用 MarkView

这是一个**极简、美观、永久保存**的在线 Markdown 文档系统。

## 特性

- 基于 Next.js 15 App Router 构建
- 支持暗黑模式
- 网格背景，极致克制美学
- 内容永久保存在浏览器（可升级为数据库）
- 一键分享链接

\`\`\`tsx
import MarkView from 'markview';

export default function App() {
  return <MarkView content="# Hello World" />;
}
\`\`\`

## 部署

一键部署到 Vercel：

\`\`\`bash
git push vercel main
\`\`\`

## 未来计划

- [ ] 支持多人协同编辑
- [ ] 支持导出 PDF
- [ ] 支持自定义域名
`;

export default function DocsHome() {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <MarkdownViewer source={content} enableHighlight={true} />
    </article>
  );
}
