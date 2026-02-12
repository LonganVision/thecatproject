import { useEffect, useState } from "react";
import styles from "./Breeds.module.css";
import { Link } from "react-router-dom";

const Breeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const fetchBreeds = async (currentPage) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/breeds?limit=12&page=${currentPage}`,
        {
          headers: {
            "x-api-key":
              "live_X1HjjKAGhv7qfqTiZi79O40eAgqh2KwlZSdXpeSONasYtBU9wzSDAF342o0vkZK4",
          },
        },
      );
      const data = await response.json();
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
          <Link
            key={breed.id}
            to={`/breeds/${breed.id}`}
            className={styles.cardLink}
          >
            <div
              key={breed.id}
              className={styles.card}
              style={{
                backgroundImage: `url(${breed.image?.url || "https://via.placeholder.com/300"})`,
              }}
            >
              <div className={styles.overlay}>
                <div className={styles.info}>
                  <h3>{breed?.name ?? "神秘品种"}</h3>
                </div>
              </div>
            </div>
          </Link>
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
