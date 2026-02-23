"use client";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="sm"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === "light" ? (
        <IconMoon size={16} stroke={1.5} />
      ) : (
        <IconSun size={16} stroke={1.5} />
      )}
    </ActionIcon>
  );
}
