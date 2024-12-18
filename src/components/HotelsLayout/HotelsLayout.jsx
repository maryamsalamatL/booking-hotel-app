import { Outlet } from "react-router-dom";
import styles from "./HotelsLayout.module.scss";
import Map from "../Map/Map";
import { useHotels } from "../context/HotelsProvider";

export default function HotelsLayout() {
  const { hotels } = useHotels();

  return (
    <div className={styles.hotelsLayout}>
      <div className={styles.sidebar}>
        <Outlet />
      </div>
      <div className={styles.mapContainer} data-cy="hotel-map">
        <Map markerLocations={hotels} />
      </div>
    </div>
  );
}
