import { useEffect, useState } from "react";
import styles from "./Breeds.module.css";
import { Link } from "react-router-dom";
import { catApi } from "../../api/catApi";
import BreedCard from "../../components/BreedCard/BreedCard";

const Breeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const fetchBreeds = async (currentPage) => {
    setLoading(true);
    try {
      const data = await catApi.fetchBreeds(12, currentPage);
      setBreeds((prevBreeds) => {
        if (currentPage === 0) return data;
        // 2. 如果是加载更多，进行去重合并
        const allBreeds = [...prevBreeds, ...data];
        // 3. 使用 Map 以 breed.id 为 Key 进行去重
        // item.id 作为键，item 本身作为值
        const uniqueMap = new Map(allBreeds.map((item) => [item.id, item]));

        // 4. 将 Map 的值转回数组
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
    setPage(nextPage); // 更新状态
    fetchBreeds(nextPage); // 抓取下一页
  };
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {breeds.map((breed) => (
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
