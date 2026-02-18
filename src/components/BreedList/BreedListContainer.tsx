// src/components/BreedListContainer.tsx
"use client";

import { useState } from "react";
import { catApi } from "@/api/catApi";
import BreedCard from "../BreedCard/BreedCard";
import styles from "./BreedListContainer.module.css";

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
      // 客户端加载更多时，依然需要跑这一套逻辑（或者你可以封装到 catApi 里）
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
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* 样式建议写在 module css 里 */}
        {children} {/* 服务器送来的首屏 12 个带图卡片 */}
        {extraBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className={styles.loadMoreBtn}
        >
          {loading ? "喵喵搬运中..." : "查看更多猫咪品种"}
        </button>
      </div>
    </div>
  );
}
