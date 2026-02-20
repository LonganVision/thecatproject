// src/components/CatCard/CatCard.tsx
"use client";

import Link from "next/link";
import { Card, Image, Text, Anchor, Stack } from "@mantine/core";
import { Cat } from "../../api/catApi";

interface CatCardProps {
  cat: Cat;
}

const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  const breed = cat.breeds?.[0];

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="cat-card-root"
      style={{
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      <Card.Section>
        <Image
          src={cat.url}
          height={200}
          alt={breed?.name || "cat"}
          fit="cover"
        />
      </Card.Section>

      <Stack mt="md" gap="xs">
        <Text
          fw={700}
          size="md"
          c="light-dark(var(--mantine-color-orange-6), var(--mantine-color-body))"
        >
          品种：
          <Anchor
            component={Link}
            href={`/breeds/${breed?.id}`}
            c="pink.5"
            underline="hover"
          >
            {breed?.name || "未知品种"}
          </Anchor>
        </Text>

        <Text
          fw={500}
          size="sm"
          c="light-dark(var(--mantine-color-orange-6), var(--mantine-color-body))"
        >
          起源：{breed?.origin || "神秘星球"}
        </Text>
      </Stack>

      <style>{`
        /* 1. 基础背景色自定义 */
        .cat-card-root {
          background-color: white;
        }

        [data-mantine-color-scheme="dark"] .cat-card-root {
          background-color: var(--mantine-color-orange-1);
        }

        /* 2. Light Mode 下的 Hover 效果 (默认) */
        .cat-card-root:hover {
          transform: translateY(-5px);
          box-shadow: var(--mantine-shadow-md);
          border-color: var(--mantine-color-orange-4);
          background-color: var(--mantine-color-orange-0); 
        }

        /* 3. Dark Mode 下的 Hover 效果 */
        [data-mantine-color-scheme="dark"] .cat-card-root:hover {
          background-color: var(--mantine-color-orange-3);
          border-color: var(--mantine-color-orange-4);
        }
      `}</style>
    </Card>
  );
};

export default CatCard;
