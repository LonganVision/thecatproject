"use client";
import { MantineProvider } from "@mantine/core";
import { theme, resolver } from "@/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme="auto"
    >
      {children}
    </MantineProvider>
  );
}
