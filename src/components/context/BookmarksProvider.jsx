import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const bookmarksContext = createContext();
const currentBookmarkIdContext = createContext();
const currentBookmarkIdSetterContext = createContext();

export default function BookmarksProvider({ children }) {
  const [currentBookmarkId, setCurrentBookmarkId] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  

  const fetchBookmarks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/bookmarks`
      );
      setBookmarks(data);
    } catch (error) {
      toast.error(error.response?.data.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createBookmark = async (newBookmark) => {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/bookmarks`,
      newBookmark
    );

    fetchBookmarks();
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <bookmarksContext.Provider value={{ bookmarks, isLoading, createBookmark }}>
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
