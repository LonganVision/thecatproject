"use client"; // 关键！

import CommonListContainer from "../Shared/CommonListContainer";
import BreedCard from "../BreedCard/BreedCard";
import { catApi } from "@/api/catApi";
import { Skeleton } from "@mantine/core";

export default function BreedListContainer({
  children,
  initialPage,
}: {
  children: React.ReactNode;
  initialPage: number;
}) {
  const fetchData = async (page: number) => {
    const data = await catApi.fetchBreeds(12, page);
    return Promise.all(
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
  };

  const renderSkeleton = () =>
    Array(4)
      .fill(0)
      .map((_, i) => (
        <Skeleton key={i} height={200} radius="lg" /> // 删掉了外层包裹的 div
      ));

  return (
    <CommonListContainer<any>
      initialPage={initialPage}
      fetchData={fetchData}
      renderItem={(breed) => <BreedCard key={breed.id} breed={breed} />}
      renderSkeleton={renderSkeleton}
      buttonLabel="查看更多猫咪品种"
    >
      {children}
    </CommonListContainer>
  );
}
