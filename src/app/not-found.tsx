// src/app/not-found.tsx

import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      {/* 优雅的网格背景 + 极淡渐变 */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950" />
        <div
          className="absolute inset-0 opacity-30 dark:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(228 228 231 / 0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(228 228 231 / 0.8) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-12 max-w-xl">
          {/* 极简大数字 + 轻微悬浮动画 */}
          <div className="relative">
            <h1 className="text-[14rem] md:text-[18rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground/20 to-foreground/5 select-none leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-8xl font-light tracking-widest text-foreground/5">
                oops
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-light text-foreground/80 tracking-wide">
              这一页，暂时还没有被写出来。
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              或许它正在某个草稿里沉睡，
              <br />
              又或许，它只是还没来得及存在。
            </p>
          </div>

          {/* 极简按钮组 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link href="/">
              <button className="group inline-flex items-center gap-3 px-7 py-3.5 border border-foreground/20 rounded-full text-foreground hover:bg-foreground/5 transition-all duration-300">
                <Home className="w-4.5 h-4.5" />
                <span className="font-medium">返回首页</span>
                <ArrowRight className="w-4.5 h-4.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </button>
            </Link>

            <Link
              href="/posts"
              className="text-foreground/60 hover:text-foreground/90 transition-colors duration-300 flex items-center gap-2 text-sm tracking-wider"
            >
              去看看别的文章
              <span className="text-xl leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* 极简页脚 */}
        <footer className="absolute bottom-8 text-xs text-muted-foreground/70 tracking-widest">
          © {new Date().getFullYear()} MarkView — 迷路不可怕，可怕的是不继续走。
        </footer>
      </div>
    </>
  );
}
