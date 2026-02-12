import { Link } from "react-router-dom";
import styles from "./CatCard.module.css";

const CatCard = ({ cat }) => {
  const breed = cat.breeds?.[0];

  return (
    <div className={styles.card}>
      <img src={cat.url} alt="cat" className={styles.catImage} />

      <div className={styles.info}>
        <h3>
          品种：
          {breed ? (
            <Link to={`/breeds/${breed.id}`} className={styles.breedLink}>
              {breed.name}
            </Link>
          ) : (
            "神秘品种"
          )}
        </h3>
        <p>起源: {breed?.origin || "未知"}</p>
      </div>
    </div>
  );
};

export default CatCard;
