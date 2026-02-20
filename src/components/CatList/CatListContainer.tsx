// src/components/CatList/CatListContainer.tsx
"use client";

import { useState } from "react";
import { catApi, Cat } from "../../api/catApi";
import CatCard from "../CatCard/CatCard";
import {
  SimpleGrid,
  Button,
  Center,
  Container,
  Skeleton,
  Stack,
} from "@mantine/core";

export default function CatListContainer({
  children,
  initialPage,
}: {
  children: React.ReactNode;
  initialPage: number;
}) {
  const [extraCats, setExtraCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);

  const handleLoadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    try {
      const data = await catApi.fetchCats(12, nextPage);
      setExtraCats((prev) => [...prev, ...data]);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" p={0} style={{ border: "none" }}>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="lg"
        verticalSpacing="xl"
      >
        {children}

        {extraCats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}

        {loading &&
          Array(4)
            .fill(0)
            .map((_, index) => (
              <Stack
                key={`skeleton-${index}`}
                className="orange-skeleton-group"
                gap="xs"
              >
                {/* 注意：这里不需要再给 Skeleton 传颜色，全靠 CSS */}
                <Skeleton height={200} radius="md" />
                <Skeleton height={20} width="70%" radius="xl" />
                <Skeleton height={20} width="40%" radius="xl" />
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
          查看更多猫咪
        </Button>
      </Center>

      <style>{`
        /* 1. 终极方案：直接覆盖 Mantine Skeleton 的类名样式 */
        
        /* 浅色模式 */
        .orange-skeleton-group .mantine-Skeleton-root {
          background-color: var(--mantine-color-orange-2) !important;
          &::before {
            background: var(--mantine-color-orange-1) !important;
          }
        }

        /* 深色模式 */
        [data-mantine-color-scheme="dark"] .orange-skeleton-group .mantine-Skeleton-root {
          background-color: var(--mantine-color-orange-4) !important;
          &::before {
            background: var(--mantine-color-orange-3) !important;
          }
        }

        /* 2. 按钮样式 (Orange 主题) */
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
          transform: translateY(-3px) scale(1.02);
          filter: brightness(1.1);
        }
      `}</style>
    </Container>
  );
}
