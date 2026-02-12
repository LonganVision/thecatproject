import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BreedDetail.module.css";
import { catApi } from "../../api/catApi";

const BreedDetail = () => {
  const { breed_id } = useParams(); // 获取 URL 中的 id
  const navigate = useNavigate();
  const [breedData, setBreedData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // 1. 先获取品种文字信息
        const breedDataJson = await catApi.fetchBreedDetail(breed_id);
        console.log(breedDataJson);

        // 2. 用 reference_image_id 获取包含正确 URL 的图片对象
        let imageUrl = null;
        if (breedDataJson.reference_image_id) {
          const imgData = await catApi.fetchImagesByBreed(
            breedDataJson.reference_image_id,
          );
          imageUrl = imgData.url;
          console.log(imageUrl);
        }

        setBreedData({
          url: imageUrl,
          breeds: [breedDataJson],
        });
      } catch (error) {
        console.error("加载失败:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [breed_id]);

  if (loading) return <div className={styles.loader}>正在加载详细资料...</div>;
  if (!breedData) return <div>找不到该品种信息</div>;
  const info = breedData.breeds[0]; // 提取品种详细数据

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {breedData.url ? (
          <img
            src={breedData.url}
            alt={info.name}
            className={styles.mainImage}
          />
        ) : (
          <div className={styles.noPhotoBox}>
            <span className={styles.catIcon}>🐱</span>
            <p>官方暂未提供证件照</p>
          </div>
        )}

        <div className={styles.textSection}>
          <h1>{info.name}</h1>
          <p className={styles.origin}>原产地: {info.origin}</p>
          <p className={styles.description}>{info.description}</p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span>性格:</span> {info.temperament}
            </div>
            <div className={styles.statItem}>
              <span>平均寿命:</span> {info.life_span} 年
            </div>
            <div className={styles.statItem}>
              <span>适应能力:</span> {info.adaptability} / 5
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          返回列表
        </button>
      </div>
    </div>
  );
};

export default BreedDetail;
