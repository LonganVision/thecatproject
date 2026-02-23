"use client";
import { Container, Stack, Text } from "@mantine/core";

type ListPageLayoutProps = {
  subtitle: string;
  children: React.ReactNode;
  subtitleMb?: number;
};

export default function ListPageLayout({
  subtitle,
  children,
  subtitleMb = 20,
}: ListPageLayoutProps) {
  return (
    <main>
      <Container size="lg" p={0}>
        <Stack gap={0} mb={subtitleMb} align="center">
          <Text c="dimmed" fw={500}>
            {subtitle}
          </Text>
        </Stack>
        {children}
      </Container>
    </main>
  );
}
