// src/components/NavBar/NavBar.jsx
import Link from "next/link"; // 重点，Link从 next/link 导入
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navContainer}>
      <h1 className={styles.title}>猫猫网站</h1>

      <div className={styles.linkGroup}>
        {/* 重点 to 换成 href */}
        <Link href="/gallery">相册</Link>
        <span>|</span>
        <Link href="/breeds">品种</Link>
      </div>
    </nav>
  );
};

export default NavBar;
