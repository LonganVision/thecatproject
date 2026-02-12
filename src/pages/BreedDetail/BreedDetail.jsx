import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BreedDetail.module.css";

const BreedDetail = () => {
  const { breed_id } = useParams(); // 获取 URL 中的 id
  const navigate = useNavigate();
  const [breedData, setBreedData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // 1. 先获取品种文字信息
        const breedRes = await fetch(
          `https://api.thecatapi.com/v1/breeds/${breed_id}`,
          {
            headers: {
              "x-api-key":
                "live_X1HjjKAGhv7qfqTiZi79O40eAgqh2KwlZSdXpeSONasYtBU9wzSDAF342o0vkZK4",
            },
          },
        );
        const breedDataJson = await breedRes.json();

        // 2. 关键步骤：用 reference_image_id 获取包含正确 URL 的图片对象
        let imageUrl = "";
        if (breedDataJson.reference_image_id) {
          const imgRes = await fetch(
            `https://api.thecatapi.com/v1/images/${breedDataJson.reference_image_id}`,
            {
              headers: {
                "x-api-key":
                  "live_X1HjjKAGhv7qfqTiZi79O40eAgqh2KwlZSdXpeSONasYtBU9wzSDAF342o0vkZK4",
              },
            },
          );
          const imgData = await imgRes.json();
          imageUrl = imgData.url; // 这里拿到的 URL 是带正确后缀（jpg/png/gif）的！
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
        <img src={breedData.url} alt={info.name} className={styles.mainImage} />

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
