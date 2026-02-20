// src/components/BreedList/BreedListContainer.tsx
"use client";

import { useState } from "react";
import { catApi } from "@/api/catApi";
import BreedCard from "../BreedCard/BreedCard";
import {
  SimpleGrid,
  Button,
  Center,
  Container,
  Box,
  Skeleton,
  Stack,
} from "@mantine/core";

export default function BreedListContainer({
  children,
  initialPage,
}: {
  children: React.ReactNode;
  initialPage: number;
}) {
  const [extraBreeds, setExtraBreeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);

  const handleLoadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    try {
      const data = await catApi.fetchBreeds(12, nextPage);
      const enriched = await Promise.all(
        data.map(async (breed: any) => {
          if (breed.reference_image_id) {
            const imgRes = await catApi.fetchImagesByBreed(
              breed.reference_image_id,
            );
            return { ...breed, image_url: imgRes.url };
          }
          return { ...breed, image_url: "" };
        }),
      );
      setExtraBreeds((prev) => [...prev, ...enriched]);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" p={0} style={{ border: "none" }}>
      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 3, md: 4 }}
        spacing="lg"
        verticalSpacing="xl"
      >
        {/* 1. 初始渲染内容 */}
        {children}

        {/* 2. 更多品种内容 */}
        {extraBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}

        {/* 3. 终极橘色 Skeleton (与 CatList 对齐) */}
        {loading &&
          Array(4)
            .fill(0)
            .map((_, index) => (
              <Stack
                key={`breed-skeleton-${index}`}
                className="orange-skeleton-group"
                gap="xs"
              >
                {/* BreedCard 是带 Overlay 的背景图风格，高度 200 */}
                <Skeleton height={200} radius="lg" />
              </Stack>
            ))}
      </SimpleGrid>

      <Center mt={60} pb={40}>
        <Button
          onClick={handleLoadMore}
          loading={loading}
          loaderProps={{ type: "dots" }}
          className="load-more-button"
          size="lg"
          radius="xl"
        >
          查看更多猫咪品种
        </Button>
      </Center>

      <style>{`
        /* --- Skeleton 强制变橘逻辑 --- */
        .orange-skeleton-group .mantine-Skeleton-root {
          background-color: var(--mantine-color-orange-1) !important;
          &::before {
            background: var(--mantine-color-orange-0) !important;
          }
        }

        [data-mantine-color-scheme="dark"] .orange-skeleton-group .mantine-Skeleton-root {
          background-color: var(--mantine-color-orange-9) !important;
          &::before {
            background: var(--mantine-color-orange-8) !important;
          }
        }

        /* --- Button 橘色系适配 (与 CatList 一致) --- */
        .load-more-button {
          transition: all 0.2s ease;
          background-color: var(--mantine-color-orange-4);
          color: white;
          border: 0;
        }

        [data-mantine-color-scheme="dark"] .load-more-button {
          background-color: var(--mantine-color-orange-2);
          color: var(--mantine-color-orange-9);
        }

        .load-more-button:hover {
          transform: translateY(-3px) scale(1.05);
          filter: brightness(1.1);
        }

        .load-more-button:active {
          transform: translateY(0) scale(0.95);
        }
      `}</style>
    </Container>
  );
}
