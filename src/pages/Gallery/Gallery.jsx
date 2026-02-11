import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";

const Gallery = () => {
  //useState = 储存数据的存钱罐
  //盒子里的猫
  const [cats, setCats] = useState([]);
  //加载状态
  const [loading, setLoading] = useState(true);
  //页码
  const [page, setPage] = useState(0);

  const fetchCats = async (currentPage) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=12&has_breeds=1",
        {
          headers: {
            "x-api-key":
              "live_X1HjjKAGhv7qfqTiZi79O40eAgqh2KwlZSdXpeSONasYtBU9wzSDAF342o0vkZK4",
          },
        },
      );
      const data = await response.json();
      setCats((prevCats) =>
        currentPage === 0 ? data : [...prevCats, ...data],
      );
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  //useEffect = 数据变动时的“自动触发器”
  useEffect(() => {
    fetchCats(0);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage); // 更新状态
    fetchCats(nextPage); // 抓取下一页
  };

  return (
    <>
      <div className={styles.grid}>
        {cats.map((cat) => (
          <div key={cat.id} className={styles.card}>
            <img src={cat.url} alt="cat" className={styles.catImage} />
            {/* 展示元数据：注意 API 返回的是 breeds 数组 */}
            <div className={styles.info}>
              <h3>品种：{cat.breeds?.[0]?.name || "神秘品种"}</h3>
              <p>起源: {cat.breeds?.[0]?.origin || "未知"}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className={styles.loadMoreBtn}
        >
          {loading ? "喵喵搬运中..." : "查看更多猫咪"}
        </button>
      </div>
    </>
  );
};

export default Gallery;
