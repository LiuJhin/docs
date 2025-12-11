"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function Toc() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    // 延迟执行，等待 Markdown 内容渲染
    const timer = setTimeout(() => {
      // 查找 .prose 内的标题
      const elements = Array.from(
        document.querySelectorAll(".prose h2, .prose h3")
      );

      const items: TocItem[] = elements
        .map((element) => ({
          id: element.id,
          text: (element as HTMLElement).innerText,
          level: Number(element.tagName.charAt(1)),
        }))
        .filter((item) => item.id); // 过滤掉没有 ID 的标题

      setHeadings(items);
    }, 500); // 500ms 应该足够渲染

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
        本页目录
      </h3>
      <ul className="space-y-2 text-sm border-l border-gray-200 dark:border-gray-800">
        {headings.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                });
                setActiveId(item.id);
              }}
              className={`block pl-4 py-1 border-l-2 -ml-[1px] transition-colors ${
                activeId === item.id
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 font-medium"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
