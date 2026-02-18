This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```text
src
├── api
│   └── catApi.ts           # 统一 API 请求层 (Server/Client 共享)
├── app                     # 路由与服务端逻辑 (Server Components)
│   ├── breeds
│   │   ├── [breedDetail]   # 品种详情页：服务端取数
│   │   │   ├── breedDetail.module.css
│   │   │   └── page.tsx
│   │   ├── page.tsx        # 品种列表页：负责首屏数据预取
│   ├── gallery
│   │   └── page.tsx        # 猫咪画廊页：负责首屏图片预取
│   ├── globals.css
│   ├── layout.tsx          # 全局布局：包含共享的导航栏
│   └── page.tsx            # 首页内容: redirect gallery page
└── components              # 可复用组件与客户端逻辑
    ├── BreedCard           # 展示型组件（Presenter）
    │   ├── BreedCard.module.css
    │   └── BreedCard.tsx
    ├── BreedList           # 客户端容器：管理“加载更多”交互与状态
    │   ├── BreedListContainer.module.css
    │   └── BreedListContainer.tsx
    ├── CatCard             # 展示型组件（Presenter）
    │   ├── CatCard.module.css
    │   └── CatCard.tsx
    ├── CatList             # 客户端容器：管理画廊的瀑布流加载
    │   ├── CatListContainer.module.css
    │   └── CatListContainer.tsx
    └── NavBar              # 客户端组件
        ├── NavBar.module.css
        └── NavBar.tsx
```
