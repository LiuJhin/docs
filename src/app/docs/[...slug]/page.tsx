// src/app/docs/[[...slug]]/page.tsx
// 保持为 Server Component（推荐！）
import MarkdownViewer from "@/components/MarkdownViewer";

import { promises as fs } from "fs";
("fs");
import path from "path";

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  // 解包 Promise 参数
  const resolvedParams = await params;
  const filePath = resolvedParams.slug?.join("/") || "welcome";

  // 构建文件的完整路径
  const fullPath = path.join(
    process.cwd(),
    "public",
    "markdowns",
    `${filePath}.md`
  );

  let content = "";

  try {
    // 读取文件内容
    content = await fs.readFile(fullPath, "utf8");
  } catch (error) {
    // 如果文件不存在，提供默认内容
    content = `# 404 - 文档未找到

请求的文档路径：/markdowns/${filePath}.md

请确保文件存在于 public/markdowns/ 目录下。`;
  }

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <MarkdownViewer
        source={content}
        enableSanitize={true}
        enableHighlight={true}
      />
    </article>
  );
}
