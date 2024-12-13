import Loader from "../Loader/Loader";
import styles from "./Bookmarks.module.scss";
import { Link } from "react-router-dom";
import {
  useBookmarks,
  useCurrentBookmarkId,
} from "../context/BookmarksProvider";
import ReactCountryFlag from "react-country-flag";
import { BiTrash } from "react-icons/bi";

export default function Bookmarks() {
  const { bookmarks, isLoading, deleteBookmark } = useBookmarks();
  const currentBookmarkId = useCurrentBookmarkId();

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is no bookmarked location.</p>;

  return (
    <div>
      <h2>Bookmark List</h2>
      {bookmarks.map((item) => (
        <Link
          key={item.id}
          to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div
            className={`${styles.bookmarkItem} ${
              Number(item.id) === Number(currentBookmarkId)
                ? "currentHotel"
                : ""
            }`}
            data-cy="bookmark-item"
          >
            <p className="centralize">
              <ReactCountryFlag svg countryCode={item.countryCode} />
              &nbsp;
              <strong>{item.cityName}</strong>&nbsp;{item.country}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteBookmark(item.id);
              }}
              data-cy="bookmark-item-trash"
            >
              <BiTrash className={styles.icon} />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
