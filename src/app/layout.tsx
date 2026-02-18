import "@mantine/core/styles.css"; //只在最顶层导入一次
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  MantineProvider,
  Container,
  ColorSchemeScript,
} from "@mantine/core";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐱</text></svg>"
        />
        <title>thecatproject</title>
      </head>
      <body>
        <MantineProvider>
          <AppShell
            header={{ height: { base: 100, sm: 120 } }} // 这里的 60 是 header 的高度
            padding="md" // 自动给 main 区域加内边距
          >
            {/* 原先App.tsx的内容，不用自己写router，直接放进来 */}
            <AppShellHeader
              style={{
                // 找回毛玻璃质感
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                // 增加一个淡淡的投影
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NavBar />
            </AppShellHeader>
            {/* 这里的 children 会根据你访问的 URL 自动切换成 
             Gallery.tsx 或 Breeds.tsx，不需要手动写 <Routes> */}
            <AppShellMain>
              {/* Container 替代了原本 .main-content 里的 max-width: 1200px 和 margin: 0 auto */}
              <Container size="lg">{children}</Container>
            </AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
