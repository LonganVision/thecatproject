"use client";

import { useState } from "react";
import { catApi } from "@/api/catApi";
import BreedCard from "../BreedCard/BreedCard";
import { SimpleGrid, Button, Center, Container } from "@mantine/core";

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
    // 1. 使用 Container 替代 .container
    <Container size="lg" py="xl">
      {/* 2. 使用 SimpleGrid 替代 .grid，完美适配 250px 左右的卡片宽度 */}
      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 3, md: 4 }}
        spacing="lg"
        verticalSpacing="xl"
      >
        {children}
        {extraBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </SimpleGrid>

      {/* 3. 使用 Center 和 Button 替代 .buttonWrapper 和 .loadMoreBtn */}
      <Center mt={50}>
        <Button
          onClick={handleLoadMore}
          loading={loading}
          loaderProps={{ type: "dots" }}
          color="pink.5"
          size="lg"
          radius="xl"
          variant="filled"
          style={{
            transition: "all 0.2s ease",
          }}
          // 给按钮也加上你喜欢的 hover 放大效果
          styles={{
            root: {
              "&:hover": {
                transform: "scale(1.05)",
              },
            },
          }}
        >
          {loading ? "喵喵搬运中..." : "查看更多猫咪品种"}
        </Button>
      </Center>
    </Container>
  );
}
