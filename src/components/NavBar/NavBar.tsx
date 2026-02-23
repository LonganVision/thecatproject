"use client";
import React from "react";
import Link from "next/link";
import { Stack, Group, Text, Anchor, Container } from "@mantine/core";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const NAV_LINKS = [
  { link: "/gallery", label: "相册" },
  { link: "/breeds", label: "品种" },
];

const NavBar = () => {
  return (
    <Container h="100%" px="md">
      <Group justify="center" align="center" h="100%" wrap="nowrap">
        {/* pb={12} 为下划线提供物理展示空间 */}
        <Stack align="center" gap={4} justify="center" h="100%" pb={12}>
          <Text
            component={Link}
            href="/"
            c="var(--logo-color)"
            className="logo-hover"
          >
            猫猫网站
          </Text>

          <Group gap="xl" align="center">
            {NAV_LINKS.map((item, index) => (
              <React.Fragment key={item.link}>
                <Anchor
                  component={Link}
                  href={item.link}
                  className="nav-link-animated"
                >
                  {item.label}
                </Anchor>

                {index < NAV_LINKS.length - 1 && (
                  <Text c="gray.3" fw={100} visibleFrom="xs">
                    |
                  </Text>
                )}
              </React.Fragment>
            ))}

            <Text c="gray.3" fw={100} visibleFrom="xs">
              |
            </Text>
            <ThemeToggle />
          </Group>
        </Stack>
      </Group>
    </Container>
  );
};

export default NavBar;
