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
        // 使用 images/search 接口并指定 breed_id
        const response = await fetch(
          `https://api.thecatapi.com/v1/breeds/${breed_id}`,
          {
            headers: {
              "x-api-key":
                "live_X1HjjKAGhv7qfqTiZi79O40eAgqh2KwlZSdXpeSONasYtBU9wzSDAF342o0vkZK4",
            },
          },
        );
        const data = await response.json();
        //console.log("当前请求的 ID:", breed_id);
        // data[0] 包含了该品种的详细信息和一张精美图片
        //console.log("准备把图片地址从", breedData?.url, "改为", data[0].url);
        const fixedData = {
          url: `https://cdn2.thecatapi.com/images/${data.reference_image_id}.jpg`,
          breeds: [data],
        };

        setBreedData(fixedData);
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
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        返回列表
      </button>

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
    </div>
  );
};

export default BreedDetail;
