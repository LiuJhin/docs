// src/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Rss, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // 滚动监听：20px 后触发紧凑模式 + 毛玻璃增强
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Writing", href: "/writing" },
    { name: "About", href: "/about" },
    { name: "Docs", href: "/docs" },
    { name: "My life", href: "/eassay" },
    { name: "Learning", href: "/learning" },
  ];

  return (
    <>
      {/* 固定 Header */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 border-b border-border/60 shadow-sm"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between px-8 transition-all duration-300",
            "max-w-screen-2xl h-20",
            scrolled && "h-16"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {/* <div
              className={cn(
                "flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold shadow-xl shadow-purple-600/20 transition-all duration-300",
                scrolled ? "h-9 w-9 text-xl" : "h-11 w-11 text-2xl"
              )}
            >
              M
            </div> */}
            <span
              className={cn(
                "font-bold tracking-tight text-foreground transition-all duration-300",
                scrolled ? "text-xl" : "text-2xl"
              )}
            >
              Liam ·s blog
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname.startsWith(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex items-center gap-5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground/80 hover:text-foreground transition"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="/feed.xml"
                className="text-muted-foreground/80 hover:text-foreground transition"
              >
                <Rss className="h-5 w-5" />
              </a>

              {/* 主题切换 */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-lg p-2 hover:bg-accent hover:text-accent-foreground transition"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* 移动端侧边抽屉 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <span className="text-xl font-bold">MarkView</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block text-2xl font-medium transition-colors",
                    pathname.startsWith(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 space-y-6 border-t">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-2xl font-medium text-muted-foreground"
                >
                  GitHub
                </a>
                <button
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 text-2xl font-medium text-muted-foreground"
                >
                  {mounted && theme === "dark" ? "Light mode" : "Dark mode"}
                  {mounted && theme === "dark" ? (
                    <Sun className="h-6 w-6" />
                  ) : (
                    <Moon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
