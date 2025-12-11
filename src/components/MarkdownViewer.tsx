"use client";

import dynamic from "next/dynamic";
import type { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import "highlight.js/styles/github-dark.css";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

interface MarkdownViewerProps extends MarkdownPreviewProps {
  enableHighlight?: boolean;
  enableSanitize?: boolean;
}

export default function MarkdownViewer({
  rehypePlugins = [],
  enableHighlight = false,
  enableSanitize = false,
  ...props
}: MarkdownViewerProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plugins = [...(rehypePlugins || [])];

  if (enableSanitize) {
    plugins.push([rehypeSanitize]);
  }

  if (enableHighlight) {
    plugins.push([rehypeHighlight]);
  }

  // 总是启用 rehype-slug 以生成锚点
  plugins.push([rehypeSlug]);

  return (
    <div className="w-full" data-color-mode={mounted ? resolvedTheme : "light"}>
      <MarkdownPreview
        {...props}
        rehypePlugins={plugins}
        style={{ backgroundColor: "transparent", ...props.style }}
      />
    </div>
  );
}
