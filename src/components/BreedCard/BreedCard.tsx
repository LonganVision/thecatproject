"use client";
import React from "react";
import Link from "next/link";
import { Card, Text, Overlay, Center, BackgroundImage } from "@mantine/core";
import { BreedWithImage } from "../../api/catApi";

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
      className="breed-card-root"
      style={{
        height: 200,
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform 0.3s ease",
      }}
    >
      <BackgroundImage
        src={breed.image_url || "https://placekitten.com/400/300"}
        h="100%"
      >
        <Overlay
          blur={5}
          zIndex={1}
          className="card-overlay"
          style={{ transition: "opacity 0.4s ease" }}
        />
        <Center h="100%" p="md">
          {" "}
          {/* 添加 padding，防止文字贴边 */}
          <Text
            c="light-dark(var(--mantine-color-orange-2), var(--mantine-color-orange-5))"
            fw={900}
            // --- 核心修改：处理换行与居中 ---
            ta="center" // 文本内部水平居中
            style={{
              fontSize: "1.7rem",
              zIndex: 2,
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              wordBreak: "break-word", // 强制长单词换行
              lineHeight: 1.2, // 调整行高，换行后更美观
              maxWidth: "100%", // 限制最大宽度
            }}
          >
            {breed.name ?? "神秘品种"}
          </Text>
        </Center>
      </BackgroundImage>

      <style>{`
        .breed-card-root .card-overlay {
          opacity: 1 !important;
          background-color: rgba(0, 0, 0, 0.45) !important;
        }

        [data-mantine-color-scheme="dark"] .breed-card-root .card-overlay {
          background-color: rgba(255, 255, 255, 0.29) !important;
        }

        .breed-card-root:hover {
          transform: scale(1.05);
        }

        .breed-card-root:hover .card-overlay {
          opacity: 0 !important;
        }
      `}</style>
    </Card>
  );
};

export default BreedCard;
