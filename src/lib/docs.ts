import fs from "fs";
import path from "path";

export type NavItem = {
  title: string;
  href: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

const DOCS_DIR = path.join(process.cwd(), "public", "markdowns");
const LEARNING_DIR = path.join(process.cwd(), "public", "learning");
const WRITING_DIR = path.join(process.cwd(), "public", "writing");

function getTitleFromFilename(filename: string): string {
  // 移除扩展名，将连字符替换为为空格，首字母大写
  const name = filename.replace(/\.md$/, "").replace(/-/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getNavFromDir(baseDir: string, basePath: string): NavGroup[] {
  const groups: NavGroup[] = [];

  // 1. 处理根目录下的文件 (作为 "概览" 分组)
  const rootItems: NavItem[] = [];
  // 定义显示顺序和自定义标题
  const priorityFiles: Record<string, string> = {
    "welcome.md": "欢迎使用",
    "quick-start.md": "快速开始",
    "deploy.md": "部署",
    "faq.md": "常见问题",
  };

  if (fs.existsSync(baseDir)) {
    const files = fs.readdirSync(baseDir);

    // 先添加优先级高的文件
    Object.keys(priorityFiles).forEach((file) => {
      if (files.includes(file)) {
        const href =
          file === "welcome.md"
            ? basePath
            : `${basePath}/${file.replace(/\.md$/, "")}`;
        rootItems.push({
          title: priorityFiles[file],
          href,
        });
      }
    });

    // 添加其他根目录 markdown 文件
    files.forEach((file) => {
      const fullPath = path.join(baseDir, file);
      // 如果不是优先级文件且是 markdown 文件
      if (!Object.keys(priorityFiles).includes(file) && file.endsWith(".md")) {
        try {
          const stat = fs.statSync(fullPath);
          if (stat.isFile()) {
            rootItems.push({
              title: getTitleFromFilename(file),
              href: `${basePath}/${file.replace(/\.md$/, "")}`,
            });
          }
        } catch (e) {
          console.error(`Error reading file ${file}:`, e);
        }
      }
    });

    if (rootItems.length > 0) {
      groups.push({ title: "概览", items: rootItems });
    }

    // 2. 处理子目录 (作为独立分组)
    files.forEach((file) => {
      const fullPath = path.join(baseDir, file);
      try {
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          const subFiles = fs.readdirSync(fullPath);
          const subItems: NavItem[] = [];

          subFiles.forEach((subFile) => {
            if (subFile.endsWith(".md")) {
              subItems.push({
                title: getTitleFromFilename(subFile),
                href: `${basePath}/${file}/${subFile.replace(/\.md$/, "")}`,
              });
            }
          });

          if (subItems.length > 0) {
            // 简单的目录名映射
            let groupTitle = getTitleFromFilename(file);
            if (file === "frontend") groupTitle = "前端开发";
            if (file === "rearend") groupTitle = "后端开发";
            if (file === "algorithms") groupTitle = "算法";
            if (file === "english") groupTitle = "英语精读文章";

            groups.push({ title: groupTitle, items: subItems });
          }
        }
      } catch (e) {
        console.error(`Error processing directory ${file}:`, e);
      }
    });
  }

  return groups;
}

export function getDocsNav(): NavGroup[] {
  return getNavFromDir(DOCS_DIR, "/docs");
}

export function getLearningNav(): NavGroup[] {
  return getNavFromDir(LEARNING_DIR, "/learning");
}

export function getWritingNav(): NavGroup[] {
  return getNavFromDir(WRITING_DIR, "/writing");
}
