import { Outlet } from "react-router-dom";
import styles from "./HotelsLayout.module.scss";

export default function HotelsLayout() {
  return (
    <div className={styles.hotelsLayout}>
      <div className={styles.sidebar}>
        <Outlet />
      </div>
      <div className={styles.map}>location</div>
    </div>
  );
}
