// src/components/NavBar/NavBar.tsx
"use client";
import Link from "next/link"; // 重点，Link从 next/link 导入
import { Stack, Group, Text, Anchor, Container, Center } from "@mantine/core";

const NavBar = () => {
  return (
    <Container size="lg" h="100%">
      <Stack align="center" gap={6}>
        <Text
          variant="gradient"
          gradient={{ from: "pink", to: "orange", deg: 45 }}
          style={{
            // 基础样式
            fontSize: "2.8rem",
            fontWeight: 800,
            letterSpacing: "1px",
            cursor: "pointer",
            display: "inline-block",
            transition: "transform 0.3s ease",

            // 使用 CSS 变量来定义缩放比例，默认为 1
            transform: "scale(var(--nav-logo-scale, 1))",
          }}
          // 鼠标移入/移出时动态修改变量值
          onMouseEnter={(e) =>
            e.currentTarget.style.setProperty("--nav-logo-scale", "1.05")
          }
          onMouseLeave={(e) =>
            e.currentTarget.style.setProperty("--nav-logo-scale", "1")
          }
        >
          猫猫网站
        </Text>
        <Group gap="xl">
          <Anchor
            component={Link}
            href="/gallery"
            underline="never" // 关闭 Mantine 默认下划线
            className="animated-underline" // 使用你保留的动画类
            c="dark.3"
            fw={600}
          >
            相册
          </Anchor>

          <Text c="gray.3" fw={100}>
            |
          </Text>

          <Anchor
            component={Link}
            href="/breeds"
            underline="never" // 关闭 Mantine 默认下划线
            className="animated-underline" // 使用你保留的动画类
            c="dark.3"
            fw={600}
          >
            品种
          </Anchor>
        </Group>
      </Stack>
    </Container>
  );
};

export default NavBar;
