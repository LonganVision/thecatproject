"use client";

import { useState } from "react";
import { SimpleGrid, Button, Center, Container } from "@mantine/core";
import styles from "./CommonListContainer.module.css";

interface CommonListContainerProps<T> {
  children: React.ReactNode;
  initialPage: number;
  fetchData: (page: number) => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  renderSkeleton: () => React.ReactNode;
  buttonLabel: string;
}

export default function CommonListContainer<T>({
  children,
  initialPage,
  fetchData,
  renderItem,
  renderSkeleton,
  buttonLabel,
}: CommonListContainerProps<T>) {
  const [extraItems, setExtraItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);

  const handleLoadMore = async () => {
    if (loading) return; // 防止重复点击
    setLoading(true);
    const nextPage = page + 1;
    try {
      const data = await fetchData(nextPage);
      if (data && data.length > 0) {
        setExtraItems((prev) => [...prev, ...data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Load more failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" p={0}>
      <SimpleGrid
        // 这里控制骨架屏颜色
        className={styles.orangeSkeletonGroup}
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="lg"
        verticalSpacing="xl"
      >
        {children}
        {extraItems.map((item, index) => renderItem(item))}
        {loading && renderSkeleton()}
      </SimpleGrid>

      <Center mt={60} pb={40}>
        <Button
          onClick={handleLoadMore}
          loading={loading}
          loaderProps={{ type: "dots" }}
          // 确保这里的变量名和 CSS Module 一致
          className={styles.orangeLoadMore}
          size="lg"
          radius="xl"
        >
          {buttonLabel}
        </Button>
      </Center>
    </Container>
  );
}
