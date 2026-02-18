// src/components/CatList/CatListContainer.tsx
"use client";

import { useState } from "react";
import { catApi, Cat } from "../../api/catApi";
import CatCard from "../CatCard/CatCard"; // 这里的导入是为了“加载更多”
import styles from "./CatListContainer.module.css";

export default function CatListContainer({
  children, // 👈 这是服务器给你的“首屏成品”，不需要 JS 逻辑也能显示
  initialPage,
}: {
  children: React.ReactNode;
  initialPage: number;
}) {
  const [extraCats, setExtraCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    setLoading(true);
    const nextPage = initialPage + 1;
    const data = await catApi.fetchCats(12, nextPage);
    setExtraCats([...extraCats, ...data]);
    setLoading(false);
  };

  return (
    <>
      <div className={styles.grid}>
        {/* 1. 这里的渲染不需要下载 CatCard 的 JS 逻辑，因为它是 Server 传来的成品 */}
        {children}

        {/* 2. 这里的渲染需要 CatCard 的 JS 逻辑，因为它是 Client 端生成的 */}
        {extraCats.map((cat) => (
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
}
