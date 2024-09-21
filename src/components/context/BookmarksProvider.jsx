import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const bookmarksContext = createContext();
const currentBookmarkIdContext = createContext();
const currentBookmarkIdSetterContext = createContext();

const initialState = {
  isLoading: false,
  bookmarks: [],
  error: null,
};

const bookmarksReducer = (state, { type, payload }) => {
  switch (type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, payload],
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      throw new Error("Unknown action type!");
  }
};

export default function BookmarksProvider({ children }) {
  const [currentBookmarkId, setCurrentBookmarkId] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [{ isLoading, error, bookmarks }, dispatch] = useReducer(
    bookmarksReducer,
    initialState
  );

  useEffect(() => {
    const fetchBookmarks = async () => {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: error.message,
        });
      }
    };
    fetchBookmarks();
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const createBookmark = async (newBookmark) => {
    dispatch({ type: "loading" });

    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
      setCurrentBookmarkId(data.id);
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  };

  const deleteBookmark = async (id) => {
    dispatch({ type: "loading" });

    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  };

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
