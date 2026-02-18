"use client";
import React from "react";
import Link from "next/link";
import { Card, Text, Overlay, Center } from "@mantine/core";
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
      style={{
        height: 200,
        backgroundImage: `url(${breed.image_url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        cursor: "pointer",
        overflow: "hidden",
        border: "none",
        // 定义一个局部的 CSS 变量控制透明度
        "--overlay-opacity": "1",
        "--title-scale": "1",
        transition: "all 0.3s ease",
      }}
      // 通过事件改变变量值，避开选择器报错
      onMouseEnter={(e) => {
        e.currentTarget.style.setProperty("--overlay-opacity", "0");
        e.currentTarget.style.setProperty("--title-scale", "1.1");
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty("--overlay-opacity", "1");
        e.currentTarget.style.setProperty("--title-scale", "1");
      }}
    >
      <Overlay
        color="#000"
        backgroundOpacity={0.45}
        blur={4}
        zIndex={1}
        // 使用我们定义的变量
        style={{
          opacity: "var(--overlay-opacity)",
          transition: "opacity 0.4s ease",
        }}
      >
        <Center h="100%">
          <Text
            c="white"
            fw={800}
            style={{
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
              fontSize: "1.5rem",
              transform: "scale(var(--title-scale))",
              transition: "transform 0.3s ease",
            }}
          >
            {breed.name ?? "神秘品种"}
          </Text>
        </Center>
      </Overlay>
    </Card>
  );
};

export default BreedCard;
