import styles from "./breedDetail.module.css";
import { catApi } from "@/api/catApi";
import Link from "next/link"; // 用 Link 代替 router.back() 实现无 JS 跳转

// 1. 声明为 async 函数，直接在服务端运行
export default async function BreedDetailPage({
  params,
}: {
  params: Promise<{ breedDetail: string }>; // Next.js 15 必须声明为 Promise
}) {
  // 2. 解构参数前必须先 await params
  const { breedDetail: breed_id } = await params;

  try {
    // 3. 直接在服务端并行或串行获取数据
    const breedData = await catApi.fetchBreedDetail(breed_id);

    let imageUrl = "";
    if (breedData.reference_image_id) {
      const imageRes = await catApi.fetchImagesByBreed(
        breedData.reference_image_id,
      );
      imageUrl = imageRes.url;
    }

    if (!breedData) {
      return <div className={styles.container}>找不到该品种信息</div>;
    }

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          {/* 这里渲染时图片地址已经是现成的，不会有闪烁 */}
          <img
            src={imageUrl}
            alt={breedData.name}
            className={styles.mainImage}
          />

          <div className={styles.textSection}>
            <h1>{breedData.name}</h1>
            <p className={styles.origin}>原产地: {breedData.origin}</p>
            <p className={styles.description}>{breedData.description}</p>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span>性格:</span> {breedData.temperament}
              </div>
              <div className={styles.statItem}>
                <span>平均寿命:</span> {breedData.life_span} 年
              </div>
              <div className={styles.statItem}>
                <span>适应能力:</span> {breedData.adaptability} / 5
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          {/* 4. 使用 Link 回到列表，保持纯 Server 渲染，无需加载 JS */}
          <Link href="/breeds" className={styles.backBtn}>
            返回列表
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("加载失败:", error);
    return (
      <div className={styles.container}>数据加载出错，请检查品种 ID。</div>
    );
  }
}
