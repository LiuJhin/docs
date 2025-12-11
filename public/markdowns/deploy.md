# 部署指南

MarkView 是基于 Next.js 构建的，因此非常容易部署到 Vercel。

## Vercel 部署（推荐）

最简单的部署方式是使用 [Vercel](https://vercel.com)。

1. 将代码推送到 GitHub。
2. 登录 Vercel 并导入你的仓库。
3. Vercel 会自动识别 Next.js 项目并进行构建。
4. 点击 "Deploy" 即可。

## Docker 部署

如果你更喜欢使用 Docker：

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]
```
