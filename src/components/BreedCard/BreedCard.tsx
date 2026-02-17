import React from "react";
import Link from "next/link";
import styles from "./BreedCard.module.css";
import { BreedWithImage } from "../../api/catApi";

// 1. 定义 Props 接口
// 这里的 breed 属性使用了交叉类型 & ，确保它包含我们刚刚在父组件注入的 image_url
interface BreedCardProps {
  breed: BreedWithImage;
}

const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  return (
    <Link href={`/breeds/${breed.id}`} className={styles.cardLink}>
      <div
        className={styles.card}
        style={{
          // 2. 直接使用父组件处理好的 image_url
          backgroundImage: `url(${breed.image_url})`,
        }}
      >
        <div className={styles.overlay}>
          <div className={styles.info}>
            {/* 3. 使用空值合并运算符展示名称 */}
            <h3>{breed.name ?? "神秘品种"}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BreedCard;
