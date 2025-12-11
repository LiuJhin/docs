# 快速开始

欢迎浏览我的 blog，其实我也不知为什么会突然想写 blog

## 1. 安装

首先，克隆项目并安装依赖：

```bash
git clone https://github.com/your-username/markview.git
cd markview
pnpm install
```

## 2. 运行开发服务器

启动本地开发环境：

```bash
pnpm dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可看到效果。

## 3. 编写文档

在 `public/markdowns` 目录下创建 `.md` 文件即可。

例如创建 `hello.md`，即可通过 `/docs/hello` 访问。

支持多级目录，例如 `public/markdowns/guide/intro.md` 可以通过 `/docs/guide/intro` 访问。
