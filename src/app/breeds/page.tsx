"use client";

import { useEffect, useState } from "react";
import styles from "./breeds.module.css";
import { catApi, Breed } from "../../api/catApi";
import BreedCard from "../../components/BreedCard/BreedCard";

// 定义一个扩展类型，确保 TS 知道我们的 breed 现在带有 image_url
interface BreedWithImage extends Breed {
  image_url?: string;
}

const Breeds = () => {
  // 修改状态类型为 BreedWithImage[]
  const [breeds, setBreeds] = useState<BreedWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const fetchBreeds = async (currentPage: number) => {
    setLoading(true);
    try {
      // 1. 先抓取基础的品种文字数据
      const data = await catApi.fetchBreeds(12, currentPage);

      // --- 【新增改动】: 批量并行获取图片 URL ---
      const enrichedData: BreedWithImage[] = await Promise.all(
        data.map(async (breed: Breed) => {
          if (breed.reference_image_id) {
            try {
              // 并发调用获取图片接口
              const imgRes = await catApi.fetchImagesByBreed(
                breed.reference_image_id,
              );
              return { ...breed, image_url: imgRes.url };
            } catch (err) {
              console.error(`图片加载失败: ${breed.id}`, err);
              return { ...breed, image_url: "" }; // 失败则给空串
            }
          }
          return { ...breed, image_url: "" };
        }),
      );
      // --- 【改动结束】 ---

      setBreeds((prevBreeds) => {
        // 使用处理后的 enrichedData 进行合并
        if (currentPage === 0) return enrichedData;

        const allBreeds = [...prevBreeds, ...enrichedData];
        const uniqueMap = new Map(allBreeds.map((item) => [item.id, item]));

        return Array.from(uniqueMap.values());
      });
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreeds(0);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBreeds(nextPage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {breeds.map((breed) => (
          // 现在的 BreedCard 拿到的已经是带图的数据了
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
};

export default Breeds;
