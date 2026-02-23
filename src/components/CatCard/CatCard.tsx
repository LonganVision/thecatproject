"use client";

import React from "react";
import Link from "next/link";
import { Card, Image, Text, Anchor, Stack } from "@mantine/core";
import { Cat } from "../../api/catApi";
import styles from "./CatCard.module.css";

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
      className={styles.catCardRoot}
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
    </Card>
  );
};

export default CatCard;
