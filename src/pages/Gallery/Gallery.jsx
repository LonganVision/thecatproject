import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import { catApi } from "../../api/catApi";
import CatCard from "../../components/CatCard/CatCard";

const Gallery = () => {
  //useState = 储存数据的存钱罐
  //盒子里的猫
  const [cats, setCats] = useState([]);
  //加载状态
  const [loading, setLoading] = useState(true);
  //页码
  const [page, setPage] = useState(0);

  const fetchCats = async (currentPage) => {
    setLoading(true);
    try {
      const data = await catApi.fetchCats(12, currentPage);
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
          <CatCard key={cat.id} cat={cat} />
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
