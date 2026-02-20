// src/components/NavBar/NavBar.tsx
"use client";
import Link from "next/link";
import {
  Stack,
  Group,
  Text,
  Anchor,
  Container,
  Box,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
const NavBar = () => {
  const { setColorScheme } = useMantineColorScheme();

  // getInitialValueInEffect: true 确保在水合完成后获取正确值，防止 SSR 闪烁
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  return (
    <Container size="lg" h="100%">
      <Group justify="center" align="center" h="100%" wrap="nowrap">
        <Stack align="center" gap={6} justify="center" h="100%">
          {/*Title*/}
          <Text
            component={Link}
            href="/"
            c="light-dark(var(--mantine-color-orange-6), var(--mantine-color-orange-4))"
            fw={800} // 对应 fontWeight
            fz="2.8rem" // 对应 fontSize
            lts="1px"
            styles={{
              root: {
                textDecoration: "none",
                display: "inline-block",
                transition: "transform 0.3s ease",
              },
            }}
            className="logo-hover-effect"
          >
            猫猫网站
          </Text>
          {/*Navigation*/}
          <Group gap="xl">
            <Anchor
              component={Link}
              href="/gallery"
              underline="never"
              className="animated-underline"
              c="light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-4))"
              fw={600}
            >
              相册
            </Anchor>

            <Text c="gray.3" fw={100} visibleFrom="xs">
              |
            </Text>

            <Anchor
              component={Link}
              href="/breeds"
              underline="never"
              className="animated-underline"
              c="light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-4))"
              fw={600}
            >
              品种
            </Anchor>
            <Text c="gray.3" fw={100} visibleFrom="xs">
              |
            </Text>
            <ActionIcon
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light",
                )
              }
              variant="default"
              size="sm"
              className="animated-underline"
            >
              {computedColorScheme === "light" ? (
                <IconMoon size={16} stroke={1.5} />
              ) : (
                <IconSun size={16} stroke={1.5} />
              )}
            </ActionIcon>
          </Group>
        </Stack>
      </Group>
      <style>{`
        .logo-hover-effect:hover { transform: scale(1.05); }
        .animated-underline:hover { color: var(--mantine-color-orange-6) !important; }
      `}</style>
    </Container>
  );
};

export default NavBar;
