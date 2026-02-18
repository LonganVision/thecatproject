"use client";

import { useState } from "react";
import { catApi, Cat } from "../../api/catApi";
import CatCard from "../CatCard/CatCard";
import { SimpleGrid, Button, Center, Box } from "@mantine/core";

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
    const data = await catApi.fetchCats(12, nextPage);
    setExtraCats((prev) => [...prev, ...data]);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <Box pb="xl">
      {/* 1. 使用 SimpleGrid 替代 .grid */}
      {/* cols 控制列数，spacing 控制间距 */}
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="lg"
        verticalSpacing="xl"
      >
        {/* 服务器端初次渲染的内容 */}
        {children}

        {/* 客户端加载的更多内容 */}
        {extraCats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </SimpleGrid>

      {/* 2. 使用 Center 和 Button 替代 .buttonWrapper 和 .loadMoreBtn */}
      <Center mt={50} pb={40}>
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
          {loading ? "喵喵搬运中..." : "查看更多猫咪"}
        </Button>
      </Center>
    </Box>
  );
}
