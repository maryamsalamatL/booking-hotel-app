import { Outlet } from "react-router-dom";
import styles from "./HotelsLayout.module.scss";
import HotelsProvider from "../context/HotelsProvider";
import Map from "../Map/Map";

export default function HotelsLayout() {
  return (
    <div className={styles.hotelsLayout}>
      <HotelsProvider>
        <div className={styles.sidebar}>
          <Outlet />
        </div>
        <div className={styles.mapContainer}>
          <Map />
        </div>
      </HotelsProvider>
    </div>
  );
}
