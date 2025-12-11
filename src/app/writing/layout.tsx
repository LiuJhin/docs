import { Sidebar } from "@/app/docs/sidebar";
import { Toc } from "@/app/docs/toc";
import { getWritingNav } from "@/lib/docs";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navGroups = getWritingNav();
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20">
      {/* 极淡网格背景 */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="flex max-w-screen-2xl mx-auto">
        {/* 左侧导航 */}
        <Sidebar groups={navGroups} />

        {/* 主内容区 */}
        <main className="flex-1 max-w-4xl mx-auto px-8 py-16">{children}</main>

        {/* 右侧目录（桌面可见）*/}
        <div className="hidden lg:block w-64 flex-shrink-0 pl-8 py-16">
          <Toc />
        </div>
      </div>
    </div>
  );
}
