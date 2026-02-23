"use client";
import React from "react";
import Link from "next/link";
import { Card, Text, Overlay, Center, BackgroundImage } from "@mantine/core";
import { BreedWithImage } from "../../api/catApi";
import styles from "./BreedCard.module.css"; // 确保导入了样式

interface BreedCardProps {
  breed: BreedWithImage;
}

const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  return (
    <Card
      component={Link}
      href={`/breeds/${breed.id}`}
      p={0}
      radius="lg"
      shadow="md"
      withBorder
      className={styles.breedCardRoot}
    >
      <BackgroundImage
        src={breed.image_url || "https://placekitten.com/400/300"}
        h="100%"
      >
        <Overlay blur={5} zIndex={1} className={styles.cardOverlay} />
        <Center h="100%" p="md">
          <Text
            className={styles.breedNameText}
            c="light-dark(var(--mantine-color-orange-2), var(--mantine-color-orange-5))"
            fw={900}
            ta="center"
          >
            {breed.name ?? "神秘品种"}
          </Text>
        </Center>
      </BackgroundImage>
    </Card>
  );
};

// 检查这一行是否存在！
export default BreedCard;
