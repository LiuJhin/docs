// app/writing/page.tsx
import MarkdownViewer from "@/components/MarkdownViewer";

const content = `
# 写作中心

这里记录了我的随笔和文章。

## 最新文章

- [写作开始](/writing/start)
`;

export default function WritingHome() {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <MarkdownViewer source={content} enableHighlight={true} />
    </article>
  );
}
