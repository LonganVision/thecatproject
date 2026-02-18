// src/components/CatCard/CatCard.tsx
"use client";

import Link from "next/link";
import { Card, Image, Text, Badge, Group, Anchor, Stack } from "@mantine/core";
import { Cat } from "../../api/catApi";

interface CatCardProps {
  cat: Cat;
}

const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  const breed = cat.breeds?.[0]; // 加上可选链，防止有的猫没品种信息导致崩溃
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
      // 用 Mantine 的原生 hover 逻辑代替复杂的 styles 属性
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "var(--mantine-shadow-md)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--mantine-shadow-sm)";
      }}
    >
      <Card.Section>
        <Image
          src={cat.url}
          height={200}
          alt="cat"
          fit="cover" // 替代之前的 object-fit
        />
      </Card.Section>

      <Stack mt="md" gap="xs">
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} size="md">
            品种：
            <Anchor
              component={Link}
              href={`/breeds/${breed.id}`}
              c="pink.5"
              underline="hover"
              fw={700}
            >
              {breed.name}
            </Anchor>
          </Text>
        </Group>
        <Text fw={500} size="md">
          起源：{breed.origin || "神秘星球"}
        </Text>
      </Stack>
    </Card>
  );
};

export default CatCard;
