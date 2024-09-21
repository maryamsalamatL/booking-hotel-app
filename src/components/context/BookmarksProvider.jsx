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
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchBookmarks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks`);
      setBookmarks(data);
    } catch (error) {
      toast.error(error.response?.data.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createBookmark = async (newBookmark) => {
    setIsLoading(true);

    try {
      await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      await fetchBookmarks();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBookmark = async (id) => {
    setIsLoading(true);

    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      await fetchBookmarks();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <bookmarksContext.Provider
      value={{ bookmarks, isLoading, createBookmark, deleteBookmark }}
    >
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
