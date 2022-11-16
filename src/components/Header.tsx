import styles from "./Header.module.css";

import logoSvg from "../assets/logo.svg";

export const Header = () => {
  return (
    <header className={styles.wrapper}>
      <img src={logoSvg} alt="Todo-list" />
    </header>
  );
};
