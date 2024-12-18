import { Outlet } from "react-router-dom";
import styles from "../HotelsLayout/HotelsLayout.module.scss";
import Map from "../Map/Map";
import { useBookmarks } from "../context/BookmarksProvider";

export default function BookmarksLayout() {
  const { bookmarks } = useBookmarks();

  return (
    <div className={styles.hotelsLayout} data-cy="bookmarks-layout">
      <div className={styles.sidebar} data-cy="bookmarks-sidebar">
        <Outlet />
      </div>
      <div className={styles.mapContainer} data-cy="bookmarks-map">
        <Map markerLocations={bookmarks} />
      </div>
    </div>
  );
}
