"use client"; // 关键！

import CommonListContainer from "../Shared/CommonListContainer";
import CatCard from "../CatCard/CatCard";
import { catApi, Cat } from "../../api/catApi";
import { Stack, Skeleton } from "@mantine/core";

export default function CatListContainer({
  children,
  initialPage,
}: {
  children: React.ReactNode;
  initialPage: number;
}) {
  // 函数定义在 Client Component 内部，没问题
  const fetchData = (page: number) => catApi.fetchCats(12, page);

  const renderSkeleton = () =>
    Array(4)
      .fill(0)
      .map((_, i) => (
        <Stack key={i} gap="xs">
          {" "}
          {/* 删掉了 className="orange-skeleton-group" */}
          <Skeleton height={200} radius="md" />
          <Skeleton height={20} width="70%" radius="xl" />
          <Skeleton height={20} width="40%" radius="xl" />
        </Stack>
      ));

  return (
    <CommonListContainer<Cat>
      initialPage={initialPage}
      fetchData={fetchData}
      renderItem={(cat) => <CatCard key={cat.id} cat={cat} />}
      renderSkeleton={renderSkeleton}
      buttonLabel="查看更多猫咪"
    >
      {children}
    </CommonListContainer>
  );
}
