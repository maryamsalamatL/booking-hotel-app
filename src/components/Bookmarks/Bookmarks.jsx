import Loader from "../Loader/Loader";
import styles from "./Bookmarks.module.scss";
import { Link } from "react-router-dom";
import { useBookmarks } from "../context/BookmarksProvider";
import ReactCountryFlag from "react-country-flag";

export default function Bookmarks() {
  const { bookmarks, isLoading } = useBookmarks();

  if (isLoading) return <Loader />;

  return (
    <div>
      <h2>Bookmark List</h2>
      {bookmarks.map((item) => (
        <Link
          key={item.id}
          to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div className={styles.bookmarkItem}>
            <ReactCountryFlag svg countryCode={item.countryCode} />
            &nbsp;
            <strong>{item.cityName}</strong>&nbsp;{item.country}
          </div>
        </Link>
      ))}
    </div>
  );
}
