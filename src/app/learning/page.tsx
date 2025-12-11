// app/learning/page.tsx
import MarkdownViewer from "@/components/MarkdownViewer";
import rehypeHighlight from "rehype-highlight";

const content = `
# 学习中心

这里记录了我的学习笔记，包括英语、技术等内容。

## 英语学习

- [英语学习指南](/learning/english/start)
`;

export default function LearningHome() {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <MarkdownViewer source={content} enableHighlight={true} />
    </article>
  );
}
