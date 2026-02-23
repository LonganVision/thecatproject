import { createTheme, CSSVariablesResolver } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "orange",
  defaultRadius: "xl",
  cursorType: "pointer",
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-body": "var(--mantine-color-orange-1)",
    "--nav-bg": "rgba(255, 255, 255, 0.8)",
    "--nav-border": "var(--mantine-color-orange-2)",
    "--logo-color": "var(--mantine-color-orange-6)",
    "--nav-link": "var(--mantine-color-gray-7)",
  },
  dark: {
    "--mantine-color-body": "var(--mantine-color-dark-6)",
    "--nav-bg": "rgba(30, 30, 30, 0.85)",
    "--nav-border": "var(--mantine-color-dark-5)",
    "--logo-color": "var(--mantine-color-orange-4)",
    "--nav-link": "var(--mantine-color-gray-4)",
  },
});
