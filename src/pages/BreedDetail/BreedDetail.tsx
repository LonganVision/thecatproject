import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BreedDetail.module.css";
import { catApi, Breed } from "../../api/catApi";

const BreedDetail = () => {
  const { breed_id } = useParams() as { breed_id: string }; // 获取 URL 中的 id
  const navigate = useNavigate();
  const [breedData, setBreedData] = useState<Breed | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const breedDataJson = await catApi.fetchBreedDetail(breed_id);
        //console.log(breedDataJson);
        setBreedData(breedDataJson);
        if (breedDataJson.reference_image_id) {
          const imageRes = await catApi.fetchImagesByBreed(
            breedDataJson.reference_image_id,
          );
          setImageUrl(imageRes.url); // 存下真正的图片地址
        }
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
  const info = breedData; // 提取品种详细数据

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={imageUrl} alt={info.name} className={styles.mainImage} />

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
