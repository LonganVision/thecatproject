import { Link } from "react-router-dom";
import styles from "./CatCard.module.css";
import { Cat } from "../../api/catApi";

// 1. 定义这个组件接收的参数形状
interface CatCardProps {
  cat: Cat;
}
const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  const breed = cat.breeds[0];

  return (
    <div className={styles.card}>
      <img src={cat.url} alt="cat" className={styles.catImage} />

      <div className={styles.info}>
        <h3>
          品种：
          <Link to={`/breeds/${breed.id}`} className={styles.breedLink}>
            {breed.name}
          </Link>
        </h3>
        <p>起源: {breed.origin || "未知"}</p>
      </div>
    </div>
  );
};

export default CatCard;
