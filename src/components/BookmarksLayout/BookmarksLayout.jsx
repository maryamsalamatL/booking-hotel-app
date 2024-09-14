import { Outlet } from "react-router-dom";
import styles from "../HotelsLayout/HotelsLayout.module.scss";
import Map from "../Map/Map";
import { useBookmarks } from "../context/BookmarksProvider";

export default function BookmarksLayout() {
  const { bookmarks } = useBookmarks();

  return (
    <div className={styles.hotelsLayout}>
      <div className={styles.sidebar}>
        <Outlet />
      </div>
      <div className={styles.mapContainer}>
        <Map markerLocations={bookmarks} />
      </div>
    </div>
  );
}
