import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";

const bookmarksContext = createContext();
const currentBookmarkIdContext = createContext();
const currentBookmarkIdSetterContext = createContext();

export default function BookmarksProvider({ children }) {
  const [currentBookmarkId, setCurrentBookmarkId] = useState(null);
  // TODO: BASEURL constant
  const { data: bookmarks, isLoading } = useFetch(
    "http://localhost:5000/bookmarks"
  );

  return (
    <bookmarksContext.Provider value={{ bookmarks, isLoading }}>
      <currentBookmarkIdContext.Provider value={currentBookmarkId}>
        <currentBookmarkIdSetterContext.Provider value={setCurrentBookmarkId}>
          {children}
        </currentBookmarkIdSetterContext.Provider>
      </currentBookmarkIdContext.Provider>
    </bookmarksContext.Provider>
  );
}

export const useBookmarks = () => useContext(bookmarksContext);
export const useCurrentBookmarkId = () => useContext(currentBookmarkIdContext);
export const useSetCurrentBookmarkId = () =>
  useContext(currentBookmarkIdSetterContext);
