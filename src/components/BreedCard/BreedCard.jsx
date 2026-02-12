import { Link } from "react-router-dom";
import styles from "./BreedCard.module.css";

const BreedCard = ({ breed }) => {
  const bgImage = breed.image?.url || "https://via.placeholder.com/300";

  return (
    <Link to={`/breeds/${breed.id}`} className={styles.cardLink}>
      <div
        className={styles.card}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className={styles.overlay}>
          <div className={styles.info}>
            <h3>{breed?.name ?? "神秘品种"}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BreedCard;
