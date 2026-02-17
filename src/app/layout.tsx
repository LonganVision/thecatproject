import NavBar from "@/components/NavBar/NavBar";
import "./globals.css";

{
  /* 在 layout.tsx 中，children 是一个特殊的 prop。
含义：它代表了“被当前布局包裹的内容” 。
自动化原理：当你访问 /gallery 时，
  Next.js 会自动把 app/gallery/page.tsx 里的组件当作 children 传给 RootLayout 。
类型定义：{ children: React.ReactNode } 是 TypeScript 的标准写法，
  用来告诉代码：children 可以是任何 React 能渲染的东西（组件、文字、甚至是一堆猫咪图片）*/
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>thecatproject</title>
      </head>
      <body>
        <div className="app-container">
          {/* 原先App.tsx的内容，不用自己写router，直接放进来 */}
          <header className="site-header">
            <NavBar />
          </header>
          {/* 这里的 children 会根据你访问的 URL 自动切换成 
             Gallery.tsx 或 Breeds.tsx，不需要手动写 <Routes> */}
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
