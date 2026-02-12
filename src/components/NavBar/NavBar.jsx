// src/components/NavBar/NavBar.jsx
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css"; // 导入样式对象

const NavBar = () => {
  return (
    <nav className={styles.navContainer}>
      <h1 className={styles.title}>猫猫网站</h1>

      <div className={styles.linkGroup}>
        <Link to="/gallery">相册</Link>
        <span>|</span>
        <Link to="/breeds">品种</Link>
      </div>
    </nav>
  );
};

export default NavBar;
