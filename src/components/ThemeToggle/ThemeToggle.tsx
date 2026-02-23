"use client";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  // 挂载后才显示图标，解决 Hydration failed 报错
  useEffect(() => setMounted(true), []);

  if (!mounted) return <ActionIcon variant="default" size="md" radius="md" />;

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      variant="default"
      size="md"
      radius="lg"
    >
      {colorScheme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  );
}
