// app/about/page.tsx
import Image from "next/image";
import { Globe, Github, Twitter, Mail } from "lucide-react";

export const metadata = {
  title: "关于 · YourStudio",
};

const socialLinks = [
  { icon: Github, href: "https://github.com/yourstudio" },
  { icon: Twitter, href: "https://twitter.com/yourstudio" },
  { icon: Mail, href: "mailto:hello@yourstudio.com" },
  { icon: Globe, href: "https://yourstudio.com" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section – 大气开场 */}
      <section className="relative overflow-hidden py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1 space-y-12">
              <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-none">
                YourStudio
              </h1>
              <p className="text-2xl md:text-3xl font-light text-foreground/70 leading-relaxed">
                我们不只是构建产品，
                <br />
                而是雕琢数字体验。
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative">
                <Image
                  src="/logo-mark.png" // 建议使用抽象的几何 logo mark，单色或极简线条
                  alt="YourStudio Mark"
                  width={380}
                  height={380}
                  className="opacity-90 hover:opacity-100 transition-opacity duration-1000"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心叙述 – 诗意段落，少即是多 */}
      <section className="py-32">
        <div className="mx-auto max-w-4xl px-8">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-7 space-y-10 text-xl md:text-2xl leading-relaxed font-light text-foreground/80">
              <p>自 2022 年起，我们专注于现代 Web 技术的极致实践。</p>
              <p>
                React 与 Next.js 是我们的母语，TypeScript 是我们的语法，
                <br />而 Tailwind 则是我们对美学的坚持。
              </p>
              <p>
                我们相信，真正的优雅源于克制——
                <br />
                少即是多，简单胜于复杂。
              </p>
              <p className="text-foreground/60 italic">
                我们不追逐潮流，只雕琢经得起时间考验的作品。
              </p>
            </div>
            <div className="md:col-span-5" />
          </div>
        </div>
      </section>

      {/* 微妙的分隔与延伸兴趣 */}
      <section className="py-24 bg-foreground/5">
        <div className="mx-auto max-w-5xl px-8">
          <p className="text-lg text-foreground/70 leading-loose text-center max-w-2xl mx-auto">
            除技术外，我们对 Rust 的系统美学、AI 的创造潜力、
            <br />
            以及边缘计算的未来充满好奇。
            <br />
            这些不是标签，而是我们持续探索的方向。
          </p>
        </div>
      </section>

      {/* 社交链接 – 极简横排 */}
      <section className="py-32">
        <div className="flex justify-center gap-16">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.icon === Mail ? undefined : "_blank"}
              rel={link.icon !== Mail ? "noopener noreferrer" : undefined}
              className="group relative"
            >
              <link.icon className="w-7 h-7 text-foreground/50 group-hover:text-foreground transition-colors duration-500" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-sm tracking-widest transition-opacity duration-300">
                {link.icon === Github
                  ? "GITHUB"
                  : link.icon === Twitter
                  ? "TWITTER"
                  : link.icon === Mail
                  ? "MAIL"
                  : "WEB"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 结束语 – 安静收尾 */}
      <section className="py-24 text-center">
        <p className="text-foreground/50 text-lg tracking-wider">感谢停留。</p>
      </section>
    </div>
  );
}
