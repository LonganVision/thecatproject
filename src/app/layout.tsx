import "@mantine/core/styles.css";
import "./globals.css";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Container,
  ColorSchemeScript,
} from "@mantine/core";
import NavBar from "@/components/NavBar/NavBar";
import { Providers } from "@/components/Providers";

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
        <Providers>
          <AppShell header={{ height: 120 }}>
            <AppShellHeader>
              <NavBar />
            </AppShellHeader>

            <AppShellMain>
              <Container>{children}</Container>
            </AppShellMain>
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
